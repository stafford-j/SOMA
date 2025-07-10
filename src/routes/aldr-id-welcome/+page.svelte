<script>
  import { invoke } from '@tauri-apps/api/core';
  import { onMount } from 'svelte';

  let step = 'welcome'; // welcome, setup-wallet, dashboard
  let walletInput = '';
  let confirmWalletInput = '';
  let walletInputType = 'address'; // 'address' or 'privatekey'
  let networkChoice = 'mainnet'; // Default to mainnet for production use
  let isInitializing = false;
  let statusMessage = '';
  let clientInitialized = false;
  let tauriReady = false;



  function handleWalletInput(event) {
    walletInput = event.target.value;
  }

  function handleConfirmWalletInput(event) {
    confirmWalletInput = event.target.value;
  }

  function isValidWalletInput(input) {
    if (walletInputType === 'address') {
      // Ethereum address: 0x followed by 40 hex characters
      return /^0x[a-fA-F0-9]{40}$/.test(input);
    } else {
      // Private key: 64 hex characters (with or without 0x prefix)
      const cleanInput = input.startsWith('0x') ? input.slice(2) : input;
      return /^[a-fA-F0-9]{64}$/.test(cleanInput);
    }
  }

  async function initializeAldrId() {
    if (walletInputType !== 'env') {
      if (!walletInput || walletInput !== confirmWalletInput) {
        statusMessage = 'Wallet inputs do not match';
        return;
      }

      if (!isValidWalletInput(walletInput)) {
        if (walletInputType === 'address') {
          statusMessage = 'Please enter a valid Ethereum address (0x followed by 40 hex characters)';
        } else {
          statusMessage = 'Please enter a valid private key (64 hex characters)';
        }
        return;
      }
    }

    // Check if Tauri is ready
    if (!tauriReady) {
      statusMessage = 'Waiting for application to be ready...';
      // Try to wait for Tauri to be ready
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (typeof window !== 'undefined' && window.__TAURI__ && invoke) {
          tauriReady = true;
          break;
        }
      }
      
      if (!tauriReady) {
        statusMessage = '❌ Application not ready. Please refresh the page.';
        return;
      }
    }

    isInitializing = true;
    statusMessage = 'Initializing Aldr ID on Autonomi network...';

    try {
      // Step 1: Initialize datastore
      statusMessage = 'Setting up secure storage...';
      await invoke('initialize_datastore');
      
      // Step 2: Create keystore from seed phrase
      statusMessage = 'Creating secure keystore...';
      const seedPhrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      await invoke('create_keystore_from_seed_phrase', { seedPhrase });
      
      // Step 3: Initialize Autonomi client with chosen network
      statusMessage = 'Connecting to Autonomi network...';
      if (walletInputType === 'env') {
        // Use environment variable
        await invoke('initialize_autonomi_client', { walletKey: 'auto', network: networkChoice });
      } else if (walletInputType === 'address') {
        // For address-only mode, we'll need to handle this differently
        // For now, we'll use a demo private key and just track the address
        const demoPrivateKey = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
        await invoke('initialize_autonomi_client', { walletKey: demoPrivateKey, network: networkChoice });
      } else {
        // Clean private key (remove 0x if present)
        const cleanPrivateKey = walletInput.startsWith('0x') ? walletInput.slice(2) : walletInput;
        await invoke('initialize_autonomi_client', { walletKey: cleanPrivateKey, network: networkChoice });
      }
      
      // Step 4: Initialize graph
      statusMessage = 'Setting up data structures...';
      await invoke('initialize_graph');
      
      // Step 5: Initialize pod manager
      statusMessage = 'Finalizing setup...';
      await invoke('initialize_pod_manager');
      
      // Step 6: Check wallet balance for debugging
      statusMessage = 'Checking wallet balance...';
      try {
        const balanceResult = await invoke('get_wallet_balance');
        console.log('Wallet balance result:', balanceResult);
        statusMessage = `✅ Setup complete! ${balanceResult}`;
      } catch (balanceError) {
        console.error('Balance check failed:', balanceError);
        statusMessage = `⚠️ Setup complete but balance check failed: ${balanceError}`;
      }
      
      // Save setup completion
      localStorage.setItem('aldrIdSetup', JSON.stringify({
        completed: true,
        network: networkChoice,
        timestamp: new Date().toISOString()
      }));

      clientInitialized = true;
      
      setTimeout(() => {
        window.location.href = '/screens/aldr-id';
      }, 2000);

    } catch (error) {
      console.error('Full initialization error:', error);
      
      // Better error message handling
      let errorMessage = 'Unknown error';
      if (error && typeof error === 'object') {
        errorMessage = error.message || error.toString() || JSON.stringify(error);
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      statusMessage = `❌ Setup failed: ${errorMessage}`;
      console.error('Detailed error:', {
        error,
        type: typeof error,
        message: error?.message,
        stack: error?.stack
      });
    } finally {
      isInitializing = false;
    }
  }

  function resetSetup() {
    localStorage.removeItem('aldrIdSetup');
    step = 'welcome';
    clientInitialized = false;
    walletInput = '';
    confirmWalletInput = '';
    statusMessage = '';
  }

  // Check if setup already exists before clearing
  onMount(async () => {
    // Check for existing setup but allow user to go through setup again
    // This ensures they can change network/wallet if needed
    const existingSetup = localStorage.getItem('aldrIdSetup');
    
    if (existingSetup) {
      try {
        const setup = JSON.parse(existingSetup);
        if (setup.completed) {
          console.log('Previous setup found, but allowing user to reconfigure');
          console.log('Previous setup details:', setup);
          
          // Pre-populate the form with previous values but don't auto-redirect
          if (setup.network) {
            networkChoice = setup.network;
          }
          
          // Show a message about previous setup but don't block the flow
          statusMessage = `Previous setup found (${setup.network}, ${new Date(setup.timestamp).toLocaleDateString()}). You can proceed with current settings or change them.`;
          
          // Continue with normal flow instead of returning early
          console.log('Continuing with normal flow despite previous setup');
        }
      } catch (error) {
        console.warn('Invalid setup data found, clearing:', error);
        localStorage.removeItem('aldrIdSetup');
      }
    }
    
    // Simplified Tauri readiness check - don't get stuck waiting
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        tauriReady = true;
        console.log('Tauri readiness forced after timeout');
      }
    }, 2000); // Force ready after 2 seconds

    // Skip welcome screen, start directly with setup
    step = 'setup-wallet';
    clientInitialized = false;
  });
