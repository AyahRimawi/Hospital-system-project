// src/api/config.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // تأكد من أن هذا يتطابق مع عنوان URL الخاص بالـ backend
  withCredentials: true, // هذا مهم لإرسال ملفات تعريف الارتباط
});

export default api;
