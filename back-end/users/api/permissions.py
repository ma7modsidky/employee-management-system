from rest_framework import permissions


class UserUpdatePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        print('Permission', request.user)
        if request.method in permissions.SAFE_METHODS:
            return True
        # so we'll always allow Admin.
        if request.user.role == "admin":
            return True
        # Instance must have the same id because the user is updating his info.
        return obj.id == request.user.id

# permissions.py
from rest_framework.permissions import BasePermission

class IsAdminOrManager(BasePermission):
    """
    Allows access only to users with the role 'admin' or 'manager'.
    """
    def has_permission(self, request, view):
        # Ensure the user is authenticated
        if not request.user.is_authenticated:
            return False
        return request.user.role in ['admin', 'manager']

class IsAdmin(BasePermission):
    """
    Allows access only to users with the role 'admin'.
    """
    def has_permission(self, request, view):
        # Ensure the user is authenticated
        if not request.user.is_authenticated:
            return False
        return request.user.role == 'admin'

class IsEmployee(BasePermission):
    """
    Allows access only to users with the role 'employee'.
    """
    def has_permission(self, request, view):
        # Ensure the user is authenticated
        if not request.user.is_authenticated:
            return False
        return request.user.role == 'employee'

class IsOwnerOrAdmin(BasePermission):
    """
    Allows access only to the owner of the resource or an admin.
    """
    def has_object_permission(self, request, view, obj):
        # Ensure the user is authenticated
        if not request.user.is_authenticated:
            return False
        return obj == request.user or request.user.role == 'admin'