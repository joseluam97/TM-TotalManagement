//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {es} from 'date-fns/locale'

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import { cambiarVisibilidadModalInsertarAction, insertarRmAccionModalInsertarAction, mostrarRmAccionAPIAction } from  '../store/actions'

//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

  customDialogTitle: {
      backgroundColor: 'rgb(0, 0, 0)',
marginLeft: '3px',
marginRight: '3px',
      color: 'rgb(255, 255, 255)',
      marginBottom: '1em'
    }
  
  });




export default function ModalInsertar() {

    const classes = useStyles();
    const dispatch = useDispatch()

     //estados locales del formulario

    
     const [rmRegistroActual, setRmRegistroActual] = useState('')
     const [numeroActual, setNumeroActual] = useState('')
     const [propuestaActual, setPropuestaActual] = useState('')
     const [responsableActual, setResponsableActual] = useState('')
     const [fechaPlanificadaActual, setFechaPlanificadaActual] = useState('')
     const [fechaCierreActual, setFechaCierreActual] = useState('')
     const [gravedadActual, setGravedadActual] = useState('')
     const [ocurrenciaActual, setOcurrenciaActual] = useState('')
     const [deteccionActual, setDeteccionActual] = useState('')
     const [nprActual, setNprActual] = useState('Gravity,idea and detection are required')
     const [priorizacionActual, setPriorizacionActual] = useState('')
     const [observacionesActual, setObservacionesActual] = useState('')

     //end_locales_formularios

    // Obtener los states de Redux
    const visibilidadModalInsertar = useSelector (state => state.fuse.rmAccionComponente.visibilidadModalInsertar)
    const errorGlobal = useSelector (state => state.fuse.rmAccionComponente.error)
    const rmRegistrosListAPI = useSelector (state => state.fuse.rmAccionComponente.rmRegistrosListAPI)
    
    //Creamos funciones para hacer uso de Actions Redux
    const cambiarVisibilidadModalInsertar = (valor) => dispatch(cambiarVisibilidadModalInsertarAction(valor))
    const insertarRmAccionModalInsertar = (riskManagement) => dispatch(insertarRmAccionModalInsertarAction(riskManagement))
    const mostrarRmAccionAPI = () => dispatch(mostrarRmAccionAPIAction())
  

    const steps = [
        'Create AMFE',
        'Create Risks Opportunities',
        'Create Actions',
      ];

    function crearRmAccion() {

      insertarRmAccionModalInsertar( {

            id_record: rmRegistroActual,
            number: numeroActual,
            proposal: propuestaActual,
            manager: responsableActual,
            d_planned: fechaPlanificadaActual,
            d_closed: fechaCierreActual,
            gravity: gravedadActual,
            idea: ocurrenciaActual,
            detection: deteccionActual,
            npr: nprActual,
            priorization: priorizacionActual,
            observations: observacionesActual
        }) 

    }


    useEffect( () => {
            
      mostrarRmAccionAPI()

  }, []);


      //Calcula el NPR
     useEffect( () => {


        if (gravedadActual =='' || ocurrenciaActual == '' || deteccionActual == '' ) {
        
                setNprActual('Gravity,idea and detection are required')

        } else {

                setNprActual(gravedadActual * ocurrenciaActual * deteccionActual)

        }
      
    }, [gravedadActual,ocurrenciaActual,deteccionActual]);


     //Calcula Priorization
        useEffect( () => {
                if (nprActual > 100) {
                        setPriorizacionActual("It is necessary to evaluate and take action")
        
                        } else if (nprActual > 80) {
                                setPriorizacionActual("The risk will be monitored. The manager will decide whether to take action")
        
        
                        } else {
                                setPriorizacionActual("No action required")
        
                        }
        
         }, [nprActual]);
         


    return (
          <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar (false)}  fullWidth maxWidth='md'>

         <Box sx={{ width: '100%' }} style={{marginTop: "20px", marginBottom: "20px"}}>
                <Stepper activeStep={2} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                </Stepper>
          </Box>
            <DialogTitle classes={{root: classes.customDialogTitle}} >
                  Create action
                 
            </DialogTitle>
            <DialogContent>

                <Grid container spacing={2} columns={16}>              
 
                    <Grid item xs={8}>
                            
                        <FormControl variant="standard"  sx={{ m: 1, width: '37ch' }} size="small">
                              <InputLabel id="label-select-risk-management">Risk opportunity</InputLabel>
                                  <Select
                                    labelId="label-select-risk-management"
                                    id="riskManagement"
                                    label="Risk Management"
                                    onChange = {e => setRmRegistroActual(e.target.value)}
                                        value= {rmRegistroActual}
                                  
                                  >

                                  {rmRegistrosListAPI.map((elemento) => (

                                      <MenuItem value={elemento.id}> {elemento.risk} </MenuItem>
                                  ))}

                                  </Select>
                          </FormControl>
                                    
                          
                 
                    </Grid>
                    <Grid item xs={8}>
                            
                                  <TextField
                                          label="Number"
                                          id="numero"
                                          value = {numeroActual}
                                          size="small"
                                          sx={{ m: 1, width: '37ch' }}
                                          onChange = {e => setNumeroActual(e.target.value)}
                                  />
                                  
                    </Grid>
                    <Grid item xs={8}>

                             
                                <TextField
                                        label="Proposal"
                                        id="propuesta"
                                        value = {propuestaActual}
                                        size="small"
                                        sx={{ m: 1, width: '37ch' }}
                                        onChange = {e => setPropuestaActual(e.target.value)}
                                />
                         


                    </Grid>
                    <Grid item xs={8}>

                                <TextField
                                        label="Manager"
                                        id="responsable"
                                        value = {responsableActual}
                                        size="small"
                                        sx={{ m: 1, width: '37ch' }}
                                        onChange = {e => setResponsableActual(e.target.value)}
                                />

                    </Grid>

                    <Grid item xs={8}>

                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                <DatePicker
                                        label="Planned date"
                                        id="fechaPlanificada"
                                        inputFormat="yyyy-MM-dd"
                                        format="yyyy-MM-dd"
                                        value = {fechaPlanificadaActual}
                                        onChange={(newValue) => {
                                                let fechaseleccionada = newValue.toISOString()
                                                let arrayFecha = fechaseleccionada.split("T")
                                                setFechaPlanificadaActual(arrayFecha[0]);
                                              }}
                                        renderInput={(params) => <TextField {...params} />}

                               
                                />
                                </LocalizationProvider>

                    </Grid>

                    <Grid item xs={8}>

                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                <DatePicker
                                        label="Closed date"
                                        id="fechacierre"
                                        inputFormat="yyyy-MM-dd"
                                        format="yyyy-MM-dd"
                                        value = {fechaCierreActual}
                                        onChange={(newValue) => {
                                                let fechaseleccionada = newValue.toISOString()
                                                let arrayFecha = fechaseleccionada.split("T")
                                                setFechaCierreActual(arrayFecha[0]);
                                              }}
                                        renderInput={(params) => <TextField {...params} />}

                               
                                />
                                </LocalizationProvider>

                    </Grid>

                    <Grid item xs={8}>


                              <FormControl variant="standard"  sx={{ m: 1, width: '37ch' }} size="small">
                              <InputLabel id="label-select-risk-management">Gravity</InputLabel>
                                  <Select
                                    labelId="label-select-risk-management"
                                    id="gravedad"
                                    label="Gravity"
                                    onChange = {e => { setGravedadActual(e.target.value); }}
                                    value = {gravedadActual}
                                  
                                  >

                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>

                                  </Select>
                          </FormControl>

                    </Grid>

                    <Grid item xs={8}>


                        <FormControl variant="standard"  sx={{ m: 1, width: '37ch' }} size="small">
                              <InputLabel id="label-select-risk-management">Idea</InputLabel>
                                  <Select
                                    labelId="label-select-idea"
                                    id="ocurrencia"
                                    label="Idea"
                                    onChange = {e => { setOcurrenciaActual(e.target.value); }}
                                    value = {ocurrenciaActual}
                                  
                                  >

                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>

                                  </Select>
                          </FormControl>

                   </Grid>

                   <Grid item xs={8}>

                        <FormControl variant="standard"  sx={{ m: 1, width: '37ch' }} size="small">
                              <InputLabel id="label-select-risk-management">Detection</InputLabel>
                                  <Select
                                    labelId="label-select-detection"
                                    id="deteccion"
                                    label="Detection"
                                    onChange = {e => { setDeteccionActual(e.target.value); }}
                                    value = {deteccionActual}
                                  
                                  >

                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>

                                  </Select>
                          </FormControl>

                  </Grid>

                  <Grid item xs={8}>

                          <TextField
                                  disabled
                                  label="Npr"
                                  id="npr"
                                  value = {nprActual}
                                  size="small"
                                  sx={{ m: 1, width: '37ch' }}
                                  onChange = {e => setNprActual(e.target.value)}
                          />

                  </Grid>

                  
                  <Grid item xs={8}>

                          <TextField
                                  multiline
                                  disabled
                                  rows={5}
                                  label="Priorization"
                                  id="priorizacion"
                                  value = {priorizacionActual}
                                  size="small"
                                  sx={{ m: 1, width: '37ch' }}
                                  onChange = {e => setPriorizacionActual(e.target.value)}
                          />

                  </Grid>

                  <Grid item xs={8}>

                            <TextField
                                id="observaciones"
                                label="Observations"
                                multiline
                                rows={5}
                                value = {observacionesActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange = {e => setObservacionesActual(e.target.value)}
                            />

                </Grid>

                </Grid>


               
            </DialogContent>
            <DialogActions>

                
                <Button onClick={() => cambiarVisibilidadModalInsertar (false)}>Cerrar</Button>
                <Button onClick={() => crearRmAccion()}>Guardar</Button>
           
            </DialogActions>
          </Dialog>
    )
}

