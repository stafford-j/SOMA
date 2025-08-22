/**
 * BETA Learning Vault - Education and professional development
 * 
 * Education, certifications, and professional development tracking system
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { VaultHeader } from '../components/core';
import { supabase } from '../config/supabase';
import DocumentStats from '../components/DocumentStats';
import DocumentSearch from '../components/DocumentSearch';
import '../styles/Dashboard.css';

const BetaLearning = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [vault, setVault] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [uploadFile, setUploadFile] = useState(null);

  const categories = {
    all: 'All Learning',
    degrees: 'Degrees & Diplomas',
    certifications: 'Certifications',
    transcripts: 'Academic Transcripts',
    training: 'Professional Training',
    courses: 'Online Courses',
    skills: 'Skills Documentation',
    other: 'Other Learning'
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
        .eq('type', 'learning')
        .single();

      if (error) {
        console.error('Error loading vault:', error);
        setLoading(false);
      } else if (data) {
        setVault(data);
      } else {
        console.log('BetaLearning: No vault data returned');
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

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !vault) return;

    try {
      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${vault.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        alert('Error uploading file');
        return;
      }

      // Create document record
      const { data, error } = await supabase
        .from('documents')
        .insert({
          vault_id: vault.id,
          user_id: user.id,
          title: file.name,
          description: `Learning document uploaded: ${file.name}`,
          file_url: filePath,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          metadata: {
            category: 'other',
            upload_method: 'manual'
          }
        });

      if (error) {
        console.error('Error saving document:', error);
        alert('Error saving document');
      } else {
        alert('Learning document uploaded successfully!');
        loadDocuments(); // Refresh the list
      }
    } catch (err) {
      console.error('Error uploading document:', err);
      alert('Error uploading document');
    }

    // Reset file input
    e.target.value = '';
  };

  // Filter documents based on active filter
  useEffect(() => {
    const filtered = documents.filter(doc => {
      if (activeFilter === 'all') return true;
      return doc.metadata?.category === activeFilter;
    });
    setFilteredDocuments(filtered);
  }, [documents, activeFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading Learning vault...</div>
      </div>
    );
  }

  return (
    <main className="landing-container">
      <VaultHeader 
        title="Aldr Learning"
        subtitle="Track your education and professional development"
        actions={
          <>
            <button 
              onClick={() => navigate('/beta')}
              className="dashboard-button white"
            >
              <i className="fas fa-home mr-2"></i>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            
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

      <section className="main-content-section">
        <div className="w-full px-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Education & Professional Development
            </h2>
            <p className="text-white opacity-90">
              Organize your degrees, certifications, and professional training records
            </p>
          </div>

          {/* Document Statistics */}
          <DocumentStats 
            documents={documents} 
            vaultType="learning"
            className="mb-6"
          />

          {/* Document Search */}
          <DocumentSearch 
            documents={documents}
            onFilteredResults={setFilteredDocuments}
            placeholder="Search education and certification documents..."
          />

          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Upload Learning Document</h3>
            <div className="upload-section p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <i className="fas fa-graduation-cap text-3xl text-gray-400 mb-2"></i>
              <p className="text-gray-600 mb-3">Upload degrees, certificates, transcripts, and training documents</p>
              <input
                type="file"
                id="learning-upload"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              />
              <label
                htmlFor="learning-upload"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-upload mr-2"></i>
                Choose File
              </label>
            </div>
          </div>

          {/* Category Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Learning Categories</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === key
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                  {key !== 'all' && (
                    <span className="ml-2 text-sm opacity-75">
                      ({documents.filter(doc => doc.metadata?.category === key).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Portfolio */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Learning Portfolio ({filteredDocuments.length})
            </h3>
            
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-graduation-cap text-4xl mb-4 text-green-400"></i>
                <p className="text-lg font-medium mb-2">No learning documents yet</p>
                <p>Upload your first certificate or degree to start building your learning portfolio!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <i className="fas fa-graduation-cap text-green-500 mr-2"></i>
                          <h4 className="font-semibold text-gray-800">{doc.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{doc.description}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>
                            <i className="fas fa-calendar mr-1"></i>
                            {formatDate(doc.created_at)}
                          </span>
                          <span>
                            <i className="fas fa-file mr-1"></i>
                            {getFileSize(doc.file_size)}
                          </span>
                          <span>
                            <i className="fas fa-tag mr-1"></i>
                            {categories[doc.metadata?.category] || 'Other'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col space-y-2">
                        <button
                          onClick={() => alert('Document viewer would open here')}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          <i className="fas fa-eye mr-1"></i>
                          View
                        </button>
                        <button
                          onClick={() => alert('Verification functionality would be implemented here')}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          <i className="fas fa-certificate mr-1"></i>
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BetaLearning;