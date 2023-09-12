//**********************IMPORTACIONES****************************
import { useEffect, useState, useRef } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { showMessage } from 'app/store/fuse/messageSlice'
import { DataGrid } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleIcon from '@mui/icons-material/Circle';
import * as global from 'global.js';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
  cambiarVisibilidadModalDetallesUserAPI
} from './store/actions'

import {
  obtenerDireccionDepartamentalDirectasAPIAction,
  obtenerDepartamentosDirectasAPIAction,
  obtenerWPDirectasAPIAction,
  obtenerMisionesDirectasAPIAction,
  obtenerSubMisionesDirectasAPIAction
} from '../../store/actions'

import {
  mostrarUserAppAPIAction
} from '../../../../TabsExcel/PeopleManagement/Items/Aplications/store/actions'

import TableModules from '../../../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/

const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});

const steps = [
  'User data',
  'User permissions',
];

export default function NewUser() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userSelected, setUserSelected] = React.useState({});
  const [numAgresso, setNumAgresso] = React.useState('');
  const [searchAgresso, setSearchAgresso] = React.useState(false);
  const [userExportAgresso, setUserExportAgresso] = useState('');

  const loading = useSelector(state => state.fuse.detallerUserComponente.loading)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const userSeleccionado = useSelector(state => state.fuse.detallerUserComponente.userSeleccionado)
  const visibilidadModalDetalles = useSelector(state => state.fuse.detallerUserComponente.visibilidadModalDetalles)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)

  const subMisionesDirectas = useSelector(state => state.fuse.userComponente.subMisionesDirectas)
  const misionesDirectas = useSelector(state => state.fuse.userComponente.misionesDirectas)
  const WPDirectas = useSelector(state => state.fuse.userComponente.WPDirectas)
  const departamentosDirectas = useSelector(state => state.fuse.userComponente.departamentosDirectas)
  const direccionDepartamenalDirectas = useSelector(state => state.fuse.userComponente.direccionDepartamenalDirectas)
  const mostrarUserAppAPI = (datos) => dispatch(mostrarUserAppAPIAction(datos))
  const cambiarVisibilidadModalDetallesUser = (valor, modo) => dispatch(cambiarVisibilidadModalDetallesUserAPI(valor, modo))

  const obtenerDireccionDepartamentalDirectasAPI = (idPerson) => dispatch(obtenerDireccionDepartamentalDirectasAPIAction(idPerson))
  const obtenerDepartamentosDirectasAPI = (idPerson) => dispatch(obtenerDepartamentosDirectasAPIAction(idPerson))
  const obtenerWPDirectasAPI = (idPerson) => dispatch(obtenerWPDirectasAPIAction(idPerson))
  const obtenerMisionesDirectasAPI = (idPerson) => dispatch(obtenerMisionesDirectasAPIAction(idPerson))
  const obtenerSubMisionesDirectasAPI = (idPerson) => dispatch(obtenerSubMisionesDirectasAPIAction(idPerson))


  const classes = useStyles();
  const dispatch = useDispatch();

  const columnasDataTable = [
    { Header: "Type", accessor: "aplication_user_type", sortable: true, type: 'list' },
    { Header: "Code", accessor: "aplication_user_id_code", sortable: true, type: 'string' },
    { Header: "Name", accessor: "aplication_user_id_name", sortable: true, type: 'string' }
  ]

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (userSeleccionado != '') {
      let userSelecciona = usersListAPI.filter(elemento => elemento.id == userSeleccionado)[0]
      if (userSelecciona != undefined) {
        setUserSelected(userSelecciona)
        mostrarUserAppAPI(userSelecciona.id)

        //GET BLOQUES DIRECTOS
        obtenerDireccionDepartamentalDirectasAPI(userSelecciona.id)
        obtenerDepartamentosDirectasAPI(userSelecciona.id)
        obtenerWPDirectasAPI(userSelecciona.id)
        obtenerMisionesDirectasAPI(userSelecciona.id)
        obtenerSubMisionesDirectasAPI(userSelecciona.id)

      }

    }
  }, [userSeleccionado]);


  return (
    <>
      <Dialog open={visibilidadModalDetalles} fullWidth maxWidth='md'
        PaperProps={{
          sx: {
            minHeight: "70%"
          }
        }}>
        <DialogTitle classes={{ root: classes.customDialogTitle }}>
          Details User
        </DialogTitle>
        <DialogContent>

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Employee details" value="1" />
                  <Tab label="My groups" value="2" />
                  <Tab label="Requirements" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box>
                  {/*DETALLES EMPLEADO*/}
                  <h3 style={{ fontWeight: '600' }}>Employee details:</h3>
                  <Grid container spacing={2} columns={16} style={{ marginTop: '3px' }}>
                    <Grid item xs={8}>
                      <p>Name: {userSelected != '' && userSelected['first_name'] != undefined ? userSelected['first_name'] + " " + userSelected['last_name'] : ""}</p>
                    </Grid>

                    <Grid item xs={8}>
                      <p>Role: {userSelected != undefined ? userSelected['rolUser'] : ""}</p>
                    </Grid>

                    <Grid item xs={8}>
                      <p>Email: {userSelected != undefined ? userSelected['email'] : ""}</p>
                    </Grid>

                    <Grid item xs={8}>
                      <p>Phone: {userSelected != undefined ? userSelected['phone'] : ""}</p>
                    </Grid>
                    {/*</Grid>
                        FIN DETALLES EMPLEADO*/}
                    {/*DETALLES EMPLEADO
                        <Grid container spacing={2} columns={16} style={{ marginTop: '3px' }}>*/}
                    <Grid item xs={8}>
                      <p>Level1_VT: {userExportAgresso != undefined && userExportAgresso['Nivel1_VT'] != undefined ? userExportAgresso['Nivel1_VT'] : ""}</p>
                    </Grid>

                    <Grid item xs={8}>
                      <p>Level2_VT: {userExportAgresso != undefined && userExportAgresso['Nivel2_VT'] != undefined ? userExportAgresso['Nivel2_VT'] : ""}</p>
                    </Grid>

                    <Grid item xs={8}>
                      <p>Company: {userExportAgresso != undefined && userExportAgresso['Empresa'] != undefined ? userExportAgresso['Empresa'] : ""}</p>
                    </Grid>

                    <Grid item xs={8}>
                      <p>Operations Zone: {userExportAgresso != undefined && userExportAgresso['Zona_Operaciones'] != undefined ? userExportAgresso['Zona_Operaciones'] : ""}</p>
                    </Grid>
                  </Grid>
                  {/*FIN DETALLES EMPLEADO*/}
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box>

                  {/*ACORDEON DE SUB MISIONES */}
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{global.rolN7}/{global.rolN8}({subMisionesDirectas.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {subMisionesDirectas.map((value) => {
                          return (
                            <ListItem
                              key={value.id}
                              disablePadding
                            >
                              <ListItemIcon>
                                <CircleIcon style={{ fontSize: 10, fill: '#000000' }} />
                              </ListItemIcon>
                              <ListItemText id={value.id} primary={value.name} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  {/*ACORDEON DE MISIONES */}
                  <Accordion
                    style={personLogin.rolUser == global.rolN8 || personLogin.rolUser == global.rolN7 ? { display: "none" } : { display: "block" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{global.rolN5}/{global.rolN6}({misionesDirectas.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {misionesDirectas.map((value) => {
                          return (
                            <ListItem
                              key={value.id}
                              disablePadding
                            >
                              <ListItemIcon>
                                <CircleIcon style={{ fontSize: 10, fill: '#000000' }} />
                              </ListItemIcon>
                              <ListItemText id={value.id} primary={value.name} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  {/*ACORDEON DE WP */}
                  <Accordion
                    style={personLogin.rolUser == global.rolN8 || personLogin.rolUser == global.rolN7 || personLogin.rolUser == global.rolN6 || personLogin.rolUser == global.rolN5 ? { display: "none" } : { display: "block" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{global.rolN4}({WPDirectas.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {WPDirectas.map((value) => {
                          return (
                            <ListItem
                              key={value.id}
                              disablePadding
                            >
                              <ListItemIcon>
                                <CircleIcon style={{ fontSize: 10, fill: '#000000' }} />
                              </ListItemIcon>
                              <ListItemText id={value.id} primary={value.name} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  {/*ACORDEON DE DEPARTAMENTOS */}
                  <Accordion
                    style={personLogin.rolUser == global.rolN8 || personLogin.rolUser == global.rolN7 || personLogin.rolUser == global.rolN6 || personLogin.rolUser == global.rolN5 || personLogin.rolUser == global.rolN4 ? { display: "none" } : { display: "block" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{global.rolN3}({departamentosDirectas.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {departamentosDirectas.map((value) => {
                          return (
                            <ListItem
                              key={value.id}
                              disablePadding
                            >
                              <ListItemIcon>
                                <CircleIcon style={{ fontSize: 10, fill: '#000000' }} />
                              </ListItemIcon>
                              <ListItemText id={value.id} primary={value.name} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  {/*ACORDEON DE DIRECCION DEPARTAMENTAL */}
                  <Accordion
                    style={personLogin.rolUser == global.rolN1 || personLogin.rolUser == global.rolN2 ? { display: "block" } : { display: "none" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{global.rolN2} ({direccionDepartamenalDirectas.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {direccionDepartamenalDirectas.map((value) => {
                          return (
                            <ListItem
                              key={value.id}
                              disablePadding
                            >
                              <ListItemIcon>
                                <CircleIcon style={{ fontSize: 10, fill: '#000000' }} />
                              </ListItemIcon>
                              <ListItemText id={value.id} primary={value.name} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                </Box>
              </TabPanel>
              <TabPanel value="3">
                <h3 style={listUserApp.length == 0 ? { display: "none" } : { display: "block", fontWeight: '600' }}>Employee requeriments:</h3>
                <TableModules rowsProp={listUserApp} columnsProp={columnasDataTable} loading={loading} />
              </TabPanel>
            </TabContext>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => { cambiarVisibilidadModalDetallesUser(false, '') }}>Close</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

