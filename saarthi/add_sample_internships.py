from recommendations.models import Internship

# Sample internships to add
sample_internships = [
    {
        "title": "Software Development Intern",
        "department": "IT",
        "location": "Remote",
        "duration": "6 months",
        "stipend": "₹15,000/month",
        "skills": ["Python", "Django", "REST API"],
        "featured": True,
    },
    {
        "title": "Data Analyst Intern",
        "department": "Analytics",
        "location": "Delhi",
        "duration": "3 months",
        "stipend": "₹10,000/month",
        "skills": ["Excel", "SQL", "PowerBI"],
        "featured": False,
    },
    {
        "title": "Marketing Intern",
        "department": "Marketing",
        "location": "Mumbai",
        "duration": "2 months",
        "stipend": "₹8,000/month",
        "skills": ["Social Media", "Content Writing", "SEO"],
        "featured": True,
    },
    {
        "title": "Research Intern",
        "department": "R&D",
        "location": "Bangalore",
        "duration": "4 months",
        "stipend": "₹12,000/month",
        "skills": ["Research", "Python", "Statistics"],
        "featured": False,
    },
]

for data in sample_internships:
    Internship.objects.create(**data)
print("Sample internships added.")
