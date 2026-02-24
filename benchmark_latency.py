import time
import requests
import statistics

BASE_URL = "http://127.0.0.1:8000"

def benchmark_endpoint(url, method="GET", data=None, files=None):
    start = time.perf_counter()
    try:
        if method == "GET":
            # Using a shorter timeout and disabling proxies for local testing
            response = requests.get(url, timeout=5, proxies={"http": None, "https": None})
        elif method == "POST":
            response = requests.post(url, data=data, files=files, timeout=5, proxies={"http": None, "https": None})
        end = time.perf_counter()
        return end - start, response.status_code
    except Exception as e:
        return 5.0, str(e)

def run_benchmarks():
    endpoints = [
        ("/health", "GET"),
        ("/api/sessions", "GET"),
    ]
    
    print(f"{'Endpoint':<30} | {'Avg Latency (s)':<15} | {'Status'}")
    print("-" * 60)
    
    for path, method in endpoints:
        latencies = []
        status_codes = []
        for i in range(5):
            lat, status = benchmark_endpoint(BASE_URL + path, method)
            latencies.append(lat)
            status_codes.append(status)
            print(f"  [{i+1}/5] {path}: {lat:.4f}s - {status}")
        
        avg_lat = statistics.mean(latencies)
        # Use first status code as representative
        print(f"RESULT: {path:<22} | {avg_lat:<15.4f} | {status_codes[0]}")

if __name__ == "__main__":
    run_benchmarks()
