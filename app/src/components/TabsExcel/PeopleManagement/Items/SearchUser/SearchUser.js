//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
//import * as React from 'react';

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
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
  mostrarAppAPIAction,
  mostrarGruposRequerimientosAPIAction
} from '../../../../Managment/App/store/actions'

//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'

import SelectRequeriment from './SelectRequeriment'
import ListUserSearch from './ListUserSearch'

//**********************END_IMPORTACIONES ***********************/

export default function SearchUser() {

  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)

  const [disabledNewApp, setDisabledNewApp] = useState(true)
  const [disabledEditApp, setDisabledEditApp] = useState(true)
  const [disabledRemoveApp, setDisabledRemoveApp] = useState(true)

  //obtener el state de Redux
  //staffUserComponente
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const listUserSearch = useSelector(state => state.fuse.staffUserComponente.listUserSearch)

  const appListAPI = useSelector(state => state.fuse.appComponent.appListAPI)
  const listGruposAPI = useSelector(state => state.fuse.gestionAplicationComponent.listGruposAPI)

  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const mostrarGruposRequerimientosAPI = () => dispatch(mostrarGruposRequerimientosAPIAction())

  //creamos una función para hacer uso de Actions
  const dispatch = useDispatch()
  useEffect(() => {
    mostrarAppAPI()
    mostrarGruposRequerimientosAPI()
  }, [])

  useEffect(() => {

  }, [personLogin])

  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add user app") == undefined) {
        setDisabledNewApp(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change user app") == undefined) {
        setDisabledEditApp(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete user app") == undefined) {
        setDisabledRemoveApp(false)
      }

    }

  }, [personLoginPermisos])

  return (
    <>

      <FusePageCarded

        content={
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} columns={10}>

              <Grid item xs={3}>

                <SelectRequeriment />

              </Grid>

              <Grid item xs>
                <ListUserSearch />

              </Grid>
            </Grid>

          </Box>

        }
      />
    </>
  )
}

