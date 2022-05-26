# Serializers
from rest_framework import serializers
from django_filters import rest_framework, DateRangeFilter, DateFilter as filters
from datetime import datetime, timedelta

from .models import *


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [  
            'employee_id', 
            'first_name', 
            'last_name', 
            'job_title',
            'avatar', 
            'location', 
        ]
    location = serializers.SerializerMethodField(read_only=True)
    def get_location(self, obj):
        location_qs = LocationEmployee.objects.filter(employee_id=obj.employee_id).filter(last_seen__lt=datetime.now() - timedelta(hours=5) ).order_by('-last_seen')[:1]
        return  LocationEmployeeSerializer(location_qs, many=True).data

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
    location = serializers.SerializerMethodField(read_only=True)
    def get_location(self, obj):
        location_qs = LocationEquipment.objects.filter(equipment_id=obj.equipment_id).order_by('-last_seen')[:1]
        return  LocationEquipmentSerializer(location_qs, many=True).data

      
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
    location = serializers.SerializerMethodField(read_only=True)
    def get_location(self, obj):
        location_qs = LocationVehicle.objects.filter(vehicle_id=obj.vehicle_id).order_by('-last_seen')[:1]
        return  LocationVehicleSerializer(location_qs, many=True).data


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
    location = serializers.SerializerMethodField(read_only=True)
    def get_location(self, obj):
        location_qs = LocationTag.objects.filter(tag_id=obj.tag_id).order_by('-last_seen')[:1]
        return  LocationTagsSerializer(location_qs, many=True).data


#-------------------------------------------------------------------------------------------------
# Location Serializers
#-------------------------------------------------------------------------------------------------

class LocationEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationEmployee
        fields = [
            'employee_id',
            'lat',
            'lng',
            'last_seen',
            'time_action',
            'description',
        ]


class LocationEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationEquipment
        fields = [
            'equipment_id',
            'lat',
            'lng',
            'last_seen',
            'description',
        ]


class LocationVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationVehicle
        fields = [
            'vehicle_id',
            'lat',
            'lng',
            'last_seen',
            'description',
        ]


class LocationTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationTag
        fields = [
            'tag_id',
            'lat',
            'lng',
            'last_seen',
            'description',
        ]


#-------------------------------------------------------------------------------------------------
# Employee Time Tracking Serializers
#-------------------------------------------------------------------------------------------------

class HoursWorkedEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationEmployee
        fields = [
            'employee_id',
            'last_seen',
            'time_action',
            'description'
        ]



class EmployeeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
    location = serializers.SerializerMethodField(read_only=True)
    hours_worked = serializers.SerializerMethodField(read_only=True)
    
    def get_location(self, obj):
        location_qs = LocationEmployee.objects.filter(employee_id=obj.employee_id).filter(last_seen__lt=datetime.now() - timedelta(hours=6)).order_by('-last_seen')[:1]
        return  LocationEmployeeSerializer(location_qs, many=True).data
    
    def get_hours_worked(self, obj):
        time_threshold  = datetime.now() - timedelta(days=14)
        time_qs = LocationEmployee.objects.filter(employee_id=obj.employee_id).filter(last_seen__lt=datetime.now() - timedelta(hours=6), last_seen__gt=time_threshold).order_by('-last_seen')
        return  HoursWorkedEmployeeSerializer(time_qs, many=True).data


      
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
    location = serializers.SerializerMethodField(read_only=True)
    def get_location(self, obj):
        location_qs = LocationVehicle.objects.filter(vehicle_id=obj.vehicle_id).order_by('-last_seen')[:1]
        return  LocationVehicleSerializer(location_qs, many=True).data


#-------------------------------------------------------------------------------------------------
# Other Serializers
#-------------------------------------------------------------------------------------------------

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = '__all__'



