#!/bin/bash

# TOEFL AI Assistant - Dependency Update Script
# This script automates the dependency update process

set -e  # Exit on any error

echo "🚀 Starting dependency update process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Step 1: Check current status
print_status "Checking current dependency status..."
npm run deps-outdated

# Step 2: Check for security vulnerabilities
print_status "Checking for security vulnerabilities..."
npm run audit

# Step 3: Ask user if they want to proceed
echo ""
read -p "Do you want to proceed with updating dependencies? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Update cancelled by user."
    exit 0
fi

# Step 4: Update dependencies interactively
print_status "Updating dependencies interactively..."
npm run update-deps-interactive

# Step 5: Install updated dependencies
print_status "Installing updated dependencies..."
npm install

# Step 6: Check for security issues again
print_status "Checking for security issues after update..."
npm run audit

# Step 7: Test the build
print_status "Testing the build..."
npm run build

# Step 8: Run linting
print_status "Running linting..."
npm run lint

print_success "Dependency update completed successfully!"
print_status "Don't forget to:"
echo "  - Test the development server: npm run dev"
echo "  - Test all application features manually"
echo "  - Commit your changes with a descriptive message"
echo "  - Update documentation if needed"

echo ""
print_status "Script completed! 🎉" 