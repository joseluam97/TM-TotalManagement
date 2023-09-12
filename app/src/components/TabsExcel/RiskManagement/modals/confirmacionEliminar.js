//**************IMPORTACIONES*************************************************

import FusePageSimple from '@fuse/core/FusePageSimple';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import store from "app/store/index"

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux';


import {


  cambiarEstadoRiskManagementAction,
  updateRiskManagementAction



} from '../store/actions'


import {


  cambiarEstadoRmRegistroAction,
  updateRmRegistroAction


} from './RmRegistro/store/actions'

import {
  insertarLogRiskAPIAction
} from '../../../Managment/LogRisk/store/actions'


//**************END IMPORTACIONES*************************************************



const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});



const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function ModalEliminar() {

  const dispatch = useDispatch();
  const classes = useStyles();


  //Obtener los states de Redux
  const visibilidadModalEliminar = useSelector(state => state.fuse.riskManagementComponente.visibilidadModalEliminar)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const riskManagementListAPI = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)
  const rmRegistrosListLastVersionAPI = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListLastVersionAPI)

  function cambiarActivoOculta() {

    let origen = store.getState().fuse.riskManagementComponente.origenEliminar

    if (origen == 'riskManagement') {

      let veAllRisk = false
      if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
        veAllRisk = true
      }

      let riskSelect = riskManagementListAPI.filter(elemento => elemento.id == store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid)[0]

      if (riskSelect != undefined) {
        dispatch(updateRiskManagementAction(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid,
          {
            title: riskSelect.title,
            code: riskSelect.code,
            manager: riskSelect.manager,
            mision: riskSelect.mision,
            active: false
          },
          personLogin.id, veAllRisk))
        dispatch(cambiarEstadoRiskManagementAction('visibilidadModalEliminar', false))

        //AÑADIR REGISTRO DE EDICION
        dispatch(insertarLogRiskAPIAction({
          persona: personLogin.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          accion: "Delete",
          amfe_relacionado: riskSelect.id,
          descripcion: "Risk delete with id: " + riskSelect.id
        }))
      }

    } else {

      let roSelect = rmRegistrosListLastVersionAPI.filter(elemento => elemento.id == store.getState().fuse.rmRegistroComponente.filaSeleccionadaGrid)[0]

      if (roSelect != undefined) {

        dispatch(updateRmRegistroAction(roSelect.id, {
          id_risk_management: roSelect.id_risk_management,
          risk: roSelect.risk,
          d_detection: roSelect.d_detection,
          glitch_effect: roSelect.glitch_effect,
          cause_failure: roSelect.cause_failure,
          current_controls: roSelect.current_controls,
          gravity: roSelect.gravity,
          idea: roSelect.idea,
          detection: roSelect.detection,
          npr: roSelect.npr,
          priorization: roSelect.priorization,
          observations: roSelect.observations,
          categorizacion: roSelect.v,
          type: roSelect.type,
          site: roSelect.site,
          rev: roSelect.rev,
          active: false
        }))

        //AÑADIR REGISTRO DE EDICION
        dispatch(insertarLogRiskAPIAction({
          persona: personLogin.id,
          fecha_accion: new Date().toISOString().split("T")[0],
          hora_accion: new Date().toLocaleTimeString(),
          accion: "Delete",
          ro_relacionado: roSelect.id,
          descripcion: "R&O delete with id: " + roSelect.id
        }))

      }

      dispatch(cambiarEstadoRmRegistroAction('visibilidad', false))

    }

  }



  return (

    <Dialog open={visibilidadModalEliminar} onClose={() => dispatch(cambiarEstadoRiskManagementAction('visibilidadModalEliminar', false))} fullWidth maxWidth='sm'>


      <DialogTitle classes={{ root: classes.customDialogTitle }} >

        Confirm

      </DialogTitle>


      <DialogContent>
        Are you sure you want to delete this record?

      </DialogContent>
      <DialogActions>

        <Button onClick={() => dispatch(cambiarEstadoRiskManagementAction('visibilidadModalEliminar', false))}>Close</Button>
        <Button onClick={() => { dispatch(cambiarEstadoRiskManagementAction('visibilidadModalEliminar', false)), cambiarActivoOculta() }}>Yes</Button>


      </DialogActions>
    </Dialog>
  );
}