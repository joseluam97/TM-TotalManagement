//**************IMPORTACIONES*************************************************

import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import TasksHeader from './TasksHeader';
import TasksList from './TasksList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import List from '@mui/material/List';
import Help from '@mui/icons-material/Help';
import IconButton from "@mui/material/IconButton";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid from '@mui/material/Grid';
import { lighten, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux';
import {

        mostrarRmAccionAPIAction,
        cambiarEstadoRmTasksAction,


} from './store/actions'
import store from "app/store/index"

import {


        cambiarEstadoRmRegistroAction


} from '../RmRegistro/store/actions'

import TaskForm from './task/TaskForm.js'

//**************END IMPORTACIONES*************************************************




const steps = [
        'Create FMEA',
        'Create R & O',
        'Create actions'
];

const useStyles = makeStyles({

        customDialogTitle: {
                backgroundColor: 'rgb(0, 0, 0)',
marginLeft: '3px',
marginRight: '3px',
                color: 'rgb(255, 255, 255)',
                marginBottom: '0.5em'
        }

});



const Root = styled(FusePageSimple)(({ theme }) => ({
        '& .FusePageSimple-header': {
                backgroundColor: theme.palette.background.paper,
        },
}));

function TasksApp(props) {

        const dispatch = useDispatch();
        const classes = useStyles();
        const pageLayout = useRef(null);
        const routeParams = useParams();
        const theme = useTheme();
        const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
        const [recordatorioClose, setRecordatorioClose] = useState(false)
        const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
        const [ayudaRO, setAyudaRO] = useState(false)
        const [ayudaAMFE, setAyudaAMFE] = useState(false)
        const [disabledAddActions, setDisabledAddActions] = useState(true);

        //Obtener los states de Redux
        const rmAccionesListAPI = useSelector(state => state.fuse.rmAccionComponente.rmAccionesListAPI)
        const visibilidadModalTasks = useSelector(state => state.fuse.tasksAccionesComponente.visibilidad)
        const guardarCambiosTasks = useSelector(state => state.fuse.tasksAccionesComponente.guardarCambios)
        const rmRegistrosList = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListAPI)
        const filaSeleccionadaRO = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
        const ultimoIdCreadoRO = useSelector(state => state.fuse.rmRegistroComponente.ultimoIdCreado)
        const AMFEList = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)
        const filaSeleccionadaGridRiskManagement = useSelector(state => state.fuse.riskManagementComponente.filaSeleccionadaGrid)
        const ultimoIdCreadoRiskManagement = useSelector(state => state.fuse.riskManagementComponente.ultimoIdCreado)
        const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

        //Creamos funciones para hacer uso de Actions Redux
        const mostrarRmAccionAPI = () => dispatch(mostrarRmAccionAPIAction())

        useEffect(() => {
                setRightSidebarOpen(Boolean(routeParams.id));
        }, [routeParams]);

        useEffect(() => {
                setRightSidebarOpen(Boolean(routeParams.id));
        }, [routeParams]);

        useEffect(() => {

                if (personLoginPermisos.length > 0) {

                        if (personLoginPermisos.find((item) => item['name'] == "Can add rm action") == undefined) {
                                setDisabledAddActions(false)
                        }
                }

        }, [personLoginPermisos])


        useEffect(() => {

                if(rmAccionesListAPI.length != 0){
                        compruebaNumAbiertas()
                }

        }, [rmAccionesListAPI]);


        function compruebaNumAbiertas() {

                if (rmAccionesListAPI.length > 0) {


                        let rmActual = rmRegistrosList.filter(registro => registro.id == store.getState().fuse.rmRegistroComponente.filaSeleccionadaGrid)[0]

                        let numAccionesAbiertas = rmAccionesListAPI.filter(registro => registro.completed == false)

                        if (rmActual != null) {

                                if (!rmActual.closed && numAccionesAbiertas.length == 0) {

                                        //***********Completo R&O Actual **********/



                                        //********** Muestro el modal para revalorar R&O y cierro modal actual***/
                                        dispatch(cambiarEstadoRmRegistroAction('visibilidadModalInsertar', true))
                                        dispatch(cambiarEstadoRmTasksAction('visibilidad', false))
                                        dispatch(cambiarEstadoRmRegistroAction('rev', rmActual.rev + 1))
                                        dispatch(cambiarEstadoRmRegistroAction('rellenarCamposReevaluar', rmActual))
                                        dispatch(mostrarRmAccionAPIAction(0))


                                }

                        } else {  //Viene del asistente nuevo


                                if (numAccionesAbiertas.length == 0) {

                                        //***********Completo R&O Actual **********/


                                        //********** Muestro el modal para revalorar R&O y cierro modal actual***/
                                        dispatch(cambiarEstadoRmRegistroAction('visibilidadModalInsertar', true))
                                        dispatch(cambiarEstadoRmTasksAction('visibilidad', false))

                                        let revActual = store.getState().fuse.rmRegistroComponente.rev

                                        if (revActual == "") {
                                                dispatch(cambiarEstadoRmRegistroAction('rev', 2))

                                        } else {

                                                dispatch(cambiarEstadoRmRegistroAction('rev', (revActual + 1)))

                                        }

                                        dispatch(mostrarRmAccionAPIAction(0))

                                }

                        }

                }

        }


        return (

                <Dialog open={visibilidadModalTasks} onClose={() => dispatch(cambiarEstadoRmTasksAction('visibilidad', false))} fullWidth maxWidth='xl'>

                        <Box sx={{ width: '100%' }} style={{ marginTop: "20px", marginBottom: "20px", backgroundColor: "white" }}>
                                <Stepper activeStep={2} alternativeLabel>
                                        {steps.map((label) => (
                                                <Step key={label}>
                                                        <StepLabel>{label} {label == 'Create R & O' ? <IconButton style={{ margin: '-9px' }} onClick={() => setAyudaRO(true)}><Help /></IconButton> : (label == 'Create FMEA' ? <IconButton style={{ margin: '-9px' }} onClick={() => setAyudaAMFE(true)}><Help /></IconButton> : '')}</StepLabel>
                                                </Step>
                                        ))}
                                </Stepper>


                                {/*   Dialog datos AMFE*/}

                                <Dialog open={ayudaAMFE} onClose={() => setAyudaAMFE(false)} fullWidth maxWidth="md" >
                                        <DialogTitle>Associated FMEA</DialogTitle>
                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


                                                <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                                                <TableBody>
                                                                        {AMFEList.filter(registro => registro.id == (filaSeleccionadaGridRiskManagement == '' ? ultimoIdCreadoRiskManagement['id'] : filaSeleccionadaGridRiskManagement)).map(filtered =>
                                                                        (
                                                                                <>
                                                                                        <TableRow
                                                                                                key={filtered.title}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Title:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.title}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.code}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Code:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.code}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.fullNameManager}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Manager:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.fullNameManager}</TableCell>

                                                                                        </TableRow>
                                                                                        <TableRow
                                                                                                key={filtered.fullNameMiembros}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Members:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.fullNameMiembros}</TableCell>

                                                                                        </TableRow>
                                                                                        {/*<TableRow
                                                                                                key={filtered.customer}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Customer:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.customer}</TableCell>

                                                                                        </TableRow>*/}

                                                                                        <TableRow
                                                                                                key={filtered.mision_name}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Mission:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.mision_name}</TableCell>

                                                                                        </TableRow>

                                                                                </>
                                                                        ))
                                                                        }

                                                                </TableBody>
                                                        </Table>
                                                </TableContainer>

                                        </List>
                                        <DialogActions>

                                                <Button onClick={() => setAyudaAMFE(false)}>Close</Button>

                                        </DialogActions>
                                </Dialog>

                                {/*   Dialog datos R&O*/}

                                <Dialog open={ayudaRO} onClose={() => setAyudaRO(false)} fullWidth maxWidth="md" >
                                        <DialogTitle>Associated R & O</DialogTitle>
                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


                                                <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                                                <TableBody>
                                                                        {rmRegistrosList.filter(registro => registro.id == (filaSeleccionadaRO == '' ? ultimoIdCreadoRO['id'] : filaSeleccionadaRO)).map(filtered =>
                                                                        (
                                                                                <>
                                                                                        <TableRow
                                                                                                key={filtered.risk}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Risk:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.risk}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.type}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Type:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.type == 'o' ? 'Opportunity' : 'Risk'}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.d_detection}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Detection date:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.d_detection}</TableCell>

                                                                                        </TableRow>
                                                                                        <TableRow
                                                                                                key={filtered.glitch_effect}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Effect:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.glitch_effect}</TableCell>

                                                                                        </TableRow>
                                                                                        <TableRow
                                                                                                key={filtered.cause_failure}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Cause failure:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.cause_failure}</TableCell>

                                                                                        </TableRow>
                                                                                        <TableRow
                                                                                                key={filtered.current_controls}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Current controls:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.current_controls}</TableCell>

                                                                                        </TableRow>
                                                                                        <TableRow
                                                                                                key={filtered.gravity}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Severity:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.gravity}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.idea}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Frequency:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.idea}</TableCell>

                                                                                        </TableRow>


                                                                                        <TableRow
                                                                                                key={filtered.detection}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Detection:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.detection}</TableCell>

                                                                                        </TableRow>


                                                                                        <TableRow
                                                                                                key={filtered.npr}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>NPR:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.npr}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.priorization}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Prioritization:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.priorization}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.rev}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Revision:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.rev}</TableCell>

                                                                                        </TableRow>


                                                                                        <TableRow
                                                                                                key={filtered.observations}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Remarks:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.observations}</TableCell>

                                                                                        </TableRow>

                                                                                </>
                                                                        ))
                                                                        }

                                                                </TableBody>
                                                        </Table>
                                                </TableContainer>

                                        </List>
                                        <DialogActions>

                                                <Button onClick={() => setAyudaRO(false)}>Close</Button>

                                        </DialogActions>
                                </Dialog>
                        </Box>

                        <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                <TasksHeader pageLayout={pageLayout} />

                        </DialogTitle>


                        <DialogContent>
                                <div className="radialbar" style={{ margin: "5px" }}>
                                        <Alert severity="info">
                                                <AlertTitle>When you have all of your actions completed, you will be taken to the retest screen, where the R&O is retested again.</AlertTitle>
                                                {/*<strong>hola</strong>  <IconButton><InfoOutlined /></IconButton>*/}
                                        </Alert>
                                </div>
                                <div style={disabledAddActions == true ? { display: "block" } : { display: "none" }}>

                                        <Grid 
                                        style={{backgroundColor: theme.palette.background.default}}
                                        container spacing={0} columns={15}>
                                                <Grid item xs={5}>
                                                        <TasksList />
                                                </Grid>
                                                <Divider orientation="vertical" flexItem />
                                                <Grid item xs={9}>
                                                        <TaskForm />
                                                </Grid>
                                        </Grid>

                                        {/*<Root

                                                content={<TasksList />}
                                                ref={pageLayout}
                                                rightSidebarContent={<TaskForm />}
                                                rightSidebarOpen={rightSidebarOpen}
                                                rightSidebarOnClose={() => setRightSidebarOpen(false)}
                                                rightSidebarWidth={640}
                                                scroll={isMobile ? 'normal' : 'content'}
                                                                />*/}
                                </div>
                                <div style={disabledAddActions == true ? { display: "none" } : { display: "block" }}>
                                        <TasksList />
                                </div>

                        </DialogContent>
                        <DialogActions>


                                <Button variant="outlined" onClick={() => guardarCambiosTasks ? setRecordatorioClose(true) : dispatch(cambiarEstadoRmTasksAction('visibilidad', false))}>{guardarCambiosTasks ? 'Close without saving' : 'Close'}</Button>

                                <Dialog open={recordatorioClose} onClose={() => setRecordatorioClose(false)} fullWidth maxWidth="xs" >
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>
                                                Changes will not be saved, are you sure to close?

                                        </List>
                                        <DialogActions>
                                                <Button variant="outlined" onClick={() => { setRecordatorioClose(false); dispatch(cambiarEstadoRmTasksAction('visibilidad', false)) }}>Yes</Button>
                                                <Button variant="outlined" onClick={() => setRecordatorioClose(false)}>No</Button>
                                        </DialogActions>
                                </Dialog>


                        </DialogActions>
                </Dialog>
        );
}

export default TasksApp
