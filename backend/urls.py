from rest_framework import routers
from .api import *
from . import views

router = routers.DefaultRouter()

router.register('api/locate', LocateViewSet, 'locate')
router.register('api/people', PeopleDetailViewSet)

urlpatterns = router.urls
