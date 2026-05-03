import time
import requests
import concurrent.futures
import statistics
from datetime import datetime

# Cloud Run API endpoint from Swagger documentation
CLOUD_RUN_URL = "https://ai-reviewer-backend-656997228650.us-central1.run.app/api/review"

# Large code snippet (200+ lines) to increase processing time and compute usage
BASE_CODE = """
import os
import json
import asyncio
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime

class CodeAnalyzer:
    \"\"\"
    A comprehensive code analyzer class that simulates complex logic 
    to trigger backend processing and CPU usage.
    \"\"\"
    def __init__(self, project_name: str):
        self.project_name = project_name
        self.metrics = {}
        self.logger = logging.getLogger(__name__)

    def calculate_complexity(self, code: str) -> int:
        # Simulate heavy calculation
        lines = code.split('\\n')
        complexity = 0
        for line in lines:
            if any(keyword in line for keyword in ['if', 'for', 'while', 'elif', 'catch', 'except']):
                complexity += 1
            if 'import' in line:
                complexity += 0.5
        return int(complexity)

    def analyze_patterns(self, code: str) -> Dict[str, Any]:
        # Simulate pattern matching
        patterns = {
            "snake_case": code.count('_'),
            "camelCase": code.count('C'),  # naive
            "indentation": code.count('    '),
            "comments": code.count('#') + code.count('\"\"\"')
        }
        return patterns

    def generate_report(self, data: List[Dict[str, Any]]) -> str:
        report = f"Report for {self.project_name}\\n"
        report += "=" * 20 + "\\n"
        for item in data:
            report += f"Module: {item.get('name')}\\n"
            report += f"Score: {item.get('score')}\\n"
            report += "-" * 10 + "\\n"
        return report

def dummy_processing_logic_1():
    for i in range(10):
        x = i * i
        y = x / 2 if x > 0 else 0
    return True
"""

# Append extra lines to reach 200+
EXTRA_LINES = "\n".join([f"# Extra line {i}: logging.info('Backend stress test heartbeat {i}')" for i in range(160)])
LARGE_CODE_INPUT = BASE_CODE + "\n" + EXTRA_LINES + "\n" + "def final_check():\n    return 'OK'\n"

# -------------------------------
# Retry logic for failed requests
# -------------------------------
def send_request_with_retry(payload, retries=5):
    for attempt in range(retries):
        try:
            start_time = time.perf_counter()
            response = requests.post(
                CLOUD_RUN_URL,
                json=payload,
                timeout=120  # Larger code needs more time
            )
            latency = time.perf_counter() - start_time

            if response.status_code == 200:
                return response.json(), latency
            
            elif response.status_code == 429:
                print(f"[Rate Limited] 429. Retrying in {2**(attempt+1)}s...", flush=True)
                time.sleep(2**(attempt+1))
            else:
                print(f"[Error] Status {response.status_code}: {response.text[:100]}", flush=True)
                time.sleep(1)

        except Exception as e:
            print(f"[Exception] Attempt {attempt+1} failed: {e}", flush=True)
            time.sleep(2)

    return None, 0

# -------------------------------
# Worker function
# -------------------------------
def run_task(request_id):
    payload = {
        "code": LARGE_CODE_INPUT,
        "language": "python"
    }
    
    result, latency = send_request_with_retry(payload)
    
    if result:
        return {
            "id": request_id,
            "success": True,
            "latency": latency,
            "score": result.get("score", "N/A")
        }
    else:
        return {
            "id": request_id,
            "success": False,
            "latency": 0,
            "score": "N/A"
        }

# -------------------------------
# Traffic generator & Monitoring
# -------------------------------
def simulate_usage(num_requests=200, workers=5):
    print(f"Starting Cloud Run Load Simulation", flush=True)
    print(f"Target: {CLOUD_RUN_URL}", flush=True)
    print(f"Volume: {num_requests} requests", flush=True)
    print(f"Concurrency: {workers} workers", flush=True)
    print(f"Input Size: ~{len(LARGE_CODE_INPUT.splitlines())} lines\n", flush=True)

    latencies = []
    success_count = 0
    errors = 0

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
        futures = []
        for i in range(1, num_requests + 1):
            futures.append(executor.submit(run_task, i))
            
            # Pacing to avoid immediate 429
            if i % 10 == 0:
                print(f"   [Pacing] Sent {i}/{num_requests} requests...", flush=True)
                time.sleep(2)
            else:
                time.sleep(0.5)

        for future in concurrent.futures.as_completed(futures):
            res = future.result()
            if res["success"]:
                success_count += 1
                latencies.append(res["latency"])
                print(f"[{res['id']}] SUCCESS ({res['latency']:.2f}s) | Score: {res['score']}", flush=True)
            else:
                errors += 1
                print(f"[{res['id']}] FAILED", flush=True)

    # Final Stats
    total_requests = success_count + errors
    success_rate = (success_count / total_requests) * 100 if total_requests > 0 else 0
    avg_latency = statistics.mean(latencies) if latencies else 0
    
    print("\n" + "="*30, flush=True)
    print("       FINAL REPORT", flush=True)
    print("="*30, flush=True)
    print(f"Total Requests: {total_requests}", flush=True)
    print(f"Successful:     {success_count}", flush=True)
    print(f"Errors:         {errors}", flush=True)
    print(f"Success Rate:   {success_rate:.1f}%", flush=True)
    if latencies:
        print(f"Avg Latency:    {avg_latency:.2f}s", flush=True)
        print(f"Max Latency:    {max(latencies):.2f}s", flush=True)
    print("="*30, flush=True)

if __name__ == "__main__":
    simulate_usage(num_requests=200, workers=8)