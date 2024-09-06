from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, NonProfitOrganizationViewSet, VolunteerViewSet, DonationViewSet, ProjectViewSet, EventViewSet, VolunteerApplicationViewSet, RegistrationViewSet, ResourceViewSet, ResourceAllocationViewSet

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'organizations', NonProfitOrganizationViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'events', EventViewSet)
router.register(r'applications', VolunteerApplicationViewSet)
router.register(r'registrations', RegistrationViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'allocations', ResourceAllocationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
