from django.contrib import admin
from .models import *


# Register your models here.
class ServicePanel(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'code', 'active')
    list_filter = ( 'name', 'description', 'code', 'active')

class WorkPackagePanel(admin.ModelAdmin):
    list_display = ('id', 'id_service', 'name', 'description', 'code', 'active')
    list_filter = ( 'id_service', 'name', 'description', 'code', 'active')

class CustomUserPanel(admin.ModelAdmin):
    list_display = ('id', 'IDidentification', 'first_name', 'last_name', 'email', 'phone', 'organization', 'rolUser', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined')
    list_filter = ( 'IDidentification', 'is_superuser', 'first_name', 'last_name', 'email', 'phone', 'organization', 'rolUser', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined')

class RiskManagementPanel(admin.ModelAdmin):
    list_display = ('id', 'mision', 'title', 'code', 'active')
    list_filter = ( 'mision', 'title', 'code', 'active')

class RiskOportunitisPanel(admin.ModelAdmin):
    list_display = ('id', 'id_risk_management', 'risk', 'type', 'd_detection', 'glitch_effect', 'cause_failure', 'current_controls', 'gravity', 'idea', 'detection', 'npr', 'priorization', 'observations', 'rev', 'closed', 'categorizacion', 'padreRiskOpportunity', 'active')
    list_filter = ( 'id_risk_management', 'risk', 'type', 'd_detection', 'glitch_effect', 'cause_failure', 'current_controls', 'gravity', 'idea', 'detection', 'npr', 'priorization', 'observations', 'rev', 'closed', 'categorizacion', 'padreRiskOpportunity', 'active')

class RiskActionPanel(admin.ModelAdmin):
    list_display = ('id', 'id_record', 'proposal', 'd_planned', 'd_closed','observations', 'rev', 'completed')
    list_filter = ( 'id_record', 'proposal', 'd_planned', 'd_closed','observations', 'rev', 'completed')

class NotificationPanel(admin.ModelAdmin):
    list_display = ('id', 'origen_notification_id', 'destino_notification_id', 'fecha', 'observations', 'typeNotification', 'active')
    list_filter = ( 'origen_notification_id', 'destino_notification_id', 'fecha', 'observations', 'typeNotification', 'active')

class ContractUserPanel(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'subMision_id', 'rol_employee', 'job')
    list_filter = ( 'user_id', 'subMision_id', 'rol_employee', 'job')

class AplicationPanel(admin.ModelAdmin):
    list_display = ('name', 'code', 'type', 'responsable_aplication')
    list_filter = ('name', 'code', 'type', 'responsable_aplication')

class ContractAppPanel(admin.ModelAdmin):
    list_display = ('id', 'subMision_id', 'aplication_app_id', 'job')
    list_filter = ( 'subMision_id', 'aplication_app_id', 'job')

class UserAppPanel(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'aplication_user_id')
    list_filter = ( 'user_id', 'aplication_user_id')

class MisionPanel(admin.ModelAdmin):
    list_display = ('id', 'id_workPackage', 'name', 'description', 'code', 'active')
    list_filter = ( 'id_workPackage', 'name', 'description', 'code', 'active')

class subMisionPanel(admin.ModelAdmin):
    list_display = ('id', 'id_mision', 'name', 'description', 'code', 'active')
    list_filter = ( 'id_mision', 'name', 'description', 'code', 'active')

class improvementPanel(admin.ModelAdmin):
    list_display = ('id', 'titulo' ,'subMision', 'observations', 'situacion_actual', 'situacion_futura', 'costes', 'beneficios', 'fecha_implementacion', 'fecha_solicitud', 'estado', 'destino_solicitud', 'categorizacion')
    list_filter = ( 'titulo' ,'subMision', 'observations', 'situacion_actual', 'situacion_futura', 'costes', 'beneficios', 'fecha_implementacion', 'fecha_solicitud', 'estado', 'destino_solicitud', 'categorizacion')

class customerPanel(admin.ModelAdmin):
    list_display = ('id', 'name', 'code', 'sitio_web', 'active')
    list_filter = ( 'name', 'code', 'sitio_web', 'active')

class locationCustomerPanel(admin.ModelAdmin):
    list_display = ('id', 'id_customer', 'name', 'code', 'direccion', 'latitud', 'longuitud', 'active')
    list_filter = ( 'id_customer', 'name', 'code', 'direccion', 'latitud', 'longuitud', 'active')

class supplierCustomerPanel(admin.ModelAdmin):
    list_display = ('id', 'id_location_customer', 'name', 'code', 'direccion', 'sitio_web', 'email', 'telefono', 'latitud', 'longuitud', 'active')
    list_filter = ( 'id_location_customer', 'name', 'code', 'direccion', 'sitio_web', 'email', 'telefono', 'latitud', 'longuitud', 'active')

class deliverablePanel(admin.ModelAdmin):
    list_display = ('id', 'descripcion' ,'criterios_estimados', 'fecha_entrega', 'tipos_indicadores', 'criterios_aceptacion', 'mision')
    list_filter = ( 'descripcion' ,'criterios_estimados', 'fecha_entrega', 'tipos_indicadores', 'criterios_aceptacion', 'mision')

class categorizacionPanel(admin.ModelAdmin):
    list_display = ('id', 'codigo' ,'titulo', 'definicion', 'tipo', 'active')
    list_filter = ( 'codigo' ,'titulo', 'definicion', 'tipo', 'active')

class jobInSubMisionPanel(admin.ModelAdmin):
    list_display = ('id', 'name' ,'code', 'active', 'sub_mision')
    list_filter = ( 'name' ,'code', 'active', 'sub_mision')

class accionesImprovementPanel(admin.ModelAdmin):
    list_display = ('id', 'id_improvement' ,'titulo', 'fecha_prevista', 'fecha_ejecucion', 'observations', 'completed')
    list_filter = ( 'id_improvement' ,'titulo', 'fecha_prevista', 'fecha_ejecucion', 'observations', 'completed')

class kpiPanel(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'codigo' ,'tipo', 'descripcion', 'datos_usados', 'frecuencia' ,'objetivo', 'mision', 'unidad', 'modoCalculo', 'metodo_calculo', 'valor_aviso', 'frecuenciaMensual', 'meses_afectados', 'tipoFrecuencia', 'active')
    list_filter = ( 'titulo', 'codigo' ,'tipo','objetivo', 'mision', 'frecuenciaMensual', 'valor_aviso', 'tipoFrecuencia', 'active')

class dataKPIPanel(admin.ModelAdmin):
    list_display = ('id', 'id_kpi' ,'week', 'resultado', 'objetivoData', 'warningData', 'objetivoCumplido', 'objetivoTiempoCumplido', 'ano', 'observations', 'mes_tratado', 'ordenMensual', 'fechaRegistro', 'razon_atraso', 'ordenGlobalDato')
    list_filter = ( 'id_kpi' ,'week', 'resultado', 'objetivoData', 'warningData', 'objetivoCumplido', 'objetivoTiempoCumplido', 'ano', 'observations', 'mes_tratado', 'ordenMensual', 'fechaRegistro', 'razon_atraso')

class logAccionPanel(admin.ModelAdmin):
    list_display = ('id', 'persona' ,'fecha_accion', 'hora_accion', 'modulo', 'descripcion')
    list_filter = ('persona', 'modulo', 'descripcion')

class departamentoPanel(admin.ModelAdmin):
    list_display = ('id', 'id_direccion_departamental', 'name','description', 'code', 'active')
    list_filter = ( 'id_direccion_departamental', 'name','description', 'code', 'active')

class direccionDepartamentalPanel(admin.ModelAdmin):
    list_display = ('id', 'name', 'description','code', 'active', 'estandarizador_departamento')
    list_filter = ( 'name', 'description','code', 'active', 'estandarizador_departamento')

class logCambiosPersonasPanel(admin.ModelAdmin):
    list_display = ('id', 'persona' ,'fecha_accion', 'hora_accion', 'accion', 'descripcion', 'direccionDepartamental_relacionado', 'departamento_relacionado','wp_relacionado','mision_relacionada','subMision_relacionada')
    list_filter = ('persona', 'accion', 'descripcion', 'direccionDepartamental_relacionado', 'departamento_relacionado','wp_relacionado','mision_relacionada','subMision_relacionada')

class logRiskPanel(admin.ModelAdmin):
    list_display = ('id', 'persona' ,'fecha_accion', 'hora_accion', 'accion', 'descripcion', 'amfe_relacionado', 'ro_relacionado', 'accion_relacionado')
    list_filter = ('persona' , 'accion', 'descripcion', 'amfe_relacionado', 'ro_relacionado', 'accion_relacionado')

class misionAppPanel(admin.ModelAdmin):
    list_display = ('id', 'mision_id', 'aplication_app_id', 'type')
    list_filter = ( 'mision_id', 'aplication_app_id', 'type')

class wpAppPanel(admin.ModelAdmin):
    list_display = ('id', 'workPackage_id', 'aplication_app_id')
    list_filter = ( 'workPackage_id', 'aplication_app_id')

class departamentoAppPanel(admin.ModelAdmin):
    list_display = ('id', 'departamento_id', 'aplication_app_id')
    list_filter = ( 'departamento_id', 'aplication_app_id')

class direccionDepartamentalAppPanel(admin.ModelAdmin):
    list_display = ('id', 'direccionDepartamental_id', 'aplication_app_id')
    list_filter = ( 'direccionDepartamental_id', 'aplication_app_id')

class groupsRequerimentPanel(admin.ModelAdmin):
    list_display = ('id', 'name', 'code')
    list_filter = ( 'name', 'code')

class aplicationWithRequerimentsPanel(admin.ModelAdmin):
    list_display = ('id', 'requeriment', 'valor_asignado', 'valor_comparacion', 'operacion_logica')

class peticionRequerimientoPanel(admin.ModelAdmin):
    list_display = ('id', 'persona', 'fecha_accion', 'hora_accion', 'descripcion', 'active')

class requestUserPanel(admin.ModelAdmin):
    list_display = ('id', 'user_solicitado', 'user_origen_solicitud', 'fecha_solicitud', 'fecha_entrada', 'fecha_salida', 'bloque_Asignado', 'id_bloque_asignado', 'observations', 'state')

admin.site.register(service, ServicePanel)
admin.site.register(workPackage, WorkPackagePanel)
admin.site.register(customUser, CustomUserPanel)
admin.site.register(role)
admin.site.register(riskManagement, RiskManagementPanel)
admin.site.register(rmRiskOpportunity, RiskOportunitisPanel)
admin.site.register(rmAction, RiskActionPanel)
admin.site.register(contractuser, ContractUserPanel)
admin.site.register(notifications, NotificationPanel)
admin.site.register(aplication, AplicationPanel)
admin.site.register(contractApp, ContractAppPanel)
admin.site.register(userApp, UserAppPanel)
admin.site.register(mision, MisionPanel)
admin.site.register(subMision, subMisionPanel)
admin.site.register(improvement, improvementPanel)
admin.site.register(customer, customerPanel)
admin.site.register(locationCustomer, locationCustomerPanel)
admin.site.register(supplierCustomer, supplierCustomerPanel)
admin.site.register(deliverable, deliverablePanel)
admin.site.register(categorizacion, categorizacionPanel)
admin.site.register(jobInSubMision, jobInSubMisionPanel)
admin.site.register(accionesImprovement, accionesImprovementPanel)
admin.site.register(kpi, kpiPanel)
admin.site.register(dataKPI,dataKPIPanel)
admin.site.register(logAccion, logAccionPanel)
admin.site.register(departamento, departamentoPanel)
admin.site.register(direccionDepartamental, direccionDepartamentalPanel)
admin.site.register(logCambiosPersonas, logCambiosPersonasPanel)
admin.site.register(misionApp, misionAppPanel)
admin.site.register(wpApp, wpAppPanel)
admin.site.register(departamentoApp, departamentoAppPanel)
admin.site.register(direccionDepartamentalApp, direccionDepartamentalAppPanel)
admin.site.register(logRisk, logRiskPanel)
admin.site.register(groupsRequeriment, groupsRequerimentPanel)
admin.site.register(aplicationWithRequeriments, aplicationWithRequerimentsPanel)
admin.site.register(peticionRequerimiento, peticionRequerimientoPanel)
admin.site.register(requestUser, requestUserPanel)