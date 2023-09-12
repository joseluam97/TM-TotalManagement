//**********************IMPORTACIONES****************************
import * as React from 'react';
import { useEffect, useState, useRef } from 'react'
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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import { matchRoutes, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarVisibilidadModalAssignedPeopleAPIAction,
  obtenerPersonalAsignadoContratoAPIAction,
  postPersonalAsignadoContratoAPIAction,
  obtenerContractAppAPIAction,
  getSubMisionAPIAction,
  deleteContractUserAPIAction,
  getAllJobAPIAction,
  putPersonalAsignadoContratoAPIAction
} from '../store/actions'

import {
  mostrarUserAppAPIAction
} from '../../../TabsExcel/PeopleManagement/Items/Aplications/store/actions'

import {
  getResponsablesMisionAsociadaSubMisionAPIAction
} from '../../../TabsExcel/PeopleManagement/store/actions'

import {
  mostrarContratoServicioAPIAction
} from '../../ContratoServicio/store/actions'

import {
  mostrarUserAPIAction,
  obtenerContratosUserAPIAction
} from '../../../Managment/Users/store/actions'

import {
  insertarLogPersonaAPIAction
} from '../../../Managment/LogCambiosPersonas/store/actions'

import {
  mostrarAppAPIAction
} from '../../../Managment/App/store/actions'

import {
  insertarNewPeticionRequerimientoAPIAction
} from '../../../Managment/PeticionRequeriments/store/actions'

