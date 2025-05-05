// models/shareModel.js
class ShareRecord {
    constructor(id, recordId, ownerId, recipientId, permissionLevel, expiresAt) {
      this.id = id;
      this.recordId = recordId;
      this.ownerId = ownerId;
      this.recipientId = recipientId;
      this.permissionLevel = permissionLevel; // 'read-only' for MVP
      this.expiresAt = expiresAt; // Optional expiration timestamp
      this.createdAt = new Date().toISOString();
    }
    
    isExpired() {
      if (!this.expiresAt) return false;
      return new Date() > new Date(this.expiresAt);
    }
  }
  
  // In-memory storage for shares
  const sharesDB = [];
  
  // Share operations
  const shareOperations = {
    // Create a new share
    createShare: (recordId, ownerId, recipientId, permissionLevel = 'read-only', expiresAt = null) => {
      const share = new ShareRecord(
        `share${Date.now()}`, // Generate a unique ID
        recordId,
        ownerId,
        recipientId,
        permissionLevel,
        expiresAt
      );
      
      sharesDB.push(share);
      return share;
    },
    
    // Get all shares for a specific record
    getSharesByRecordId: (recordId) => {
      return sharesDB.filter(share => share.recordId === recordId && !share.isExpired());
    },
    
    // Get all records shared with a specific user
    getSharesForRecipient: (recipientId) => {
      return sharesDB.filter(share => share.recipientId === recipientId && !share.isExpired());
    },
    
    // Check if a user has access to a record
    checkAccess: (recordId, userId) => {
      return sharesDB.find(share => 
        share.recordId === recordId && 
        share.recipientId === userId && 
        !share.isExpired()
      );
    },
    
    // Remove a share (revoke access)
    removeShare: (recordId, ownerId, recipientId) => {
      const initialLength = sharesDB.length;
      
      // Filter out the share to be removed
      const filtered = sharesDB.filter(share => 
        !(share.recordId === recordId && 
          share.ownerId === ownerId && 
          share.recipientId === recipientId)
      );
      
      // Update the shares database
      sharesDB.length = 0;
      sharesDB.push(...filtered);
      
      // Return true if a share was removed
      return initialLength > sharesDB.length;
    }
  };
  // Add a test share for debugging
shareOperations.createShare('hr1001', '1742961914546', 'another-user-id', 'read-only');
console.log('Test share created:', sharesDB);
  
  module.exports = shareOperations;