const { Router } = require("express");
const app = Router();
const orderController = require("../controllers/orderController");

app.post('/', orderController.orders)

module.exports = app