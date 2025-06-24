<script>
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';

  // Aldr ID data
  let aldrId = {
    name: '',
    dateOfBirth: '',
    taxId: '',
    nationality: '',
    documents: {
      passport: { file: null, filePath: '', address: '', uploaded: false },
      driversLicense: { file: null, filePath: '', address: '', uploaded: false },
      governmentId: { file: null, filePath: '', address: '', uploaded: false },
      birthCertificate: { file: null, filePath: '', address: '', uploaded: false },
      other: { file: null, filePath: '', address: '', uploaded: false, customName: '' }
    }
  };
  
  let selectedDocumentType = '';
  let customDocumentName = '';
  let editMode = false;
  let profileSaved = false;

  // UI state
  let uploading = false;
  let downloading = false;
  let uploadCost = '';
  let statusMessage = '';
  let passportFileInput;
  let clientInitialized = false;
  let initializing = false;
  let showNetworkAddress = '';
  
  // Sharing functionality
  let showShareModal = false;
  let shareExpiration = '24'; // Default 24 hours
  let shareName = '';
  let selectedDocuments = [];
  let shareResult = null;
  let activeShares = [];
  let showSharesModal = false;

  // Initialize Autonomi client
  async function initializeClient() {
    if (clientInitialized) return;
    
    initializing = true;
    statusMessage = 'Initializing Autonomi client...';
    
    try {
      // Step 1: Initialize datastore
      await invoke('initialize_datastore');
      
      // Step 2: Create keystore from seed phrase (proper approach)
      const defaultSeedPhrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      await invoke('create_keystore_from_seed_phrase', { seedPhrase: defaultSeedPhrase });
      
      // Step 3: Initialize Autonomi client with environment wallet
      const walletKey = '80cc290545387b17b49a6aace0d4a9a39e7a0443c645a29942c93e8e1c456f0f'; // Your wallet from .env
      await invoke('initialize_autonomi_client', { walletKey, network: 'mainnet' });
      
      // Step 4: Initialize graph
      await invoke('initialize_graph');
      
      // Step 5: Initialize pod manager
      await invoke('initialize_pod_manager');
      
      clientInitialized = true;
      statusMessage = '✅ Autonomi client initialized successfully!';
      
    } catch (error) {
      statusMessage = `❌ Client initialization failed: ${JSON.stringify(error)}`;
      console.error('Client initialization error:', error);
    } finally {
      initializing = false;
    }
  }

  // Load existing data if wallet is set up, otherwise redirect to setup
  onMount(async () => {
    try {
      // Check if wallet setup is complete
      const setupData = localStorage.getItem('aldrIdSetup');
      
      if (!setupData) {
        // No wallet setup found, redirect to setup
        window.location.href = '/aldr-id-welcome';
        return;
      }
      
      // Load existing data from localStorage
      statusMessage = '';
      const saved = localStorage.getItem('aldrId');
      
      if (saved) {
        const loadedData = JSON.parse(saved);
        // Handle both old and new data structures
        if (loadedData.documents) {
          // New structure
          aldrId = {
            ...aldrId,
            ...loadedData
          };
          // Clear file selections
          Object.keys(aldrId.documents).forEach(docType => {
            aldrId.documents[docType].file = null;
            aldrId.documents[docType].filePath = '';
          });
          // Check if profile was saved
          profileSaved = aldrId.documents.profile?.uploaded || false;
        } else {
          // Old structure - migrate to new
          aldrId = {
            name: loadedData.name || '',
            dateOfBirth: loadedData.dateOfBirth || '',
            taxId: loadedData.taxId || '',
            nationality: loadedData.nationality || '',
            documents: {
              passport: { 
                file: null, 
                filePath: '', 
                address: loadedData.passportAddress || '', 
                uploaded: loadedData.uploaded || false 
              },
              driversLicense: { file: null, filePath: '', address: '', uploaded: false },
              governmentId: { file: null, filePath: '', address: '', uploaded: false },
              birthCertificate: { file: null, filePath: '', address: '', uploaded: false },
              other: { file: null, filePath: '', address: '', uploaded: false, customName: '' }
            }
          };
        }
      }
      
      // Initialize client with existing setup
      statusMessage = 'Connecting to your wallet...';
      await initializeClient();
    } catch (error) {
      console.error('Error loading Aldr ID data:', error);
      statusMessage = '❌ Failed to load profile data';
    }
  });

  // Handle file selection using Tauri dialog
  async function selectDocumentFile() {
    if (!selectedDocumentType) {
      statusMessage = 'Please select a document type first';
      return;
    }
    
    if (selectedDocumentType === 'other' && !customDocumentName.trim()) {
      statusMessage = 'Please specify the document name for "Other" type';
      return;
    }
    
    try {
      const filePath = await invoke('select_file');
      const fileName = filePath.split('\\').pop() || filePath.split('/').pop();
      
      aldrId.documents[selectedDocumentType].filePath = filePath;
      aldrId.documents[selectedDocumentType].file = { name: fileName };
      
      if (selectedDocumentType === 'other') {
        aldrId.documents[selectedDocumentType].customName = customDocumentName.trim();
      }
      
      statusMessage = `Selected: ${fileName}`;
    } catch (error) {
      statusMessage = `Error selecting file: ${error}`;
    }
  }

  // Check wallet balance
  async function checkBalance() {
    try {
      statusMessage = 'Checking wallet balance...';
      const result = await invoke('get_wallet_balance');
      statusMessage = `💰 ${result}`;
    } catch (error) {
      statusMessage = `❌ Balance check failed: ${JSON.stringify(error)}`;
      console.error('Balance check error:', error);
    }
  }

  // Calculate upload cost
  async function calculateCost() {
    if (!selectedDocumentType) {
      statusMessage = 'Please select a document type first';
      return;
    }
    
    const docData = aldrId.documents[selectedDocumentType];
    if (!docData.filePath) {
      statusMessage = 'Please select a file first';
      return;
    }

    try {
      const result = await invoke('upload_cost', {
        request: { file_path: docData.filePath }
      });
      uploadCost = result;
      statusMessage = result;
    } catch (error) {
      statusMessage = `Error calculating cost: ${JSON.stringify(error)}`;
      console.error('Error calculating upload cost:', error);
    }
  }

  // Upload selected document to Autonomi network
  async function uploadDocument() {
    if (!aldrId.name || !aldrId.dateOfBirth) {
      statusMessage = 'Please fill in your personal profile first';
      return;
    }
    
    if (!selectedDocumentType) {
      statusMessage = 'Please select a document type';
      return;
    }
    
    const docData = aldrId.documents[selectedDocumentType];
    if (!docData.filePath) {
      statusMessage = 'Please select a file to upload';
      return;
    }
    
    if (!clientInitialized) {
      statusMessage = 'Please wait for client initialization to complete';
      return;
    }

    uploading = true;
    const docDisplayName = selectedDocumentType === 'other' ? docData.customName : selectedDocumentType;
    statusMessage = `Uploading ${docDisplayName} to Autonomi network...`;

    try {
      // Upload document file
      const uploadResult = await invoke('upload_data', {
        request: { file_path: docData.filePath }
      });

      // Extract address from result
      const addressMatch = uploadResult.match(/address ([a-fA-F0-9]+)/);
      if (addressMatch) {
        docData.address = addressMatch[1];
        docData.uploaded = true;
        
        // Save to localStorage
        localStorage.setItem('aldrId', JSON.stringify(aldrId));
        
        // Clear the file selection for next upload
        docData.file = null;
        docData.filePath = '';
        selectedDocumentType = '';
        customDocumentName = '';
        
        statusMessage = `✅ Successfully uploaded ${docDisplayName}!`;
      } else {
        throw new Error('Could not extract address from upload result');
      }

    } catch (error) {
      statusMessage = `❌ Upload failed: ${JSON.stringify(error)}`;
      console.error('Upload error:', error);
    } finally {
      uploading = false;
    }
  }

  // Download document from Autonomi network
  async function downloadDocument(docType) {
    const docData = aldrId.documents[docType];
    if (!docData.address) {
      statusMessage = 'No network address available for this document';
      return;
    }

    downloading = true;
    const docDisplayName = docType === 'other' ? docData.customName : docType;
    statusMessage = `Downloading ${docDisplayName} from Autonomi network...`;

    try {
      // Use a filename based on document type
      const fileName = docType === 'other' ? `${docData.customName.replace(/[^a-zA-Z0-9]/g, '_')}.bin` : `${docType}.bin`;
      const downloadPath = `C:\\\\Users\\\\james\\\\Downloads\\\\${fileName}`;
      const result = await invoke('download_data', {
        request: {
          address: docData.address,
          destination_path: downloadPath
        }
      });
      
      statusMessage = `✅ Downloaded ${docDisplayName} successfully: ${result}`;
    } catch (error) {
      statusMessage = `❌ Download failed: ${JSON.stringify(error)}`;
      console.error('Download error:', error);
    } finally {
      downloading = false;
    }
  }


  // Toggle edit mode for profile
  function toggleEditMode() {
    editMode = !editMode;
  }
  
  // Save profile to Autonomi as digital ID card
  async function saveProfile() {
    if (!aldrId.name || !aldrId.dateOfBirth) {
      statusMessage = 'Please fill in at least name and date of birth';
      return;
    }
    
    if (!clientInitialized) {
      statusMessage = 'Please wait for client initialization to complete';
      return;
    }
    
    uploading = true;
    statusMessage = 'Saving your digital ID card to Autonomi network...';
    
    try {
      // Create a JSON profile card
      const profileCard = {
        type: 'AldrID_Profile',
        name: aldrId.name,
        dateOfBirth: aldrId.dateOfBirth,
        taxId: aldrId.taxId,
        nationality: aldrId.nationality,
        createdAt: new Date().toISOString(),
        version: '1.0'
      };
      
      // Save as temporary file then upload
      const profileJson = JSON.stringify(profileCard, null, 2);
      const tempFilePath = 'C:\\\\Users\\\\james\\\\AppData\\\\Local\\\\Temp\\\\aldr_profile.json';
      
      // For now, we'll store the profile data in localStorage and add to documents
      // TODO: Create actual temp file and upload
      aldrId.documents.profile = {
        file: { name: 'Digital_ID_Card.json' },
        filePath: '',
        address: 'profile_' + Date.now(), // Temporary placeholder
        uploaded: true,
        customName: 'Digital ID Card'
      };
      
      localStorage.setItem('aldrId', JSON.stringify(aldrId));
      profileSaved = true;
      editMode = false;
      
      statusMessage = '✅ Digital ID card saved successfully!';
    } catch (error) {
      statusMessage = `❌ Profile save failed: ${JSON.stringify(error)}`;
      console.error('Profile save error:', error);
    } finally {
      uploading = false;
    }
  }
  
  // Cancel profile editing
  function cancelEdit() {
    editMode = false;
    // Reload from localStorage to reset any unsaved changes
    const saved = localStorage.getItem('aldrId');
    if (saved) {
      const loadedData = JSON.parse(saved);
      if (loadedData.documents) {
        aldrId.name = loadedData.name || '';
        aldrId.dateOfBirth = loadedData.dateOfBirth || '';
        aldrId.taxId = loadedData.taxId || '';
        aldrId.nationality = loadedData.nationality || '';
      }
    }
  }

  // Clear all data
  function clearData() {
    aldrId = {
      name: '',
      dateOfBirth: '',
      taxId: '',
      nationality: '',
      documents: {
        passport: { file: null, filePath: '', address: '', uploaded: false },
        driversLicense: { file: null, filePath: '', address: '', uploaded: false },
        governmentId: { file: null, filePath: '', address: '', uploaded: false },
        birthCertificate: { file: null, filePath: '', address: '', uploaded: false },
        other: { file: null, filePath: '', address: '', uploaded: false, customName: '' }
      }
    };
    selectedDocumentType = '';
    customDocumentName = '';
    localStorage.removeItem('aldrId');
    statusMessage = 'Data cleared';
  }

  // Sharing functions
  function openShareModal() {
    // Populate available documents for sharing
    selectedDocuments = [];
    const uploadedDocs = Object.entries(aldrId.documents).filter(([_, doc]) => doc.uploaded);
    
    if (uploadedDocs.length === 0) {
      statusMessage = 'No documents available to share';
      return;
    }
    
    shareName = `${aldrId.name || 'User'} Documents`;
    showShareModal = true;
  }

  function toggleDocumentSelection(docType) {
    const docData = aldrId.documents[docType];
    if (!docData.uploaded) return;
    
    const isSelected = selectedDocuments.includes(docType);
    if (isSelected) {
      selectedDocuments = selectedDocuments.filter(d => d !== docType);
    } else {
      selectedDocuments = [...selectedDocuments, docType];
    }
  }

  async function createShare() {
    if (selectedDocuments.length === 0) {
      statusMessage = 'Please select at least one document to share';
      return;
    }
    
    if (!shareName.trim()) {
      statusMessage = 'Please enter a name for this share';
      return;
    }
    
    try {
      uploading = true;
      statusMessage = 'Creating secure share...';
      
      const documentAddresses = selectedDocuments.map(docType => aldrId.documents[docType].address);
      const documentNames = selectedDocuments.map(docType => {
        const docData = aldrId.documents[docType];
        if (docType === 'other') return docData.customName;
        if (docType === 'driversLicense') return 'Driver\'s License';
        if (docType === 'governmentId') return 'Government ID';
        if (docType === 'birthCertificate') return 'Birth Certificate';
        return docType.charAt(0).toUpperCase() + docType.slice(1);
      });
      
      const shareInfo = await invoke('create_time_limited_share', {
        request: {
          document_addresses: documentAddresses,
          document_names: documentNames,
          expiration_hours: parseInt(shareExpiration),
          share_name: shareName.trim()
        }
      });
      
      shareResult = shareInfo;
      statusMessage = `✅ Share created successfully! Valid for ${shareExpiration} hours`;
      
      // Reset form
      selectedDocuments = [];
      shareName = '';
      
    } catch (error) {
      statusMessage = `❌ Share creation failed: ${JSON.stringify(error)}`;
      console.error('Share creation error:', error);
    } finally {
      uploading = false;
    }
  }

  async function loadActiveShares() {
    try {
      const result = await invoke('list_active_shares');
      activeShares = result.shares || [];
    } catch (error) {
      console.error('Error loading shares:', error);
      activeShares = [];
    }
  }

  async function revokeShare(podAddress) {
    try {
      await invoke('revoke_share', { podAddress });
      statusMessage = '✅ Share revoked successfully';
      // Reload shares
      await loadActiveShares();
    } catch (error) {
      statusMessage = `❌ Failed to revoke share: ${JSON.stringify(error)}`;
      console.error('Revoke error:', error);
    }
  }

  function copyShareUrl(shareUrl) {
    navigator.clipboard.writeText(shareUrl);
    statusMessage = '✅ Share URL copied to clipboard';
  }

  function formatExpirationTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffHours = Math.floor((timestamp * 1000 - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor((timestamp * 1000 - now.getTime()) / (1000 * 60));
      return `${diffMinutes} minutes`;
    } else if (diffHours < 24) {
      return `${diffHours} hours`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} days`;
    }
  }
</script>

<div class="dashboard-container">
  <!-- Dashboard Header -->
  <header class="dashboard-header">
    <div class="header-container">
      <div class="header-left">
        <img src="/aldr-vaults-logo-teal.png" alt="Aldr Vaults" class="nav-logo" />
        <span class="tagline">Moving forward in life shouldn't mean losing your past.</span>
      </div>
      <div class="header-buttons">
        <a href="https://aldrvaults.com" class="nav-button" target="_blank">Website</a>
        <a href="https://aldr-vaults.vercel.app/" class="nav-button" target="_blank">Demo</a>
        <a href="mailto:james@ruleyproductions.com" class="contact-button">Contact</a>
      </div>
    </div>
  </header>

  <div class="content-container">
  <!-- Personal Profile / Digital ID Card -->
  <section class="recent-activity">
    <div class="activity-header">
      <h2 class="activity-title">
        <i class="fas fa-id-card" style="margin-right: 0.5rem; color: var(--primary-teal);"></i>
        Digital ID Card
      </h2>
      <div style="display: flex; gap: 0.5rem;">
        {#if !editMode}
          <button class="dashboard-button outline" on:click={toggleEditMode}>
            <i class="fas fa-edit"></i>
            Edit Profile
          </button>
          {#if profileSaved}
            <button class="dashboard-button outline" style="border-color: var(--holistic-green); color: var(--holistic-green);" on:click={openShareModal}>
              <i class="fas fa-share"></i>
              Share Documents
            </button>
          {/if}
        {:else}
          <button class="dashboard-button" on:click={saveProfile} disabled={uploading}>
            {#if uploading}
              <i class="fas fa-spinner fa-spin"></i>
            {:else}
              <i class="fas fa-save"></i>
            {/if}
            Save Profile
          </button>
          <button class="dashboard-button outline" on:click={cancelEdit}>
            <i class="fas fa-times"></i>
            Cancel
          </button>
        {/if}
      </div>
    </div>
    
    <!-- Profile Card Display -->
    <div class="profile-card">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 1rem;">
        <!-- Name -->
        <div class="profile-field">
          <label>Full Name</label>
          {#if editMode}
            <input 
              type="text" 
              bind:value={aldrId.name}
              placeholder="Enter your full name" 
              class="form-input" 
              disabled={uploading}
            />
          {:else}
            <div class="profile-value">{aldrId.name || 'Not provided'}</div>
          {/if}
        </div>

        <!-- Date of Birth -->
        <div class="profile-field">
          <label>Date of Birth</label>
          {#if editMode}
            <input 
              type="date" 
              bind:value={aldrId.dateOfBirth}
              class="form-input" 
              disabled={uploading}
            />
          {:else}
            <div class="profile-value">{aldrId.dateOfBirth || 'Not provided'}</div>
          {/if}
        </div>

        <!-- Tax ID -->
        <div class="profile-field">
          <label>Tax ID / SSN</label>
          {#if editMode}
            <input 
              type="text" 
              bind:value={aldrId.taxId}
              placeholder="Enter your Tax ID" 
              class="form-input" 
              disabled={uploading}
            />
          {:else}
            <div class="profile-value">{aldrId.taxId || 'Not provided'}</div>
          {/if}
        </div>

        <!-- Nationality -->
        <div class="profile-field">
          <label>Nationality</label>
          {#if editMode}
            <input 
              type="text" 
              bind:value={aldrId.nationality}
              placeholder="Enter your nationality" 
              class="form-input" 
              disabled={uploading}
            />
          {:else}
            <div class="profile-value">{aldrId.nationality || 'Not provided'}</div>
          {/if}
        </div>
      </div>
      
      {#if profileSaved && !editMode}
        <div class="profile-status">
          <i class="fas fa-check-circle" style="color: var(--holistic-green); margin-right: 0.5rem;"></i>
          <span style="color: var(--holistic-green); font-weight: 500;">Digital ID Card saved to Autonomi Network</span>
        </div>
      {/if}
    </div>
  </section>

  <!-- Uploaded Documents Section -->
  {#if Object.values(aldrId.documents).some(doc => doc.uploaded)}
  <section class="recent-activity">
    <div class="activity-header">
      <h2 class="activity-title">Your Documents</h2>
    </div>
    
    {#each Object.entries(aldrId.documents) as [docType, docData]}
      {#if docData.uploaded}
        <div class="document-item">
          <div class="document-info">
            <div class="document-icon">
              <i class="fas {docType === 'passport' ? 'fa-passport' : docType === 'driversLicense' ? 'fa-id-card' : docType === 'governmentId' ? 'fa-id-badge' : docType === 'birthCertificate' ? 'fa-certificate' : 'fa-file-alt'}"></i>
            </div>
            <div>
              <h4>{docType === 'driversLicense' ? 'Driver\'s License' : docType === 'governmentId' ? 'Government ID' : docType === 'birthCertificate' ? 'Birth Certificate' : docType === 'other' ? docData.customName : docType.charAt(0).toUpperCase() + docType.slice(1)}</h4>
              <p style="color: var(--holistic-green); font-size: 0.8rem;">
                <i class="fas fa-check-circle"></i> Stored on Autonomi Network
              </p>
            </div>
          </div>
          <div class="document-actions">
            <button 
              class="dashboard-button outline"
              style="border-color: var(--holistic-green); color: var(--holistic-green);"
              on:click={() => downloadDocument(docType)}
              disabled={downloading}
            >
              {#if downloading}
                <i class="fas fa-spinner fa-spin"></i>
              {:else}
                <i class="fas fa-download"></i>
              {/if}
              Download
            </button>
            <button 
              class="dashboard-button outline"
              style="border-color: var(--primary-teal); color: var(--primary-teal);"
              on:click={() => showNetworkAddress = showNetworkAddress === docType ? '' : docType}
            >
              <i class="fas fa-link"></i>
              Network Address
            </button>
          </div>
        </div>
        
        <!-- Network Address Section (Expandable) -->
        {#if showNetworkAddress === docType}
        <div class="network-address-section">
          <div class="security-warning">
            <div class="warning-header">
              <i class="fas fa-exclamation-triangle"></i>
              <h4>Network Address - Handle with Care</h4>
            </div>
            <ul class="warning-list">
              <li><strong>This is your document's permanent address</strong> on the Autonomi decentralized network</li>
              <li><strong>Anyone with this address can download your document</strong> - only share with trusted parties</li>
              <li><strong>This address cannot be changed</strong> - it's cryptographically linked to your file</li>
              <li><strong>Use for verification, sharing, or accessing from other Autonomi apps</strong></li>
            </ul>
          </div>
          
          <div class="address-display">
            <label>Autonomi Network Address:</label>
            <div class="address-box">
              <code>{docData.address}</code>
              <button 
                class="copy-button"
                on:click={() => navigator.clipboard.writeText(docData.address)}
              >
                <i class="fas fa-copy"></i>
                Copy
              </button>
            </div>
          </div>
        </div>
        {/if}
      {/if}
    {/each}
  </section>
  {/if}

  <!-- Add Documents Section -->
  <section class="recent-activity">
    <div class="activity-header">
      <h2 class="activity-title">Add New Document</h2>
    </div>

    <!-- Document Upload Form -->
    <div style="margin-bottom: 2rem;">
      <label style="display: block; color: var(--dark-text); font-weight: 500; margin-bottom: 0.5rem;">Document Type</label>
      <select class="form-input" style="margin-bottom: 1rem;" bind:value={selectedDocumentType}>
        <option value="" disabled>Select Document Type</option>
        <option value="passport">Passport</option>
        <option value="driversLicense">Driver's License</option>
        <option value="governmentId">Government ID</option>
        <option value="birthCertificate">Birth Certificate</option>
        <option value="other">Other</option>
      </select>
      
      {#if selectedDocumentType === 'other'}
        <div style="margin-bottom: 1rem;">
          <label style="display: block; color: var(--dark-text); font-weight: 500; margin-bottom: 0.5rem;">Document Name</label>
          <input 
            type="text" 
            bind:value={customDocumentName}
            placeholder="Enter document name (e.g., Medical Certificate, Insurance Policy)" 
            class="form-input"
          />
        </div>
      {/if}

      {#if selectedDocumentType}
        <label style="display: block; color: var(--dark-text); font-weight: 500; margin-bottom: 0.5rem;">Upload {selectedDocumentType === 'other' ? (customDocumentName || 'Document') : selectedDocumentType === 'driversLicense' ? 'Driver\'s License' : selectedDocumentType === 'governmentId' ? 'Government ID' : selectedDocumentType === 'birthCertificate' ? 'Birth Certificate' : 'Passport'}</label>
        <button 
          type="button"
          on:click={selectDocumentFile}
          class="dashboard-button outline" 
          style="justify-content: center; padding: 1.5rem; border-style: dashed;"
          disabled={uploading}
        >
          {#if selectedDocumentType && aldrId.documents[selectedDocumentType]?.file}
            <i class="fas fa-file"></i>
            {aldrId.documents[selectedDocumentType].file.name}
          {:else}
            <i class="fas fa-cloud-upload-alt"></i>
            Select Document File
          {/if}
        </button>
        <p style="font-size: 0.8rem; color: var(--gray-text); margin-top: 0.5rem;">
          Accepted formats: PDF, JPG, PNG
          {#if selectedDocumentType && aldrId.documents[selectedDocumentType]?.file}
            <span style="color: var(--holistic-green); margin-left: 0.5rem;">✓ File selected</span>
          {/if}
        </p>
      {/if}
    </div>
  </section>

  <!-- Status Display -->
  {#if aldrId.uploaded}
    <section class="recent-activity" style="border-left: 4px solid var(--holistic-green);">
      <div class="activity-header">
        <h2 class="activity-title" style="color: var(--holistic-green);">
          <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
          Data Uploaded Successfully!
        </h2>
      </div>
      <div class="activity-item">
        <div class="activity-icon" style="background-color: var(--holistic-green); color: white;">
          <i class="fas fa-link"></i>
        </div>
        <div class="activity-info">
          <p class="activity-text">Network Address: {aldrId.passportAddress}</p>
          <p class="activity-time">Stored on Autonomi network</p>
        </div>
      </div>
    </section>
  {/if}

  <!-- Status Message (only show during operations) -->
  {#if statusMessage && (initializing || uploading || downloading || statusMessage.includes('Checking') || statusMessage.includes('Calculating'))}
    <section class="recent-activity" style="border-left: 4px solid {statusMessage.includes('❌') ? 'var(--warning-red)' : statusMessage.includes('✅') ? 'var(--holistic-green)' : statusMessage.includes('Wallet balance') ? 'var(--medical-blue)' : 'var(--primary-teal)'};">
      <div class="activity-item">
        <div class="activity-icon" style="background-color: {statusMessage.includes('❌') ? 'var(--warning-red)' : statusMessage.includes('✅') ? 'var(--holistic-green)' : statusMessage.includes('Wallet balance') ? 'var(--medical-blue)' : 'var(--primary-teal)'}; color: white;">
          <i class="fas {statusMessage.includes('❌') ? 'fa-times' : statusMessage.includes('✅') ? 'fa-check' : statusMessage.includes('Wallet balance') ? 'fa-wallet' : 'fa-info'}"></i>
        </div>
        <div class="activity-info">
          <p class="activity-text" style="white-space: pre-line;">{statusMessage}</p>
          <p class="activity-time">System status</p>
        </div>
      </div>
    </section>
  {/if}

  <!-- Action Buttons -->
  <section class="recent-activity">
    <div class="activity-header">
      <h2 class="activity-title">Actions</h2>
      <div class="dashboard-button outline" style="cursor: default;">
        <i class="fas fa-cogs"></i>
        Operations
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
      <!-- Initialize Client Button -->
      {#if !clientInitialized}
        <button 
          class="dashboard-button purple"
          on:click={initializeClient}
          disabled={initializing}
        >
          {#if initializing}
            <i class="fas fa-spinner fa-spin"></i>
            Initializing...
          {:else}
            <i class="fas fa-power-off"></i>
            Initialize Client
          {/if}
        </button>
      {/if}

      <!-- Upload Button (FIRST) -->
      <button 
        class="dashboard-button"
        on:click={uploadDocument}
        disabled={uploading || !aldrId.name || !aldrId.dateOfBirth || !selectedDocumentType || (selectedDocumentType && !aldrId.documents[selectedDocumentType]?.filePath) || !clientInitialized || (selectedDocumentType === 'other' && !customDocumentName.trim())}
      >
        {#if uploading}
          <i class="fas fa-spinner fa-spin"></i>
          Uploading...
        {:else}
          <i class="fas fa-cloud-upload-alt"></i>
          Upload to Autonomi
        {/if}
      </button>

      <!-- Check Wallet Balance Button (SECOND) -->
      <button 
        class="dashboard-button outline"
        on:click={checkBalance}
        disabled={!clientInitialized}
      >
        <i class="fas fa-wallet"></i>
        Check Balance
      </button>

      <!-- Calculate Cost Button (THIRD) -->
      <button 
        class="dashboard-button outline"
        on:click={calculateCost}
        disabled={uploading || !selectedDocumentType || (selectedDocumentType && !aldrId.documents[selectedDocumentType]?.filePath) || !clientInitialized}
        style="border-color: var(--medical-blue); color: var(--medical-blue);"
      >
        <i class="fas fa-calculator"></i>
        Calculate Cost
      </button>

      <!-- Manage Shares Button -->
      <button 
        class="dashboard-button outline"
        on:click={async () => { await loadActiveShares(); showSharesModal = true; }}
        disabled={!clientInitialized}
        style="border-color: var(--holistic-green); color: var(--holistic-green);"
      >
        <i class="fas fa-list"></i>
        Manage Shares
      </button>

    </div>
  </section>

  <!-- About Aldr ID -->
  <section class="recent-activity">
    <div class="activity-header">
      <h2 class="activity-title">About Aldr ID</h2>
      <div class="dashboard-button outline" style="cursor: default;">
        <i class="fas fa-info-circle"></i>
        Information
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
      <div class="activity-item">
        <div class="activity-icon" style="background-color: var(--primary-teal);">
          <i class="fas fa-shield-alt"></i>
        </div>
        <div class="activity-info">
          <p class="activity-text">Secure Storage</p>
          <p class="activity-time">Data encrypted on decentralized Autonomi network</p>
        </div>
      </div>
      
      <div class="activity-item">
        <div class="activity-icon" style="background-color: var(--primary-purple);">
          <i class="fas fa-key"></i>
        </div>
        <div class="activity-info">
          <p class="activity-text">You Own Your Data</p>
          <p class="activity-time">Only you have access to your information</p>
        </div>
      </div>
      
      <div class="activity-item">
        <div class="activity-icon" style="background-color: var(--holistic-green);">
          <i class="fas fa-globe"></i>
        </div>
        <div class="activity-info">
          <p class="activity-text">Global Access</p>
          <p class="activity-time">Access documents from anywhere, anytime</p>
        </div>
      </div>
    </div>
  </section>

  </div> <!-- Close content-container -->
</div> <!-- Close dashboard-container -->

<!-- Share Modal -->
{#if showShareModal}
<div class="modal-overlay" on:click={() => showShareModal = false}>
  <div class="modal-content" on:click|stopPropagation>
    <div class="modal-header">
      <h3><i class="fas fa-share"></i> Share Documents</h3>
      <button class="close-button" on:click={() => showShareModal = false}>
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="modal-body">
      <div class="form-group">
        <label>Share Name</label>
        <input 
          type="text" 
          bind:value={shareName} 
          placeholder="Enter a name for this share"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>Expiration</label>
        <select bind:value={shareExpiration} class="form-input">
          <option value="1">1 Hour</option>
          <option value="24">24 Hours</option>
          <option value="168">1 Week</option>
          <option value="720">1 Month</option>
          <option value="0">Never (revoke manually)</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Select Documents to Share</label>
        <div class="document-selection">
          {#each Object.entries(aldrId.documents) as [docType, docData]}
            {#if docData.uploaded}
              <div class="document-checkbox" class:selected={selectedDocuments.includes(docType)}>
                <input 
                  type="checkbox" 
                  checked={selectedDocuments.includes(docType)}
                  on:change={() => toggleDocumentSelection(docType)}
                />
                <div class="document-info">
                  <div class="document-icon">
                    <i class="fas {docType === 'passport' ? 'fa-passport' : docType === 'driversLicense' ? 'fa-id-card' : docType === 'governmentId' ? 'fa-id-badge' : docType === 'birthCertificate' ? 'fa-certificate' : 'fa-file-alt'}"></i>
                  </div>
                  <span>{docType === 'driversLicense' ? 'Driver\'s License' : docType === 'governmentId' ? 'Government ID' : docType === 'birthCertificate' ? 'Birth Certificate' : docType === 'other' ? docData.customName : docType.charAt(0).toUpperCase() + docType.slice(1)}</span>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>
      
      {#if shareResult}
        <div class="share-result">
          <h4><i class="fas fa-check-circle"></i> Share Created Successfully!</h4>
          <div class="share-info">
            <div class="share-url">
              <label>Share URL:</label>
              <div class="url-display">
                <code>{shareResult.share_url}</code>
                <button class="copy-button" on:click={() => copyShareUrl(shareResult.share_url)}>
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
            <div class="share-details">
              <p><strong>Documents:</strong> {shareResult.document_names.join(', ')}</p>
              <p><strong>Expires:</strong> {shareExpiration === '0' ? 'Never (manual revocation)' : `in ${shareExpiration} hours`}</p>
              <p><strong>Pod Address:</strong> <code>{shareResult.pod_address}</code></p>
            </div>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="modal-footer">
      <button 
        class="dashboard-button" 
        on:click={createShare}
        disabled={uploading || selectedDocuments.length === 0 || !shareName.trim()}
      >
        {#if uploading}
          <i class="fas fa-spinner fa-spin"></i>
          Creating Share...
        {:else}
          <i class="fas fa-share"></i>
          Create Share
        {/if}
      </button>
      <button class="dashboard-button outline" on:click={() => showShareModal = false}>
        Cancel
      </button>
    </div>
  </div>
</div>
{/if}

<!-- Active Shares Modal -->
{#if showSharesModal}
<div class="modal-overlay" on:click={() => showSharesModal = false}>
  <div class="modal-content large" on:click|stopPropagation>
    <div class="modal-header">
      <h3><i class="fas fa-list"></i> Active Shares</h3>
      <button class="close-button" on:click={() => showSharesModal = false}>
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="modal-body">
      {#if activeShares.length === 0}
        <p>No active shares found.</p>
      {:else}
        {#each activeShares as share}
          <div class="share-item">
            <div class="share-header">
              <h4>{share.share_name}</h4>
              <div class="share-actions">
                <button class="copy-button" on:click={() => copyShareUrl(share.share_url)}>
                  <i class="fas fa-copy"></i> Copy URL
                </button>
                <button class="revoke-button" on:click={() => revokeShare(share.pod_address)}>
                  <i class="fas fa-ban"></i> Revoke
                </button>
              </div>
            </div>
            <div class="share-details">
              <p><strong>Documents:</strong> {share.document_names.join(', ')}</p>
              <p><strong>Created:</strong> {new Date(share.created_at * 1000).toLocaleDateString()}</p>
              <p><strong>Expires:</strong> {formatExpirationTime(share.expiration_timestamp)}</p>
              <p><strong>Access Count:</strong> {share.access_count}</p>
            </div>
          </div>
        {/each}
      {/if}
    </div>
    
    <div class="modal-footer">
      <button class="dashboard-button outline" on:click={() => showSharesModal = false}>
        Close
      </button>
    </div>
  </div>
</div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

  /* Aldr Dashboard Styling */
  :root {
    --primary-teal: #006666;
    --primary-purple: #8A2BE2;
    --dark-text: #333;
    --light-bg: #f8f9fa;
    --gray-text: #6c757d;
    --medical-blue: #4169E1;
    --holistic-green: #228B22;
    --mental-purple: #9932CC;
    --warning-red: #DC2626;
    --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 5px 15px rgba(32, 178, 170, 0.15);
    --shadow-lg: 0 8px 30px rgba(138, 43, 226, 0.2);
    --transition-standard: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--light-bg);
  }

  .dashboard-container {
    min-height: 100vh;
    background: var(--light-bg);
  }

  .content-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .dashboard-header {
    background: white;
    padding: 20px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    margin-bottom: 2rem;
    border-radius: 0;
    color: inherit;
  }

  .header-left {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-logo {
    height: 60px;
    width: auto;
  }

  .tagline {
    color: var(--gray-text);
    font-style: italic;
    font-size: 12px;
    margin-top: 4px;
    max-width: 300px;
  }

  .header-buttons {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .nav-button, .contact-button {
    background-color: var(--primary-teal);
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 500;
    transition: background-color 0.3s ease;
    font-size: 14px;
  }

  .nav-button:hover, .contact-button:hover {
    background-color: var(--primary-purple);
  }

  .page-logo {
    height: 60px;
    margin-right: 1rem;
  }

  .header-actions {
    display: flex;
    gap: 0.8rem;
  }

  .dashboard-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: white;
    margin: 0;
  }

  .recent-activity {
    background: white;
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
    padding: 1.5rem;
    transition: var(--transition-standard);
    margin-bottom: 2rem;
  }

  .recent-activity:hover {
    box-shadow: var(--shadow-md);
  }

  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--primary-teal);
  }

  .activity-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--dark-text);
  }

  .activity-item {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    transition: var(--transition-standard);
  }

  .activity-item:hover {
    background-color: rgba(32, 178, 170, 0.05);
  }

  .activity-item:last-child {
    border-bottom: none;
  }

  .activity-icon {
    margin-right: 1rem;
    font-size: 1.2rem;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--light-bg);
    color: var(--primary-teal);
  }

  .activity-info {
    flex: 1;
  }

  .activity-text {
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }

  .activity-time {
    font-size: 0.8rem;
    color: var(--gray-text);
  }

  .dashboard-button {
    background-color: var(--primary-teal);
    color: white;
    border: none;
    border-radius: 30px;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-standard);
    box-shadow: 0 2px 10px rgba(32, 178, 170, 0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .dashboard-button:hover {
    background-color: var(--primary-purple);
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.3);
  }

  .dashboard-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dashboard-button.purple {
    background-color: var(--primary-purple);
  }

  .dashboard-button.purple:hover {
    background-color: var(--mental-purple);
  }

  .dashboard-button.outline {
    background-color: transparent;
    border: 2px solid var(--primary-teal);
    color: var(--primary-teal);
  }

  .dashboard-button.outline:hover {
    background-color: var(--primary-teal);
    color: white;
  }

  .form-input {
    padding: 0.75rem 1rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 6px;
    transition: var(--transition-standard);
    font-family: inherit;
    font-size: 0.95rem;
    width: 100%;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(32, 178, 170, 0.1);
  }

  /* Document Item Styles */
  .document-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    margin-bottom: 1rem;
    background: var(--light-bg);
  }

  .document-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .document-icon {
    width: 40px;
    height: 40px;
    background: var(--primary-teal);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
  }

  .document-actions {
    display: flex;
    gap: 0.5rem;
  }

  /* Network Address Section */
  .network-address-section {
    margin-top: 1rem;
    padding: 1rem;
    background: #fff8dc;
    border: 2px solid #f0ad4e;
    border-radius: 8px;
  }

  .security-warning {
    margin-bottom: 1rem;
  }

  .warning-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #d68910;
    margin-bottom: 0.5rem;
  }

  .warning-header i {
    font-size: 1.2rem;
  }

  .warning-header h4 {
    margin: 0;
    font-size: 1rem;
  }

  .warning-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .warning-list li {
    padding: 0.3rem 0;
    font-size: 0.9rem;
    color: #8b5a00;
  }

  .address-display label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--dark-text);
  }

  .address-box {
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.5rem;
  }

  .address-box code {
    flex: 1;
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    word-break: break-all;
    background: none;
    color: var(--primary-teal);
  }

  .copy-button {
    background: var(--primary-teal);
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    margin-left: 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: background-color 0.2s;
  }

  .copy-button:hover {
    background-color: var(--primary-purple);
  }

  /* Profile Card Styles */
  .profile-card {
    background: var(--light-bg);
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid rgba(0,0,0,0.05);
  }

  .profile-field {
    margin-bottom: 1rem;
  }

  .profile-field label {
    display: block;
    color: var(--gray-text);
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .profile-value {
    background: white;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    color: var(--dark-text);
    min-height: 20px;
    font-weight: 500;
  }

  .profile-status {
    background: rgba(34, 139, 34, 0.1);
    border: 1px solid rgba(34, 139, 34, 0.2);
    border-radius: 6px;
    padding: 0.75rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .modal-content.large {
    max-width: 800px;
  }

  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h3 {
    margin: 0;
    color: var(--primary-teal);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--gray-text);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    padding: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--dark-text);
  }

  .document-selection {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .document-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .document-checkbox:hover {
    border-color: var(--primary-teal);
    background: rgba(32, 178, 170, 0.05);
  }

  .document-checkbox.selected {
    border-color: var(--primary-teal);
    background: rgba(32, 178, 170, 0.1);
  }

  .document-checkbox input[type="checkbox"] {
    margin: 0;
  }

  .document-checkbox .document-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  .document-checkbox .document-icon {
    width: 30px;
    height: 30px;
    background: var(--primary-teal);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
  }

  .share-result {
    background: rgba(34, 139, 34, 0.1);
    border: 2px solid var(--holistic-green);
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
  }

  .share-result h4 {
    color: var(--holistic-green);
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .share-url {
    margin-bottom: 1rem;
  }

  .share-url label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .url-display {
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 0.5rem;
  }

  .url-display code {
    flex: 1;
    background: none;
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    color: var(--primary-teal);
    word-break: break-all;
  }

  .share-details p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }

  .share-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .share-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .share-header h4 {
    margin: 0;
    color: var(--primary-teal);
  }

  .share-actions {
    display: flex;
    gap: 0.5rem;
  }

  .revoke-button {
    background: var(--warning-red);
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: background-color 0.2s;
  }

  .revoke-button:hover {
    background: #B91C1C;
  }
</style>