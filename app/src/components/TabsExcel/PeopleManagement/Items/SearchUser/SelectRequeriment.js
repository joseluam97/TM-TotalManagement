//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
//import * as React from 'react';

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
    obtenerUsuariosByRequerimentAPIAction
} from './store/actions'

import {
    mostrarAppAPIAction,
    mostrarGruposRequerimientosAPIAction,
    mostrarRequerimentsWithDetailsAPIAction
} from '../../../../Managment/App/store/actions'

//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'

import ModalAnadirAppPersona from '../modals/anadirAppPersona.js'
import ListRequerimentsMain from '../../../../Gestion/Componentes/ListRequerimentsMain'

//**********************END_IMPORTACIONES ***********************/

export default function SelectRequeriment() {

    const navigate = useNavigate();

    const [botonControl, setBotonControl] = useState(true)
    const [requirementSelect, setRequirementSelect] = useState('')
    const [grupoSelect, setGrupoSelect] = useState('')
    const [valorTab, setValorTab] = useState('requerimientos')
    const [vectorRequerimientosWithDetails, setVectorRequerimientosWithDetails] = useState([])

    const [tipoValorExtraRequerimiento, setTipoValorExtraRequerimiento] = useState('')
    const [valorListaRequerimiento, setValorListaRequerimiento] = useState('')
    const [vectorListaRequerimiento, setVectorListaRequerimiento] = useState([])
    const [tipoRequisito, setTipoRequisito] = useState('')

    const [modoCalculoRequerimiento, setModoCalculoRequerimiento] = useState(1);
    const [valorObjetivoRequerimiento, setValorObjetivoRequerimiento] = useState(1);
    const [diferenciaFechaRequerimiento, setDiferenciaFechaRequerimiento] = useState(0);

    //obtener el state de Redux
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
    const personLogin = useSelector(state => state.fuse.userComponente.person)

    const appListAPI = useSelector(state => state.fuse.appComponent.appListAPI)
    const listGruposAPI = useSelector(state => state.fuse.gestionAplicationComponent.listGruposAPI)
    const listRequerimentsWithDetails = useSelector(state => state.fuse.gestionAplicationComponent.listRequerimentsWithDetails)

    const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
    const mostrarGruposRequerimientosAPI = () => dispatch(mostrarGruposRequerimientosAPIAction())
    const obtenerUsuariosByRequerimentAPI = (requerimientos) => dispatch(obtenerUsuariosByRequerimentAPIAction(requerimientos))
    const mostrarRequerimentsWithDetailsAPI = () => dispatch(mostrarRequerimentsWithDetailsAPIAction())

    useEffect(() => {
        mostrarRequerimentsWithDetailsAPI()
    }, []);

    const cambiarEstado = (event, newValue) => {
        setValorTab(newValue)
    }

    //creamos una función para hacer uso de Actions
    const dispatch = useDispatch()

    useEffect(() => {

        if (valorTab == 'requerimientos') {
            if (requirementSelect != '' && requirementSelect != null && requirementSelect != undefined) {
                //COMPROBACION DE CASUISTICA ESPECIAL
                if (tipoValorExtraRequerimiento == "Number" || tipoValorExtraRequerimiento == "List") {
                    if ((tipoValorExtraRequerimiento == "Number" && valorObjetivoRequerimiento != "") || (tipoValorExtraRequerimiento == "List" && valorListaRequerimiento != "")) {
                        setBotonControl(false)
                    }
                    else {
                        setBotonControl(true)
                    }
                }
                else {
                    setBotonControl(false)
                }
            }
            else {
                setBotonControl(true)
            }
        }
        if (valorTab == 'grupoRequerimientos') {
            if (grupoSelect != '' && grupoSelect != null && grupoSelect != undefined) {
                setBotonControl(false)
            }
            else {
                setBotonControl(true)
            }
        }


    })

    useEffect(() => {

        //GESTION SI EL REQUERIMIENTO NO ESTA YA AÑADIDO
        if (requirementSelect != '' && requirementSelect != null && requirementSelect != undefined) {
            //MUESTRA LA GESTION SI ES NECESARIO
            if (requirementSelect.tiene_valor == true) {
                setTipoValorExtraRequerimiento(requirementSelect.tipo_valor)
                if (requirementSelect.tipo_valor == "List") {
                    let vectorListado = requirementSelect.listado_opciones.split(',')
                    setVectorListaRequerimiento(vectorListado)
                }
            }
            else {
                setTipoValorExtraRequerimiento('')
                setVectorListaRequerimiento([])
            }
        }

    }, [requirementSelect]);

    function busquedaUsuariosAPI() {
        obtenerUsuariosByRequerimentAPI(vectorRequerimientosWithDetails)
    }

    function anadirNuevoGrupodeRequerimientos() {

        let vectorRequerimentCopia = [...vectorRequerimientosWithDetails]

        for (let indiceGrupo in grupoSelect.aplicaciones) {
            let idRequeriment = listRequerimentsWithDetails.filter(elemento => elemento.id == grupoSelect.aplicaciones[indiceGrupo])[0]
            if (idRequeriment != undefined) {
                vectorRequerimentCopia.push({
                    id: idRequeriment.requeriment,
                    name: idRequeriment.requeriment_name,
                    code: idRequeriment.requeriment_code,
                    listado_opciones: idRequeriment.requeriment_listado_opciones,
                    tipo_valor: idRequeriment.requeriment_tipo_valor,

                    //ESPECIFICO DEL REQUISITO
                    valor_asignado: idRequeriment.valor_asignado,
                    valor_comparacion: idRequeriment.valor_comparacion,
                    diferencia_fecha: idRequeriment.diferencia_fecha,
                    operacion_logica: idRequeriment.operacion_logica
                })
            }
        }

        setVectorRequerimientosWithDetails(vectorRequerimentCopia)

        setGrupoSelect('')
    }

    function anadirNuevoRequerimiento() {

        let vectorRequerimentCopia = [...vectorRequerimientosWithDetails]

        vectorRequerimentCopia.push({
            id: requirementSelect.id,
            name: requirementSelect.name,
            code: requirementSelect.code,
            listado_opciones: requirementSelect.listado_opciones,
            tipo_valor: requirementSelect.tipo_valor,

            //ESPECIFICO DEL REQUISITO
            valor_asignado: valorListaRequerimiento,
            valor_comparacion: valorObjetivoRequerimiento,
            diferencia_fecha: diferenciaFechaRequerimiento,
            operacion_logica: modoCalculoRequerimiento
        })

        setVectorRequerimientosWithDetails(vectorRequerimentCopia)

        setRequirementSelect('')
    }

    return (
        <>

            <Box sx={{ width: '100%', marginLeft: '10px', marginRight: '10px' }}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <span className="font-semibold">
                        SELECT REQUIREMENTS
                        <Divider style={{ width: '100%' }} />
                    </span>
                </div>
                <Tabs
                    value={valorTab}
                    onChange={cambiarEstado}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    sx={{ marginBottom: '10px' }}
                >
                    <Tab value="requerimientos" label="Simple Requeriments" />
                    <Tab value="grupoRequerimientos" label="Requeriments Group" />

                </Tabs>

                <Grid container spacing={1} columns={1} style={valorTab != 'requerimientos' ? { display: "none" } : {}}>
                    <Grid item xs={1}>
                        <FormControl variant="standard" fullWidth>
                            <Autocomplete
                                id="tags-outlined"
                                groupBy={(option) => option.type}
                                options={appListAPI}
                                value={requirementSelect}
                                getOptionLabel={(option) => option != '' ? option.type + " - " + option.name : ''}
                                onChange={(event, value) => setRequirementSelect(value)}
                                filterSelectedOptions
                                renderGroup={(params) => (
                                    <Box style={{ marginLeft: "10px" }} key={params.id}>
                                        <b>
                                            {params.group}
                                        </b>
                                        {params.children}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Requirements"
                                        placeholder="Requirements"
                                        size="small"
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={1} style={tipoValorExtraRequerimiento == "Number" ? { display: '' } : { display: 'none' }}>

                        {/*SI SE ELIGE NUMERO */}

                        <TextField
                            type="number"
                            shrink
                            label="Value"
                            id="objetive"
                            placeholder="Examples: 4"
                            value={valorObjetivoRequerimiento}
                            size="small"
                            fullWidth
                            onChange={e => setValorObjetivoRequerimiento(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={1} style={tipoValorExtraRequerimiento == "Date" ? { display: '' } : { display: 'none' }}>

                        {/*SI SE ELIGE NUMERO */}

                        <TextField
                            type="number"
                            shrink
                            label="Date difference"
                            id="objetive"
                            placeholder="Examples: -5, 30"
                            value={diferenciaFechaRequerimiento}
                            size="small"
                            fullWidth
                            onChange={e => setDiferenciaFechaRequerimiento(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={1} style={tipoValorExtraRequerimiento == "Number" || tipoValorExtraRequerimiento == "List" ? { display: '' } : { display: 'none' }}>

                        <FormControl variant="outlined" size="small" fullWidth>
                            <InputLabel id="label-select-risk-management">Calculation mode</InputLabel>
                            <Select
                                labelId="label-select-detection"
                                id="calculationMode"
                                label="Calculation mode"
                                onChange={e => { setModoCalculoRequerimiento(e.target.value); }}
                                value={modoCalculoRequerimiento}

                            >
                                <MenuItem value={1}>Result lower than target the value.</MenuItem>
                                <MenuItem value={2}>Result less than or equal to the value.</MenuItem>
                                <MenuItem value={3}>Result same as value.</MenuItem>
                                <MenuItem value={4}>Result greater than or equal to the value.</MenuItem>
                                <MenuItem value={5}>Result greater than the value.</MenuItem>
                                <MenuItem value={6}>Result different from the value.</MenuItem>

                            </Select>
                        </FormControl>


                    </Grid>

                    <Button
                        disabled={botonControl}
                        size="small"
                        fullWidth
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '10px' }}
                        onClick={() => {
                            anadirNuevoRequerimiento()
                        }}
                    >
                        ADD

                    </Button>
                </Grid>

                <div style={valorTab != 'grupoRequerimientos' ? { display: "none" } : {}}>
                    <FormControl variant="standard" fullWidth>
                        <Autocomplete
                            id="tags-outlined"
                            options={listGruposAPI}
                            value={grupoSelect}
                            getOptionLabel={(option) => option != '' ? option.code + " - " + option.name : ''}
                            onChange={(event, value) => setGrupoSelect(value)}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Group"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </FormControl>

                    <Button
                        disabled={botonControl}
                        size="small"
                        fullWidth
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '10px' }}
                        onClick={() => {
                            anadirNuevoGrupodeRequerimientos()
                        }}
                    >
                        ADD GROUP REQUIREMENTS

                    </Button>
                </div>

                <div style={vectorRequerimientosWithDetails.length != 0 ? { display: "", marginTop: '25px' } : { display: "none" }}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <span className="font-semibold">
                            REQUIREMENTS TO LOOK FOR
                            <Divider style={{ width: '100%' }} />
                        </span>
                    </div>
                    <ListRequerimentsMain
                        tipoLista={"listFormateada"}
                        grupo={'requerimientosBusqueda'}
                        listRequeriments={vectorRequerimientosWithDetails}
                        setVectorEstatico={setVectorRequerimientosWithDetails}
                        disabledDeleteRequeriment={true}
                    />

                    <Button
                        size="small"
                        fullWidth
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            busquedaUsuariosAPI()
                        }}
                    >
                        SEARCH

                    </Button>
                </div>
            </Box >
        </>
    )
}

