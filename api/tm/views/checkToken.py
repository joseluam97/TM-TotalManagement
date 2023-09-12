from django.contrib import admin
from django.urls import path
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from tm import varGlobal   
from rest_framework import status
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class checkToken(APIView):
   
    
    def get(self, request):
        token = request.GET.get('token')

        if Token.objects.filter(key=token).exists(): 

            return Response({"content": "Token: OK"})
        else:
        
            return Response("Token not valid", status=status.HTTP_400_BAD_REQUEST)
