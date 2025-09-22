
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings

class Command(BaseCommand):
    help = 'Send a test email using Django SMTP backend.'

    def handle(self, *args, **kwargs):
        to_email = "ankit200211222@gmail.com"
        subject = "Hello Admin"
        message = "hello admin"
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [to_email],
                fail_silently=False,
            )
            self.stdout.write(self.style.SUCCESS('Test email sent successfully to ankit200211222@gmail.com!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to send test email: {e}'))
