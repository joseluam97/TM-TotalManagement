//**********************IMPORTACIONES****************************

import * as React from 'react';
import { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { showMessage } from 'app/store/fuse/messageSlice'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@material-ui/core/Typography';
import { matchRoutes, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//Grid importaciones
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
        marginLeft: '3px',
        marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

export default function SimilitudRequerimientos(props) {

    const [vectorCoincidencias, setVectorCoincidencias] = useState([])
    const [vectorCoincidenciasConDetalles, setVectorCoincidenciasConDetalles] = useState([])
    const [valorTab, setValorTab] = useState('bloque1')

    const listGruposAPI = useSelector(state => state.fuse.gestionAplicationComponent.listGruposAPI)
    //LISTA DE REQUERIMIENTOS AÑADIDOS EN LA SUBMISION
    const listContractApp = useSelector(state => state.fuse.subMisionComponent.listContractApp)
    //LISTA DE REQUERIMIENTOS AÑADIDOS EN LA MISION
    const listRequerimentsByMision = useSelector(state => state.fuse.misionComponent.listRequerimentsByMision)
    //LISTA DE REQUERIMIENTOS AÑADIDOS EN EL WP
    const listRequerimentsByWP = useSelector(state => state.fuse.misionPaqueteComponente.listRequerimentsByWP)
    //LISTA DE REQUERIMIENTOS AÑADIDOS EN EL DEPARTAMENTO
    const listRequerimentsByDepartment = useSelector(state => state.fuse.departamentoViewComponente.listRequerimentsByDepartment)
    //LISTA DE REQUERIMIENTOS AÑADIDOS EN LA DIRECCION DEPARTAMENTAL
    const listRequerimentsByDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.listRequerimentsByDireccionDepartamental)

    const cambiarEstado = (event, newValue) => {
        setValorTab(newValue)
    }

    function functionListado(listItems) {
        let vectorResultado = []
        let vectorResultadoDetalles = []
        let coincidencias = 0
        let coincidenciasDetalles = 0
        for (let itemGrupo in listGruposAPI) {
            const result = listGruposAPI[itemGrupo]['aplicaciones_all'].map((item1) => {
                const item2 = listItems.find((item2) => item2.aplication_app_id === item1.requeriment);
                if (item2 != undefined) {
                    coincidencias = coincidencias + 1

                    if (item1.requeriment_tipo_valor != null) {
                        const itemDetalles = listItems.find((item2) =>
                            item2.aplication_app_id === item1.requeriment &&
                            item2.operacion_logica == item1.operacion_logica &&
                            item2.valor_asignado == item1.valor_asignado &&
                            item2.valor_comparacion == item1.valor_comparacion
                        );
                        if (itemDetalles != undefined) {
                            coincidenciasDetalles = coincidenciasDetalles + 1
                        }
                    }
                    else {
                        //NO HAY DETALLES POR TANTO ES IGUAL TENERLO O TENERLO EN CUENTA
                        coincidenciasDetalles = coincidenciasDetalles + 1
                    }
                }

            });

            vectorResultado.push({ "grupo": listGruposAPI[itemGrupo].name, "coincidencias": coincidencias, "totalItems": listGruposAPI[itemGrupo]['aplicaciones_all'].length })
            vectorResultadoDetalles.push({ "grupo": listGruposAPI[itemGrupo].name, "coincidencias": coincidenciasDetalles, "totalItems": listGruposAPI[itemGrupo]['aplicaciones_all'].length })

            coincidencias = 0
            coincidenciasDetalles = 0
        }

        setVectorCoincidencias(vectorResultado)
        setVectorCoincidenciasConDetalles(vectorResultadoDetalles)
    }

    useEffect(() => {

        if (props.grupo == 'subMision') {
            functionListado(listContractApp)
        }

        if (props.grupo == 'mision') {
            functionListado(listRequerimentsByMision)
        }

        if (props.grupo == 'wp') {
            functionListado(listRequerimentsByWP)
        }

        if (props.grupo == 'departamento') {
            functionListado(listRequerimentsByDepartment)
        }

        if (props.grupo == 'direccionDepartamental') {
            functionListado(listRequerimentsByDireccionDepartamental)
        }

    }, [])

    return (
        <>


            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={valorTab}
                    onChange={cambiarEstado}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="bloque1" label="Requirements without regard to detail" />
                    <Tab value="bloque2" label="Requirements with the same details" />

                </Tabs>

                <div style={valorTab == "bloque1" ? { display: "block" } : { display: "none" }}>
                    {vectorCoincidencias.map((nomModulo) => {
                        return (
                            <ListItem
                                className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                                sx={{ bgcolor: 'background.paper' }}
                                button
                            >
                                <ListItemText classes={{ root: 'm-0', primary: 'truncate' }}
                                    primary={nomModulo['grupo'] + " : " + nomModulo['coincidencias'] + "/" + nomModulo['totalItems']}
                                />
                            </ListItem>
                        );
                    })}
                </div>

                <div style={valorTab == "bloque2" ? { display: "block" } : { display: "none" }}>
                    {vectorCoincidenciasConDetalles.map((nomModulo) => {
                        return (
                            <ListItem
                                className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                                sx={{ bgcolor: 'background.paper' }}
                                button
                            >
                                <ListItemText classes={{ root: 'm-0', primary: 'truncate' }}
                                    primary={nomModulo['grupo'] + " : " + nomModulo['coincidencias'] + "/" + nomModulo['totalItems']}
                                />
                            </ListItem>
                        );
                    })}
                </div>

            </Box>





        </>
    )
}