from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Permission
from tm import varGlobal

# Create your models here.

class customUser(AbstractUser):

        rolUserSelect = (
                (varGlobal.rolN1, varGlobal.rolN1),
                (varGlobal.rolN2, varGlobal.rolN2),
                (varGlobal.rolN3, varGlobal.rolN3),
                (varGlobal.rolN4, varGlobal.rolN4),
                (varGlobal.rolN5, varGlobal.rolN5),
                (varGlobal.rolN6, varGlobal.rolN6),
                (varGlobal.rolN7, varGlobal.rolN7),
                (varGlobal.rolN8, varGlobal.rolN8)
        )

        IDidentification = models.CharField(max_length=100, null = True)
        phone = models.CharField(max_length=100, null = True)
        #rolUser = models.CharField(max_length=100, null = False)
        rolUser = models.CharField(choices=rolUserSelect, max_length=100)
        organization = models.CharField(max_length=100, null = True)
        username = None
        email = models.EmailField(('email'), unique=True)
        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = []


class customer(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=200)
        code = models.CharField(max_length=100)
        sitio_web = models.TextField(max_length=300, blank = True, null = True)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "customers"

class locationCustomer(models.Model):
        id = models.AutoField(primary_key=True)
        id_customer = models.ForeignKey(customer, on_delete=models.CASCADE)
        name = models.CharField(max_length=200)
        code = models.CharField(max_length=100)
        direccion = models.TextField(max_length=300, blank = True)
        latitud = models.TextField(max_length=300, blank = True)
        longuitud = models.TextField(max_length=300, blank = True)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "locationCustomers"


class supplierCustomer(models.Model):
        id = models.AutoField(primary_key=True)
        id_location_customer = models.ForeignKey(locationCustomer, on_delete=models.CASCADE)
        name = models.CharField(max_length=200)
        code = models.CharField(max_length=100)
        direccion = models.TextField(max_length=300, blank = True)
        sitio_web = models.TextField(max_length=300, blank = True)
        email = models.EmailField()
        telefono = models.CharField(max_length=100, null = True)
        latitud = models.TextField(max_length=300, blank = True)
        longuitud = models.TextField(max_length=300, blank = True)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "supplierCustomers"

class service(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=200)
        description = models.TextField(blank = True)
        code = models.CharField(max_length=100)
        active = models.BooleanField(default = True)
        locations = models.ManyToManyField(locationCustomer, related_name='locationCustomer', blank=True)
        
        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "services"

class direccionDepartamental(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=200)
        description = models.TextField(blank = True)
        code = models.CharField(max_length=100)
        responsablesDD = models.ManyToManyField(customUser, related_name='customUserDireccionDepartamental', blank=True)
        estandarizador_departamento = models.ForeignKey(customUser, related_name='estandarizadorDepartamento', on_delete=models.CASCADE, blank = True, null = True)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "direccionesDepartamental"

class departamento(models.Model):
        id = models.AutoField(primary_key=True)
        id_direccion_departamental = models.ForeignKey(direccionDepartamental, on_delete=models.CASCADE)
        responsableDepartamento = models.ManyToManyField(customUser, related_name='responsableDepartamento', blank=True)
        name = models.CharField(max_length=200)
        description = models.TextField(blank = True)
        code = models.CharField(max_length=100)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "departamentos"



class workPackage(models.Model):
        id = models.AutoField(primary_key=True)
        id_service = models.ForeignKey(service, on_delete=models.CASCADE)
        responsableWP = models.ManyToManyField(customUser, related_name='responsablesWP', blank=True)
        name = models.CharField(max_length=200)
        description = models.TextField(blank = True)
        code = models.CharField(max_length=100)
        active = models.BooleanField(default = True)


        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "workPackages"


class mision(models.Model):
        id = models.AutoField(primary_key=True)
        id_workPackage = models.ForeignKey(workPackage, on_delete=models.CASCADE)
        name = models.CharField(max_length=200)
        description = models.TextField(blank = True)
        code = models.CharField(max_length=100)
        responsables = models.ManyToManyField(customUser, related_name='customUserMision', blank=True)
        empleados = models.ManyToManyField(customUser, related_name='empleadosMision', blank=True)
        site = models.ManyToManyField(locationCustomer, related_name='siteMision', blank=True)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "misiones"

