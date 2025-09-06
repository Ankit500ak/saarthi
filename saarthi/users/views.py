
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest
import json

# Create your views here.


ALLOWED_FRONTEND_ORIGINS = {"http://localhost:3000"}


def _set_cors_headers(response, request):
	"""Set CORS headers for credentialed requests from allowed origins."""
	origin = request.headers.get("Origin")
	if origin in ALLOWED_FRONTEND_ORIGINS:
		response["Access-Control-Allow-Origin"] = origin
		response["Access-Control-Allow-Credentials"] = "true"
	return response


@csrf_exempt
def register(request):
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return _set_cors_headers(response, request)
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
				payload = {
					'redirect': '/dashboard',
					'user': {
						'id': user.id,
						'username': user.username,
						'email': user.email,
					}
				}
				response = JsonResponse(payload)
				return _set_cors_headers(response, request)
			else:
				return JsonResponse({'error': 'Authentication failed after registration.'}, status=400)
		except Exception as e:
			return JsonResponse({'error': str(e)}, status=400)
	return HttpResponseBadRequest('Only POST allowed')

@csrf_exempt
def login_view(request):
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return _set_cors_headers(response, request)
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			username = data.get('username')
			password = data.get('password')
			user = authenticate(request, username=username, password=password)
			if user is not None:
				auth_login(request, user)
				payload = {
					'redirect': '/dashboard',
					'user': {
						'id': user.id,
						'username': user.username,
						'email': user.email,
					}
				}
				response = JsonResponse(payload)
				return _set_cors_headers(response, request)
			else:
				return JsonResponse({'error': 'Invalid credentials.'}, status=400)
		except Exception as e:
			return JsonResponse({'error': str(e)}, status=400)
	return HttpResponseBadRequest('Only POST allowed')


def me(request):
	"""Return info about the currently authenticated user (session-based)."""
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return _set_cors_headers(response, request)

	if request.method != 'GET':
		return HttpResponseBadRequest('Only GET allowed')

	if not request.user.is_authenticated:
		response = JsonResponse({'authenticated': False}, status=401)
		return _set_cors_headers(response, request)

	user = request.user
	payload = {
		'authenticated': True,
		'id': user.id,
		'username': user.username,
		'email': user.email,
	}
	response = JsonResponse(payload)
	return _set_cors_headers(response, request)
