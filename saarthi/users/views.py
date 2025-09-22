
import requests
import random
import json
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponseBadRequest
from .models import UserProfile, EmailOTP

@csrf_exempt
def send_otp(request):
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return _set_cors_headers(response, request)
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			email = data.get('email')
			if not email:
				response = JsonResponse({'error': 'Email required'}, status=400)
				return _set_cors_headers(response, request)
			user = User.objects.filter(email=email).first()
			if not user:
				response = JsonResponse({'error': 'User not found'}, status=404)
				return _set_cors_headers(response, request)
			otp = f"{random.randint(100000, 999999)}"
			EmailOTP.objects.filter(user=user, email=email).delete()  # Remove old OTPs
			EmailOTP.objects.create(user=user, email=email, otp=otp)
			# Use Django's built-in email service
			subject = "Saarthi Email Verification OTP"
			message = f"Hello,\n\nYour OTP code for Saarthi verification is: {otp}\n\nIf you did not request this, please ignore this email.\n\nThanks,\nSaarthi Team"
			html_message = f"""
			<div style='font-family: Arial, sans-serif; background: #f9fafb; padding: 32px;'>
				<div style='max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px;'>
					<h2 style='color: #2563eb; text-align: center; margin-bottom: 24px;'>Saarthi Email Verification</h2>
					<p style='font-size: 16px; color: #222; text-align: center;'>
						Hello,<br><br>
						<b>Your OTP code for Saarthi verification is:</b>
					</p>
					<div style='font-size: 32px; font-weight: bold; color: #16a34a; text-align: center; letter-spacing: 8px; margin: 24px 0 32px 0;'>{otp}</div>
					<p style='font-size: 15px; color: #555; text-align: center;'>
						If you did not request this, please ignore this email.<br><br>
						<span style='color: #2563eb;'>Thanks,<br>Saarthi Team</span>
					</p>
				</div>
			</div>
			"""
			from django.conf import settings
			try:
				send_mail(
					subject,
					message,
					settings.DEFAULT_FROM_EMAIL,
					[email],
					fail_silently=False,
					html_message=html_message
				)
				print('message sent')
			except Exception as e:
				response = JsonResponse({'error': f'Failed to send OTP email: {str(e)}'}, status=500)
				return _set_cors_headers(response, request)
			response = JsonResponse({'success': True, 'message': 'OTP sent'})
			return _set_cors_headers(response, request)
		except Exception as e:
			response = JsonResponse({'error': str(e)}, status=400)
			return _set_cors_headers(response, request)
	return HttpResponseBadRequest('Only POST allowed')

@csrf_exempt
def verify_otp(request):
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return _set_cors_headers(response, request)
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			email = data.get('email')
			otp = data.get('otp')
			if not email or not otp:
				response = JsonResponse({'error': 'Email and OTP required'}, status=400)
				return _set_cors_headers(response, request)
			otp_obj = EmailOTP.objects.filter(email=email, otp=otp, is_verified=False).first()
			if not otp_obj:
				response = JsonResponse({'error': 'Invalid OTP'}, status=400)
				return _set_cors_headers(response, request)
			if otp_obj.is_expired():
				otp_obj.delete()
				response = JsonResponse({'error': 'OTP expired'}, status=400)
				return _set_cors_headers(response, request)
			otp_obj.is_verified = True
			otp_obj.save()
			response = JsonResponse({'success': True, 'message': 'OTP verified'})
			return _set_cors_headers(response, request)
		except Exception as e:
			response = JsonResponse({'error': str(e)}, status=400)
			return _set_cors_headers(response, request)
	return HttpResponseBadRequest('Only POST allowed')


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
					'redirect': '/profile-setup',
					'is_first_time': True,
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
	profile = getattr(user, 'profile', None)
	
	payload = {
		'authenticated': True,
		'id': user.id,
		'username': user.username,
		'email': user.email,
		'first_name': user.first_name,
		'last_name': user.last_name,
	}
	
	if profile:
		payload.update({
			'phone': profile.phone,
			'date_of_birth': profile.date_of_birth.isoformat() if profile.date_of_birth else None,
			'gender': profile.gender,
			'college_name': profile.college_name,
			'degree': profile.degree,
			'branch': profile.branch,
			'year_of_study': profile.year_of_study,
			'cgpa': profile.cgpa,
			'graduation_year': profile.graduation_year,
			'city': profile.city,
			'state': profile.state,
			'country': profile.country,
			'bio': profile.bio,
			'skills': profile.skills,
			'github': profile.github,
			'linkedin': profile.linkedin,
			'portfolio': profile.portfolio,
			'is_profile_complete': profile.is_profile_complete,
			'profile_picture': profile.profile_picture.url if profile.profile_picture else None,
		})
	
	response = JsonResponse(payload)
	return _set_cors_headers(response, request)


