FROM python:3.10-alpine3.16
# Install dependencies
RUN apk --no-cache add curl gnupg

# Download the desired package(s)
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/msodbcsql17_17.6.1.1-1_amd64.apk
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/mssql-tools_17.6.1.1-1_amd64.apk


# (Optional) Verify signature, if 'gpg' is missing install it using 'apk add gnupg':
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/msodbcsql17_17.6.1.1-1_amd64.sig
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/mssql-tools_17.6.1.1-1_amd64.sig

RUN curl https://packages.microsoft.com/keys/microsoft.asc  | gpg --import -
RUN gpg --verify msodbcsql17_17.6.1.1-1_amd64.sig msodbcsql17_17.6.1.1-1_amd64.apk
RUN gpg --verify mssql-tools_17.6.1.1-1_amd64.sig mssql-tools_17.6.1.1-1_amd64.apk


# Install the package(s)
RUN apk add --allow-untrusted msodbcsql17_17.6.1.1-1_amd64.apk
RUN apk add --allow-untrusted mssql-tools_17.6.1.1-1_amd64.apk

ENV PYTHONUNBUFFERED 1

RUN apk update \
     && apk add gcc libc-dev g++ libffi-dev libxml2 unixodbc-dev mariadb-dev postgresql-dev python3-dev musl-dev
RUN pip install --upgrade pip pipenv

WORKDIR /api
COPY Pipfile .

RUN pipenv lock
RUN pipenv install -v


COPY . .

COPY make-migrations /usr/local/bin/make-migrations
RUN chmod +x /usr/local/bin/make-migrations

# Instalar librerías para conexión SQL SERVER
RUN apk add --allow-untrusted mssql_odbc/msodbcsql17_17.10.1.1-1_amd64.apk
RUN apk add --allow-untrusted mssql_odbc/mssql-tools_17.10.1.1-1_amd64.apk

# Agregar certificado SSL para conexión con eritea.es


ENTRYPOINT ["make-migrations"]

#ENTRYPOINT ["pipenv", "run", "python", "manage.py",  "runserver", "0.0.0.0:8000"]