class subMision(models.Model):
        id = models.AutoField(primary_key=True)
        id_mision = models.ForeignKey(mision, on_delete=models.CASCADE)
        name = models.CharField(max_length=200)
        description = models.TextField(blank = True)
        code = models.CharField(max_length=100)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "subMisiones"


class jobInSubMision(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=200)
        code = models.CharField(max_length=100, blank = True, null = True)
        sub_mision = models.ForeignKey(subMision, on_delete=models.CASCADE, blank = True, null = True)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "jobInSubMisions"
        

class contractuser(models.Model):
        user_id = models.ForeignKey(customUser, related_name='userIdContrato', on_delete=models.CASCADE)
        subMision_id = models.ForeignKey(subMision, related_name='subMisionTeam', on_delete=models.CASCADE)
        rol_employee = models.CharField(max_length=100)
        job = models.ForeignKey(jobInSubMision, on_delete=models.CASCADE, blank = True, null = True)
        
        def __str__(self):
                return f"{self.id} {self.user_id} {self.subMision_id}"

        class Meta:
                  verbose_name_plural = "contractusers"

class aplication(models.Model):

        tipo_valor_campos = (
                ('List', 'List'),
                ('Date', 'Date'),
                ('Number', 'Number'),
        )

        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=200)
        code = models.CharField(max_length=100)
        type = models.CharField(max_length=100)
        responsable_aplication = models.ForeignKey(customUser, related_name='responsable_aplication', on_delete=models.CASCADE)

        #NUEVA ESTRUCTURA
        tiene_valor = models.BooleanField(default = False)
        tipo_valor = models.CharField(choices=tipo_valor_campos, max_length=100, blank=True, null=True)
        #En caso de ser lista
        listado_opciones = models.CharField(max_length=100, blank=True, null=True)
        
        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "aplications"

class aplicationWithRequeriments(models.Model):
        id = models.AutoField(primary_key=True)
        requeriment = models.ForeignKey(aplication, related_name='aplication_requeriments', on_delete=models.CASCADE)

        valor_asignado = models.CharField(max_length=100, blank=True, null=True)
        #En caso de ser numero
        valor_comparacion = models.FloatField(blank=True, null=True)
        operacion_logica = models.IntegerField(blank=True, null=True)
        #En caso de ser date
        diferencia_fecha = models.IntegerField(blank=True, null=True)


        def __str__(self):
                return f"{self.id} {self.requeriment.name}"

        class Meta:
                  verbose_name_plural = "aplicationWithRequeriments"


class groupsRequeriment(models.Model):

        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=200)
        code = models.CharField(max_length=100)
        aplicaciones = models.ManyToManyField(aplicationWithRequeriments, related_name='aplicaciones', blank=True)

        def __str__(self):
                return f"{self.id} {self.name}"

        class Meta:
                  verbose_name_plural = "groupsRequeriments"

class contractApp(models.Model):
        id = models.AutoField(primary_key=True)
        subMision_id = models.ForeignKey(subMision, related_name='subMisionContractApp', on_delete=models.CASCADE)
        aplication_app_id = models.ForeignKey(aplication, related_name='aplication_app_id', on_delete=models.CASCADE)
        job = models.ForeignKey(jobInSubMision, on_delete=models.CASCADE, blank = True, null = True)

        valor_asignado = models.CharField(max_length=100, blank=True, null=True)
        #En caso de ser numero
        valor_comparacion = models.FloatField(blank=True, null=True)
        operacion_logica = models.IntegerField(blank=True, null=True)
        #En caso de ser date
        diferencia_fecha = models.IntegerField(blank=True, null=True)
        
        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "contractApps"

class userApp(models.Model):
        id = models.AutoField(primary_key=True)
        user_id = models.ForeignKey(customUser, related_name='user_id',on_delete=models.CASCADE)
        aplication_user_id = models.ForeignKey(aplication, related_name='aplication_user_id',on_delete=models.CASCADE)

        valor_asignado_fecha = models.DateField(blank=True, null=True)
        valor_asignado = models.CharField(max_length=100, blank=True, null=True)
        #En caso de ser numero
        valor_comparacion = models.FloatField(blank=True, null=True)
        #En caso de ser date
        #DELETE => diferencia_fecha
        diferencia_fecha = models.IntegerField(blank=True, null=True)

        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "userApps"


class misionApp(models.Model):

        type_mision_app = (
                ('Manager', 'Manager'),
                ('Employee', 'Employee'),
        )

        id = models.AutoField(primary_key=True)
        mision_id = models.ForeignKey(mision, related_name='misionContractApp', on_delete=models.CASCADE)
        aplication_app_id = models.ForeignKey(aplication, related_name='misionApp_aplication_app_id', on_delete=models.CASCADE)
        type = models.CharField(choices=type_mision_app, max_length=100)

        valor_asignado = models.CharField(max_length=100, blank=True, null=True)
        #En caso de ser numero
        valor_comparacion = models.FloatField(blank=True, null=True)
        operacion_logica = models.IntegerField(blank=True, null=True)
        #En caso de ser date
        diferencia_fecha = models.IntegerField(blank=True, null=True)
        
        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "misionApps"

class wpApp(models.Model):
        id = models.AutoField(primary_key=True)
        workPackage_id = models.ForeignKey(workPackage, related_name='workPackageContractApp', on_delete=models.CASCADE)
        aplication_app_id = models.ForeignKey(aplication, related_name='wpApp_aplication_app_id', on_delete=models.CASCADE)

        valor_asignado = models.CharField(max_length=100, blank=True, null=True)
        #En caso de ser numero
        valor_comparacion = models.FloatField(blank=True, null=True)
        operacion_logica = models.IntegerField(blank=True, null=True)
        #En caso de ser date
        diferencia_fecha = models.IntegerField(blank=True, null=True)
        
        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "wpApps"

class departamentoApp(models.Model):
        id = models.AutoField(primary_key=True)
        departamento_id = models.ForeignKey(departamento, related_name='departamentoContractApp', on_delete=models.CASCADE)
        aplication_app_id = models.ForeignKey(aplication, related_name='departamentoApp_aplication_app_id', on_delete=models.CASCADE)

        valor_asignado = models.CharField(max_length=100, blank=True, null=True)
        #En caso de ser numero
        valor_comparacion = models.FloatField(blank=True, null=True)
        operacion_logica = models.IntegerField(blank=True, null=True)
        #En caso de ser date
        diferencia_fecha = models.IntegerField(blank=True, null=True)

        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "departamentoApps"

class direccionDepartamentalApp(models.Model):
        id = models.AutoField(primary_key=True)
        direccionDepartamental_id = models.ForeignKey(direccionDepartamental, related_name='direccionDepartamentalContractApp', on_delete=models.CASCADE)
        aplication_app_id = models.ForeignKey(aplication, related_name='direccionDepartamentalApp_aplication_app_id', on_delete=models.CASCADE)

        valor_asignado = models.CharField(max_length=100, blank=True, null=True)
        #En caso de ser numero
        valor_comparacion = models.FloatField(blank=True, null=True)
        operacion_logica = models.IntegerField(blank=True, null=True)
        #En caso de ser date
        diferencia_fecha = models.IntegerField(blank=True, null=True)

        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "direccionDepartamentalApps"

class notifications(models.Model):
        id = models.AutoField(primary_key=True)
        origen_notification_id = models.ForeignKey(customUser, related_name='origen_notification_id', on_delete=models.CASCADE)
        destino_notification_id = models.ForeignKey(customUser, related_name='destino_notification_id', on_delete=models.CASCADE)
        fecha = models.DateField()
        typeNotification = models.CharField(max_length=100)
        observations = models.TextField(blank = True)
        archivo = models.FileField(upload_to='documentacion/%Y/%m/%d', null=True, blank=True)
        active = models.BooleanField(default = True)
        
        def __str__(self):
                return f"{self.id} {self.observations}"

        class Meta:
                  verbose_name_plural = "notifications" 


class requestUser(models.Model):

        estados_solicitud = (
                ('Requested', 'Requested'),
                ('Accepted', 'Accepted'),
                ('Rejected', 'Rejected'),
                ('In study', 'In study'),
                ('Closed', 'Closed'),
        )

        bloques = (
                ('Sub Mision', 'Sub Mision'),
                ('Mision', 'Mision'),
                ('WP', 'WP'),
                ('Departamento', 'Departamento'),
                ('Direccion Departamental', 'Direccion Departamental'),
        )

        id = models.AutoField(primary_key=True)

        user_solicitado = models.ForeignKey(customUser, related_name='user_solicitado_id', on_delete=models.CASCADE, blank = True, null = True)
        user_origen_solicitud = models.ForeignKey(customUser, related_name='user_origen_solicitud_id', on_delete=models.CASCADE, blank = True, null = True)
        user_destino_solicitud = models.ManyToManyField(customUser, related_name='user_destino_solicitud_id', blank = True, null = True)

        fecha_solicitud = models.DateField()
        fecha_entrada = models.DateField()
        fecha_salida = models.DateField()

        bloque_Asignado = models.CharField(choices=bloques, max_length=100, blank = True, null = True)
        id_bloque_asignado = models.CharField(max_length=100, blank = True, null = True)

        observations = models.TextField(blank = True)
        state = models.CharField(choices=estados_solicitud, max_length=100)

        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "requestUsers" 

