import Typography from '@mui/material/Typography';
import { React, useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AddIcon from '@mui/icons-material/Add';
import store from "app/store/index"

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux';
import {

  cambiarEstadoRmTasksAction,

} from './store/actions'







function TasksHeader(props) {

  const [disabledNewAction, setDisabledNewAction] = useState(true);

  const taskSeleccionado = useSelector(state => state.fuse.tasksAccionesComponente.filaSeleccionada)
  const rmRegistrosList = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const dispatch = useDispatch()


  function checkVisibilidadButton() {

    let visibilidadCss, rmActual

    let visibilidadModal = store.getState().fuse.rmRegistroComponente.visibilidad
    let filaSeleccionadaRmRegistro = store.getState().fuse.rmRegistroComponente.filaSeleccionadaGrid

    taskSeleccionado == '' && disabledNewAction == false ? visibilidadCss = 'none' : visibilidadCss = 'block'

    if (visibilidadModal && filaSeleccionadaRmRegistro != '') {
      rmActual = rmRegistrosList.filter(registro => registro.id == filaSeleccionadaRmRegistro)[0]

      if (rmActual != null) {
        if (rmActual.closed && disabledNewAction == false) {
          visibilidadCss = 'none'

        }
      }
    }

    return visibilidadCss
  }

  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add rm action") == undefined) {
        setDisabledNewAction(false)
      }


    }

  }, [personLoginPermisos])

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-12">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
        >
          Actions
        </Typography>


        <div className="flex items-center -mx-8" style={{ display: checkVisibilidadButton() }}>
          <Button

            className="mx-8 whitespace-nowrap"
            variant="contained"
            color="secondary"
            onClick={() => { dispatch(cambiarEstadoRmTasksAction('visibilidadNuevaAccion', true)); dispatch(cambiarEstadoRmTasksAction('filaSeleccionada', '')) }}

          >
            <AddIcon size={20} />
            <span className="mx-8">Add Action</span>
          </Button>
        </div>

      </div>


    </div>
  );
}

export default TasksHeader;
