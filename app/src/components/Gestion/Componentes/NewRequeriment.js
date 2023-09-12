//**********************IMPORTACIONES****************************

import * as React from 'react';
import { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
import Typography from '@material-ui/core/Typography';
import { matchRoutes, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';

//Grid importaciones
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux'

import {
  postContractAppAPIAction,
} from '../SubMision/store/actions'

import {
  postMisionAppAPIAction
} from '../Mision/store/actions'

import {
  postWorkPackageAppAPIAction
} from '../PaqueteTrabajo/store/actions'

import {
  postDepartamentoAppAPIAction,
  postDireccionDepartamentalAppAPIAction
} from '../Departamentos/store/actions'

import {
  insertarNewPeticionRequerimientoAPIAction
} from '../../Managment/PeticionRequeriments/store/actions'

const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});

export default function NewRequeriment(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [botonControl, setBotonControl] = useState(true)
  const [requirementSelect, setRequirementSelect] = useState('')
  const [jobSelect, setJobSelect] = useState('')
  const [requerimientoExistente, setRequerimientoExistente] = useState(false)
  const [tipoValorExtraRequerimiento, setTipoValorExtraRequerimiento] = useState('')
  const [valorListaRequerimiento, setValorListaRequerimiento] = useState('')
  const [vectorListaRequerimiento, setVectorListaRequerimiento] = useState([])
  const [tipoRequisito, setTipoRequisito] = useState('')

  const [modoCalculoRequerimiento, setModoCalculoRequerimiento] = useState(1);
  const [valorObjetivoRequerimiento, setValorObjetivoRequerimiento] = useState(1);
  const [diferenciaFechaRequerimiento, setDiferenciaFechaRequerimiento] = useState(0);

  const appListAPI = useSelector(state => state.fuse.appComponent.appListAPI)
  const listJobSubMision = useSelector(state => state.fuse.subMisionComponent.listJobSubMision)
  const listPeopleContrato = useSelector(state => state.fuse.subMisionComponent.listPeopleContratoAPI)
  const listContractApp = useSelector(state => state.fuse.subMisionComponent.listContractApp)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const listRequerimentsByMision = useSelector(state => state.fuse.misionComponent.listRequerimentsByMision)
  const listRequerimentsByWP = useSelector(state => state.fuse.misionPaqueteComponente.listRequerimentsByWP)

  const postContractAppAPI = (datos) => dispatch(postContractAppAPIAction(datos))
  const postMisionAppAPI = (misionActual, json) => dispatch(postMisionAppAPIAction(misionActual, json))
  const postWPAppAPI = (wpActual, json) => dispatch(postWorkPackageAppAPIAction(wpActual, json))
  const postDepartamentoAppAPI = (wpActual, json) => dispatch(postDepartamentoAppAPIAction(wpActual, json))
  const postDireccionDepartamentalAppAPi = (wpActual, json) => dispatch(postDireccionDepartamentalAppAPIAction(wpActual, json))
  const insertarNewPeticionRequerimientoAPI = (data) => dispatch(insertarNewPeticionRequerimientoAPIAction(data))

  //DETECTAR CAMBIOS DE SUB MISION
  useEffect(() => {

    let requerimientoExiste = false
    let camposSolicitadosCompletados = true

    if (props.grupo == "subMision") {
      if (jobSelect != '' && jobSelect != null && jobSelect != undefined && requirementSelect != '' && requirementSelect != null && requirementSelect != undefined) {
        camposSolicitadosCompletados = true
        let resultadoFilter = listContractApp.filter(elemento => elemento.job == jobSelect.id && elemento.aplication_app_id == requirementSelect.id)
        if (resultadoFilter.length != 0) {
          //REQUERIMIENTO YA EXISTENTE
          requerimientoExiste = true
        }
      }
      else {
        camposSolicitadosCompletados = false
      }
    }

    if (props.grupo == "mision") {
      if (tipoRequisito != '' && tipoRequisito != null && tipoRequisito != undefined && requirementSelect != '' && requirementSelect != null && requirementSelect != undefined) {
        camposSolicitadosCompletados = true
        let resultadoFilter = listRequerimentsByMision.filter(elemento => elemento.type == tipoRequisito && elemento.aplication_app_id == requirementSelect.id)
        if (resultadoFilter.length != 0) {
          //REQUERIMIENTO YA EXISTENTE
          requerimientoExiste = true
        }
      }
      else {
        camposSolicitadosCompletados = false
      }
    }

    //GESTION SI EL REQUERIMIENTO NO ESTA YA AÑADIDO
    if (requerimientoExiste == false && camposSolicitadosCompletados == true) {
      //MUESTRA LA GESTION SI ES NECESARIO
      if (requirementSelect.tiene_valor == true) {
        setTipoValorExtraRequerimiento(requirementSelect.tipo_valor)
        if (requirementSelect.tipo_valor == "List") {
          let vectorListado = requirementSelect.listado_opciones.split(',')
          setVectorListaRequerimiento(vectorListado)
        }
      }
      else {
        setTipoValorExtraRequerimiento('')
        setVectorListaRequerimiento([])
      }
    }

    setRequerimientoExistente(requerimientoExiste)

  }, [requirementSelect, jobSelect, tipoRequisito]);

  useEffect(() => {

    let valoresSecundariosRellenos = true
    if (props.grupo == "subMision") {
      if (jobSelect != '' && jobSelect != null && jobSelect != undefined) {
        valoresSecundariosRellenos = true
      }
      else {
        valoresSecundariosRellenos = false
      }
    }

    if (props.grupo == "mision") {
      if (tipoRequisito != '' && tipoRequisito != null && tipoRequisito != undefined) {
        valoresSecundariosRellenos = true
      }
      else {
        valoresSecundariosRellenos = false
      }
    }

    if (requerimientoExistente == false && valoresSecundariosRellenos == true && requirementSelect != '' && requirementSelect != null && requirementSelect != undefined) {
      //COMPROBACION DE CASUISTICA ESPECIAL
      if (tipoValorExtraRequerimiento == "Number" || tipoValorExtraRequerimiento == "List") {
        if ((tipoValorExtraRequerimiento == "Number" && valorObjetivoRequerimiento != "") || (tipoValorExtraRequerimiento == "List" && valorListaRequerimiento != "")) {
          setBotonControl(false)
        }
        else {
          setBotonControl(true)
        }
      }
      else {
        setBotonControl(false)
      }
    }
    else {
      setBotonControl(true)
    }

  })

  function assignarApp() {

    if (props.grupo == "subMision") {
      postContractAppAPI({
        subMision_id: props.subMisionSelect.id,
        aplication_app_id: requirementSelect.id,
        job: jobSelect.id,
        valor_asignado: requirementSelect.tipo_valor == "List" ? valorListaRequerimiento : '',
        valor_comparacion: requirementSelect.tipo_valor == "Number" ? valorObjetivoRequerimiento : undefined,
        operacion_logica: requirementSelect.tipo_valor == "Number" || requirementSelect.tipo_valor == "List" ? modoCalculoRequerimiento : undefined,
        diferencia_fecha: requirementSelect.tipo_valor == "Date" ? diferenciaFechaRequerimiento : undefined
      })

      //SE DEBE COMPROBAR QUE LOS EMPLEADOS TIENEN LA APLICACION
      funcionCompruebaRequisitos(listPeopleContrato)
    }

    if (props.grupo == "mision") {
      postMisionAppAPI(props.misionSelect.id, {
        mision_id: props.misionSelect.id,
        aplication_app_id: requirementSelect.id,
        type: tipoRequisito,
        valor_asignado: requirementSelect.tipo_valor == "List" ? valorListaRequerimiento : '',
        valor_comparacion: requirementSelect.tipo_valor == "Number" ? valorObjetivoRequerimiento : undefined,
        operacion_logica: requirementSelect.tipo_valor == "Number" || requirementSelect.tipo_valor == "List" ? modoCalculoRequerimiento : undefined,
        diferencia_fecha: requirementSelect.tipo_valor == "Date" ? diferenciaFechaRequerimiento : undefined
      })

      //SE DEBE COMPROBAR QUE LOS EMPLEADOS TIENEN LA APLICACION
      let vectorUser = []
      if (tipoRequisito == "Manager") {
        for (let itemUser in props.misionSelect.responsables) {
          let userFind = usersListAPI.filter(elemento => elemento.id == props.misionSelect.responsables[itemUser])[0]
          vectorUser.push(userFind)
        }
      }

      if (tipoRequisito == "Employee") {
        for (let itemUser in props.misionSelect.empleados) {
          let userFind = usersListAPI.filter(elemento => elemento.id == props.misionSelect.empleados[itemUser])[0]
          vectorUser.push(userFind)
        }
      }
      funcionCompruebaRequisitos(vectorUser)
    }

    if (props.grupo == "wp") {

      postWPAppAPI(props.wpSelect.id, {
        workPackage_id: props.wpSelect.id,
        aplication_app_id: requirementSelect.id,
        valor_asignado: requirementSelect.tipo_valor == "List" ? valorListaRequerimiento : '',
        valor_comparacion: requirementSelect.tipo_valor == "Number" ? valorObjetivoRequerimiento : undefined,
        operacion_logica: requirementSelect.tipo_valor == "Number" || requirementSelect.tipo_valor == "List" ? modoCalculoRequerimiento : undefined,
        diferencia_fecha: requirementSelect.tipo_valor == "Date" ? diferenciaFechaRequerimiento : undefined
      })

      //SE DEBE COMPROBAR QUE LOS EMPLEADOS TIENEN LA APLICACION
      let vectorUser = []
      for (let itemUser in props.wpSelect.responsableWP) {
        let userFind = usersListAPI.filter(elemento => elemento.id == props.wpSelect.responsableWP[itemUser])[0]
        vectorUser.push(userFind)
      }

      funcionCompruebaRequisitos(vectorUser)
    }

    if (props.grupo == "departamento") {

      postDepartamentoAppAPI(props.departamentoSelect.id, {
        departamento_id: props.departamentoSelect.id,
        aplication_app_id: requirementSelect.id,
        valor_asignado: requirementSelect.tipo_valor == "List" ? valorListaRequerimiento : '',
        valor_comparacion: requirementSelect.tipo_valor == "Number" ? valorObjetivoRequerimiento : undefined,
        operacion_logica: requirementSelect.tipo_valor == "Number" || requirementSelect.tipo_valor == "List" ? modoCalculoRequerimiento : undefined,
        diferencia_fecha: requirementSelect.tipo_valor == "Date" ? diferenciaFechaRequerimiento : undefined
      })

      //SE DEBE COMPROBAR QUE LOS EMPLEADOS TIENEN LA APLICACION
      let vectorUser = []
      for (let itemUser in props.departamentoSelect.responsableDepartamento) {
        let userFind = usersListAPI.filter(elemento => elemento.id == props.departamentoSelect.responsableDepartamento[itemUser])[0]
        vectorUser.push(userFind)
      }

      funcionCompruebaRequisitos(vectorUser)
    }

    if (props.grupo == "direccionDepartamental") {

      postDireccionDepartamentalAppAPi(props.direccionDepartamentalSelect.id, {
        direccionDepartamental_id: props.direccionDepartamentalSelect.id,
        aplication_app_id: requirementSelect.id,
        valor_asignado: requirementSelect.tipo_valor == "List" ? valorListaRequerimiento : '',
        valor_comparacion: requirementSelect.tipo_valor == "Number" ? valorObjetivoRequerimiento : undefined,
        operacion_logica: requirementSelect.tipo_valor == "Number" || requirementSelect.tipo_valor == "List" ? modoCalculoRequerimiento : undefined,
        diferencia_fecha: requirementSelect.tipo_valor == "Date" ? diferenciaFechaRequerimiento : undefined
      })

      //SE DEBE COMPROBAR QUE LOS EMPLEADOS TIENEN LA APLICACION
      let vectorUser = []
      for (let itemUser in props.direccionDepartamentalSelect.responsablesDD) {
        let userFind = usersListAPI.filter(elemento => elemento.id == props.direccionDepartamentalSelect.responsablesDD[itemUser])[0]
        vectorUser.push(userFind)
      }

      funcionCompruebaRequisitos(vectorUser)
    }

  }

  function funcionCompruebaRequisitos(listUser) {
    for (let item in listUser) {
      let aplicacionEmpleado = listUserApp.filter(elemento => elemento.user_id == listUser[item].id)
      let aplicacionEmpleadoF2 = aplicacionEmpleado.filter(elemento => elemento.aplication_user_id == requirementSelect.id)[0]

      let envioEmail = false
      if (aplicacionEmpleadoF2 == undefined) {
        envioEmail = true
      }
      else {
        if (listUser[item]['job_employee'] == jobSelect.name) {
          if (requirementSelect.tiene_valor == true) {
            if (requirementSelect.tipo_valor == "List") {
              let elementosList = requirementSelect.listado_opciones.split(',')
              let indiceUsuario = elementosList.indexOf(aplicacionEmpleadoF2.valor_asignado)
              let indiceBloque = elementosList.indexOf(valorListaRequerimiento)

              switch (modoCalculoRequerimiento) {
                case 1:
                  //indiceUsuario < indiceBloque
                  if (indiceUsuario >= indiceBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 2:
                  //indiceUsuario <= indiceBloque
                  if (indiceUsuario > indiceBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 3:
                  //indiceUsuario == indiceBloque
                  if (indiceUsuario != indiceBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 4:
                  //indiceUsuario >= indiceBloque
                  if (indiceUsuario < indiceBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 5:
                  //indiceUsuario > indiceBloque
                  if (indiceUsuario <= indiceBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 6:
                  //indiceUsuario != indiceBloque
                  if (indiceUsuario == indiceBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
              }

            }
            if (requirementSelect.tipo_valor == "Date") {
              let fechaHoy = new Date()
              fechaHoy.setDate(fechaHoy.getDate() + diferenciaFechaRequerimiento)
              let fechaUsuario = new Date(aplicacionEmpleadoF2.valor_asignado_fecha)
              var day_as_milliseconds = 86400000;
              var diff_in_millisenconds = fechaUsuario - fechaHoy;
              var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

              if (diff_in_days < 0) {
                //HAY INCIDENCIA
                envioEmail = true
              }
            }
            if (requirementSelect.tipo_valor == "Number") {
              let numeroUsuario = parseInt(aplicacionEmpleadoF2.valor_comparacion)
              let numeroBloque = parseInt(valorObjetivoRequerimiento)

              switch (modoCalculoRequerimiento) {
                case 1:
                  //numeroUsuario < numeroBloque
                  if (numeroUsuario >= numeroBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 2:
                  //numeroUsuario <= numeroBloque
                  if (numeroUsuario > numeroBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 3:
                  //numeroUsuario == numeroBloque
                  if (numeroUsuario != numeroBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 4:
                  //numeroUsuario >= numeroBloque
                  if (numeroUsuario < numeroBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 5:
                  //numeroUsuario > numeroBloque
                  if (numeroUsuario <= numeroBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
                case 6:
                  //numeroUsuario != numeroBloque
                  if (numeroUsuario == numeroBloque) {
                    //HAY INCIDENCIA
                    envioEmail = true
                  }
                  break;
              }
            }
          }
        }
      }

      if (envioEmail == true) {
        insertarNewPeticionRequerimientoAPI({
          persona: listUser[item].id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          descripcion: "User: " + listUser[item].first_name + " needs a new requirement: " + requirementSelect.name,
          active: true
        })
      }

    }

    setRequirementSelect('')
    setJobSelect('')
    resetValue()



  }

  function resetValue() {
    setTipoValorExtraRequerimiento('')
    setValorListaRequerimiento('')
    setVectorListaRequerimiento([])
    setModoCalculoRequerimiento(1)
    setValorObjetivoRequerimiento(1)

    setTipoRequisito('')
  }

  return (
    <>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2} columns={16}>


        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item >

          <Alert severity="warning" style={requerimientoExistente == true ? { display: "" } : { display: "none" }}>
            <AlertTitle>This requirements is duplicated</AlertTitle>
          </Alert>
          <div>
            <Autocomplete
              id="tags-outlined"
              groupBy={(option) => option.type}
              options={appListAPI}
              value={requirementSelect}
              getOptionLabel={(option) => option != '' ? option.type + " - " + option.name : ''}
              getOptionDisabled={(option) =>
                !!listRequerimentsByWP.find(element => element.aplication_app_id_name === option.name)
              }
              onChange={(event, value) => setRequirementSelect(value)}
              filterSelectedOptions
              renderGroup={(params) => (
                <Box style={{ marginLeft: "10px" }} key={params.id}>
                  <b>
                    {params.group}
                  </b>
                  {params.children}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Requirements"
                  placeholder="Requirements"
                  size="small"
                  sx={{ m: 1, width: '50ch' }}
                />
              )}
            />
          </div>
          <div>
            <Autocomplete
              style={props.grupo == "subMision" ? { display: "" } : { display: "none" }}
              id="tags-outlined"
              options={listJobSubMision}
              value={jobSelect}
              getOptionLabel={(option) => option != '' ? option.name : ''}
              onChange={(event, value) => setJobSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Position"
                  size="small"
                  sx={{ m: 1, width: '50ch' }}
                />
              )}
            />
          </div>
          <div>
            <FormControl style={props.grupo == "mision" ? { display: "" } : { display: "none" }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="rol"
                label="Type"
                size="small"
                sx={{ m: 1, width: '50ch' }}
                value={tipoRequisito}
                onChange={e => { setTipoRequisito(e.target.value); }}
              >

                <MenuItem value={"Manager"}>Manager</MenuItem>
                <MenuItem value={"Employee"}>Employee</MenuItem>

              </Select>
            </FormControl>
          </div>


          <div style={tipoValorExtraRequerimiento == "Number" ? { display: '' } : { display: 'none' }}>

            {/*SI SE ELIGE NUMERO */}

            <TextField
              type="number"
              shrink
              label="Value"
              id="objetive"
              placeholder="Examples: 4"
              value={valorObjetivoRequerimiento}
              size="small"
              sx={{ m: 1, width: '50ch' }}
              onChange={e => setValorObjetivoRequerimiento(e.target.value)}
            />
          </div>

          <div style={tipoValorExtraRequerimiento == "Date" ? { display: '' } : { display: 'none' }}>

            {/*SI SE ELIGE NUMERO */}

            <TextField
              type="number"
              shrink
              label="Date difference"
              id="objetive"
              placeholder="Examples: -5, 30"
              value={diferenciaFechaRequerimiento}
              size="small"
              sx={{ m: 1, width: '50ch' }}
              onChange={e => setDiferenciaFechaRequerimiento(e.target.value)}
            />
          </div>

          <div style={tipoValorExtraRequerimiento == "Number" || tipoValorExtraRequerimiento == "List" ? { display: '' } : { display: 'none' }}>

            <FormControl variant="outlined" size="small" sx={{ m: 1, width: '50ch' }}>
              <InputLabel id="label-select-risk-management">Calculation mode</InputLabel>
              <Select
                labelId="label-select-detection"
                id="calculationMode"
                label="Calculation mode"
                onChange={e => { setModoCalculoRequerimiento(e.target.value); }}
                value={modoCalculoRequerimiento}

              >
                <MenuItem value={1}>Result lower than target the value.</MenuItem>
                <MenuItem value={2}>Result less than or equal to the value.</MenuItem>
                <MenuItem value={3}>Result same as value.</MenuItem>
                <MenuItem value={4}>Result greater than or equal to the value.</MenuItem>
                <MenuItem value={5}>Result greater than the value.</MenuItem>
                <MenuItem value={6}>Result different from the value.</MenuItem>

              </Select>
            </FormControl>


          </div>

          <Button
            disabled={botonControl}
            sx={{ m: 1, width: '50ch' }}
            className="ml-8"
            variant="contained"
            color="secondary"
            onClick={() => {
              assignarApp()
              //cambiarVisibilidadModalAssignedAppAPI(false)
            }}
          >
            ASSIGN

          </Button>

        </Grid>
      </Grid>
    </>
  )
}