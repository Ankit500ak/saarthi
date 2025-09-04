from django.urls import path
from .views import StudentListCreateView, InternshipListCreateView, RecommendInternshipView

urlpatterns = [
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('internships/', InternshipListCreateView.as_view(), name='internship-list-create'),
    path('recommend/<int:student_id>/', RecommendInternshipView.as_view(), name='recommend-internship'),
]
