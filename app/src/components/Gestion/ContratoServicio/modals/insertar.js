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
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import IconButton from "@mui/material/IconButton";
import { showMessage } from 'app/store/fuse/messageSlice'
import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  mostrarContratoServicioAPIAction,
  crearContratoServicioActionAPIAction,
  updateContratoServicioActionAPIAction,
  cambiarVisibilidadModalInsertarAPIAction,
  obtenerLocationsByMisionAPIAction
} from '../store/actions'

import {
  getAllLocationCustomerAPIAction,
  mostrarCustomerAPIAction
} from '../../../Managment/Customers/store/actions'

//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  },
  textField: {
    '& p': {
      color: 'red',
    },
  }

});




export function ModalInsertar() {

  const classes = useStyles();
  const dispatch = useDispatch()

  //estados locales del formulario

  const [conjuntoList, setConjuntoList] = useState([])
  const [subconjuntoList, setSubconjuntoList] = useState([])
  const [nombreActual, setNombreActual] = useState('')
  const [codigoActual, setCodigoActual] = useState('')
  const [descripcionActual, setDescripcionActual] = useState('')
  const [clienteList, setClienteList] = useState([])
  const [localizacionList, setLocalizacionList] = useState([])
  const [botonControlSave, setBotonControl] = React.useState(true);
  const [locationsAPIFilter, setLocationsAPIFilter] = useState([])

  const columnasDataTableLocations = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'id_customer_name', headerName: 'Customer', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'code', headerName: 'Code', width: 200 },
    { field: 'direccion', headerName: 'Direction', width: 200 },
    { field: 'telefono', headerName: 'Phone', width: 200 },
    { field: 'latitud', headerName: 'Latitude', width: 150 },
    { field: 'longuitud', headerName: 'Longuitude', width: 150 }
  ]

  // Obtener los states de Redux
  const visibilidadModalInsertar = useSelector(state => state.fuse.contratoComponente.visibilidadModalInsertarContrato)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.contratoComponente.filaSeleccionadaGrid)
  const modo = useSelector(state => state.fuse.contratoComponente.modo)
  const contratoListAPI = useSelector(state => state.fuse.contratoComponente.listContratoAPI)
  const locationCustomerListAPI = useSelector(state => state.fuse.customerComponent.locationCustomerListAPI)
  const customerListAPI = useSelector(state => state.fuse.customerComponent.customerListAPI)
  const listLocationsMisionesAsociadas = useSelector(state => state.fuse.contratoComponente.listLocationsMisionesAsociadas)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
  const crearContratoActionAPI = (conjunto) => dispatch(crearContratoServicioActionAPIAction(conjunto))
  const updateContratoActionAPI = (id, conjunto) => dispatch(updateContratoServicioActionAPIAction(id, conjunto))
  const mostrarContratoAPI = () => dispatch(mostrarContratoServicioAPIAction())
  const getAllLocationCustomerAPI = () => dispatch(getAllLocationCustomerAPIAction())
  const mostrarCustomerAPI = () => dispatch(mostrarCustomerAPIAction())
  const obtenerLocationsByMisionAPI = (idContrato) => dispatch(obtenerLocationsByMisionAPIAction(idContrato))

  useEffect(() => {
    getAllLocationCustomerAPI()
    mostrarCustomerAPI()
  }, [])

  useEffect(() => {
    if (filaSeleccionadaGrid != '') {
      obtenerLocationsByMisionAPI(filaSeleccionadaGrid)
    }
  }, [filaSeleccionadaGrid])

  //FILTROS PARA ELEGIR LA LOCALIZACION
  useEffect(() => {
    //locationCustomerListAPI => TODAS LAS LOCATIONS
    //locationsAPIFilter => LOCATIONS FILTRADAS POR CLIENTES
    let locationsAPIFilterFuncion = []

    if (clienteList.length != 0) {

      for (let value in clienteList) {
        let locationsValidas = locationCustomerListAPI.filter(item => item.id_customer == clienteList[value]['id'])

        if (locationsValidas != undefined) {
          for (let location in locationsValidas) {
            locationsAPIFilterFuncion.push(locationsValidas[location])
          }
        }
      }

      setLocationsAPIFilter(locationsAPIFilterFuncion)
    }
    else {
      setLocationsAPIFilter(locationCustomerListAPI)
    }


  }, [clienteList])

  useEffect(() => {
    if (clienteList.length == 0) {
      setLocationsAPIFilter(locationCustomerListAPI)
    }
  }, [locationCustomerListAPI])

  //FILTROS DE ELEGIR LOS PROGRAMAS
  useEffect(() => {

  }, [modo])

  useEffect(() => {
    if (subconjuntoList != undefined &&
      nombreActual.trim() != '' &&
      codigoActual.trim() != '') {
      setBotonControl(false)

    } else {
      setBotonControl(true)

    }
  })

  function comprobarLocalizacionesCorrectas() {

    let vectIDSite = []
    for (let item in localizacionList) {
      vectIDSite.push(localizacionList[item].id)
    }

    if (listLocationsMisionesAsociadas.length != 0 && modo == "editar") {

      let posibleGuardar = true
      for (let localizacionMision in listLocationsMisionesAsociadas) {
        let data = vectIDSite.includes(listLocationsMisionesAsociadas[localizacionMision])
        if (data == false) {
          posibleGuardar = false
        }
      }

      if (posibleGuardar == true) {
        crearConjunto()
      }
      else {
        dispatch(
          showMessage({
            message: "You have modified the contract/service locations and removed locations that are used in the quests associated with this contract.",
            variant: "error"
          })
        )
      }

    }
    else {
      crearConjunto()
    }
  }

  function crearConjunto() {

    let vectLocalizacion = []

    for (let itemLocalizacion in localizacionList) {
      vectLocalizacion.push(localizacionList[itemLocalizacion]['id'])
    }
    if (modo == 'nuevo') {
      crearContratoActionAPI({
        name: nombreActual,
        code: codigoActual,
        description: descripcionActual,
        locations: vectLocalizacion
      })
    }

    if (modo == 'editar') {
      updateContratoActionAPI(filaSeleccionadaGrid, {
        name: nombreActual,
        code: codigoActual,
        description: descripcionActual,
        locations: vectLocalizacion
      })
    }


    cambiarVisibilidadModalInsertar(false, '');
    mostrarContratoAPI();

  }

  useEffect(() => {

    if (modo == 'nuevo') {
      setNombreActual('')
      setCodigoActual('')
      setDescripcionActual('')
      setLocalizacionList([])
    }

    if (modo == 'editar' || modo == 'consultar') {
      let contratoSelected = contratoListAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

      if (contratoSelected != null) {

        let vectProgram = []
        let vectConjunto = []
        let vectSubConjunto = []
        let vectLocations = []

        for (let itemLocation in contratoSelected['locations']) {
          let locationsSelected = locationCustomerListAPI.filter(registro => registro.id == contratoSelected['locations'][itemLocation])[0]
          vectLocations.push(locationsSelected)
        }
        setLocalizacionList(vectLocations)

        setNombreActual(contratoSelected.name)
        setCodigoActual(contratoSelected.code)
        setDescripcionActual(contratoSelected.description)
      }
    }

  }, [modo])


  return (
    <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false, '')} fullWidth maxWidth='lg'>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        {modo == 'nuevo' ? "New Contract" : "Edit Contract"}

      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columns={24}>

          <Grid item xs={8}>

            <TextField
              label="Name"
              id="nombre"
              value={nombreActual}
              sx={{ m: 1 }}
              fullWidth
              disabled={modo == "consultar" ? true : false}
              onChange={e => setNombreActual(e.target.value)}
            />

          </Grid>

          <Grid item xs={8}>

            <TextField
              label="Code"
              id="codigo"
              value={codigoActual}
              sx={{ m: 1 }}
              fullWidth
              disabled={modo == "consultar" ? true : false}
              onChange={e => setCodigoActual(e.target.value)}
            />

          </Grid>

          <Grid item xs={8}>

            <TextField
              id="descripcion"
              label="Description"
              multiline
              rows={4}
              value={descripcionActual}
              sx={{ m: 1 }}
              fullWidth
              disabled={modo == "consultar" ? true : false}
              onChange={e => setDescripcionActual(e.target.value)}
            />

          </Grid>

          <Grid item xs={12} style={{ display: modo == 'consultar' ? 'none' : 'block' }}>
            <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={customerListAPI}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setClienteList(value)}
                disabled={modo == "consultar" ? true : false}
                fullWidth
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer"
                    placeholder="Customer"
                    size="xl"
                    className={classes.textField}
                    helperText="This record will not be stored, it is used to filter the locations."
                  //onChange={e => { setContract(e.target.value); }}
                  />
                )}
              />
            </FormControl>

          </Grid>

          <Grid item xs={12}>
            <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
              <Autocomplete
                multiple
                limitTags={2}
                id="tags-outlined"
                value={localizacionList}
                options={locationsAPIFilter}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setLocalizacionList(value)}
                disabled={modo == "consultar" ? true : false}
                fullWidth
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Locations"
                    placeholder="Locations"
                    size="xl"
                  //onChange={e => { setContract(e.target.value); }}
                  />
                )}
              />
            </FormControl>

          </Grid>


        </Grid>



      </DialogContent>
      <DialogActions>


        <Button onClick={() => cambiarVisibilidadModalInsertar(false, '')}>Close</Button>
        <Button disabled={botonControlSave} onClick={() => comprobarLocalizacionesCorrectas()}>Save</Button>

      </DialogActions>
    </Dialog>
  )
}

