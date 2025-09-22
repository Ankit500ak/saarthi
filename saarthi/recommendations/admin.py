
from django.contrib import admin
from .models import Internship

@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
	list_display = ("title", "department", "location", "duration", "stipend", "featured")
	search_fields = ("title", "department", "location")
	list_filter = ("department", "featured")
