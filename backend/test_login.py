import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

import requests

url = 'http://127.0.0.1:8000/api/auth/login/'

# Test Admin
print("=== Test Admin ===")
data = {'email': 'admin@smartfarming.ma', 'password': 'Admin123!'}
response = requests.post(url, json=data)
print(f"Status code: {response.status_code}")
print(f"Response: {response.text}\n")

# Test Agronome
print("=== Test Agronome ===")
data = {'email': 'tech@smartfarming.ma', 'password': 'Tech123!'}
response = requests.post(url, json=data)
print(f"Status code: {response.status_code}")
print(f"Response: {response.text}\n")

# Test Farmer
print("=== Test Farmer ===")
data = {'email': 'farmer@smartfarming.ma', 'password': 'Farmer123!'}
response = requests.post(url, json=data)
print(f"Status code: {response.status_code}")
print(f"Response: {response.text}")
