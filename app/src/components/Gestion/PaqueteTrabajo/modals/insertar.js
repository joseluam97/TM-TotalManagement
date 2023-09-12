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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import { matchRoutes, useLocation } from 'react-router-dom';
import { showMessage } from 'app/store/fuse/messageSlice'

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
//import { cambiarVisibilidadModalInsertarConjuntoAction, insertarProgramaModalInsertarAction, mostrarProgramasAPIAction } from  '../store/actions'
import {
  mostrarMisionPaquetesAPIAction,
  crearMisionPaqueteActionAPIAction,
  updateMisionPaqueteActionAPIAction,
  cambiarValorVisibilidadAction,
  cambiarValorSeleccionAction,
  cambiarVisibilidadModalInsertarMisionPaqueteAction,
  mostrarAllRequerimentsByWorkPackageAPIAction
} from '../store/actions'

import {
  mostrarAllDepartamentosAPIAction
} from '../../Departamentos/store/actions'

import {
  insertarLogPersonaAPIAction
} from '../../../Managment/LogCambiosPersonas/store/actions'

import {
  mostrarALLUserAppAPIAction
} from '../../../TabsExcel/PeopleManagement/Items/Aplications/store/actions'

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




export default function ModalInsertar() {

  const classes = useStyles();
  const dispatch = useDispatch()
  const location = useLocation();
  const { pathname } = location;

  //estados locales del formulario

  const [contratoList, setContratoAPI] = useState('')
  const [nombreActual, setNombreActual] = useState('')
  const [descripcionActual, setDescripcionActual] = useState('')
  const [codigoActual, setCodigoActual] = useState('')
  const [botonControlSave, setBotonControl] = React.useState(true);
  const [responsableActual, setResponsableActual] = useState([])
  const [estamosDepartamento, setEstamosDepartamento] = React.useState(false);
  const [incidenciaUsuarios, setIncidenciaUsuarios] = React.useState(false);
  //end_locales_formularios


  // Obtener los states de Redux
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const visibilidadModalInsertar = useSelector(state => state.fuse.misionPaqueteComponente.visibilidadModalInsertarMisionPaquete)
  const errorGlobal = useSelector(state => state.fuse.misionPaqueteComponente.error)
  const contratoListAPI = useSelector(state => state.fuse.contratoComponente.listContratoAPI)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.misionPaqueteComponente.filaSeleccionadaGrid)
  const modo = useSelector(state => state.fuse.misionPaqueteComponente.modo)
  const listMisionPaquetesAPI = useSelector(state => state.fuse.misionPaqueteComponente.listMisionPaquetesAPI)
  const listAllDepartamentAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDepartamentAPI)
  const newWPCreated = useSelector(state => state.fuse.misionPaqueteComponente.newWPCreated)
  const misionPaqueteListAPI = useSelector(state => state.fuse.misionPaqueteComponente.listMisionPaquetesAPI)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const listRequerimentsByWP = useSelector(state => state.fuse.misionPaqueteComponente.listRequerimentsByWP)
  const appListAPI = useSelector(state => state.fuse.gestionAplicationComponent.appListAPI)

  const mostrarMisionPaquetesAPI = () => dispatch(mostrarMisionPaquetesAPIAction())
  const crearMisionPaqueteActionAPI = (conjunto) => dispatch(crearMisionPaqueteActionAPIAction(conjunto))
  const updateMisionPaqueteActionAPI = (id, conjunto) => dispatch(updateMisionPaqueteActionAPIAction(id, conjunto))
  const cambiarValorVisibilidad = (valor) => dispatch(cambiarValorVisibilidadAction(valor))
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarMisionPaqueteAction(valor, modo))
  const mostrarAllDepartamentosAPI = () => dispatch(mostrarAllDepartamentosAPIAction())
  const insertarLogPersonaAPI = (logAdd) => dispatch(insertarLogPersonaAPIAction(logAdd))
  const mostrarALLUserAppAPI = () => dispatch(mostrarALLUserAppAPIAction())
  const mostrarAllRequerimentsByWPAPI = (idWP) => dispatch(mostrarAllRequerimentsByWorkPackageAPIAction(idWP))
  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const insertarNewPeticionRequerimientoAPI = (data) => dispatch(insertarNewPeticionRequerimientoAPIAction(data))

  useEffect(() => {
    if (incidenciaUsuarios == false && contratoList != '' && nombreActual.trim() != '' && codigoActual.trim() != '') {
      //descripcionActual.trim() != '') {
      setBotonControl(false)

    } else {
      setBotonControl(true)

    }
  })

  useEffect(() => {
    if (filaSeleccionadaGrid != '') {
      mostrarAllRequerimentsByWPAPI(filaSeleccionadaGrid)
    }

  }, [filaSeleccionadaGrid])

  useEffect(() => {
    if (responsableActual.length != 0) {

      let vectorIncidencias = [global.rolN8, global.rolN7, global.rolN6, global.rolN5]

      //INCIDENCIAS
      let usuarioResultado = responsableActual.filter(elemento => vectorIncidencias.indexOf(elemento.rolUser) != -1)
      if (usuarioResultado.length != 0) {
        setIncidenciaUsuarios(true)

        dispatch(
          showMessage({
            message: "You have assigned a person to a place to which you should assign " + global.rolN4 + " or higher.",
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

  function crearConjunto() {

    let vectIDManager = []
    for (let aux in responsableActual) {
      vectIDManager.push(responsableActual[aux].id)
    }

    if (modo == 'nuevo') {
      crearMisionPaqueteActionAPI({

        id_service: contratoList.id,
        name: nombreActual,
        description: descripcionActual,
        code: codigoActual,
        responsableWP: vectIDManager
      })
    }

    if (modo == 'editar') {
      updateMisionPaqueteActionAPI(filaSeleccionadaGrid, {

        id_service: contratoList.id,
        name: nombreActual,
        description: descripcionActual,
        code: codigoActual,
        responsableWP: vectIDManager,
      })

      let misionPaquete = listMisionPaquetesAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

      let differenceResponsablesAdd = vectIDManager.filter(x => !misionPaquete.responsableWP.includes(x));
      let differenceResponsablesRemove = misionPaquete.responsableWP.filter(x => !vectIDManager.includes(x));

      //ADD
      for (let item in differenceResponsablesAdd) {
        let usuarioSeleccionado = usersListAPI.filter(elemento => elemento.id == differenceResponsablesAdd[item])[0]
        if (usuarioSeleccionado != undefined) {
          insertarLogPersonaAPI({
            persona: usuarioSeleccionado.id,
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Add",
            wp_relacionado: misionPaquete.id,
            descripcion: "User with IDidentification:" + usuarioSeleccionado.IDidentification + " added to Work Package " + misionPaquete.name
          })

          //COMPROBACION DE QUE EL USUARIO AÑADIDO CUMPLE LOS REQUISITOS
          let cadenaEnvio = ""
          let envioEmail = false

          for (let itemWPApp in listRequerimentsByWP) {
            let aplicacionEmpleado1 = listUserApp.filter(elemento => elemento.user_id == usuarioSeleccionado.id)

            let aplicacionEmpleado2 = aplicacionEmpleado1.filter(elemento => elemento.aplication_user_id == listRequerimentsByWP[itemWPApp]['aplication_app_id'])[0]

            if (aplicacionEmpleado2 == undefined) {
              cadenaEnvio = cadenaEnvio + listRequerimentsByWP[itemWPApp]['aplication_app_id_code'] + "- " + listRequerimentsByWP[itemWPApp]['aplication_app_id_name'] + "\n "
              envioEmail = true
            }
            else {
              let hayIncidenciasExtras = false
              //SI ENCUENTRA LA APP TENGO QUE VER SI TIENE EL ESTADO CORRECTO
              //aplicacionEmpleado2 => elemento del userApp
              //listRequerimentsByWP[itemWPApp] => elemento del contractApp
              //requerimientoSeleccionado => requeriment select
              let requerimientoSeleccionado = appListAPI.filter(elemento => elemento.id == aplicacionEmpleado2.aplication_user_id)[0]

              if (requerimientoSeleccionado.tiene_valor == true) {
                if (requerimientoSeleccionado.tipo_valor == "List") {
                  let elementosList = requerimientoSeleccionado.listado_opciones.split(',')
                  let indiceUsuario = elementosList.indexOf(aplicacionEmpleado2.valor_asignado)
                  let indiceBloque = elementosList.indexOf(listRequerimentsByWP[itemWPApp].valor_asignado)

                  switch (listRequerimentsByWP[itemWPApp].operacion_logica) {
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
                  fechaHoy.setDate(fechaHoy.getDate() + listRequerimentsByWP[itemWPApp].diferencia_fecha)
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
                  let numeroBloque = parseInt(listRequerimentsByWP[itemWPApp].valor_comparacion)

                  switch (listRequerimentsByWP[itemWPApp].operacion_logica) {
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
                  cadenaEnvio = cadenaEnvio + listRequerimentsByWP[itemWPApp]['aplication_app_id_code'] + "-" + listRequerimentsByWP[itemWPApp]['aplication_app_id_name'] + "\n"
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
            wp_relacionado: misionPaquete.id,
            descripcion: "User with IDidentification:" + usuarioSeleccionado.IDidentification + " removed  to Work Package " + misionPaquete.name
          })
        }

      }
    }


    cambiarVisibilidadModalInsertar(false, '');
    mostrarMisionPaquetesAPI();

  }

  useEffect(() => {
    mostrarAppAPI()
  }, [])

  useEffect(() => {
    if (visibilidadModalInsertar == true) {
      mostrarAllDepartamentosAPI()
      mostrarALLUserAppAPI()
    }

  }, [visibilidadModalInsertar])

  useEffect(() => {
    //SE HA CREADO UN NUEVO WP, POR TANTO VAMOS A COMPROBAR SI SE HAN REALIZADO OPERACIONES DE INSERCCION DE USUARIOS
    if (newWPCreated != '') {
      for (let item in newWPCreated['responsableWP']) {
        let usuarioSeleccionado = usersListAPI.filter(elemento => elemento.id == newWPCreated['responsableWP'][item])[0]
        if (usuarioSeleccionado != undefined) {
          insertarLogPersonaAPI({
            persona: usuarioSeleccionado['id'],
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Add",
            wp_relacionado: newWPCreated['id'],
            descripcion: "User with IDidentification:" + usuarioSeleccionado['IDidentification'] + " added to Work Package " + newWPCreated['name']
          })
        }

      }
    }

  }, [newWPCreated])

  useEffect(() => {
    if (modo == 'nuevo') {
      setContratoAPI('')
      setNombreActual('')
      setDescripcionActual('')
      setCodigoActual('')
      setResponsableActual([])
    }

    if (modo == 'editar') {
      let misionPaquete = listMisionPaquetesAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

      if(misionPaquete != undefined){
        let programasSelected = contratoListAPI.filter(registro => registro.id == misionPaquete?.id_service)[0]
        setContratoAPI(programasSelected)
      }

      

      if (misionPaquete != null) {

        let vectIDManager = []
        for (let aux in misionPaquete.responsableWP) {
          let userSelect = usersListAPI.filter(item => item.id == misionPaquete.responsableWP[aux])[0]
          vectIDManager.push(userSelect)
        }

        setNombreActual(misionPaquete.name)
        setDescripcionActual(misionPaquete.description)
        setCodigoActual(misionPaquete.code)
        setResponsableActual(vectIDManager)

      }
    }

  }, [modo])


  return (
    <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false, '')} fullWidth maxWidth='md'>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        {modo == 'nuevo' ? 'New Work Package' : 'Edit Work Package'}
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
              id="code"
              value={codigoActual}
              size="small"
              fullWidth
              onChange={e => setCodigoActual(e.target.value)}
            />

          </Grid>

          {/*<Grid item xs={8}>
            <FormControl variant="standard" sx={{ m: 1, width: '37ch' }} size="small">
              <InputLabel id="label-select-program">Contract</InputLabel>
              <Select
                labelId="label-select-program"
                id="contract"
                label="Contract"
                onChange={e => setContratoAPI(e.target.value)}
                value={contratoList.id}
              >
                {contratoListAPI.map((elemento) => (
                  <MenuItem value={elemento.id}> {elemento.name} </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>*/}

          <Grid item xs={8}>

            <FormControl variant="standard" fullWidth size="small">
              <Autocomplete
                id="tags-outlined"
                options={contratoListAPI}
                value={contratoList != undefined ? contratoList : ''}
                inputValue={contratoList != null ? contratoList.name : ''}
                onChange={(event, value) => setContratoAPI(value)}
                getOptionLabel={(option) =>
                  option.name != null ? option.name : ''
                }
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Contract"
                    placeholder="Contract"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </FormControl>


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
                  label="Employee"
                  placeholder="Employee"
                  size="small"
                  fullWidth
                />
              )}
            />


          </Grid>

          <Grid item xs={16}>

            <TextField
              id="descripcion"
              label="Description"
              multiline
              rows={2}
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
        <Button disabled={botonControlSave} onClick={() => crearConjunto()}>Save</Button>

      </DialogActions>
    </Dialog>
  )
}

