
from django.urls import path,include
from . import views
from django.http import HttpRequest
from .views import *

request=HttpRequest


urlpatterns = [
    path('showAllannonces', views.showAllannonces, name='show-all'),
    path('showtypes', views.Annoncescontroller.types, name='show-all'),
    path('getannonceimages/<slug:pk>', views.getannonceimages, name='show-all'),
    path('filtrer', views.filter, name='filtrer'),


    path('deleteannonce/<slug:pk>', views.deleteannonce, name='deleteannonces'),
    path('consulterMesannonces/<slug:id_contact>', views.Consult_Annonces_Depose, name='consultmesannonces'),    
    path('wilayas', views.Annoncescontroller.wilayas, name='wilayas'),


    path('deposerannonce/<slug:id_contact>', views.Annoncescontroller.deposerAnnonce, name='add-annonce'),
    path('addcontact', views.addcontact, name='add-contact'),
    path('addimage', views.addimage, name='add-image'),
    path('search', views.search_annonce, name='search'),

    path('communes/<slug:slug>',views.Annoncescontroller.communes,name='details'),

    path('<slug:slug>',views.details,name='details'),

]
