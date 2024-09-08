from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, NonProfitOrganizationViewSet, VolunteerViewSet, DonationViewSet, ProjectViewSet, EventViewSet, VolunteerApplicationViewSet, RegistrationViewSet, ResourceViewSet, ResourceAllocationViewSet, get_skills, get_volunteers_by_skills, send_event_email
from .views import register_volunteer

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
# router.register(r'opportunities', VolunteerOpportunityViewSet)
# router.register(r'opportunities', ProjectViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('volunteers/register/', register_volunteer, name='register_volunteer'),
    path('api/skills/', get_skills, name='get_skills'),
    path('api/volunteers/by-skills/', get_volunteers_by_skills, name='get_volunteers_by_skills'),
    path('api/send-email/', send_event_email, name='send_event_email'),
]
