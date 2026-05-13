# 🏗️ Platform Architecture — Mini Internal Developer Platform

## 📌 Overview

The Mini Internal Developer Platform (Mini-IDP) is designed to provide developers with a self-service platform for infrastructure provisioning, application deployment, governance enforcement, and observability.

The platform automates the complete developer workflow from infrastructure provisioning to monitoring setup.

---

# 🎯 Architecture Goals

The platform architecture is designed to achieve:

- Self-service infrastructure provisioning
- Standardized deployment workflows
- Automated governance enforcement
- Integrated observability
- Simplified developer experience
- Infrastructure automation

---

# 🏛️ High-Level Architecture

![alt text](image.png)

---

# 🧩 Architecture Components

## 1️⃣ Frontend Layer

### Technology
- React.js

### Responsibilities
- Provide self-service UI
- Trigger EC2 provisioning
- Trigger application deployment
- Display deployment status and URLs

### Features
- Provision EC2 button
- Deploy application workflow
- Monitoring access links

---

# 2️⃣ Backend API Layer

### Technology
- Node.js
- Express.js

### Responsibilities
- Handle deployment requests
- Execute Terraform commands
- Perform SSH-based deployment automation
- Configure monitoring stack
- Enforce governance policies

### Main API Endpoints

| Endpoint | Purpose |
|---|---|
| `/create-ec2` | Provision infrastructure |
| `/deploy` | Deploy application |

---

# 3️⃣ Governance Layer

### Responsibilities
- Validate repository sources
- Enforce naming conventions
- Validate Dockerfile existence
- Maintain deployment audit logs

### Governance Modules

| Module | Purpose |
|---|---|
| `validateRepo.js` | GitHub validation |
| `validateNaming.js` | Naming standards |
| `validateDockerfile.js` | Container validation |
| `validatePorts.js` | Port governance |

---

# 4️⃣ Infrastructure Provisioning Layer

### Technology
- Terraform

### Responsibilities
- Provision AWS EC2 instances
- Configure networking and security groups
- Apply infrastructure tags

### AWS Resources
- EC2 Instance
- Security Group

### Infrastructure Features
- Automated EC2 provisioning
- Docker installation through user-data
- Port exposure for applications and monitoring

---

# 5️⃣ Deployment Layer

### Technology
- Docker
- SSH Automation

### Responsibilities
- Clone GitHub repository
- Build Docker image
- Run application container
- Configure monitoring containers

### Deployment Workflow

```text
Clone Repository
   ↓
Validate Dockerfile
   ↓
Build Docker Image
   ↓
Run Application Container
   ↓
Deploy Monitoring Stack
```

---

# 6️⃣ Observability Layer

The platform automatically configures monitoring for all deployed applications.

## Components

### Node Exporter
- Collects EC2 system metrics
- Exposes metrics on port 9100

### Prometheus
- Scrapes metrics from Node Exporter
- Stores monitoring data
- Exposes monitoring APIs on port 9090

### Grafana
- Visualizes metrics dashboards
- Displays infrastructure health
- Accessible on port 3001

---

# 📊 Monitoring Flow

```text
Node Exporter
   ↓
Prometheus
   ↓
Grafana Dashboard
```

---

# 🔐 Security & Governance

The architecture enforces:
- Approved repository sources
- Mandatory Dockerfile validation
- Terraform-managed infrastructure
- Deployment audit logging
- Standardized deployment workflows

---

# 🌐 Exposed Services

| Service | Port |
|---|---|
| Application | 3000 |
| Grafana | 3001 |
| Prometheus | 9090 |
| Node Exporter | 9100 |

---

# 📂 Project Structure
```text
MINI-IDP/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── governance/
│   ├── validateDockerfile.js
│   ├── validateNaming.js
│   ├── validatePorts.js
│   └── validateRepo.js
│
├── idp-backend/
│   ├── logs/
│   ├── node_modules/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── idp-ui/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── infra/
│   ├── terraform/
│   ├── ec2/
│       ├── main.tf
│       ├── outputs.tf
│       └── pemfile.pem
│── templates/
│
├── .gitignore
├── ARCHITECTURE.md
├── GOVERNANCE.md
├── MONITORING.md
├── ONBOARDING.md
├── image.png
└── README.md

---

# 🚀 End-to-End Platform Flow

```text
1. Developer enters GitHub repository URL
        ↓
2. Frontend sends deployment request
        ↓
3. Backend validates governance policies
        ↓
4. Terraform provisions EC2
        ↓
5. Backend deploys application via Docker
        ↓
6. Monitoring stack is configured automatically
        ↓
7. Grafana displays live infrastructure metrics
```

---

# 📌 Conclusion

The Mini-IDP architecture demonstrates core Platform Engineering principles including:
- Infrastructure as Code
- Golden Path Deployments
- Governance Automation
- Automated Observability
- Self-Service Developer Workflows

This architecture provides a simplified but realistic Internal Developer Platform implementation using modern DevOps and Platform Engineering practices.
