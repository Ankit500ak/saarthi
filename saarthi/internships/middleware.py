import csv
import logging
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

# Configure logging
logger = logging.getLogger(__name__)

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
                logger.error("internship.csv file not found.")
                return JsonResponse({'error': 'internship.csv not found'}, status=404)
            except Exception as e:
                logger.exception("An error occurred while processing the internships.")
                return JsonResponse({'error': 'Internal server error'}, status=500)
        return None