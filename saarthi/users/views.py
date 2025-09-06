
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest
import json

# Create your views here.


@csrf_exempt
def register(request):
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Origin"] = "*"
		response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return response
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			username = data.get('username')
			password = data.get('password')
			email = data.get('email')
			if not username or not password:
				return JsonResponse({'error': 'Username and password required.'}, status=400)
			if User.objects.filter(username=username).exists():
				return JsonResponse({'error': 'Username already exists.'}, status=400)
			user = User.objects.create_user(username=username, password=password, email=email)
			user.save()
			# Auto-login after registration
			user = authenticate(request, username=username, password=password)
			if user is not None:
				auth_login(request, user)
				response = JsonResponse({'redirect': '/dashboard'})
				response["Access-Control-Allow-Origin"] = "*"
				return response
			else:
				return JsonResponse({'error': 'Authentication failed after registration.'}, status=400)
		except Exception as e:
			return JsonResponse({'error': str(e)}, status=400)
	return HttpResponseBadRequest('Only POST allowed')

@csrf_exempt
def login_view(request):
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Origin"] = "*"
		response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return response
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			username = data.get('username')
			password = data.get('password')
			user = authenticate(request, username=username, password=password)
			if user is not None:
				auth_login(request, user)
				response = JsonResponse({'redirect': '/dashboard'})
				response["Access-Control-Allow-Origin"] = "*"
				return response
			else:
				return JsonResponse({'error': 'Invalid credentials.'}, status=400)
		except Exception as e:
			return JsonResponse({'error': str(e)}, status=400)
	return HttpResponseBadRequest('Only POST allowed')
