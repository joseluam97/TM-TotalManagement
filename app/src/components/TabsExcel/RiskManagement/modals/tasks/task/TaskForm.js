import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as moment from 'moment';
import TaskAlt from '@mui/icons-material/TaskAlt';
import Divider from '@mui/material/Divider';
import { es } from 'date-fns/locale'
import Autocomplete from '@mui/material/Autocomplete';
import { showMessage } from 'app/store/fuse/messageSlice'

//Grid importaciones
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import store from "app/store/index"

import {

  cambiarEstadoRmTasksAction,
  insertarRmAccionAction,
  updateRmAccionAction

} from '../store/actions'

import {
  mostrarUserAPIAction
} from '../../../../../Managment/Users/store/actions'

import {
  insertarLogRiskAPIAction
} from '../../../../../Managment/LogRisk/store/actions'

import {
  mostrarRmRegistroAPIAction
} from '../../RmRegistro/store/actions'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a name'),
});


const TaskForm = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const insertarLogRiskAPI = (json) => dispatch(insertarLogRiskAPIAction(json))
  const mostrarRmRegistroAPI = (idRisk) => dispatch(mostrarRmRegistroAPIAction(idRisk))

  const [disabledNewAction, setDisabledNewAction] = useState(true);
  const [disabledEditAction, setDisabledEditAction] = useState(true);

  //Obtener los states de Redux
  const visibilidadNuevaAccion = useSelector(state => state.fuse.tasksAccionesComponente.visibilidadNuevaAccion)
  const filaSeleccionadaRmRegistro = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
  const ultimoIdCreadoRiskOpportunity = useSelector(state => state.fuse.rmRegistroComponente.ultimoIdCreado)
  const taskSeleccionado = useSelector(state => state.fuse.tasksAccionesComponente.filaSeleccionada)
  const rmAccionesList = useSelector(state => state.fuse.tasksAccionesComponente.rmAccionesListAPI)
  const rmRegistrosList = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListAPI)
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const accionCreada = useSelector(state => state.fuse.tasksAccionesComponente.accionCreada)

  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const AMFEList = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)

  //estados locales del formulario
  let rowsOptions = '';

  const [propuestaActual, setPropuestaActual] = useState('')
  const [responsableActual, setResponsableActual] = useState([])
  const [fechaPlanificadaActual, setFechaPlanificadaActual] = useState('')
  const [fechaCierreActual, setFechaCierreActual] = useState('')
  const [observacionesActual, setObservacionesActual] = useState('')
  const [completadaActual, setCompletadaActual] = useState(false)
  const [revisionActual, setRevisionActual] = useState('')
  const [accionSelected, setAccionSelected] = useState('')


  const [muestraFechaCierre, setMuestraFechaCierre] = useState(false)
  const [botonControl, setBotonControl] = useState(true)

  let bloqueoRO = false

  useEffect(() => {

    let filaSeleccionadaRiskManagement = store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid
    let ultimoIdCreado = store.getState().fuse.riskManagementComponente.ultimoIdCreado

    if (filaSeleccionadaRiskManagement != "") {
      mostrarRmRegistroAPI(filaSeleccionadaRiskManagement)

    } 
    else {
      mostrarRmRegistroAPI(ultimoIdCreado['id'])
    }

  }, [])

  //end_locales_formularios

  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add rm action1") == undefined) {
        setDisabledNewAction(false)
      }
      if (personLoginPermisos.find((item) => item['name'] == "Can change rm action") == undefined) {
        setDisabledEditAction(false)
      }


    }

  }, [personLoginPermisos])


  function resetEstados() {
    setPropuestaActual('')
    setResponsableActual([])
    setFechaPlanificadaActual(null)
    setFechaCierreActual(null)
    setObservacionesActual('')
    setCompletadaActual(false)
    setRevisionActual('')

  }



  /* Comprobar si ha rellenado todos los campos */

  useEffect(() => {


    let resultdate = moment(fechaPlanificadaActual, 'YYYY-MM-DD').isValid()

    if (propuestaActual.trim() != '' &&
      responsableActual != '' &&
      resultdate) {

      setBotonControl(false)

    } else {
      setBotonControl(true)

    }


    /*Comprobar para Close without save */


    if (propuestaActual.trim() != '' ||
      responsableActual != '' ||
      fechaPlanificadaActual != null) {

      dispatch(cambiarEstadoRmTasksAction('guardarCambios', true))

    } else {

      dispatch(cambiarEstadoRmTasksAction('guardarCambios', false))

    }

  })


  // Actualiza cuando cierra acción

  useEffect(() => {

    if (taskSeleccionado != '') {

      let rmActual = rmAccionesList.filter(x => x.id == taskSeleccionado)[0]
      setFechaCierreActual(rmActual.d_closed)
      completadaActual ? setMuestraFechaCierre(true) : setMuestraFechaCierre(false)
    }



  }, [rmAccionesList]);

  useEffect(() => {
    mostrarUserAPI()
  }, []);

  useEffect(() => {
    if (completadaActual == true && taskSeleccionado != '') {
      let rmActual = rmAccionesList.filter(x => x.id == taskSeleccionado)[0]
      if (rmActual.completed != true) {
        setFechaCierreActual(new Date())
      }
    }

  }, [completadaActual, taskSeleccionado]);


  useEffect(() => {

    if (accionCreada != '') {
      //AÑADIR REGISTRO DE EDICION
      insertarLogRiskAPI({
        persona: personLogin.id,
        fecha_accion: new Date().toISOString().split("T")[0],
        hora_accion: new Date().toLocaleTimeString(),
        accion: "Creation",
        accion_relacionado: accionCreada['id'],
        descripcion: "Action creation with id: " + accionCreada['id']
      })
    }

  }, [accionCreada]);


  //Cuando se selecciona un task del listado

  useEffect(() => {

    if (taskSeleccionado == '') {
      setAccionSelected('')

      resetEstados()
      setMuestraFechaCierre(false)
      let revisionReduxActual = store.getState().fuse.rmRegistroComponente.rev

      if (revisionReduxActual == "") {
        setRevisionActual(1)

      } else {
        setRevisionActual(revisionReduxActual)

      }


    } else {
      rmAccionesList.filter(x => x.id == taskSeleccionado).map(filtered => {
        setPropuestaActual(filtered.proposal)
        //setResponsableActual(filtered.manager)

        let vectMembers = []
        for (let element in filtered.manager) {
          let itemSelected = usersListAPI.filter(item => item.id == filtered.manager[element])[0]
          vectMembers.push(itemSelected)
        }

        setResponsableActual(vectMembers)
        setFechaPlanificadaActual(filtered.d_planned)
        setFechaCierreActual(filtered.d_closed)
        setObservacionesActual(filtered.observations)
        setCompletadaActual(filtered.completed)
        setRevisionActual(filtered.rev)
        dispatch(cambiarEstadoRmTasksAction('visibilidadNuevaAccion', true))
        setAccionSelected(filtered)

        if (filtered.d_closed) {
          setMuestraFechaCierre(true)
        } else {
          setMuestraFechaCierre(false)

        }

      }

      )


    }


    let visibilidadModal = store.getState().fuse.rmRegistroComponente.visibilidad

    if (visibilidadModal && filaSeleccionadaRmRegistro != '') {
      let rmActual = rmRegistrosList.filter(registro => registro.id == filaSeleccionadaRmRegistro)[0]
      if (rmActual != null) {
        if (rmActual.closed) {
          setMuestraFechaCierre(true)

        }
      }
    }


  }, [taskSeleccionado, rmAccionesList]);


  function colorDinamic(estado) {

    if (!estado) {
      return "gray"

    } else {
      return "green"

    }

  }

  function completaIncompleta() {

    let opcionesCompletada

    if (muestraFechaCierre) {
      opcionesCompletada = "COMPLETED"

    } else if (completadaActual) {

      opcionesCompletada = "MARK AS INCOMPLETE"

    } else {

      opcionesCompletada = "MARK AS COMPLETE"

    }

    return opcionesCompletada

  }




  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  /**
   * Update Task
   */

  if (!visibilidadNuevaAccion) {
    return null;
  }


  function comprobarPermisosCierreAcciones() {

    let accionSelect = rmAccionesList.filter(elemento => elemento.id == taskSeleccionado)[0]

    //COMPROBACION DE MANAGER DE ACCION

    let existeIDUser = accionSelect.manager.filter(element => element == personLogin.id)

    if (existeIDUser.length != 0) {
      return true;
    }

    //COMPROBACION DE MANAGER O MEMBER DEL AMFE
    let roSelect = rmRegistrosList.filter(elemento => elemento.id == accionSelect.id_record)[0]
    if (roSelect != undefined) {
      let amfeSelect = AMFEList.filter(elemento => elemento.id == roSelect.id_risk_management)[0]
      if (roSelect != undefined) {
        //MANAGER
        if (amfeSelect.manager == personLogin.id) {
          return true;
        }

        //MEMBER
        let existeIDUserMembers = amfeSelect.member.filter(element => element == personLogin.id)
        if (existeIDUserMembers.length != 0) {
          return true;
        }
      }
    }

    return false;

  }


  function completarAccion() {
    let idRiskOpportunity

    if (ultimoIdCreadoRiskOpportunity['id'] != undefined) {

      idRiskOpportunity = ultimoIdCreadoRiskOpportunity['id']

    } else {
      idRiskOpportunity = filaSeleccionadaRmRegistro

    }

    //Si es nueva Accion

    let vectIDMembersAction = []
    for (let item in responsableActual) {
      vectIDMembersAction.push(responsableActual[item].id)
    }

    if (taskSeleccionado == '') {
      dispatch(insertarRmAccionAction({

        id_record: idRiskOpportunity,
        proposal: propuestaActual,
        manager: vectIDMembersAction,
        d_planned: fechaPlanificadaActual,
        d_closed: fechaCierreActual,
        observations: observacionesActual,
        completed: completadaActual,
        rev: revisionActual
      }));

    } else {   //Si es editar accion

      let estaCerrada = rmAccionesList.filter(elemento => elemento.id == taskSeleccionado)[0]

      if (estaCerrada.completed == false && completadaActual == true) {
        //COMPROBAR QUE TIENE PERMISOS PARA REALIZAR ESTE CIERRE
        let tienePermisos = comprobarPermisosCierreAcciones()
        if (tienePermisos == true) {
          let fechaActual = new Date(fechaCierreActual)
          let fechaseleccionada = fechaActual.toISOString()
          let arrayFecha = fechaseleccionada.split("T")

          dispatch(updateRmAccionAction(taskSeleccionado, {

            id_record: idRiskOpportunity,
            proposal: propuestaActual,
            manager: vectIDMembersAction,
            d_planned: fechaPlanificadaActual,
            d_closed: arrayFecha[0],
            observations: observacionesActual,
            completed: completadaActual,
            rev: revisionActual
          }));

          //AÑADIR REGISTRO DE EDICION
          insertarLogRiskAPI({
            persona: personLogin.id,
            fecha_accion: new Date().toISOString().split("T")[0],
            hora_accion: new Date().toLocaleTimeString(),
            accion: "Close",
            accion_relacionado: taskSeleccionado,
            descripcion: "Action close with id: " + taskSeleccionado
          })
        }
        else {
          dispatch(
            showMessage({
              message: "You do not have permission to close this action, contact your responsible person",
              variant: "error"
            })
          )
        }

      }
      else {
        dispatch(updateRmAccionAction(taskSeleccionado, {

          id_record: idRiskOpportunity,
          proposal: propuestaActual,
          manager: vectIDMembersAction,
          d_planned: fechaPlanificadaActual,
          d_closed: fechaCierreActual,
          observations: observacionesActual,
          completed: completadaActual,
          rev: revisionActual
        }));

        //AÑADIR REGISTRO DE EDICION
        insertarLogRiskAPI({
          persona: personLogin.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          accion: "Edit",
          accion_relacionado: taskSeleccionado,
          descripcion: "Action edition with id: " + taskSeleccionado
        })

      }

    }

    resetEstados();
  }

  return (
    <>

      <div className="relative flex flex-col flex-auto items-center px-500 sm:px-48" style={{ minHeight: '300px' }}>

        <div sty e={{ marginBottom: '15px', marginTop: '5px', width: '100%', textAlign: 'center' }}>


          <span className="font-semibold">

            {muestraFechaCierre ? '' : (taskSeleccionado == '' ? 'NEW ACTION' : 'EDIT ACTION')}

            <Divider style={{ width: '100%' }} />
          </span>

        </div>

        {/* <div style={{marginBottom: '15px', display: taskSeleccionado == '' ? 'none' : 'block'}}>
              <Button className="font-semibold" disabled = {muestraFechaCierre } >

                  <span className="mx-8">
                    <Button  onClick = {() => completadaActual ? setCompletadaActual(false) : setCompletadaActual(true)}>

                       <TaskAlt style={{color: colorDinamic(completadaActual) }}  /> {completaIncompleta()}
                        
                    </Button>
                  </span>
              </Button>     
          </div> */}

        <Grid container spacing={2} columns={16}>



          <Grid item xs={8}>


            <TextField
              label="Proposal"
              disabled={muestraFechaCierre}
              id="propuesta"
              value={propuestaActual}
              size="small"
              sx={{ m: 1, width: '37ch' }}
              onChange={e => setPropuestaActual(e.target.value)}
            />



          </Grid>

          <Grid item xs={8}>
            <Autocomplete
              multiple
              limitTags={2}
              disabled={muestraFechaCierre}
              id="tags-outlined"
              options={usersListAPI}
              getOptionLabel={(option) =>
                option.first_name != null ? option.IDidentification + " - " + option.first_name + " " + option.last_name : ''
              }
              value={responsableActual}
              onChange={(event, value) => setResponsableActual(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Members"
                  placeholder="Members"
                  size="small"
                  sx={{ m: 1, width: '37ch' }}
                //onChange={e => { setResponsableActual(e.target.value); }}
                />
              )}
            />
          </Grid>

          <Grid item xs={8}>

            <FormControl sx={{ m: 1, width: '37ch' }} size="small">
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns} style={{ marginLeft: '8px' }}>
                <DatePicker
                  label="Planned date"
                  disabled={muestraFechaCierre}

                  id="fechaPlanificada"
                  inputFormat="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  value={fechaPlanificadaActual}
                  onChange={(newValue) => {
                    if (newValue == "Invalid Date" || newValue == null) {
                      setFechaPlanificadaActual(newValue)
                    } else {
                      let fechaseleccionada = newValue.toISOString()
                      let arrayFecha = fechaseleccionada.split("T")
                      setFechaPlanificadaActual(arrayFecha[0]);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}


                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={8} style={{ display: muestraFechaCierre || completadaActual == true ? 'block' : 'none' }}>
            <FormControl sx={{ m: 1, width: '37ch' }} size="small">
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns} style={{ marginLeft: '8px' }}>
                <DatePicker
                  label="Closed date"
                  disabled={muestraFechaCierre}
                  id="fechacierre"
                  inputFormat="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  value={fechaCierreActual}
                  onChange={(newValue) => {
                    let fechaseleccionada = newValue.toISOString()
                    let arrayFecha = fechaseleccionada.split("T")
                    setFechaCierreActual(arrayFecha[0]);
                  }}
                  renderInput={(params) => <TextField {...params} />}


                />
              </LocalizationProvider>
            </FormControl>
          </Grid>


          <Grid item xs={8}>

            <TextField
              id="observaciones"
              disabled={muestraFechaCierre}
              label="Remarks"
              multiline
              rows={5}
              value={observacionesActual}
              size="small"
              sx={{ m: 1, width: '37ch' }}
              onChange={e => setObservacionesActual(e.target.value)}
            />

          </Grid>

        </Grid>



      </div>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: 'background.default' }}
        style={{ minHeight: '75px', display: muestraFechaCierre ? 'block' : 'none', textAlign: 'right' }}
      ></Box>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: 'background.default' }}
        style={{ minHeight: '75px', display: muestraFechaCierre ? 'none' : 'block', textAlign: 'right' }}
      >

        <Button style={{ display: taskSeleccionado == '' ? 'none' : 'inline' }} className="ml-8" disabled={muestraFechaCierre} >

          <span className="mx-8">
            <Button onClick={() => completadaActual ? setCompletadaActual(false) : setCompletadaActual(true)}>

              <TaskAlt style={{ color: colorDinamic(completadaActual) }} /> {completaIncompleta()}

            </Button>
          </span>
        </Button>

        <Button
          disabled={botonControl}
          style={{ marginRight: '28px' }}
          className="ml-8"
          variant="contained"
          color="secondary"
          onClick={() => { completarAccion() }}
        >
          {taskSeleccionado == '' ? 'CREATE' : 'SAVE'}

        </Button>
      </Box>



    </>
  );
};

export default TaskForm;
