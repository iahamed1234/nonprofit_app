from background_task import background
from django.core.mail import send_mail
from django.conf import settings
from datetime import timedelta
from django.utils import timezone

@background(schedule=60)  # Default schedule is 60 seconds later
def send_event_reminder_email(user_email, event_name, event_start_time):
    subject = f"Reminder: Upcoming Event '{event_name}'"
    message = f"Dear Volunteer,\n\nThis is a reminder that the event '{event_name}' will be held on {event_start_time}. We look forward to seeing you there!"
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user_email])