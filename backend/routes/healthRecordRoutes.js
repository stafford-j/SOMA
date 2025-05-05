const express = require('express');
const router = express.Router();
const HealthRecord = require('../models/healthRecordModel');
// Temporarily comment out for MVP demo
// const accessLogService = require('../services/accessLogService');
const { check, validationResult } = require("express-validator");

// ⚠️ CRITICAL SECURITY NOTICE ⚠️  
// TODO: AUTHENTICATION PLACEHOLDER      
// This entire module requires proper authentication middleware
// Current implementation uses UNSAFE user ID handling
// MUST BE REPLACED with secure authentication before production

// Get all health records for a user with mode toggle
router.get("/:userId", async (req, res) => {
  try {
    // Get mode from query parameter, default to 'data'
    const mode = req.query.mode === 'opinion' ? 'opinion' : 'data';

    console.log(`Fetching records in ${mode} mode for user ${req.params.userId}`);

    const records = HealthRecord.getRecordsByUserId(req.params.userId, mode);     

    // Temporarily comment out access logging for MVP demo
    // try {
    //   await accessLogService.logAccess({ 
    //     userId: req.params.userId,
    //     recordId: 'all-records',
    //     accessType: 'VIEW',
    //     ipAddress: req.ip,
    //     deviceInfo: req.get('User-Agent')
    //   });
    // } catch (logError) {
    //   console.error('SECURITY WARNING: Failed to log access:', logError);
    // }

    res.json(records);
  } catch (error) {
    console.error("Error fetching health records:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a specific health record with mode toggle
router.get("/record/:recordId", async (req, res) => {
  try {
    // Get mode from query parameter, default to 'data'
    const mode = req.query.mode === 'opinion' ? 'opinion' : 'data';

    console.log(`Fetching record ${req.params.recordId} in ${mode} mode`);        

    const record = HealthRecord.getRecordById(req.params.recordId, mode);

    if (!record) {
      return res.status(404).json({ error: "Health record not found" });
    }

    // Temporarily comment out access logging for MVP demo
    // try {
    //   await accessLogService.logAccess({ 
    //     userId: 'placeholder-user-id',
    //     recordId: req.params.recordId,   
    //     accessType: 'VIEW',
    //     ipAddress: req.ip,
    //     deviceInfo: req.get('User-Agent')
    //   });
    // } catch (logError) {
    //   console.error('SECURITY WARNING: Failed to log access:', logError);
    // }

    res.json(record);
  } catch (error) {
    console.error("Error fetching health record:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new health record
router.post(
  "/",
  [
    check("userId", "User ID is required").not().isEmpty(),
    check("recordType", "Record type is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content is required").isObject()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userId, recordType, title, content, specialty } = req.body;

      const newRecord = HealthRecord.addRecord(
        userId,
        recordType,
        title,
        content,
        specialty || 'medical' // Default to medical if specialty not provided
      );

      // Temporarily comment out access logging for MVP demo
      // try {
      //   await accessLogService.logAccess({
      //     userId: userId,
      //     recordId: newRecord.id,        
      //     accessType: 'EDIT',
      //     ipAddress: req.ip,
      //     deviceInfo: req.get('User-Agent')
      //   });
      // } catch (logError) {
      //   console.error('SECURITY WARNING: Failed to log record creation:', logError);
      // }

      res.status(201).json(newRecord);   
    } catch (error) {
      console.error("Error adding health record:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Update an existing health record
router.put(
  "/record/:recordId",
  [
    check("userId", "User ID is required").not().isEmpty(),
    check("recordType", "Record type is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content is required").isObject()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userId, recordType, title, content } = req.body;
      const recordId = req.params.recordId;
      
      console.log(`Processing update request for record ID: ${recordId}`);
      console.log("Current records:", HealthRecord.getRecordsByUserId(userId).map(r => r.id));
      
      // For demo purposes, just call updateRecord directly
      // It will handle both creating and updating records
      const specialty = req.body.specialty || 'medical'; // Get specialty from request or default to medical
      const updatedRecord = HealthRecord.updateRecord(
        recordId,
        userId,
        recordType,
        title,
        content,
        specialty
      );
      
      if (!updatedRecord) {
        console.log("Failed to update record");
        return res.status(500).json({ error: "Failed to update record" });
      }
      
      console.log("Record updated successfully:", updatedRecord.id);
      
      // Return a simple response to avoid serialization issues
      res.json({
        id: updatedRecord.id,
        userId: updatedRecord.userId,
        recordType: updatedRecord.recordType,
        specialty: updatedRecord.specialty, // Include the specialty field
        title: updatedRecord.title,
        content: updatedRecord.content,
        date: updatedRecord.date,
        message: "Record updated successfully"
      });
    } catch (error) {
      console.error("Error updating health record:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get available knowledge sources       
router.get("/sources/available", (req, res) => {
  try {
    const sources = HealthRecord.getKnowledgeSources();
    res.json(sources);
  } catch (error) {
    console.error("Error fetching knowledge sources:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get available record types
router.get("/types/available", (req, res) => {
  try {
    const types = HealthRecord.getRecordTypes();
    res.json(types);
  } catch (error) {
    console.error("Error fetching record types:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user preferences
router.get("/preferences/:userId", (req, res) => {
  try {
    const preferences = HealthRecord.getUserPreferences(req.params.userId);       
    res.json(preferences);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update user preferences
router.put(
  "/preferences/:userId",
  [
    check("sources", "Sources array is required").isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { sources } = req.body;      
      const updatedPreferences = HealthRecord.updateUserPreferences(req.params.userId, sources);

      // Temporarily comment out access logging for MVP demo
      // try {
      //   await accessLogService.logAccess({
      //     userId: req.params.userId,
      //     recordId: 'user-preferences',  
      //     accessType: 'EDIT',
      //     ipAddress: req.ip,
      //     deviceInfo: req.get('User-Agent')
      //   });
      // } catch (logError) {
      //   console.error('SECURITY WARNING: Failed to log preferences update:', logError);
      // }

      res.json({
        message: "User preferences updated successfully",
        preferences: updatedPreferences  
      });
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;