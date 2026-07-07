# Security Summary

## 1. IAM – Least Privilege

| Identity | Purpose | Permissions | Notes |
|-----------|---------|-------------|-------|
| Root Account | AWS account management | Full access | MFA enabled. Used only for billing and account management. |
| IAM User (`devuser`) | Daily administration and deployment | EC2, S3, CloudWatch, IAM (limited), API Gateway | Used instead of the root account. |
| GitHub Actions | CI/CD Deployment | SSH access to EC2 using encrypted GitHub Secrets | No AWS credentials stored in the repository. |
| EC2 IAM Role (`CloudWatchEC2Role`) | CloudWatch monitoring | CloudWatchAgentServerPolicy | Allows CloudWatch Agent to publish logs and metrics without storing AWS access keys on the EC2 instance. |

### IAM Best Practices

- Root account was not used for day-to-day activities.
- MFA enabled for the root account.
- IAM roles were used instead of long-lived AWS credentials on the EC2 instance.
- GitHub Secrets were used to securely store deployment credentials.
- Least privilege principle was followed when assigning IAM permissions.

---

# 2. Network Security

## VPC

- AWS Default VPC
- Region: **ap-south-1**

## Security Group Configuration

| Protocol | Port | Source | Purpose |
|----------|------|---------|----------|
| SSH | 22 | My Public IP | Secure remote administration |
| HTTP | 80 | 0.0.0.0/0 | Public web traffic |
| HTTPS | 443 | 0.0.0.0/0 | Reserved for future HTTPS support |

### Additional Security

- SSH access restricted to the administrator's IP address.
- No unnecessary inbound ports were opened.
- Application listens internally on port **3000**.
- Nginx reverse proxy forwards requests from port **80** to the application.

---

# 3. Transport Security

The application was configured behind an Nginx reverse proxy.

An attempt was made to configure HTTPS using Let's Encrypt.

```bash
sudo certbot --nginx
```

Certificate generation could not be completed because the custom domain DNS was not correctly configured.

Therefore, the application was deployed over HTTP for demonstration purposes.

Future production deployment should use:

- AWS Certificate Manager (ACM)
- API Gateway Custom Domain
- or Let's Encrypt with a valid DNS configuration

---

# 4. Data Protection

Amazon S3 was used for storing application backups.

Bucket Name

```
backup0123
```

Security Features

- Block Public Access enabled
- Bucket accessible only through IAM permissions
- No public objects
- Backup files uploaded using AWS CLI

Example

```bash
aws s3 cp project-backup.tar.gz s3://backup0123/
```

---

# 5. Secrets Management

Sensitive information was never committed to the GitHub repository.

The following secrets were stored securely in GitHub Actions:

- EC2_HOST
- EC2_USER
- EC2_SSH_KEY

No AWS Access Keys were stored on the EC2 instance.

The EC2 instance uses the IAM Role:

```
CloudWatchEC2Role
```

for authentication with CloudWatch.

---

# 6. Monitoring & Logging

Monitoring was implemented using Amazon CloudWatch.

Collected Metrics

- CPU Utilization
- Memory Utilization
- Disk Usage
- Network Traffic

Collected Logs

- Application Logs
- Nginx Access Logs
- Nginx Error Logs

CloudWatch Dashboard

Included

- CPU Utilization
- Memory Usage
- Network In
- Network Out
- Disk Usage

CloudWatch Alarms

Configured for

- High CPU Utilization
- EC2 Status Check Failure

Amazon SNS was configured to send email notifications when alarms were triggered.

---

# 7. CI/CD Security

GitHub Actions was used for automated deployment.

Security measures included

- Encrypted GitHub Secrets
- SSH Key Authentication
- No passwords stored in workflow files
- Automatic deployment only after successful workflow execution

---

# 8. Known Limitations

The project was intentionally implemented using AWS Free Tier resources.

Current limitations include:

- Single EC2 instance (single point of failure)
- No Auto Scaling Group
- No Application Load Balancer
- HTTPS certificate could not be configured because the custom domain DNS was not correctly configured
- No AWS WAF due to Free Tier constraints
- No GuardDuty or AWS Config due to project scope

These limitations are acceptable for a Free Tier demonstration project but should be addressed before a production deployment.

---

# 9. Recommendations for Production

To improve the application's security and availability in a production environment, the following enhancements are recommended:

1. Deploy multiple EC2 instances behind an Application Load Balancer.

2. Configure an Auto Scaling Group.

3. Enable HTTPS using AWS Certificate Manager and a valid custom domain.

4. Deploy AWS WAF to protect against common web attacks.

5. Enable AWS CloudTrail for complete audit logging.

6. Enable Amazon GuardDuty for threat detection.

7. Enable AWS Config for continuous compliance monitoring.

8. Store application secrets using AWS Secrets Manager or AWS Systems Manager Parameter Store.

9. Enable automatic backup lifecycle policies for Amazon S3.

10. Implement GitHub OIDC authentication to AWS instead of long-lived credentials for CI/CD deployments.