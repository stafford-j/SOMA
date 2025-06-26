/**
 * DocumentStats Component
 * 
 * Shows document statistics and analytics for vault dashboards
 */

import React from 'react';

const DocumentStats = ({ documents, vaultType, className = "" }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className={`document-stats-container bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          <i className="fas fa-chart-bar mr-2 text-purple-600"></i>
          Document Analytics
        </h3>
        <div className="text-center py-4 text-gray-500">
          <i className="fas fa-file-alt text-3xl mb-2"></i>
          <p>No documents to analyze yet</p>
          <p className="text-sm">Upload documents to see analytics</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalDocuments = documents.length;
  const totalSize = documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0);
  const recentDocuments = documents.filter(doc => {
    const uploadDate = new Date(doc.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return uploadDate >= weekAgo;
  }).length;

  // Get file type distribution
  const fileTypes = {};
  documents.forEach(doc => {
    const extension = doc.file_name?.split('.').pop()?.toLowerCase() || 'unknown';
    fileTypes[extension] = (fileTypes[extension] || 0) + 1;
  });

  // Get category distribution
  const categories = {};
  documents.forEach(doc => {
    const category = doc.metadata?.category || 'uncategorized';
    categories[category] = (categories[category] || 0) + 1;
  });

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get icon for file type
  const getFileTypeIcon = (extension) => {
    const icons = {
      pdf: 'fas fa-file-pdf text-red-500',
      doc: 'fas fa-file-word text-blue-500',
      docx: 'fas fa-file-word text-blue-500',
      jpg: 'fas fa-file-image text-green-500',
      jpeg: 'fas fa-file-image text-green-500',
      png: 'fas fa-file-image text-green-500',
      txt: 'fas fa-file-alt text-gray-500',
      mp4: 'fas fa-file-video text-purple-500',
      mp3: 'fas fa-file-audio text-orange-500',
    };
    return icons[extension] || 'fas fa-file text-gray-400';
  };

  // Get vault-specific insights
  const getVaultInsights = () => {
    switch (vaultType) {
      case 'overview':
        return {
          title: 'Vault Distribution',
          items: [
            `${documents.filter(d => d.vaults?.type === 'identity').length} Identity documents`,
            `${documents.filter(d => d.vaults?.type === 'legal').length} Legal documents`,
            `${documents.filter(d => d.vaults?.type === 'travel').length} Travel documents`,
            `${documents.filter(d => d.vaults?.type === 'memories').length} Memory items`,
            `${documents.filter(d => d.vaults?.type === 'learning').length} Learning documents`
          ].filter(item => !item.startsWith('0 '))
        };
      case 'identity':
        return {
          title: 'Identity Insights',
          items: [
            `${documents.filter(d => d.metadata?.document_type === 'passport').length} Passport documents`,
            `${documents.filter(d => d.metadata?.document_type === 'driversLicense').length} Driver's licenses`,
            `${documents.filter(d => d.metadata?.document_type === 'governmentId').length} Government IDs`
          ]
        };
      case 'legal':
        return {
          title: 'Legal Insights',
          items: [
            `${categories.estate_planning || 0} Estate planning documents`,
            `${categories.insurance || 0} Insurance policies`,
            `${categories.property || 0} Property documents`
          ]
        };
      case 'travel':
        return {
          title: 'Travel Insights',
          items: [
            `${categories.passports || 0} Passport & visa documents`,
            `${categories.bookings || 0} Travel bookings`,
            `${categories.insurance || 0} Travel insurance docs`
          ]
        };
      case 'memories':
        return {
          title: 'Memory Insights',
          items: [
            `${categories.family_photos || 0} Family photos`,
            `${categories.stories || 0} Life stories`,
            `${categories.achievements || 0} Achievement documents`
          ]
        };
      case 'learning':
        return {
          title: 'Learning Insights',
          items: [
            `${categories.degrees || 0} Degrees & diplomas`,
            `${categories.certifications || 0} Certifications`,
            `${categories.training || 0} Training documents`
          ]
        };
      default:
        return null;
    }
  };

  const vaultInsights = getVaultInsights();

  return (
    <div className={`document-stats-container bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-chart-bar mr-2 text-purple-600"></i>
        Document Analytics
      </h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <i className="fas fa-file text-white"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalDocuments}</p>
              <p className="text-sm text-gray-600">Total Documents</p>
            </div>
          </div>
        </div>

        <div className="stat-card bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="bg-green-600 p-2 rounded-lg mr-3">
              <i className="fas fa-database text-white"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{formatFileSize(totalSize)}</p>
              <p className="text-sm text-gray-600">Total Storage</p>
            </div>
          </div>
        </div>

        <div className="stat-card bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="bg-purple-600 p-2 rounded-lg mr-3">
              <i className="fas fa-clock text-white"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{recentDocuments}</p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Types */}
        <div className="file-types">
          <h4 className="font-semibold text-gray-700 mb-3">File Types</h4>
          <div className="space-y-2">
            {Object.entries(fileTypes).slice(0, 5).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className={`${getFileTypeIcon(type)} mr-2`}></i>
                  <span className="text-sm text-gray-600 uppercase">{type}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories or Vault-specific insights */}
        <div className="categories">
          <h4 className="font-semibold text-gray-700 mb-3">
            {vaultInsights ? vaultInsights.title : 'Categories'}
          </h4>
          <div className="space-y-2">
            {vaultInsights ? (
              vaultInsights.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <i className="fas fa-check-circle text-teal-500 mr-2"></i>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))
            ) : (
              Object.entries(categories).slice(0, 5).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{category.replace('_', ' ')}</span>
                  <span className="text-sm font-medium text-gray-800">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentStats;