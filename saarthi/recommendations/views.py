from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render

def internships_api(request):
    if request.method == 'GET':
        internships = [
            {
                "title": "Software Engineer Intern",
                "department": "Engineering",
                "location": "Remote",
                "duration": "3 months",
                "stipend": "$1000/month",
                "skills": ["JavaScript", "React", "Node.js"],
                "featured": True,
            },
            {
                "title": "Data Analyst Intern",
                "department": "Data Science",
                "location": "New York, NY",
                "duration": "6 months",
                "stipend": "$1200/month",
                "skills": ["Python", "SQL", "Tableau"],
                "featured": False,
            },
            # Add more internships here for testing
        ]

        # Pagination
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 10))
        paginator = Paginator(internships, page_size)

        try:
            internships_page = paginator.page(page)
        except:
            return JsonResponse({"error": "Invalid page number"}, status=400)

        return JsonResponse({
            "internships": list(internships_page),
            "total": paginator.count,
            "page": page,
            "page_size": page_size,
            "has_next": internships_page.has_next(),
        })
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

# Create your views here.
