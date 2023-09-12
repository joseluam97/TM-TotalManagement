//**********************IMPORTACIONES****************************
import * as global from 'global.js';
import { useEffect, useState, useRef } from 'react'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { showMessage } from 'app/store/fuse/messageSlice'
import { matchRoutes, useLocation } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { styled } from '@mui/material/styles';

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
  mostrarMisionAPIAction,
  putMisionAPIAction,
  postMisionAPIAction,
  cambiarVisibilidadModalInsertarAPIAction,
  getROByMisionAPIAction,
  mostrarAllRequerimentsByMisionAPIAction
} from '../store/actions'

import {
  mostrarUserAPIAction
} from '../../../Managment/Users/store/actions'

import {
  getAllLocationCustomerByWPAPIAction,
  getAllLocationCustomerByMisionAPIAction
} from '../../../Managment/Customers/store/actions'

import {
  insertarLogPersonaAPIAction
} from '../../../Managment/LogCambiosPersonas/store/actions'

import {
  mostrarALLUserAppAPIAction
} from '../../../TabsExcel/PeopleManagement/Items/Aplications/store/actions'

import {
  mostrarMisionPaquetesAPIAction
} from '../../PaqueteTrabajo/store/actions'

import {
  mostrarAppAPIAction
} from '../../../Managment/App/store/actions'

import {
  insertarNewPeticionRequerimientoAPIAction
} from '../../../Managment/PeticionRequeriments/store/actions'

//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


