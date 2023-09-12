//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import store from "app/store/index"
import NewUser from './modals/NewUser.js'
import UserPermissions from './modals/UserPermissions.js'
import { getCookie } from 'app/js/generalFunctions'
import Dialog from '@mui/material/Dialog';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  GridToolbar,
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
  mostrarAllUserAPIAction,
  cambiarValorSeleccionAction,
  getPermisosSesionActualAPIAction,
  putUserAPI,
  deleteRelacionesUserAPIAction
} from './store/actions'

import { cambiarVisibilidadModalInsertarUserAPI } from './store/actions.js'

import {
  mostrarContratoServicioAPIAction
} from '../../Gestion/ContratoServicio/store/actions'

import TableModules from '../../tables/TableModules'

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

/*import {

  cambiarVisibilidadModalPrincipalAction,
  mostrarRmRegistroAPIAction,
  cambiarEstadoRmRegistroAction

} from '../modals/RmRegistro/store/actions'*/




//Modales importaciones
/*import ModalInsertar from '../modals/insertar.js'
import ModalRmRegistroPrincipal from '../modals/RmRegistro/RmRegistro.js'
import ModalEliminar from '../modals/confirmacionEliminar.js'*/

//**********************END_IMPORTACIONES ***********************/
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';

export const PostList = () => (
  <List>
    <DataGrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="published_at" />
      <TextField source="category" />
      <TextField source="commentable" />
    </DataGrid>
  </List>
);

export default function Users() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const classes = useStyles();

  const [numPagination, setNumPagination] = useState(10)
  const [disabledNewUser, setDisabledNewUser] = useState(true)
  const [disabledEditUser, setDisabledEditUser] = useState(true)

  const [departamentoAsignado, setDepartamentoAsignado] = useState('')
  const [misionPermanete, setMisionPermanete] = useState('')
  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)
  const [modeDialogo, setModeDialogo] = useState('')

  const [visibleBaja, setVisibleBaja] = useState(false)
  const [visibleAlta, setVisibleAlta] = useState(false)

  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.userComponente.loading)
  const allUsersListAPI = useSelector(state => state.fuse.userComponente.allUsersListAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.userComponente.filaSeleccionadaGrid)
  const contractUserListAPIRespaldo = useSelector(state => state.fuse.userComponente.contractUserListAPIRespaldo)
  const visibilidadNewUser = useSelector(state => state.fuse.userComponente.visibilidadNewUser)
  const visibilidadInsertPermissions = useSelector(state => state.fuse.userComponente.visibilidadInsertPermissions)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalInsertarUser = (valor, modoDialogUser) => dispatch(cambiarVisibilidadModalInsertarUserAPI(valor, modoDialogUser))
  const mostrarAllUserAPI = () => dispatch(mostrarAllUserAPIAction())
  const putUser = (id, user) => dispatch(putUserAPI(id, user))
  const deleteRelacionesUserAPI = (id) => dispatch(deleteRelacionesUserAPIAction(id))

  const [resetStates, setResetStates] = useState(false);

  useEffect(() => {

    //COMPROBAR SI TIENE DEPARTAMENTO ASIGNADO Y MISION PERMANENTE
    if (filaSeleccionadaGrid != '') {
      let userSelect = allUsersListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]

      if (userSelect != undefined) {
        if (userSelect.is_active == true) {
          setVisibleAlta(false)
          setVisibleBaja(true)
        }
        if (userSelect.is_active == false) {
          setVisibleAlta(true)
          setVisibleBaja(false)
        }
      }
    }

  }, [filaSeleccionadaGrid])

  const columnasDataTable = [
    { Header: "Nº Identification", accessor: "IDidentification", sortable: true, type: 'string' },
    { Header: "First Name", accessor: "first_name", sortable: true, type: 'string' },
    { Header: "Last Name", accessor: "last_name", sortable: true, type: 'string' },
    { Header: "Email", accessor: "email", sortable: true, type: 'string' },
    { Header: "Phone", accessor: "phone", sortable: true, type: 'string' },
    { Header: "Organization", accessor: "organization", sortable: true, type: 'list' },
    { Header: "Role", accessor: "rolUser", sortable: true, type: 'list' }
  ]

  useEffect(() => {

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

    mostrarAllUserAPI()

  }, [])

  useEffect(() => {

    if (visibilidadNewUser != true || visibilidadInsertPermissions != true) {
      mostrarAllUserAPI()
    }

  }, [visibilidadNewUser, visibilidadInsertPermissions])

  function actualizarUsuario() {

    let userSelect = allUsersListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]

    if (userSelect != undefined) {
      //ACTUALIZAR USUARIO
      putUser(filaSeleccionadaGrid, {
        IDidentification: userSelect.IDidentification,
        first_name: userSelect.first_name,
        last_name: userSelect.last_name,
        organization: userSelect.organization,
        phone: userSelect.phone,
        email: userSelect.email,
        rolUser: userSelect.rolUser,
        is_active: userSelect.is_active == true ? false : true,
      })

      //ELIMINAR USUARIO DE TODOS LOS BLOQUES A LOS CUALES ESTA AÑADIDO
      if (userSelect.is_active == true) {
        deleteRelacionesUserAPI(filaSeleccionadaGrid)
      }

      //ACTUALIZAR EL LOGO DEL USER
      if (userSelect.is_active == false) {
        setVisibleAlta(false)
        setVisibleBaja(true)
      }
      if (userSelect.is_active == true) {
        setVisibleAlta(true)
        setVisibleBaja(false)
      }

    }

  }

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view user") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add user") == undefined) {
        setDisabledNewUser(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change user") == undefined) {
        setDisabledEditUser(false)
      }


    }

  }, [personLoginPermisos])

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
          <IconButton style={disabledNewUser == true ? { display: "inline" } : { display: "none" }}>
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
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {
              cambiarVisibilidadModalInsertarUser(true, 'consultar');
            }}

          >
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditUser == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
            <EditIcon variant="outlined" onClick={() => {
              cambiarVisibilidadModalInsertarUser(true, 'editar');
            }
            }
            >
            </EditIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Unsubscribe" placement="top">
          <IconButton style={visibleBaja == true && disabledEditUser == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {
              setVisibilidadDialogoConfirmacion(true)
              setModeDialogo('baja')
            }}

          >
            <LockIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Re-register" placement="top">
          <IconButton style={visibleAlta == true && disabledEditUser == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {
              setVisibilidadDialogoConfirmacion(true)
              setModeDialogo('alta')
            }}

          >
            <LockOpenIcon />
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
              <TableModules rowsProp={allUsersListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
            </div>

            <NewUser />
            <UserPermissions />
          </Box>
        }
      />

      <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Confirmation
        </DialogTitle>
        <DialogContent>
          {modeDialogo == "baja" ? "Are you sure you want to unsubscribe this user?" : "Are you sure you want to register this user?"}
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { actualizarUsuario(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

        </DialogActions>

      </Dialog>
    </>
  )
}

