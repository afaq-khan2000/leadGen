const express = require("express");
const { AuthController } = require("../../../controller");
const { signupSchema, loginSchema } = require("../../../validation/authSchema");
const router = express.Router();
const validateRequest = require("../../../middleware/validateRequest");

router.post("/register", validateRequest(signupSchema), AuthController.signup);
router.post("/login", validateRequest(loginSchema), AuthController.login);

module.exports = router;
