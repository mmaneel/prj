from django.db import models
import datetime
from django.utils.translation import gettext_lazy as _


# Create your models here
# class are tables and atributes are atributes in dababase.


class annonces(models.Model):
   id =models.AutoField(primary_key=True)
   titre= models.CharField(max_length=255)  
   date = models.DateField(_("Date"), default=datetime.date.today)
   surface=models.FloatField(null=False,blank=False)
   description = models.TextField()
   prix = models.DecimalField(max_digits=10,decimal_places=2,null=False,blank=False)
   localisation= models.OneToOneField("localisation",blank=False,null=True,on_delete=models.SET_NULL,unique=True)
   contact = models.ForeignKey("contact",blank=False,null=True,on_delete=models.SET_NULL)
   categorie= models.CharField(max_length=255,null=False,blank=False)
   type= models.CharField(max_length=255,null=False,blank=False)
   imageprincip= models.ImageField(upload_to='uploads/images')
   def __str__(self) :
        return str(self.id)
   

class images(models.Model):
     id_annonce = models.ForeignKey("annonces",blank=False,null=True,on_delete=models.SET_NULL)
     image = models.ImageField(upload_to='uploads/images')
  
  #  numero_telephone=models.

#class message(models.Model):
  #  messange=models.CharField(max_length=255)
    #id_annonce

#class type_annonce(models.Model):

class categorie_annonce(models.Model):
       categorie=models.CharField(max_length=255)

class type_annonce(models.Model):
       type=models.CharField(max_length=255)


class localisation(models.Model):
    wilaya=models.CharField(max_length=255)
    commune=models.CharField(max_length=255)
    adresse=models.CharField(max_length=255)



class contact(models.Model):
    email=models.EmailField(unique=True)
    nom=models.CharField(max_length=255,null=False,blank=False)
    prenom=models.CharField(max_length=255,null=False,blank=False)
    adresse=models.CharField(max_length=255,null=False,blank=False)
    numero_telephone=models.CharField(max_length=255,null=False,blank=False)

class commune(models.Model):
  commune=models.CharField(max_length=255,null=False,blank=False)
  wilaya=models.ForeignKey("wilaya",blank=False,null=True,on_delete=models.SET_NULL)


class wilaya(models.Model):
  wilaya=models.CharField(max_length=255,null=False,blank=False)

class Message(models.Model):
    text =models.TextField()
    contact=models.ForeignKey(contact  ,blank=True,null=True,on_delete=models.SET_NULL)
    annonces = models.ForeignKey("annonces",blank=False,null=True,on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)