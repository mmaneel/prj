from django import forms
from .models import *
class SendMessForm (forms.ModelForm):
    class Meta :
        model = Message
        fields = '__all__'

