//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//Componentes genéricos importaciones
import GestionContratoServicio from '../../Gestion/ContratoServicio/ContratoServicio.js'
import GestionMisionPaqueteTrabajo from '../../Gestion/PaqueteTrabajo/PaqueteTrabajo.js'
import Mision from '../../Gestion/Mision/Mision.js'
import SubMision from '../../Gestion/SubMision/subMision.js'

import {
    getPermisosSesionActualAPIAction
  } from '../Users/store/actions.js'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import { cambiarValorTabAction } from  './store/actions.js'
import store from "app/store/index"
import {getCookie} from 'app/js/generalFunctions'
import { useNavigate } from "react-router-dom";


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import Tooltip from '@mui/material/Tooltip';
import { ModalInsertar as ModalInsertarContratoServicio } from '../../Gestion/ContratoServicio/modals/insertar.js';

import {
    mostrarContratoServicioAPIAction,
    cambiarValorSeleccionAction as cambiarValorSeleccionActionContrato,
    cambiarVisibilidadModalInsertarAPIAction as cambiarVisibilidadModalInsertarAPIActionContrato,
    updateContratoServicioActionAPIAction,
    cambiarVisibilidadModalAssignedPeopleAPIAction
  } from  '../../Gestion/ContratoServicio/store/actions.js'


 



//**********************END_IMPORTACIONES ***********************/


export default function Programa() {
  
    const [viewContrato, setViewContrato] = useState(true)
    const [viewPaquete, setViewPaquete] = useState(true)

    const navigate = useNavigate();

    //obtener el state de Redux
    const valorTab = useSelector (state => state.fuse.programasView.valorTab)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

    //creamos una función para hacer uso de Actions
    const dispatch = useDispatch()
    const cambiarValorTab = (valorTab) => dispatch(cambiarValorTabAction(valorTab))
    
    const cambiarEstado = (event, newValue) => {
         cambiarValorTab (newValue)
         //navigate('/404')
      }
    

    useEffect(() => {
        //GET USER
        store.dispatch(getPermisosSesionActualAPIAction( {
            token: getCookie('token')
        }))
        //FIN GET USER

    }, [])

    useEffect(() => {
        if(personLoginPermisos.find((item) => item['name'] == "Can view service") != undefined){
            setViewContrato(false)
        }
        if(personLoginPermisos.find((item) => item['name'] == "Can view work package") != undefined){
            setViewPaquete(false)
        }

        if(personLoginPermisos.find((item) => item['name'] == "Can view program") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view set") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view sub set") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view service") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view work package") == undefined){
            navigate('/')
        }
    
    }, [personLoginPermisos])
      
    return (
        <FusePageCarded

            content={
                <Box sx={{ width: '100%' }}>
                    
                    <Tabs
                        value={valorTab}
                        onChange={cambiarEstado}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                            <Tab value="contrato" label="Contract/Service"/>
                            <Tab value="workPackage" label="Work Package"/>
                            <Tab value="mision" label="Mission"/>
                            <Tab value="subMision" label="Sub Mission"/>
                    </Tabs>
                    <GestionContratoServicio style={{ width: '100%' }}/>
                    <GestionMisionPaqueteTrabajo style={{ width: '100%' }}/>
                    <Mision style={{ width: '100%' }}/>
                    <SubMision style={{ width: '100%' }}/>
                </Box>
            }
       
    />
    );
  }




//   const cambiarVisibilidadModalAssignedPeopleAPI = (valorNuevo, modoApertura) => dispatch(cambiarVisibilidadModalAssignedPeopleAPIAction(valorNuevo, modoApertura));