import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: '/',
  },
  //TABSEXCEL**********************
  {
    id: 'tabsExcel',
    title: 'Modules',
    type: 'collapse',
    icon: 'assessment',
    children: [
      {
        id: 'riskManagement',
        title: 'R&O',
        type: 'item',
        url: 'pages/tabsExcel/riskmanagement',
      },
      {
        id: 'peopleManagement',
        title: 'People',
        type: 'collapse',
        children: [
          {
            id: 'miInformacion',
            title: 'My information',
            type: 'item',
            url: 'pages/tabsExcel/peoplemanagement',
          },
          {
            id: 'searchPerson',
            title: 'Staff management',
            type: 'item',
            url: 'pages/tabsExcel/staffManagement',
          }
        ]
      },
      {
        id: 'improvementProposals',
        title: 'Improvement proposals',
        type: 'item',
        url: 'pages/tabsExcel/improvementProposals',
      },
      {
        id: 'deliverables',
        title: 'Deliverables',
        type: 'item',
        url: 'pages/tabsExcel/deliverables',
      },
      {
        id: 'dataKpi',
        title: 'Data KPI',
        type: 'item',
        url: 'pages/tabsExcel/dataKpi',
      }
    ],
  },
  {
    //GESTIONES**************************

    id: 'gestiones',
    title: 'Management',
    type: 'collapse',
    icon: 'build',
    children: [
      {
        id: 'programas',
        title: 'Contract',
        type: 'item',
        url: 'pages/gestiones/programas',
      },
      {
        id: 'department',
        title: 'Department',
        type: 'item',
        url: 'pages/gestiones/department',
      },
      {
        id: 'categories',
        title: 'Categories',
        type: 'item',
        url: 'pages/gestiones/categories',
      },
      {
        id: 'kpi',
        title: 'KPI',
        type: 'item',
        url: 'pages/gestiones/kpi',
      },
      {
        id: 'requirements',
        title: 'Requirements',
        type: 'item',
        url: 'pages/gestiones/requirements',
      },
      {
        id: 'log',
        title: 'Log',
        type: 'item',
        url: 'pages/gestiones/log',
      },
    ],
  },
  //ADMINISTRACION
  {

    //USUARIOS**************************

    id: 'usuarios',
    title: 'Users',
    type: 'collapse',
    icon: 'person',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: 'pages/gestiones/users',
      },
      {
        id: 'customers',
        title: 'Customers',
        type: 'item',
        url: 'pages/gestiones/customers',
      },
      {
        id: 'logPerson',
        title: 'Movements of people',
        type: 'item',
        url: 'pages/gestiones/logPerson',
      },
      {
        id: 'permisos',
        title: 'Permissions group',
        type: 'item',
        url: 'pages/gestiones/permissionsGroup',
      },

    ],
  }
];

export default navigationConfig;
