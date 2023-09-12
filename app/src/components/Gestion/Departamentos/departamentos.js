//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//Componentes genéricos importaciones
import DireccionDepartamental from './DireccionDepartamental.js'
import Departamento from './Departamento'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
    cambiarValorTabDepartamentoAction
} from './store/actions'

import {
    getPermisosSesionActualAPIAction
} from '../../Managment/Users/store/actions'

import { useNavigate } from "react-router-dom";

//Redux importaciones
import store from "app/store/index"
import {getCookie} from 'app/js/generalFunctions'

//**********************END_IMPORTACIONES ***********************/


function departamentos() {

    const [viewDivision, setViewDivision] = useState(true)
    const [viewPrograma, setViewPrograma] = useState(true)
    const [viewConjunto, setViewConjunto] = useState(true)
    const [viewSubConjunto, setViewSubConjunto] = useState(true)

    const navigate = useNavigate();

    //obtener el state de Redux
    const valorTab = useSelector (state => state.fuse.departamentoViewComponente.valorTabDepartamento)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

    //creamos una función para hacer uso de Actions
    const dispatch = useDispatch()
    const cambiarValorTab = (valorTab) => dispatch(cambiarValorTabDepartamentoAction(valorTab))
    
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

        if(personLoginPermisos.find((item) => item['name'] == "Can view division") != undefined){
            setViewDivision(false)
        }

        if(personLoginPermisos.find((item) => item['name'] == "Can view division") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view sub division") == undefined){
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
                        <Tab value="direccionDepartamental" label="Departmental Directorate" />
                        <Tab value="departamentos" label="Departments" />
                            
                    </Tabs>
                    <Departamento />
                    <DireccionDepartamental />

                </Box>
            }

          
       
    />
    );
  }

  export default departamentos