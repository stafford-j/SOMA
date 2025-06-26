/**
 * BETA Vault Page for Aldr Vaults BETA
 * 
 * Individual vault management page
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { VaultHeader } from '../components/core';
import { supabase } from '../config/supabase';

const BetaVault = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [vault, setVault] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadVault();
  }, [user, type, navigate]);

  useEffect(() => {
    if (vault) {
      loadDocuments();
    }
  }, [vault]);

  const loadVault = async () => {
    try {
      const { data, error } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', type)
        .single();

      if (error) {
        console.error('Error loading vault:', error);
      } else {
        setVault(data);
      }
    } catch (err) {
      console.error('Error loading vault:', err);
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

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !vault) return;

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${user.id}/${vault.id}/${Date.now()}.${fileExt}`;

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
          description: `Uploaded ${uploadFile.name}`,
          file_url: publicUrl,
          file_name: uploadFile.name,
          file_size: uploadFile.size,
          file_type: uploadFile.type,
          metadata: {
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

  if (loading || !vault) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading vault...</div>
      </div>
    );
  }

  return (
    <main className="landing-container">
      <VaultHeader 
        title={`Aldr ${vault.name}`}
        subtitle={vault.description}
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

      <section className="main-content-section">
        <div className="w-full px-8">
          {/* Upload Section */}
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Upload Document
            </h3>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
              </div>
              <button
                type="submit"
                disabled={!uploadFile || uploading}
                className="bg-gradient-to-r from-teal-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Document'}
              </button>
            </form>
          </div>

          {/* Documents List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Documents ({documents.length})
            </h3>
            
            {documents.length === 0 ? (
              <p className="text-gray-600">No documents uploaded yet. Upload your first document above.</p>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{doc.title}</h4>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                        <p className="text-xs text-gray-500">
                          Uploaded {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700"
                        >
                          View
                        </a>
                        <a
                          href={doc.file_url}
                          download={doc.file_name}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                        >
                          Download
                        </a>
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

export default BetaVault;