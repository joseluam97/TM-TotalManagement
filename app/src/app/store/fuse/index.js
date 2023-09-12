import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';

//IMPORTACIÓN DE REDUCERS VISTAS
import programasViewReducer from '../../../components/Managment/GestionContratos/store/reducer'

import riskManagementViewReducer from '../../../views/tabsExcel_anterior/riskManagement/store/reducer'


//IMPORTACIÓN DE REDUCERS COMPONENTES GENERALES
import contratoReducer from '../../../components/Gestion/ContratoServicio/store/reducer'
import misionPaqueteReducer from '../../../components/Gestion/PaqueteTrabajo/store/reducer'
import riskManagementReducer from '../../../components/TabsExcel/RiskManagement/store/reducer'
import improvementProposalsReducer from '../../../components/TabsExcel/ImprovementProposals/store/reducer'
import peopleManagementReducer from '../../../components/TabsExcel/PeopleManagement/store/reducer'
import userComponenteReducer from '../../../components/Managment/Users/store/reducer'
import deliverableReducer from '../../../components/TabsExcel/Deliverables/store/reducer'
import rmRegistroReducer from '../../../components/TabsExcel/RiskManagement/modals/RmRegistro/store/reducer'
import rmAccionReducer from '../../../components/TabsExcel/RiskManagement/modals/RmAccion/store/reducer'
import loginReducer from '../../../components/Login/store/reducer'
import tasksAccionesReducer from '../../../components/TabsExcel/RiskManagement/modals/tasks/store/reducer'
import customerReducer from '../../../components/Managment/Customers/store/reducer'
import aplicationReducer from '../../../components/TabsExcel/PeopleManagement/Items/Aplications/store/reducer'
import misionReducer from '../../../components/Gestion/Mision/store/reducer'
import subMisionReducer from '../../../components/Gestion/SubMision/store/reducer'
import appReducer from '../../../components/Managment/App/store/reducer'
import categoriaReducer from '../../../components/Managment/Category/store/reducer'
import gestionAplicationReducer from '../../../components/Managment/App/store/reducer'
import actionImprovementProposalsReducer from '../../../components/TabsExcel/ImprovementProposals/ImprovementActions/store/reducer'
import kpiReducer from '../../../components/Managment/Kpi/store/reducer'

import dataKpiReducer from '../../../components/TabsExcel/DataKpi/items/store/reducer'
import gestionDataKpiReducer from '../../../components/TabsExcel/DataKpi/store/reducer'
import logReducer from '../../../components/Managment/Log/store/reducer'
import logPersonaReducer from '../../../components/Managment/LogCambiosPersonas/store/reducer'
import departamentoViewReducer from '../../../components/Gestion/Departamentos/store/reducer'
import detallerUserReducer from '../../../components/Managment/Users/modals/DetailsUser/store/reducer'
import logRiskReducer from '../../../components/Managment/LogRisk/store/reducer'
import permisosReducer from '../../../components/Managment/Permisos/store/reducer'
import notificacionesReducer from '../../../components/Managment/Notifications/store/reducer'
import staffUserReducer from '../../../components/TabsExcel/PeopleManagement/Items/SearchUser/store/reducer'
import myTeamReducer from '../../../components/TabsExcel/PeopleManagement/Items/MyTeam/store/reducer'

const fuseReducers = combineReducers({

  //VISTAS
  programasView: programasViewReducer,
  riskManagementView: riskManagementViewReducer,

  //COMPONENTES GENERALES
  riskManagementComponente: riskManagementReducer,
  userComponente: userComponenteReducer,
  rmRegistroComponente : rmRegistroReducer,
  rmAccionComponente: rmAccionReducer,
  loginComponente: loginReducer,
  tasksAccionesComponente: tasksAccionesReducer,
  userComponente: userComponenteReducer,
  contratoComponente: contratoReducer,
  misionPaqueteComponente: misionPaqueteReducer,
  peopleManagementComponente: peopleManagementReducer,
  aplicationComponent: aplicationReducer,
  misionComponent: misionReducer,
  subMisionComponent: subMisionReducer,
  improvementProposalsComponent: improvementProposalsReducer,
  actionImprovementProposalsComponent: actionImprovementProposalsReducer,
  customerComponent: customerReducer,
  appComponent: appReducer,
  deliverableComponent: deliverableReducer,
  categoriaComponent: categoriaReducer,
  gestionAplicationComponent: gestionAplicationReducer,
  kpiComponent: kpiReducer,
  dataKpiComponent: dataKpiReducer,
  gestionDataKpiComponent: gestionDataKpiReducer,
  logComponent: logReducer,
  logPersonaComponent: logPersonaReducer,
  departamentoViewComponente: departamentoViewReducer,
  detallerUserComponente: detallerUserReducer,
  logRiskComponente: logRiskReducer,
  permisosComponente: permisosReducer,
  notificacionesComponente: notificacionesReducer,
  staffUserComponente: staffUserReducer,
  myTeamComponente: myTeamReducer,

  //OTROS
  navigation,
  settings,
  navbar,
  message,
  dialog,
});

export default fuseReducers;
