from rest_framework import serializers
from .models import (
    Profile, NonProfitOrganization, Volunteer, Donation, 
    Project, Event, VolunteerApplication, Registration, 
    Resource, ResourceAllocation, VolunteerOpportunity
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

# New Volunteer Serializer to display volunteer name
class VolunteerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Volunteer
        fields = '__all__'

    # Override to_representation to include user details
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Add user details to the representation
        representation['username'] = instance.user.username
        representation['first_name'] = instance.user.first_name
        representation['last_name'] = instance.user.last_name
        representation['email'] = instance.user.email
        return representation


# Donation Serializer
class DonationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Donation
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Add the user's email to the representation
        representation['user_email'] = instance.user.email
        return representation

class ProjectSerializer(serializers.ModelSerializer):
    organization = serializers.PrimaryKeyRelatedField(queryset=NonProfitOrganization.objects.all())  # Accepts organization ID

    class Meta:
        model = Project
        fields = '__all__'

# Event Serializer
class EventSerializer(serializers.ModelSerializer):
    organization = serializers.PrimaryKeyRelatedField(queryset=NonProfitOrganization.objects.all())  # Accepts organization ID

    class Meta:
        model = Event
        fields = '__all__'

# VolunteerApplication Serializer
class VolunteerApplicationSerializer(serializers.ModelSerializer):
    volunteer = serializers.PrimaryKeyRelatedField(queryset=Volunteer.objects.all())  # Accepts volunteer ID
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())  # Accepts project ID

    class Meta:
        model = VolunteerApplication
        fields = '__all__'

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

# ResourceAllocation Serializer
class ResourceAllocationSerializer(serializers.ModelSerializer):
    resource = serializers.PrimaryKeyRelatedField(queryset=Resource.objects.all())  # Accepts resource ID
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), allow_null=True, required=False)  # Accepts project ID
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), allow_null=True, required=False)  # Accepts event ID

    class Meta:
        model = ResourceAllocation
        fields = '__all__'
        
    def validate(self, data):
        if not data.get('project') and not data.get('event'):
            raise serializers.ValidationError("Either 'project' or 'event' must be provided.")
        return data
    
# VolunteerOpportunity Serializer
class VolunteerOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerOpportunity
        fields = '__all__'