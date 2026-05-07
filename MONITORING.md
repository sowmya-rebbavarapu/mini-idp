# 📊 Monitoring & Observability — Mini Internal Developer Platform

## 📌 Overview

The Mini Internal Developer Platform (Mini-IDP) includes an integrated observability stack for monitoring deployed applications and infrastructure health.

The monitoring stack is automatically configured during deployment.

---

# 🎯 Monitoring Goals

The observability layer provides:

- Infrastructure monitoring
- Application health visibility
- Real-time metrics collection
- Dashboard visualization
- Automated monitoring setup

---

# 🏗️ Monitoring Architecture

```text
Node Exporter
      ↓
Prometheus
      ↓
Grafana
```

---

# 🧩 Monitoring Components

## 1️⃣ Node Exporter

### Purpose
Collects EC2 system metrics.

### Metrics Collected
- CPU usage
- Memory usage
- Disk usage
- Network statistics
- System uptime

### Port
```bash
9100
```

---

# 2️⃣ Prometheus

### Purpose
Scrapes and stores metrics from Node Exporter.

### Responsibilities
- Metrics collection
- Metrics querying
- Time-series data storage

### Port
```bash
9090
```

---

# 3️⃣ Grafana

### Purpose
Visualizes metrics dashboards.

### Responsibilities
- Dashboard visualization
- Infrastructure monitoring
- Real-time metric analysis

### Port
```bash
3001
```

---

# 🚀 Automated Monitoring Workflow

During deployment, the platform automatically:

1. Starts Node Exporter
2. Generates Prometheus configuration
3. Starts Prometheus container
4. Starts Grafana container
5. Connects monitoring stack

---

# 📊 Monitoring URLs

| Service | URL |
|---|---|
| Grafana | `http://EC2_IP:3001` |
| Prometheus | `http://EC2_IP:9090` |
| Node Exporter | `http://EC2_IP:9100/metrics` |

---

# 📈 Prometheus Configuration

The platform automatically creates:

```yaml
prometheus.yml
```

Configuration includes:
- Prometheus self-monitoring
- Node Exporter scraping

---

# 📈 Prometheus Queries

## Check Monitoring Status

```promql
up
```

---

## CPU Metrics

```promql
node_cpu_seconds_total
```

---

## Memory Metrics

```promql
node_memory_MemAvailable_bytes
```

---

## Disk Metrics

```promql
node_filesystem_avail_bytes
```

---

# 🚀 Grafana Setup

## Default Login

### Username
```bash
admin
```

### Password
```bash
admin
```

---

# 📊 Add Prometheus Data Source

## URL
```bash
http://EC2_PUBLIC_IP:9090
```

---

# 📈 Import Dashboard

## Dashboard ID
```bash
1860
```

This dashboard provides:
- CPU visualization
- Memory visualization
- Disk monitoring
- Network monitoring

---

# 📂 Monitoring Containers

The platform automatically deploys:

| Container | Purpose |
|---|---|
| node-exporter | Metrics exporter |
| prometheus | Metrics collection |
| grafana | Visualization |

---

# 🚀 Monitoring Validation

## Verify Node Exporter

```bash
http://EC2_IP:9100/metrics
```

---

## Verify Prometheus

Run query:
```promql
up
```

Expected:
```bash
prometheus = 1
app-server = 1
```

---

# 📌 Observability Benefits

The monitoring stack enables:
- Real-time infrastructure visibility
- Automated observability
- Centralized monitoring
- Performance tracking
- Deployment health monitoring

---

# 🚀 Future Monitoring Enhancements

Planned improvements:
- Alertmanager integration
- Slack/email alerts
- Kubernetes monitoring
- Application-level metrics
- Log aggregation
- Distributed tracing

---

# 📌 Conclusion

The Mini-IDP observability stack provides a fully automated monitoring solution using:
- Node Exporter
- Prometheus
- Grafana

This ensures all deployed applications are observable by default while providing developers with real-time infrastructure insights.
