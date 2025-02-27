from django.urls import path
from . import views
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView


urlpatterns = [
    # Company URLs
    path('companies/', views.CompanyList.as_view(), name='company-list'),
    path('companies/<int:pk>/', views.CompanyDetail.as_view(), name='company-detail'),

    # Department URLs
    path('departments/', views.DepartmentList.as_view(), name='department-list'),
    path('departments/<int:pk>/', views.DepartmentDetail.as_view(), name='department-detail'),

    # Employee URLs
    path('employees/', views.EmployeeListCreate.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', views.EmployeeDetail.as_view(), name='employee-detail'),
    
    # Count
    path('counts/', views.get_counts, name='get_counts'),
    
    # Documentation
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]