class role(models.Model):
        id = models.AutoField(primary_key=True)
        role = models.CharField(max_length=100)

        def __str__(self):
                return f"{self.id}"

        class Meta:
                  verbose_name_plural = "roles"    


class categorizacion(models.Model):
        id = models.AutoField(primary_key=True)
        codigo = models.CharField(max_length=100)
        titulo = models.CharField(max_length=200)
        definicion = models.TextField(blank=True, null=True)
        tipo = models.CharField(max_length=100)
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.titulo}"

        class Meta:
                  verbose_name_plural = "categorizaciones"  

class riskManagement(models.Model):
        id = models.AutoField(primary_key=True)
        #site = models.CharField(max_length=100)
        #site = models.ForeignKey(locationCustomer, related_name='siteRisk', on_delete=models.CASCADE)
        title = models.CharField(max_length=100)
        code = models.CharField(max_length=100)
        #manager = models.CharField(max_length=100)
        manager = models.ForeignKey(customUser, related_name='managerRisk', on_delete=models.CASCADE)
        #member = models.CharField(max_length=100)
        member = models.ManyToManyField(customUser, related_name='memberRisk', blank=True)
        active = models.BooleanField(default = True)
        mision = models.ForeignKey(mision, on_delete=models.CASCADE)


        def __str__(self):
                return f"{self.id} {self.title}"

        class Meta:
                  verbose_name_plural = "riskManagement"


class rmRiskOpportunity(models.Model):
        id = models.AutoField(primary_key=True)
        id_risk_management = models.ForeignKey(riskManagement, on_delete=models.CASCADE)
        risk = models.CharField(max_length=500)
        type = models.CharField(max_length=1)
        d_detection = models.DateField()
        glitch_effect = models.CharField(max_length=500)
        cause_failure = models.CharField(max_length=500)
        current_controls = models.CharField(max_length=500)
        gravity = models.CharField(max_length=100)
        idea = models.CharField(max_length=100)
        detection = models.CharField(max_length=100)
        npr = models.CharField(max_length=100)
        priorization = models.CharField(max_length=100)
        observations = models.TextField(blank = True)
        rev = models.IntegerField()
        closed = models.BooleanField(default = False)
        categorizacion = models.ForeignKey(categorizacion, on_delete=models.CASCADE, blank=True, null=True)
        site = models.ManyToManyField(locationCustomer, related_name='siteRisk', blank=True)
        padreRiskOpportunity = models.CharField(max_length=500, blank=True, null=True)
        active = models.BooleanField(default = True)
        
        def __str__(self):
                return f"{self.id} {self.risk}"

        class Meta:
                  verbose_name_plural = "rmRiskOpportunities"


class rmAction(models.Model):
        id = models.AutoField(primary_key=True)
        id_record = models.ForeignKey(rmRiskOpportunity, on_delete=models.CASCADE)
        proposal = models.CharField(max_length=500)
        #manager = models.CharField(max_length=200)
        manager = models.ManyToManyField(customUser, related_name='managerAction', blank=True)
        d_planned = models.DateField()
        d_closed = models.DateField(null=True, blank=True)
        observations = models.TextField(blank=True)
        rev = models.IntegerField()
        completed = models.BooleanField(default = False)


        def __str__(self):
                return f"{self.id} {self.proposal}"

        class Meta:
                  verbose_name_plural = "rmActions"   


