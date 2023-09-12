import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';

import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import React from 'react'
import LoginConfig from 'components/Login/LoginConfig';
import Tasks from 'components/TabsExcel/RiskManagement/modals/tasks/TasksAppConfig';

//settings
const Programas = React.lazy(() => import('components/Managment/GestionContratos/contratos'))
const Users = React.lazy(() => import('components/Managment/Users/Users'))
const Customers = React.lazy(() => import('components/Managment/Customers/Customers'))
const MainApp = React.lazy(() => import('components/Managment/App/MainApp'))
const Kpi = React.lazy(() => import('components/Managment/Kpi/Kpi'))
const Category = React.lazy(() => import('components/Managment/Category/Category'))
const Department = React.lazy(() => import('components/Gestion/Departamentos/departamentos'))
const Log = React.lazy(() => import('components/Managment/Log/Log'))
const LogPersona = React.lazy(() => import('components/Managment/LogCambiosPersonas/LogCambioPersonas'))
const Home = React.lazy(() => import('components/Home/home'))
const Permisos = React.lazy(() => import('components/Managment/Permisos/Permisos'))

//tabsExcel
const RiskManagement = React.lazy(() => import('components/TabsExcel/RiskManagement/RiskManagement'))
const PeopleManagement = React.lazy(() => import('components/TabsExcel/PeopleManagement/PeopleManagement'))
const SearchUser = React.lazy(() => import('components/TabsExcel/PeopleManagement/Items/SearchUser/SearchUser'))
const ImprovementProposals = React.lazy(() => import('components/TabsExcel/ImprovementProposals/ImprovementProposals'))
const Deliverables = React.lazy(() => import('components/TabsExcel/Deliverables/Deliverables'))
const DataKpi = React.lazy(() => import('components/TabsExcel/DataKpi/DataKpi'))

const routeConfigs = [
  LoginConfig,
  Tasks
];

const routes = [

  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),

  { path: '/home', name: 'Home', element: <Home /> },
  { path: '/', name: 'Home', element: <Home /> },
  { path: 'pages/gestiones/programas', name: 'Programas', element: <Programas /> },
  { path: 'pages/tabsExcel/riskmanagement', name: 'Risk Management', element: <RiskManagement /> },
  { path: 'pages/tabsExcel/peoplemanagement', name: 'People Management', element: <PeopleManagement /> },
  { path: 'pages/tabsExcel/improvementProposals', name: 'Improvement Proposals', element: <ImprovementProposals /> },
  { path: 'pages/tabsExcel/deliverables', name: 'Deliverables', element: <Deliverables /> },
  { path: 'pages/tabsExcel/dataKpi', name: 'Data KPI', element: <DataKpi /> },
  { path: 'pages/gestiones/users', name: 'users', element: <Users /> },
  { path: 'pages/gestiones/kpi', name: 'KPI', element: <Kpi /> },
  { path: 'pages/gestiones/customers', name: 'customers', element: <Customers /> },
  { path: 'pages/gestiones/categories', name: 'categories', element: <Category /> },
  { path: 'pages/gestiones/requirements', name: 'requirements', element: <MainApp /> },
  { path: 'pages/gestiones/department', name: 'department', element: <Department /> },
  { path: 'pages/gestiones/log', name: 'log', element: <Log /> },
  { path: 'pages/gestiones/logPerson', name: 'logPerson', element: <LogPersona /> },
  { path: 'pages/gestiones/permissionsGroup', name: 'permissionsGroup', element: <Permisos /> },
  { path: 'loading', element: <FuseLoading /> },
  { path: '404', element: <Error404Page /> },
  { path: '*', element: <Navigate to="404" /> },

];

export default routes;
