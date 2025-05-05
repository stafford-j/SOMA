// routes/shareRoutes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const ShareRecord = require('../models/shareModel');
const HealthRecord = require('../models/healthRecordModel');

// Share a health record with another user
router.put(
  '/:recordId/share',
  [
    check("ownerId", "Owner ID is required").not().isEmpty(),
    check("recipientId", "Recipient ID is required").not().isEmpty(),
    check("permissionLevel", "Permission level is required").isIn(['read-only']), // For MVP, only read-only is supported
    check("expiresAt", "Expiration date must be valid ISO date if provided").optional().isISO8601()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { recordId } = req.params;
      const { ownerId, recipientId, permissionLevel, expiresAt } = req.body;

      // Check if record exists
      const record = HealthRecord.getRecordById(recordId);
      if (!record) {
        return res.status(404).json({ error: "Health record not found" });
      }

      // Check if user owns the record
      if (record.userId !== ownerId) {
        return res.status(403).json({ error: "You don't have permission to share this record" });
      }

      // Create the share
      const share = ShareRecord.createShare(recordId, ownerId, recipientId, permissionLevel, expiresAt);

      res.json({
        message: "Record shared successfully",
        share
      });
    } catch (error) {
      console.error("Error sharing health record:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get all records shared with me
router.get(
  '/shared-with-me',
  [
    check("userId", "User ID is required").not().isEmpty(),
  ],
  async (req, res) => {
    console.log("Request body:", req.body);
    console.log("All shares in DB:", ShareRecord.getSharesForRecipient('another-user-id'));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userId } = req.body;
      console.log("Looking for shares for user:", userId);

      // Get all shares for this recipient
      const shares = ShareRecord.getSharesForRecipient(userId);
      console.log("Found shares:", shares);

      // Get the actual records
      const sharedRecords = [];
      for (const share of shares) {
        const record = HealthRecord.getRecordById(share.recordId);
        if (record) {
          sharedRecords.push({
            record,
            sharedBy: share.ownerId,
            permissionLevel: share.permissionLevel,
            expiresAt: share.expiresAt
          });
        }
      }

      res.json(sharedRecords);
    } catch (error) {
      console.error("Error fetching shared records:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Revoke access to a shared record
router.delete(
  '/:recordId/share/:recipientId',
  [
    check("ownerId", "Owner ID is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { recordId, recipientId } = req.params;
      const { ownerId } = req.body;

      // Check if record exists
      const record = HealthRecord.getRecordById(recordId);
      if (!record) {
        return res.status(404).json({ error: "Health record not found" });
      }

      // Check if user owns the record
      if (record.userId !== ownerId) {
        return res.status(403).json({ error: "You don't have permission to revoke access to this record" });
      }

      // Remove the share
      const removed = ShareRecord.removeShare(recordId, ownerId, recipientId);

      if (!removed) {
        return res.status(404).json({ error: "Share not found" });
      }

      res.json({
        message: "Record access revoked successfully"
      });
    } catch (error) {
      console.error("Error revoking health record access:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;