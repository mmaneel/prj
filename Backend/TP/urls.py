from django.contrib import admin
from django.urls import path,include
from django.conf import settings #to configure with settings to work with images 
from django.conf.urls.static import static
from Annonces.views import *
from rest_framework import routers
route = routers.DefaultRouter()
from django.urls import path, include

#create an instance of route then register the router
'''
route.register('/annonces',AnnonceView,basename='Annonceview')
route.register('/localisation',localisationView,basename='localisationview')
route.register('/contact',contactView,basename='contactview')
route.register('/image',imageView,basename='imageview')
'''
urlpatterns = [
    path('admin/', admin.site.urls),# "root to go to admin directory"
    #path('api',include(route.urls)),
     path('api/',include('Annonces.urls')),
    path('accounts/', include('allauth.urls')),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
