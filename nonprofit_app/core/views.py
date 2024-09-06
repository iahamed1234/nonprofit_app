from django.shortcuts import render
from rest_framework import viewsets
from .models import Profile, NonProfitOrganization, Volunteer, Donation, Project, Event, VolunteerApplication, Registration, Resource, ResourceAllocation
from .serializers import ProfileSerializer, NonProfitOrganizationSerializer, VolunteerSerializer, DonationSerializer, ProjectSerializer, EventSerializer, VolunteerApplicationSerializer, RegistrationSerializer, ResourceSerializer, ResourceAllocationSerializer

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

