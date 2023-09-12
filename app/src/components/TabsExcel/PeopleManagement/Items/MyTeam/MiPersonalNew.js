//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import * as global from 'global.js';
//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FolderIcon from '@mui/icons-material/Folder';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme, styled } from '@mui/material/styles';

import { showMessage } from 'app/store/fuse/messageSlice'
import AssignarPersonas from '../../../../Gestion/SubMision/modals/assignedPeople.js'
import TableModules from '../../../../tables/TableModules'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
    setMemberSelectAPIAction
} from '../../store/actions'

import {
    obtenerDireccionDepartamentalDirectasAPIAction,
    obtenerDepartamentosDirectasAPIAction,
    obtenerWPDirectasAPIAction,
    obtenerMisionesDirectasAPIAction,
    obtenerSubMisionesDirectasAPIAction,
    mostrarUserAPIAction
} from '../../../../Managment/Users/store/actions'

import {
    obtenerPersonalAsignadoContratoAPIAction
} from '../../../../Gestion/SubMision/store/actions'

import {
    mostrarUserAppAPIAction
} from '../Aplications/store/actions'

//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'

const useStyles = makeStyles({

    customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

//**********************END_IMPORTACIONES ***********************/

export default function MiPersonal() {

    const columnasDataTable = [
        { Header: "Type", accessor: "aplication_user_type", sortable: true, type: 'list' },
        { Header: "Code", accessor: "aplication_user_id_code", sortable: true, type: 'string' },
        { Header: "Name", accessor: "aplication_user_id_name", sortable: true, type: 'string' }
    ]

    const theme = useTheme();

    const [vectorUsuariosGrupoSeleccionado, setVectorUsuariosGrupoSeleccionado] = useState([])
    const [userListSelected, setUserListSelected] = useState('')
    const [tipoBusqueda, setTipoBusqueda] = useState('')
    const [wpSelect, setWpSelect] = useState('')
    const [misionSelect, setMisionSelect] = useState('')
    const [subMisionSelect, setSubMisionSelect] = useState('')


    //NUEVA
    const subMisionesDirectas = useSelector(state => state.fuse.userComponente.subMisionesDirectas)
    const misionesDirectas = useSelector(state => state.fuse.userComponente.misionesDirectas)
    const WPDirectas = useSelector(state => state.fuse.userComponente.WPDirectas)

    //obtener el state de Redux
    const loading = useSelector(state => state.fuse.peopleManagementComponente.loading)
    const valorTab = useSelector(state => state.fuse.peopleManagementComponente.valorTabPeople)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
    const listPeopleContrato = useSelector(state => state.fuse.subMisionComponent.listPeopleContratoAPI)
    const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)

    //creamos una función para hacer uso de Actions
    const dispatch = useDispatch()
    const mostrarUserAppAPI = (datos) => dispatch(mostrarUserAppAPIAction(datos))
    const setMemberSelectAPI = (idMember) => dispatch(setMemberSelectAPIAction(idMember))


    const obtenerWPDirectasAPI = (idPerson) => dispatch(obtenerWPDirectasAPIAction(idPerson))
    const obtenerMisionesDirectasAPI = (idPerson) => dispatch(obtenerMisionesDirectasAPIAction(idPerson))
    const obtenerSubMisionesDirectasAPI = (idPerson) => dispatch(obtenerSubMisionesDirectasAPIAction(idPerson))

    const obtenerPersonalAsignadoContratoAPI = (idContrato) => dispatch(obtenerPersonalAsignadoContratoAPIAction(idContrato))
    const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())


    useEffect(() => {
        mostrarUserAPI()
    }, [])

    useEffect(() => {
        obtenerWPDirectasAPI(personLogin.id)
        obtenerMisionesDirectasAPI(personLogin.id)
        obtenerSubMisionesDirectasAPI(personLogin.id)
    }, [personLogin])

    useEffect(() => {

        setVectorUsuariosGrupoSeleccionado([])

    }, [tipoBusqueda])

    useEffect(() => {

        if (tipoBusqueda != "") {
            if (tipoBusqueda == "WP") {
                console.log("-DATA-")
                console.log(usersListAPI)
                let vectUser = []
                for(let item in wpSelect.responsableWP){
                    console.log(wpSelect.responsableWP[item])
                    let userSelect = usersListAPI.filter(elemento => elemento.id == wpSelect.responsableWP[item])[0]
                    console.log(userSelect)
                    if(userSelect != undefined){
                        vectUser.push(userSelect)
                    }
                }

                console.log(vectUser)
                console.log("-FIN DATA-")
                setVectorUsuariosGrupoSeleccionado(vectUser)
            }
            if (tipoBusqueda == "Mision") {
                let vectUser = []
                let vectorResponsablesYEmpleados = misionSelect.responsables + misionSelect.empleados
                for(let item in vectorResponsablesYEmpleados){
                    let userSelect = usersListAPI.filter(elemento => elemento.id == vectorResponsablesYEmpleados[item])[0]
                    if(userSelect != undefined){
                        vectUser.push(userSelect)
                    }
                }
                setVectorUsuariosGrupoSeleccionado(vectUser)
            }
            if (tipoBusqueda == "SubMision") {
                obtenerPersonalAsignadoContratoAPI(subMisionSelect.id)
            }

        }

    }, [wpSelect, misionSelect, subMisionSelect])


    useEffect(() => {
        if(listPeopleContrato != undefined && tipoBusqueda == "SubMision"){
            setVectorUsuariosGrupoSeleccionado(listPeopleContrato)
        }
    }, [listPeopleContrato])

    function selectUser(user) {
        setUserListSelected(user)
        mostrarUserAppAPI(user['id'])
        setMemberSelectAPI(user['id'])
    }

    return (
        <>
            <div style={valorTab == 'miPersonalNew' ? { display: "block" } : { display: "none" }} >

                <Grid container spacing={2} columns={16}>
                    <Grid item xs={5} style={{ marginTop: '10px' }}>
                        {/*FILTROS DE LISTADO DE PERSONAL */}
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <FormControl variant="outlined" size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-label">Search by</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="rol"
                                        label="Search by"
                                        size="small"
                                        value={tipoBusqueda}
                                        onChange={e => { setTipoBusqueda(e.target.value); }}
                                    >

                                        <MenuItem value={"WP"}>Work Package</MenuItem>
                                        <MenuItem value={"Mision"}>Mision</MenuItem>
                                        <MenuItem value={"SubMision"}>Sub Mision</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={8}>
                                <div style={tipoBusqueda == "WP" ? { display: "inline" } : { display: "none" }}>
                                <Autocomplete
                                    id="tags-outlined"
                                    value={wpSelect != undefined ? wpSelect : ''}
                                    inputValue={wpSelect != null ? wpSelect.name : ''}
                                    options={WPDirectas}
                                    getOptionLabel={(option) =>
                                        option.name != null ? option.name : ''
                                    }
                                    onChange={(event, value) => setWpSelect(value)}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Work Package'
                                            placeholder='Work Package'
                                            size="small"
                                            fullWidth
                                        />
                                    )}
                                />
                                </div>

                                <div style={tipoBusqueda == "Mision" ? { display: "inline" } : { display: "none" }}>
                                <Autocomplete
                                    id="tags-outlined"
                                    value={misionSelect != undefined ? misionSelect : ''}
                                    inputValue={misionSelect != null ? misionSelect.name : ''}
                                    options={misionesDirectas}
                                    getOptionLabel={(option) =>
                                        option.name != null ? option.name : ''
                                    }
                                    onChange={(event, value) => setMisionSelect(value)}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Mision'
                                            placeholder='Mision'
                                            size="small"
                                            fullWidth
                                        />
                                    )}
                                />
                                </div>

                                <div style={tipoBusqueda == "SubMision" ? { display: "inline" } : { display: "none" }}>
                                <Autocomplete
                                    id="tags-outlined"
                                    value={subMisionSelect != undefined ? subMisionSelect : ''}
                                    inputValue={subMisionSelect != null ? subMisionSelect.name : ''}
                                    options={subMisionesDirectas}
                                    getOptionLabel={(option) =>
                                        option.name != null ? option.name : ''
                                    }
                                    onChange={(event, value) => setSubMisionSelect(value)}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Sub Mision'
                                            placeholder='Sub Mision'
                                            size="small"
                                            fullWidth
                                        />
                                    )}
                                />
                                </div>
                                
                            </Grid>
                        </Grid>
                        {/*LISTADO DE USUARIOS*/}
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            {vectorUsuariosGrupoSeleccionado.map((user) => {
                                return (
                                    <>
                                        <Card sx={{ marginTop: '5px' }} onClick={() => selectUser(user)}>

                                            <Box style={user['rol_employee'] == "permanent" ? userListSelected['id'] == user['id'] ? { backgroundColor: theme.palette.text.primary, border: "3px solid #000000", borderRadius: "20px" } : { backgroundColor: theme.palette.text.primary } : userListSelected['id'] == user['id'] ? { backgroundColor: theme.palette.secondary.main, border: "3px solid #000000", borderRadius: "20px" } : { backgroundColor: theme.palette.secondary.main }}>
                                                <CardContent>
                                                    <div>
                                                        <Typography component="div" variant="subtitle1" color="#FFFFFF">
                                                            {user['first_name'] + " " + user['last_name']}
                                                        </Typography>
                                                    </div>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </>
                                );
                            })}
                        </Box>

                    </Grid>

                    <Grid item xs={10} rowSpacing={20} alignItems="center">
                        {/*DETALLES EMPLEADO*/}
                        <h3 style={{ fontWeight: '600' }}>Employee details:</h3>
                        <Grid container spacing={2} columns={16} style={{ marginTop: '3px' }}>
                            <Grid item xs={8}>
                                <p>Name: {userListSelected != '' && userListSelected['first_name'] != undefined ? userListSelected['first_name'] + " " + userListSelected['last_name'] : ""}</p>
                            </Grid>

                            <Grid item xs={8}>
                                <p>Role: {userListSelected != undefined ? userListSelected['rolUser'] : ""}</p>
                            </Grid>

                            <Grid item xs={8}>
                                <p>Email: {userListSelected != undefined ? userListSelected['email'] : ""}</p>
                            </Grid>

                            <Grid item xs={8}>
                                <p>Phone: {userListSelected != undefined ? userListSelected['phone'] : ""}</p>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columns={16} style={{ marginTop: '10px' }}>
                            <Grid item xs={16}>
                                <h3 style={listUserApp.length == 0 ? { display: "none" } : { display: "block", fontWeight: '600' }}>Employee requeriments:</h3>
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <Alert severity="info" style={listUserApp.length != 0 ? {} : { display: "none" }}>
                                        <AlertTitle>The following list shows all the requirements that are available to the employee</AlertTitle>
                                    </Alert>
                                </div>
                                <TableModules rowsProp={listUserApp} columnsProp={columnasDataTable} loading={loading} />
                            </Grid>
                            {/*HERRAMIENTAS EMPLEADO*/}
                            {/*<Grid item xs={8}>
                                <h3 style={{ fontWeight: '600' }}>Employee tools:</h3>
                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                    aria-label="contacts"
                                >
                                    {vectRepeticion.map((textItem) => {
                                        return (
                                            <>
                                                <ListItem disablePadding>
                                                    <ListItemText primary={textItem} />
                                                    <ListItemText primary={textItem} />
                                                </ListItem>
                                            </>
                                        );
                                    })}
                                </List>
                            </Grid>*/}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <AssignarPersonas />
        </>
    )
}

