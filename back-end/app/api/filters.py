import django_filters
from ..models import Employee , Department

class EmployeeFilter(django_filters.FilterSet):
    company = django_filters.NumberFilter(field_name='company__id', lookup_expr='exact')
    department = django_filters.NumberFilter(field_name='department__id', lookup_expr='exact')

    class Meta:
        model = Employee
        fields = ['company', 'department']
        
class DepartmentFilter(django_filters.FilterSet):
    company = django_filters.NumberFilter(field_name='company__id', lookup_expr='exact')

    class Meta:
        model = Department
        fields = ['company']