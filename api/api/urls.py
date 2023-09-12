from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from tm.views import *
from tm.views.notifications import *
from tm.views.aplication import *
from tm.views.contractApp import *
from tm.views.userApp import *
from tm.views.mision import *
from tm.views.subMision import *
from tm.views.improvement import *
from tm.views.customer import *
from tm.views.locationCustomer import *
from tm.views.supplierCustomer import *
from tm.views.deliverable import *
from tm.views.categorizacion import *
from tm.views.jobInSubMision import *
from tm.views.accionesImprovement import *
from tm.views.kpi import *
from tm.views.dataKPI import *
from tm.views.logAccion import *
from tm.views.departamento import *
from tm.views.direccionDepartamental import *
from tm.views.logCambiosPersonas import *
from tm.views.direccionDepartamentalApp import *
from tm.views.departamentoApp import *
from tm.views.wpApp import *
from tm.views.misionApp import *
from tm.views.logRisk import *
from tm.views.groupPermission import *
from tm.views.groupsRequeriment import *
from tm.views.aplicationWithRequeriments import *
from tm.views.peticionRequerimiento import *
from tm.views.requestUser import *

#from rest_framework_swagger.views import get_swagger_view

#schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('django/', admin.site.urls),

    #------------TOKEN Y AUTH--------------
    path('api/auth/', tokenInternal.as_view(),name='token_internal'),
    path('api/auth/token/permisos/', getPermisosByUser.as_view(),name='getPermisosByUser'),
    path('api/auth/token/', tokenInternalSegunda.as_view(),name='token_internal_segunda'),
    path('api/checktoken/', checkToken.as_view(), name='checktoken'),

    #------------SERVICIO / CONTRATO--------------
    path('api/service/', serviceList.as_view()),
    path('api/service/<int:pk>', serviceListDetail.as_view()),
    path('api/service/mision/<int:pk>', misionByService.as_view()),

    #------------WORK PACKAGE--------------
    path('api/workpackage/', workPackageList.as_view()),
    path('api/workpackage/<int:pk>', workPackageListDetail.as_view()),
    path('api/workpackage/locationsWP/<int:pk>', workPackageListUbications.as_view()),
    path('api/workPackage/getUserResponsablesWP/', getUserResponsablesWP.as_view()),
    path('api/workPackage/getMyWp/<int:pk>', getMyWp.as_view()),

    #------------MISION--------------
    path('api/mision/', misionList.as_view()),
    path('api/mision/<int:pk>', misionListDetail.as_view()),
    path('api/mision/misMisiones/<int:pk>', misionListMyMision.as_view()),
    path('api/mision/locationsContract/<int:pk>', misionListUbicationsContract.as_view()),

    #------------SUB MISION--------------
    path('api/subMision/', subMisionList.as_view()),
    path('api/subMision/<int:pk>', subMisionListDetail.as_view()),
    path('api/subMision/misSubmisiones/<int:pk>', subMisionOperations.as_view()),

    #------------CATEGORIA--------------
    path('api/categorizacion/', categorizacionList.as_view()),
    path('api/categorizacion/<int:pk>', categorizacionListDetail.as_view()),
    path('api/categorizacion/allCategory/', categorizacionOperations.as_view()),
    path('api/categorizacion/noActive/', categorizacionUsoEditarList.as_view()),

    #------------REQUEST USER--------------
    path('api/requestUser/', requestUserList.as_view()),
    path('api/requestUser/<int:pk>', requestUserListDetail.as_view()),
    path('api/requestByUser/<int:pk>', requestByUser.as_view()),

    #------------CUSTOMER--------------
    path('api/customer/', customerList.as_view()),
    path('api/customer/<int:pk>', customerListDetail.as_view()),

    #------------LOCATION CUSTOMER--------------
    path('api/locationCustomer/', locationCustomerList.as_view()),
    path('api/locationCustomer/<int:pk>', locationCustomerListDetail.as_view()),
    path('api/locationCustomer/customer/<int:pk>', locationCustomerByCustomer.as_view()),

    #------------SUPPLIER CUSTOMER--------------
    path('api/supplierCustomer/', supplierCustomerList.as_view()),
    path('api/supplierCustomer/<int:pk>', supplierCustomerListDetail.as_view()),

    #------------USUARIOS--------------
    path('api/user/', customUserList.as_view()),
    path('api/user/<int:pk>', customUserListDetail.as_view()),
    path('api/user/all/', customAllUserList.as_view()),
    path('api/user/permisosByGroup/<int:pk>', customUserListPermisosByGroup.as_view()),
    path('api/user/customUserDeleteRelaciones/<int:pk>', customUserDeleteRelaciones.as_view()),
    path('api/user/postNewPermisos/', postPermisosUsuarios.as_view()),

    #RUTAS DE GER USER DE ESTRUCTURA DE PERSONAL
    path('api/user/userEstructuraPersonalDireccionDepartamental/<int:pk>', userEstructuraPersonalDireccionDepartamental.as_view()),
    path('api/user/userEstructuraPersonalWP/<int:pk>', userEstructuraPersonalWP.as_view()),
    path('api/user/userEstructuraPersonalMision/<int:pk>', userEstructuraPersonalMision.as_view()),
    path('api/user/userEstructuraPersonalSubMision/<int:pk>', userEstructuraPersonalSubMision.as_view()),
    #FIN RUTAS DE GER USER DE ESTRUCTURA DE PERSONAL

    path('api/user/postPasswordUserManual/<int:pk>', postPasswordUserManual.as_view()),
    #RUTAS DE INFO USER BLOQUES DIRECTOS

    path('api/user/misSubMisionesDirectas/<int:pk>', misSubMisionesDirectas.as_view()),
    path('api/user/misMisionesDirectas/<int:pk>', misMisionesDirectas.as_view()),
    path('api/user/misWPDirectas/<int:pk>', misWPDirectas.as_view()),
    path('api/user/misDepartamentosDirectas/<int:pk>', misDepartamentosDirectas.as_view()),
    path('api/user/misDireccionDepartamentalDirectas/<int:pk>', misDireccionDepartamentalDirectas.as_view()),

    path('api/user/allBlokByUser/<int:pk>', misBloquesDirectosYHeredados.as_view()),

    #------------ROLE--------------
    path('api/role/', roleList.as_view()),
    path('api/role/<int:pk>', roleListDetail.as_view()),

    #------------RISK--------------
    path('api/risk_management/', riskManagementList.as_view()),
    path('api/risk_management/<int:pk>', riskManagementListDetail.as_view()),
    path('api/risk_management/persona/<int:pk>', riskManagementListOperation.as_view()),

    #------------R&O--------------
    path('api/rm_risk_opportunity/', rmRiskOpportunityList.as_view()),
    path('api/rm_risk_opportunity/<int:pk>', rmRiskOpportunityListDetail.as_view()), 
    path('api/rm_risk_opportunity/lastVersion/<int:pk>', rmRiskOpportunityOperations.as_view()), 
    path('api/rm_risk_opportunity/organigrama/<int:pk>', rmRiskOpportunityOrganigrama.as_view()),
    path('api/rm_risk_opportunity/persona/<int:pk>', rmRYOListByPersonDetail.as_view()),
    path('api/rm_risk_opportunity/home/', rmRYOListHomeDetail.as_view()),
    path('api/rm_risk_opportunity/roByMision/<int:pk>', rmRiskOpportunityLocalizacionesByMision.as_view()),

    #------------ACTION R&O-------------- 
    path('api/rm_action/', rmActionList.as_view()),
    path('api/rm_action/<int:pk>', rmActionListDetail.as_view()),
    path('api/rm_action/persona/<int:pk>', rmActionListByPersonDetail.as_view()),
    path('api/rm_action/myActions/<int:pk>', rmActionListMyActions.as_view()),

    #------------CONTRACT USER--------------
    path('api/contractuser/', contractuserList.as_view()),
    path('api/contractuser/<int:pk>', contractuserDetail.as_view()),
    path('api/contractuserByUser/<int:pk>', contractuserExtra.as_view()),
    
    #------------NOTIFICACIONES--------------
    path('api/notifications/', notificationsList.as_view()),
    path('api/notifications/<int:pk>', notificationsListDetail.as_view()),
    path('api/notifications/myNotifications/<int:pk>', misNotificaciones.as_view()),
    path('api/notifications/descarga/<int:pk>', descargarArchivo.as_view()),

    #------------APLICACIONES / REQUERIMIENTOS--------------
    path('api/aplication/', aplicationList.as_view()),
    path('api/aplication/<int:pk>', aplicationListDetail.as_view()),
    path('api/aplication/allTypes/', aplicationListCategories.as_view()),
    path('api/aplication/checkItemList/<int:pk>', aplicationCheckItemList.as_view()),
    path('api/aplication/search/', usuariosByRequeriments.as_view()),

    #------------CONTRACT APP--------------
    path('api/contractApp/', contractAppList.as_view()),
    path('api/contractApp/<int:pk>', contractAppListDetail.as_view()),
    path('api/contractAppByContract/<int:pk>', contractAppByContract.as_view()),

    #------------MISION APP--------------
    path('api/misionApp/', misionAppList.as_view()),
    path('api/misionApp/<int:pk>', misionAppListDetail.as_view()),
    path('api/misionAppByContract/<int:pk>', misionAppByContract.as_view()),

    #------------WORK PACKAGE APP--------------
    path('api/wpApp/', wpAppList.as_view()),
    path('api/wpApp/<int:pk>', wpAppListDetail.as_view()),
    path('api/wpAppByContract/<int:pk>', wpAppByContract.as_view()),

    #------------DEPARTAMENTO APP--------------
    path('api/departamentoApp/', departamentoAppList.as_view()),
    path('api/departamentoApp/<int:pk>', departamentoAppListDetail.as_view()),
    path('api/departamentoAppByContract/<int:pk>', departamentoAppByContract.as_view()),

    #------------DIRECCION DEPARTAMENTAL APP--------------
    path('api/direccionDepartamentalApp/', direccionDepartamentalAppList.as_view()),
    path('api/direccionDepartamentalApp/<int:pk>', direccionDepartamentalAppListDetail.as_view()),
    path('api/direccionDepartamentalAppByContract/<int:pk>', direccionDepartamentalAppByContract.as_view()),

    #------------USER APP--------------
    path('api/userApp/', userAppList.as_view()),
    path('api/userApp/<int:pk>', userAppListDetail.as_view()),
    path('api/userAppByUser/<int:pk>', userAppByUser.as_view()),
    path('api/userApp/resultByTeam/<int:pk>', faltanUserAppByTeam.as_view()),

    #------------IMPROVEMENT--------------
    path('api/improvement/', improvementList.as_view()),
    path('api/improvement/<int:pk>', improvementListDetail.as_view()),
    path('api/improvement/persona/<int:pk>', improvementListOperation.as_view()),

    #------------DELIVERABLES--------------
    path('api/deliverable/', deliverableList.as_view()),
    path('api/deliverable/<int:pk>', deliverableListDetail.as_view()),
    path('api/deliverable/contrato/<int:pk>', deliverableListOperation.as_view()),

    #------------JOB IN SUB MISION--------------
    path('api/jobInSubMision/', jobInSubMisionList.as_view()),
    path('api/jobInSubMision/<int:pk>', jobInSubMisionListDetail.as_view()),
    path('api/jobInSubMision/mySubMision/<int:pk>', jobInSubMisionOperations.as_view()),

    #------------ACCIONES IMPROVEMENT--------------
    path('api/accionesImprovement/', accionesImprovementList.as_view()),
    path('api/accionesImprovement/<int:pk>', accionesImprovementListDetail.as_view()),
    path('api/accionesImprovement/ByImprovement/<int:pk>', accionesImprovementByImprovement.as_view()),

    #------------KPI--------------
    path('api/kpi/', kpiList.as_view()),
    path('api/kpi/<int:pk>', kpiListDetail.as_view()),
    path('api/kpi/all', kpiAllList.as_view()),
    path('api/kpi/contrato/<int:pk>', kpiListByContract.as_view()),
    path('api/kpi/summary/<int:pk>', kpiListTablaSummary.as_view()),
    path('api/kpi/summaryGantt/<int:pk>', kpiListTablaSummaryGannt.as_view()),
    path('api/kpi/summarySemanalGantt/<int:pk>', kpiListTablaSummarySemanalesGannt.as_view()),

    #------------DATA KPI--------------
    path('api/dataKpi/', dataKPIList.as_view()),
    path('api/dataKpi/<int:pk>', dataKPIListDetail.as_view()),
    path('api/dataKpi/ano/<int:pk>', dataKPIListByYear.as_view()),
    path('api/dataKpi/graficoOQD/<int:pk>', dataKPIGraficoBykpiOQD.as_view()),
    path('api/dataKpi/graficoOTD/<int:pk>', dataKPIGraficoBykpiOTD.as_view()),
    path('api/dataKpi/allGraficoOQD/<int:pk>', dataKPIGraficosOQD.as_view()),
    path('api/dataKpi/allGraficoOTD/<int:pk>', dataKPIGraficosOTD.as_view()),
    path('api/dataKpi/solicitudExport/', dataKPIExportData.as_view()),

    #------------LOG--------------
    path('api/log/', logAccionList.as_view()),
    path('api/logReducer/', logAccionOperations.as_view()),
    path('api/log/<int:pk>', logAccionListDetail.as_view()),

    #------------LOG PEOPLE--------------
    path('api/logPersonas/', logCambiosPersonasList.as_view()),
    path('api/logPersonas/reducer/', logCambiosReducerList.as_view()),
    path('api/logPersonas/<int:pk>', logCambiosPersonasListDetail.as_view()),

    #------------LOG RISK--------------
    path('api/logRisk/', logRiskList.as_view()),
    path('api/logRisk/<int:pk>', logRiskListDetail.as_view()),
    path('api/logRisk/amfe/<int:pk>', logRiskAmfeList.as_view()),
    path('api/logRisk/ro/<int:pk>', logRiskRoList.as_view()),
    path('api/logRisk/accionByRO/<int:pk>', logRiskAccionByRoList.as_view()),
    path('api/logRisk/accion/<int:pk>', logRiskAccionList.as_view()),

    #------------DIRECCION DEPARTAMENTAL--------------
    path('api/direccionDepartamental/', direccionDepartamentalList.as_view()),
    path('api/direccionDepartamental/<int:pk>', direccionDepartamentalListDetail.as_view()),

    #------------DEPARTAMENTO--------------
    path('api/departamento/', departamentoList.as_view()),
    path('api/departamento/<int:pk>', departamentoListDetail.as_view()),

    #------------GRUPOS DE REQUERIMIENTOS--------------
    path('api/groupsRequeriment/', groupsRequerimentList.as_view()),
    path('api/groupsRequeriment/<int:pk>', groupsRequerimentListDetail.as_view()),

    #------------APLICACIONES CON REQUERIMIENTOS--------------
    path('api/aplicationWithRequeriments/', aplicationWithRequerimentsList.as_view()),
    path('api/aplicationWithRequeriments/<int:pk>', aplicationWithRequerimentsListDetail.as_view()),

    #------------GRUPOS DE PERMISOS--------------
    path('api/group/', grupoPermisosList.as_view()),
    path('api/group/<int:pk>', grupoPermisosDetails.as_view()),
    path('api/group/permisos/<int:pk>', getPermisosByGroup.as_view()),
    path('api/group/putPermisos/<int:pk>', putPermisosByGroup.as_view()),

    #------------PETICION DE REQUERIMIENTOS--------------
    path('api/peticionRequerimiento/', peticionRequerimientoList.as_view()),
    path('api/peticionRequerimiento/<int:pk>', peticionRequerimientoListDetail.as_view()),
    
    #------------PERMISOS--------------
    path('api/permisos/', getAllPermisos.as_view()),


]

admin.site.site_header = 'TM Administration panel'
