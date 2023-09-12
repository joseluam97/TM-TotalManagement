//**********************IMPORTACIONES****************************

import { React, useEffect } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";

import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  mostrarRmAccionAPIAction,
  cambiarVisibilidadModalInsertarAction,
  cambiarValorSeleccionAction,
  eliminarRmAccionAction,
  consultaRmRegistrosAction
} from './store/actions'

//Modales importaciones
import ModalInsertar from './modals/insertar.js'
import TableModules from '../../../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/



const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});



export default function RmAccion() {



  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.rmAccionComponente.loading)
  const visibilidad = useSelector(state => state.fuse.rmAccionComponente.visibilidad)
  const rmAccionesListAPI = useSelector(state => state.fuse.rmAccionComponente.rmAccionesListAPI)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.rmAccionComponente.filaSeleccionadaGrid)
  const errorGlobal = useSelector(state => state.fuse.rmAccionComponente.error)
  const valorTab = useSelector(state => state.fuse.rmAccionComponente.valorTab)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalInsertar = (valor) => dispatch(cambiarVisibilidadModalInsertarAction(valor))
  const mostrarRmAccionAPI = () => dispatch(mostrarRmAccionAPIAction())
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const eliminarRmAccion = (id) => dispatch(eliminarRmAccionAction(id))
  const consultaRmRegistros = () => dispatch(consultaRmRegistrosAction())



  const classes = useStyles();
  const dispatch = useDispatch()


  const columnasDataTable = [

    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'id_record', headerName: 'Risk Opportunity', width: 130 },
    { field: 'number', headerName: 'Number', width: 130 },
    { field: 'proposal', headerName: 'Proposal', width: 130 },
    { field: 'manager', headerName: 'Manager', width: 130 },
    { field: 'd_planned', headerName: 'Planned date', width: 130 },
    { field: 'd_closed', headerName: 'Closed date', width: 130 },
    { field: 'gravity', headerName: 'Gravity', width: 130 },
    { field: 'idea', headerName: 'Idea', width: 130 },
    { field: 'detection', headerName: 'Detection', width: 130 },
    { field: 'npr', headerName: 'Npr', width: 130 },
    { field: 'priorization', headerName: 'Priorization', width: 130 },
    { field: 'observations', headerName: 'Observations', width: 130 },
    {
      field: "delete",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <>

            <IconButton>
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() => {

                eliminarRmAccion(filaSeleccionadaGrid)

              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      }
    }
  ]


  useEffect(() => {

    mostrarRmAccionAPI()

  }, []);




  return (
    <>

      <Button variant="outlined" onClick={
        () => {
          cambiarVisibilidadModalInsertar(true); consultaRmRegistros();
        }
      }
        classes={{ root: classes.customButtomPrograma }}>Create Rm Action</Button>


      <div style={{ width: '100%' }}>
      </div>

      <ModalInsertar />
    </>
  )
}

