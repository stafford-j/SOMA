/**
 * Smart Ingestion Hub
 * 
 * Machine learning-powered document processing and routing system that demonstrates:
 * - Email attachment analysis and classification
 * - Cross-vault document routing intelligence
 * - User approval workflows for ML suggestions
 * - Real-time processing with confidence scoring
 * 
 * Features:
 * - Simulated email inbox with ML analysis
 * - Document type detection and vault routing
 * - Cross-vault linking intelligence
 * - Batch approval and processing workflows
 * - Learning from user corrections
 * 
 * @author Aldr Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { incomingEmails, processingQueue, recentlyProcessed, smartIngestionStats } from '../data/smart-ingestion-data';
import '../styles/Dashboard.css';

const SmartIngestion = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [showProcessingDetails, setShowProcessingDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailSelect = (emailId) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleBatchApproval = () => {
    if (selectedEmails.length === 0) {
      alert('Please select emails to process');
      return;
    }
    alert(`Processing ${selectedEmails.length} emails. This would route documents to appropriate vaults and create records.`);
    setSelectedEmails([]);
  };

  const getStatusColor = (status) => {
    const colors = {
      'processing': 'bg-blue-100 text-blue-800',
      'pending_approval': 'bg-yellow-100 text-yellow-800',
      'awaiting_review': 'bg-orange-100 text-orange-800',
      'auto_filed': 'bg-green-100 text-green-800',
      'needs_review': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredEmails = filterStatus === 'all' 
    ? incomingEmails 
    : incomingEmails.filter(email => email.status === filterStatus);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="flex flex-col">
            <div className="flex items-center">
              <i className="fas fa-brain text-white text-3xl mr-4"></i>
              <div>
                <h1 className="text-white text-xl font-bold">Smart Ingestion</h1>
                <div className="text-sm text-white italic mt-1">
                  Machine learning-powered document processing across all vaults
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="header-actions">
          <button 
            className="dashboard-button white"
            onClick={() => setShowProcessingDetails(!showProcessingDetails)}
          >
            <i className="fas fa-cogs"></i>
            <span className="hidden sm:inline">Processing Details</span>
          </button>
          <a 
            href="mailto:james@ruleyproduction.com" 
            className="dashboard-button white"
          >
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">Contact</span>
          </a>
          <Link to="/" className="dashboard-button white">
            <i className="fas fa-arrow-left"></i>
            <span className="hidden sm:inline">Back to Vaults</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-aldr-gradient text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                  <i className="fas fa-inbox text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{incomingEmails.length}</h3>
                  <p className="text-white text-opacity-80">Incoming</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-aldr-gradient text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                  <i className="fas fa-check-circle text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{smartIngestionStats.totalProcessed}</h3>
                  <p className="text-white text-opacity-80">Processed</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-aldr-gradient text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                  <i className="fas fa-percentage text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{smartIngestionStats.averageAccuracy}%</h3>
                  <p className="text-white text-opacity-80">Accuracy</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-aldr-gradient text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                  <i className="fas fa-clock text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{smartIngestionStats.timeSaved}</h3>
                  <p className="text-white text-opacity-80">Time Saved</p>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Queue */}
          {processingQueue.length > 0 && (
            <section className="mb-8">
              <div className="card">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold text-aldr-dark flex items-center">
                    <i className="fas fa-cog fa-spin mr-2 text-blue-500"></i>
                    Currently Processing ({processingQueue.length})
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  {processingQueue.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-aldr-dark">Processing Email #{item.emailId}</span>
                        <span className="text-sm text-blue-600">{item.estimatedTimeRemaining} remaining</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-aldr-gray mb-1">
                          <span>{item.currentStep}</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Incoming Documents */}
          <section className="mb-8">
            <div className="card">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-aldr-dark">
                    Incoming Documents ({filteredEmails.length})
                  </h2>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="pending_approval">Pending Approval</option>
                      <option value="processing">Processing</option>
                      <option value="awaiting_review">Awaiting Review</option>
                      <option value="needs_review">Needs Review</option>
                      <option value="auto_filed">Auto Filed</option>
                    </select>
                    {selectedEmails.length > 0 && (
                      <button 
                        onClick={handleBatchApproval}
                        className="btn-primary text-sm"
                      >
                        <i className="fas fa-check mr-2"></i>
                        Approve Selected ({selectedEmails.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {filteredEmails.map(email => (
                  <div key={email.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(email.id)}
                        onChange={() => handleEmailSelect(email.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium text-aldr-dark">{email.subject}</h3>
                            <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(email.status)}`}>
                              {email.status.replace('_', ' ')}
                            </span>
                          </div>
                          <span className="text-sm text-aldr-gray">{formatTimeAgo(email.receivedTime)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="text-sm text-aldr-gray">From: {email.from}</span>
                          <span className="text-sm text-aldr-gray">
                            {email.attachments.length} attachment{email.attachments.length !== 1 ? 's' : ''}
                          </span>
                        </div>

                        {/* ML Analysis Results */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-brain text-purple-500"></i>
                              <span className="font-medium text-aldr-dark">ML Analysis</span>
                              <span className={`font-medium ${getConfidenceColor(email.aiAnalysis.confidence)}`}>
                                {email.aiAnalysis.confidence}% confidence
                              </span>
                            </div>
                            <Link 
                              to={`/vault/${email.aiAnalysis.suggestedVault.toLowerCase().replace(' ', '-')}`}
                              className="text-sm text-aldr-teal hover:text-aldr-purple font-medium"
                            >
                              → {email.aiAnalysis.suggestedVault}
                            </Link>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-aldr-gray">Document Type:</span>
                              <div>{email.aiAnalysis.documentType}</div>
                            </div>
                            <div>
                              <span className="font-medium text-aldr-gray">Category:</span>
                              <div>{email.aiAnalysis.suggestedCategory}</div>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <span className="font-medium text-aldr-gray text-sm">Reasoning:</span>
                            <p className="text-sm text-aldr-dark mt-1">{email.aiAnalysis.reasoning}</p>
                          </div>

                          {/* Cross-vault Links */}
                          {email.aiAnalysis.crossVaultLinks && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <span className="font-medium text-aldr-gray text-sm">Cross-Vault Intelligence:</span>
                              {email.aiAnalysis.crossVaultLinks.map((link, index) => (
                                <div key={index} className="flex items-center justify-between mt-1 p-2 bg-blue-50 rounded">
                                  <span className="text-sm">{link.reason}</span>
                                  <Link 
                                    to={`/vault/${link.vault.toLowerCase().replace(' ', '-')}`}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    {link.vault} →
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Suggested Tags */}
                          <div className="mt-3">
                            <span className="font-medium text-aldr-gray text-sm">Suggested Tags:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {email.aiAnalysis.suggestedTags.map((tag, index) => (
                                <span key={index} className="bg-aldr-light text-aldr-dark px-2 py-1 rounded-pill text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Attachments */}
                        <div>
                          <span className="font-medium text-aldr-gray text-sm">Attachments:</span>
                          <div className="mt-1 space-y-1">
                            {email.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <i className="fas fa-paperclip text-aldr-gray"></i>
                                <span>{attachment.filename}</span>
                                <span className="text-aldr-gray">({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 mt-3">
                          <button className="btn-primary text-sm" onClick={() => alert('Demo Mode: Document filing functionality coming in production version')}>
                            <i className="fas fa-check mr-1"></i>
                            Approve & File
                          </button>
                          <button className="btn-secondary text-sm" onClick={() => alert('Demo Mode: Document editing functionality coming in production version')}>
                            <i className="fas fa-edit mr-1"></i>
                            Edit & File
                          </button>
                          <button className="btn-secondary text-sm" onClick={() => alert('Demo Mode: Document rejection functionality coming in production version')}>
                            <i className="fas fa-times mr-1"></i>
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recently Processed */}
          <section className="mb-8">
            <div className="card">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-aldr-dark">Recently Processed</h2>
              </div>
              <div className="divide-y">
                {recentlyProcessed.map(item => (
                  <div key={item.id} className="p-4 flex items-center justify-between">
                    <div className="flex-grow">
                      <h3 className="font-medium text-aldr-dark">{item.emailSubject}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-aldr-gray">{formatTimeAgo(item.processedTime)}</span>
                        <span className="text-sm text-aldr-teal">→ {item.vault}</span>
                        <span className="text-sm text-green-600">{item.confidence}% confidence</span>
                        <span className={`px-2 py-1 rounded-pill text-xs ${
                          item.userAction === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.userAction.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-aldr-gray">
                      {item.documentsCreated} document{item.documentsCreated !== 1 ? 's' : ''} created
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vault Distribution */}
          <section className="mb-8">
            <div className="card">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-aldr-dark">Processing Distribution</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(smartIngestionStats.vaultDistribution).map(([vault, count]) => (
                    <div key={vault} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-aldr-teal rounded-full flex items-center justify-center text-white text-sm">
                          <i className="fas fa-folder"></i>
                        </div>
                        <span className="font-medium text-aldr-dark">{vault}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-aldr-teal h-2 rounded-full" 
                            style={{ width: `${(count / smartIngestionStats.totalProcessed) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-aldr-dark w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center mt-12 py-6 border-t border-gray-200">
            <p className="text-aldr-gray">Smart Ingestion powered by Aldr ML</p>
            <p className="text-sm text-aldr-gray mt-2">
              © 2025 Aldr. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SmartIngestion;