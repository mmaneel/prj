from django.test import TestCase

# Create your tests here.
from django.test import RequestFactory, Client, TestCase
from .views import search_annonce , send_mess
from .models import annonces,Message
from .forms import SendMessForm
from django.urls import reverse
from serializers import *
class SearchAnnonceTestCase(TestCase): # vérifie que la fonction répond correctement aux demandes POST et GET, que le code de réponse est correct, que le bon modèle est utilisé et que les bonnes données sont présentes dans la réponse
    def setUp(self):
        self.factory = RequestFactory()

    def test_search_annonce_post_request(self):
        request = self.factory.post('/search_annonce/', {'word': 'test'})
        response = search_annonce(request)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'Annonce_search.html')
        self.assertContains(response, 'test')

    def test_search_annonce_get_request(self):
        request = self.factory.get('/search_annonce/')
        response = search_annonce(request)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'Annonce_search.html')



class SendMessTestCase(TestCase):#vérifie que la fonction send_mess envoie un message pour une annonce donnée lors d'une requête POST, stocke le message dans la base de données, et redirige vers la vue post_detail , vérifie également que la fonction renvoie un formulaire vide pour les requêtes GET et utilise le template home.html.

    def setUp(self):
        self.factory = RequestFactory()
        self.annonce = annonces.objects.create(
            titre='Test Annonce',
            description='This is a test description for annonce'
        )

    def test_send_mess_post_request(self):
        request = self.factory.post('/send_mess/{}'.format(self.annonce.pk), {
            'text': 'Test message text',
            'email': 'test@example.com',
            'name': 'Test user',
        })
        response = send_mess(request, self.annonce.pk)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, '/post_detail/{}'.format(self.annonce.pk))
        self.assertEqual(Message.objects.count(), 1)
        self.assertEqual(Message.objects.get().text, 'Test message text')

    def test_send_mess_get_request(self):
        request = self.factory.get('/send_mess/{}'.format(self.annonce.pk))
        response = send_mess(request, self.annonce.pk)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home.html')
        self.assertIsInstance(response.context['form'], SendMessForm)




class DeleteAnnonceTestCase(TestCase):
    def setUp(self):
        # create a client object to make requests to the view
        self.client = Client()
        # create an annonce object to be deleted
        self.annonce = annonces.objects.create(
            title='Test annonce',
            description='Test description',
            # ... other fields ...
        )

    def test_delete_annonce(self):
        # GET request to the view
        response = self.client.get(reverse('deleteannonce', kwargs={'id': self.annonce.id}))
        # check if the response is success
        self.assertEqual(response.status_code, 200)
        # check if the response data is equal to the serialized annonce object
        self.assertEqual(response.data, annoncesSerializer(self.annonce).data)

        # DELETE request to the view
        response = self.client.delete(reverse('deleteannonce', kwargs={'id': self.annonce.id}))
        # check if the response is success
        self.assertEqual(response.status_code, 200)
        # check if the annonce was deleted
        with self.assertRaises(annonces.DoesNotExist):
            annonces.objects.get(id=self.annonce.id)