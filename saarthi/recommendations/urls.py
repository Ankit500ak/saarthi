from django.urls import path
from .views import internships_api, recommend_api

urlpatterns = [
    path('internships', internships_api, name='internships_api'),
    path('recommend/', recommend_api, name='recommend_api'),
]