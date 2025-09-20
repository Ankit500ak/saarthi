import csv
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

class InternshipMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path == '/api/internships/':
            internships = []
            try:
                with open('internship.csv', mode='r') as file:
                    reader = csv.DictReader(file)
                    for row in reader:
                        internships.append(row)
                return JsonResponse({'internships': internships}, status=200)
            except FileNotFoundError:
                return JsonResponse({'error': 'internship.csv not found'}, status=404)
        return None