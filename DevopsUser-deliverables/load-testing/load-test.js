import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom Metrics
export const errorRate = new Rate('errors');
export const responseTimeTrend = new Trend('response_time');

// Replace with your EC2 Public IP or Domain
const BASE_URL = __ENV.BASE_URL || 'http://13.206.69.42';

export const options = {
  scenarios: {
    ramping: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 },   // Warm-up
        { duration: '1m', target: 50 },    // Normal Load
        { duration: '1m', target: 100 },   // Peak Load
        { duration: '30s', target: 0 },    // Cool-down
      ],
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.95'],
  },
};

export default function () {
  // Change this endpoint if your application uses another route
  const res = http.get(`${BASE_URL}/health`);

  const success = check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  errorRate.add(!success);
  responseTimeTrend.add(res.timings.duration);

  sleep(1);
}