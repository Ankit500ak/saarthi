from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from .models import Internship  # Import the Internship model

def internships_api(request):
    if request.method == 'GET':
        # Fetch internships from the database
        internships = list(Internship.objects.values(
            "title",
            "department",
            "location",
            "duration",
            "stipend",
            "skills",
            "featured",
        ))

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
