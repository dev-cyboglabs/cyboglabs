# Deployment with ROOT_PATH Guide

## 🎯 What is ROOT_PATH?

ROOT_PATH allows your FastAPI app to be served from a subdirectory instead of the root domain.

### Examples:
- **No ROOT_PATH**: `https://api.cyboglabs.com/api/chat`
- **With ROOT_PATH=/third**: `https://cyboglabs.work/third/api/chat`

## 🚀 Local Development (No ROOT_PATH)

### .env Configuration:
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=cyboglabs
CORS_ORIGINS=http://localhost:3000
ROOT_PATH=  # Empty for local development
```

### URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/api/chat`
- Full URL: `http://localhost:8000/api/chat`

## 🌐 Production Deployment (With ROOT_PATH)

### .env.production Configuration:
```bash
MONGO_URL=mongodb+srv://cyboglabs-user:O526Gv4DWg3ca017@db-mongodb-nyc3-57274-32169585.mongo.ondigitalocean.com/cyboglabs?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-57274-32169585
DB_NAME=cyboglabs
CORS_ORIGINS=https://cyboglabs.work,https://www.cyboglabs.work
ROOT_PATH=/third
```

### URLs:
- Frontend: `https://cyboglabs.work`
- Backend: `https://cyboglabs.work/third/api/chat`
- Full URL: `https://cyboglabs.work/third/api/chat`

## 📋 Deployment Steps

### 1. Local Development
```bash
# Use default .env (ROOT_PATH is empty)
cd backend
uvicorn server:app --host 0.0.0.0 --port 8000

# Test: curl http://localhost:8000/api/chat
```

### 2. Production Deployment
```bash
# On Digital Ocean droplet
cd backend

# Copy production environment
cp .env.production .env

# Start server
uvicorn server:app --host 0.0.0.0 --port 8000

# Test: curl http://localhost:8000/third/api/chat
```

### 3. Frontend Configuration
```bash
# Frontend .env.production
REACT_APP_BACKEND_URL=https://cyboglabs.work/third
```

## 🔧 Nginx Configuration (Optional)

If using Nginx reverse proxy:

```nginx
server {
    listen 80;
    server_name cyboglabs.work;

    location /third/ {
        proxy_pass http://127.0.0.1:8000/third/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🧪 Testing ROOT_PATH

### Test Local (ROOT_PATH empty):
```bash
curl http://localhost:8000/api/chat
# Expected: Works normally
```

### Test Production (ROOT_PATH=/third):
```bash
curl http://localhost:8000/third/api/chat
# Expected: Works with /third prefix
```

### Test Wrong Path:
```bash
curl http://localhost:8000/api/chat
# Expected: 404 Not Found (when ROOT_PATH=/third)
```

## 🔄 Switching Between Environments

### For Local Development:
```bash
# Use default .env (ROOT_PATH empty)
cp .env.local .env  # or just use .env
```

### For Production:
```bash
# Use production .env
cp .env.production .env
```

## 💡 Pro Tips

1. **Always test ROOT_PATH locally first**
2. **Update CORS origins when changing domains**
3. **Frontend must match backend ROOT_PATH**
4. **Use separate .env files for different environments**

## 🎯 Quick Commands

```bash
# Check current ROOT_PATH
echo $ROOT_PATH

# Test with ROOT_PATH
curl http://localhost:8000/third/api/chat

# Test without ROOT_PATH  
curl http://localhost:8000/api/chat

# View FastAPI docs
curl http://localhost:8000/third/docs
```

## 🚨 Common Issues

1. **404 Errors**: ROOT_PATH mismatch between frontend and backend
2. **CORS Errors**: Frontend domain not in CORS_ORIGINS
3. **MongoDB Errors**: Wrong MONGO_URL for environment

**Solution**: Check .env file matches your deployment target!
