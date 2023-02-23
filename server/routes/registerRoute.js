const { Router } = require("express");
const app = Router();
const registerController = require("../controllers/registerControllers");

app.post('/', registerController.registerUser)

module.exports = app