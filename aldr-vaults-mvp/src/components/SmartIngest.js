import React, { useState } from 'react';

const SmartIngest = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const pendingDocuments = [
    {
      id: 'pending-1',
      title: 'Health Insurance Policy Update',
      sender: 'VHI Healthcare',
      receivedDate: '2025-01-15',
      suggestedVault: 'Aldr Health',
      confidence: 95,
      type: 'Insurance Document',
      preview: 'Annual policy update with new coverage terms...'
    },
    {
      id: 'pending-2', 
      title: 'Passport Renewal Confirmation',
      sender: 'Department of Foreign Affairs',
      receivedDate: '2025-01-14',
      suggestedVault: 'Aldr Identity',
      confidence: 98,
      type: 'Government Document',
      preview: 'Your passport renewal application has been processed...'
    },
    {
      id: 'pending-3',
      title: 'Employment Contract Amendment',
      sender: 'Ruley Productions HR',
      receivedDate: '2025-01-12',
      suggestedVault: 'Aldr Legal',
      confidence: 92,
      type: 'Legal Document',
      preview: 'Amendment to employment terms effective March 2025...'
    }
  ];

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleApprove = (documentId) => {
    alert(`Document ${documentId} approved and filed to suggested vault.`);
    setSelectedDocument(null);
  };

  const handleReject = (documentId) => {
    alert(`Document ${documentId} rejected. Please specify alternative vault.`);
    setSelectedDocument(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return '#4CAF50';
    if (confidence >= 85) return '#FFB84D';
    return '#FF4444';
  };

  // Document Modal Component
  const DocumentModal = ({ document, onClose }) => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                {document.title}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-gray-600">From: {document.sender}</span>
              <span className="text-gray-600">Received: {formatDate(document.receivedDate)}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Document Classification</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Type:</strong> {document.type}</p>
                  <p><strong>Suggested Vault:</strong> {document.suggestedVault}</p>
                  <p>
                    <strong>Confidence:</strong> 
                    <span 
                      className="ml-2 px-2 py-1 rounded text-white text-sm font-medium"
                      style={{ backgroundColor: getConfidenceColor(document.confidence) }}
                    >
                      {document.confidence}%
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Document Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{document.preview}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t flex flex-wrap gap-3">
              <button 
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                onClick={() => handleApprove(document.id)}
              >
                <i className="fas fa-check mr-2"></i>
                Approve & File
              </button>
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => alert(`View full record in ${document.suggestedVault} would open here.`)}
              >
                <i className="fas fa-eye mr-2"></i>
                View Full Record
              </button>
              <button 
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                onClick={() => alert('Edit document classification would open here.')}
              >
                <i className="fas fa-edit mr-2"></i>
                Edit
              </button>
              <button 
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                onClick={() => handleReject(document.id)}
              >
                <i className="fas fa-times mr-2"></i>
                Reject
              </button>
              <button 
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                onClick={onClose}
              >
                Review Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card bg-white border border-gray-200 shadow-lg h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-6">
                <i className="fas fa-brain text-3xl text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-gray-800" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
                  Smart Ingestion
                </h2>
                <p className="text-lg text-gray-600">
                  Forward any document by email. We'll automatically categorize it and route it to the right vault.
                </p>
              </div>
            </div>
            <button 
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg transition-colors"
              onClick={() => alert('Smart Ingest settings would open here in the full application.')}
              title="Ingest Settings"
            >
              <i className="fas fa-cog text-xl"></i>
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-6 flex-grow">
          {pendingDocuments.map((document) => (
            <div 
              key={document.id} 
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all cursor-pointer border border-gray-200"
              onClick={() => handleDocumentClick(document)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <i className="fas fa-file-alt text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{document.title}</h4>
                    <p className="text-sm text-gray-600">
                      From {document.sender} • {formatDate(document.receivedDate)} • → {document.suggestedVault}
                    </p>
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
          ))}
        </div>

        <div className="flex justify-center mt-auto">
          <button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full max-w-sm"
            onClick={() => alert('All pending approvals would be shown here in the full application.')}
          >
            <i className="fas fa-list mr-2"></i>
            View All Pending Ingestion
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

export default SmartIngest;