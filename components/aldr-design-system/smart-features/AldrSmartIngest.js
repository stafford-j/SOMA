/**
 * AldrSmartIngest - AI-Powered Document Ingestion Component
 * 
 * A sophisticated document processing component that automatically categorizes
 * and routes documents to appropriate vaults using ML classification.
 * 
 * Features:
 * - Automatic document classification with confidence scoring
 * - Multi-vault routing based on document type
 * - Interactive review and approval workflow
 * - Configurable document processing rules
 * - Real-time processing status updates
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const AldrSmartIngest = ({ 
  pendingDocuments = [],
  onApprove,
  onReject,
  onEdit,
  onViewFull,
  onSettings,
  className = "",
  title = "Smart Ingestion",
  description = "Forward any document by email. We'll automatically categorize it and route it to the right vault.",
  showSettings = true,
  maxDisplayDocuments = 10,
  confidenceThresholds = {
    high: 95,
    medium: 85,
    low: 0
  }
}) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Default sample data for demo purposes
  const defaultPendingDocuments = [
    {
      id: 'pending-1',
      title: 'Health Insurance Policy Update',
      sender: 'VHI Healthcare',
      receivedDate: '2025-01-15',
      suggestedVault: 'Aldr Health',
      confidence: 95,
      type: 'Insurance Document',
      preview: 'Annual policy update with new coverage terms...',
      urgency: 'medium',
      tags: ['insurance', 'health', 'policy']
    },
    {
      id: 'pending-2', 
      title: 'Passport Renewal Confirmation',
      sender: 'Department of Foreign Affairs',
      receivedDate: '2025-01-14',
      suggestedVault: 'Aldr Identity',
      confidence: 98,
      type: 'Government Document',
      preview: 'Your passport renewal application has been processed...',
      urgency: 'high',
      tags: ['passport', 'government', 'identity']
    },
    {
      id: 'pending-3',
      title: 'Employment Contract Amendment',
      sender: 'Ruley Productions HR',
      receivedDate: '2025-01-12',
      suggestedVault: 'Aldr Legal',
      confidence: 92,
      type: 'Legal Document',
      preview: 'Amendment to employment terms effective March 2025...',
      urgency: 'low',
      tags: ['employment', 'legal', 'contract']
    }
  ];

  const documents = pendingDocuments.length > 0 ? pendingDocuments : defaultPendingDocuments;
  const displayDocuments = documents.slice(0, maxDisplayDocuments);

  const handleDocumentClick = useCallback((document) => {
    setSelectedDocument(document);
  }, []);

  const handleApprove = useCallback(async (documentId) => {
    setProcessing(true);
    try {
      if (onApprove) {
        await onApprove(documentId);
      } else {
        // Default behavior
        alert(`Document ${documentId} approved and filed to suggested vault.`);
      }
      setSelectedDocument(null);
    } catch (error) {
      console.error('Error approving document:', error);
    } finally {
      setProcessing(false);
    }
  }, [onApprove]);

  const handleReject = useCallback(async (documentId) => {
    setProcessing(true);
    try {
      if (onReject) {
        await onReject(documentId);
      } else {
        // Default behavior
        alert(`Document ${documentId} rejected. Please specify alternative vault.`);
      }
      setSelectedDocument(null);
    } catch (error) {
      console.error('Error rejecting document:', error);
    } finally {
      setProcessing(false);
    }
  }, [onReject]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  }, []);

  const getConfidenceColor = useCallback((confidence) => {
    if (confidence >= confidenceThresholds.high) return '#4CAF50';
    if (confidence >= confidenceThresholds.medium) return '#FFB84D';
    return '#FF4444';
  }, [confidenceThresholds]);

  const getConfidenceLabel = useCallback((confidence) => {
    if (confidence >= confidenceThresholds.high) return 'High';
    if (confidence >= confidenceThresholds.medium) return 'Medium';
    return 'Low';
  }, [confidenceThresholds]);

  const getUrgencyIcon = useCallback((urgency) => {
    switch (urgency) {
      case 'high': return 'fa-exclamation-circle text-red-500';
      case 'medium': return 'fa-clock text-yellow-500';
      case 'low': return 'fa-info-circle text-blue-500';
      default: return 'fa-file-alt text-gray-500';
    }
  }, []);

  // Document Modal Component
  const DocumentModal = useMemo(() => ({ document, onClose }) => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {document.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <i className="fas fa-user mr-1"></i>
                    From: {document.sender}
                  </span>
                  <span className="flex items-center">
                    <i className="fas fa-calendar mr-1"></i>
                    Received: {formatDate(document.receivedDate)}
                  </span>
                  <span className="flex items-center">
                    <i className={getUrgencyIcon(document.urgency)} mr-1></i>
                    {document.urgency?.charAt(0).toUpperCase() + document.urgency?.slice(1)} Priority
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Classification Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <i className="fas fa-robot mr-2 text-purple-600"></i>
                AI Classification Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Document Type</p>
                  <p className="font-medium">{document.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Suggested Vault</p>
                  <p className="font-medium text-purple-600">{document.suggestedVault}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confidence Score</p>
                  <div className="flex items-center space-x-2">
                    <span 
                      className="px-3 py-1 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: getConfidenceColor(document.confidence) }}
                    >
                      {document.confidence}%
                    </span>
                    <span className="text-sm text-gray-500">
                      ({getConfidenceLabel(document.confidence)} Confidence)
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {document.tags?.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Preview */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <i className="fas fa-eye mr-2 text-blue-600"></i>
                Document Preview
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed">{document.preview}</p>
              </div>
            </div>

            {/* Processing History */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <i className="fas fa-history mr-2 text-green-600"></i>
                Processing History
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>Document received and scanned</span>
                  <span className="text-gray-500 ml-auto">{formatDate(document.receivedDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>AI classification completed</span>
                  <span className="text-gray-500 ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-clock text-yellow-500"></i>
                  <span>Awaiting user approval</span>
                  <span className="text-gray-500 ml-auto">Now</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex flex-wrap gap-3">
              <button 
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                onClick={() => handleApprove(document.id)}
                disabled={processing}
              >
                <i className="fas fa-check mr-2"></i>
                {processing ? 'Processing...' : 'Approve & File'}
              </button>
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => {
                  if (onViewFull) {
                    onViewFull(document);
                  } else {
                    alert(`View full record in ${document.suggestedVault} would open here.`);
                  }
                }}
              >
                <i className="fas fa-eye mr-2"></i>
                View Full Record
              </button>
              <button 
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                onClick={() => {
                  if (onEdit) {
                    onEdit(document);
                  } else {
                    alert('Edit document classification would open here.');
                  }
                }}
              >
                <i className="fas fa-edit mr-2"></i>
                Edit Classification
              </button>
              <button 
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                onClick={() => handleReject(document.id)}
                disabled={processing}
              >
                <i className="fas fa-times mr-2"></i>
                Reject
              </button>
              <button 
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors ml-auto"
                onClick={onClose}
              >
                Review Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [formatDate, getConfidenceColor, getConfidenceLabel, getUrgencyIcon, handleApprove, handleReject, onEdit, onViewFull, processing]);

  return (
    <>
      <div className={`card bg-white border border-gray-200 shadow-lg h-full flex flex-col ${className}`}>
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-6 shadow-lg">
                <i className="fas fa-brain text-3xl text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-gray-800" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
                  {title}
                </h2>
                <p className="text-lg text-gray-600 max-w-lg">
                  {description}
                </p>
              </div>
            </div>
            {showSettings && (
              <button 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg transition-colors hover:bg-gray-100"
                onClick={() => {
                  if (onSettings) {
                    onSettings();
                  } else {
                    alert('Smart Ingest settings would open here in the full application.');
                  }
                }}
                title="Ingest Settings"
              >
                <i className="fas fa-cog text-xl"></i>
              </button>
            )}
          </div>

          {/* Stats Summary */}
          {documents.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{documents.length}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {documents.filter(d => d.confidence >= confidenceThresholds.high).length}
                  </div>
                  <div className="text-sm text-gray-600">High Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {documents.filter(d => d.urgency === 'high').length}
                  </div>
                  <div className="text-sm text-gray-600">Urgent</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documents List */}
        <div className="space-y-3 mb-6 flex-grow">
          {displayDocuments.length > 0 ? (
            displayDocuments.map((document) => (
              <div 
                key={document.id} 
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all cursor-pointer border border-gray-200 hover:shadow-md"
                onClick={() => handleDocumentClick(document)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{document.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        From {document.sender} • {formatDate(document.receivedDate)} • → {document.suggestedVault}
                      </p>
                      <div className="flex items-center space-x-2">
                        <i className={getUrgencyIcon(document.urgency)} text-xs"></i>
                        <span className="text-xs text-gray-500">
                          {document.urgency?.charAt(0).toUpperCase() + document.urgency?.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: getConfidenceColor(document.confidence) }}
                    >
                      {document.confidence}%
                    </span>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-inbox text-4xl mb-4 text-gray-300"></i>
              <p className="text-lg">No pending documents</p>
              <p className="text-sm">Documents will appear here when received</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center mt-auto">
          <button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full max-w-sm"
            onClick={() => alert('All pending approvals would be shown here in the full application.')}
          >
            <i className="fas fa-list mr-2"></i>
            View All Pending ({documents.length})
          </button>
        </div>
      </div>

      <DocumentModal 
        document={selectedDocument} 
        onClose={() => setSelectedDocument(null)} 
      />
    </>
  );
};

AldrSmartIngest.propTypes = {
  pendingDocuments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    receivedDate: PropTypes.string.isRequired,
    suggestedVault: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    urgency: PropTypes.oneOf(['high', 'medium', 'low']),
    tags: PropTypes.arrayOf(PropTypes.string)
  })),
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
  onEdit: PropTypes.func,
  onViewFull: PropTypes.func,
  onSettings: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  showSettings: PropTypes.bool,
  maxDisplayDocuments: PropTypes.number,
  confidenceThresholds: PropTypes.shape({
    high: PropTypes.number,
    medium: PropTypes.number,
    low: PropTypes.number
  })
};

export default AldrSmartIngest;