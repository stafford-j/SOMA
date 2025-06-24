<script>
  import { onMount } from 'svelte';
  
  function navigateToAldrId() {
    window.location.href = '/aldr-id-welcome';
  }

  function showComingSoon() {
    window.open('https://aldrvaults.com', '_blank');
  }
</script>

<svelte:head>
  <title>Aldr Vaults - Your Data, Your Control</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</svelte:head>

<!-- BETA Banner -->
<div class="banner">
  Aldr Vaults is currently in BETA — this site is for partners, testers, and early collaborators.
</div>

<main class="landing-container">
  <!-- Header -->
  <header class="header">
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

  <!-- Vault Selection -->
  <section class="vaults-section">
    <div class="container">
      <h2 class="section-title">Choose Your Vault</h2>
      
      <div class="vaults-grid">
        <!-- Aldr ID Vault -->
        <div class="vault-card available">
          <div class="vault-header">
            <img src="https://static.wixstatic.com/media/afc39f_c8d410bd02984aea991c785eb1e5f45c~mv2.png" alt="Aldr ID" class="vault-logo" />
            <div class="status-badge">Available Now</div>
          </div>
          <div class="vault-body">
            <p>Store your identity documents securely. Passport, ID cards, and personal credentials in one encrypted vault.</p>
            <button class="vault-button primary" on:click={navigateToAldrId}>
              <i class="fas fa-arrow-right"></i>
              Enter Aldr ID
            </button>
          </div>
        </div>

        <!-- Aldr Health Vault -->
        <div class="vault-card coming-soon">
          <div class="vault-header">
            <img src="https://static.wixstatic.com/media/afc39f_ca3a562fc9ab4f2fa58e3db782784e50~mv2.png" alt="Aldr Health" class="vault-logo" />
            <div class="status-badge coming">Coming Soon</div>
          </div>
          <div class="vault-body">
            <p>Organize your complete health history. Medical records, prescriptions, and health data under your control.</p>
            <button class="vault-button outline" on:click={showComingSoon}>
              <i class="fas fa-external-link-alt"></i>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Security Info -->
  <section class="security-section">
    <div class="container">
      <h2 class="section-title">Built for Security & Privacy</h2>
      
      <div class="security-grid">
        <div class="security-item">
          <i class="fas fa-shield-alt"></i>
          <h4>You Own Your Data</h4>
          <p>Your information stays encrypted and accessible only to you.</p>
        </div>
        <div class="security-item">
          <i class="fas fa-globe"></i>
          <h4>Global Access</h4>
          <p>Access your vaults securely from anywhere in the world.</p>
        </div>
        <div class="security-item">
          <i class="fas fa-network-wired"></i>
          <h4>Decentralized Storage</h4>
          <p>Built on the Autonomi network for ultimate security and resilience.</p>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  :root {
    --teal: #006666;
    --purple: #8A2BE2;
    --dark: #333;
    --light: #f8f9fa;
    --gray: #6c757d;
    --green: #228B22;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }


  /* BETA Banner */
  .banner {
    background: linear-gradient(45deg, var(--teal), var(--purple));
    color: white;
    text-align: center;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 500;
  }

  .landing-container {
    min-height: 100vh;
    background: var(--light);
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header */
  .header {
    background: white;
    padding: 20px 0;
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
    color: var(--gray);
    font-style: italic;
    font-size: 12px;
    margin-top: 4px;
    max-width: 300px;
  }

  .nav-logo {
    height: 60px;
    width: auto;
  }

  .header-buttons {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .nav-button, .contact-button {
    background-color: var(--teal);
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 500;
    transition: background-color 0.3s ease;
    font-size: 14px;
  }

  .nav-button:hover, .contact-button:hover {
    background-color: var(--purple);
  }


  /* Vault Selection */
  .vaults-section {
    padding: 80px 0;
    background: var(--light);
  }

  .section-title {
    text-align: center;
    font-size: 2rem;
    color: var(--teal);
    margin-bottom: 50px;
    font-weight: 600;
  }

  .vaults-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  .vault-card {
    background: white;
    border-radius: 16px;
    border: 3px solid var(--teal);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
  }

  .vault-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  .vault-card.coming-soon {
    opacity: 0.8;
  }

  .vault-header {
    background: linear-gradient(135deg, var(--teal), var(--purple));
    padding: 30px;
    text-align: center;
    position: relative;
  }

  .vault-logo {
    height: 80px;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 15px;
    object-fit: contain;
  }

  .status-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--green);
    color: white;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .status-badge.coming {
    background: var(--purple);
  }

  .vault-body {
    padding: 30px;
    text-align: center;
  }


  .vault-body p {
    color: var(--gray);
    margin-bottom: 25px;
    line-height: 1.6;
  }

  .vault-button {
    background: linear-gradient(45deg, var(--teal), var(--purple));
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    width: 100%;
    justify-content: center;
  }

  .vault-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(16,93,91,0.3);
  }

  .vault-button.outline {
    background: transparent;
    border: 2px solid var(--purple);
    color: var(--purple);
  }

  .vault-button.outline:hover {
    background: var(--purple);
    color: white;
  }

  /* Security Section */
  .security-section {
    padding: 80px 0;
    background: white;
  }

  .security-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    max-width: 900px;
    margin: 0 auto;
  }

  .security-item {
    text-align: center;
    padding: 30px 20px;
  }

  .security-item i {
    font-size: 3rem;
    color: var(--teal);
    margin-bottom: 20px;
  }

  .security-item h4 {
    font-size: 1.2rem;
    color: var(--dark);
    margin-bottom: 15px;
    font-weight: 600;
  }

  .security-item p {
    color: var(--gray);
    line-height: 1.6;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .vaults-grid { grid-template-columns: 1fr; gap: 30px; }
    .security-grid { grid-template-columns: 1fr; gap: 30px; }
  }

  @media (max-width: 480px) {
    .section-title { font-size: 1.5rem; }
    .banner { padding: 8px 15px; font-size: 12px; }
  }
</style>