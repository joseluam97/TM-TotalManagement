//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import store from "app/store/index"
import ModalInsertar from './modals/insertar.js'
import { getCookie } from 'app/js/generalFunctions'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from "@mui/icons-material/Delete";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarContainer
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

import _ from '@lodash';
import { useNavigate } from "react-router-dom";

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  mostrarCategoryAPIAction,
  cambiarValorSeleccionAction,
  cambiarVisibilidadModalInsertarCategoryAPI,
  putCategoryAPIAction,
  mostrarTiposUnicosAPIAction
} from './store/actions'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction
} from '../Users/store/actions'

import TableModules from '../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/


export default function Category() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)
  const [disabledNewCategory, setDisabledNewCategory] = useState(true)
  const [disabledEditCategory, setDisabledEditCategory] = useState(true)
  const [disabledDeleteCategory, setDisabledDeleteCategory] = useState(true)
  const [vectorCategorias, setVectorCategorias] = useState([])
  const [existenFiltros, setExistenFiltros] = useState(false)

  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.categoriaComponent.loading)
  const categoriaListAPI = useSelector(state => state.fuse.categoriaComponent.categoriaListAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.categoriaComponent.filaSeleccionadaGrid)
  const tipoCategoriasAPI = useSelector(state => state.fuse.categoriaComponent.tipoCategoriasAPI)
  const visibilidadNewCategory = useSelector(state => state.fuse.categoriaComponent.visibilidadNewCategory)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalInsertarCategory = (valor, modoDialogCategory) => dispatch(cambiarVisibilidadModalInsertarCategoryAPI(valor, modoDialogCategory))
  const mostrarCategoryAPI = () => dispatch(mostrarCategoryAPIAction())
  const putCategoryAPI = (valor, datos) => dispatch(putCategoryAPIAction(valor, datos))
  const mostrarTiposUnicosAPI = () => dispatch(mostrarTiposUnicosAPIAction())

  const [resetStates, setResetStates] = useState(false);

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Title", accessor: "titulo", sortable: true, type: 'string' },
    { Header: "Code", accessor: "codigo", sortable: true, type: 'string' },
    { Header: "Definition", accessor: "definicion", sortable: true, type: 'string' },
    { Header: "Type", accessor: "tipo", sortable: true, type: 'list' }
  ]

  useEffect(() => {

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

    mostrarCategoryAPI()
    mostrarTiposUnicosAPI()

  }, [])

  useEffect(() => {

    mostrarCategoryAPI()
    mostrarTiposUnicosAPI()

  }, [visibilidadNewCategory])

  function eliminaCategoria() {

    let categoriaSelect = categoriaListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]

    putCategoryAPI(filaSeleccionadaGrid, {
      codigo: categoriaSelect.codigo,
      titulo: categoriaSelect.titulo,
      definicion: categoriaSelect.definicion,
      tipo: categoriaSelect.tipo,
      active: false
    })

  }

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view categorizacion") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add categorizacion") == undefined) {
        setDisabledNewCategory(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change categorizacion") == undefined) {
        setDisabledEditCategory(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete categorizacion") == undefined) {
        setDisabledDeleteCategory(false)
      }

    }

  }, [personLoginPermisos])

  useEffect(() => {

    resetSelectType()

  }, [categoriaListAPI])

  function selectType(tipoSelect) {

    setExistenFiltros(true)

    let vectorResult = categoriaListAPI.filter(elemento => elemento.tipo == tipoSelect)

    setVectorCategorias(vectorResult)

  }

  function resetSelectType() {

    setExistenFiltros(false)
    setVectorCategorias(categoriaListAPI)

  }

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    function handleChange() {

    }

    return (
      <>
        <div>
          <div style={{ display: "inline" }}>
            <FormControl variant="standard" >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numPagination}
                label="Size"
                style={{ float: "right", position: "relative" }}
                onChange={e => { setNumPagination(e.target.value); }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ display: "inline", float: "right", position: "relative" }}>
            <Pagination
              color="primary"
              count={pageCount}
              page={page + 1}
              onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
          </div>
        </div>

      </>
    );
  }

  function botonesSuperiores() {
    return (
      <>
        <Tooltip title="New" placement="top">
          <IconButton style={disabledNewCategory == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarCategory(true, 'nuevo');
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditCategory == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
            <EditIcon variant="outlined" onClick={() => {
              cambiarVisibilidadModalInsertarCategory(true, 'editar');
            }
            }
            >
            </EditIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton style={disabledDeleteCategory == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
            <DeleteIcon variant="outlined" onClick={() => {
              eliminaCategoria();
              mostrarCategoryAPI();
              cambiarValorSeleccion('');
            }
            }
            >
            </DeleteIcon>
          </IconButton>
        </Tooltip>

        <Divider />
      </>
    );
  }

  return (
    <>
      <FusePageCarded

        content={
          <Box sx={{ width: '100%' }}>

            <Grid container spacing={2} columns={15}>
              <Grid item xs={3} style={{ margin: '10px' }}>

                <List
                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                  subheader={<ListSubheader>Types: <Button style={existenFiltros == true ? { display: "inline", float: "right", position: "relative" } : { display: "none" }} size="small" variant="outlined" onClick={() => { resetSelectType(); }}>Delete filter</Button></ListSubheader>}
                >

                  <Divider style={{ width: '100%' }} />

                  {tipoCategoriasAPI.map((tipo) => {
                    return (
                      <>
                        <ListItem style={{ cursor: 'pointer' }} onClick={() => selectType(tipo)}>
                          <ListItemIcon>
                            <LabelImportantIcon />
                          </ListItemIcon>
                          <ListItemText id="switch-list-label-wifi" primary={tipo} />
                        </ListItem>
                        <Divider style={{ width: '100%' }} />
                      </>
                    );
                  })}

                </List>

                {/*<div style={{width: '100%' }}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <h3 style={{display: "inline", float: "left"}}>Types</h3>
                    <Button style={existenFiltros == true ? { display: "inline" } : { display: "none" }} variant="contained" onClick={() => { resetSelectType(); }}>Delete filter</Button>
                    <Divider style={{ width: '100%' }} />
                  </div>

                  {tipoCategoriasAPI.map((tipo) => {
                    return (
                      <>
                        <Card sx={{ backgroundColor: '#FFFFFF', marginTop: '5px' }} onClick={() => selectType(tipo)}>
                          <Box>
                            <CardContent>
                              <Typography component="div" variant="subtitle1" color="#000000">
                                {tipo}
                              </Typography>
                            </CardContent>
                          </Box>
                        </Card>
                      </>
                    );
                  })}

                </div>*/}
              </Grid>
              <Grid item xs>

                <div style={{ width: '100%' }}>
                  {botonesSuperiores()}
                  <TableModules rowsProp={vectorCategorias} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
                </div>
              </Grid>

            </Grid>



            <ModalInsertar />
          </Box>
        }
      />
    </>
  )
}

