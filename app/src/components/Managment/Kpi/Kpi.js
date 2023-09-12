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
import Tooltip from '@mui/material/Tooltip';
import store from "app/store/index"
import ModalInsertar from './modals/insertar.js'
import { getCookie } from 'app/js/generalFunctions'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from "@mui/icons-material/Delete";

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
  mostrarKpiAPIAction,
  cambiarValorSeleccionAction,
  cambiarVisibilidadModalInsertarKpiAPI,
  putKpiAPIAction,
  mostrarAllKpiAPIAction
} from './store/actions'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction,
  mostrarUserAPIAction
} from '../Users/store/actions'

import {
  mostrarMisionAPIAction
} from '../../Gestion/Mision/store/actions'

import TableModules from '../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/


export default function Kpi() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)
  const [disabledNewKpi, setDisabledNewKpi] = useState(true)
  const [disabledEditKpi, setDisabledEditKpi] = useState(true)
  const [disabledDeleteKpi, setDisabledDeleteKpi] = useState(true)

  //Obtener los states de Redux
  //kpiComponent
  const loading = useSelector(state => state.fuse.kpiComponent.loading)
  const kpiListAPI = useSelector(state => state.fuse.kpiComponent.kpiListAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.kpiComponent.filaSeleccionadaGrid)
  const visibilidadNewKpi = useSelector(state => state.fuse.kpiComponent.visibilidadNewKpi)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalInsertarUser = (valor, modoDialogUser) => dispatch(cambiarVisibilidadModalInsertarKpiAPI(valor, modoDialogUser))
  const mostrarCustomerAPI = () => dispatch(mostrarKpiAPIAction())
  const mostrarDivisionsAPI = () => dispatch(mostrarMisionAPIAction())
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const putKpiAPI = (valor, datos) => dispatch(putKpiAPIAction(valor, datos))
  const mostrarAllKpiAPI = () => dispatch(mostrarAllKpiAPIAction())

  const [resetStates, setResetStates] = useState(false);

  const columnasDataTable = [
    { Header: "Mission", accessor: "mision_name", sortable: true, type: 'list' },
    { Header: "Title", accessor: "titulo", sortable: true, type: 'string' },
    { Header: "Code", accessor: "codigo", sortable: true, type: 'string' },
    { Header: "Type", accessor: "tipo", sortable: true, type: 'list' },
    { Header: "Frequency", accessor: "tipoFrecuencia", sortable: true, type: 'list' }
  ]

  useEffect(() => {

    mostrarAllKpiAPI()

  }, [visibilidadNewKpi])

  useEffect(() => {

    mostrarDivisionsAPI()
    mostrarUserAPI()
    mostrarAllKpiAPI()

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

    mostrarCustomerAPI()

  }, [])

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view kpi") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add kpi") == undefined) {
        setDisabledNewKpi(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change kpi") == undefined) {
        setDisabledEditKpi(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete kpi") == undefined) {
        setDisabledDeleteKpi(false)
      }


    }

  }, [personLoginPermisos])

  function dedeleteKPI() {

    let kpiSeleccionadoElimina = kpiListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]

    if (kpiSeleccionadoElimina != undefined) {
      putKpiAPI(filaSeleccionadaGrid, {
        titulo: kpiSeleccionadoElimina.titulo,
        codigo: kpiSeleccionadoElimina.codigo,
        tipoFrecuencia: kpiSeleccionadoElimina.tipoFrecuencia,
        tipo: kpiSeleccionadoElimina.tipo,
        descripcion: kpiSeleccionadoElimina.descripcion,
        datos_usados: kpiSeleccionadoElimina.datos_usados,
        frecuencia: kpiSeleccionadoElimina.frecuencia,
        frecuenciaMensual: kpiSeleccionadoElimina.frecuenciaMensual,
        meses_afectados: kpiSeleccionadoElimina.meses_afectados,
        responsable: kpiSeleccionadoElimina.responsable,
        valor_aviso: kpiSeleccionadoElimina.valor_aviso,
        objetivo: kpiSeleccionadoElimina.objetivo,
        mision: kpiSeleccionadoElimina.mision,
        unidad: kpiSeleccionadoElimina.unidad,
        metodo_calculo: kpiSeleccionadoElimina.metodo_calculo,
        modoCalculo: kpiSeleccionadoElimina.modoCalculo,
        active: false
      })
    }

  }


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
        <Tooltip title="New" placement="top">
          <IconButton style={disabledNewKpi == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarUser(true, 'nuevo');
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Details" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true}>
            <FormatListBulletedIcon variant="outlined" onClick={() => {
              cambiarVisibilidadModalInsertarUser(true, 'consultar');
            }}
            >
            </FormatListBulletedIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditKpi == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
            <EditIcon variant="outlined" onClick={() => {
              cambiarVisibilidadModalInsertarUser(true, 'editar');
            }}
            >
            </EditIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true} style={disabledDeleteKpi == true ? { display: "inline" } : { display: "none" }}
            onClick={() => {

              dedeleteKPI()

            }}
          >
            <DeleteIcon />
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
              <TableModules rowsProp={kpiListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
            </div>

            <ModalInsertar />
          </Box>
        }
      />
    </>
  )
}