import CambioUserSubMision from '../../Componentes/CambioUserSubMision'

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
  const [usuarioEditar, setUsuarioEditar] = useState('')
  const [cambioUsuarioSubMision, setCambioUsuarioSubMision] = useState(false)

  const [userSelect, setUserSelect] = useState('')
  const [subMisionSelect, setSubMisionSelect] = useState('')
  const [jobSelect, setJobSelect] = useState('')
  const [estadoSelect, setEstado] = useState('')
  const [botonControl, setBotonControl] = useState(true)
  const [nombreContrato, setNombreContrato] = useState('')
  const [userAnadidoContrato, setUserAnadidoContrato] = useState([])
  const [estamosDepartamento, setEstamosDepartamento] = useState(false);
  const [valueTab, setValueTab] = useState("Permanent");

  const [disabledAddUser, setDisabledAddUser] = useState(true)
  const [disabledEditUser, setDisabledEditUser] = useState(true)
  const [disabledDeleteUser, setDisabledDeleteUser] = useState(true)

  const appListAPI = useSelector(state => state.fuse.gestionAplicationComponent.appListAPI)
  const visibilidadModalAssignedPeople = useSelector(state => state.fuse.subMisionComponent.visibilidadModalAssignedPeople)
  const listPeopleContrato = useSelector(state => state.fuse.subMisionComponent.listPeopleContratoAPI)
  const deleteUserSubMision = useSelector(state => state.fuse.subMisionComponent.deleteUserSubMision)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.subMisionComponent.filaSeleccionadaGrid)
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const listContractApp = useSelector(state => state.fuse.subMisionComponent.listContractApp)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const modoApertura = useSelector(state => state.fuse.subMisionComponent.modoApertura)
  const listSubMisionAPI = useSelector(state => state.fuse.subMisionComponent.listSubMisiones)
  const contractUserList = useSelector(state => state.fuse.userComponente.contractUserListAPI)
  const contractUserListAPIRespaldo = useSelector(state => state.fuse.userComponente.contractUserListAPIRespaldo)
  const listJobSubMision = useSelector(state => state.fuse.subMisionComponent.listJobSubMision)
  const listTeams = useSelector(state => state.fuse.subMisionComponent.listTeams)
  const subMisionSelectMyTeam = useSelector(state => state.fuse.peopleManagementComponente.subMisionSelectMyTeam)
  const listAllMisionAPI = useSelector(state => state.fuse.misionComponent.listAllMisionAPI)
  //ID DEL USUARIO SELECCIONADO DE LA LISTA DE SUB MISIONES
  const memberSelectSubMision = useSelector(state => state.fuse.peopleManagementComponente.memberSelectSubMision)
  //VALUE DE SUB MISION SELECCIONADA EN LA GESTION DE ESTRUCTURA
  const setSubMisionSeleccionadaEstructura = useSelector(state => state.fuse.peopleManagementComponente.setSubMisionSeleccionadaEstructura)

  const listResponsablesSubMision = useSelector(state => state.fuse.peopleManagementComponente.listResponsablesSubMision)

  const cambiarVisibilidadModalAssignedPeopleAPI = (valorNuevo, modoApertura) => dispatch(cambiarVisibilidadModalAssignedPeopleAPIAction(valorNuevo, modoApertura))
  const obtenerPersonalAsignadoContratoAPI = (idContrato) => dispatch(obtenerPersonalAsignadoContratoAPIAction(idContrato))
  const mostrarContratoServicioAPI = () => dispatch(mostrarContratoServicioAPIAction())
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const postPersonalAsignadoContratoAPI = (datos, mensajeSINO, subMisionBusqueda) => dispatch(postPersonalAsignadoContratoAPIAction(datos, mensajeSINO, subMisionBusqueda))
  const deleteContractUserAPI = (datos) => dispatch(deleteContractUserAPIAction(datos))
  const obtenerContratosUserAPI = (idPersona, modo) => dispatch(obtenerContratosUserAPIAction(idPersona, modo))
  const obtenerContractAppAPI = (datos) => dispatch(obtenerContractAppAPIAction(datos))
  const mostrarUserAppAPI = (datos) => dispatch(mostrarUserAppAPIAction(datos))
  const getResponsablesMisionAsociadaSubMisionAPI = (idSubMision) => dispatch(getResponsablesMisionAsociadaSubMisionAPIAction(idSubMision))
  const getAllJobAPI = (idSubMision) => dispatch(getAllJobAPIAction(idSubMision))
  const putPersonalAsignadoContratoAPI = (idPersona, data) => dispatch(putPersonalAsignadoContratoAPIAction(idPersona, data))
  const insertarLogPersonaAPI = (logAdd) => dispatch(insertarLogPersonaAPIAction(logAdd))
  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const insertarNewPeticionRequerimientoAPI = (data) => dispatch(insertarNewPeticionRequerimientoAPIAction(data))

  const [varMenu, setVarMenu] = useState(null);
  const detallesAbierto = Boolean(varMenu);
  const menuClick = (event) => {
    setVarMenu(event.currentTarget);
  };
  const menuClose = () => {
    setVarMenu(null);
  };

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add contractuser") == undefined) {
        setDisabledAddUser(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change contractuser") == undefined) {
        setDisabledEditUser(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete contractuser") == undefined) {
        setDisabledDeleteUser(false)
      }

    }

  }, [personLoginPermisos])

  useEffect(() => {
    obtenerContratosUserAPI(personLogin.id, "1")
  }, [personLogin, visibilidadModalAssignedPeople])

  useEffect(() => {

    if (userSelect != null && subMisionSelect != null && estadoSelect != "") {
      if (userSelect.id != undefined && subMisionSelect.id != undefined) {
        setBotonControl(false)
      }
      else {
        setBotonControl(true)
      }
    }

  })

  useEffect(() => {
    mostrarAppAPI()
  }, []);

  useEffect(() => {

    if (visibilidadModalAssignedPeople == true) {
      setModoGestionDialogo('nuevo')

      mostrarContratoServicioAPI()
      mostrarUserAPI()

      //mostrarUserAppAPI(personLogin.id)

      //COMPROBAR SI ESTAMOS EN DEPARTAMENTO
      if (pathname == "/pages/gestiones/department") {
        setEstamosDepartamento(true)
      }
    }

  }, [visibilidadModalAssignedPeople]);

  useEffect(() => {

    if (listTeams != undefined && listJobSubMision != undefined && modoApertura == "miEquipoEdit") {
      let userSelectEdit = listTeams.filter(option => option.id == memberSelectSubMision)[0]
      let jobSelect = listJobSubMision.filter(option => option.id == userSelectEdit['job_employee_id'])[0]
      setJobSelect(jobSelect)
    }


  }, [listJobSubMision]);

  useEffect(() => {

    if (deleteUserSubMision != '') {
      obtenerPersonalAsignadoContratoAPI(deleteUserSubMision)
    }

  }, [deleteUserSubMision]);

  useEffect(() => {

    if (filaSeleccionadaGrid != '' && modoApertura == "newSubMision") {
      let subMisionSelectedAsigned = listSubMisionAPI.filter(option => option.id == filaSeleccionadaGrid)[0]
      setSubMisionSelect(subMisionSelectedAsigned)
      obtenerPersonalAsignadoContratoAPI(filaSeleccionadaGrid)
      getAllJobAPI(filaSeleccionadaGrid)
    }

    if (modoApertura == "miEquipo") {

      let subMisionSelectedAsigned = contractUserList.filter(option => option.id == subMisionSelectMyTeam.id)[0]
      setSubMisionSelect(subMisionSelectedAsigned)

    }

    if (modoApertura == "miEquipoEdit") {

      let userSelectEdit = listTeams.filter(option => option.id == memberSelectSubMision)[0]
      setModoGestionDialogo('editar')

      setUserSelect(userSelectEdit)
      let subMisionSelectedAsigned = contractUserList.filter(option => option.id == userSelectEdit['subMision_id'])[0]
      setSubMisionSelect(subMisionSelectedAsigned)
      setEstado(userSelectEdit['rol_employee'])

      getAllJobAPI(userSelectEdit['subMision_id'])
    }

    if (modoApertura == "miEquipoEstructura") {
      //setSubMisionSeleccionadaEstructura

      setSubMisionSelect(setSubMisionSeleccionadaEstructura)

      getAllJobAPI(setSubMisionSeleccionadaEstructura['id'])
    }

  }, [filaSeleccionadaGrid, modoApertura, listSubMisionAPI]);

  useEffect(() => {

    setUserSelect('')
    userAnadidoContrato.splice(0, userAnadidoContrato.length)

    listPeopleContrato.map((person) => {
      userAnadidoContrato.push(person['email'])
    })

  }, [listPeopleContrato]);

  useEffect(() => {

    if (subMisionSelect != undefined && subMisionSelect != '') {
      obtenerContractAppAPI(subMisionSelect.id)
      getResponsablesMisionAsociadaSubMisionAPI(subMisionSelect.id)
      getAllJobAPI(subMisionSelect.id)
    }

  }, [subMisionSelect]);

  useEffect(() => {

    if (userSelect != undefined && userSelect != '') {
      mostrarUserAppAPI(userSelect.id)
      obtenerContratosUserAPI(userSelect.id, "2")
    }

  }, [userSelect]);


  function mensajeEmergente(msg, variant) {
    dispatch(
      showMessage({
        message: msg,
        variant: variant
      })
    )
  }

  function anadirPersonaMision() {

    if (modoGestionDialogo == "nuevo") {
      if (modoApertura == "newSubMision") {
        postPersonalAsignadoContratoAPI({
          user_id: userSelect.id,
          subMision_id: subMisionSelect.id,
          rol_employee: estadoSelect,
          job: jobSelect.id
        }, true, subMisionSelect.id)
      }
      else {
        postPersonalAsignadoContratoAPI({
          user_id: userSelect.id,
          subMision_id: subMisionSelect.id,
          rol_employee: estadoSelect,
          job: jobSelect.id
        }, true, subMisionSelect.id)
      }

      insertarLogPersonaAPI({
        persona: userSelect.id,
        fecha_accion: new Date().toISOString().split("T")[0],
        hora_accion: new Date().toLocaleTimeString(),
        accion: "Add",
        subMision_relacionada: subMisionSelect.id,
        descripcion: "User with IDidentification:" + userSelect.IDidentification + " added to Sub Mission: " + subMisionSelect.name + " as " + jobSelect.name
      })
    }

    if (modoGestionDialogo == "editar") {
      //GET CHANGE EN SUBMISION
      let userSelectEdit = listTeams.filter(option => option.id == memberSelectSubMision)[0]
      let subMisionIDSelect
      if (subMisionSelect.id != undefined) {
        subMisionIDSelect = subMisionSelect.id
      }
      else {
        subMisionIDSelect = subMisionSelect
      }
      if (modoApertura != "newSubMision") {
        if (userSelectEdit['subMision_id'] != subMisionIDSelect) {
          putPersonalAsignadoContratoAPI(userSelect['contractUserId'], {
            user_id: userSelect.id,
            subMision_id: subMisionSelect.id,
            rol_employee: estadoSelect,
            job: ''
          })
        }
        else {
          putPersonalAsignadoContratoAPI(userSelect['contractUserId'], {
            user_id: userSelect.id,
            subMision_id: subMisionSelect.id,
            rol_employee: estadoSelect,
            job: jobSelect.id
          })
        }
      }
      else {
        putPersonalAsignadoContratoAPI(userSelect['contractUserId'], {
          user_id: userSelect.id,
          subMision_id: subMisionSelect.id,
          rol_employee: estadoSelect,
          job: jobSelect.id
        })
      }


    }

    let necesitaNuevasApp = false
    let vectorAcreditacionesFaltan = []
    if (listUserApp.length != 0 || listContractApp.length != 0) {
      for (let elemento in listContractApp) {

        if (jobSelect.id == listContractApp[elemento]['job']) {
          let resultadoOperacion = listUserApp.filter(registro => registro.aplication_user_id == listContractApp[elemento]['aplication_app_id'])[0]

          if (resultadoOperacion == undefined) {
            necesitaNuevasApp = true
            vectorAcreditacionesFaltan.push(listContractApp[elemento])
          }
          else {
            //SI ENCUENTRA LA APP TENGO QUE VER SI TIENE EL ESTADO CORRECTO
            //resultadoOperacion => elemento del userApp
            //listContractApp[elemento] => elemento del contractApp
            //requerimientoSeleccionado => requeriment select
            let requerimientoSeleccionado = appListAPI.filter(elemento => elemento.id == resultadoOperacion.aplication_user_id)[0]
            if (requerimientoSeleccionado.tiene_valor == true) {
              if (requerimientoSeleccionado.tipo_valor == "List") {
                let elementosList = requerimientoSeleccionado.listado_opciones.split(',')
                let indiceUsuario = elementosList.indexOf(resultadoOperacion.valor_asignado)
                let indiceBloque = elementosList.indexOf(listContractApp[elemento].valor_asignado)

                switch (listContractApp[elemento].operacion_logica) {
                  case 1:
                    //indiceUsuario < indiceBloque
                    if (indiceUsuario >= indiceBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 2:
                    //indiceUsuario <= indiceBloque
                    if (indiceUsuario > indiceBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 3:
                    //indiceUsuario == indiceBloque
                    if (indiceUsuario != indiceBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 4:
                    //indiceUsuario >= indiceBloque
                    if (indiceUsuario < indiceBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 5:
                    //indiceUsuario > indiceBloque
                    if (indiceUsuario <= indiceBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 6:
                    //indiceUsuario != indiceBloque
                    if (indiceUsuario == indiceBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                }
              }
              if (requerimientoSeleccionado.tipo_valor == "Date") {
                let fechaHoy = new Date()
                fechaHoy.setDate(fechaHoy.getDate() + listContractApp[elemento].diferencia_fecha)
                let fechaUsuario = new Date(resultadoOperacion.valor_asignado_fecha)
                var day_as_milliseconds = 86400000;
                var diff_in_millisenconds = fechaUsuario - fechaHoy;
                var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

                if (diff_in_days < 0) {
                  //HAY INCIDENCIA
                  necesitaNuevasApp = true
                  vectorAcreditacionesFaltan.push(listContractApp[elemento])
                }
              }
              if (requerimientoSeleccionado.tipo_valor == "Number") {
                let numeroUsuario = parseInt(resultadoOperacion.valor_comparacion)
                let numeroBloque = parseInt(listContractApp[elemento].valor_comparacion)

                switch (listContractApp[elemento].operacion_logica) {
                  case 1:
                    //numeroUsuario < numeroBloque
                    if (numeroUsuario >= numeroBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 2:
                    //numeroUsuario <= numeroBloque
                    if (numeroUsuario > numeroBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 3:
                    //numeroUsuario == numeroBloque
                    if (numeroUsuario != numeroBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 4:
                    //numeroUsuario >= numeroBloque
                    if (numeroUsuario < numeroBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 5:
                    //numeroUsuario > numeroBloque
                    if (numeroUsuario <= numeroBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                  case 6:
                    //numeroUsuario != numeroBloque
                    if (numeroUsuario == numeroBloque) {
                      //HAY INCIDENCIA
                      necesitaNuevasApp = true
                      vectorAcreditacionesFaltan.push(listContractApp[elemento])
                    }
                    break;
                }
              }
            }
          }
        }
      }

    }

    if (necesitaNuevasApp == true) {
      //ENVIO DE CORRREOS
      let mensajeAcreditacion = "User " + userSelect.first_name + " " + userSelect.last_name + " has been registered in the contract: " + subMisionSelect.name + " and needs new requirements. \n"
      mensajeAcreditacion = mensajeAcreditacion + "Missing user requirements: \n"
      for (let elementoFalta in vectorAcreditacionesFaltan) {
        mensajeAcreditacion = mensajeAcreditacion + vectorAcreditacionesFaltan[elementoFalta]['aplication_app_id_code'] + " - " + vectorAcreditacionesFaltan[elementoFalta]['aplication_app_id_name'] + "\n"
      }
      insertarNewPeticionRequerimientoAPI({
        persona: userSelect.id,
        fecha_accion: new Date().toISOString().split("T")[0],
        hora_accion: new Date().toLocaleTimeString(),
        descripcion: mensajeAcreditacion,
        active: true
      })
    }


    resetValues()

    if (modoApertura == "miEquipoEdit" || modoApertura == "miEquipo" || modoApertura == "miEquipoEstructura") {
      cambiarVisibilidadModalAssignedPeopleAPI(false, '')
    }

  }

  function resetValues() {
    setUserSelect('')
    setJobSelect('')
    setEstado('')
    setUsuarioEditar('')
    setModoGestionDialogo('nuevo')
  }

  function assignarPersona() {

    if (modoGestionDialogo == "editar") {
      if (estadoSelect == "permanent") {
        let estadoContrato = contractUserListAPIRespaldo.filter(registro => registro.rol_employee == "permanent" && registro.id != subMisionSelect.id)[0]

        if (estadoContrato != undefined) {
          mensajeEmergente("The user is already added in another sub mission as permanent", "error")
        }
        else {
          //GET CHANGE EN SUBMISION
          let userSelectEdit = listTeams.filter(option => option.id == memberSelectSubMision)[0]
          let subMisionIDSelect
          if (subMisionSelect.id != undefined) {
            subMisionIDSelect = subMisionSelect.id
          }
          else {
            subMisionIDSelect = subMisionSelect
          }

          if (modoApertura == "miEquipoEdit" && userSelectEdit['subMision_id'] != subMisionIDSelect) {
            //COMPROBACION QUE USER NO ESTA AÑADIDO A CONTRATO YA
            let existeContrato = contractUserListAPIRespaldo.filter(registro => registro.id == subMisionSelect.id)[0]

            if (existeContrato != undefined) {
              mensajeEmergente("The user is already added to the sub mission", "error")
            }
            else {
              anadirPersonaMision()
            }
          }
          else {
            anadirPersonaMision()
          }
        }
      }
      else {
        //GET CHANGE EN SUBMISION
        let userSelectEdit = listTeams.filter(option => option.id == memberSelectSubMision)[0]
        let subMisionIDSelect
        if (subMisionSelect.id != undefined) {
          subMisionIDSelect = subMisionSelect.id
        }
        else {
          subMisionIDSelect = subMisionSelect
        }
        //FIN GET CHANGE EN SUBMISION

        if (modoApertura == "miEquipoEdit" && userSelectEdit['subMision_id'] != subMisionIDSelect) {
          //COMPROBACION QUE USER NO ESTA AÑADIDO A CONTRATO YA
          let existeContrato = contractUserListAPIRespaldo.filter(registro => registro.id == subMisionSelect.id)[0]

          if (existeContrato != undefined) {
            mensajeEmergente("The user is already added to the sub mission", "error")
          }
          else {
            anadirPersonaMision()
          }
        }
        else {
          anadirPersonaMision()
        }
      }
    }


    if (modoGestionDialogo == "nuevo") {

      //COMPROBACION QUE USER NO ESTA AÑADIDO A CONTRATO YA
      let existeContrato = contractUserListAPIRespaldo.filter(registro => registro.id == subMisionSelect.id)[0]

      if (existeContrato != undefined) {
        mensajeEmergente("The user is already added to the sub mission", "error")
      }
      else {
        if (estadoSelect == "permanent") {
          let estadoContrato = contractUserListAPIRespaldo.filter(registro => registro.rol_employee == "permanent")[0]

          if (estadoContrato != undefined) {
            mensajeEmergente("The user is already added in another sub mission as permanent", "error")
          }
          else {
            anadirPersonaMision()
          }
        }
        else {
          anadirPersonaMision()
        }
      }


    }

  }

  function cambiarSubMisionPermante() {
    if (valueTab == "Permanent") {
      setCambioUsuarioSubMision(true)
    }

    if (valueTab == "Temporary") {
      setCambioUsuarioSubMision(true)
    }
  }

  function editarUsuario() {

    setModoGestionDialogo("editar")
    //modoGestionDialogo

    setUserSelect(usuarioEditar)
    let subMisionSelectedAsigned = listSubMisionAPI.filter(option => option.id == filaSeleccionadaGrid)[0]
    setSubMisionSelect(subMisionSelectedAsigned)
    let jobSelect = listJobSubMision.filter(option => option.id == usuarioEditar['job_employee_id'])[0]
    setJobSelect(jobSelect)
    setEstado(usuarioEditar['rol_employee'])
  }

  function deleteUser() {
    deleteContractUserAPI({
      user_id: usuarioEditar['id'],
      subMision_id: filaSeleccionadaGrid
    })

    insertarLogPersonaAPI({
      persona: usuarioEditar['id'],
      fecha_accion: new Date().toISOString().split("T")[0],
      hora_accion: new Date().toLocaleTimeString(),
      accion: "Remove",
      subMision_relacionada: subMisionSelect.id,
      descripcion: "User with IDidentification:" + usuarioEditar['IDidentification'] + " remove to Sub Mission: " + subMisionSelect.name
    })

    obtenerPersonalAsignadoContratoAPI(filaSeleccionadaGrid)
  }

  //setUserSelect
  //setSubMisionSelect
  //setJobSelect
  //setEstado

  const handleChange = (event) => {

  };

  return (
    <Dialog open={visibilidadModalAssignedPeople} onClose={() => cambiarVisibilidadModalAssignedPeopleAPI(false, '')} fullWidth maxWidth='lg'
      PaperProps={{
        sx: {
          minHeight: "70%"
        }
      }}
    >
      <DialogTitle classes={{ root: classes.customDialogTitle }} onClose={() => cambiarVisibilidadModalAssignedPeopleAPI(false, '')}  >
        Assign person to sub mision
      </DialogTitle>


      <DialogContent>
        {/*modoApertura*/}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2} columns={16}>
          <Grid
            container
            item xs={disabledAddUser == true ? 6 : 15}
            style={modoApertura == 'miEquipo' || modoApertura == "miEquipoEdit" || modoApertura == "miEquipoEstructura" ? { display: "none" } : { display: "block" }}>

            <div style={{ width: '100%', textAlign: 'center', display: listPeopleContrato.length != 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                PEOPLE ASSIGNED IN THE {estamosDepartamento == true ? 'TECHNICIAN' : 'SUB MISION'}: {subMisionSelect.name}
                {/*<Divider style={{ width: '100%' }} />*/}
              </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center', display: listPeopleContrato.length == 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                There are no people assigned to this {estamosDepartamento == true ? 'technician' : 'sub mision'}
              </span>
            </div>

            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={valueTab}>
                <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChangeTab} aria-label="lab API tabs example" centered>
                    <Tab label="Permanent" value="Permanent" />
                    <Tab label="Temporary" value="Temporary" />
                  </TabList>
                </Box>
                <TabPanel value="Permanent">
                  {listPeopleContrato.filter(elemento => elemento.rol_employee == "permanent").map((nomModulo) => {
                    return (
                      <ListItem
                        className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                        sx={{ bgcolor: 'background.paper' }}
                        //sx={{ backgroundColor: nomModulo['rol_employee'] == "permanent" ? '#00BD4B' : '#FFB600' }}
                        button
                      >
                        <ListItemText classes={{ root: 'm-0', primary: 'truncate' }}
                          primary={nomModulo['first_name'] + " " + nomModulo['last_name']}
                          secondary={nomModulo != undefined && nomModulo['job_employee'] != undefined ? nomModulo['job_employee'] : ''}
                        />
                        <ListItemIcon className="min-w-40 -ml-10 mr-8" style={disabledEditUser == true || disabledDeleteUser == true ? { display: "block" } : { display: "none" }}>
                          <Tooltip title="Edit" placement="top">
                            <Button
                              id="basic-button"
                              aria-controls={detallesAbierto ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={detallesAbierto ? 'true' : undefined}
                              onClick={(event) => {
                                menuClick(event),
                                  setUsuarioEditar(nomModulo)
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
                            <MenuItem style={disabledEditUser ? { display: "block" } : { display: "none" }}
                              onClick={() => {
                                editarUsuario()
                                setVarMenu(null);
                              }}>Edit user</MenuItem>

                            <MenuItem style={disabledEditUser ? { display: "block" } : { display: "none" }}
                              onClick={() => {
                                obtenerContratosUserAPI(usuarioEditar['id'], "2")
                                cambiarSubMisionPermante()
                                setVarMenu(null);
                              }}>Switch to another permanent sub-mission</MenuItem>

                            <MenuItem style={disabledDeleteUser == true ? { display: "block" } : { display: "none" }}
                              onClick={() => {
                                deleteUser()
                                setVarMenu(null);

                              }}>Remove from group</MenuItem>
                          </Menu>
                          {/*FIN MENU DE GESTION DE PERFILES */}
                        </ListItemIcon>


                      </ListItem>
                    );

                  })}
                </TabPanel>
                <TabPanel value="Temporary">
                  {listPeopleContrato.filter(elemento => elemento.rol_employee == "temporary").map((nomModulo) => {
                    return (
                      <ListItem
                        className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                        sx={{ bgcolor: 'background.paper' }}
                        //sx={{ backgroundColor: nomModulo['rol_employee'] == "permanent" ? '#00BD4B' : '#FFB600' }}
                        button
                      >
                        <ListItemText classes={{ root: 'm-0', primary: 'truncate' }}
                          primary={nomModulo['first_name'] + " " + nomModulo['last_name']}
                          secondary={nomModulo != undefined && nomModulo['job_employee'] != undefined ? nomModulo['job_employee'] : ''}
                        />
                        <ListItemIcon className="min-w-40 -ml-10 mr-8" style={disabledEditUser == true || disabledDeleteUser == true ? { display: "block" } : { display: "none" }}>
                          <Tooltip title="Edit" placement="top">
                            <Button
                              id="basic-button"
                              aria-controls={detallesAbierto ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={detallesAbierto ? 'true' : undefined}
                              onClick={(event) => {
                                menuClick(event),
                                  setUsuarioEditar(nomModulo)
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
                            <MenuItem style={disabledEditUser == true ? { display: "block" } : { display: "none" }}
                              onClick={() => {
                                editarUsuario()
                                setVarMenu(null);
                              }}>Edit user</MenuItem>

                            <MenuItem style={disabledDeleteUser == true ? { display: "block" } : { display: "none" }}
                              onClick={() => {
                                deleteUser()
                                setVarMenu(null);

                              }}>Remove from group</MenuItem>
                          </Menu>
                          {/*FIN MENU DE GESTION DE PERFILES */}
                        </ListItemIcon>


                      </ListItem>
                    );

                  })}
                </TabPanel>
              </TabContext>
            </Box>


          </Grid>

          <Divider style={disabledAddUser == true ? { display: "block" } : { display: "none" }} orientation="vertical" flexItem />

          <Grid container
            direction="row"
            justifyContent="center"
            style={cambioUsuarioSubMision == true ? { display: "block" } : { display: "none" }}
            alignItems="center" item xs={9}>
            <CambioUserSubMision
              usuarioEditar={usuarioEditar}
              subMisionSelect={subMisionSelect}
              estamosDepartamento={estamosDepartamento}
              setCambioUsuarioSubMision={setCambioUsuarioSubMision}
            />
          </Grid>


          <Grid container
            direction="row"
            justifyContent="center"
            style={disabledAddUser == true && cambioUsuarioSubMision == false ? { display: "" } : { display: "none" }}
            alignItems="center" item xs={9}>

            <div style={{ width: '100%', textAlign: 'center' }}>
              <span className="font-semibold">
                {modoGestionDialogo == "editar" ? estamosDepartamento == true ? 'EDIT TECHNICIAN USER' : 'EDIT SUB MISION USER' : estamosDepartamento == true ? 'NEW TECHNICIAN USER' : 'NEW SUB MISION USER'}
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <Autocomplete
              id="tags-outlined"
              value={userSelect != undefined ? userSelect : ''}
              inputValue={userSelect != null ? userSelect.name : ''}
              options={usersListAPI}
              disabled={modoGestionDialogo == "editar" ? true : false}
              getOptionLabel={(option) =>
                option.first_name != null ? option.IDidentification + " - " + option.first_name + " " + option.last_name : ''
              }
              getOptionDisabled={(option) =>
                !!userAnadidoContrato.find(element => element === option.email)
              }
              onChange={(event, value) => setUserSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Users"
                  placeholder="Users"
                  size="small"
                  sx={{ m: 1, width: '50ch' }}
                />
              )}
            />

            <Autocomplete
              id="tags-outlined"
              value={jobSelect != undefined ? jobSelect : ''}
              inputValue={jobSelect != null ? jobSelect.name : ''}
              options={listJobSubMision}
              getOptionLabel={(option) =>
                option.name != null ? option.name : ''
              }
              onChange={(event, value) => setJobSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Position"
                  placeholder="Position"
                  size="small"
                  sx={{ m: 1, width: '50ch' }}
                />
              )}
            />

            <Autocomplete style={{ display: modoApertura == "newSubMision" ? 'none' : 'block' }} //modoApertura == "newSubMision"
              id="tags-outlined"
              value={subMisionSelect != undefined ? subMisionSelect : ''}
              inputValue={subMisionSelect != null ? subMisionSelect.name : ''}
              disabled={modoApertura == "miEquipoEstructura" ? true : false}
              options={contractUserList}
              getOptionLabel={(option) =>
                option.name != null ? option.name : ''
              }
              onChange={(event, value) => setSubMisionSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Sub Mission'
                  placeholder='Sub Mission'
                  size="small"
                  sx={{ m: 1, width: '50ch' }}
                />
              )}
            />

            <FormControl>
              <InputLabel id="tags-outlined">Employee status</InputLabel>
              <Select
                labelId="tags-outlined"
                id="tags-outlined"
                label="Employee status"
                size="small"
                sx={{ m: 1, width: '50ch' }}
                value={estadoSelect}
                disabled={modoGestionDialogo == "editar" ? true : false}
                onChange={e => { setEstado(e.target.value); }}
              >
                <MenuItem value={"permanent"}>Permanent</MenuItem>
                <MenuItem value={"temporary"}>Temporary</MenuItem>

              </Select>
            </FormControl>

            <Button
              style={modoGestionDialogo == "nuevo" || modoApertura == "miEquipoEdit" ? { display: 'none' } : { display: 'inline' }}
              className="ml-8"
              variant="contained"
              color="error"
              sx={{ m: 1, width: '25ch' }}
              onClick={() => {
                if (modoApertura == "miEquipoEdit" || modoApertura == "miEquipo" || modoApertura == "miEquipoEstructura") {
                  resetValues()
                  cambiarVisibilidadModalAssignedPeopleAPI(false, '')
                }
                else {
                  resetValues()
                }

              }}
            >
              CANCEL

            </Button>

            <Button
              disabled={botonControl}
              className="ml-8"
              variant="contained"
              color="secondary"
              sx={modoGestionDialogo == "nuevo" || modoApertura == "miEquipoEdit" ? { width: '50ch', m: 1 } : { width: '25ch', m: 1 }}
              onClick={() => {
                assignarPersona()
                //cambiarVisibilidadModalAssignedPeopleAPI(false, '')
              }}
            >
              {modoGestionDialogo == "editar" ? 'UPDATE' : 'ASSIGN'}

            </Button>

          </Grid>
        </Grid>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          resetValues()
          cambiarVisibilidadModalAssignedPeopleAPI(false, '')
        }
        }>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

