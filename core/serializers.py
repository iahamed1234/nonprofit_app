from rest_framework import serializers
from .models import (
    Profile, NonProfitOrganization, Volunteer, Donation, 
    Project, Event, VolunteerApplication, Registration, 
    Resource, ResourceAllocation
)
from django.contrib.auth.models import User

# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

# NonProfitOrganization Serializer
class NonProfitOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonProfitOrganization
        fields = '__all__'

# # Volunteer Serializer
# class VolunteerSerializer(serializers.ModelSerializer):
#     user = ProfileSerializer()  # Nested serializer to include user details

#     class Meta:
#         model = Volunteer
#         fields = '__all__'

# Volunteer Serializer
class VolunteerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Accepts user ID instead of a nested object

    class Meta:
        model = Volunteer
        fields = '__all__'


# # Donation Serializer
# class DonationSerializer(serializers.ModelSerializer):
#     user = ProfileSerializer()  # Nested serializer to include user details

#     class Meta:
#         model = Donation
#         fields = '__all__'

# Donation Serializer
class DonationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Accepts user ID instead of a nested object

    class Meta:
        model = Donation
        fields = '__all__'


# Project Serializer
class ProjectSerializer(serializers.ModelSerializer):
    organization = NonProfitOrganizationSerializer()  # Nested serializer to include organization details

    class Meta:
        model = Project
        fields = '__all__'

# Event Serializer
class EventSerializer(serializers.ModelSerializer):
    organization = NonProfitOrganizationSerializer()  # Nested serializer to include organization details

    class Meta:
        model = Event
        fields = '__all__'

# # VolunteerApplication Serializer
# class VolunteerApplicationSerializer(serializers.ModelSerializer):
#     volunteer = VolunteerSerializer()  # Nested serializer to include volunteer details
#     project = ProjectSerializer()  # Nested serializer to include project details

#     class Meta:
#         model = VolunteerApplication
#         fields = '__all__'

# VolunteerApplication Serializer
class VolunteerApplicationSerializer(serializers.ModelSerializer):
    volunteer = serializers.PrimaryKeyRelatedField(queryset=Volunteer.objects.all())  # Accepts volunteer ID
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())  # Accepts project ID

    class Meta:
        model = VolunteerApplication
        fields = '__all__'


# # Registration Serializer
# class RegistrationSerializer(serializers.ModelSerializer):
#     event = EventSerializer()  # Nested serializer to include event details
#     user = ProfileSerializer()  # Nested serializer to include user details

#     class Meta:
#         model = Registration
#         fields = '__all__'

# Registration Serializer
class RegistrationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Accepts user ID
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())  # Accepts event ID

    class Meta:
        model = Registration
        fields = '__all__'


# Resource Serializer
class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'

# # ResourceAllocation Serializer
# class ResourceAllocationSerializer(serializers.ModelSerializer):
#     resource = ResourceSerializer()  # Nested serializer to include resource details
#     project = ProjectSerializer()  # Nested serializer to include project details
#     event = EventSerializer()  # Nested serializer to include event details 

#     class Meta:
#         model = ResourceAllocation
#         fields = '__all__'

# ResourceAllocation Serializer
class ResourceAllocationSerializer(serializers.ModelSerializer):
    resource = serializers.PrimaryKeyRelatedField(queryset=Resource.objects.all())  # Accepts resource ID
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), allow_null=True)  # Accepts project ID
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), allow_null=True)  # Accepts event ID

    class Meta:
        model = ResourceAllocation
        fields = '__all__'
