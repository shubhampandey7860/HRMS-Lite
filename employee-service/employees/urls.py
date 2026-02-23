from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet
from .auth_views import signup, login

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('api/auth/signup/', signup, name='signup'),
    path('api/auth/login/', login, name='login'),
    path('api/', include(router.urls)),
]
