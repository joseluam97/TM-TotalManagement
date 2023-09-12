//**********************IMPORTACIONES****************************

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
import { matchRoutes, useLocation } from 'react-router-dom';

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
  cambiarVisibilidadModalInsertarAPIAction,
  postSubMisionAPIAction,
  putSubMisionAPIAction
} from '../store/actions'

import {
  mostrarMisionAPIAction
} from '../../Mision/store/actions'


//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});


export default function ModalInsertar() {

  const location = useLocation();
  const { pathname } = location;

  const classes = useStyles();
  const dispatch = useDispatch()

  //estados locales del formulario

  const [misionList, setMisionList] = useState('')
  const [nombreActual, setNombreActual] = useState('')
  const [codigoActual, setCodigoActual] = useState('')
  const [descripcionActual, setDescripcionActual] = useState('')
  const [botonControlSave, setBotonControl] = useState(true);
  const [estamosDepartamento, setEstamosDepartamento] = useState(false);

  //end_locales_formularios

  // Obtener los states de Redux
  const visibilidadModalInsertar = useSelector(state => state.fuse.subMisionComponent.visibilidadModalInsertarMision)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.subMisionComponent.filaSeleccionadaGrid)
  const modo = useSelector(state => state.fuse.subMisionComponent.modoAperturaInsert)
  const listSubMisionAPI = useSelector(state => state.fuse.subMisionComponent.listSubMisiones)
  const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
  //const listAllMisionAPI = useSelector(state => state.fuse.misionComponent.listAllMisionAPI)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
  const mostrarMisionAPI = () => dispatch(mostrarMisionAPIAction())
  const postSubMisionAPI = (subMisionNew) => dispatch(postSubMisionAPIAction(subMisionNew))
  const putSubMisionAPI = (idSubMision, subMisionNew) => dispatch(putSubMisionAPIAction(idSubMision, subMisionNew))

  useEffect(() => {
    if (misionList != undefined &&
      nombreActual.trim() != '' &&
      codigoActual.trim() != '') {
      //descripcionActual.trim() != '') {
            setBotonControl(false)

    } else {
            setBotonControl(true)

    }
  })

  function crearConjunto() {

    if (modo == 'nuevo') {
      postSubMisionAPI({
        id_mision: misionList.id,
        name: nombreActual,
        code: codigoActual,
        description: descripcionActual
      })
    }

    if (modo == 'editar') {
      putSubMisionAPI(filaSeleccionadaGrid, {
        id_mision: misionList.id,
        name: nombreActual,
        code: codigoActual,
        description: descripcionActual
      })
    }

    cambiarVisibilidadModalInsertar(false, '');

  }

  useEffect(() => {

    if (modo == 'nuevo') {
      setMisionList('')
      setNombreActual('')
      setCodigoActual('')
      setDescripcionActual('')
    }

    if (modo == 'editar') {
      let subMisionSelect = listSubMisionAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

      if(subMisionSelect != undefined){
        let misionSelect = listMisionAPI.filter(registro => registro.id == subMisionSelect?.id_mision)[0]
        setMisionList(misionSelect)
      }

      if (subMisionSelect != null) {
        setNombreActual(subMisionSelect.name)
        setCodigoActual(subMisionSelect.code)
        setDescripcionActual(subMisionSelect.description)
      }
    }

  }, [modo])

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    
    if(visibilidadModalInsertar == true){
      mostrarMisionAPI()
    }
  }, [visibilidadModalInsertar])


  return (
    <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false, '')} fullWidth maxWidth='md'>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        {modo == 'nuevo' ? 'New Sub Mission' : 'Edit Sub Mission'}
      </DialogTitle>
      <DialogContent>

        <Grid container spacing={2} columns={16} style={{ marginTop: '1px' }}>
          <Grid item xs={8}>
            <Autocomplete
                id="tags-outlined"
                options={listMisionAPI}
                value={misionList != undefined ? misionList : ''}
                inputValue={misionList != null ? misionList.name : ''}
                onChange={(event, value) => setMisionList(value)}
                getOptionLabel={(option) => 
                  option.name != null ? option.name : ''
                }
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Mission'
                    placeholder='Mission'
                    size="small"
                    fullWidth
                  />
                )}
              />


          </Grid>
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
        <Button disabled={botonControlSave} onClick={() => crearConjunto()}>Save</Button>

      </DialogActions>
    </Dialog>
  )
}

