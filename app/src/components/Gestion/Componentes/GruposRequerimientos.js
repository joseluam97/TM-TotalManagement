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
import EditIcon from '@mui/icons-material/Edit';

//Grid importaciones
import Grid from '@mui/material/Grid';
import ListRequerimentsMain from './ListRequerimentsMain'
import ListRequerimentsEdit from './ListRequerimentsEdit'

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

export default function GruposRequerimientos(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [grupoSelect, setGrupoSelect] = useState('')
  const [botonControl, setBotonControl] = useState(true)
  const [reportarIncidencia, setReportarIncidencia] = useState(false)
  const [textoIncidencia, setTextoIncidencia] = useState('')
  const [textoDescarteRequerimientos, setTextoDescarteRequerimientos] = useState('')
  const [jobSelect, setJobSelect] = useState('')
  const [visibilidadDialogoDetallesGrupo, setVisibilidadDialogoDetallesGrupo] = useState(false)
  const [visibilidadDialogoEditarGrupo, setVisibilidadDialogoEditarGrupo] = useState(false)
  const [tipoRequisito, setTipoRequisito] = useState('')

  const [vectorRequerimientosGrupo, setVectorRequerimientosGrupo] = useState([])

  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)

  const listPeopleContrato = useSelector(state => state.fuse.subMisionComponent.listPeopleContratoAPI)

  const listGruposAPI = useSelector(state => state.fuse.gestionAplicationComponent.listGruposAPI)
  //LISTA DE JOB DE LA SUB MISION
  const listJobSubMision = useSelector(state => state.fuse.subMisionComponent.listJobSubMision)

  //LISTA DE REQUERIMIENTOS AÑADIDOS EN LA SUBMISION
  const listContractApp = useSelector(state => state.fuse.subMisionComponent.listContractApp)
  //LISTA DE REQUERIMIENTOS AÑADIDOS EN LA MISION
  const listRequerimentsByMision = useSelector(state => state.fuse.misionComponent.listRequerimentsByMision)
  //LISTA DE REQUERIMIENTOS AÑADIDOS EN EL WP
  const listRequerimentsByWP = useSelector(state => state.fuse.misionPaqueteComponente.listRequerimentsByWP)
  //LISTA DE REQUERIMIENTOS AÑADIDOS EN EL DEPARTAMENTO
  const listRequerimentsByDepartment = useSelector(state => state.fuse.departamentoViewComponente.listRequerimentsByDepartment)
  //LISTA DE REQUERIMIENTOS AÑADIDOS EN LA DIRECCION DEPARTAMENTAL
  const listRequerimentsByDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.listRequerimentsByDireccionDepartamental)

  const postContractAppAPI = (datos) => dispatch(postContractAppAPIAction(datos))
  const postMisionAppAPI = (misionActual, json) => dispatch(postMisionAppAPIAction(misionActual, json))
  const postWPAppAPI = (wpActual, json) => dispatch(postWorkPackageAppAPIAction(wpActual, json))
  const postDepartamentoAppAPI = (wpActual, json) => dispatch(postDepartamentoAppAPIAction(wpActual, json))
  const postDireccionDepartamentalAppAPi = (wpActual, json) => dispatch(postDireccionDepartamentalAppAPIAction(wpActual, json))
  const insertarNewPeticionRequerimientoAPI = (data) => dispatch(insertarNewPeticionRequerimientoAPIAction(data))

  useEffect(() => {
    if (grupoSelect.aplicaciones_all != undefined) {
      setVectorRequerimientosGrupo(grupoSelect.aplicaciones_all)
    }
  }, [grupoSelect])

  useEffect(() => {

    if (vectorRequerimientosGrupo.length != 0) {
      if (vectorRequerimientosGrupo.length != grupoSelect.aplicaciones_all.length) {
        setTextoDescarteRequerimientos(grupoSelect.aplicaciones_all.length - vectorRequerimientosGrupo.length)
      }
      else {
        setTextoDescarteRequerimientos("")
      }
    }
    else {
      setTextoDescarteRequerimientos("")
    }

  }, [vectorRequerimientosGrupo])

  useEffect(() => {

    if (props.grupo == "subMision") {
      if (grupoSelect != '' && grupoSelect != null && grupoSelect != '' && jobSelect != '' && jobSelect != null && jobSelect != '') {
        setBotonControl(false)
      }
      else {
        setBotonControl(true)
      }
    }
    if (props.grupo == "mision") {
      if (grupoSelect != '' && grupoSelect != null && grupoSelect != '' && tipoRequisito != '' && tipoRequisito != null && tipoRequisito != '') {
        setBotonControl(false)
      }
      else {
        setBotonControl(true)
      }
    }

    if (props.grupo != "subMision" && props.grupo != "mision") {
      if (grupoSelect != '' && grupoSelect != null && grupoSelect != '') {
        setBotonControl(false)
      }
      else {
        setBotonControl(true)
      }
    }

  })

  useEffect(() => {

    //COMPROBAR SI HAY INCIDENCIAS
    if (grupoSelect != "" && grupoSelect != undefined && grupoSelect != null) {
      let cadenaIncidencia = ""
      let numRequerimentsDuplicated = 0

      if (props.grupo == 'subMision') {
        if (jobSelect != "" && jobSelect != undefined && jobSelect != null) {
          for (let itemContractApp in listContractApp) {
            let existeElemento = vectorRequerimientosGrupo.filter(elemento =>
              elemento['requeriment'] == listContractApp[itemContractApp].aplication_app_id &&
              jobSelect.id == listContractApp[itemContractApp].job
            )[0]

            if (existeElemento != undefined) {

              numRequerimentsDuplicated = numRequerimentsDuplicated + 1
              if (numRequerimentsDuplicated == 1) {
                cadenaIncidencia = cadenaIncidencia + listContractApp[itemContractApp].name + ", "
              }
              if (numRequerimentsDuplicated == 2) {
                cadenaIncidencia = cadenaIncidencia + listContractApp[itemContractApp].name + " "
              }

            }
          }
        }
      }

      if (props.grupo == 'mision') {
        if (tipoRequisito != '' && tipoRequisito != null && tipoRequisito != '') {
          for (let itemMision in listRequerimentsByMision) {
            console.log("-BUCLE-")
            console.log(listRequerimentsByMision[itemMision].aplication_app_id)
            console.log(listRequerimentsByMision[itemMision].type)
            console.log(vectorRequerimientosGrupo[0]['requeriment'])
            let existeElemento = vectorRequerimientosGrupo.filter(elemento =>
              elemento['requeriment'] == listRequerimentsByMision[itemMision].aplication_app_id &&
              tipoRequisito == listRequerimentsByMision[itemMision].type
            )[0]

            console.log(existeElemento)

            if (existeElemento != undefined) {

              numRequerimentsDuplicated = numRequerimentsDuplicated + 1
              if (numRequerimentsDuplicated == 1) {
                cadenaIncidencia = cadenaIncidencia + listContractApp[itemMision].name + ", "
              }
              if (numRequerimentsDuplicated == 2) {
                cadenaIncidencia = cadenaIncidencia + listContractApp[itemMision].name + " "
              }

            }
          }
        }
      }

      if (props.grupo == "wp") {
        for (let itemWP in listRequerimentsByWP) {
          let existeElemento = vectorRequerimientosGrupo.filter(elemento =>
            elemento['requeriment'] == listRequerimentsByWP[itemWP].aplication_app_id
          )[0]

          if (existeElemento != undefined) {

            numRequerimentsDuplicated = numRequerimentsDuplicated + 1
            if (numRequerimentsDuplicated == 1) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemWP].name + ", "
            }
            if (numRequerimentsDuplicated == 2) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemWP].name + " "
            }

          }
        }
      }

      if (props.grupo == "departamento") {
        for (let itemDepartamento in listRequerimentsByDepartment) {
          let existeElemento = vectorRequerimientosGrupo.filter(elemento =>
            elemento['requeriment'] == listRequerimentsByDepartment[itemDepartamento].aplication_app_id
          )[0]

          if (existeElemento != undefined) {

            numRequerimentsDuplicated = numRequerimentsDuplicated + 1
            if (numRequerimentsDuplicated == 1) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemDepartamento].name + ", "
            }
            if (numRequerimentsDuplicated == 2) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemDepartamento].name + " "
            }

          }
        }
      }

      if (props.grupo == "direccionDepartamental") {
        for (let itemDD in listRequerimentsByDireccionDepartamental) {
          let existeElemento = vectorRequerimientosGrupo.filter(elemento =>
            elemento['requeriment'] == listRequerimentsByDireccionDepartamental[itemDD].aplication_app_id
          )[0]

          if (existeElemento != undefined) {

            numRequerimentsDuplicated = numRequerimentsDuplicated + 1
            if (numRequerimentsDuplicated == 1) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemDD].name + ", "
            }
            if (numRequerimentsDuplicated == 2) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemDD].name + " "
            }

          }
        }
      }

      //REPORTAR INCIDENCIA
      if (cadenaIncidencia != "") {
        setReportarIncidencia(true)

        //SI HAY MAS DE 3 SE PONE LOS 2 PRIMEROS Y X MAS REQUISITOS
        if (parseInt(numRequerimentsDuplicated) > 3) {
          let cadenaResultado = ""
          cadenaResultado = cadenaIncidencia.concat("and ", parseInt(numRequerimentsDuplicated) - 2, " more")
          setTextoIncidencia(cadenaResultado)
        }
        else {
          setTextoIncidencia(cadenaIncidencia)
        }

      }
      else {
        setReportarIncidencia(false)
        setTextoIncidencia('')
      }

    }

  }, [grupoSelect, jobSelect, tipoRequisito, vectorRequerimientosGrupo])

  useEffect(() => {
    //COMPROBAR SI HAY INCIDENCIAS
    if (props.grupo == 'subMision') {
      if (grupoSelect != "" && grupoSelect != undefined && grupoSelect != null && jobSelect != "" && jobSelect != undefined && jobSelect != null) {
        let cadenaIncidencia = ""
        let numRequerimentsDuplicated = 0

        for (let itemContractApp in listContractApp) {
          //console.log(grupoSelect.aplicaciones_all)
          //console.log(listContractApp[itemContractApp])
          let existeElemento = vectorRequerimientosGrupo.filter(elemento =>
            elemento['requeriment'] == listContractApp[itemContractApp].aplication_app_id &&
            jobSelect.id == listContractApp[itemContractApp].job
          )[0]

          //console.log(existeElemento)

          if (existeElemento != undefined) {

            numRequerimentsDuplicated = numRequerimentsDuplicated + 1
            if (numRequerimentsDuplicated == 1) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemContractApp].name + ", "
            }
            if (numRequerimentsDuplicated == 2) {
              cadenaIncidencia = cadenaIncidencia + listContractApp[itemContractApp].name + " "
            }

          }
        }

        //REPORTAR INCIDENCIA
        if (cadenaIncidencia != "") {
          setReportarIncidencia(true)

          //SI HAY MAS DE 3 SE PONE LOS 2 PRIMEROS Y X MAS REQUISITOS
          if (parseInt(numRequerimentsDuplicated) > 3) {
            let cadenaResultado = ""
            cadenaResultado = cadenaIncidencia.concat("and ", parseInt(numRequerimentsDuplicated) - 2, " more")
            setTextoIncidencia(cadenaResultado)
          }
          else {
            setTextoIncidencia(cadenaIncidencia)
          }

        }
        else {
          setReportarIncidencia(false)
          setTextoIncidencia('')
        }
      }
    }

  }, [grupoSelect, jobSelect, vectorRequerimientosGrupo])

  function asignarNuevoGrupo() {

    if (props.grupo == 'subMision') {
      //props.subMisionSelect
      for (let itemApp in vectorRequerimientosGrupo) {
        let itemAplicacion = vectorRequerimientosGrupo[itemApp]

        postContractAppAPI({
          subMision_id: props.subMisionSelect.id,
          aplication_app_id: itemAplicacion.requeriment,
          job: jobSelect.id,
          valor_asignado: itemAplicacion.requeriment_tipo_valor == "List" ? itemAplicacion.valor_asignado : '',
          valor_comparacion: itemAplicacion.requeriment_tipo_valor == "Number" ? itemAplicacion.valor_comparacion : undefined,
          operacion_logica: itemAplicacion.requeriment_tipo_valor == "Number" || itemAplicacion.requeriment_tipo_valor == "List" ? itemAplicacion.operacion_logica : undefined,
          diferencia_fecha: itemAplicacion.diferencia_fecha == "Date" ? itemAplicacion.diferencia_fecha : undefined
        })
      }

      //SE DEBE COMPROBAR QUE LOS EMPLEADOS TIENEN LA APLICACION
      funcionCompruebaRequisitos(listPeopleContrato, vectorRequerimientosGrupo)

    }

    if (props.grupo == 'mision') {
      for (let itemApp in vectorRequerimientosGrupo) {
        let itemAplicacion = vectorRequerimientosGrupo[itemApp]

        postMisionAppAPI(props.misionSelect.id, {
          mision_id: props.misionSelect.id,
          aplication_app_id: itemAplicacion['requeriment'],
          type: tipoRequisito,
          valor_asignado: itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['valor_asignado'] : '',
          valor_comparacion: itemAplicacion['requeriment_tipo_valor'] == "Number" ? itemAplicacion['valor_comparacion'] : undefined,
          operacion_logica: itemAplicacion['requeriment_tipo_valor'] == "Number" || itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['operacion_logica'] : undefined,
          diferencia_fecha: itemAplicacion['requeriment_tipo_valor'] == "Date" ? itemAplicacion['diferencia_fecha'] : undefined
        })

      }

      //SE DEBE COMPROBAR QUE LOS USUARIOS TIENEN LA APLICACION
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

      funcionCompruebaRequisitos(vectorUser, vectorRequerimientosGrupo)

    }

    if (props.grupo == 'wp') {
      for (let itemApp in vectorRequerimientosGrupo) {
        let itemAplicacion = vectorRequerimientosGrupo[itemApp]

        postWPAppAPI(props.wpSelect.id, {
          workPackage_id: props.wpSelect.id,
          aplication_app_id: itemAplicacion['requeriment'],
          valor_asignado: itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['valor_asignado'] : '',
          valor_comparacion: itemAplicacion['requeriment_tipo_valor'] == "Number" ? itemAplicacion['valor_comparacion'] : undefined,
          operacion_logica: itemAplicacion['requeriment_tipo_valor'] == "Number" || itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['operacion_logica'] : undefined,
          diferencia_fecha: itemAplicacion['requeriment_tipo_valor'] == "Date" ? itemAplicacion['diferencia_fecha'] : undefined
        })

      }

      let vectorUser = []
      for (let itemUser in props.wpSelect.responsableWP) {
        let userFind = usersListAPI.filter(elemento => elemento.id == props.wpSelect.responsableWP[itemUser])[0]
        vectorUser.push(userFind)
      }

      //SE DEBE COMPROBAR QUE LOS USUARIOS TIENEN LA APLICACION
      funcionCompruebaRequisitos(vectorUser, vectorRequerimientosGrupo)


    }

    if (props.grupo == 'departamento') {
      for (let itemApp in vectorRequerimientosGrupo) {
        let itemAplicacion = vectorRequerimientosGrupo[itemApp]

        postDepartamentoAppAPI(props.departamentoSelect.id, {
          departamento_id: props.departamentoSelect.id,
          aplication_app_id: itemAplicacion['requeriment'],
          valor_asignado: itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['valor_asignado'] : '',
          valor_comparacion: itemAplicacion['requeriment_tipo_valor'] == "Number" ? itemAplicacion['valor_comparacion'] : undefined,
          operacion_logica: itemAplicacion['requeriment_tipo_valor'] == "Number" || itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['operacion_logica'] : undefined,
          diferencia_fecha: itemAplicacion['requeriment_tipo_valor'] == "Date" ? itemAplicacion['diferencia_fecha'] : undefined
        })

      }

      let vectorUser = []
      for (let itemUser in props.departamentoSelect.responsableDepartamento) {
        let userFind = usersListAPI.filter(elemento => elemento.id == props.departamentoSelect.responsableDepartamento[itemUser])[0]
        vectorUser.push(userFind)
      }

      //SE DEBE COMPROBAR QUE LOS USUARIOS TIENEN LA APLICACION
      funcionCompruebaRequisitos(vectorUser, vectorRequerimientosGrupo)


    }

    if (props.grupo == 'direccionDepartamental') {
      for (let itemApp in vectorRequerimientosGrupo) {
        let itemAplicacion = vectorRequerimientosGrupo[itemApp]

        postDireccionDepartamentalAppAPi(props.direccionDepartamentalSelect.id, {
          direccionDepartamental_id: props.direccionDepartamentalSelect.id,
          aplication_app_id: itemAplicacion['requeriment'],
          valor_asignado: itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['valor_asignado'] : '',
          valor_comparacion: itemAplicacion['requeriment_tipo_valor'] == "Number" ? itemAplicacion['valor_comparacion'] : undefined,
          operacion_logica: itemAplicacion['requeriment_tipo_valor'] == "Number" || itemAplicacion['requeriment_tipo_valor'] == "List" ? itemAplicacion['operacion_logica'] : undefined,
          diferencia_fecha: itemAplicacion['requeriment_tipo_valor'] == "Date" ? itemAplicacion['diferencia_fecha'] : undefined
        })

      }

      let vectorUser = []
      for (let itemUser in props.direccionDepartamentalSelect.responsablesDD) {
        let userFind = usersListAPI.filter(elemento => elemento.id == props.direccionDepartamentalSelect.responsablesDD[itemUser])[0]
        vectorUser.push(userFind)
      }

      //SE DEBE COMPROBAR QUE LOS USUARIOS TIENEN LA APLICACION
      funcionCompruebaRequisitos(vectorUser, vectorRequerimientosGrupo)


    }

    //RESET VALUES DE FORM
    resetValue()
  }

  function funcionCompruebaRequisitos(listUser, listRequeriments) {
    for (let item in listUser) {
      let cadenaEnvio = ""
      let envioEmail = false
      let userSelected = usersListAPI.filter(elemento => elemento.id == listUser[item].id)[0]
      for (let itemRequeriments in listRequeriments) {
        let aplicacionEmpleado = listUserApp.filter(elemento => elemento.user_id == listUser[item].id)
        let aplicacionEmpleadoF2 = aplicacionEmpleado.filter(elemento => elemento.aplication_user_id == listRequeriments[itemRequeriments].id)[0]

        //COMPROBACION
        let requerimientoNoEncontrado = false
        if (aplicacionEmpleadoF2 == undefined) {
          requerimientoNoEncontrado = true
        }
        else {
          if (listRequeriments[itemRequeriments].tiene_valor == true) {
            if (listRequeriments[itemRequeriments].tipo_valor == "List") {
              let elementosList = listRequeriments[itemRequeriments].listado_opciones.split(',')
              let indiceUsuario = elementosList.indexOf(aplicacionEmpleadoF2.valor_asignado)
              let indiceBloque = elementosList.indexOf(listRequeriments[itemRequeriments].valor_asignado)

              switch (listRequeriments[itemRequeriments].operacion_logica) {
                case 1:
                  //indiceUsuario < indiceBloque
                  if (indiceUsuario >= indiceBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 2:
                  //indiceUsuario <= indiceBloque
                  if (indiceUsuario > indiceBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 3:
                  //indiceUsuario == indiceBloque
                  if (indiceUsuario != indiceBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 4:
                  //indiceUsuario >= indiceBloque
                  if (indiceUsuario < indiceBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 5:
                  //indiceUsuario > indiceBloque
                  if (indiceUsuario <= indiceBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 6:
                  //indiceUsuario != indiceBloque
                  if (indiceUsuario == indiceBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
              }

            }
            if (listRequeriments[itemRequeriments].tipo_valor == "Date") {
              let fechaHoy = new Date()
              fechaHoy.setDate(fechaHoy.getDate() + listRequeriments[itemRequeriments].diferencia_fecha)
              let fechaUsuario = new Date(aplicacionEmpleadoF2.valor_asignado_fecha)
              var day_as_milliseconds = 86400000;
              var diff_in_millisenconds = fechaUsuario - fechaHoy;
              var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

              if (diff_in_days < 0) {
                //HAY INCIDENCIA
                requerimientoNoEncontrado = true
              }
            }
            if (listRequeriments[itemRequeriments].tipo_valor == "Number") {
              let numeroUsuario = parseInt(aplicacionEmpleadoF2.valor_comparacion)
              let numeroBloque = parseInt(listRequeriments[itemRequeriments].valor_comparacion)

              switch (listRequeriments[itemRequeriments].operacion_logica) {
                case 1:
                  //numeroUsuario < numeroBloque
                  if (numeroUsuario >= numeroBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 2:
                  //numeroUsuario <= numeroBloque
                  if (numeroUsuario > numeroBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 3:
                  //numeroUsuario == numeroBloque
                  if (numeroUsuario != numeroBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 4:
                  //numeroUsuario >= numeroBloque
                  if (numeroUsuario < numeroBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
                case 5:
                  //numeroUsuario > numeroBloque
                  if (numeroUsuario <= numeroBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;

                case 6:
                  //numeroUsuario != numeroBloque
                  if (numeroUsuario == numeroBloque) {
                    //HAY INCIDENCIA
                    requerimientoNoEncontrado = true
                  }
                  break;
              }
            }
          }

        }

        if (requerimientoNoEncontrado == true) {
          cadenaEnvio = cadenaEnvio + listRequeriments[itemRequeriments]['requeriment_code'] + "-" + listRequeriments[itemRequeriments]['requeriment_name'] + "\n"
          envioEmail = true
        }
      }

      if (envioEmail == true) {
        insertarNewPeticionRequerimientoAPI({
          persona: userSelected.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          descripcion: "User: " + userSelected.first_name + " needs new requirements: \n " + cadenaEnvio,
          active: true
        })
      }

    }
  }


  function resetValue() {
    setGrupoSelect('')
    setJobSelect('')
    setTipoRequisito('')
    setTextoDescarteRequerimientos('')
  }

  return (
    <>

      <div style={{ width: '100%', textAlign: 'center' }}>
        <Alert severity="warning" style={reportarIncidencia == true || textoDescarteRequerimientos != "" ? { display: "inline-flex" } : { display: "none" }}>
          <AlertTitle style={reportarIncidencia == true ? { display: "inline" } : { display: "none" }}>There are duplicate requirements: {textoIncidencia}</AlertTitle>
          <AlertTitle style={textoDescarteRequerimientos != "" ? { display: "block" } : { display: "none" }}>It has ruled out {textoDescarteRequerimientos} group requirements</AlertTitle>
        </Alert>
      </div>

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

          <div style={{ display: "inline-flex" }}>
            <div style={{ display: "inline" }}>

              <Autocomplete
                id="tags-outlined"
                options={listGruposAPI}
                value={grupoSelect}
                getOptionLabel={(option) => option != '' ? option.code + " - " + option.name : ''}
                onChange={(event, value) => setGrupoSelect(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Group"
                    size="small"
                    sx={{ m: 1, width: '50ch' }}
                  />
                )}
              />
            </div>
            <div style={grupoSelect != "" && grupoSelect != undefined && grupoSelect != null ? { display: "inline" } : { display: "none" }}>
              <IconButton size="large" onClick={() => setVisibilidadDialogoDetallesGrupo(true)}><InfoOutlined /></IconButton>
            </div>

            <div style={grupoSelect != "" && grupoSelect != undefined && grupoSelect != null ? { display: "inline" } : { display: "none" }}>
              <IconButton size="large" onClick={() => setVisibilidadDialogoEditarGrupo(true)}><EditIcon /></IconButton>
            </div>
          </div>

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

          <Button
            disabled={botonControl}
            sx={{ m: 1, width: '50ch' }}
            className="ml-8"
            variant="contained"
            color="secondary"
            onClick={() => {
              asignarNuevoGrupo()
            }}
          >
            ASSIGN

          </Button>

          <Dialog open={visibilidadDialogoEditarGrupo} fullWidth maxWidth='md'>

            <DialogTitle classes={{ root: classes.customDialogTitle }} >
              Group requirements: {grupoSelect != '' && grupoSelect != undefined && grupoSelect != null ? grupoSelect.name : ''}
            </DialogTitle>
            <DialogContent>
              <Alert severity="info">
                <AlertTitle>In this list you see the requirements of the group, you can check and uncheck requirements, once you press "Save requeriments", this configuration will be saved to take into account if you want to save it in the block. Each time you click on edit, the requirements are reset.</AlertTitle>
              </Alert>
              <ListRequerimentsEdit
                grupo={'grupo'}
                tipoLista={"listRequerimentsWithDetails"}
                listRequeriments={grupoSelect != '' && grupoSelect != undefined && grupoSelect != null ? grupoSelect.aplicaciones_all : ''}
                vectorRequerimientosGrupo={vectorRequerimientosGrupo}
                setVectorRequerimientosGrupo={setVectorRequerimientosGrupo}
                disabledDeleteRequeriment={false}
              />
            </DialogContent>
            <DialogActions>

              <Button variant="outlined" onClick={() => setVisibilidadDialogoEditarGrupo(false)}>Save requeriments</Button>

            </DialogActions>

          </Dialog>

          <Dialog open={visibilidadDialogoDetallesGrupo} fullWidth maxWidth='xs'>

            <DialogTitle classes={{ root: classes.customDialogTitle }} >
              Group requirements: {grupoSelect != '' && grupoSelect != undefined && grupoSelect != null ? grupoSelect.name : ''}
            </DialogTitle>
            <DialogContent>
              <ListRequerimentsMain
                grupo={'grupo'}
                tipoLista={"listRequerimentsWithDetails"}
                listRequeriments={grupoSelect.aplicaciones_all}
                vectorRequerimientosGrupo={vectorRequerimientosGrupo}
                setVectorRequerimientosGrupo={setVectorRequerimientosGrupo}
                disabledDeleteRequeriment={false}
              />
            </DialogContent>
            <DialogActions>

              <Button variant="outlined" onClick={() => setVisibilidadDialogoDetallesGrupo(false)}>Close</Button>

            </DialogActions>

          </Dialog>

        </Grid>
      </Grid>

    </>
  )
}