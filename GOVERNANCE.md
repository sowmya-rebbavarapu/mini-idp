# 🔐 Governance Policies — Mini Internal Developer Platform

## 📌 Overview

This document defines the governance and policy enforcement mechanisms implemented within the Mini Internal Developer Platform (Mini-IDP).

The governance layer ensures:
- Standardized deployments
- Infrastructure consistency
- Secure deployment practices
- Compliance with platform rules
- Automated policy enforcement

---

# 🎯 Governance Objectives

The platform governance layer is designed to:

- Enforce approved deployment standards
- Prevent invalid application deployments
- Ensure infrastructure consistency
- Enable deployment traceability
- Provide secure and repeatable workflows

---

# ✅ Repository Governance

## Allowed Repository Sources

The platform currently supports:

- GitHub repositories only

Repositories from unsupported sources are rejected automatically.

### Validation Rules
- Repository URL must contain:
```bash
github.com
```

- Repository URL must use:
```bash
https://
```

---

# ✅ Containerization Governance

All applications deployed through the platform must be containerized.

## Mandatory Requirements
- Dockerfile must exist in the repository root
- Application must build successfully using Docker

## Validation
Deployments are automatically rejected if:
- Dockerfile is missing
- Docker image build fails

---

# ✅ Naming Convention Governance

The platform enforces standardized repository naming conventions.

## Allowed Naming Pattern
- Lowercase letters
- Numbers
- Hyphens (-)

### Example
```bash
node-app-deploy
```

### Invalid Examples
```bash
Node_App
MyProject
sample repo
```

---

# ✅ Infrastructure Governance

Infrastructure provisioning is managed using Terraform.

## Mandatory Terraform Policies
- Infrastructure must be provisioned through Terraform only
- Manual infrastructure changes are discouraged

## AWS Tagging Policies

All EC2 resources are automatically tagged with:

| Tag | Purpose |
|---|---|
| Name | Resource identification |
| Environment | Environment tracking |
| Owner | Ownership tracking |
| ManagedBy | Terraform ownership |
| Governance | Governance compliance |

---

# ✅ Deployment Governance

The deployment pipeline follows a standardized Golden Path workflow.

## Deployment Steps
1. Validate repository
2. Validate naming conventions
3. Validate Dockerfile existence
4. Provision infrastructure
5. Build Docker image
6. Deploy application container
7. Configure monitoring stack

---

# ✅ Observability Governance

All deployed applications are automatically monitored.

## Monitoring Components
- Node Exporter
- Prometheus
- Grafana

## Enforced Monitoring Policy
Monitoring is mandatory for all deployments.

---

# ✅ Port Governance

The platform exposes only approved ports.

| Port | Purpose |
|---|---|
| 3000 | Application |
| 3001 | Grafana |
| 9090 | Prometheus |
| 9100 | Node Exporter |

---

# ✅ Audit Logging

All deployments are logged for traceability.

## Deployment Audit Information
The platform stores:
- Deployment timestamp
- Repository URL
- Target EC2 IP

## Log Location
```bash
backend/logs/deployments.log
```

---

# ✅ Security Considerations

The platform implements:
- Restricted repository validation
- Infrastructure tagging
- Controlled deployment workflows
- Automated deployment checks

---

# 🚀 Future Governance Enhancements

Planned governance improvements include:
- Role-Based Access Control (RBAC)
- GitHub Organization allowlists
- Deployment approval workflows
- Resource quotas
- Policy-as-Code implementation
- CI/CD governance gates

---

# 📌 Conclusion

The governance layer ensures that all deployments follow standardized, secure, and observable platform engineering practices while maintaining deployment consistency and operational control.
