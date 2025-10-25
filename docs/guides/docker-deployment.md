---
sidebar_position: 1
---

# Docker Deployment

Deploy Tududi using Docker for a consistent, isolated environment.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 1.29 or higher)

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/tududi/tududi.git
cd tududi
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the containers:
```bash
docker-compose up -d
```

4. Access Tududi:
```
http://localhost:3000
```

## Configuration

### docker-compose.yml

```yaml
version: '3.8'

services:
  tududi:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SESSION_SECRET=${SESSION_SECRET}
    volumes:
      - ./data:/app/data
      - ./uploads:/app/uploads
    restart: unless-stopped
```

### Environment Variables

Create a `.env` file:

```env
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secret-key-here
DATABASE_PATH=/app/data/tududi.db
```

## Building the Image

### Build Locally

```bash
docker build -t tududi:latest .
```

### Custom Build

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build frontend
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Running the Container

### Basic Run

```bash
docker run -d \
  --name tududi \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -e SESSION_SECRET=your-secret \
  tududi:latest
```

### With All Options

```bash
docker run -d \
  --name tududi \
  --restart unless-stopped \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/uploads:/app/uploads \
  -e NODE_ENV=production \
  -e SESSION_SECRET=your-secret \
  -e DATABASE_PATH=/app/data/tududi.db \
  tududi:latest
```

## Data Persistence

### Volume Mounts

Mount directories for persistent data:

```yaml
volumes:
  - ./data:/app/data           # Database
  - ./uploads:/app/uploads     # File uploads
  - ./logs:/app/logs           # Application logs
```

### Named Volumes

Use Docker volumes for better portability:

```yaml
volumes:
  tududi-data:
  tududi-uploads:

services:
  tududi:
    volumes:
      - tududi-data:/app/data
      - tududi-uploads:/app/uploads
```

## Production Deployment

### With Reverse Proxy (nginx)

```nginx
server {
    listen 80;
    server_name tududi.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### With SSL/TLS

Use Let's Encrypt with Certbot:

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d tududi.example.com

# Auto-renewal
sudo certbot renew --dry-run
```

### docker-compose with nginx

```yaml
version: '3.8'

services:
  tududi:
    build: .
    environment:
      - NODE_ENV=production
    volumes:
      - tududi-data:/app/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - tududi
    restart: unless-stopped

volumes:
  tududi-data:
```

## Monitoring

### Health Checks

Add health check to Docker Compose:

```yaml
services:
  tududi:
    build: .
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Logs

View container logs:

```bash
# Follow logs
docker-compose logs -f tududi

# Last 100 lines
docker-compose logs --tail=100 tududi

# With timestamps
docker-compose logs -f --timestamps tududi
```

## Backup and Restore

### Backup

```bash
# Backup database
docker exec tududi cp /app/data/tududi.db /app/data/backup.db
docker cp tududi:/app/data/backup.db ./tududi-backup-$(date +%Y%m%d).db

# Backup all data
docker run --rm \
  -v tududi-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/tududi-data-$(date +%Y%m%d).tar.gz /data
```

### Restore

```bash
# Restore database
docker cp ./tududi-backup.db tududi:/app/data/tududi.db
docker-compose restart tududi

# Restore all data
docker run --rm \
  -v tududi-data:/data \
  -v $(pwd):/backup \
  alpine sh -c "cd /data && tar xzf /backup/tududi-data.tar.gz --strip 1"
```

## Troubleshooting

### Container Won't Start

Check logs:
```bash
docker-compose logs tududi
```

### Permission Issues

Fix volume permissions:
```bash
sudo chown -R 1000:1000 ./data ./uploads
```

### Database Locked

Stop container and check for orphaned processes:
```bash
docker-compose down
rm -f ./data/*.db-shm ./data/*.db-wal
docker-compose up -d
```

### Port Already in Use

Change port in docker-compose.yml:
```yaml
ports:
  - "8080:3000"  # Use port 8080 instead
```

## Updating

### Pull Latest Changes

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Automated Updates

Create an update script:

```bash
#!/bin/bash
# update-tududi.sh

echo "Pulling latest changes..."
git pull origin main

echo "Stopping containers..."
docker-compose down

echo "Building new image..."
docker-compose build --no-cache

echo "Starting containers..."
docker-compose up -d

echo "Cleaning up old images..."
docker image prune -f

echo "Update complete!"
```

## Next Steps

- [Database Setup](/guides/database-setup) - Configure your database
- [Backup & Restore](/guides/backup-restore) - Backup strategies
