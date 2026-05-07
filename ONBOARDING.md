# 👩‍💻 Developer Onboarding Guide — Mini Internal Developer Platform

## 📌 Overview

This guide explains how developers can use the Mini Internal Developer Platform (Mini-IDP) to provision infrastructure, deploy applications, and access monitoring dashboards.

The platform provides a self-service deployment workflow with built-in governance and observability.

---

# 🚀 Developer Workflow

The developer workflow consists of:

1. Prepare application repository
2. Provision infrastructure
3. Deploy application
4. Access monitoring dashboards

---

# ✅ Prerequisites

Before using the platform, ensure:

- GitHub repository is accessible
- Application contains a valid Dockerfile
- Repository follows naming conventions
- Dockerized application exposes port 3000

---

# 📂 Repository Requirements

## Mandatory Files

The repository must contain:

```bash
Dockerfile
```

---

## Supported Repository Type

Only:
```bash
GitHub repositories
```

are supported.

Example:
```bash
https://github.com/user/sample-app.git
```

---

# 🏷️ Naming Standards

Repository names must:
- Use lowercase letters
- Use hyphens (-)
- Avoid spaces and special characters

### Valid Example
```bash
node-app-deploy
```

### Invalid Example
```bash
My_Project
sample repo
```

---

# 🚀 Step 1 — Start Frontend & Backend

## Backend

Navigate to:
```bash
backend/
```

Run:
```bash
node index.js
```

---

## Frontend

Navigate to:
```bash
frontend/
```

Run:
```bash
npm start
```

---

# 🚀 Step 2 — Provision EC2

From the frontend dashboard:

1. Click:
```bash
Provision EC2
```

2. Wait for Terraform automation to complete

3. Copy the generated EC2 public IP

---

# 🚀 Step 3 — Deploy Application

1. Enter GitHub repository URL
2. Enter generated EC2 public IP
3. Click:
```bash
Deploy Application
```

The platform automatically:
- Clones repository
- Builds Docker image
- Deploys application
- Configures monitoring stack

---

# 🚀 Step 4 — Access Application

After deployment:

## Application
```bash
http://EC2_PUBLIC_IP:3000
```

---

## Grafana Dashboard
```bash
http://EC2_PUBLIC_IP:3001
```

---

## Prometheus
```bash
http://EC2_PUBLIC_IP:9090
```

---

# 📊 Monitoring Access

## Grafana Login

### Username
```bash
admin
```

### Password
```bash
admin
```

---

# 📈 Import Grafana Dashboard

## Dashboard ID
```bash
1860
```

This dashboard provides:
- CPU metrics
- Memory metrics
- Disk metrics
- Network metrics

---

# 🔐 Governance Policies

The platform automatically validates:
- Repository source
- Dockerfile existence
- Naming standards
- Deployment compliance

Invalid deployments are rejected automatically.

---

# 📂 Logs

Deployment logs are stored at:

```bash
backend/logs/deployments.log
```

---

# ❌ Common Deployment Errors

| Error | Cause |
|---|---|
| Dockerfile missing | Repository invalid |
| Invalid repo name | Naming policy violation |
| Unsupported repo URL | Non-GitHub repository |
| Docker build failed | Invalid application |

---

# 🚀 Supported Ports

| Port | Purpose |
|---|---|
| 3000 | Application |
| 3001 | Grafana |
| 9090 | Prometheus |
| 9100 | Node Exporter |

---

# 📌 Conclusion

The Mini-IDP provides developers with:
- Self-service infrastructure provisioning
- Standardized deployment workflows
- Integrated observability
- Automated governance validation

This simplifies developer onboarding and ensures consistent deployment practices across the platform.