</script>

<!-- BETA Banner -->
<div class="banner">
  Aldr Vaults is currently in BETA — this site is for partners, testers, and early collaborators.
</div>

<!-- Header -->
<header class="header">
  <div class="header-container">
    <div class="header-left">
      <img src="https://static.wixstatic.com/media/afc39f_58839957210f4f9cba1dfba53ed6adda~mv2.png" alt="Aldr Vaults" class="nav-logo" />
      <span class="tagline">Moving forward in life shouldn't mean losing your past.</span>
    </div>
    <div class="header-buttons">
      <a href="https://aldrvaults.com" class="nav-button" target="_blank">aldrvaults.com</a>
      <a href="mailto:james@ruleyproductions.com" class="contact-button">Contact</a>
    </div>
  </div>
</header>

<div class="min-h-screen bg-gray-50">
  <div class="container mx-auto px-4 py-8">
    
    {#if step === 'setup-wallet'}
      <!-- Wallet Setup Screen -->
      <div class="setup-container">

        <div class="setup-card">
          <!-- Aldr ID Header Strip -->
          <div class="vault-header-strip">
            <img src="https://static.wixstatic.com/media/afc39f_1bbcbb95a63243fcbc33d15fa0b8315c~mv2.png" alt="Aldr ID" class="vault-logo" />
          </div>
          
          <div class="setup-content">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Initialize Your <span class="aldr-text">Aldr Vault</span></h1>
            <p class="text-gray-600 mb-8">Select network and wallet configuration to access your secure identity vault</p>

          <form on:submit|preventDefault={initializeAldrId}>
            <!-- Network Selection -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-3">Network Selection</label>
              <div class="grid grid-cols-2 gap-4">
                <label class="cursor-pointer">
                  <input 
                    type="radio" 
                    bind:group={networkChoice} 
                    value="testnet" 
                    class="sr-only"
                  />
                  <div class="border-2 rounded-lg p-4 text-center transition-all" 
                       class:border-teal-500={networkChoice === 'testnet'}
                       class:bg-teal-50={networkChoice === 'testnet'}
                       class:border-gray-300={networkChoice !== 'testnet'}>
                    <i class="fas fa-flask text-2xl mb-2" class:text-teal-500={networkChoice === 'testnet'}></i>
                    <div class="font-medium">Alphanet</div>
                    <div class="text-sm text-gray-500">Free Testing | No ANT Required</div>
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input 
                    type="radio" 
                    bind:group={networkChoice} 
                    value="mainnet" 
                    class="sr-only"
                  />
                  <div class="border-2 rounded-lg p-4 text-center transition-all"
                       class:border-blue-500={networkChoice === 'mainnet'}
                       class:bg-blue-50={networkChoice === 'mainnet'}
                       class:border-gray-300={networkChoice !== 'mainnet'}>
                    <i class="fas fa-network-wired text-2xl mb-2" class:text-blue-500={networkChoice === 'mainnet'}></i>
                    <div class="font-medium">Mainnet</div>
                    <div class="text-sm text-gray-500">Production | ANT Tokens Required</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Wallet Type Selection -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-3">Wallet Input Type</label>
              <div class="grid grid-cols-3 gap-3">
                <label class="cursor-pointer">
                  <input 
                    type="radio" 
                    bind:group={walletInputType} 
                    value="env" 
                    class="sr-only"
                  />
                  <div class="border-2 rounded-lg p-3 text-center transition-all" 
                       class:border-green-500={walletInputType === 'env'}
                       class:bg-green-50={walletInputType === 'env'}
                       class:border-gray-300={walletInputType !== 'env'}>
                    <i class="fas fa-file-alt text-xl mb-2" class:text-green-500={walletInputType === 'env'}></i>
                    <div class="font-medium text-sm">Environment</div>
                    <div class="text-xs text-gray-500">From .env file</div>
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input 
                    type="radio" 
                    bind:group={walletInputType} 
                    value="address" 
                    class="sr-only"
                  />
                  <div class="border-2 rounded-lg p-3 text-center transition-all" 
                       class:border-teal-500={walletInputType === 'address'}
                       class:bg-teal-50={walletInputType === 'address'}
                       class:border-gray-300={walletInputType !== 'address'}>
                    <i class="fas fa-address-card text-xl mb-2" class:text-teal-500={walletInputType === 'address'}></i>
                    <div class="font-medium text-sm">Address Only</div>
                    <div class="text-xs text-gray-500">View only</div>
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input 
                    type="radio" 
                    bind:group={walletInputType} 
                    value="privatekey" 
                    class="sr-only"
                  />
                  <div class="border-2 rounded-lg p-3 text-center transition-all"
                       class:border-teal-500={walletInputType === 'privatekey'}
                       class:bg-teal-50={walletInputType === 'privatekey'}
                       class:border-gray-300={walletInputType !== 'privatekey'}>
                    <i class="fas fa-key text-xl mb-2" class:text-teal-500={walletInputType === 'privatekey'}></i>
                    <div class="font-medium text-sm">Private Key</div>
                    <div class="text-xs text-gray-500">Full access</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Wallet Input -->
            {#if walletInputType !== 'env'}
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">
                  {walletInputType === 'address' ? 'Wallet Address' : 'Private Key'}
                </label>
                <input 
                  type={walletInputType === 'privatekey' ? 'password' : 'text'}
                  bind:value={walletInput}
                  on:input={handleWalletInput}
                  placeholder={walletInputType === 'address' ? '0xc67f954a9CD03adD52020787F7F44d4fb579c810' : 'Enter your 64-character private key'}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
                <p class="text-sm text-gray-500 mt-1">
                  {walletInputType === 'address' 
                    ? 'Ethereum address starting with 0x (42 characters total)' 
                    : '64-character hexadecimal string (with or without 0x prefix)'}
                </p>
              </div>

              <!-- Confirm Input -->
              <div class="mb-6">
                <label class="block text-gray-700 font-medium mb-2">
                  Confirm {walletInputType === 'address' ? 'Address' : 'Private Key'}
                </label>
                <input 
                  type={walletInputType === 'privatekey' ? 'password' : 'text'}
                  bind:value={confirmWalletInput}
                  on:input={handleConfirmWalletInput}
                  placeholder={walletInputType === 'address' ? 'Re-enter your wallet address' : 'Re-enter your private key'}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
            {:else}
              <div class="mb-6">
                <div class="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <div class="flex items-center">
                    <i class="fas fa-file-alt text-green-600 mr-3"></i>
                    <div>
                      <h4 class="font-medium text-green-800 mb-1">Environment Variable Mode</h4>
                      <p class="text-sm text-green-700">
                        Private key will be loaded from the WALLET_PRIVATE_KEY environment variable in your .env file.
                      </p>
                      <p class="text-xs text-green-600 mt-1">
                        <i class="fas fa-info-circle mr-1"></i>
                        Make sure your .env file contains: WALLET_PRIVATE_KEY=your_private_key_here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Security Notice -->
            <div class="mb-6 p-4 {walletInputType === 'privatekey' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} border rounded-lg">
              <div class="flex items-start">
                <i class="fas {walletInputType === 'privatekey' ? 'fa-exclamation-triangle text-red-500' : 'fa-info-circle text-blue-500'} mt-1 mr-3"></i>
                <div>
                  <h4 class="font-medium {walletInputType === 'privatekey' ? 'text-red-800' : 'text-blue-800'} mb-1">
                    {walletInputType === 'privatekey' ? 'Security Warning' : 'Information'}
                  </h4>
                  <p class="text-sm {walletInputType === 'privatekey' ? 'text-red-700' : 'text-blue-700'}">
                    {walletInputType === 'privatekey' 
                      ? 'Your private key will be stored locally and encrypted. Never share your private key with anyone!' 
                      : 'Address-only mode will use a demo wallet for network connection. Upload functionality may be limited.'}
                  </p>
                </div>
              </div>
            </div>

            <!-- Status Message -->
            {#if statusMessage}
              <div class="mb-4 p-3 rounded-lg {statusMessage.includes('❌') ? 'bg-red-50 text-red-700' : statusMessage.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}">
                {statusMessage}
              </div>
            {/if}

            <!-- Submit Button -->
            <button 
              type="submit" 
              disabled={isInitializing || !tauriReady || (walletInputType !== 'env' && (!walletInput || walletInput !== confirmWalletInput || !isValidWalletInput(walletInput)))}
              class="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
            >
              {#if isInitializing}
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Initializing...
              {:else if !tauriReady}
                <i class="fas fa-clock mr-2"></i>
                Waiting for app to be ready...
              {:else}
                Initialize Aldr ID
              {/if}
            </button>
            
            {#if !tauriReady}
              <p class="text-sm text-gray-500 text-center mt-2">
                <i class="fas fa-info-circle mr-1"></i>
                Application is loading... Please wait.
              </p>
            {/if}
          </form>

          <div class="mt-6 text-center">
            <button 
              on:click={() => step = 'welcome'}
              class="text-gray-500 hover:text-gray-700 text-sm"
            >
              <i class="fas fa-arrow-left mr-1"></i>
              Back
            </button>
          </div>
          </div>
        </div>
      </div>

    {/if}

    <!-- Powered by Colony Footer -->
    <footer class="fixed bottom-4 right-4">
      <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg px-4 py-2 text-white text-sm">
        <span class="opacity-75">Powered by</span>
        <img src="/logo-192x192.png" alt="Colony" class="inline-block w-6 h-6 mx-2"/>
        <span class="font-medium">Colony</span>
      </div>
    </footer>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
  
  /* Aldr Design System Variables */
  :global(:root) {
    --primary-teal: #20B2AA;
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
  }

  /* BETA Banner */
  .banner {
    background: linear-gradient(45deg, var(--primary-teal), var(--primary-purple));
    color: white;
    text-align: center;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 500;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-purple));
    padding: 12px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .header-left {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
  }

  .tagline {
    color: rgba(255,255,255,0.8);
    font-style: italic;
    font-size: 12px;
    margin-top: 4px;
    max-width: 300px;
  }

  .nav-logo {
    height: 40px;
    width: auto;
  }

  .header-buttons {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .nav-button, .contact-button {
    background-color: white;
    color: var(--primary-purple);
    border: 2px solid white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  .nav-button:hover, .contact-button:hover {
    background-color: transparent;
    color: white;
    border-color: white;
  }

  /* Setup Container */
  .setup-container {
    max-width: 1000px;
    margin: 0 auto;
    color: white;
    padding: 0 40px;
  }

  /* Progress Bar */
  .progress-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
  }

  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    z-index: 2;
  }

  .step-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .progress-step.active .step-circle {
    background: var(--primary-teal);
    border-color: var(--primary-teal);
    box-shadow: 0 0 20px rgba(32, 178, 170, 0.5);
    color: white;
  }

  .progress-step.completed .step-circle {
    background: var(--holistic-green);
    border-color: var(--holistic-green);
    color: white;
  }

  .progress-step span {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.8;
  }

  .progress-step.active span,
  .progress-step.completed span {
    opacity: 1;
    font-weight: 600;
  }

  .progress-line {
    width: 100px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 1;
  }

  .progress-line.completed {
    background: var(--holistic-green);
  }

  /* Welcome Content */
  .welcome-content {
    text-align: center;
  }

  .brand-showcase {
    margin-bottom: 3rem;
  }

  .welcome-logo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 2rem;
    box-shadow: var(--shadow-lg);
  }

  .welcome-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, white, rgba(255,255,255,0.8));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .welcome-subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }

  /* Setup Card */
  .setup-card {
    background: white;
    border-radius: 20px;
    padding: 0;
    box-shadow: var(--shadow-lg);
    color: var(--dark-text);
    overflow: hidden;
  }
  
  .vault-header-strip {
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-purple));
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .vault-logo {
    height: 60px;
    object-fit: contain;
  }
  
  .setup-content {
    padding: 3rem 5rem;
    text-align: center;
  }
  
  .aldr-text {
    font-family: 'Trebuchet MS', sans-serif;
  }

  /* Completion Card */
  .completion-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    box-shadow: var(--shadow-lg);
  }

  .completion-logo {
    height: 80px;
    margin: 0 auto 30px auto;
    display: block;
  }

  /* Enhanced Button Styles */
  :global(.cta-button) {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-md);
  }

  :global(.cta-button:hover) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  :global(.cta-button.primary) {
    background: linear-gradient(45deg, var(--primary-teal), var(--primary-purple));
    color: white;
  }

  :global(.cta-button.secondary) {
    background: white;
    color: var(--primary-teal);
  }

  /* Feature Cards Enhancement */
  .feature-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .setup-container {
      padding: 1rem;
    }

    .progress-bar {
      margin-bottom: 2rem;
      padding: 1rem 0;
    }

    .progress-line {
      width: 60px;
    }

    .step-circle {
      width: 40px;
      height: 40px;
      font-size: 0.9rem;
    }

    .welcome-title {
      font-size: 2.5rem;
    }

    .setup-card,
    .completion-card {
      padding: 2rem;
      margin: 0 1rem;
    }
  }
</style>