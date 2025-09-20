from django.urls import path
from .views import internships_api

urlpatterns = [
    path('internships', internships_api, name='internships_api'),
]