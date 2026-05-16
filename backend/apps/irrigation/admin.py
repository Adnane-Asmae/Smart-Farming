from django.contrib import admin
from .models import PlanIrrigation, CycleIrrigation, IoTSensor, IoTAlert

admin.site.register(PlanIrrigation)
admin.site.register(CycleIrrigation)
admin.site.register(IoTSensor)
admin.site.register(IoTAlert)
