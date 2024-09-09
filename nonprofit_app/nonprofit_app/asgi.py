# import os
# import django
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# import core.routing

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nonprofit_app.settings')
# django.setup()

# # Set up the ASGI application
# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             core.routing.websocket_urlpatterns  # Make sure this matches your routing.py
#         )
#     ),
# })
import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nonprofit_app.settings')

# Call django.setup() before importing anything that interacts with Django models
django.setup()

import core.routing  # Moved this after setup

# Set up the ASGI application
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            core.routing.websocket_urlpatterns  # Make sure this matches your routing.py
        )
    ),
})

