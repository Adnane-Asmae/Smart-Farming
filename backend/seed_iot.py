"""
Smart Farming - Seeding IoT Sensors & Alerts
"""

import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

from apps.parcelles.models import Parcelle
from apps.irrigation.models import IoTSensor, IoTAlert

print("Adding IoT Sensors...")

try:
    p1 = Parcelle.objects.first()
    p2 = Parcelle.objects.last()
    
    if p1 and p2:
        s1 = IoTSensor.objects.create(
            sensor_name='Sensor A-1',
            parcelle=p1,
            moisture_level=45.2,
            battery_level=87.5,
            status='ACTIVE'
        )
        s2 = IoTSensor.objects.create(
            sensor_name='Sensor B-2',
            parcelle=p2,
            moisture_level=22.8,
            battery_level=65.3,
            status='ACTIVE'
        )
        print(f"IoT Sensors created: {s1}, {s2}")

        alert = IoTAlert.objects.create(
            sensor=s2,
            message=f"Critical water stress detected in {p2.nom}",
            alert_type='CRITICAL'
        )
        print(f"IoT Alert created: {alert}")
    else:
        print("No parcels found - please seed parcels first!")

except Exception as e:
    print(f"Error: {e}")

print("\nDone!")
