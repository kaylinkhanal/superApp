const { Router } = require("express");
const app = Router();
const loginController = require("../controllers/loginController");

app.post('/', loginController.loginUser)

module.exports = app