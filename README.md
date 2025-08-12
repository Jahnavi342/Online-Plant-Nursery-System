**Online Plant Nursery System**
A full-stack web application for browsing, purchasing, and managing plant orders online. Developed using Node.js (Express), React.js, and MongoDB. Includes authentication, role-based access, admin dashboards, and order tracking.

**Live Demo**
Public URL: http://13.239.240.73/


**Features**
User Authentication & Authorization (JWT-based)

Browse Plants with filtering & search

View Plant Details with pricing & description

Place Orders with delivery details & payment status

Track Orders through status stages (Pending → Delivered)

Admin Dashboard for managing plants, users, and orders

Responsive UI built with React.js

Backend API with Express.js & MongoDB

**Tech Stack**
Frontend: React.js, Axios, tailwind
Backend: Node.js, Express.js, Mongoose
Database: MongoDB Atlas
Deployment: AWS EC2, Nginx, PM2
Project Management: JIRA
Version Control: GitHub
CI/CD: GitHub Actions

**Repository Links**

Frontend: GitHub Frontend Repo: https://github.com/Jahnavi342/Online-Plant-Nursery-System/tree/main/frontend

Backend: GitHub Backend Repo: https://github.com/Jahnavi342/Online-Plant-Nursery-System/tree/main/backend

**JIRA Board**
JIRA Project Board URL: https://kao-ho.atlassian.net/jira/software/projects/OPNS/boards/34?atlOrigin=eyJpIjoiNDBiMmQxOGI1Mjg5NDY3Zjk3ZjA5ZDMxZDhmNWIxOWQiLCJwIjoiaiJ9

Includes:

At least two Epics (excluding authentication)

Related User Stories and Subtasks

Evidence of sprint progress tracking

**Project Setup**

**Backend Setup**

# Clone repo
git clone https://github.com/Jahnavi342/Online-Plant-Nursery-System.git
cd Online-plant-Nursery-System/backend

# Install dependencies
npm install

# Create .env file with:
PORT=5001
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

# Start server
pm2 start server.js --name plant-backend
pm2 save

**Frontend Setup**

cd ../frontend

**# Install dependencies**
npm install

**# Build production files**
npm run build

**# Nginx serves files from frontend/build**
Deployment (AWS EC2 + Nginx + PM2)
Backend runs on port 5001 managed by PM2

Frontend built and served via Nginx from /var/www/plant

Nginx Config at /etc/nginx/sites-available/plant:

server {
    listen 80;
    server_name _;

    location / {
        root /home/ubuntu/Online-plant-Nursery-System/frontend/build;
        index index.html index.htm;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}



**Test Credentials**

Customer:

Email: user@gmail.com

Password: user123

Admin:

Email: admin@gmail.com

Password: Admin123


