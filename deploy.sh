#!/bin/bash

# MERN Stack Deployment Script
# This script builds and prepares your application for deployment

echo "🚀 Starting MERN Stack Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Build Frontend
print_status "Building Frontend..."
cd frontend
npm install
npm run build

if [ $? -eq 0 ]; then
    print_status "Frontend built successfully!"
else
    print_error "Frontend build failed!"
    exit 1
fi

cd ..

# Install Backend Dependencies
print_status "Installing Backend Dependencies..."
cd backend
npm install

if [ $? -eq 0 ]; then
    print_status "Backend dependencies installed successfully!"
else
    print_error "Backend dependency installation failed!"
    exit 1
fi

cd ..

# Create production environment file
print_status "Setting up production environment..."
if [ ! -f backend/.env ]; then
    print_warning "No .env file found in backend. Copying from .env.production"
    cp backend/.env.production backend/.env
    print_warning "Please update the backend/.env file with your production values!"
fi

if [ ! -f frontend/.env ]; then
    print_warning "No .env file found in frontend. Copying from .env.production"
    cp frontend/.env.production frontend/.env
    print_warning "Please update the frontend/.env file with your production values!"
fi

print_status "✅ Deployment preparation complete!"
print_status "Next steps:"
echo "1. Update your environment variables in backend/.env and frontend/.env"
echo "2. Set up your MongoDB database"
echo "3. Choose your deployment platform (Heroku, DigitalOcean, AWS, etc.)"
echo "4. Deploy using platform-specific instructions"

print_warning "Don't forget to:"
echo "- Change JWT_SECRET to a strong, random string"
echo "- Update MONGO_URI to your production database"
echo "- Update FRONTEND_URL and VITE_API_URL to your domain"
echo "- Enable HTTPS for production use"