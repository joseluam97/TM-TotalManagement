//***IMPORTACIONES********************************** */

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { React, useEffect, useState, useRef } from 'react'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import TaskAlt from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import { lighten, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { showMessage } from 'app/store/fuse/messageSlice'
//Redux importaciones
import { useDispatch, useSelector } from 'react-redux';


import {

  updateRmAccionAction,
  cambiarEstadoRmTasksAction,
  deleteRmAccionAPIAction

} from './store/actions'

import {
  insertarLogRiskAPIAction
} from '../../../../Managment/LogRisk/store/actions'


const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '0.5em'
  }

});


//END_IMPORTACIONES *********************************************



function TasksList(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState('1');
  const [itemsCompletados, setItemsCompletados] = useState([]);
  const [itemsNoCompletados, setItemsNoCompletados] = useState([]);
  const [disabledRemoveActions, setDisabledRemoveActions] = useState(true);
  const [disabledEditActions, setDisabledEditActions] = useState(true);
  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)
  const [visibilidadDialogoEliminar, setVisibilidadDialogoEliminar] = useState(false)
  const [itemSelected, setItemSelected] = useState('')
  const [itemDelete, setItemDelete] = useState('');

  const filaSeleccionadaRmRegistro = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
  const AMFEList = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)
  const rmRegistrosList = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListAPI)
  const rmAccionesListAPI = useSelector(state => state.fuse.tasksAccionesComponente.rmAccionesListAPI)

  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  //OBTIENE EL TASK SELECCIONADO DE LA LISTA
  const taskSeleccionado = useSelector(state => state.fuse.tasksAccionesComponente.filaSeleccionada)

  const deleteRmAccionAPI = (idAccion, id_record) => dispatch(deleteRmAccionAPIAction(idAccion, id_record))
  const insertarLogRiskAPI = (json) => dispatch(insertarLogRiskAPIAction(json))


  //estados locales del formulario


  const [revFiltro, setRevFiltro] = useState('all')
  let numAccionesAbiertas = 0


  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can delete rm action") == undefined) {
        setDisabledRemoveActions(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change rm action") == undefined) {
        setDisabledEditActions(false)
      }
    }

  }, [personLoginPermisos])

  useEffect(() => {
    //FILTRAR COMPLETADAS
    let elementosCompletados = rmAccionesListAPI.filter(elemento => elemento.completed == true)
    setItemsCompletados(elementosCompletados)

    //FILTRAR NO COMPLETADAS
    let elementosNoCompletados = rmAccionesListAPI.filter(elemento => elemento.completed == false)
    setItemsNoCompletados(elementosNoCompletados)

  }, [rmAccionesListAPI])


  if (!rmAccionesListAPI) {
    return null;
  }

  if (rmAccionesListAPI.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no tasks!
        </Typography>
      </div>
    );
  }



  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }


  }

  function colorDinamic(estado) {

    if (!estado) {
      numAccionesAbiertas++

      return "gray"

    } else {
      return "green"

    }


  }

  function opcionesListaRev() {
    var items = [];
    rmRegistrosList.filter(registro => registro.id == filaSeleccionadaRmRegistro).map(filtered => {
      items.push(<MenuItem value="all">All</MenuItem>)

      for (var i = 1; i <= filtered.rev; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        items.push(<MenuItem value={i}>{i}</MenuItem>)
      }

    }

    )
    return items

  }

  function colorSelected(idItem) {

    if (taskSeleccionado != '') {
      if (idItem == taskSeleccionado) {
        return "#22D3EE"
      }
    }
    else {
      return "white"
    }

  }

  function deleteAction() {
    //DELETE ACCION
    
    deleteRmAccionAPI(itemDelete.id, filaSeleccionadaRmRegistro)

    insertarLogRiskAPI({
      persona: personLogin.id,
      fecha_accion: new Date().toISOString().split("T")[0],
      hora_accion: new Date().toLocaleTimeString(),
      accion: "Delete Action",
      ro_relacionado: filaSeleccionadaRmRegistro,
      descripcion: "Action delete with id: " + itemDelete.id
    })


  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(cambiarEstadoRmTasksAction('filaSeleccionada', ''))
  };

  function comprobarPermisosCierreAcciones() {

    let accionSelect = rmAccionesListAPI.filter(elemento => elemento.id == itemSelected.id)[0]

    //COMPROBACION DE MANAGER DE ACCION

    let existeIDUser = accionSelect.manager.filter(element => element == personLogin.id)

    if (existeIDUser.length != 0) {
      completarAccion()
    }

    //COMPROBACION DE MANAGER O MEMBER DEL AMFE
    let roSelect = rmRegistrosList.filter(elemento => elemento.id == accionSelect.id_record)[0]
    if (roSelect != undefined) {
      let amfeSelect = AMFEList.filter(elemento => elemento.id == roSelect.id_risk_management)[0]
      if (amfeSelect != undefined) {
        //MANAGER
        if (amfeSelect.manager == personLogin.id) {
          completarAccion()
        }

        //MEMBER
        let existeIDUserMembers = amfeSelect.member.filter(element => element == personLogin.id)
        if (existeIDUserMembers.length != 0) {
          completarAccion()
        }
      }
    }

    dispatch(
      showMessage({
        message: "You do not have permission to close this action, contact your responsible person",
        variant: "error"
      })
    )

  }

  //function completarAccion(idSelect, nuevoEstado){
  function completarAccion() {

    let datosAccion = rmAccionesListAPI.filter(elemento => elemento.id == itemSelected.id)[0]

    let fechaActual = new Date()
    let fechaseleccionada = fechaActual.toISOString()
    let arrayFecha = fechaseleccionada.split("T")

    dispatch(
      updateRmAccionAction(itemSelected.id,
        {
          id_record: datosAccion.id_record,
          proposal: datosAccion.proposal,
          manager: datosAccion.manager,
          d_planned: datosAccion.d_planned,
          d_closed: arrayFecha[0],
          observations: datosAccion.observations,
          rev: datosAccion.rev,
          completed: (itemSelected.estado == true ? false : true)
        }
      )
    )

    //AÑADIR REGISTRO DE EDICION
    insertarLogRiskAPI({
      persona: personLogin.id,
      fecha_accion: new Date().toISOString().split("T")[0],
      hora_accion: new Date().toLocaleTimeString(),
      accion: "Close",
      accion_relacionado: itemSelected.id,
      descripcion: "Action close with id: " + itemSelected.id
    })

    
  }

  function editarAccion(idElemento) {
    if (disabledEditActions == true) {
      dispatch(cambiarEstadoRmTasksAction('filaSeleccionada', idElemento))
    }

  }

  return (
    <>

      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: theme.palette.background.default }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Pending" value="1" />
            <Tab label="Completed" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/*LISTA DE NO COMPLETADOS */}
          <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            {itemsNoCompletados.map((elemento) =>
              <>

                <ListItem style={{ cursor: 'pointer', width: '100%', height: '100%', backgroundColor: colorSelected(elemento.id) }}>
                  <ListItemIcon>
                    <Tooltip title="Mark as complete">
                      <Button style={{ pointerEvents: elemento.completed ? 'none' : 'auto' }} onClick={() => { setItemSelected(elemento), setVisibilidadDialogoConfirmacion(true) }}>
                        <TaskAlt style={{ color: colorDinamic(elemento.completed) }} />
                      </Button>
                    </Tooltip>
                  </ListItemIcon>

                  <ListItemText id="switch-list-label-wifi" onClick={() => editarAccion(elemento.id)}>
                    <Tooltip title={elemento.proposal}>
                      <span value={elemento.id}> {elemento.proposal.length >= 40 ? elemento.proposal.substring(0, 40) + "..." : elemento.proposal} </span>
                    </Tooltip>
                  </ListItemText>

                  <ListItemIcon>
                    <Tooltip title="Delete">
                      <Button style={disabledRemoveActions == true ? { display: "inline", float: "right" } : { display: "none" }}
                        onClick={() => {setVisibilidadDialogoEliminar(true); setItemDelete(elemento)}}>
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </ListItemIcon>

                </ListItem>
              </>
            )
            }
          </List>
          {/*FIN LISTA DE NO COMPLETADOS */}
          {/*LISTA DE NO COMPLETADOS
          <List className="w-full m-0 p-0">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list" type="list" direction="vertical">

                {(provided) => (
                  <>
                    <div ref={provided.innerRef}>

                      {itemsNoCompletados.map((elemento) =>
                        <>
                          <div style={{ cursor: 'pointer', width: '100%', height: '100%', backgroundColor: colorSelected(elemento.id) }}>
                            <Button style={{ pointerEvents: elemento.completed ? 'none' : 'auto' }} onClick={() => {setItemSelected(elemento), setVisibilidadDialogoConfirmacion(true)}}>
                              <TaskAlt style={{ color: colorDinamic(elemento.completed) }} />
                            </Button>

                            <Tooltip title={elemento.proposal}>
                              <span value={elemento.id} onClick={() => editarAccion(elemento.id)}> {elemento.proposal.length >= 40 ? elemento.proposal.substring(0, 40) + "..." : elemento.proposal} </span>
                            </Tooltip>

                            <Button style={disabledRemoveActions == true ? { display: "inline", float: "right" } : { display: "none" }}
                              onClick={() => setVisibilidadDialogoEliminar(true)}>
                              <DeleteIcon />
                            </Button>
                            <Divider />
                          </div>
                        </>
                      )
                      }
                    </div>
                    {provided.placeholder}
                  </>
                )}
              </Droppable>
            </DragDropContext>
          </List>
          FIN LISTA DE NO COMPLETADOS */}
        </TabPanel>
        <TabPanel value="2">
          {/*LISTA DE NO COMPLETADOS */}
          <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            {itemsCompletados.map((elemento) =>
              <>

                <ListItem style={{ cursor: 'pointer', width: '100%', height: '100%', backgroundColor: colorSelected(elemento.id) }}>
                  <ListItemIcon>
                    <Tooltip title="Completed">
                      <Button style={{ pointerEvents: elemento.completed ? 'none' : 'auto' }} onClick={() => { setItemSelected(elemento), setVisibilidadDialogoConfirmacion(true) }}>
                        <TaskAlt style={{ color: colorDinamic(elemento.completed) }} />
                      </Button>
                    </Tooltip>
                  </ListItemIcon>

                  <ListItemText id="switch-list-label-wifi" onClick={() => editarAccion(elemento.id)}>
                    <Tooltip title={elemento.proposal}>
                      <span value={elemento.id} onClick={() => editarAccion(elemento.id)}> {elemento.proposal.length >= 40 ? elemento.proposal.substring(0, 40) + "..." : elemento.proposal} </span>
                    </Tooltip>
                  </ListItemText>
                </ListItem>
              </>
            )
            }
          </List>
          {/*FIN LISTA DE NO COMPLETADOS */}
          {/*LISTA DE COMPLETADOS
          <List className="w-full m-0 p-0">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list" type="list" direction="vertical">

                {(provided) => (
                  <>
                    <div ref={provided.innerRef}>

                      {itemsCompletados.map((elemento) =>

                        <>
                          <div style={{ cursor: 'pointer', width: '100%', height: '100%', backgroundColor: colorSelected(elemento.id) }}>
                            <Button style={{ pointerEvents: elemento.completed ? 'none' : 'auto' }} onClick={() => { setItemSelected(elemento), setVisibilidadDialogoConfirmacion(true) }}>
                              <TaskAlt style={{ color: colorDinamic(elemento.completed) }} />
                            </Button>

                            <span value={elemento.id} onClick={() => editarAccion(elemento.id)}> {elemento.proposal.length >= 70 ? elemento.proposal.substring(0, 70) + "..." : elemento.proposal} </span>

                            <Divider />
                          </div>

                        </>
                      )
                      }


                    </div>
                    {provided.placeholder}
                  </>
                )}
              </Droppable>
            </DragDropContext>
          </List>
          FIN LISTA DE COMPLETADOS */}
        </TabPanel>
      </TabContext>


      <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Confirmation
        </DialogTitle>
        <DialogContent>
          This action will be marked as completed and the closing date will be today's date, to change this date you must close by editing the item.
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { comprobarPermisosCierreAcciones(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

        </DialogActions>

      </Dialog>

      <Dialog open={visibilidadDialogoEliminar} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoEliminar(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { deleteAction(), setVisibilidadDialogoEliminar(false) }}> Confirm</Button>

        </DialogActions>

      </Dialog>


    </>
  );
}

export default TasksList;
