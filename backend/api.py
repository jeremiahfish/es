# API Views
from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


from .models import *
from .serializers import *



# Locate Viewset
class LocateViewSet(viewsets.ViewSet):
     def list(self, request):
        people      = EmployeeSerializer(Employee.objects.all(), many=True)
        equipment   = EquipmentSerializer(Equipment.objects.all(), many=True)
        vehicles    = VehicleSerializer(Vehicle.objects.all(), many=True)
        tag         = TagSerializer(Tag.objects.all(), many=True)

        data = {
            "people": people.data,
            "equipment": equipment.data,
            "vehicles": vehicles.data,
            "tags": tag.data
        }

        return Response(data)




# People Detail Viewset
class PeopleDetailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeDetailSerializer
    lookup_field = 'employee_id'

