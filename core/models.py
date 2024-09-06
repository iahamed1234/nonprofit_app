from django.db import models
from django.contrib.auth.models import User

# Profile model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=[('Admin', 'Admin'), ('Volunteer', 'Volunteer'), ('Donor', 'Donor')])
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

# NonProfitOrganization model
class NonProfitOrganization(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    contact_info = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# Volunteer model
class Volunteer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    skills = models.TextField(blank=True)
    availability = models.CharField(max_length=255)
    preferred_projects = models.TextField(blank=True)

    def __str__(self):
        return self.user.username

# Donation model
class Donation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)
    receipt_number = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.user.username} - {self.amount}"

# Project model
class Project(models.Model):
    organization = models.ForeignKey(NonProfitOrganization, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name

# Event model
class Event(models.Model):
    organization = models.ForeignKey(NonProfitOrganization, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.name

# VolunteerApplication model
class VolunteerApplication(models.Model):
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    application_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Accepted', 'Accepted'), ('Rejected', 'Rejected')])

    def __str__(self):
        return f"{self.volunteer.user.username} - {self.project.name}"

# Registration model
class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.event.name}"

# Resource model
class Resource(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    quantity = models.IntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# ResourceAllocation model
class ResourceAllocation(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.resource.name} - {self.quantity}"
