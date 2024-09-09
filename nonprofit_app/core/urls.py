from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, NonProfitOrganizationViewSet, VolunteerViewSet, DonationViewSet, ProjectViewSet, EventViewSet, VolunteerApplicationViewSet, RegistrationViewSet, ResourceViewSet, ResourceAllocationViewSet, ChatMessageViewSet
from .views import register_volunteer, get_skills, get_volunteers_by_skills, send_event_email, get_chat_messages, clear_chat

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
router.register(r'chat-messages', ChatMessageViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('volunteers/register/', register_volunteer, name='register_volunteer'),
    path('api/skills/', get_skills, name='get_skills'),
    path('api/volunteers/by-skills/', get_volunteers_by_skills, name='get_volunteers_by_skills'),
    path('api/send-email/', send_event_email, name='send_event_email'),
    path('api/projects/<int:project_id>/chat-messages/', get_chat_messages, name='get_chat_messages'),
    path('api/projects/<int:project_id>/clear-chat/', clear_chat, name='clear_chat'),
]
