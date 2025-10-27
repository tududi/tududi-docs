---
sidebar_position: 1
---

# Quick Start

Get tududi running in 2 minutes with one command.

---

## Step 1: Install Docker

Need Docker? **[Get Docker](https://docs.docker.com/get-docker/)** (takes 1 minute)

Already have Docker? Skip to Step 2.

---

## Step 2: Run tududi

Copy and paste this command into your terminal:

```bash
docker run \
  -e TUDUDI_USER_EMAIL=admin@example.com \
  -e TUDUDI_USER_PASSWORD=admin123 \
  -e TUDUDI_SESSION_SECRET=$(openssl rand -hex 64) \
  -v ~/tududi_db:/app/backend/db \
  -v ~/tududi_uploads:/app/backend/uploads \
  -p 3002:3002 \
  -d chrisvel/tududi:latest
```

**Change these:**
- `admin@example.com` → Your email
- `admin123` → Your password

---

## Step 3: Open tududi

Go to: **http://localhost:3002**

Log in with the email and password you just set.

**Done!** Start creating tasks.

---

## Basic Commands

**See if it's running:**
```bash
docker ps
```

**Stop:**
```bash
docker stop <container_id>
```

**Start again:**
```bash
docker start <container_id>
```

**See logs:**
```bash
docker logs <container_id>
```

---

## What Just Happened?

Docker downloaded tududi, created storage for your data, and started it on your computer.

Your tasks are saved in `~/tududi_db` on your machine. Even if you restart your computer, they'll still be there.

---

## Next Steps

- **[First Steps](/getting-started/first-steps)** - Learn how to use tududi
- **[Configuration](/getting-started/configuration)** - Production setup, reverse proxy, HTTPS
