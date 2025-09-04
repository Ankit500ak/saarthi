from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Student, Internship, Skill, Interest
from .serializers import StudentSerializer, InternshipSerializer
from django.db.models import Q

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class InternshipListCreateView(generics.ListCreateAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

class RecommendInternshipView(APIView):
    def post(self, request, student_id):
        try:
            student = Student.objects.get(pk=student_id)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

        internships = Internship.objects.all()
        recommendations = []
        for internship in internships:
            score = 0
            # Education match (simple contains)
            if student.education.lower() in internship.sector.lower():
                score += 2
            # Location match
            if student.location.lower() == internship.location.lower():
                score += 2
            # Skills match
            skill_matches = internship.required_skills.filter(id__in=student.skills.values_list('id', flat=True)).count()
            score += skill_matches
            # Interests match
            interest_matches = student.interests.filter(name__icontains=internship.sector).count()
            score += interest_matches
            recommendations.append((score, internship))
        recommendations.sort(reverse=True, key=lambda x: x[0])
        top_internships = [i for s, i in recommendations if s > 0][:5]
        serializer = InternshipSerializer(top_internships, many=True)
        return Response(serializer.data)
