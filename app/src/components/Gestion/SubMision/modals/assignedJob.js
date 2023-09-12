//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { showMessage } from 'app/store/fuse/messageSlice'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import { matchRoutes, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarVisibilidadModalTrabajoAPIAction,
  getAllJobAPIAction,
  postJobSubMisionAPIAction,
  putJobSubMisionAPIAction,
  obtenerPersonalAsignadoContratoAPIAction,
  obtenerContractAppAPIAction
} from '../store/actions'

//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});


const modulos = [
  'Risk',
  'Users',
];


export default function assignedPeople() {

  const location = useLocation();
  const { pathname } = location;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [modoGestionDialogo, setModoGestionDialogo] = useState('nuevo')
  const [jobEditar, setJobEditar] = useState('')

  const [subMisionSelect, setSubMisionSelect] = useState('')
  const [botonControl, setBotonControl] = useState(true)
  const [nombreSelect, setNombreSelect] = useState('')
  const [codeSelect, setCodeSelect] = useState('')
  const [estamosDepartamento, setEstamosDepartamento] = useState(false);

  const [disabledAddJob, setDisabledAddJob] = useState(true)
  const [disabledEditJob, setDisabledEditJob] = useState(true)
  const [disabledDeleteJob, setDisabledDeleteJob] = useState(true)

  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)

  const visibilidadModalAssignedPeople = useSelector(state => state.fuse.subMisionComponent.visibilidadModalGestionTrabajos)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.subMisionComponent.filaSeleccionadaGrid)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const listSubMisionAPI = useSelector(state => state.fuse.subMisionComponent.listSubMisiones)
  const listJobSubMision = useSelector(state => state.fuse.subMisionComponent.listJobSubMision)
  const listPeopleContrato = useSelector(state => state.fuse.subMisionComponent.listPeopleContratoAPI)
  const listContractApp = useSelector(state => state.fuse.subMisionComponent.listContractApp)

  const cambiarVisibilidadModalTrabajoAPI = (valorNuevo, modoApertura) => dispatch(cambiarVisibilidadModalTrabajoAPIAction(valorNuevo, modoApertura))
  const getAllJobAPI = (idSubMision) => dispatch(getAllJobAPIAction(idSubMision))
  const postJobSubMisionAPI = (idSubMision) => dispatch(postJobSubMisionAPIAction(idSubMision))
  const putJobSubMisionAPI = (idSubMision, data, modoPut) => dispatch(putJobSubMisionAPIAction(idSubMision, data, modoPut))
  const obtenerPersonalAsignadoContratoAPI = (idContrato) => dispatch(obtenerPersonalAsignadoContratoAPIAction(idContrato))
  const obtenerContractAppAPI = (datos) => dispatch(obtenerContractAppAPIAction(datos))

  const [varMenu, setVarMenu] = useState(null);
  const detallesAbierto = Boolean(varMenu);
  const menuClick = (event) => {
    setVarMenu(event.currentTarget);
  };
  const menuClose = () => {
    setVarMenu(null);
  };

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add job in sub mision") == undefined) {
        setDisabledAddJob(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change job in sub mision") == undefined) {
        setDisabledEditJob(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete job in sub mision") == undefined) {
        setDisabledDeleteJob(false)
      }

    }

  }, [personLoginPermisos])

  useEffect(() => {
    
  }, [personLogin, visibilidadModalAssignedPeople])

  useEffect(() => {

    if (nombreSelect != '' && codeSelect != '') {
      setBotonControl(false)
    }
    else {
      setBotonControl(true)
    }

  })

  useEffect(() => {
    //COMPROBAR SI ESTAMOS EN DEPARTAMENTO
    if (pathname == "/pages/gestiones/department") {
      setEstamosDepartamento(true)
    }

  }, []);

  useEffect(() => {

    if (filaSeleccionadaGrid != '') {
      let subMisionSelected = listSubMisionAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]
      if (subMisionSelected != undefined) {
        setSubMisionSelect(subMisionSelected)
        obtenerPersonalAsignadoContratoAPI(filaSeleccionadaGrid)
        obtenerContractAppAPI(filaSeleccionadaGrid)
      }
      getAllJobAPI(filaSeleccionadaGrid)
    }

  }, [filaSeleccionadaGrid, listSubMisionAPI]);


  function nuevoPuestoTrabajo() {
    if (nombreSelect != "Manager" && nombreSelect != "manager") {
      if (modoGestionDialogo == "nuevo") {
        postJobSubMisionAPI({
          name: nombreSelect,
          code: codeSelect,
          sub_mision: subMisionSelect.id,
          active: true
        })
      }
      if (modoGestionDialogo == "editar") {
        putJobSubMisionAPI(jobEditar.id, {
          name: nombreSelect,
          code: codeSelect,
          sub_mision: subMisionSelect.id,
          active: true
        }, "editar")
      }
    }
    else {
      dispatch(
        showMessage({
          message: "The name Manager is a reserved word, it cannot be used as a position name.",
          variant: "error"
        })
      )
    }
  }

  function editarJob() {

    setModoGestionDialogo("editar")

    setCodeSelect(jobEditar['code'])
    setNombreSelect(jobEditar['name'])
  }

  function comprobarDeleteJob() {
    let existePersona = listPeopleContrato.filter(elemento => elemento.job_employee_id == jobEditar['id'])
    let existeApp = listContractApp.filter(elemento => elemento.job == jobEditar['id'])
    if (existePersona.length == 0 && existeApp.length == 0) {
      deleteJob()
    }
    else {
      let cadena = ""
      if (existePersona.length != 0 && existeApp.length != 0) {
        cadena = "There are employees and applications assigned to this position, before eliminating it, resolve these conflicts."
      }
      else {
        if (existePersona.length != 0) {
          cadena = "There are employees assigned to this position, before eliminating it, place these employees in other positions."
        }
        if (existeApp.length != 0) {
          cadena = "There are applications assigned to this workstation, before deleting it, delete the applications."
        }
      }
      dispatch(
        showMessage({
          message: cadena,
          variant: "error"
        })
      )


    }
  }

  function deleteJob() {
    putJobSubMisionAPI(jobEditar['id'], {
      name: jobEditar['name'],
      code: jobEditar['code'],
      sub_mision: jobEditar['sub_mision'],
      active: false
    }, "delete")
  }

  const handleChange = (event) => {

  };

  function resetValores() {
    setModoGestionDialogo('nuevo')
    setJobEditar('')

    //setSubMisionSelect('')
    setNombreSelect('')
    setCodeSelect('')
  }

  return (
    <Dialog open={visibilidadModalAssignedPeople} onClose={() => cambiarVisibilidadModalTrabajoAPI(false, '')} fullWidth maxWidth='lg'>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        Assign position to {estamosDepartamento == true ? 'technician' : 'sub mision'}
      </DialogTitle>
      <DialogContent>
        <Alert severity="info" style={{ marginBottom: '5px'}}>
          <AlertTitle>The role "Manager" corresponds to the person in charge of the {estamosDepartamento == true ? 'technician' : 'sub mision'} in which we are, this position must always be occupied by a person and is not editable.</AlertTitle>
        </Alert>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2} columns={16}>
          <Grid
            item xs={disabledAddJob == true ? 6 : 15}>

            <div style={{ width: '100%', textAlign: 'center', marginBottom: '2%', display: listJobSubMision.length != 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                POSITIONS ASSIGNED IN THE {estamosDepartamento == true ? 'TECHNICIAN' : 'SUB MISION'}
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center', display: listJobSubMision.length == 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                There are no positions assigned to this {estamosDepartamento == true ? 'technician' : 'sub mision'}
              </span>
            </div>

            {listJobSubMision.map((nomModulo) => {
              return (
                <ListItem
                  className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                  sx={{ bgcolor: 'background.paper' }}
                  //sx={{ backgroundColor: '#00BD4B' }}
                  button
                >
                  <ListItemText classes={{ root: 'm-0', primary: 'truncate' }} primary={nomModulo['code'] + " " + nomModulo['name']} />
                  <ListItemIcon className="min-w-40 -ml-10 mr-8" style={{ display: nomModulo['name'] == "Manager" ? 'none' : 'block' }}>
                    {/*SOLO SE PERMITE ELIMINAR LOS ROLES DIFERENTES A Manager*/}
                    <Tooltip title="Edit" placement="top">
                      <Button
                        id="basic-button"
                        aria-controls={detallesAbierto ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={detallesAbierto ? 'true' : undefined}
                        style={disabledEditJob == true || disabledDeleteJob == true ? { display: "block" } : { display: "none" }}
                        onClick={(event) => {
                          menuClick(event),
                            setJobEditar(nomModulo)
                        }}
                      >
                        {/*ICONO DEL BOTON */}
                        <MoreVertIcon />
                        {/*ICONO DEL BOTON */}
                      </Button>
                    </Tooltip>

                    {/*MENU DE GESTION DE PERFILES*/}
                    <Menu
                      id="basic-menu"
                      anchorEl={varMenu}
                      open={detallesAbierto}
                      onClose={menuClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem style={disabledEditJob ? { display: "block" } : { display: "none" }}
                        onClick={() => {
                          editarJob()
                          setVarMenu(null);
                        }}>Edit Position</MenuItem>
                      <MenuItem style={disabledDeleteJob ? { display: "block" } : { display: "none" }}
                        onClick={() => {
                          //deleteJob()
                          setVisibilidadDialogoConfirmacion(true)
                          setVarMenu(null);

                        }}>Remove from group</MenuItem>
                    </Menu>
                    {/*FIN MENU DE GESTION DE PERFILES */}
                  </ListItemIcon>


                </ListItem>
              );
            })}

          </Grid>

          <Divider style={disabledAddJob == true ? { display: "block" } : { display: "none" }} orientation="vertical" flexItem />

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={disabledAddJob == true ? { display: "" } : { display: "none" }}
            item xs={9}>

            <div style={{ width: '100%', textAlign: 'center', marginBottom: '2%' }}>
              <span className="font-semibold">
                {modoGestionDialogo == "nuevo" ? estamosDepartamento == true ? 'NEW TECHNICIAN POSITION' : 'NEW SUB MISION POSITION' : estamosDepartamento == true ? 'EDIT TECHNICIAN POSITION' : 'EDIT SUB MISION POSITION'}
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <TextField
              label="Code"
              id="code"
              value={codeSelect}
              size="small"
              sx={{ m: 1, width: '50ch' }}
              onChange={e => setCodeSelect(e.target.value)}
            />

            <TextField
              label="Name"
              id="nombre"
              value={nombreSelect}
              size="small"
              sx={{ m: 1, width: '50ch' }}
              onChange={e => setNombreSelect(e.target.value)}
            />

            <Button
              style={modoGestionDialogo == "nuevo" ? { display: 'none' } : { display: 'inline' }}
              className="ml-8"
              variant="contained"
              sx={{ m: 1, width: '25ch' }}
              color="error"
              onClick={() => {
                resetValores()
              }}
            >
              CANCEL

            </Button>

            <Button
              disabled={botonControl}
              sx={modoGestionDialogo == "nuevo" ? { width: '50ch', m: 1 } : { width: '25ch', m: 1 }}
              className="ml-8"
              variant="contained"
              color="secondary"
              onClick={() => {
                nuevoPuestoTrabajo()
                resetValores()
              }}
            >
              {modoGestionDialogo == "nuevo" ? 'ASSIGN' : 'UPDATE'}

            </Button>


          </Grid>
        </Grid>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => cambiarVisibilidadModalTrabajoAPI(false, '')}>Close</Button>
      </DialogActions>

      <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to remove the position?
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { comprobarDeleteJob(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

        </DialogActions>

      </Dialog>
    </Dialog>
  )
}

