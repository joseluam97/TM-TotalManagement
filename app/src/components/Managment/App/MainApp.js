//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { getCookie } from 'app/js/generalFunctions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarValorTabPeopleAction

} from './store/actions'


import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction
} from '../../Managment/Users/store/actions'


//Modales importaciones
import App from './App'
import GroupRequeriments from './GroupRequeriments'

//**********************END_IMPORTACIONES ***********************/



export default function MainApp() {

  const [viewApp, setViewApp] = useState(true)

  const navigate = useNavigate();

  //obtener el state de Redux
  const valorTab = useSelector(state => state.fuse.gestionAplicationComponent.valorTabRequeriments)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  //creamos una función para hacer uso de Actions
  const dispatch = useDispatch()
  const cambiarValorTab = (valorTab) => dispatch(cambiarValorTabPeopleAction(valorTab))

  const cambiarEstado = (event, newValue) => {
    cambiarValorTab(newValue)
  }

  useEffect(() => {

    //GET USER
    /*dispatch(getSesionActualAPIAction({
      token: getCookie('token')
    }))*/
    //FIN GET USER

    //GET USER
    dispatch(getPermisosSesionActualAPIAction({
      token: getCookie('token')
    }))
    //FIN GET USER

  }, [])


  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view sub mision") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view user app") == undefined) {
        setViewApp(false)
      }
    }

  }, [personLoginPermisos])



  return (
    <>

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
              <Tab value="requeriments" label="Requeriments" />
              <Tab value="gruposRequerimientos" label="Requirement groups" />

            </Tabs>
            
            <App />
            <GroupRequeriments />
          
          </Box>
          
        }
      />
    </>
  )
}