class improvement(models.Model):
        id = models.AutoField(primary_key=True)
        titulo = models.CharField(max_length=100)
        subMision = models.ForeignKey(subMision, on_delete=models.CASCADE)
        user_id_principal = models.ForeignKey(customUser, related_name='userIdPrincipal', on_delete=models.CASCADE)
        user_id_secundario = models.ManyToManyField(customUser, related_name='userIdSegundario', blank=True)
        observations = models.TextField(blank=True)
        situacion_actual = models.TextField(blank=True)
        situacion_futura = models.TextField(blank=True)
        costes = models.TextField(blank=True)
        beneficios = models.TextField(blank=True)
        fecha_implementacion = models.DateField(blank=True, null=True)
        fecha_solicitud = models.DateField(blank=True, null=True)
        destino_solicitud = models.TextField(blank=True)
        estado = models.CharField(max_length=200)
        #departamentoImprovement = models.ForeignKey(departamento, on_delete=models.CASCADE, blank=True, null=True)
        departamentoImprovement = models.ManyToManyField(departamento, blank=True)
        categorizacion = models.ForeignKey(categorizacion, on_delete=models.CASCADE, blank=True, null=True)
        equipoMFT = models.ManyToManyField(customUser, related_name='equipoMFT', blank=True)

        def __str__(self):
                return f"{self.id} {self.titulo}"

        class Meta:
                  verbose_name_plural = "improvements"   

class accionesImprovement(models.Model):
        id = models.AutoField(primary_key=True)
        id_improvement = models.ForeignKey(improvement, on_delete=models.CASCADE)
        titulo = models.CharField(max_length=100)
        fecha_prevista = models.DateField(blank=True, null=True)
        fecha_ejecucion = models.DateField(blank=True, null=True)
        responsable_accion = models.ForeignKey(customUser, related_name='responsable_accion', on_delete=models.CASCADE)
        user_ayundantes = models.ManyToManyField(customUser, related_name='user_ayundantes', blank=True)
        observations = models.TextField(blank=True)
        completed = models.BooleanField(default = False)

        def __str__(self):
                return f"{self.id} {self.titulo}"

        class Meta:
                  verbose_name_plural = "accionesImprovements"   


class deliverable(models.Model):
        id = models.AutoField(primary_key=True)
        descripcion = models.TextField(blank=True, null=True)
        criterios_estimados = models.TextField(blank=True, null=True)
        fecha_entrega = models.TextField(blank=True, null=True)
        tipos_indicadores = models.TextField(blank=True, null=True)
        criterios_aceptacion = models.TextField(blank=True, null=True)
        mision = models.ForeignKey(mision, on_delete=models.CASCADE)

        def __str__(self):
                return f"{self.id} {self.descripcion}"

        class Meta:
                  verbose_name_plural = "deliverables"  


class kpi(models.Model):
        id = models.AutoField(primary_key=True)
        titulo = models.CharField(max_length=100)
        codigo = models.CharField(max_length=100)
        tipo = models.CharField(max_length=100)
        descripcion = models.TextField(blank=True, null=True)
        datos_usados = models.TextField(blank=True, null=True)
        tipoFrecuencia = models.CharField(max_length=100)
        frecuencia = models.IntegerField()
        frecuenciaMensual = models.IntegerField()
        meses_afectados = models.CharField(max_length=500)
        responsable = models.ManyToManyField(customUser, related_name='responsables_kpi', blank=True)
        objetivo = models.FloatField()
        valor_aviso = models.FloatField(blank=True, null=True)
        mision = models.ForeignKey(mision, on_delete=models.CASCADE)
        unidad = models.CharField(max_length=100)
        metodo_calculo = models.TextField(blank=True)
        modoCalculo = models.IntegerField()
        # modoCalculo se refiere al tipo de calculo del kpi, es decir si el resultado tiene que se mayor, igual o menor que el objetivo
                # 1 => menor
                # 2 => menor igual
                # 3 => igual
                # 4 => mayor igual
                # 5 => mayor
        active = models.BooleanField(default = True)

        def __str__(self):
                return f"{self.id} {self.titulo}"

        class Meta:
                  verbose_name_plural = "kpis"


