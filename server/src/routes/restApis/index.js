const express = require("express");
const authRoutes = require("./Auth/authRoutes");
const leadRoutes = require("./Leads/leadRoutes");


const { jsonResponseFormat } = require("../../middleware/jsonResponseFormat");

const router = express.Router();

// Router will use response formate
router.use(jsonResponseFormat);

// Auth Routes
router.use("/auth/", authRoutes);
router.use("/leads/", leadRoutes);
module.exports = router;
