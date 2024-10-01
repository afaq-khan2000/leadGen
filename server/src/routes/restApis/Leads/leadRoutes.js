const express = require("express");

// Controllers :
const { LeadController } = require("../../../controller");

// middlewares :
const validateRequest = require("../../../middleware/validateRequest");
const { authenticateUser } = require("../../../middleware/authenticateUser");

const router = express.Router();

// get all Customers
router.get("/", authenticateUser(), LeadController.getAllLeads);
router.post("/unlock/:lead_id", authenticateUser(), LeadController.unlockLead);
router.get("/unlocked_leads", authenticateUser(), LeadController.getUnlockedLeads);
router.get("/stats", authenticateUser(), LeadController.getStats);

module.exports = router;
