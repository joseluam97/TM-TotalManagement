from dataclasses import field
from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.utils.timezone import now
from rest_framework import serializers
from django.contrib.auth.models import Group

class groupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class peticionRequerimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = peticionRequerimiento
        fields = ['id', 'persona', 'fecha_accion', 'hora_accion', 'descripcion', 'active']
        
class serviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = service
        fields = ['id', 'name', 'description', 'code', 'active', 'locations']

class servicePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = service
        fields = ['id', 'name', 'description', 'code', 'active', 'locations']

class workPackageSerializer(serializers.ModelSerializer):
    id_service_name = serializers.CharField(source='id_service.name')
    class Meta:
        model = workPackage
        fields = ['id', 'id_service', 'name', 'description', 'code', 'active', 'id_service_name', 'responsableWP']

class workPackageIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = workPackage
        fields = ['id']


class workPackagePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = workPackage
        fields = ['id', 'id_service', 'name', 'description', 'code', 'active', 'responsableWP']

class misionSerializer(serializers.ModelSerializer):
    id_workPackage_name = serializers.CharField(source='id_workPackage.name')
    class Meta:
        model = mision
        fields = ['id', 'id_workPackage', 'name', 'description', 'code', 'active', 'responsables', 'id_workPackage_name', 'site', 'empleados']

class misionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = mision
        fields = ['id', 'id_workPackage', 'name', 'description', 'code', 'responsables', 'active', 'site', 'empleados']

class misionIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = mision
        fields = ['id']


class subMisionSerializer(serializers.ModelSerializer):
    id_mision_name = serializers.CharField(source='id_mision.name')
    class Meta:
        model = subMision
        fields = ['id', 'id_mision', 'name', 'description', 'code', 'active', 'id_mision_name']

class subMisionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = subMision
        fields = ['id', 'id_mision', 'name', 'description', 'code', 'active']

class roleSerializer(serializers.ModelSerializer):
    class Meta:
        model = role
        fields = ['id', 'role']

class riskManagementSerializer(serializers.ModelSerializer):
    mision_name = serializers.CharField(source='mision.name')

    class Meta:
        model = riskManagement
        fields = ['id', 'mision', 'title', 'code', 'manager', 'member', 'active', 'mision_name']
        #fields = "__all__"


class riskManagementPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = riskManagement
        fields = ['id', 'mision', 'title', 'code', 'manager', 'member', 'active']
        #fields = "__all__"

class rmRiskOpportunitySerializer(serializers.ModelSerializer):

    categorizacion_name = serializers.CharField(source='categorizacion.codigo')
    amfe_name = serializers.CharField(source='id_risk_management.title')

    class Meta:
        model = rmRiskOpportunity
        fields = ['id', 'id_risk_management', 'risk', 'type', 'd_detection', 'glitch_effect', 'cause_failure', 'current_controls', 'gravity', 'idea', 'detection', 'npr', 'priorization', 'observations', 'rev', 'closed', 'categorizacion', 'categorizacion_name', 'padreRiskOpportunity', 'site', 'amfe_name', 'active']

class rmRiskOpportunityPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = rmRiskOpportunity
        fields = ['id', 'id_risk_management', 'risk', 'type', 'd_detection', 'glitch_effect', 'cause_failure', 'current_controls', 'gravity', 'idea', 'detection', 'npr', 'priorization', 'observations', 'rev', 'closed', 'categorizacion', 'padreRiskOpportunity', 'site', 'active']


class rmActionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = rmAction
        fields = ['id', 'id_record', 'proposal', 'manager', 'd_planned', 'd_closed','observations', 'rev', 'completed']

class rmActionSerializer(serializers.ModelSerializer):

    ro_titulo = serializers.CharField(source='id_record.risk')

    class Meta:
        model = rmAction
        fields = ['id', 'id_record', 'proposal', 'manager', 'd_planned', 'd_closed','observations', 'rev', 'completed', 'ro_titulo']

class contractuserExtraSerializer(serializers.ModelSerializer):

    subMision_id_name = serializers.CharField(source='subMision_id.name')
    subMision_id_code = serializers.CharField(source='subMision_id.code')

    class Meta:
        model = contractuser
        fields = ['id', 'user_id', 'subMision_id', 'rol_employee', 'subMision_id_name', 'subMision_id_code', 'job']


class contractuserSerializer(serializers.ModelSerializer):
    job_all = serializers.CharField(source='job')
    class Meta:
        model = contractuser
        fields = ['id', 'user_id', 'subMision_id', 'rol_employee', 'job', 'job_all']

class contractuserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = contractuser
        fields = ['id', 'user_id', 'subMision_id', 'rol_employee', 'job']

class notificationsSerializer(serializers.ModelSerializer):
    origen_notification_first_name = serializers.CharField(source='origen_notification_id.first_name')
    origen_notification_last_name = serializers.CharField(source='origen_notification_id.last_name')
    origen_notification_email = serializers.CharField(source='origen_notification_id.email')
    destino_notification_name = serializers.CharField(source='destino_notification_id.first_name')

    class Meta:
        model = notifications
        fields = ['id', 'origen_notification_id', 'destino_notification_id', 'fecha', 'observations', 'active', 'origen_notification_first_name', 'origen_notification_last_name', 'destino_notification_name', 'origen_notification_email', 'typeNotification', 'archivo']

class notificationsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = notifications
        fields = ['id', 'origen_notification_id', 'destino_notification_id', 'fecha', 'observations', 'typeNotification', 'active', 'archivo']


class contractuserContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = contractuser
        fields = ['subMision_id']

class aplicationSerializer(serializers.ModelSerializer):
    responsable_email = serializers.CharField(source='responsable_aplication.email')

    class Meta:
        model = aplication
        fields = ['id', 'name', 'code', 'responsable_aplication', 'responsable_email', 'type', 'tiene_valor' , 'tipo_valor', 'listado_opciones']
        
class aplicationPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = aplication
        fields = ['id', 'name', 'code', 'responsable_aplication', 'type', 'tiene_valor' , 'tipo_valor', 'listado_opciones']

class contractAppSerializer(serializers.ModelSerializer):

    aplication_app_id_name = serializers.CharField(source='aplication_app_id.name')
    aplication_app_id_code = serializers.CharField(source='aplication_app_id.code')
    aplication_app_id_tipo_valor = serializers.CharField(source='aplication_app_id.tipo_valor')
    job_name = serializers.CharField(source='job.name')
    job_code = serializers.CharField(source='job.code')

    class Meta:
        model = contractApp
        fields = ['id', 'subMision_id', 'aplication_app_id', 'aplication_app_id_name', 'aplication_app_id_code', 'job', 'job_name', 'job_code', 'valor_asignado','valor_comparacion', 'operacion_logica', 'aplication_app_id_tipo_valor', 'diferencia_fecha']

class contractAppPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = contractApp
        fields = ['id', 'subMision_id', 'aplication_app_id', 'job', 'valor_asignado','valor_comparacion', 'operacion_logica', 'diferencia_fecha']

class misionAppSerializer(serializers.ModelSerializer):

    aplication_app_id_name = serializers.CharField(source='aplication_app_id.name')
    aplication_app_id_code = serializers.CharField(source='aplication_app_id.code')
    aplication_app_id_tipo_valor = serializers.CharField(source='aplication_app_id.tipo_valor')

    class Meta:
        model = misionApp
        fields = ['id', 'mision_id', 'aplication_app_id', 'aplication_app_id_name', 'aplication_app_id_code', 'type', 'valor_asignado','valor_comparacion', 'operacion_logica', 'aplication_app_id_tipo_valor', 'diferencia_fecha']

class misionAppPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = misionApp
        fields = ['id', 'mision_id', 'aplication_app_id', 'type', 'valor_asignado','valor_comparacion', 'operacion_logica', 'diferencia_fecha']


class wpAppSerializer(serializers.ModelSerializer):

    aplication_app_id_name = serializers.CharField(source='aplication_app_id.name')
    aplication_app_id_code = serializers.CharField(source='aplication_app_id.code')
    aplication_app_id_tipo_valor = serializers.CharField(source='aplication_app_id.tipo_valor')

    class Meta:
        model = wpApp
        fields = ['id', 'workPackage_id', 'aplication_app_id', 'aplication_app_id_name', 'aplication_app_id_code', 'valor_asignado','valor_comparacion', 'operacion_logica', 'aplication_app_id_tipo_valor', 'diferencia_fecha']

class wpAppPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = wpApp
        fields = ['id', 'workPackage_id', 'aplication_app_id', 'valor_asignado','valor_comparacion', 'operacion_logica', 'diferencia_fecha']


