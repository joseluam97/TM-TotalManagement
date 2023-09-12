import {

    // COMPONENTE PRINCIPAL ------------------

    CAMBIAR_VALOR_SELECCION_GRID,
    CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ERROR,

    ELIMINAR_RISK_MANAGEMENT,
    ELIMINAR_RISK_MANAGEMENT_EXITO,
    ELIMINAR_RISK_MANAGEMENT_ERROR,

    MOSTRAR_RISK_MANAGEMENT,
    MOSTRAR_RISK_MANAGEMENT_EXITO,
    MOSTRAR_RISK_MANAGEMENT_ERROR,

    CAMBIAR_STATE_INSERTADORISKMANAGEMENT,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_EXITO,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_ERROR,

    UPDATE_RISK_MANAGEMENT,
    UPDATE_RISK_MANAGEMENT_EXITO,
    UPDATE_RISK_MANAGEMENT_ERROR,


    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR,
    INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO,
    INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR,

    CAMBIAR_ESTADO_RISK_MANAGEMENT,
    CAMBIAR_ESTADO_RISK_MANAGEMENT_EXITO,
    CAMBIAR_ESTADO_RISK_MANAGEMENT_ERROR,

} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlRiskManagementApi = process.env.REACT_APP_URL_DJANGO + "/api/risk_management/"
const urlRiskManagementByContractApi = process.env.REACT_APP_URL_DJANGO + "/api/risk_management/persona/"

//************************ MOSTRAR RISK_MANAGEMENT API GET **********************************************

export function mostrarRiskManagementByContractAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(mostrarRiskManagementAPI(true))


        await axios({
            method: "GET",
            url: urlRiskManagementByContractApi + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarRiskManagementAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarRiskManagementAPIError(true))
            })

    }
}

//MISMAS FUNCIONES QUE GET NORMAL


//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorSeleccionAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarValorSeleccion())

        try {
            dispatch(cambiarValorSeleccionExito(valorNuevo))


        } catch (error) {

            dispatch(cambiarValorSeleccionError(true))
        }

    }

}

const cambiarValorSeleccion = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_ERROR,
    payload: estado
})


//************************ ELIMINAR RISK MANAGEMENT **********************************************

export function eliminarRiskManagementAction(id, idPerson) {

    return async (dispatch) => {
        dispatch(eliminarRiskManagement(true))


        await axios({
            method: "DELETE",
            url: urlRiskManagementApi + id,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(eliminarRiskManagementExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                //dispatch(mostrarRiskManagementAPIAction())
                dispatch(mostrarRiskManagementByContractAPIAction(idPerson))

            })

            .catch(error => {
                console.log(error.response)
                dispatch(eliminarRiskManagementError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const eliminarRiskManagement = (estado) => ({
    type: ELIMINAR_RISK_MANAGEMENT,
    payload: estado

})

const eliminarRiskManagementExito = estado => ({
    type: ELIMINAR_RISK_MANAGEMENT_EXITO,
    payload: estado

})

const eliminarRiskManagementError = estado => ({
    type: ELIMINAR_RISK_MANAGEMENT_ERROR,
    payload: estado
})


//************************ MOSTRAR RISK_MANAGEMENT API GET **********************************************

export function mostrarRiskManagementAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarRiskManagementAPI(true))


        await axios({
            method: "GET",
            url: urlRiskManagementApi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarRiskManagementAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarRiskManagementAPIError(true))
            })

    }
}

const mostrarRiskManagementAPI = (estado) => ({
    type: MOSTRAR_RISK_MANAGEMENT,
    payload: true

})

const mostrarRiskManagementAPIExito = risk_managements => ({
    type: MOSTRAR_RISK_MANAGEMENT_EXITO,
    payload: risk_managements

})

const mostrarRiskManagementAPIError = estado => ({
    type: MOSTRAR_RISK_MANAGEMENT_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL INSERTAR**********************************************

export function cambiarVisibilidadModalInsertarAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalInsertar())

        try {
            dispatch(cambiarVisibilidadModalInsertarExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalInsertarError(true))
        }
    }
}

const cambiarVisibilidadModalInsertar = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    payload: true

})

const cambiarVisibilidadModalInsertarExito = valorNuevo => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalInsertarError = estado => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,
    payload: estado
})

//************************CAMBIAR STATE INSERTADORISKMANAGEMENT**********************************************

export function cambiarStateInsertadoRiskManagementAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarStateInsertadoRiskManagement())

        try {
            dispatch(cambiarStateInsertadoRiskManagementExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarStateInsertadoRiskManagementError(true))
        }
    }
}

const cambiarStateInsertadoRiskManagement = () => ({
    type: CAMBIAR_STATE_INSERTADORISKMANAGEMENT,
    payload: true

})

const cambiarStateInsertadoRiskManagementExito = valorNuevo => ({
    type: CAMBIAR_STATE_INSERTADORISKMANAGEMENT_EXITO,
    payload: valorNuevo

})

const cambiarStateInsertadoRiskManagementError = estado => ({
    type: CAMBIAR_STATE_INSERTADORISKMANAGEMENT_ERROR,
    payload: estado
})

//************************ UPDATE RISK_MANAGEMENT **********************************************

export function updateRiskManagementAction(id, json, idPerson, veAllRisk) {

    return async (dispatch) => {
        dispatch(updateRiskManagement())

        axios({
            method: "PUT",
            url: urlRiskManagementApi + id,
            data: json,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(updateRiskManagementExito(response.data))

                if (response.data['active'] == false) {
                    dispatch(
                        showMessage({
                            message: "Delete R&O plan",
                            variant: "success"
                        })
                    )
                }
                else {
                    dispatch(
                        showMessage({
                            message: "Updated R&O plan",
                            variant: "success"
                        })
                    )
                }

                if(veAllRisk == true){
                    dispatch(mostrarRiskManagementAPIAction())
                }
                else{
                    dispatch(mostrarRiskManagementByContractAPIAction(idPerson))
                }
                

            })
            .catch(error => {
                console.log(error.response)
                dispatch(updateRiskManagementError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating R&O plan",
                        variant: "error"
                    })
                )
            })

    }
}

const updateRiskManagement = (rm_accion) => ({
    type: UPDATE_RISK_MANAGEMENT,
    payload: rm_accion

})

const updateRiskManagementExito = estado => ({
    type: UPDATE_RISK_MANAGEMENT_EXITO,
    payload: estado

})

const updateRiskManagementError = estado => ({
    type: UPDATE_RISK_MANAGEMENT_ERROR,
    payload: estado
})

//************************ INSERTA RISK_MANAGEMENT MODAL INSERTAR**********************************************

export function insertarRiskManagementModalInsertarAction(risk_management, idPerson, veAllRisk) {

    return async (dispatch) => {
        dispatch(insertarRiskManagementModalInsertar(true))


        await axios({
            method: "POST",
            url: urlRiskManagementApi,
            data: risk_management,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(insertarRiskManagementModalInsertarExito(response.data))

                dispatch(
                    showMessage({
                        message: "Risk Management successfully created",
                        variant: "success"
                    })

                )
                
                if(veAllRisk == true){
                    dispatch(mostrarRiskManagementAPIAction())
                }
                else{
                    dispatch(mostrarRiskManagementByContractAPIAction(idPerson))
                }



            })
            .catch(error => {
                console.log(error.response)
                dispatch(insertarRiskManagementModalInsertarError(false))
                dispatch(
                    showMessage({
                        message: "Error creating Risk Management",
                        variant: "error"
                    })
                )
            })
    }
}

const insertarRiskManagementModalInsertar = (estado) => ({
    type: INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR,
    payload: estado

})

const insertarRiskManagementModalInsertarExito = idCreado => ({
    type: INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO,
    payload: idCreado

})

const insertarRiskManagementModalInsertarError = estado => ({
    type: INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR,
    payload: estado
})



//************************ CAMBIAR ESTADO RISK_MANAGEMENT  **********************************************

export function cambiarEstadoRiskManagementAction(nombreEstado, valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarEstadoRiskManagement())

        try {
            dispatch(cambiarEstadoRiskManagementExito(nombreEstado, valorNuevo))

        } catch (error) {

            dispatch(cambiarEstadoRiskManagementError(true))
        }
    }
}

const cambiarEstadoRiskManagement = () => ({
    type: CAMBIAR_ESTADO_RISK_MANAGEMENT,
    payload: true

})

const cambiarEstadoRiskManagementExito = (nombreEstado, valorNuevo) => ({
    type: CAMBIAR_ESTADO_RISK_MANAGEMENT_EXITO,
    nombre: nombreEstado,
    payload: valorNuevo


})

const cambiarEstadoRiskManagementError = estado => ({
    type: CAMBIAR_ESTADO_RISK_MANAGEMENT_ERROR,
    payload: estado
})


