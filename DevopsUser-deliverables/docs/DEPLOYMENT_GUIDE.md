# Deployment Guide

This guide documents the complete deployment process of the DevOpsUser application on AWS Free Tier.

---

# 1. Prerequisites

- AWS Free Tier Account
- IAM User (non-root)
- AWS CLI configured
- Git
- GitHub Account
- Ubuntu 26.04 EC2 Instance
- Node.js 20
- Nginx
- PM2
- CloudWatch Agent

Repository:

https://github.com/Saketh8904/DevopsUser

AWS Region:

ap-south-1

---

# 2. IAM Configuration

## IAM User

Created a dedicated IAM user instead of using the AWS root account.

Permissions included:

- EC2 Describe
- S3 Read/Write
- CloudWatch
- CloudWatch Logs
- API Gateway
- IAM Read
- GitHub Actions deployment permissions

MFA enabled for AWS root account.

---

## EC2 IAM Role

Created:

CloudWatchEC2Role

Attached Policy:

- CloudWatchAgentServerPolicy

Attached the IAM Role to the EC2 instance to allow CloudWatch Agent to publish metrics without storing AWS credentials on the server.

---

# 3. Security Group Configuration

Inbound Rules

| Type | Port | Source |
|-------|------|---------|
| SSH | 22 | My IP |
| HTTP | 80 | 0.0.0.0/0 |
| HTTPS | 443 | 0.0.0.0/0 |

Outbound

Allow All

---

# 4. Launch EC2 Instance

AMI

Ubuntu Server 26.04 LTS

Instance Type

t2.micro

Region

ap-south-1

Storage

8 GB gp3

IAM Role

CloudWatchEC2Role

Key Pair

devuser.pem

Connect

```bash
ssh -i devuser.pem ubuntu@13.206.69.42
```

---

# 5. Install Required Software

Update packages

```bash
sudo apt update
sudo apt upgrade -y
```

Install Git

```bash
sudo apt install git -y
```

Install Nginx

```bash
sudo apt install nginx -y
```

Install Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt install nodejs -y
```

Install PM2

```bash
sudo npm install -g pm2
```

---

# 6. Clone the Repository

```bash
git clone https://github.com/Saketh8904/DevopsUser.git

cd DevopsUser
```

Install dependencies

```bash
npm install
```

---

# 7. Run Application

Start application

```bash
pm2 start index.js --name devopsuser
```

Save PM2 configuration

```bash
pm2 save
```

Enable PM2 on reboot

```bash
pm2 startup
```

Check status

```bash
pm2 status
```

---

# 8. Configure Nginx

Create configuration

```bash
sudo nano /etc/nginx/sites-available/default
```

Example configuration

```nginx
server {

    listen 80;

    server_name _;

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

Restart nginx

```bash
sudo nginx -t

sudo systemctl restart nginx
```

---

# 9. S3 Backup

Created bucket

```
backup0123
```

Create backup

```bash
tar -czvf project-backup.tar.gz ~/DevopsUser
```

Upload backup

```bash
aws s3 cp project-backup.tar.gz s3://backup0123/
```

Verify upload

```bash
aws s3 ls s3://backup0123
```

---

# 10. API Gateway

Created HTTP API

Protocol

HTTP

Stage

$default

Region

ap-south-1

Integrated with the EC2 application.

---

# 11. GitHub Actions CI/CD

Workflow location

```
.github/workflows/deploy.yml
```

Pipeline Steps

1. Checkout Repository
2. Install Dependencies
3. Run Build
4. SSH into EC2
5. Pull Latest Code
6. Install Dependencies
7. Restart PM2 Application

GitHub Secrets

- EC2_HOST
- EC2_USER
- EC2_SSH_KEY

---

# 12. CloudWatch Monitoring

Installed CloudWatch Agent.

Collected metrics

- CPU Utilization
- Memory Utilization
- Disk Usage
- Network Traffic

Collected logs

- Nginx Access Log
- Nginx Error Log
- Application Log

Created

- Dashboard
- Alarms
- SNS Email Notification

---

# 13. Load Testing

Tool

k6

Run

```bash
k6 run load-testing/load-test.js
```

Metrics Collected

- Throughput
- Response Time
- Error Rate
- CPU Utilization
- Memory Utilization

---

# 14. HTTPS

Attempted to configure HTTPS using Let's Encrypt.

```bash
sudo certbot --nginx
```

Certificate generation could not be completed because the custom domain DNS was not correctly configured.

The application remained accessible over HTTP.

---

# 15. Verification

Application

```
http://13.206.69.42
```

Verify PM2

```bash
pm2 status
```

Verify Nginx

```bash
sudo systemctl status nginx
```

Verify CloudWatch Agent

```bash
sudo systemctl status amazon-cloudwatch-agent
```

---

# 16. Cleanup

Terminate EC2 Instance

Delete

- EC2
- S3 Bucket
- CloudWatch Dashboard
- CloudWatch Alarms
- SNS Topic
- API Gateway
- IAM Roles
- IAM Users

to avoid AWS charges.