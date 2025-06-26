/**
 * BETA Travel Vault - Travel document management
 * 
 * Travel document organization and management system
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { VaultHeader } from '../components/core';
import { supabase } from '../config/supabase';
import '../styles/Dashboard.css';

const BetaTravel = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [vault, setVault] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [uploadFile, setUploadFile] = useState(null);

  const categories = {
    all: 'All Documents',
    passports: 'Passports & Visas',
    bookings: 'Travel Bookings',
    insurance: 'Travel Insurance',
    itineraries: 'Itineraries',
    other: 'Other Travel Documents'
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
        .eq('type', 'travel')
        .single();

      if (error) {
        console.error('Error loading vault:', error);
        setLoading(false);
      } else if (data) {
        setVault(data);
      } else {
        console.log('BetaTravel: No vault data returned');
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
        setDocuments(data || []);
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
          description: `Travel document uploaded: ${file.name}`,
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
        alert('Document uploaded successfully!');
        loadDocuments(); // Refresh the list
      }
    } catch (err) {
      console.error('Error uploading document:', err);
      alert('Error uploading document');
    }

    // Reset file input
    e.target.value = '';
  };

  const filteredDocuments = documents.filter(doc => {
    if (activeFilter === 'all') return true;
    return doc.metadata?.category === activeFilter;
  });

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
        <div className="text-white text-xl">Loading Travel vault...</div>
      </div>
    );
  }

  return (
    <main className="landing-container">
      <VaultHeader 
        title="Aldr Travel"
        subtitle="Your travel documents and itineraries"
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
              Travel Document Management
            </h2>
            <p className="text-white opacity-90">
              Organize your passports, visas, bookings, and travel documentation
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Upload Travel Document</h3>
            <div className="upload-section p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
              <p className="text-gray-600 mb-3">Upload travel documents (passports, visas, bookings, etc.)</p>
              <input
                type="file"
                id="travel-upload"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              />
              <label
                htmlFor="travel-upload"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                <i className="fas fa-upload mr-2"></i>
                Choose File
              </label>
            </div>
          </div>

          {/* Category Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Document Categories</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === key
                      ? 'bg-indigo-600 text-white'
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

          {/* Documents List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Travel Documents ({filteredDocuments.length})
            </h3>
            
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-suitcase text-4xl mb-4"></i>
                <p className="text-lg font-medium mb-2">No travel documents yet</p>
                <p>Upload your first travel document to get started!</p>
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
                        <h4 className="font-semibold text-gray-800 mb-2">{doc.title}</h4>
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
                          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
                        >
                          <i className="fas fa-eye mr-1"></i>
                          View
                        </button>
                        <button
                          onClick={() => alert('Download functionality would be implemented here')}
                          className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                        >
                          <i className="fas fa-download mr-1"></i>
                          Download
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

export default BetaTravel;