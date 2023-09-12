from rest_framework.authentication import TokenAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import pytz
import datetime
from rest_framework.authtoken.models import Token
from os import environ

DAYS_TOKEN_DELETE = environ.get("DAYS_TOKEN_DELETE")

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self,key):
        try:
            token = Token.objects.get(key=key)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')
        
        if not token.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')
        
        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        if token.created < utc_now - datetime.timedelta(days=int(DAYS_TOKEN_DELETE)):
            raise AuthenticationFailed('Token has expired')
        
        return token.user, token