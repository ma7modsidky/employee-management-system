from rest_framework import generics
from ..models import Company, Department, Employee
from .serializers import CompanySerializer, DepartmentSerializer, EmployeeDetailsSerializer, EmployeeCreateSerializer, DepartmentCreateSerializer
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EmployeeFilter, DepartmentFilter
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination



# Company Views
class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes= [IsAuthenticated]

class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

# Department Views
class DepartmentList(generics.ListCreateAPIView):
    queryset = Department.objects.select_related('company').all()  # Optimize querie

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
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20  # Number of records per page
    page_size_query_param = 'page_size'  # Allow client to override page size
    max_page_size = 100  # Maximum page size allowed
class EmployeeListCreate(generics.ListCreateAPIView):
    queryset = Employee.objects.select_related('company', 'department').all()  # Optimize querie
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
    # Define a unique cache key for this data
    cache_key = 'dashboard_counts'
    
    # Try to get the counts from the cache
    counts = cache.get(cache_key)
    
    # If the counts are not in the cache, query the database and store the result in the cache
    if counts is None:
        counts = {
            "companies": Company.objects.count(),
            "departments": Department.objects.count(),
            "employees": Employee.objects.count(),
        }
        # Store the counts in the cache with a timeout (e.g., 5 minutes)
        cache.set(cache_key, counts, timeout=300)
    
    return JsonResponse(counts)