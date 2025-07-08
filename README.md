# Aldr Autonomi MVP

<p align="center">
 <img align="center" src="static/aldr-vaults-logo-teal.png" height="120" />
</p>

<p align="center">
 <strong>Secure Identity Vault on the Autonomi Network</strong>
</p>

## 🎯 What is Aldr Autonomi MVP?

Aldr Autonomi MVP is a desktop application that provides secure document storage and identity management using the decentralized [Autonomi](https://autonomi.com) network. Built on the foundation of Colony's infrastructure, it offers a user-friendly interface for managing personal documents and digital identity.

## ✨ Key Features

- **🔐 Secure Document Storage**: Upload and store identity documents on the decentralized Autonomi network
- **🌐 Network Flexibility**: Connect to both Mainnet (production) and Alphanet (testing) networks
- **🆔 Digital ID Management**: Create and manage your digital identity profile
- **📁 Multi-Document Support**: Support for passports, driver's licenses, government IDs, birth certificates, and custom documents
- **💾 Local & Network Storage**: Data persisted both locally and on the Autonomi network
- **🔄 Cross-Session Persistence**: Your data remains available across app restarts

## 🛠️ Technology Stack

- **Backend**: Rust with Tauri framework
- **Frontend**: Svelte with TailwindCSS
- **Network**: Autonomi decentralized storage
- **Database**: Colony's RDF-based pod system (DataStore, KeyStore, Graph, PodManager)
- **Wallet Integration**: EVM-compatible wallet support (ArbitrumOne/ArbitrumSepoliaTest)

## 🚀 Getting Started

### Prerequisites

- Windows 10/11 (PowerShell environment recommended)
- Node.js and npm
- Rust toolchain with Tauri CLI

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/stafford-j/SOMA.git
   cd autonomi-mvp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   ```bash
   # Create .env file with your wallet private key
   WALLET_PRIVATE_KEY=your_private_key_here
   ```

4. **Run the application**:
   ```bash
   npm run tauri dev
   ```

### Quick Start Scripts

For easy startup and troubleshooting:

- **Windows Batch**: `.\fix_and_run.bat`
- **PowerShell**: `.\fix_and_run.ps1`

## 🔧 Network Configuration

### Mainnet (Production)
- **Network**: ArbitrumOne
- **Token**: ANT tokens required for uploads
- **Purpose**: Production use with real value transactions

### Alphanet (Testing)
- **Network**: ArbitrumSepoliaTest  
- **Token**: Free testing tokens
- **Purpose**: Development and testing

## 🗂️ Document Management

### Supported Document Types
- Passport
- Driver's License
- Government ID
- Birth Certificate
- Custom documents (user-defined)

### Features
- Upload documents to Autonomi network
- Download previously uploaded documents
- Network address management for each document
- Original filename preservation

## 🆔 Digital Identity Features

- **Profile Management**: Store name, date of birth, tax ID, nationality
- **Apple-like Edit/View Modes**: Clean interface for profile editing
- **Network Storage**: Profile saved to Autonomi pod system
- **Data Discovery**: Automatic discovery of existing user data

## 🔍 Troubleshooting

### Debug Tools
- **Debug Status**: Check initialization status of all components
- **Force Save**: Manually persist current state to localStorage
- **Reset Setup**: Clear all data and restart setup process

### Common Issues
- **Database Lock**: Use the provided batch/PowerShell scripts to clear locks
- **Network Timeouts**: Discovery process runs in background, app remains functional
- **Missing Data**: Use "Debug Status" to identify uninitialized components

## 🏗️ Built on Colony Infrastructure

This application leverages the robust infrastructure provided by [Colony](https://github.com/zettawatt/colony):

- **DataStore**: File system management
- **KeyStore**: BIP39 seed phrase + BLS key management  
- **Graph**: RDF database using SPARQL
- **PodManager**: Metadata pod creation and management
- **Autonomi Client**: Network operations (upload/download)

## 📈 Current Status

✅ **Working Features (July 8, 2025)**:
- Mainnet connectivity and stability
- Document upload/download functionality
- Profile management and persistence
- Auto-connect to user-selected networks
- Background data discovery
- Cross-session data persistence

## 🤝 Contributing

This is an MVP (Minimum Viable Product) focused on core identity management functionality. Built for the Aldr ecosystem as a production-ready baseline.

## 📄 License

Built on Colony's GPL-3.0 licensed infrastructure. See LICENSE file for details.

## 🔗 Related Projects

- **Colony**: [https://github.com/zettawatt/colony](https://github.com/zettawatt/colony)
- **Autonomi Network**: [https://autonomi.com](https://autonomi.com)
- **Aldr Ecosystem**: Document vault and health management platform

---

**Aldr Autonomi MVP** - Secure, decentralized identity management for the modern world.