@csrf_exempt
def update_profile(request):
	"""Update user profile information."""
	if request.method == 'OPTIONS':
		response = JsonResponse({'detail': 'CORS preflight'})
		response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		response["Access-Control-Allow-Headers"] = "Content-Type"
		return _set_cors_headers(response, request)

	if request.method != 'POST':
		return HttpResponseBadRequest('Only POST allowed')

	if not request.user.is_authenticated:
		response = JsonResponse({'error': 'Authentication required'}, status=401)
		return _set_cors_headers(response, request)

	try:
		user = request.user
		profile, created = UserProfile.objects.get_or_create(user=user)
		
		# Update User model fields
		if 'firstName' in request.POST and request.POST['firstName']:
			user.first_name = request.POST['firstName']
		if 'lastName' in request.POST and request.POST['lastName']:
			user.last_name = request.POST['lastName']
		user.save()
		
		# Update UserProfile fields
		profile_fields = [
			'phone', 'date_of_birth', 'gender', 'college_name', 'degree', 
			'branch', 'year_of_study', 'cgpa', 'graduation_year', 'city', 
			'state', 'country', 'bio', 'skills', 'github', 'linkedin', 'portfolio'
		]
		
		for field in profile_fields:
			if field in request.POST and request.POST[field]:
				# Handle special cases
				if field == 'graduation_year':
					try:
						setattr(profile, field, int(request.POST[field]))
					except ValueError:
						pass
				elif field == 'date_of_birth':
					try:
						from datetime import datetime
						date_obj = datetime.strptime(request.POST[field], '%Y-%m-%d').date()
						setattr(profile, field, date_obj)
					except ValueError:
						pass
				else:
					setattr(profile, field, request.POST[field])
		
		# Handle profile picture
		if 'profilePicture' in request.FILES:
			profile.profile_picture = request.FILES['profilePicture']
		
		# Check if profile is complete
		required_fields = ['college_name', 'degree', 'branch', 'city', 'state']
		is_complete = all(getattr(profile, field) for field in required_fields)
		profile.is_profile_complete = is_complete
		
		profile.save()
		
		payload = {
			'success': True,
			'message': 'Profile updated successfully',
			'is_profile_complete': profile.is_profile_complete
		}
		response = JsonResponse(payload)
		return _set_cors_headers(response, request)
		
	except Exception as e:
		payload = {'error': str(e)}
		response = JsonResponse(payload, status=400)
		return _set_cors_headers(response, request)

@csrf_exempt
def logout_view(request):
    if request.method == 'OPTIONS':
        response = JsonResponse({'detail': 'CORS preflight'})
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return _set_cors_headers(response, request)

    if request.method != 'POST':
        return HttpResponseBadRequest('Only POST allowed')

    if not request.user.is_authenticated:
        response = JsonResponse({'error': 'User is not authenticated'}, status=401)
        return _set_cors_headers(response, request)

    auth_logout(request)
    response = JsonResponse({'success': True, 'message': 'Logged out successfully'})
    return _set_cors_headers(response, request)