class departamentoAppSerializer(serializers.ModelSerializer):

    aplication_app_id_name = serializers.CharField(source='aplication_app_id.name')
    aplication_app_id_code = serializers.CharField(source='aplication_app_id.code')
    aplication_app_id_tipo_valor = serializers.CharField(source='aplication_app_id.tipo_valor')

    class Meta:
        model = departamentoApp
        fields = ['id', 'departamento_id', 'aplication_app_id', 'aplication_app_id_name', 'aplication_app_id_code', 'valor_asignado','valor_comparacion', 'operacion_logica', 'aplication_app_id_tipo_valor', 'diferencia_fecha']

class departamentoAppPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = departamentoApp
        fields = ['id', 'departamento_id', 'aplication_app_id', 'valor_asignado','valor_comparacion', 'operacion_logica', 'diferencia_fecha']


class direccionDepartamentalAppSerializer(serializers.ModelSerializer):

    aplication_app_id_name = serializers.CharField(source='aplication_app_id.name')
    aplication_app_id_code = serializers.CharField(source='aplication_app_id.code')
    aplication_app_id_tipo_valor = serializers.CharField(source='aplication_app_id.tipo_valor')

    class Meta:
        model = direccionDepartamentalApp
        fields = ['id', 'direccionDepartamental_id', 'aplication_app_id', 'aplication_app_id_name', 'aplication_app_id_code', 'valor_asignado','valor_comparacion', 'operacion_logica', 'aplication_app_id_tipo_valor', 'diferencia_fecha']

class direccionDepartamentalAppPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = direccionDepartamentalApp
        fields = ['id', 'direccionDepartamental_id', 'aplication_app_id', 'valor_asignado','valor_comparacion', 'operacion_logica', 'diferencia_fecha']
        
class userAppSerializer(serializers.ModelSerializer):

    user_id_first_name = serializers.CharField(source='user_id.first_name')
    user_id_last_name = serializers.CharField(source='user_id.last_name')
    aplication_user_type = serializers.CharField(source='aplication_user_id.type')
    aplication_user_id_name = serializers.CharField(source='aplication_user_id.name')
    aplication_user_id_code = serializers.CharField(source='aplication_user_id.code')
    responsable_aplication_first_name = serializers.CharField(source='aplication_user_id.responsable_aplication.first_name')
    responsable_aplication_last_name = serializers.CharField(source='aplication_user_id.responsable_aplication.last_name')
    responsable_aplication_email = serializers.CharField(source='aplication_user_id.responsable_aplication.email')
        
    class Meta:
        model = userApp
        fields = ['id', 'user_id', 'aplication_user_id', 'user_id_first_name', 'user_id_last_name', 'aplication_user_id_name', 'aplication_user_id_code', 'responsable_aplication_first_name', 'responsable_aplication_last_name', 'responsable_aplication_email', 'aplication_user_type', 'valor_asignado_fecha', 'valor_asignado','valor_comparacion']

class userAppPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = userApp
        fields = ['id', 'user_id', 'aplication_user_id', 'valor_asignado_fecha', 'valor_asignado','valor_comparacion']

class customerSerializer(serializers.ModelSerializer):
    class Meta:
        model = customer
        fields = ['id', 'name', 'code', 'sitio_web', 'active']

class locationCustomerSerializer(serializers.ModelSerializer):

    id_customer_name = serializers.CharField(source='id_customer.name')

    class Meta:
        model = locationCustomer
        fields = ['id', 'id_customer', 'name', 'code', 'direccion', 'latitud', 'longuitud', 'active', 'id_customer_name']

class locationCustomerPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = locationCustomer
        fields = ['id', 'id_customer', 'name', 'code', 'direccion', 'latitud', 'longuitud', 'active']

class supplierCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = supplierCustomer
        fields = ['id', 'id_location_customer', 'name', 'code', 'direccion', 'sitio_web', 'email', 'telefono', 'latitud', 'longuitud', 'active']

class improvementPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = improvement
        fields = ['id', 'titulo' ,'subMision', 'user_id_principal', 'user_id_secundario', 'observations', 'situacion_actual', 'situacion_futura', 'costes', 'beneficios', 'fecha_implementacion', 'fecha_solicitud', 'estado', 'destino_solicitud', 'categorizacion', 'departamentoImprovement', 'equipoMFT']

class accionesImprovementSerializer(serializers.ModelSerializer):
    id_improvement_name = serializers.CharField(source='id_improvement.titulo')
    responsable_accion_email = serializers.CharField(source='responsable_accion.email')

    class Meta:
        model = accionesImprovement
        fields = ['id', 'id_improvement' ,'titulo', 'fecha_prevista', 'fecha_ejecucion', 'responsable_accion', 'user_ayundantes', 'observations', 'completed', 'id_improvement_name', 'responsable_accion_email']

class accionesImprovementPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = accionesImprovement
        fields = ['id', 'id_improvement' ,'titulo', 'fecha_prevista', 'fecha_ejecucion', 'responsable_accion', 'user_ayundantes', 'observations', 'completed']

class deliverableSerializer(serializers.ModelSerializer):
    mision_name = serializers.CharField(source='mision.name')

    class Meta:
        model = deliverable
        fields = ['id', 'descripcion' ,'criterios_estimados', 'fecha_entrega', 'tipos_indicadores', 'criterios_aceptacion', 'mision', 'mision_name']

class deliverablePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = deliverable
        fields = ['id', 'descripcion' ,'criterios_estimados', 'fecha_entrega', 'tipos_indicadores', 'criterios_aceptacion', 'mision']


class categorizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = categorizacion
        fields = ['id', 'codigo' ,'titulo', 'definicion', 'tipo', 'active']

class improvementSerializer(serializers.ModelSerializer):

    subMision_name = serializers.CharField(source='subMision.name')
    user_id_principal_name = serializers.CharField(source='user_id_principal')
    #user_id_secundario_name = serializers.CharField(source='user_id_secundario')

    class Meta:
        model = improvement
        fields = ['id', 'titulo' , 'subMision', 'subMision_name', 'user_id_principal_name', 'user_id_principal', 'user_id_secundario', 'observations', 'situacion_actual', 'situacion_futura', 'costes', 'beneficios', 'fecha_implementacion', 'fecha_solicitud', 'estado', 'destino_solicitud', 'categorizacion', 'departamentoImprovement', 'equipoMFT', 'procesos_afectados']

class jobInSubMisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = jobInSubMision
        fields = ['id', 'name' ,'code', 'active', 'sub_mision']


class kpiSerializer(serializers.ModelSerializer):
    mision_name = serializers.CharField(source='mision.name')
    class Meta:
        model = kpi
        fields = ['id', 'titulo', 'codigo' ,'tipo', 'descripcion', 'datos_usados', 'frecuencia', 'responsable' ,'objetivo', 'mision', 'unidad', 'mision_name', 'modoCalculo', 'metodo_calculo', 'frecuenciaMensual', 'valor_aviso', 'meses_afectados', 'tipoFrecuencia', 'active']

class kpiPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = kpi
        fields = ['id', 'titulo', 'codigo' ,'tipo', 'descripcion', 'datos_usados', 'frecuencia', 'responsable' ,'objetivo', 'mision', 'unidad', 'modoCalculo', 'metodo_calculo', 'frecuenciaMensual', 'valor_aviso', 'meses_afectados', 'tipoFrecuencia', 'active']

class dataKPISerializer(serializers.ModelSerializer):
    kpi_titulo = serializers.CharField(source='id_kpi.titulo')
    kpi_codigo = serializers.CharField(source='id_kpi.codigo')
    class Meta:
        model = dataKPI
        fields = ['id', 'id_kpi' ,'week', 'resultado', 'objetivoData', 'warningData', 'objetivoCumplido', 'kpi_codigo', 'kpi_titulo', 'ano', 'observations', 'mes_tratado', 'ordenMensual', 'fechaRegistro', 'razon_atraso', 'objetivoTiempoCumplido', 'razon_calidad', 'fechaTeoricaRegistro', 'categorizacionNOTD', 'categorizacionNOQD', 'ordenGlobalDato']

class dataKPIPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = dataKPI
        fields = ['id', 'id_kpi' ,'week', 'resultado', 'objetivoData', 'warningData', 'objetivoCumplido', 'ano', 'observations', 'mes_tratado', 'ordenMensual', 'fechaRegistro', 'razon_atraso', 'objetivoTiempoCumplido', 'razon_calidad', 'fechaTeoricaRegistro', 'categorizacionNOTD', 'categorizacionNOQD', 'ordenGlobalDato']


class logRiskSerializer(serializers.ModelSerializer):
    emailPersona = serializers.CharField(source='persona.email')
    class Meta:
        model = logRisk
        fields = ['id', 'persona' ,'fecha_accion', 'hora_accion','accion', 'amfe_relacionado', 'ro_relacionado', 'accion_relacionado', 'descripcion', 'emailPersona']

class logRiskROByActionSerializer(serializers.ModelSerializer):
    emailPersona = serializers.CharField(source='persona.email')
    accion_name = serializers.CharField(source='accion_relacionado.proposal')
    class Meta:
        model = logRisk
        fields = ['id', 'persona' ,'fecha_accion', 'hora_accion','accion', 'amfe_relacionado', 'ro_relacionado', 'accion_relacionado', 'descripcion', 'emailPersona', 'accion_name']


class logRiskPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = logRisk
        fields = ['id', 'persona' ,'fecha_accion', 'hora_accion','accion', 'amfe_relacionado', 'ro_relacionado', 'accion_relacionado', 'descripcion']

class logAccionSerializer(serializers.ModelSerializer):
    emailPersona = serializers.CharField(source='persona.email')
    class Meta:
        model = logAccion
        fields = ['id', 'persona' ,'fecha_accion', 'hora_accion','modulo', 'descripcion', 'emailPersona']

class logAccionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = logAccion
        fields = ['id', 'persona' ,'fecha_accion', 'hora_accion', 'modulo', 'descripcion']


class logCambiosPersonasSerializer(serializers.ModelSerializer):
    emailPersona = serializers.CharField(source='persona.email')
    class Meta:
        model = logCambiosPersonas
        fields = ['id', 'persona' ,'fecha_accion', 'hora_accion','accion', 'descripcion', 'emailPersona', 'direccionDepartamental_relacionado', 'departamento_relacionado','wp_relacionado','mision_relacionada','subMision_relacionada']

class logCambiosPersonasPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = logCambiosPersonas
        fields = ['id', 'persona' ,'fecha_accion', 'hora_accion', 'accion', 'descripcion', 'direccionDepartamental_relacionado', 'departamento_relacionado','wp_relacionado','mision_relacionada','subMision_relacionada']


class departamentoSerializer(serializers.ModelSerializer):
    name_direccion_departamental = serializers.CharField(source='id_direccion_departamental.name')
    class Meta:
        model = departamento
        fields = ['id', 'id_direccion_departamental' ,'responsableDepartamento', 'name','description', 'code', 'active', 'name_direccion_departamental']

class departamentoPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = departamento
        fields = ['id', 'id_direccion_departamental' ,'responsableDepartamento', 'name','description', 'code', 'active']


class direccionDepartamentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = direccionDepartamental
        fields = ['id' ,'name', 'description','code', 'responsablesDD', 'active', 'estandarizador_departamento']

class direccionDepartamentalPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = direccionDepartamental
        fields = ['id','name', 'description','code', 'responsablesDD', 'active', 'estandarizador_departamento']

class groupsRequerimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = groupsRequeriment
        fields = ['id', 'name' ,'code', 'aplicaciones']

class aplicationWithRequerimentsSerializer(serializers.ModelSerializer):
    requeriment_name = serializers.CharField(source='requeriment.name')
    requeriment_code = serializers.CharField(source='requeriment.code')
    requeriment_type = serializers.CharField(source='requeriment.type')
    requeriment_tipo_valor = serializers.CharField(source='requeriment.tipo_valor')
    requeriment_listado_opciones = serializers.CharField(source='requeriment.listado_opciones')

    class Meta:
        model = aplicationWithRequeriments
        fields = ['id', 'requeriment', 'valor_asignado', 'valor_comparacion', 'operacion_logica', 'diferencia_fecha', 'requeriment_name', 'requeriment_code', 'requeriment_type', 'requeriment_tipo_valor', 'requeriment_listado_opciones']

class aplicationWithRequerimentsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = aplicationWithRequeriments
        fields = ['id', 'requeriment', 'valor_asignado', 'valor_comparacion', 'operacion_logica', 'diferencia_fecha'] 

class requestUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = requestUser
        fields = ['id', 'user_solicitado', 'user_origen_solicitud', 'user_destino_solicitud', 'fecha_solicitud', 'fecha_entrada', 'fecha_salida', 'observations', 'state', 'bloque_Asignado', 'id_bloque_asignado'] 

class requestUserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = requestUser
        fields = ['id', 'user_solicitado', 'user_origen_solicitud', 'user_destino_solicitud', 'fecha_solicitud', 'fecha_entrada', 'fecha_salida', 'observations', 'state', 'bloque_Asignado', 'id_bloque_asignado'] 


class customUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = customUser
        fields = ['id','password', 'groups', 'last_login', 'is_superuser', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'phone', 'organization','user_permissions', 'rolUser', 'IDidentification']
        #extra_kwargs = {'password': {'write_only': True, 'required': True}}

       

    #def create(self, validated_data):
    #    user = customUser (
    #        email = validated_data['email']
    #    )
    #    user.set_password(validated_data['password'])
    #    user.save()
    #    return user