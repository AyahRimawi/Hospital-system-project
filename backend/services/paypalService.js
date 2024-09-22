// backend/services/paypalService.js
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const { client } = require("../config/paypalConfig");

const createOrder = async (value) => {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: value,
        },
      },
    ],
  });

  const response = await client.execute(request);
  return response.result;
};

const capturePayment = async (orderId) => {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  const response = await client.execute(request);
  return response.result;
};

module.exports = { createOrder, capturePayment };
