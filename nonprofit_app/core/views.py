from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .models import Profile, NonProfitOrganization, Volunteer, Donation, Project, Event, VolunteerApplication, Registration, Resource, ResourceAllocation
from .serializers import ProfileSerializer, NonProfitOrganizationSerializer, VolunteerSerializer, DonationSerializer, ProjectSerializer, EventSerializer, VolunteerApplicationSerializer, RegistrationSerializer, ResourceSerializer, ResourceAllocationSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
# from .models import Volunteer
# from .serializers import VolunteerSerializer
from .tasks import send_event_reminder_email

@api_view(['POST'])
def register_volunteer(request):
    # Extract user-related fields from the request data
    name = request.data.get('name')  # This can be the full name, we'll split it
    email = request.data.get('email')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    skills = request.data.get('skills')
    availability = request.data.get('availability')
    preferred_projects = request.data.get('preferred_projects')

    # Create a new User object with first and last name
    try:
        user = User.objects.create(
            username=name,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
    except Exception as e:
        return Response({'error': 'User creation failed', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Now create the volunteer associated with the user
    volunteer_data = {
        'user': user.id,  # Pass the newly created user's ID
        'skills': skills,
        'availability': availability,
        'preferred_projects': preferred_projects,
    }

    serializer = VolunteerSerializer(data=volunteer_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Profile ViewSet
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

# NonProfitOrganization ViewSet
class NonProfitOrganizationViewSet(viewsets.ModelViewSet):
    queryset = NonProfitOrganization.objects.all()
    serializer_class = NonProfitOrganizationSerializer

# Volunteer ViewSet
class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

# Donation ViewSet
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

# Project ViewSet
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Event ViewSet
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    #schedule email 2 days before
    @action(detail=True, methods=['post'])
    def register(self, request, pk=None):
        user = request.user  # Get the logged-in user
        event = self.get_object()  # Get the event instance

        if Registration.objects.filter(user=user, event=event).exists():
            return Response({"detail": "Already registered for this event."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the registration
        registration = Registration.objects.create(user=user, event=event)

        # Schedule an email to be sent 2 days before the event
        email_time = event.start_time - timedelta(days=2)  # 2 days before event
        send_event_reminder_email.schedule(email_time, user.email, event.name, event.start_time)

        return Response({"detail": "Successfully registered for the event."}, status=status.HTTP_201_CREATED)

# VolunteerApplication ViewSet
class VolunteerApplicationViewSet(viewsets.ModelViewSet):
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer

# Registration ViewSet
class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

# Resource ViewSet
class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

# ResourceAllocation ViewSet
class ResourceAllocationViewSet(viewsets.ModelViewSet):
    queryset = ResourceAllocation.objects.all()
    serializer_class = ResourceAllocationSerializer

# # VolunteerOpportunity View
# class VolunteerOpportunityViewSet(viewsets.ModelViewSet):
#     queryset = VolunteerOpportunity.objects.all()
#     serializer_class = VolunteerOpportunitySerializer