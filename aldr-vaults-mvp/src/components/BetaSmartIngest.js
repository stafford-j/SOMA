/**
 * BETA Smart Ingestion Component - Based on SmartIngest pattern
 * 
 * Smart document ingestion system that integrates with user's account
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const BetaSmartIngest = () => {
  const { user } = useAuth();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      generatePendingDocuments();
    }
  }, [user]);

  const generatePendingDocuments = async () => {
    try {
      // Get user's vaults to personalize suggestions
      const { data: vaults, error: vaultsError } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_id', user.id);

      if (vaultsError) {
        console.error('Error loading vaults:', vaultsError);
        setLoading(false);
        return;
      }

      // Get user profile for personalization
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      // Start with empty pending documents for clean BETA experience
      // Documents will be added when user uploads files or system generates them
      const generatedPendingDocs = [];
      
      setPendingDocuments(generatedPendingDocs);
    } catch (err) {
      console.error('Error generating pending documents:', err);
    }
    
    setLoading(false);
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleApprove = async (documentId) => {
    try {
      const document = pendingDocuments.find(d => d.id === documentId);
      if (!document) return;

      // Find the suggested vault
      const { data: vault, error: vaultError } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_id', user.id)
        .eq('name', document.suggestedVault.replace('Aldr ', ''))
        .single();

      if (vaultError) {
        console.error('Error finding vault:', vaultError);
        alert('Error finding suggested vault');
        return;
      }

      // Create a document record (simulated - in real app would upload actual file)
      const { data, error } = await supabase
        .from('documents')
        .insert({
          vault_id: vault.id,
          user_id: user.id,
          title: document.title,
          description: document.preview,
          file_url: `simulated-${document.id}`, // In real app, would be actual file URL
          file_name: `${document.title}.pdf`,
          file_size: Math.floor(Math.random() * 500000) + 100000, // Random file size
          file_type: 'application/pdf',
          metadata: {
            sender: document.sender,
            document_type: document.type,
            category: document.category,
            received_date: document.receivedDate,
            confidence_score: document.confidence,
            extracted_info: document.extractedInfo,
            ingestion_method: 'smart_ingest'
          }
        });

      if (error) {
        console.error('Error saving document:', error);
        alert('Error saving document to vault');
      } else {
        // Remove from pending list
        setPendingDocuments(prev => prev.filter(d => d.id !== documentId));
        setSelectedDocument(null);
        alert(`Document successfully filed to ${document.suggestedVault}!`);
      }
    } catch (err) {
      console.error('Error approving document:', err);
      alert('Error processing document approval');
    }
  };

  const handleReject = (documentId) => {
    setPendingDocuments(prev => prev.filter(d => d.id !== documentId));
    setSelectedDocument(null);
    alert('Document rejected and removed from queue.');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadFile(file);
    setProcessing(true);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate smart suggestion for uploaded file
      const suggestion = {
        id: `upload-${Date.now()}`,
        title: file.name,
        sender: 'Manual Upload',
        receivedDate: new Date().toISOString().split('T')[0],
        suggestedVault: file.name.toLowerCase().includes('health') ? 'Aldr Health' :
                       file.name.toLowerCase().includes('legal') ? 'Aldr Legal' :
                       file.name.toLowerCase().includes('identity') ? 'Aldr Identity' : 'Aldr Legal',
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
        type: 'Uploaded Document',
        preview: `Uploaded file: ${file.name}. Smart analysis suggests filing in the recommended vault...`,
        category: 'upload',
        extractedInfo: {
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          fileType: file.type,
          uploadDate: new Date().toISOString().split('T')[0]
        }
      };

      setPendingDocuments(prev => [suggestion, ...prev]);
      setUploadFile(null);
      
    } catch (err) {
      console.error('Error processing upload:', err);
      alert('Error processing uploaded file');
    }
    
    setProcessing(false);
  };

  const closeDocumentModal = () => {
    setSelectedDocument(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return '#10B981'; // Green
    if (confidence >= 85) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center">
          <div className="loading-spinner"></div>
          <span className="ml-2">Analyzing smart suggestions...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="smart-ingest-section bg-white rounded-lg shadow-lg p-6">
        <div className="ingest-header flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-brain text-2xl mr-3" style={{ color: 'var(--purple)' }}></i>
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Smart Ingestion
              </h2>
              <p className="text-gray-600 text-sm">AI-powered document processing and vault suggestions</p>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="About Smart Ingestion"
          >
            <i className="fas fa-info-circle text-lg"></i>
          </button>
        </div>

        {showInfo && (
          <div className="info-panel bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-purple-800 mb-2">About Smart Ingestion</h3>
            <p className="text-purple-700 text-sm mb-2">
              Our AI analyzes incoming documents and suggests the best vault for organization:
            </p>
            <ul className="text-purple-700 text-sm space-y-1 ml-4">
              <li>• Automatic document type detection</li>
              <li>• Intelligent vault suggestions based on content</li>
              <li>• Key information extraction</li>
              <li>• Confidence scoring for accuracy</li>
              <li>• One-click approval to file documents</li>
            </ul>
          </div>
        )}

        {/* Upload Section */}
        <div className="upload-section mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
            <p className="text-gray-600 mb-3">Upload a document for smart analysis</p>
            <input
              type="file"
              id="smart-upload"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              disabled={processing}
            />
            <label
              htmlFor="smart-upload"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
            >
              {processing ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-upload mr-2"></i>
                  Choose File
                </>
              )}
            </label>
          </div>
        </div>

        <div className="pending-documents">
          <h3 className="text-lg font-semibold mb-3">
            Pending Documents ({pendingDocuments.length})
          </h3>
          
          {pendingDocuments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-inbox text-4xl mb-4"></i>
              <p className="text-lg font-medium mb-2">No pending documents</p>
              <p>Upload a document above to see smart ingestion in action!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="document-item bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors border-l-4"
                  style={{ borderLeftColor: getConfidenceColor(doc.confidence) }}
                  onClick={() => handleDocumentClick(doc)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-gray-800 mr-3">{doc.title}</h4>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getConfidenceColor(doc.confidence) }}
                        >
                          {doc.confidence}% match
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{doc.preview}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>
                          <i className="fas fa-user mr-1"></i>
                          {doc.sender}
                        </span>
                        <span>
                          <i className="fas fa-calendar mr-1"></i>
                          {formatDate(doc.receivedDate)}
                        </span>
                        <span>
                          <i className="fas fa-folder mr-1"></i>
                          Suggested: {doc.suggestedVault}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(doc.id);
                        }}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        <i className="fas fa-check mr-1"></i>
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(doc.id);
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        <i className="fas fa-times mr-1"></i>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedDocument.title}
                </h2>
                <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              <div className="flex items-center mt-2 space-x-4">
                <span 
                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: getConfidenceColor(selectedDocument.confidence) }}
                >
                  {selectedDocument.confidence}% confidence
                </span>
                <span className="text-gray-600">{selectedDocument.type}</span>
                <span className="text-gray-600">From: {selectedDocument.sender}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Document Preview</h3>
                  <p className="text-gray-700 mb-4">{selectedDocument.preview}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Suggested Action</h3>
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-blue-800">
                      <i className="fas fa-folder mr-2"></i>
                      File to: <strong>{selectedDocument.suggestedVault}</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Extracted Information</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedDocument.extractedInfo || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-800 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t flex space-x-4">
                <button 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  onClick={() => handleApprove(selectedDocument.id)}
                >
                  <i className="fas fa-check mr-2"></i>
                  Approve & File
                </button>
                <button 
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  onClick={() => handleReject(selectedDocument.id)}
                >
                  <i className="fas fa-times mr-2"></i>
                  Reject
                </button>
                <button 
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  onClick={closeDocumentModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BetaSmartIngest;