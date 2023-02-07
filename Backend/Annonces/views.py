from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.db.models import Q
from datetime import datetime
from rest_framework import generics,viewsets
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .forms import *
from django.shortcuts import render,redirect,get_object_or_404
'''
def filter_categorie(request,categorie):
   annoncess=annonces.objects.filter(categorie=categorie).values()
   return render(request,'index.html',{'annonces':annoncess})
'''
class Annoncescontroller(viewsets.ModelViewSet):

#types retourne la liste des types dispo pour choisir
 @api_view(['GET'])
 def types(request):
   type=type_annonce.objects.all() 
   print(type)

   serilizer = typeSerializer(type,many=True)
   print(serilizer)
   return Response(serilizer.data)
#wilayas retourne tous les wilayas dispo utilisé pour choisir une wilaya
 @api_view(['GET'])
 def wilayas(request):
   wilayas=wilaya.objects.all() 
   serilizer = wilayaSerializer(wilayas,many=True)
   print(serilizer)
   return Response(serilizer.data)

 @api_view(['GET'])
 def communes(request,slug):
   wilay=wilaya.objects.get(wilaya=slug).id
   print(wilay)
   communes=commune.objects.filter(wilaya=wilay)
   serilizer = communeSerializer(communes,many=True)
   print(serilizer)
   return Response(serilizer.data)

#deposerannonce permet au contact avec id_contact de deposer une annonce
 @api_view(['POST'])
 def deposerAnnonce(request,id_contact):
   #recuperer les informations de l'annonce (type,wilaya,commune,titre,descr,categorie,adresse,prix,surface,imageprincipale)
   context= request.POST 
   contac=contact.objects.get(id=id_contact)
   type=context.get("type")
   wilaya=context.get("wilaya")
   commune=context.get("commune")
   titre=context.get("titre")
   description=context.get("description")
   categorie=context.get("categorie")
   adresse=context.get("adresse")
   prix=context.get("prix")
   surface=context.get("surface")
   imageprinc=request.FILES.get("imageprincip")
   #creer la localisation 
   localisati =localisation.objects.get_or_create(wilaya=wilaya,commune=commune,adresse=adresse)
   #creer l'annonce si elle n'existe pas 
   annonce= annonces.objects.get_or_create(titre=titre,prix=prix,surface=surface,localisation=localisati[0],type=type,categorie=categorie,description=description,contact=contac,imageprincip=imageprinc)[0]
  
   serilizer = annoncesSerializer(annonce)
   #retourner l'annonce crée
   return Response(serilizer.data)

#le filtrage
@api_view(['POST'])
def filter(request):
#recuperer le type la wilaya la commune et date debut et fin
   print(request.POST)
   context= request.POST
   print(request)
   print(request.POST)

   type=context.get("type")
   wilay=context.get("wilaya")
   commun=context.get("commune")
   date_debut=context.get("date_debut")
   date_fin=context.get("date_fin")

 #le filtrage selon la wilaya et la commune si elles ne sont pas vide
   if wilay is not '' and wilay is not None :
      print("helloo")
      annoncess=filter_by_localisation(request)
      print("helloo")
   else :
      annoncess=annonces.objects.all()
   if type is not '' and type is not None:
   #le filtrage selon le type s'il n'est pas vide
      annoncess=annoncess.filter(type=type)
   #le filtrage selon les dates 
   if date_debut is not '' and date_debut is not None :
      print(date_fin)
  
      if date_fin is None or date_fin is None:
         date_fin=datetime.now().date()
         print(date_fin)
      annoncess=annoncess.filter(date__range=(date_debut,date_fin))
   annoncess=annoncess.order_by('-date').order_by('-id')
   serilizer = annoncesSerializer(annoncess, many=True)
   #retourner les annonces 
   return Response(serilizer.data)

#le filtrage par wilaya et commune utilisé par la filtrage
def filter_by_localisation(request):
   context=request.POST
   wilaya=context.get("wilaya")
   commune=context.get("commune")
   print(wilaya)
   print(commune)
   annoncess=annonces.objects.filter(localisation__wilaya=wilaya)
   print(annoncess)
   if commune is not '':
     annoncess=annoncess.filter(localisation__commune=commune)
   print(annoncess)
   print(type(annoncess))
   return (annoncess)

#details retourne une annonce précis selon l'id
@api_view(['GET'])
def details(request,slug):
   data=annonces.objects.get(pk=slug)  
   serilizer = annoncesSerializer(data, many=False)
   return Response(serilizer.data)


#showAllannonces renvoie tous les annonce dans l'ordre de plus recente au plus ancienne
@api_view(['GET'])
def showAllannonces(request):
     annoncess = annonces.objects.all().order_by('-date').order_by('-id')
     serilizer = annoncesSerializer(annoncess, many=True)
     return Response(serilizer.data)

#consult_Annonces_Depose renvoie tous les annonce de le contact avec id_contact
@api_view(['GET'])
def Consult_Annonces_Depose(request,id_contact):
   data=annonces.objects.filter(contact__id=id_contact)
   serilizer = annoncesSerializer(data, many=True)
   return Response(serilizer.data)

#delete annonce permet d'effacer une annonce selon l'id
@api_view([''])
def deleteannonce(request,id):
 if request.method=='GET':
     annonce = annonces.objects.get(id=id)
     serilizer = annoncesSerializer(annonce, many=False)
     return Response(serilizer.data)
 if request.method=='DELETE':
   serilizer = annoncesSerializer(data=request.data)
   annoncess = annonces.objects.get(id=id)
   annoncess.delete()
   return Response('deleted succesfully')
''''''''''''''''''''''''''''''''''''
class localisationView(viewsets.ModelViewSet):
   queryset=localisation.objects.all()
   serializer_class = localisationSerializer
'''
@api_view(['POST'])
def addlocalisation(request):
    serilizer = annoncesSerializer(data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)
'''
''''''''''''''''''''''''
class contactView(viewsets.ModelViewSet):
   queryset=contact.objects.all()
   serializer_class = contactSerializer

@api_view(['POST'])
def addcontact(request):
    serilizer = contactSerializer(data=request.data)

    return Response(serilizer.data)
''''''''''''''''''''''''''''''''''''''
class imageView(viewsets.ModelViewSet):
   queryset=images.objects.all()
   serializer_class = imageSerializer

@api_view(['POST'])
def addimage(request):
    serilizer = imageSerializer(data=request.data)
    print(serilizer)
    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)


@api_view(['GET'])
def getannonceimages(request, pk):
     print(pk)
     imagess = images.objects.filter(id_annonce_id=pk)
     serilizer = imageSerializer(imagess,many=True)
     return Response(serilizer.data)

#maria's :
@api_view(['POST'])

def search_annonce(request): 
    """ search function  """
    if request.method == "POST":
            query_word = request.POST.get('word', None)
            if query_word:
                result1s = annonces.objects.filter(titre__contains = query_word)
                result2s = annonces.objects.filter(description__contains = query_word)
                results = result1s | result2s
                serializer = annoncesSerializer(results, many=True)
                return Response(serializer.data)
            else :
                results = annonces.objects.all()
                serializer = annoncesSerializer(results, many=True)
                return Response(serializer.data)
    
    
def send_mess(request):
    annonce = get_object_or_404(annonces)
    if request.method == 'POST' : 
        form = SendMessForm ( request.POST  )
        if form.is_valid(): 
            message = form.save(commit=False)
            message.annonces = annonce
            message.save()
            return redirect('post_detail', pk=annonce.pk)
        else: 
            form = SendMessForm()
        return render (request, 'home.html',{'form' : form})