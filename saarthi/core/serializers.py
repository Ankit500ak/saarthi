from rest_framework import serializers
from .models import Student, Internship, Skill, Interest

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'name']

class StudentSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    interests = InterestSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'name', 'education', 'skills', 'interests', 'location']

class InternshipSerializer(serializers.ModelSerializer):
    required_skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Internship
        fields = ['id', 'title', 'description', 'required_skills', 'sector', 'location']
