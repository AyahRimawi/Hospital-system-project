const pool = require("../config/db");
const paypal = require("@paypal/checkout-server-sdk");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const PayPalController = {
  createOrder: async (req, res) => {
    const { amount, appointmentId } = req.body;

    // Get userId from JWT token
    const token = req.cookies["Patient Token"];
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      });

      const order = await client.execute(request);
      res.json({ id: order.result.id, userId, appointmentId });
    } catch (error) {
      console.error("Error creating PayPal order:", error.message);
      res.status(500).json({ error: "Failed to create PayPal order." });
    }
  },

  captureOrder: async (req, res) => {
    const { orderId, appointmentId } = req.body;

    console.log("Received request to capture order:", {
      orderId,
      appointmentId,
    });

    // Get userId from JWT token
    const token = req.cookies["Patient Token"];
    if (!token) {
      console.error("Authentication token missing");
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      console.log("Decoded user ID:", userId);

      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      console.log("Executing PayPal capture request");
      const capture = await client.execute(request);
      console.log(
        "PayPal capture response:",
        JSON.stringify(capture.result, null, 2)
      );

      const paymentStatus = capture.result.status;

      if (paymentStatus !== "COMPLETED") {
        console.error("Payment not completed:", paymentStatus);
        return res
          .status(400)
          .json({ error: "Order not completed", status: paymentStatus });
      }

      // Correctly extract the amount from the capture response
      const amount =
        capture.result.purchase_units[0].payments.captures[0].amount.value;
      console.log("Extracted amount:", amount);

      // Insert into the payments table
      const paymentQuery = `
        INSERT INTO payments (user_id, amount, payment_status, appointment_id)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `;
      const paymentValues = [userId, amount, paymentStatus, appointmentId];

      console.log("Executing database query:", paymentQuery, paymentValues);
      const paymentResult = await pool.query(paymentQuery, paymentValues);
      console.log("Database query result:", paymentResult.rows[0]);

      res.json({
        captureId: capture.result.id,
        status: paymentStatus,
        payer: capture.result.payer,
        dbResult: paymentResult.rows[0],
      });
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ error: "Invalid token", details: error.message });
      }
      if (error.response) {
        console.error("PayPal API error response:", error.response.data);
        return res.status(500).json({
          error: "PayPal API error",
          details: error.response.data,
        });
      }
      return res.status(500).json({
        error: "Failed to capture PayPal order.",
        details: error.message || "No additional information",
      });
    }
  },
};

module.exports = PayPalController;
