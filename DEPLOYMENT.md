# 🚀 MERN Stack Deployment Guide

This guide will help you deploy your MERN stack application to production.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database (local or cloud)
- Git (for version control)
- Domain name (optional, but recommended)

## 🔧 Pre-Deployment Setup

### 1. Environment Variables

Update the following files with your production values:

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://your-production-db-url
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
FRONTEND_URL=https://your-frontend-domain.com
```

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-api-domain.com
```

### 2. Build Your Application

Run the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

Or manually build:
```bash
# Build frontend
cd frontend
npm install
npm run build

# Install backend dependencies
cd ../backend
npm install
```

## 🚀 Deployment Options

### Option 1: Heroku (Free Tier Available)

1. **Install Heroku CLI**
2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku Apps**
   ```bash
   # Create backend app
   heroku create your-app-name-backend
   
   # Create frontend app (optional, if serving separately)
   heroku create your-app-name-frontend
   ```

4. **Deploy Backend**
   ```bash
   cd backend
   git init
   heroku git:remote -a your-app-name-backend
   git add .
   git commit -m "Initial backend deployment"
   git push heroku master
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI="your-mongodb-connection-string"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set FRONTEND_URL="https://your-frontend-domain.com"
   ```

### Option 2: DigitalOcean App Platform

1. **Create a DigitalOcean account**
2. **Create a new App**
3. **Connect your GitHub repository**
4. **Configure environment variables**
5. **Deploy**

### Option 3: AWS EC2

1. **Launch an EC2 instance** (Ubuntu 20.04+)
2. **Connect to your instance**
3. **Install Node.js and npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install MongoDB (or use MongoDB Atlas)**
5. **Clone your repository**
   ```bash
   git clone your-repo-url
   cd your-repo
   ```

6. **Run the deployment script**
   ```bash
   ./deploy.sh
   ```

7. **Set up PM2 for process management**
   ```bash
   sudo npm install -g pm2
   cd backend
   pm2 start server.js --name "mern-backend"
   pm2 startup
   pm2 save
   ```

8. **Set up Nginx as reverse proxy**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/your-app
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option 4: Vercel (Frontend Only)

For frontend deployment:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Update backend CORS** with your Vercel domain

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to a strong, random string
- [ ] Use HTTPS (SSL certificate)
- [ ] Set up MongoDB with authentication
- [ ] Validate environment variables
- [ ] Enable CORS only for your frontend domain
- [ ] Set up rate limiting
- [ ] Use environment variables for sensitive data
- [ ] Disable server information headers

## 📊 Performance Optimization

- [ ] Enable gzip compression
- [ ] Set up caching headers
- [ ] Use CDN for static assets
- [ ] Optimize images
- [ ] Enable HTTP/2
- [ ] Set up monitoring (e.g., New Relic, DataDog)

## 📝 Post-Deployment Verification

1. **Test all API endpoints**
2. **Verify database connection**
3. **Check user authentication**
4. **Test job posting functionality**
5. **Verify profile updates**
6. **Check cross-origin requests**

## 🛠️ Troubleshooting

### Common Issues

1. **CORS errors**: Check FRONTEND_URL in backend .env
2. **Database connection**: Verify MONGO_URI format
3. **Build failures**: Check Node.js version compatibility
4. **Port conflicts**: Ensure PORT is not already in use

### Debug Commands

```bash
# Check if services are running
sudo systemctl status nginx
pm2 status

# Check logs
pm2 logs
sudo tail -f /var/log/nginx/error.log

# Test database connection
node -e "mongoose.connect('your-mongo-uri').then(() => console.log('Connected')).catch(err => console.error(err))"
```

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify environment variables
3. Test locally before deploying
4. Use the health check endpoint: `https://your-domain.com/api/health`

---

**Good luck with your deployment! 🚀**