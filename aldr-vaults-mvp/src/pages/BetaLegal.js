/**
 * BETA Legal Vault - Based on Peter Murphy AldrLegal.js pattern
 * 
 * Complete legal document management with categorization and tracking
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { VaultHeader } from '../components/core';
import { supabase } from '../config/supabase';
import DocumentStats from '../components/DocumentStats';
import DocumentSearch from '../components/DocumentSearch';
import '../styles/Dashboard.css';

const BetaLegal = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [vault, setVault] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [saveMessage, setSaveMessage] = useState('');

  // Legal document categories based on Peter Murphy demo
  const legalCategories = {
    estate_planning: {
      name: 'Estate Planning',
      icon: 'fa-file-signature',
      color: '#8B5CF6',
      description: 'Wills, trusts, and estate documents'
    },
    property: {
      name: 'Property',
      icon: 'fa-home',
      color: '#10B981',
      description: 'Real estate and property documents'
    },
    personal_legal: {
      name: 'Personal Legal',
      icon: 'fa-user-shield',
      color: '#F59E0B',
      description: 'Personal legal agreements and contracts'
    },
    business: {
      name: 'Business',
      icon: 'fa-briefcase',
      color: '#EF4444',
      description: 'Business contracts and documents'
    },
    insurance: {
      name: 'Insurance',
      icon: 'fa-shield-alt',
      color: '#6366F1',
      description: 'Insurance policies and coverage'
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadVault();
  }, [user, navigate]);

  useEffect(() => {
    if (vault) {
      loadDocuments();
    }
  }, [vault]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadVault = async () => {
    try {
      const { data, error } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'legal')
        .single();

      if (error) {
        console.error('Error loading vault:', error);
        setLoading(false);
      } else if (data) {
        setVault(data);
      } else {
        console.log('BetaLegal: No vault data returned');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading vault:', err);
      setLoading(false);
    }
  };

  const loadDocuments = async () => {
    if (!vault) return;
    
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .eq('vault_id', vault.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading documents:', error);
      } else {
        const docs = data || [];
        setDocuments(docs);
        setFilteredDocuments(docs);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
    }
    
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !vault) return;

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${user.id}/${vault.id}/legal_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, uploadFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload file');
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      // Save document record
      const { data, error } = await supabase
        .from('documents')
        .insert({
          vault_id: vault.id,
          user_id: user.id,
          title: uploadFile.name,
          description: `Legal document: ${uploadFile.name}`,
          file_url: publicUrl,
          file_name: uploadFile.name,
          file_size: uploadFile.size,
          file_type: uploadFile.type,
          metadata: {
            category: selectedCategory !== 'all' ? selectedCategory : 'personal_legal',
            document_type: 'legal',
            original_name: uploadFile.name,
            upload_date: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving document:', error);
        alert('Failed to save document record');
      } else {
        setDocuments([data, ...documents]);
        setUploadFile(null);
        setSaveMessage('Document uploaded successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload file');
    }

    setUploading(false);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  const getFilteredDocuments = () => {
    if (selectedCategory === 'all') {
      return documents;
    }
    return documents.filter(doc => doc.metadata?.category === selectedCategory);
  };

  const getDocumentsByCategory = () => {
    const grouped = {};
    documents.forEach(doc => {
      const category = doc.metadata?.category || 'personal_legal';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(doc);
    });
    return grouped;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || !vault) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading Legal vault...</div>
      </div>
    );
  }

  const filteredDocumentsComputed = getFilteredDocuments();
  const documentsByCategory = getDocumentsByCategory();

  return (
    <main className="landing-container">
      <VaultHeader 
        title="Aldr Legal"
        subtitle="Your secure legal document management system"
        actions={
          <>
            <button 
              onClick={() => navigate('/beta')}
              className="dashboard-button white"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              <span className="hidden sm:inline">Back to Vaults</span>
            </button>
            
            <div className="dashboard-button white">
              <i className="fas fa-user mr-2"></i>
              <span className="hidden sm:inline">{user?.user_metadata?.first_name || user?.email}</span>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="dashboard-button white"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </>
        }
      />

      <section className="dashboard-section">
        <div className="dashboard-container">
          {saveMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {saveMessage}
            </div>
          )}

          {/* Header */}
          <div className="dashboard-header-section">
            <div className="dashboard-title-row">
              <h2 className="dashboard-title">Legal Documents</h2>
              <div className="dashboard-mode-toggle">
                <span className="text-white">Total: {documents.length} documents</span>
              </div>
            </div>
          </div>

          {/* Document Statistics */}
          <div className="mb-6">
            <DocumentStats 
              documents={documents} 
              vaultType="legal"
            />
          </div>

          {/* Document Search */}
          <DocumentSearch 
            documents={documents}
            onFilteredResults={setFilteredDocuments}
            placeholder="Search legal documents..."
          />

          <div className="dashboard-grid">
            {/* Upload Section */}
            <div className="dashboard-card full-width">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-upload mr-2"></i>
                  Upload Legal Document
                </h3>
                <p className="card-subtitle">Add new legal documents to your vault</p>
              </div>
              <div className="card-content">
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Document Category</label>
                      <select
                        value={selectedCategory === 'all' ? 'personal_legal' : selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-input"
                      >
                        {Object.entries(legalCategories).map(([key, category]) => (
                          <option key={key} value={key}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Select File</label>
                      <input
                        type="file"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                        className="form-input"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!uploadFile || uploading}
                    className="save-button"
                  >
                    {uploading ? 'Uploading...' : 'Upload Document'}
                  </button>
                </form>
              </div>
            </div>

            {/* Category Filter */}
            <div className="dashboard-card full-width">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-filter mr-2"></i>
                  Filter by Category
                </h3>
              </div>
              <div className="card-content">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-teal-600 to-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Documents ({documents.length})
                  </button>
                  
                  {Object.entries(legalCategories).map(([key, category]) => {
                    const count = documentsByCategory[key]?.length || 0;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          selectedCategory === key
                            ? 'text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        style={{
                          backgroundColor: selectedCategory === key ? category.color : undefined
                        }}
                      >
                        <i className={`fas ${category.icon} mr-2`}></i>
                        {category.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Documents Display */}
            {selectedCategory === 'all' ? (
              // Show by category
              Object.entries(legalCategories).map(([categoryKey, category]) => {
                const categoryDocs = documentsByCategory[categoryKey] || [];
                if (categoryDocs.length === 0) return null;

                return (
                  <div key={categoryKey} className="dashboard-card full-width">
                    <div className="card-header" style={{ background: category.color }}>
                      <h3 className="card-title">
                        <i className={`fas ${category.icon} mr-2`}></i>
                        {category.name}
                      </h3>
                      <p className="card-subtitle">{category.description}</p>
                    </div>
                    <div className="card-content">
                      <div className="documents-grid">
                        {categoryDocs.map((doc) => (
                          <div key={doc.id} className="document-item">
                            <div className="document-header">
                              <h4 className="document-title">{doc.title}</h4>
                              <div className="document-status">
                                <span className="status-uploaded">
                                  <i className="fas fa-check-circle mr-1"></i>
                                  Uploaded
                                </span>
                              </div>
                            </div>

                            <div className="document-details">
                              <p>{doc.description}</p>
                              <p className="text-sm text-gray-500">
                                Uploaded: {formatDate(doc.created_at)}
                              </p>
                            </div>

                            <div className="document-actions">
                              <a
                                href={doc.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="document-action view"
                              >
                                <i className="fas fa-eye mr-1"></i>
                                View
                              </a>
                              <a
                                href={doc.file_url}
                                download={doc.file_name}
                                className="document-action download"
                              >
                                <i className="fas fa-download mr-1"></i>
                                Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Show filtered documents
              <div className="dashboard-card full-width">
                <div className="card-header" style={{ background: legalCategories[selectedCategory]?.color }}>
                  <h3 className="card-title">
                    <i className={`fas ${legalCategories[selectedCategory]?.icon} mr-2`}></i>
                    {legalCategories[selectedCategory]?.name} Documents
                  </h3>
                  <p className="card-subtitle">{filteredDocumentsComputed.length} documents</p>
                </div>
                <div className="card-content">
                  {filteredDocumentsComputed.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <i className="fas fa-folder-open text-4xl mb-4"></i>
                      <p>No documents in this category yet.</p>
                      <p>Upload your first {legalCategories[selectedCategory]?.name.toLowerCase()} document above.</p>
                    </div>
                  ) : (
                    <div className="documents-grid">
                      {filteredDocumentsComputed.map((doc) => (
                        <div key={doc.id} className="document-item">
                          <div className="document-header">
                            <h4 className="document-title">{doc.title}</h4>
                            <div className="document-status">
                              <span className="status-uploaded">
                                <i className="fas fa-check-circle mr-1"></i>
                                Uploaded
                              </span>
                            </div>
                          </div>

                          <div className="document-details">
                            <p>{doc.description}</p>
                            <p className="text-sm text-gray-500">
                              Uploaded: {formatDate(doc.created_at)}
                            </p>
                          </div>

                          <div className="document-actions">
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="document-action view"
                            >
                              <i className="fas fa-eye mr-1"></i>
                              View
                            </a>
                            <a
                              href={doc.file_url}
                              download={doc.file_name}
                              className="document-action download"
                            >
                              <i className="fas fa-download mr-1"></i>
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BetaLegal;