from selenium import webdriver
from django.test import Client
import unittest
import json

class DeposerAnnonceTest(unittest.TestCase):
    def setUp(self):
        self.client = Client()
        self.url = "/api/deposerannonce/{}/".format(id_contact)
        self.data = {
            "type": "appartement",
            "wilaya": "Alger",
            "commune": "Bab El Oued",
            "titre": "Beautiful Apartment in Bab El Oued",
            "description": "This apartment is located in the heart of Bab El Oued and offers stunning views of the city.",
            "categorie": "Location",
            "adresse": "2, Rue des Frères Bouadou, Bab El Oued",
            "prix": "500",
            "surface": "100",
            "imageprincipale": "image.jpg"
        }
        
    def test_deposer_annonce(self):
        response = self.client.post(self.url, data=self.data, content_type="multipart/form-data")
        self.assertEqual(response.status_code, 201)
        annonce = json.loads(response.content)
        self.assertEqual(annonce["titre"], self.data["titre"])
        self.assertEqual(annonce["prix"], self.data["prix"])
        self.assertEqual(annonce["surface"], self.data["surface"])
        self.assertEqual(annonce["localisation"]["wilaya"], self.data["wilaya"])
        self.assertEqual(annonce["localisation"]["commune"], self.data["commune"])
        self.assertEqual(annonce["localisation"]["adresse"], self.data["adresse"])
        self.assertEqual(annonce["type"], self.data["type"])
        self.assertEqual(annonce["categorie"], self.data["categorie"])
        self.assertEqual(annonce["description"], self.data["description"])
        self.assertEqual(annonce["contact"]["id"], id_contact)
        self.assertEqual(annonce["imageprincip"], self.data["imageprincipale"])
        
    def tearDown(self):
        self.client.logout()
    if __name__ == "__test_Selenium__":
      unittest.main()