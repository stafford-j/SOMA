#!/bin/bash

# SOMA Ecosystem Setup Script
echo "Setting up SOMA project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Please install Node.js before proceeding."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm not found. Please install npm before proceeding."
    exit 1
fi

# Select which app to set up
echo "Which SOMA application would you like to set up?"
echo "1. SOMA Companion (Patient Dashboard)"
echo "2. SOMA Colleague (Provider Dashboard)"
echo "3. Both Applications"
read -p "Enter your choice (1-3): " app_choice

setup_companion() {
    echo "Installing SOMA Companion dependencies..."
    cd frontend
    npm install
    cd ..
    echo "SOMA Companion setup complete!"
}

setup_colleague() {
    echo "Installing SOMA Colleague dependencies..."
    cd colleague
    npm install
    cd ..
    echo "SOMA Colleague setup complete!"
}

case $app_choice in
    1)
        setup_companion
        echo "To start SOMA Companion, run: cd frontend && npm start"
        echo "Then open http://localhost:3000 in your browser."
        ;;
    2)
        setup_colleague
        echo "To start SOMA Colleague, run: cd colleague && npm start"
        echo "Then open http://localhost:3001 in your browser."
        ;;
    3)
        setup_companion
        setup_colleague
        echo "To start both applications:"
        echo "For SOMA Companion: cd frontend && npm start"
        echo "For SOMA Colleague: cd colleague && npm start"
        echo "Open http://localhost:3000 for Companion and http://localhost:3001 for Colleague"
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

# Set up git hooks (optional)
echo "Would you like to set up git hooks for this project? (y/n)"
read -r setup_hooks

if [ "$setup_hooks" = "y" ] || [ "$setup_hooks" = "Y" ]; then
    # Create a pre-commit hook
    echo "Setting up git hooks..."
    mkdir -p .git/hooks
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."

# Run linters if available
if [ -d "frontend" ]; then
    cd frontend && npm run lint
    if [ $? -ne 0 ]; then
        echo "Companion linting failed. Please fix errors before committing."
        exit 1
    fi
    cd ..
fi

if [ -d "colleague" ]; then
    cd colleague && npm run lint
    if [ $? -ne 0 ]; then
        echo "Colleague linting failed. Please fix errors before committing."
        exit 1
    fi
    cd ..
fi

exit 0
EOF
    chmod +x .git/hooks/pre-commit
    echo "Git hooks set up successfully."
fi

echo "Setup complete!"