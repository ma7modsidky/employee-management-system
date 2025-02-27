from rest_framework import generics
from ..models import Company, Department, Employee
from .serializers import CompanySerializer, DepartmentSerializer, EmployeeDetailsSerializer, EmployeeCreateSerializer, DepartmentCreateSerializer
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EmployeeFilter, DepartmentFilter
from django.http import JsonResponse

# Company Views
class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

# Department Views
class DepartmentList(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = DepartmentFilter
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return DepartmentSerializer
        elif self.request.method == 'POST':
            return DepartmentCreateSerializer
        return super().get_serializer_class()

class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

# Employee Views
class EmployeeListCreate(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeDetailsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EmployeeFilter
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EmployeeDetailsSerializer
        elif self.request.method == 'POST':
            return EmployeeCreateSerializer
        return super().get_serializer_class()

class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeDetailsSerializer


def get_counts(request):
    counts = {
        "companies": Company.objects.count(),
        "departments": Department.objects.count(),
        "employees": Employee.objects.count(),
    }
    return JsonResponse(counts)