class dataKPI(models.Model):
        id = models.AutoField(primary_key=True)
        id_kpi = models.ForeignKey(kpi, on_delete=models.CASCADE)
        week = models.IntegerField(blank=True, null=True)
        # orden se refiere al numero de kpi que es, es decir:
                # si es anual seria el 1, 
                # si es trimestral y es el tercer trimestre seria el 3
                # si es anual y es el mes de agosto es el 8
        mes_tratado = models.CharField(max_length=100, blank=True, null=True)
        ordenGlobalDato = models.IntegerField(blank=True, null=True)
        ordenMensual = models.IntegerField(blank=True, null=True)
        resultado = models.FloatField()
        objetivoData = models.FloatField()
        warningData = models.FloatField(blank=True, null=True)
        objetivoCumplido = models.BooleanField()
        objetivoTiempoCumplido = models.BooleanField()
        ano = models.CharField(max_length=20)

        observations = models.TextField(blank=True)
        razon_atraso = models.TextField(blank=True)
        razon_calidad = models.TextField(blank=True)

        fechaTeoricaRegistro = models.DateField(blank=True, null=True)
        fechaRegistro = models.DateField(blank=True, null=True)

        categorizacionNOTD = models.ForeignKey(categorizacion, related_name='categorizacionNOTD', on_delete=models.CASCADE, blank=True, null=True)
        categorizacionNOQD = models.ForeignKey(categorizacion, related_name='categorizacionNOQD', on_delete=models.CASCADE, blank=True, null=True)

        def __str__(self):
                return f"{self.id} {self.id_kpi}"

        class Meta:
                  verbose_name_plural = "dataKPIs" 

class logCambiosPersonas(models.Model):
        id = models.AutoField(primary_key=True)
        persona = models.ForeignKey(customUser, related_name='personaLogCambios', on_delete=models.CASCADE)
        fecha_accion = models.DateField(blank=True, null=True)
        hora_accion = models.TextField(blank=True)
        accion = models.TextField(blank=True)
        direccionDepartamental_relacionado = models.ForeignKey(direccionDepartamental, related_name='direccionDepartamental_relacionado', on_delete=models.CASCADE, blank=True, null=True)
        departamento_relacionado = models.ForeignKey(departamento, related_name='departamento_relacionado', on_delete=models.CASCADE, blank=True, null=True)
        wp_relacionado = models.ForeignKey(workPackage, related_name='wp_relacionado', on_delete=models.CASCADE, blank=True, null=True)
        mision_relacionada = models.ForeignKey(mision, related_name='mision_relacionada', on_delete=models.CASCADE, blank=True, null=True)
        subMision_relacionada = models.ForeignKey(subMision, related_name='subMision_relacionada', on_delete=models.CASCADE, blank=True, null=True)
        descripcion = models.TextField(blank=True)

        def __str__(self):
                return f"{self.id} {self.persona}"

        class Meta:
                  verbose_name_plural = "logAcciones"

class logAccion(models.Model):
        id = models.AutoField(primary_key=True)
        persona = models.ForeignKey(customUser, related_name='personaLog', on_delete=models.CASCADE)
        fecha_accion = models.DateField(blank=True, null=True)
        hora_accion = models.TextField(blank=True)
        modulo = models.TextField(blank=True)
        descripcion = models.TextField(blank=True)

        def __str__(self):
                return f"{self.id} {self.persona}"

        class Meta:
                  verbose_name_plural = "logAcciones" 


class logRisk(models.Model):
        id = models.AutoField(primary_key=True)
        persona = models.ForeignKey(customUser, related_name='personaLogRisk', on_delete=models.CASCADE)
        fecha_accion = models.DateField(blank=True, null=True)
        hora_accion = models.TextField(blank=True)
        accion = models.TextField(blank=True)
        amfe_relacionado = models.ForeignKey(riskManagement, related_name='riskManagement_relacionado', on_delete=models.CASCADE, blank=True, null=True)
        ro_relacionado = models.ForeignKey(rmRiskOpportunity, related_name='rmRiskOpportunity_relacionado', on_delete=models.CASCADE, blank=True, null=True)
        accion_relacionado = models.ForeignKey(rmAction, related_name='rmAction_relacionado', on_delete=models.CASCADE, blank=True, null=True)
        descripcion = models.TextField(blank=True)

        def __str__(self):
                return f"{self.id} {self.persona}"

        class Meta:
                  verbose_name_plural = "logRisks"
                  
class peticionRequerimiento(models.Model):
        id = models.AutoField(primary_key=True)
        persona = models.ForeignKey(customUser, related_name='peticionRequerimiento', on_delete=models.CASCADE)
        fecha_accion = models.DateField(blank=True, null=True)
        hora_accion = models.TextField(blank=True)
        descripcion = models.TextField(blank=True)
        active = models.BooleanField(default = False)

        def __str__(self):
                return f"{self.id} {self.persona}"

        class Meta:
                  verbose_name_plural = "peticionesRequerimientos"