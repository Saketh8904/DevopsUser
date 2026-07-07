# DevOpsUser — Production-Style Web App on AWS Free Tier

[![CI/CD](https://github.com/Saketh8904/DevopsUser/actions/workflows/deploy.yml/badge.svg)](https://github.com/Saketh8904/DevopsUser/actions)

An end-to-end DevOps project demonstrating how to design, deploy, secure, monitor, and load-test a web application on AWS Free Tier, with a fully automated CI/CD pipeline.

> **Author:** Saketh Alevooraya K
>
> **Repo:** https://github.com/Saketh8904/DevopsUser
>
> **Status:** ✅ Completed

---

## 1. Project Summary

| Item | Details |
|------|---------|
| Application | Node.js Express Web Application |
| Compute | Amazon EC2 (Ubuntu t2.micro - Free Tier) |
| Storage | Amazon S3 (Application Backup) |
| Backup | Automated Backup Script (`backup.sh`) |
| IAM | Least-Privilege IAM User & EC2 IAM Role |
| Security | Security Groups, SSH Key Authentication |
| CI/CD | GitHub Actions (Build → Deploy to EC2) |
| Monitoring | Amazon CloudWatch (Metrics & Logs) |
| Load Testing | k6 / Apache JMeter |
| Region | ap-south-1 (Mumbai) |

---

## 2. Repository Structure

```text
DevopsUser/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD Pipeline
├── node_modules/               # Node.js Dependencies
├── README.md                   # Project Documentation
├── app.js                      # Main Express Application
├── backup.sh                   # S3 Backup Script
├── package.json
└── package-lock.json
```

---

## 3. Architecture

```
                          +--------------------+
                          |      GitHub        |
                          |    Source Code     |
                          +---------+----------+
                                    |
                                    | Push
                                    |
                         GitHub Actions CI/CD
                                    |
                                    |
                                    v
                      +------------------------------+
                      |        Amazon EC2            |
                      | Ubuntu Server (t2.micro)     |
                      |------------------------------|
                      | Node.js Express Application  |
                      | app.js                       |
                      +--------------+---------------+
                                     |
                  +------------------+------------------+
                  |                                     |
                  |                                     |
                  v                                     v
          Amazon CloudWatch                     backup.sh Script
        Metrics, Logs & Alarms                         |
                                                       |
                                                       v
                                                Amazon S3 Bucket
                                              Application Backups
```

### Application Flow

```
User
   │
   ▼
EC2 Public IP / Elastic IP
   │
   ▼
Node.js Express Application
   │
   ├── CloudWatch Agent
   │       │
   │       ▼
   │   CloudWatch Logs & Metrics
   │
   └── backup.sh
           │
           ▼
      Amazon S3 Bucket
```

---

## 4. Quick Start (Local Development)

Clone the repository

```bash
git clone https://github.com/Saketh8904/DevopsUser.git
```

Move into the project directory

```bash
cd DevopsUser
```

Install dependencies

```bash
npm install
```

Run the application

```bash
node app.js
```

Application URL

```
http://localhost:3000
```

---

## 5. Deliverables Index

| Deliverable | Location |
|--------------|----------|
| Git Repository | This Repository |
| Deployment Guide | README.md |
| Architecture Diagram | Section 3 |
| Pipeline Configuration | `.github/workflows/deploy.yml` |
| Monitoring | Amazon CloudWatch |
| Backup Script | `backup.sh` |
| CI/CD Pipeline | GitHub Actions |
| Final Report | README.md |

---

## 6. CI/CD Pipeline

The deployment pipeline is implemented using **GitHub Actions**.

### Trigger

- Push to `main`

### Pipeline Stages

- Checkout Repository
- Install Node.js
- Install Dependencies
- Build Application
- Deploy to EC2
- Restart Application
- Verify Deployment

Workflow File

```
.github/workflows/deploy.yml
```

Secrets Used

- EC2_HOST
- EC2_USERNAME
- EC2_SSH_KEY
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

All secrets are securely stored using GitHub Actions Secrets.

---

## 7. Monitoring

Monitoring is implemented using **Amazon CloudWatch**.

Metrics monitored include

- CPU Utilization
- Memory Usage
- Disk Usage
- Network Traffic
- Status Checks
- Application Logs

CloudWatch Features

- Log Groups
- Metrics
- Dashboards
- Alarms
- EC2 Monitoring

---

## 8. Backup

The project includes an automated backup solution using Amazon S3.

Backup Script

```
backup.sh
```

The script performs

- Compress Application
- Generate Timestamp
- Upload Archive to Amazon S3
- Verify Upload

---

## 9. Security

Security best practices implemented

- IAM Least Privilege
- GitHub Secrets
- SSH Key Authentication
- Restricted Security Groups
- No Hardcoded Credentials
- AWS Free Tier Best Practices

---

## 10. Technologies Used

- AWS EC2
- Amazon S3
- Amazon CloudWatch
- IAM
- GitHub Actions
- Ubuntu Linux
- Node.js
- Express.js
- Bash
- Git
- GitHub

---

## 11. Project Features

- Automated CI/CD Pipeline
- Secure EC2 Deployment
- CloudWatch Monitoring
- Amazon S3 Backup
- GitHub Actions Automation
- AWS Free Tier Deployment
- Infrastructure Security

---

## 12. Future Improvements

- Docker Containerization
- Nginx Reverse Proxy
- HTTPS using Let's Encrypt
- Terraform Infrastructure as Code
- Auto Scaling
- Load Balancer
- Prometheus Monitoring
- Grafana Dashboard

---

## 13. Demo

A complete demonstration includes

- Application Deployment
- GitHub Actions Pipeline
- EC2 Instance
- CloudWatch Dashboard
- Amazon S3 Backup
- Live Application Access

---

## 14. License

This project was developed for educational purposes as part of a DevOps on AWS Free Tier assignment.

---

## Author

**Saketh Alevooraya K**

GitHub: https://github.com/Saketh8904

Project Repository:

https://github.com/Saketh8904/DevopsUser