export default function ModalInsertar() {

  const [chipData, setChipData] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const classes = useStyles();
  const dispatch = useDispatch()

  const location = useLocation();
  const { pathname } = location;

  //estados locales del formulario

  const [workPackageList, setWorkPackageList] = useState('')
  const [nombreActual, setNombreActual] = useState('')
  const [codigoActual, setCodigoActual] = useState('')
  const [descripcionActual, setDescripcionActual] = useState('')
  const [responsableActual, setResponsableActual] = useState([])
  const [empleadosActual, setEmpleadosActual] = useState([])
  const [siteActual, setSiteActual] = useState('')
  const [botonControlSave, setBotonControl] = React.useState(true);
  const [incidenciaUsuarios, setIncidenciaUsuarios] = React.useState(false);

  //end_locales_formularios

  // Obtener los states de Redux
  const visibilidadModalInsertar = useSelector(state => state.fuse.misionComponent.visibilidadModalInsertarMision)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.misionComponent.filaSeleccionadaGrid)
  const modo = useSelector(state => state.fuse.misionComponent.modoAperturaInsert)
  const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
  const listRiskOportunitysByMision = useSelector(state => state.fuse.misionComponent.listRiskOportunitysByMision)
  const misionPaqueteListAPI = useSelector(state => state.fuse.misionPaqueteComponente.listMisionPaquetesAPI)
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const locationCustomerListAPI = useSelector(state => state.fuse.customerComponent.locationCustomerListAPI)
  const newMisionCreated = useSelector(state => state.fuse.misionComponent.newMisionCreated)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const listRequerimentsByMision = useSelector(state => state.fuse.misionComponent.listRequerimentsByMision)
  const appListAPI = useSelector(state => state.fuse.gestionAplicationComponent.appListAPI)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
  //const mostrarMisionAPI = () => dispatch(mostrarMisionAPIAction())
  const postMisionAPI = (subMisionNew) => dispatch(postMisionAPIAction(subMisionNew))
  const putMisionAPI = (idSubMision, subMisionNew) => dispatch(putMisionAPIAction(idSubMision, subMisionNew))
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const getAllLocationCustomerByMisionAPI = (idMision) => dispatch(getAllLocationCustomerByMisionAPIAction(idMision))
  const getAllLocationCustomerByWPAPI = (idWP) => dispatch(getAllLocationCustomerByWPAPIAction(idWP))
  const getROByMisionAPI = (idMision) => dispatch(getROByMisionAPIAction(idMision))
  const insertarLogPersonaAPI = (logAdd) => dispatch(insertarLogPersonaAPIAction(logAdd))
  const mostrarAllRequerimentsByMisionAPI = (idMision) => dispatch(mostrarAllRequerimentsByMisionAPIAction(idMision))
  const mostrarALLUserAppAPI = () => dispatch(mostrarALLUserAppAPIAction())
  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const mostrarMisionPaquetesAPI = () => dispatch(mostrarMisionPaquetesAPIAction())
  const insertarNewPeticionRequerimientoAPI = (data) => dispatch(insertarNewPeticionRequerimientoAPIAction(data))

  useEffect(() => {
    if (incidenciaUsuarios == false && workPackageList != undefined && nombreActual.trim() != '' && responsableActual != '' && empleadosActual != '' && codigoActual.trim() != '') {
      setBotonControl(false)
    }
    else {
      setBotonControl(true)
    }
  })

  useEffect(() => {
    mostrarAppAPI()
  }, []);

  useEffect(() => {
    if (visibilidadModalInsertar == true) {
      mostrarUserAPI()
      mostrarALLUserAppAPI()
      mostrarMisionPaquetesAPI()
    }

  }, [visibilidadModalInsertar])

  useEffect(() => {
    //SE HA CREADO UN NUEVO WP, POR TANTO VAMOS A COMPROBAR SI SE HAN REALIZADO OPERACIONES DE INSERCCION DE USUARIOS
    if (newMisionCreated != '') {
      //MANAGER
      for (let item in newMisionCreated['responsables']) {
        let usuarioSeleccionado = usersListAPI.filter(elemento => elemento.id == newMisionCreated['responsables'][item])[0]
        if (usuarioSeleccionado != undefined) {
          insertarLogPersonaAPI({
            persona: usuarioSeleccionado.id,
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Add",
            mision_relacionada: newMisionCreated['id'],
            descripcion: "User with IDidentification:" + usuarioSeleccionado.IDidentification + " added to Mission " + newMisionCreated['name'] + " as Manager"
          })
        }
      }
      //EMPLEADOS
      for (let item in newMisionCreated['empleados']) {
        let usuarioSeleccionado = usersListAPI.filter(elemento => elemento.id == newMisionCreated['empleados'][item])[0]
        if (usuarioSeleccionado != undefined) {
          insertarLogPersonaAPI({
            persona: usuarioSeleccionado.id,
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Add",
            mision_relacionada: newMisionCreated['id'],
            descripcion: "User with IDidentification:" + usuarioSeleccionado.IDidentification + " added to Mission " + newMisionCreated['name'] + " as Employeed"
          })
        }
      }
    }

  }, [newMisionCreated])

  useEffect(() => {
    if (visibilidadModalInsertar == true && modo != '') {
      if (modo == "editar" && filaSeleccionadaGrid != '') {
        getAllLocationCustomerByMisionAPI(filaSeleccionadaGrid)
        //OBTENER TODAS LOS R&O DE ESTA MISION
        getROByMisionAPI(filaSeleccionadaGrid)
      }
    }

    if (filaSeleccionadaGrid != '') {
      mostrarAllRequerimentsByMisionAPI(filaSeleccionadaGrid)
    }


  }, [filaSeleccionadaGrid, modo, visibilidadModalInsertar])

  function isArrayInArray(arr, item) {
    let item_as_string = JSON.stringify(item);

    return arr.some(function (ele) {
      return JSON.stringify(ele) === item_as_string;
    });
  }


  useEffect(() => {
    if (responsableActual.length != 0) {

      let vectorIncidencias = [global.rolN8, global.rolN7, global.rolN6]

      //INCIDENCIAS
      let usuarioResultado = responsableActual.filter(elemento => vectorIncidencias.indexOf(elemento.rolUser) != -1)
      if (usuarioResultado.length != 0) {
        setIncidenciaUsuarios(true)

        dispatch(
          showMessage({
            message: "You have assigned a person to a place to which you should assign " + global.rolN3 + " or higher.",
            variant: "error"
          })
        )
      }

      //TODO OK
      if (usuarioResultado.length == 0) {
        setIncidenciaUsuarios(false)
      }
    }


  }, [responsableActual])

  useEffect(() => {
    if (empleadosActual.length != 0) {

      let vectorIncidencias = [global.rolN8, global.rolN7]

      //INCIDENCIAS
      let usuarioResultado = empleadosActual.filter(elemento => vectorIncidencias.indexOf(elemento.rolUser) != -1)
      if (usuarioResultado.length != 0) {
        setIncidenciaUsuarios(true)

        dispatch(
          showMessage({
            message: "You have assigned a person to a place to which you should assign " + global.rolN6 + " or higher.",
            variant: "error"
          })
        )
      }

      //TODO OK
      if (usuarioResultado.length == 0) {
        setIncidenciaUsuarios(false)
      }
    }


  }, [empleadosActual])

  function comprobacionUbicacion() {

    let vectIDSite = []
    for (let item in siteActual) {
      vectIDSite.push(siteActual[item].id)
    }

    if (listRiskOportunitysByMision.length != 0 && modo == "editar") {

      let posibleGuardar = true
      for (let localizacionRO in listRiskOportunitysByMision) {
        let data = vectIDSite.includes(listRiskOportunitysByMision[localizacionRO])
        if (data == false) {
          posibleGuardar = false
        }
      }

      if (posibleGuardar == true) {
        crearConjunto()
      }
      else {
        dispatch(
          showMessage({
            message: "You have modified the mission locations and removed locations that are used in the R&O associated with this mission.",
            variant: "error"
          })
        )
      }

    }
    else {
      crearConjunto()
    }
  }

  function crearConjunto() {

    let vectIDManager = []
    for (let item in responsableActual) {
      vectIDManager.push(responsableActual[item].id)
    }

    let vectIDEmpleado = []
    for (let item in empleadosActual) {
      vectIDEmpleado.push(empleadosActual[item].id)
    }

    let vectIDSite = []
    for (let item in siteActual) {
      vectIDSite.push(siteActual[item].id)
    }

    if (modo == 'nuevo') {
      postMisionAPI({
        id_workPackage: workPackageList.id,
        name: nombreActual,
        code: codigoActual,
        responsables: vectIDManager,
        description: descripcionActual,
        site: vectIDSite,
        empleados: vectIDEmpleado
      })

    }

    if (modo == 'editar') {
      putMisionAPI(filaSeleccionadaGrid, {
        id_workPackage: workPackageList.id,
        name: nombreActual,
        code: codigoActual,
        responsables: vectIDManager,
        description: descripcionActual,
        site: vectIDSite,
        empleados: vectIDEmpleado
      })

      let misionSelect = listMisionAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

      let differenceResponsablesAdd = vectIDManager.filter(x => !misionSelect.responsables.includes(x));
      let differenceEmpleadosAdd = vectIDEmpleado.filter(x => !misionSelect.empleados.includes(x));

      let differenceResponsablesRemove = misionSelect.responsables.filter(x => !vectIDManager.includes(x));
      let differenceEmpleadosRemove = misionSelect.empleados.filter(x => !vectIDEmpleado.includes(x));

      //ADD
      for (let item in differenceResponsablesAdd) {
        let usuarioBucle = usersListAPI.filter(elemento => elemento.id == differenceResponsablesAdd[item])[0]
        insertarLogPersonaAPI({
          persona: usuarioBucle.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          accion: "Add",
          mision_relacionada: misionSelect.id,
          descripcion: "User with IDidentification:" + usuarioBucle.IDidentification + " added to Mission " + misionSelect.name + " as Manager"
        })

        comprobarRequisitosUsuario("Manager", usuarioBucle)


      }

      for (let item in differenceEmpleadosAdd) {
        let usuarioBucle = usersListAPI.filter(elemento => elemento.id == differenceEmpleadosAdd[item])[0]
        insertarLogPersonaAPI({
          persona: usuarioBucle.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          accion: "Add",
          mision_relacionada: misionSelect.id,
          descripcion: "User with IDidentification:" + usuarioBucle.IDidentification + " added to Mission " + misionSelect.name + " as Employee"
        })

        //COMPROBACION DE QUE EL USUARIO AÑADIDO CUMPLE LOS REQUISITOS
        comprobarRequisitosUsuario("Employee", usuarioBucle)
      }

      //REMOVE
      for (let item in differenceResponsablesRemove) {
        let usuarioBucle = usersListAPI.filter(elemento => elemento.id == differenceResponsablesRemove[item])[0]
        insertarLogPersonaAPI({
          persona: usuarioBucle.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          accion: "Remove",
          mision_relacionada: misionSelect.id,
          descripcion: "User with IDidentification:" + usuarioBucle.IDidentification + " removed  to Mission " + misionSelect.name + " as Manager"
        })
      }

      for (let item in differenceEmpleadosRemove) {
        let usuarioBucle = usersListAPI.filter(elemento => elemento.id == differenceEmpleadosRemove[item])[0]
        insertarLogPersonaAPI({
          persona: usuarioBucle.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          accion: "Remove",
          mision_relacionada: misionSelect.id,
          descripcion: "User with IDidentification:" + usuarioBucle.IDidentification + " removed  to Mission " + misionSelect.name + " as Employee"
        })
      }
    }

    cambiarVisibilidadModalInsertar(false, '');

  }

  function comprobarRequisitosUsuario(tipoRequisito, usuarioBucle) {
    //COMPROBACION DE QUE EL USUARIO AÑADIDO CUMPLE LOS REQUISITOS
    let cadenaEnvio = ""
    let envioEmail = false
    for (let itemMisionApp in listRequerimentsByMision) {
      //MISMO ROL
      if (listRequerimentsByMision[itemMisionApp]['type'] == tipoRequisito) {
        let aplicacionEmpleado1 = listUserApp.filter(elemento => elemento.user_id == usuarioBucle.id)

        let aplicacionEmpleado2 = aplicacionEmpleado1.filter(elemento => elemento.aplication_user_id == listRequerimentsByMision[itemMisionApp]['aplication_app_id'])[0]

        if (aplicacionEmpleado2 == undefined) {
          //NO TIENE LA APLICACION
          cadenaEnvio = cadenaEnvio + listRequerimentsByMision[itemMisionApp]['aplication_app_id_code'] + "- " + listRequerimentsByMision[itemMisionApp]['aplication_app_id_name'] + "\n "
          envioEmail = true
        }
        else {
          let hayIncidenciasExtras = false
          //SI ENCUENTRA LA APP TENGO QUE VER SI TIENE EL ESTADO CORRECTO
          //aplicacionEmpleado2 => elemento del userApp
          //listRequerimentsByMision[itemMisionApp] => elemento del contractApp
          //requerimientoSeleccionado => requeriment select
          let requerimientoSeleccionado = appListAPI.filter(elemento => elemento.id == aplicacionEmpleado2.aplication_user_id)[0]

          if (requerimientoSeleccionado.tiene_valor == true) {
            if (requerimientoSeleccionado.tipo_valor == "List") {
              let elementosList = requerimientoSeleccionado.listado_opciones.split(',')
              let indiceUsuario = elementosList.indexOf(aplicacionEmpleado2.valor_asignado)
              let indiceBloque = elementosList.indexOf(listRequerimentsByMision[itemMisionApp].valor_asignado)

              switch (listRequerimentsByMision[itemMisionApp].operacion_logica) {
                case 1:
                  //indiceUsuario < indiceBloque
                  if (indiceUsuario >= indiceBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 2:
                  //indiceUsuario <= indiceBloque
                  if (indiceUsuario > indiceBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 3:
                  //indiceUsuario == indiceBloque
                  if (indiceUsuario != indiceBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 4:
                  //indiceUsuario >= indiceBloque
                  if (indiceUsuario < indiceBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 5:
                  //indiceUsuario > indiceBloque
                  if (indiceUsuario <= indiceBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 6:
                  //indiceUsuario != indiceBloque
                  if (indiceUsuario == indiceBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
              }

            }
            if (requerimientoSeleccionado.tipo_valor == "Date") {
              let fechaHoy = new Date()
              fechaHoy.setDate(fechaHoy.getDate() + listRequerimentsByMision[itemMisionApp].diferencia_fecha)
              let fechaUsuario = new Date(aplicacionEmpleado2.valor_asignado_fecha)
              var day_as_milliseconds = 86400000;
              var diff_in_millisenconds = fechaUsuario - fechaHoy;
              var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

              if (diff_in_days < 0) {
                //HAY INCIDENCIA
                hayIncidenciasExtras = true
              }
            }
            if (requerimientoSeleccionado.tipo_valor == "Number") {
              let numeroUsuario = parseInt(aplicacionEmpleado2.valor_comparacion)
              let numeroBloque = parseInt(listRequerimentsByMision[itemMisionApp].valor_comparacion)

              switch (listRequerimentsByMision[itemMisionApp].operacion_logica) {
                case 1:
                  //numeroUsuario < numeroBloque
                  if (numeroUsuario >= numeroBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 2:
                  //numeroUsuario <= numeroBloque
                  if (numeroUsuario > numeroBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 3:
                  //numeroUsuario == numeroBloque
                  if (numeroUsuario != numeroBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 4:
                  //numeroUsuario >= numeroBloque
                  if (numeroUsuario < numeroBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 5:
                  //numeroUsuario > numeroBloque
                  if (numeroUsuario <= numeroBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;
                case 6:
                  //numeroUsuario != numeroBloque
                  if (numeroUsuario == numeroBloque) {
                    //HAY INCIDENCIA
                    hayIncidenciasExtras = true
                  }
                  break;

              }
            }

            if (hayIncidenciasExtras == true) {
              //HAY INCIDENCIA
              cadenaEnvio = cadenaEnvio + listRequerimentsByMision[itemMisionApp]['aplication_app_id_code'] + "-" + listRequerimentsByMision[itemMisionApp]['aplication_app_id_name'] + "\n"
              envioEmail = true
            }
          }
        }
      }
    }

    if (envioEmail == true) {
      insertarNewPeticionRequerimientoAPI({
        persona: usuarioBucle.id,
        fecha_accion: new Date().toISOString().split("T")[0],
        hora_accion: new Date().toLocaleTimeString(),
        descripcion: "User: " + usuarioBucle.first_name + " needs new requirements: \n " + cadenaEnvio,
        active: true
      })
    }

  }

  useEffect(() => {

    if (modo == 'nuevo') {
      setWorkPackageList('')
      setNombreActual('')
      setCodigoActual('')
      setDescripcionActual('')
      setResponsableActual([])
      setEmpleadosActual([])
      setSiteActual([])
      setChipData([])
    }

    if (modo == 'editar') {
      let misionSelect = listMisionAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

      if(misionSelect != undefined){
        let wpSelect = misionPaqueteListAPI.filter(registro => registro.id == misionSelect?.id_workPackage)[0]
        setWorkPackageList(wpSelect)
      }
      
      let vectIDManager = []
      for (let aux in misionSelect.responsables) {
        let userSelect = usersListAPI.filter(item => item.id == misionSelect.responsables[aux])[0]
        vectIDManager.push(userSelect)
      }

      let vectIDEmpleados = []
      for (let aux in misionSelect.empleados) {
        let userSelect = usersListAPI.filter(item => item.id == misionSelect.empleados[aux])[0]
        vectIDEmpleados.push(userSelect)
      }

      let vectIDSite = []
      for (let aux in misionSelect.site) {
        let locationSelect = locationCustomerListAPI.filter(item => item.id == misionSelect.site[aux])[0]
        if (locationSelect != undefined) {
          vectIDSite.push(locationSelect)
        }

      }

      if (misionSelect != null) {
        
        setResponsableActual(vectIDManager)
        setEmpleadosActual(vectIDEmpleados)
        setNombreActual(misionSelect.name)
        setCodigoActual(misionSelect.code)
        setDescripcionActual(misionSelect.description)
        setSiteActual(vectIDSite)


      }
    }

  }, [modo, visibilidadModalInsertar])

  useEffect(() => {

    if (listMisionAPI.length != 0 && locationCustomerListAPI.length != 0) {
      let misionSelect = listMisionAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]
      let vectIDSite = []
      if (misionSelect != undefined) {
        for (let aux in misionSelect.site) {
          let locationSelect = locationCustomerListAPI.filter(item => item.id == misionSelect.site[aux])[0]
          if (locationSelect != undefined) {
            vectIDSite.push(locationSelect)
          }

        }
      }

      setSiteActual(vectIDSite)
    }

  }, [listMisionAPI, locationCustomerListAPI])


  return (
    <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false, '')} fullWidth maxWidth='md'>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        {modo == 'nuevo' ? 'New Mission' : 'Edit Mission'}
      </DialogTitle>
      <DialogContent>

        <Grid container spacing={2} columns={16} style={{ marginTop: '1px' }}>

          <Grid item xs={8}>

            <TextField
              label="Name"
              id="nombre"
              value={nombreActual}
              size="small"
              fullWidth
              onChange={e => setNombreActual(e.target.value)}
            />

          </Grid>

          <Grid item xs={8}>

            <TextField
              label="Code"
              id="codigo"
              value={codigoActual}
              size="small"
              fullWidth
              onChange={e => setCodigoActual(e.target.value)}
            />

          </Grid>

          <Grid item xs={8}>

            <Autocomplete
              multiple
              limitTags={2}
              id="tags-outlined"
              options={usersListAPI}
              getOptionLabel={(option) => option.IDidentification + " - " + option.first_name + " " + option.last_name}
              value={responsableActual}
              onChange={(event, value) => setResponsableActual(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Manager"
                  placeholder="Manager"
                  size="small"
                  fullWidth
                />
              )}
            />


          </Grid>

          <Grid item xs={8}>

            <Autocomplete
              multiple
              limitTags={2}
              id="tags-outlined"
              options={usersListAPI}
              getOptionLabel={(option) => option.IDidentification + " - " + option.first_name + " " + option.last_name}
              value={empleadosActual}
              onChange={(event, value) => setEmpleadosActual(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Employees"
                  placeholder="Employees"
                  size="small"
                  fullWidth
                />
              )}
            />


          </Grid>

          <Grid item xs={8}>
            <FormControl variant="standard" fullWidth size="small">
              <Autocomplete
                id="tags-outlined"
                options={misionPaqueteListAPI}
                value={workPackageList != undefined ? workPackageList : ''}
                inputValue={workPackageList != null ? workPackageList.name : ''}
                onChange={(event, value) => setWorkPackageList(value)}
                getOptionLabel={(option) =>
                  option.name != null ? option.name : ''
                }
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Work Package"
                    placeholder="Work Package"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </FormControl>


          </Grid>

          <Grid item xs={8}>

            <Autocomplete
              id="tags-outlined"
              multiple
              limitTags={2}
              options={locationCustomerListAPI}
              getOptionLabel={(option) =>
                option != undefined && option != null && option.name != null && option.id_customer_name != null ? option.id_customer_name + " - " + option.name : ''
              }
              value={siteActual}
              onChange={(event, value) => setSiteActual(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Site"
                  placeholder="Site"
                  size="small"
                  fullWidth
                />
              )}
            />


          </Grid>

          <Grid item xs={8}>

            <TextField
              id="descripcion"
              label="Description"
              multiline
              rows={5}
              value={descripcionActual}
              size="small"
              fullWidth
              onChange={e => setDescripcionActual(e.target.value)}
            />

          </Grid>

        </Grid>



      </DialogContent>
      <DialogActions>


        <Button onClick={() => cambiarVisibilidadModalInsertar(false, '')}>Close</Button>
        <Button disabled={botonControlSave} onClick={() => comprobacionUbicacion()}>Save</Button>

      </DialogActions>
    </Dialog>
  )
}

