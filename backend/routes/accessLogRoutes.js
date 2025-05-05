const express = require("express");
const router = express.Router();
const accessLogService = require("../services/accessLogService");

// Get access logs for a specific record
router.get("/record/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params;
    const { startDate, endDate, page, limit } = req.query;
    
    const logs = await accessLogService.getAccessLogsForRecord(recordId, {
      startDate,
      endDate,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined
    });
    
    res.json(logs);
  } catch (error) {
    console.error("Error retrieving access logs:", error);
    res.status(500).json({ error: "Failed to retrieve access logs" });
  }
});

// Get all access logs
router.get("/", async (req, res) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    
    const logs = await accessLogService.getAllAccessLogs({
      startDate,
      endDate,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined
    });
    
    res.json(logs);
  } catch (error) {
    console.error("Error retrieving access logs:", error);
    res.status(500).json({ error: "Failed to retrieve access logs" });
  }
});

module.exports = router;