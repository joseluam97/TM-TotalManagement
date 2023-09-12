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

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
  putDireccionDepartamentalAPIAction,
  postDireccionDepartamentalAPIAction,
  seleccionarDireccionDepartamentalTablaAPIAction,
  cambiarVisibilidadModalInsertarDireccionDepartamentalAPIAction,
  mostrarAllDireccionDepartamentalAPIAction,
  mostrarAllRequerimentsByDireccionDepartamentalAPIAction
} from '../store/actions'

import {
  mostrarUserAPIAction
} from '../../../Managment/Users/store/actions'

import {
  insertarLogPersonaAPIAction
} from '../../../Managment/LogCambiosPersonas/store/actions'

import {
  mostrarALLUserAppAPIAction
} from '../../../TabsExcel/PeopleManagement/Items/Aplications/store/actions'

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


export default function ModalInsertar() {

  const classes = useStyles();
  const dispatch = useDispatch()

  const location = useLocation();
  const { pathname } = location;

  //estados locales del formulario

  const [nombreActual, setNombreActual] = useState('')
  const [codigoActual, setCodigoActual] = useState('')
  const [descripcionActual, setDescripcionActual] = useState('')
  const [responsableActual, setResponsableActual] = useState([])
  const [botonControlSave, setBotonControl] = React.useState(true);
  const [incidenciaUsuarios, setIncidenciaUsuarios] = React.useState(false);

  const [estamosDireccionDepartamental, setEstamosDireccionDepartamental] = React.useState(false);

  //end_locales_formularios

  // Obtener los states de Redux
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const listAllDepartamentAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDepartamentAPI)
  const listAllDireccionesDepartamentalesAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDireccionesDepartamentalesAPI)
  const filaSeleccionadaGridDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.filaSeleccionadaGridDireccionDepartamental)
  const modoAperturaDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.modoAperturaDireccionDepartamental)
  const visibilidadModalInsertarDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.visibilidadModalInsertarDireccionDepartamental)
  const newDireccionDepartamentalCreated = useSelector(state => state.fuse.departamentoViewComponente.newDireccionDepartamentalCreated)
  const listRequerimentsByDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.listRequerimentsByDireccionDepartamental)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const appListAPI = useSelector(state => state.fuse.gestionAplicationComponent.appListAPI)

  const putDireccionDepartamentalAPI = (id, data) => dispatch(putDireccionDepartamentalAPIAction(id, data))
  const postDireccionDepartamentalAPI = (data) => dispatch(postDireccionDepartamentalAPIAction(data))
  const cambiarVisibilidadModalInsertarDireccionDepartamentalAPI = (valor, modoAperturaDireccionDepartamental) => dispatch(cambiarVisibilidadModalInsertarDireccionDepartamentalAPIAction(valor, modoAperturaDireccionDepartamental))
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const mostrarAllDireccionDepartamentalAPI = () => dispatch(mostrarAllDireccionDepartamentalAPIAction())
  const insertarLogPersonaAPI = (logAdd) => dispatch(insertarLogPersonaAPIAction(logAdd))
  const mostrarALLUserAppAPI = () => dispatch(mostrarALLUserAppAPIAction())
  const mostrarAllRequerimentsByDireccionDepartamentalAPI = (idWP) => dispatch(mostrarAllRequerimentsByDireccionDepartamentalAPIAction(idWP))
  const insertarNewPeticionRequerimientoAPI = (data) => dispatch(insertarNewPeticionRequerimientoAPIAction(data))

  useEffect(() => {
    if (incidenciaUsuarios == false && nombreActual.trim() != '' && responsableActual != '' && codigoActual.trim() != '') {
      setBotonControl(false)
    }
    else {
      setBotonControl(true)
    }
  })

  useEffect(() => {
    if (responsableActual.length != 0) {

      let vectorIncidencias = [global.rolN8, global.rolN7, global.rolN6, global.rolN5, global.rolN4, global.rolN3]

      //INCIDENCIAS
      let usuarioResultado = responsableActual.filter(elemento => vectorIncidencias.indexOf(elemento.rolUser) != -1)
      if (usuarioResultado.length != 0) {
        setIncidenciaUsuarios(true)

        dispatch(
          showMessage({
            message: "You have assigned a person to a place to which you should assign "+ global.rolN2 +" or higher.",
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
    //SE HA CREADO UN NUEVO WP, POR TANTO VAMOS A COMPROBAR SI SE HAN REALIZADO OPERACIONES DE INSERCCION DE USUARIOS
    if (newDireccionDepartamentalCreated != '') {
      for (let item in newDireccionDepartamentalCreated['responsablesDD']) {
        let usuarioSeleccionado = usersListAPI.filter(elemento => elemento.id == newDireccionDepartamentalCreated['responsablesDD'][item])[0]
        if (usuarioSeleccionado != undefined) {
          insertarLogPersonaAPI({
            persona: usuarioSeleccionado['id'],
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Add",
            departamento_relacionado: newDireccionDepartamentalCreated['id'],
            descripcion: "User with IDidentification:" + usuarioSeleccionado['IDidentification'] + " added to Department " + newDireccionDepartamentalCreated['name']
          })
        }

      }
    }

  }, [newDireccionDepartamentalCreated])

  useEffect(() => {
    if (filaSeleccionadaGridDireccionDepartamental != '') {
      mostrarAllRequerimentsByDireccionDepartamentalAPI(filaSeleccionadaGridDireccionDepartamental)
    }

  }, [filaSeleccionadaGridDireccionDepartamental])

  function crearDireccionDepartamental() {

    let vectIDManager = []
    for (let item in responsableActual) {
      vectIDManager.push(responsableActual[item].id)
    }

    if (modoAperturaDireccionDepartamental == 'nuevo') {
      postDireccionDepartamentalAPI({
        name: nombreActual,
        code: codigoActual,
        responsablesDD: vectIDManager,
        description: descripcionActual,
      })
    }

    if (modoAperturaDireccionDepartamental == 'editar') {
      putDireccionDepartamentalAPI(filaSeleccionadaGridDireccionDepartamental[0], {
        name: nombreActual,
        code: codigoActual,
        responsablesDD: vectIDManager,
        description: descripcionActual
      })

      let direccionDepartamentalSelect = listAllDireccionesDepartamentalesAPI.filter(registro => registro.id == filaSeleccionadaGridDireccionDepartamental)[0]

      let differenceResponsablesAdd = vectIDManager.filter(x => !direccionDepartamentalSelect.responsablesDD.includes(x));
      let differenceResponsablesRemove = direccionDepartamentalSelect.responsablesDD.filter(x => !vectIDManager.includes(x));

      //ADD
      for (let item in differenceResponsablesAdd) {
        let usuarioSeleccionado = usersListAPI.filter(elemento => elemento.id == differenceResponsablesAdd[item])[0]
        if (usuarioSeleccionado != undefined) {
          insertarLogPersonaAPI({
            persona: usuarioSeleccionado.id,
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Add",
            direccionDepartamental_relacionado: direccionDepartamentalSelect.id,
            descripcion: "User with IDidentification:" + usuarioSeleccionado.IDidentification + " added to Department " + direccionDepartamentalSelect.name
          })
        }

        //COMPROBACION DE QUE EL USUARIO AÑADIDO CUMPLE LOS REQUISITOS
        let cadenaEnvio = ""
        let envioEmail = false

        for (let itemDireccionDepartamentalApp in listRequerimentsByDireccionDepartamental) {
          let aplicacionEmpleado1 = listUserApp.filter(elemento => elemento.user_id == usuarioSeleccionado.id)

          let aplicacionEmpleado2 = aplicacionEmpleado1.filter(elemento => elemento.aplication_user_id == listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp]['aplication_app_id'])[0]

          if (aplicacionEmpleado2 == undefined) {
            cadenaEnvio = cadenaEnvio + listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp]['aplication_app_id_code'] + "- " + listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp]['aplication_app_id_name'] + "\n "
            envioEmail = true
          }

          else {
            let hayIncidenciasExtras = false
            //SI ENCUENTRA LA APP TENGO QUE VER SI TIENE EL ESTADO CORRECTO
            //aplicacionEmpleado2 => elemento del userApp
            //listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp] => elemento del contractApp
            //requerimientoSeleccionado => requeriment select
            let requerimientoSeleccionado = appListAPI.filter(elemento => elemento.id == aplicacionEmpleado2.aplication_user_id)[0]

            if (requerimientoSeleccionado.tiene_valor == true) {
              if (requerimientoSeleccionado.tipo_valor == "List") {
                let elementosList = requerimientoSeleccionado.listado_opciones.split(',')
                let indiceUsuario = elementosList.indexOf(aplicacionEmpleado2.valor_asignado)
                let indiceBloque = elementosList.indexOf(listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp].valor_asignado)

                switch (listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp].operacion_logica) {
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
                fechaHoy.setDate(fechaHoy.getDate() + listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp].diferencia_fecha)
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
                let numeroBloque = parseInt(listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp].valor_comparacion)

                switch (listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp].operacion_logica) {
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
                cadenaEnvio = cadenaEnvio + listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp].aplication_app_id_code + "-" + listRequerimentsByDireccionDepartamental[itemDireccionDepartamentalApp].aplication_app_id_name + "\n"
                envioEmail = true
              }
            }
          }

        }

        if (envioEmail == true) {
          insertarNewPeticionRequerimientoAPI({
            persona: usuarioSeleccionado.id,
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            descripcion: "User: " + usuarioSeleccionado.first_name + " needs new requirements: \n " + cadenaEnvio,
            active: true
          })
        }

      }

      //REMOVE
      for (let item in differenceResponsablesRemove) {
        let usuarioSeleccionado = usersListAPI.filter(elemento => elemento.id == differenceResponsablesRemove[item])[0]
        if (usuarioSeleccionado != undefined) {
          insertarLogPersonaAPI({
            persona: usuarioSeleccionado.id,
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Remove",
            direccionDepartamental_relacionado: direccionDepartamentalSelect.id,
            descripcion: "User with IDidentification:" + usuarioSeleccionado.IDidentification + " removed  to Department " + direccionDepartamentalSelect.name
          })
        }
      }
    }

    cambiarVisibilidadModalInsertarDireccionDepartamentalAPI(false, '');

  }

  useEffect(() => {

    if (modoAperturaDireccionDepartamental == 'nuevo') {
      setNombreActual('')
      setCodigoActual('')
      setDescripcionActual('')
      setResponsableActual([])
    }

    if (modoAperturaDireccionDepartamental == 'editar') {
      let direccionDepartamentalSelect = listAllDireccionesDepartamentalesAPI.filter(registro => registro.id == filaSeleccionadaGridDireccionDepartamental)[0]

      let vectIDManager = []
      for (let aux in direccionDepartamentalSelect.responsablesDD) {
        let userSelect = usersListAPI.filter(item => item.id == direccionDepartamentalSelect.responsablesDD[aux])[0]
        vectIDManager.push(userSelect)
      }

      if (direccionDepartamentalSelect != null) {
        setResponsableActual(vectIDManager)
        setNombreActual(direccionDepartamentalSelect.name)
        setCodigoActual(direccionDepartamentalSelect.code)
        setDescripcionActual(direccionDepartamentalSelect.description)
      }
    }

  }, [modoAperturaDireccionDepartamental, visibilidadModalInsertarDireccionDepartamental])

  useEffect(() => {

    mostrarAllDireccionDepartamentalAPI()
    mostrarUserAPI()
    mostrarALLUserAppAPI()

  }, [])

  return (
    <Dialog open={visibilidadModalInsertarDireccionDepartamental} onClose={() => cambiarVisibilidadModalInsertarDireccionDepartamentalAPI(false, '')} fullWidth maxWidth='md'>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        {modoAperturaDireccionDepartamental == 'nuevo' ? 'New Departmental Directorate' : 'Edit Departmental Directorate'}

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


        <Button onClick={() => cambiarVisibilidadModalInsertarDireccionDepartamentalAPI(false, '')}>Close</Button>
        <Button disabled={botonControlSave} onClick={() => crearDireccionDepartamental()}>Save</Button>

      </DialogActions>
    </Dialog>
  )
}

