# Models
from turtle import distance
from django.db import models
from datetime import datetime
from multiprocessing.dummy import active_children
import uuid


class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name  = models.CharField(max_length=30,   blank=True)
    last_name   = models.CharField(max_length=30,   blank=True)
    email       = models.EmailField(max_length=254, blank=True)
    job_title   = models.CharField(max_length=254,  blank=True)
    phone_work  = models.CharField(max_length=50,   blank=True)
    phone_home  = models.CharField(max_length=50,   blank=True)
    hire_date   = models.DateField(default=datetime.now)
    avatar      = models.CharField(max_length=254,  blank=True)
    active      = models.BooleanField(default=True)
    class Meta:
        db_table = "employee"
    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Equipment(models.Model):
    equipment_id      = models.AutoField(primary_key=True)
    label             = models.CharField(max_length=30,  blank=True)
    asset_tag         = models.CharField(max_length=254, blank=True)
    manufacture       = models.CharField(max_length=30,  blank=True)
    manufacture_model = models.CharField(max_length=30,  blank=True)
    avatar            = models.CharField(max_length=254, blank=True)
    class Meta:
        db_table = "equipment"
    def __str__(self):
        return self.label


class Vehicle(models.Model):
    vehicle_id        = models.AutoField(primary_key=True)
    label             = models.CharField(max_length=30,  blank=True)
    asset_tag         = models.CharField(max_length=254, blank=True)
    manufacture       = models.CharField(max_length=30,  blank=True)
    manufacture_model = models.CharField(max_length=30,  blank=True)
    avatar            = models.CharField(max_length=254, blank=True)
    class Meta:
        db_table = "vehicle"
    def __str__(self):
        return self.label


class Tag(models.Model):
    tag_id      = models.AutoField(primary_key=True)
    label       = models.CharField(max_length=30,  blank=True)
    asset_tag   = models.CharField(max_length=254, blank=True)
    vendor      = models.CharField(max_length=30,  blank=True)
    avatar      = models.CharField(max_length=254, blank=True)
    class Meta:
        db_table = "tag"
    def __str__(self):
        return self.label


#-------------------------------------------------------------------------------------------------
# Location Event Tables
#-------------------------------------------------------------------------------------------------

class LocationEmployee(models.Model):
    class TimeAction(models.TextChoices):
        IN  = 'IN',  "In"
        OUT = 'OUT', "Out"
        NA  = '',    "Na"
    location_id = models.UUIDField( primary_key = True, default = uuid.uuid4, editable = False)
    employee_id = models.ForeignKey(Employee, related_name='location', on_delete=models.CASCADE)
    last_seen   = models.DateTimeField(default=datetime.now)
    lat         = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    lng         = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    description = models.CharField(max_length=50,  blank=True)
    time_action = models.CharField(max_length=3, choices=TimeAction.choices, default=TimeAction.NA)
    class Meta:
        db_table = "location_employee"
        unique_together = ['location_id', 'employee_id']
        ordering = ['last_seen']

        
class LocationEquipment(models.Model):
    location_id  = models.UUIDField( primary_key = True, default = uuid.uuid4, editable = False)
    equipment_id = models.ForeignKey(Equipment, related_name='location', on_delete=models.CASCADE)
    last_seen    = models.DateTimeField(default=datetime.now)
    lat          = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    lng          = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    description  = models.CharField(max_length=50,  blank=True)
    engine_load  = models.IntegerField(blank=True, null=True)
    engine_rpm   = models.IntegerField(blank=True, null=True)
    coolant_temp = models.IntegerField(blank=True, null=True)
    oil_temp     = models.IntegerField(blank=True, null=True)
    fuel_level   = models.IntegerField(blank=True, null=True)
    battery_v    = models.IntegerField(blank=True, null=True)
    runtime      = models.IntegerField(blank=True, null=True)
    distance     = models.IntegerField(blank=True, null=True)
    gps_speed    = models.IntegerField(blank=True, null=True)
    gps_heading  = models.IntegerField(blank=True, null=True)
    accel        = models.IntegerField(blank=True, null=True)
    gyro         = models.IntegerField(blank=True, null=True)
    compass      = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = "location_equipment"
        unique_together = ['location_id', 'equipment_id']
        ordering = ['last_seen']


class LocationVehicle(models.Model):
    location_id  = models.UUIDField( primary_key = True, default = uuid.uuid4, editable = False)
    vehicle_id   = models.ForeignKey(Vehicle, related_name='location', on_delete=models.CASCADE)
    last_seen    = models.DateTimeField(default=datetime.now)
    lat          = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    lng          = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    description  = models.CharField(max_length=50,  blank=True)
    engine_load  = models.IntegerField(blank=True, null=True)
    engine_rpm   = models.IntegerField(blank=True, null=True)
    coolant_temp = models.IntegerField(blank=True, null=True)
    oil_temp     = models.IntegerField(blank=True, null=True)
    fuel_level   = models.IntegerField(blank=True, null=True)
    battery_v    = models.IntegerField(blank=True, null=True)
    runtime      = models.IntegerField(blank=True, null=True)
    distance     = models.IntegerField(blank=True, null=True)
    gps_speed    = models.IntegerField(blank=True, null=True)
    gps_heading  = models.IntegerField(blank=True, null=True)
    accel        = models.IntegerField(blank=True, null=True)
    gyro         = models.IntegerField(blank=True, null=True)
    compass      = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = "location_vehicle"
        unique_together = ['location_id', 'vehicle_id']
        ordering = ['last_seen']


class LocationTag(models.Model):
    location_id  = models.UUIDField( primary_key = True, default = uuid.uuid4, editable = False)
    tag_id       = models.ForeignKey(Tag, related_name='location', on_delete=models.CASCADE)
    last_seen    = models.DateTimeField(default=datetime.now)
    lat          = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    lng          = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    description  = models.CharField(max_length=50,  blank=True)
    class Meta:
        db_table = "location_tag"
        unique_together = ['location_id', 'tag_id']
        ordering = ['last_seen']


#-------------------------------------------------------------------------------------------------
# Other Tables
#-------------------------------------------------------------------------------------------------
 
class Avatar(models.Model):
    avatar_id   = models.UUIDField( primary_key = True, default = uuid.uuid4, editable = False)
    image       = models.CharField(max_length=254,  blank=True)
    svg         = models.CharField(max_length=100,  blank=True)
    color       = models.CharField(max_length=100,  blank=True)
    class Meta:
        db_table = "avatar"
    def __str__(self):
        return self.avatar_id + ' ' + self.image


class Location(models.Model):
    location_id = models.UUIDField( primary_key = True, default = uuid.uuid4, editable = False)
    employee_id = models.ForeignKey(Employee, related_name='location2', on_delete=models.CASCADE)
    last_seen   = models.DateTimeField(default=datetime.now)
    lat         = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    lng         = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    description = models.CharField(max_length=50,   blank=True)
    class Meta:
        #db_table = "location"
        unique_together = ['location_id', 'employee_id']
        ordering = ['last_seen']


# DurationField
# creating an instance of 
# datetime.date
# d = datetime(2015, 10, 09, 23, 55, 59, 342380)
