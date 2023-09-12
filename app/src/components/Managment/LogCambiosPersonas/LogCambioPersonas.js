//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GetAppIcon from '@mui/icons-material/GetApp';
import Tooltip from '@mui/material/Tooltip';
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from '@mui/icons-material/Update';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarContainer
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';

import _ from '@lodash';
import { useNavigate } from "react-router-dom";

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  mostrarLogPersonaAPIAction,
  mostrarLogPersonaReducerAPIAction,
  insertarLogPersonaAPIAction
} from './store/actions'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction,
  mostrarUserAPIAction
} from '../Users/store/actions'

import TableModules from '../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/


export default function LogPersona() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [allRecords, setAllRecords] = useState(false)
  const [numPagination, setNumPagination] = useState(100)
  const [disabledNewKpi, setDisabledNewKpi] = useState(true)
  const [disabledEditKpi, setDisabledEditKpi] = useState(true)
  const [disabledDeleteKpi, setDisabledDeleteKpi] = useState(true)

  //Obtener los states de Redux
  //kpiComponent
  const loading = useSelector(state => state.fuse.logPersonaComponent.loading)
  const logPersonaListAPI = useSelector(state => state.fuse.logPersonaComponent.logPersonaListAPI)
  const personLogPersonainPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  //Creamos funciones para hacer uso de Actions Redux
  const mostrarLogPersonaAPI = (iteracion) => dispatch(mostrarLogPersonaAPIAction(iteracion))
  const mostrarLogPersonaReducerAPI = (iteracion) => dispatch(mostrarLogPersonaReducerAPIAction(iteracion))
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const insertarLogPersonaAPI = (valor) => dispatch(insertarLogPersonaAPIAction(valor))

  const [resetStates, setResetStates] = useState(false);

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Person", accessor: "emailPersona", sortable: true, type: 'string' },
    { Header: "Date", accessor: "fecha_accion", sortable: true, type: 'date' },
    { Header: "Time", accessor: "hora_accion", sortable: true, type: 'time' },
    { Header: "Action", accessor: "accion", sortable: true, type: 'string' },
    { Header: "Description", accessor: "descripcion", sortable: true, type: 'string' }
  ]

  useEffect(() => {

    mostrarLogPersonaReducerAPI(1)

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

  }, [])

  useEffect(() => {

    if (personLogPersonainPermisos.length > 0 ) {

         if(personLogPersonainPermisos.find((item) => item['name'] == "Can view log cambios personas") == undefined){
           navigate('/')
         }

         if(personLogPersonainPermisos.find((item) => item['name'] == "Can add log cambios personas") == undefined){
           setDisabledNewKpi(false)
         }

         if(personLogPersonainPermisos.find((item) => item['name'] == "Can change log cambios personas") == undefined){
           setDisabledEditKpi(false)
         }

         if(personLogPersonainPermisos.find((item) => item['name'] == "Can delete log cambios personas") == undefined){
          setDisabledDeleteKpi(false)
        }


     }

  }, [personLogPersonainPermisos])


  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    function handleChange() {

    }

    return (
      <>
        <div>
          <div style={{ display: "inline" }}>
            <FormControl variant="standard" >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numPagination}
                label="Size"
                style={{ float: "right", position: "relative" }}
                onChange={e => { setNumPagination(e.target.value); }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ display: "inline", float: "right", position: "relative" }}>
            <Pagination
              color="primary"
              count={pageCount}
              page={page + 1}
              onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
          </div>
        </div>

      </>
    );
  }

  function botonesSuperiores() {
    return (
      <>
        <Tooltip title="Update" placement="top">
          <IconButton>
            <UpdateIcon variant="outlined" onClick={
              () => {
                setAllRecords(false)
                /*if(allRecords == true){
                  mostrarLogPersonaAPI(2)
                }
                else{
                  mostrarLogPersonaReducerAPI(2)
                }*/
              }
            }
            >
            </UpdateIcon>
          </IconButton>
        </Tooltip>
        
        <Tooltip title="All records" placement="top">
          <IconButton>
            <GetAppIcon variant="outlined" onClick={() => {
              setAllRecords(true)
              mostrarLogPersonaAPI(2)
            }}
            >
            </GetAppIcon>
          </IconButton>
        </Tooltip>

          <Divider />
      </>
    );
  }

  return (
    <>
      <FusePageCarded

        content={
          <Box sx={{ width: '100%' }}>

            <div style={{ width: '100%' }}>
              {botonesSuperiores()}
              <TableModules rowsProp={logPersonaListAPI} columnsProp={columnasDataTable} loading={loading}/>
            </div>
            <div style={allRecords == false ? { display: "block" } : { display: "none" }}>
              <h5><b>(*)Currently not all records are being displayed, to view the entire history click on "All records".</b></h5>
            </div>

          </Box>
        }
      />
    </>
  )
}

