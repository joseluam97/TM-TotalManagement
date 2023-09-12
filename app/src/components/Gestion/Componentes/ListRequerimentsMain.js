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
import InfoOutlined from '@mui/icons-material/InfoOutlined';

//Grid importaciones
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux'

import {
    deleteContractAppAPIAction
} from '../SubMision/store/actions'

import {
    deleteMisionAppAPIAction
} from '../Mision/store/actions'

import {
    deleteWorkPackageAppAPIAction
} from '../PaqueteTrabajo/store/actions'

import {
    deleteDepartamentoAppAPIAction,
    deleteDireccionDepartamentalAppAPIAction
} from '../Departamentos/store/actions'

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
        marginLeft: '3px',
        marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

export default function ListRequerimentsMain(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [listaElementos, setListaElementos] = useState([])
    const [bloqueIdDelete, setBloqueIdDelete] = useState('')
    const [idRequerimentDelete, setIdRequerimentDelete] = useState('')
    const [visibilidadDialogoConfirmacionEliminacion, setVisibilidadDialogoConfirmacionEliminacion] = useState(false)

    const deleteContractAppAPI = (id, idSubMision) => dispatch(deleteContractAppAPIAction(id, idSubMision))
    const deleteMisionAppAPI = (id, idSubMision) => dispatch(deleteMisionAppAPIAction(id, idSubMision))
    const deleteWPAppAPI = (id, idSubWP) => dispatch(deleteWorkPackageAppAPIAction(id, idSubWP))
    const deleteDepartamentoAppAPI = (id, idSubWP) => dispatch(deleteDepartamentoAppAPIAction(id, idSubWP))
    const deleteDireccionDepartamentalAppAPI = (id, idSubWP) => dispatch(deleteDireccionDepartamentalAppAPIAction(id, idSubWP))

    useEffect(() => {
        formatValuesListRequeriments()
    }, [])

    useEffect(() => {
        formatValuesListRequeriments()
    }, [props.listRequeriments])

    function funcionDeleteItem(nomModulo, index) {
        if (props.grupo == "subMision") {
            setVisibilidadDialogoConfirmacionEliminacion(true)
            setIdRequerimentDelete(nomModulo['id'])
            setBloqueIdDelete(nomModulo['subMision_id'])
        }

        if (props.grupo == "mision") {
            setVisibilidadDialogoConfirmacionEliminacion(true)
            setIdRequerimentDelete(nomModulo['id'])
            setBloqueIdDelete(nomModulo['mision_id'])
        }

        if (props.grupo == "wp") {
            setVisibilidadDialogoConfirmacionEliminacion(true)
            setIdRequerimentDelete(nomModulo['id'])
            setBloqueIdDelete(nomModulo['workPackage_id'])
        }

        if (props.grupo == "department") {
            setVisibilidadDialogoConfirmacionEliminacion(true)
            setIdRequerimentDelete(nomModulo['id'])
            setBloqueIdDelete(nomModulo['departamento_id'])
        }

        if (props.grupo == "departmentalDirectorate") {
            setVisibilidadDialogoConfirmacionEliminacion(true)
            setIdRequerimentDelete(nomModulo['id'])
            setBloqueIdDelete(nomModulo['direccionDepartamental_id'])
        }
        if(props.grupo == "requerimientosBusqueda"){
            setVisibilidadDialogoConfirmacionEliminacion(true)
            setIdRequerimentDelete(index)
        }
    }

    function eliminarRequerimiento() {
        if (props.grupo == "subMision") {
            deleteContractAppAPI(idRequerimentDelete, bloqueIdDelete)
        }
        if (props.grupo == "mision") {
            deleteMisionAppAPI(idRequerimentDelete, bloqueIdDelete)
        }
        if (props.grupo == "wp") {
            deleteWPAppAPI(idRequerimentDelete, bloqueIdDelete)
        }
        if (props.grupo == "department") {
            deleteDepartamentoAppAPI(idRequerimentDelete, bloqueIdDelete)
        }
        if (props.grupo == "departmentalDirectorate") {
            deleteDireccionDepartamentalAppAPI(idRequerimentDelete, bloqueIdDelete)
        }
        if (props.grupo == "requerimientosBusqueda") {
            let copiaItems = [...props.listRequeriments]
            copiaItems.splice(idRequerimentDelete, 1)

            props.setVectorEstatico(copiaItems)
        }

    }

    function renameProperty(item, oldName, newName) {
        //comprobar que this no es undefined
        if (item != undefined) {
            // no hacer nada si los nombre son iguales
            if (oldName == newName) {
                return item;
            }
            // Verificar si ya existe la propiedad con el nombre nuevo y evitar errores.
            if (item.hasOwnProperty(oldName)) {
                item[newName] = item[oldName];
                delete item[oldName];
            }
        }

        return item;
    };

    //CAMBIO DE NOMBRE DE PROPIEDADES CON EL FIN DE QUE TODOS LOS ELEMENTOS USEN ESTE MISMO COMPONENTE
    function formatValuesListRequeriments() {
        if (props.tipoLista == "listRequerimentsWithDetails") {
            props.listRequeriments.map(item => {
                renameProperty(item, 'requeriment_code', 'code');
                renameProperty(item, 'requeriment_name', 'name');
                renameProperty(item, 'requeriment_tipo_valor', 'tipo_valor');
                renameProperty(item, 'requeriment_type', 'detalle_requerimiento');
            });

            setListaElementos(props.listRequeriments)
        }

        if (props.tipoLista == "listRequerimentsContractApp") {
            props.listRequeriments.map(item => {
                renameProperty(item, 'aplication_app_id_code', 'code');
                renameProperty(item, 'aplication_app_id_name', 'name');
                renameProperty(item, 'aplication_app_id_tipo_valor', 'tipo_valor');
                renameProperty(item, 'job_name', 'detalle_requerimiento');
            });

            setListaElementos(props.listRequeriments)
        }

        if (props.tipoLista == "listRequerimentsMision") {
            props.listRequeriments.map(item => {
                renameProperty(item, 'aplication_app_id_code', 'code');
                renameProperty(item, 'aplication_app_id_name', 'name');
                renameProperty(item, 'aplication_app_id_tipo_valor', 'tipo_valor');
                renameProperty(item, 'type', 'detalle_requerimiento');
            });

            setListaElementos(props.listRequeriments)
        }

        if (props.tipoLista == "listRequerimentsSimple") {
            props.listRequeriments.map(item => {
                renameProperty(item, 'aplication_app_id_code', 'code');
                renameProperty(item, 'aplication_app_id_name', 'name');
                renameProperty(item, 'aplication_app_id_tipo_valor', 'tipo_valor');
            });

            setListaElementos(props.listRequeriments)
        }

        if(props.tipoLista == "listFormateada"){
            setListaElementos(props.listRequeriments)
        }
    }

    function cadenaDetalles(itemRequerimiento) {
        if (itemRequerimiento['tipo_valor'] == "List") {
            switch (itemRequerimiento['operacion_logica']) {
                case 1:
                    return 'List: Result lower than the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 2:
                    return 'List: Result less than or equal to the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 3:
                    return 'List: Result same as value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 4:
                    return 'List: Result greater than or equal to the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 5:
                    return 'List: Result greater than the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 6:
                    return 'List: Result different from the value: ' + itemRequerimiento['valor_asignado']
                    break;
            }
        }
        if (itemRequerimiento['tipo_valor'] == "Number") {
            switch (itemRequerimiento['operacion_logica']) {
                case 1:
                    return 'Number: Result lower than the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 2:
                    return 'Number: Result less than or equal to the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 3:
                    return 'Number: Result same as value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 4:
                    return 'Number: Result greater than or equal to the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 5:
                    return 'Number: Result greater than the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 6:
                    return 'Number: Result different from the value: ' + itemRequerimiento['valor_comparacion']
                    break;
            }
        }
        if (itemRequerimiento['tipo_valor'] == "Date") {
            return 'Date requirement(' + itemRequerimiento['diferencia_fecha'] + ")"
        }
        if (itemRequerimiento['tipo_valor'] == null || itemRequerimiento['tipo_valor'] == "") {
            return 'Simple requirement'
        }
    }

    return (
        <>
            {listaElementos
                .sort((a, b) => {
                    if (a['code'] < b['code']) {
                        return -1;
                    }
                })
                .map((nomModulo, index) => {
                    return (
                        <ListItem
                            className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                            sx={{ bgcolor: 'background.paper' }}
                            button
                        >
                            <ListItemText classes={{ root: 'm-0', primary: 'truncate' }}
                                primary={nomModulo['code'] + " - " + nomModulo['name']}

                                secondary={
                                    <div>
                                        <div style={{ display: 'inline' }}>
                                            {nomModulo['detalle_requerimiento'] != undefined ? nomModulo['detalle_requerimiento'] + ' — ' : ''}
                                        </div>
                                        <div style={{ display: 'inline' }}>
                                            {cadenaDetalles(nomModulo)}
                                        </div>
                                    </div>
                                }
                            />
                            <ListItemIcon className="min-w-40 -ml-10 mr-8"
                                style={props.disabledDeleteRequeriment == true ? { display: "block" } : { display: "none" }}>
                                <IconButton onClick={(ev) => {
                                    funcionDeleteItem(nomModulo, index)
                                }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    );
                })}

            <Dialog open={visibilidadDialogoConfirmacionEliminacion} fullWidth maxWidth='xs'>

                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to remove the requeriments?
                </DialogContent>
                <DialogActions>

                    <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacionEliminacion(false)}>Decline</Button>
                    <Button variant="outlined" onClick={() => { eliminarRequerimiento(), setVisibilidadDialogoConfirmacionEliminacion(false) }}> Confirm</Button>

                </DialogActions>

            </Dialog>

        </>
    )
}