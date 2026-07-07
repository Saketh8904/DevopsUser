# DevOpsUser — Production-Style Web App on AWS Free Tier

[![CI/CD](https://github.com/Saketh8904/DevopsUser/actions/workflows/deploy.yml/badge.svg)](https://github.com/Saketh8904/DevopsUser/actions)

A end-to-end DevOps project demonstrating how to design, deploy, secure, monitor, and
load-test a web application on AWS Free Tier, with a fully automated CI/CD pipeline.

> **Author:** Saketh
> **Repo:** https://github.com/Saketh8904/DevopsUser
> **Status:** `<<FILL IN: e.g. Completed / In Progress>>`

---

## 1. Project Summary

| Item | Details |
|---|---|
| Application | `<<FILL IN: e.g. Node.js/Express REST API — "Task Manager API">>` |
| Compute | Amazon EC2 (t2.micro, Free Tier) |
| Storage | Amazon S3 (static assets / backups) |
| API Layer | Amazon API Gateway → EC2 (or Lambda, if used) |
| IAM | Least-privilege roles for EC2, CI/CD, S3 access |
| Security | Security Groups, HTTPS via Let's Encrypt / ACM, restricted SSH |
| CI/CD | GitHub Actions (build → test → deploy to EC2) |
| Monitoring | Amazon CloudWatch (metrics, logs, dashboards, alarms) |
| Load Testing | k6 / JMeter — see `load-testing/` |
| Region | `<<FILL IN: e.g. ap-south-1>>` |

---

## 2. Repository Structure

```
DevopsUser/
├── app/                        # Application source code
│   ├── src/
│   ├── package.json
│   └── Dockerfile              # (if containerized)
├── infra/
│   ├── architecture-diagram.png
│   ├── security-groups.md
│   └── iam-policies/
│       ├── ec2-role-policy.json
│       └── cicd-deploy-policy.json
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── load-testing/
│   ├── load-test.js            # k6 script (or .jmx for JMeter)
│   └── LOAD_TEST_REPORT.md
├── monitoring/
│   ├── cloudwatch-dashboard.json
│   └── screenshots/
├── docs/
│   ├── DEPLOYMENT_GUIDE.md
│   ├── SECURITY_SUMMARY.md
│   └── FINAL_REPORT.md
└── README.md                   # this file
```

> Adjust this tree to match what you actually committed — the point is that every
> deliverable below has a **findable home** in the repo instead of living only in chat/screenshots.

---

## 3. Architecture

![Architecture Diagram](infra/architecture-diagram.png)

**Flow:**
```
Client → HTTPS (443) → API Gateway ─┐
                                     ├─→ EC2 (Nginx reverse proxy + App on port 3000/8080)
Client → HTTPS (443) → Route53/EIP ─┘        │
                                              ├─→ CloudWatch Agent → Logs / Metrics
                                              └─→ S3 (static assets, DB backups)

GitHub Actions (CI/CD) → SSH/SSM deploy → EC2
IAM Roles: EC2-Instance-Role (S3 read/write scoped to one bucket, CloudWatch:PutMetricData)
           CICD-Deploy-Role (least privilege: ec2:Describe*, ssm:SendCommand, s3:PutObject)
```

A full-resolution diagram is at `infra/architecture-diagram.png` (see Section 9 for how to regenerate it).

---

## 4. Quick Start (Local Dev)

```bash
git clone https://github.com/Saketh8904/DevopsUser.git
cd DevopsUser/app
npm install          # or: pip install -r requirements.txt
npm run dev          # runs locally on http://localhost:3000
```

For full AWS deployment steps, see **[docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)**.

---

## 5. Deliverables Index

| Deliverable | Location |
|---|---|
| Git repository | this repo |
| Deployment guide | `docs/DEPLOYMENT_GUIDE.md` |
| Architecture diagram | `infra/architecture-diagram.png` |
| Pipeline configuration | `.github/workflows/deploy.yml` |
| Monitoring screenshots | `monitoring/screenshots/` |
| Load testing report | `load-testing/LOAD_TEST_REPORT.md` |
| Security summary | `docs/SECURITY_SUMMARY.md` |
| Demo video | `<<FILL IN: link once recorded — see Section 8>>` |
| Final report (PDF/DOCX) | `docs/FINAL_REPORT.md` (export to PDF/DOCX before submission) |

---

## 6. CI/CD Pipeline

Trigger: push to `main`.
Stages: **Lint → Test → Build → Deploy to EC2 (via SSH/SSM) → Smoke test**.
See `.github/workflows/deploy.yml`. Secrets used: `EC2_HOST`, `EC2_SSH_KEY`, `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY` (stored in GitHub Actions encrypted secrets, scoped to a
least-privilege IAM user — never the root account).

---

## 7. Monitoring

- **CloudWatch Agent** installed on EC2, streaming `cpu`, `mem`, `disk`, and app logs
  (`/var/log/app/*.log`) to CloudWatch Logs.
- **Dashboard**: CPUUtilization, NetworkIn/Out, StatusCheckFailed, custom app metrics
  (requests/sec, error rate).
- **Alarms**:
  - CPUUtilization > 80% for 5 min → SNS email
  - StatusCheckFailed ≥ 1 → SNS email
  - 5xx error rate > 5% over 5 min → SNS email
- Screenshots in `monitoring/screenshots/`.

---

## 8. Demo Video

`<<FILL IN once recorded>>` — 5–10 min walkthrough covering: architecture, live deploy via
GitHub Actions, hitting the HTTPS endpoint, CloudWatch dashboard, and a short load test run.
(See the "Recording the demo video" section in `docs/DEPLOYMENT_GUIDE.md` for a suggested script.)

---

## 9. Regenerating the Architecture Diagram

A Mermaid source file is provided so the diagram can be edited and re-exported:
`infra/architecture-diagram.mmd`. Render with:

```bash
npx @mermaid-js/mermaid-cli -i infra/architecture-diagram.mmd -o infra/architecture-diagram.png
```

---

## 10. License

`<<FILL IN, e.g. MIT>>`
