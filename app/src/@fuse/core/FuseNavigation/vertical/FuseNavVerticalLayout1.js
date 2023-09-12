import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import FuseNavItem from '../FuseNavItem';
import {
  getPermisosSesionActualAPIAction,
  getSesionActualAPIAction
} from 'components/Managment/Users/store/actions'
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import { React, useEffect, useState } from 'react'

const StyledList = styled(List)(({ theme }) => ({
  '& .fuse-list-item': {
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)',
    },
    '&:focus:not(.active)': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)',
    },
  },
  '&.active-square-list': {
    '& .fuse-list-item, & .active.fuse-list-item': {
      width: '100%',
      borderRadius: '0',
    },
  },
  '&.dense': {
    '& .fuse-list-item': {
      paddingTop: 0,
      paddingBottom: 0,
      height: 32,
    },
  },
}));





function FuseNavVerticalLayout1(props) {
  const { navigation, layout, active, dense, className, onItemClick } = props;
  const dispatch = useDispatch();
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)



  function handleItemClick(item) {
    onItemClick?.(item);
  }




  useEffect(() => {
    dispatch(getPermisosSesionActualAPIAction({
      token: getCookie('token')
    }))

  }, []);

{/*
  OCULTAR ASPECTOS DEL MENU LATERAL
  
  useEffect(() => {

    if (personLoginPermisos.length > 0) {
      var ordenMenu = []

      //***********************MODULES***********************

      //RISK
      if (personLoginPermisos.find((item) => item['name'] == "Can view risk management") == undefined) {
        ordenMenu.push(0)
      }

      //PEOPLE
      if (personLoginPermisos.find((item) => item['name'] == "Can view sub mision") == undefined) {
        //SE HACE DE FORMA ESPECIAL PORQUE ES UN SUB MENU DENTRO DE OTRO SUB MENU
        //OCULTAR MY INFORMATION
        document.getElementsByClassName("MuiTypography-root MuiTypography-body1 text-13 font-medium \
                                          fuse-list-item-text-primary MuiListItemText-primary \
                                          muiltr-17vgq7f-MuiTypography-root")[0].style.display = "none";

        //OCULTAR STAFF MANAGEMENT
        document.getElementsByClassName("MuiTypography-root MuiTypography-body1 text-13 font-medium \
                                          fuse-list-item-text-primary MuiListItemText-primary \
                                          muiltr-17vgq7f-MuiTypography-root")[1].style.display = "none";


        //OCULTAR EL PEOPLE SI NO SE TIENE EL SUB MISION PERMISSION
        document.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding \
                                                MuiListItem-button fuse-list-item  \
                                                muiltr-1t4yqt2-MuiButtonBase-root-MuiListItem-root")[1].style.display = "none";


      }

      //IMPROVEMENT
      if (personLoginPermisos.find((item) => item['name'] == "Can view improvement") == undefined) {
        ordenMenu.push(1)
      }

      //DELIVERABLES
      if (personLoginPermisos.find((item) => item['name'] == "Can view deliverable") == undefined) {
        ordenMenu.push(2)
      }

      //DATA KPI
      if (personLoginPermisos.find((item) => item['name'] == "Can view data kpi") == undefined) {
        ordenMenu.push(3)
      }

      //***********************MANAGEMENT

      //CONTRACT
      if (personLoginPermisos.find((item) => item['name'] == "Can view service") == undefined) {
        ordenMenu.push(4)
      }

      //DEPARTAMENTO
      if (personLoginPermisos.find((item) => item['name'] == "Can view direccion departamental") == undefined || personLoginPermisos.find((item) => item['name'] == "Can view departamento") == undefined) {
        ordenMenu.push(5)
      }

      //PROCESO
      if (personLoginPermisos.find((item) => item['name'] == "Can view process") == undefined) {
        ordenMenu.push(6)
      }

      //CATEGORIAS
      if (personLoginPermisos.find((item) => item['name'] == "Can view categorizacion") == undefined) {
        ordenMenu.push(7)
      }

      //KPI
      if (personLoginPermisos.find((item) => item['name'] == "Can view kpi") == undefined) {
        ordenMenu.push(8)
      }

      //REQUERIMENTS
      if (personLoginPermisos.find((item) => item['name'] == "Can view aplication") == undefined) {
        ordenMenu.push(9)
      }

      //LOG
      if (personLoginPermisos.find((item) => item['name'] == "Can view log accion") == undefined) {
        ordenMenu.push(10)
      }

      //***********************USER MANEGEMENT

      //USER
      if (personLoginPermisos.find((item) => item['name'] == "Can view user") == undefined) {
        ordenMenu.push(11)
      }

      //CUSTOMER
      if (personLoginPermisos.find((item) => item['name'] == "Can view customer") == undefined) {
        ordenMenu.push(12)
      }

      //LOG PEOPLE
      if (personLoginPermisos.find((item) => item['name'] == "Can view log cambios personas") == undefined) {
        ordenMenu.push(13)
      }

      //GRUPO DE PERMISOS
      if (personLoginPermisos.find((item) => item['name'] == "Can view group") == undefined) {
        ordenMenu.push(14)
      }

      //POWER BI
      if (personLoginPermisos.find((item) => item['name'] == "Can Management Power BI") == undefined) {
        ordenMenu.push(15)
      }


      ordenMenu.forEach(function (valor, indice, array) {
        document.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters \
                                                    MuiListItem-padding MuiListItem-button fuse-list-item \
                                                    muiltr-l0s0kn-MuiButtonBase-root-MuiListItem-root")[valor].style.display = "none";
      });

      //OCULTAR EL MODULES SI NO VE NINGUN ITEM
      if (ordenMenu.indexOf(0) !== -1 && ordenMenu.indexOf(1) !== -1 && ordenMenu.indexOf(2) !== -1 && ordenMenu.indexOf(3) !== -1) {
        document.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding \
                                               MuiListItem-button fuse-list-item  \
                                               muiltr-1t4yqt2-MuiButtonBase-root-MuiListItem-root")[0].style.display = "none";

      }

      //OCULTAR EL MANAGEMENT SI NO VE NINGUN ITEM
      if (ordenMenu.indexOf(4) !== -1 && ordenMenu.indexOf(5) !== -1 && ordenMenu.indexOf(6) !== -1 && ordenMenu.indexOf(7) !== -1 && ordenMenu.indexOf(8) !== -1 && ordenMenu.indexOf(9) !== -1 && ordenMenu.indexOf(10) !== -1) {
        document.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding \
                                               MuiListItem-button fuse-list-item  \
                                               muiltr-1t4yqt2-MuiButtonBase-root-MuiListItem-root")[2].style.display = "none";

      }

      //OCULTAR EL USER MANAGEMENT SI NO VE NINGUN ITEM
      if (ordenMenu.indexOf(12) !== -1 && ordenMenu.indexOf(13) !== -1 && ordenMenu.indexOf(14) !== -1) {
      document.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding \
                                               MuiListItem-button fuse-list-item  \
                                               muiltr-1t4yqt2-MuiButtonBase-root-MuiListItem-root")[3].style.display = "none";

      }

      //OCULTAR EL POWER BI SI NO VE NINGUN ITEM
      if (ordenMenu.indexOf(15) !== -1) {
        document.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding \
                                                 MuiListItem-button fuse-list-item  \
                                                 muiltr-1t4yqt2-MuiButtonBase-root-MuiListItem-root")[4].style.display = "none";
  
        }
    }

  }, [personLoginPermisos, personLogin]);

*/}
  return (
    <StyledList
      className={clsx(
        'navigation whitespace-nowrap px-12',
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      {navigation.map((_item) => (

        <FuseNavItem
          key={_item.id}
          type={`vertical-${_item.type}`}
          item={_item}
          nestedLevel={0}
          onItemClick={handleItemClick}
        />
      ))}
    </StyledList>
  );
}

export default FuseNavVerticalLayout1;
