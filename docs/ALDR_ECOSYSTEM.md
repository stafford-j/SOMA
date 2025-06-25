# Aldr Ecosystem Overview

This document provides an overview of the Aldr ecosystem, explaining the relationship between the different applications and their purposes.

## Project Components

The Aldr ecosystem consists of three main applications:

### 1. Aldr Vaults MVP

**Purpose:** A streamlined, minimal viable product focused on the core vault functionality of the Aldr platform.

**Key Features:**
- Basic vault management
- Minimal user interface
- Essential security features
- Foundational architecture

**Target Audience:** Development team for technical evaluation and implementation

**Directory:** `/aldr-vaults-mvp/`

### 2. Aldr Health Individual Full Demo

**Purpose:** A comprehensive demonstration of the individual user experience for health data management.

**Key Features:**
- Complete health record management
- Care plan visualization
- Provider sharing
- Comprehensive dashboard
- Full feature set

**Target Audience:** Individual users managing their health data

**Directory:** `/aldr-health-individual-full-demo/`
**Previous Name:** SOMA Companion

### 3. Aldr Health Provider Full Demo

**Purpose:** A full-featured demonstration of the healthcare provider experience for accessing and managing patient data.

**Key Features:**
- Patient record access
- Care plan creation and management
- Provider dashboard
- Multi-specialty support
- Practice management

**Target Audience:** Healthcare providers and medical professionals

**Directory:** `/aldr-health-provider-full-demo/`
**Previous Name:** SOMA Colleague

## Relationship Between Applications

These three applications form a coherent ecosystem:

1. **Aldr Vaults** serves as the foundational platform for secure data storage and management.

2. **Aldr Health Individual** is a specialized implementation of the vaults concept focused on personal health data management for individual users.

3. **Aldr Health Provider** complements the Individual application by allowing healthcare providers to access and interact with patient data (with appropriate permissions).

## Development Focus

- **Aldr Vaults MVP:** Current development priority for the technical team, focusing on core functionality and architecture.

- **Aldr Health Individual & Provider:** Full demonstrations of the platform's capabilities in the health domain, serving as reference implementations and showcases.

## Rebranding Note

The ecosystem has been rebranded from SOMA to Aldr:
- SOMA Companion → Aldr Health Individual
- SOMA Colleague → Aldr Health Provider
- (New) → Aldr Vaults

## Technical Consistency

All three applications share:
- React-based frontend architecture
- TailwindCSS for styling
- Consistent component organization
- Common authentication mechanisms
- Shared visual language and branding