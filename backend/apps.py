from django.apps import AppConfig


class EmployeesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'employees'

class LocationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'location'

class AvatarConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'avatar'
