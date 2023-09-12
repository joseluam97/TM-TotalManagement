import {

    // COMPONENTE PRINCIPAL ------------------

    CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES,
    CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_ERROR,

    MOSTRAR_DELIVERABLES,
    MOSTRAR_DELIVERABLES_EXITO,
    MOSTRAR_DELIVERABLES_ERROR,

    UPDATE_DELIVERABLES,
    UPDATE_DELIVERABLES_EXITO,
    UPDATE_DELIVERABLES_ERROR,


    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_ERROR,

    INSERTAR_DELIVERABLES,
    INSERTAR_DELIVERABLES_EXITO,
    INSERTAR_DELIVERABLES_ERROR,

    ELIMINAR_DELIVERABLE,
    ELIMINAR_DELIVERABLE_EXITO,
    ELIMINAR_DELIVERABLE_ERROR,


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlDeliverablesApi = process.env.REACT_APP_URL_DJANGO + "/api/deliverable/"
const urlDeliverablesByContractApi = process.env.REACT_APP_URL_DJANGO + "/api/deliverable/contrato/"

export function deleteDeliverableAction(idDeliverable, idPerson){
    return async (dispatch) => {
        dispatch ( eliminarDeliverable())

                await axios({
                    method: "DELETE",
                    url: urlDeliverablesApi + idDeliverable,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                         .then(response=>{
                            dispatch (eliminarDeliverableExito(false))
    
                            dispatch(
                                showMessage({
                                    message: "Correctly removed",
                                    variant: "success"
                                })
                            )

                            dispatch(mostrarDeliverablesByContractAPIAction(idPerson))
                            dispatch(cambiarValorSeleccionAction(''))
                            
                        })
                        
                     .catch(error => {
                        console.log(error.response)
                        dispatch (eliminarDeliverableError(false))
                        dispatch(
                            showMessage({
                                message: "Error when deleting",
                                variant: "error"
                            })
                        )
                    })

       
      }
}

const eliminarDeliverable = (id) => ({
    type: ELIMINAR_DELIVERABLE,
    payload: id

})

const eliminarDeliverableExito = estado => ({
    type: ELIMINAR_DELIVERABLE_EXITO,
    payload: estado

})

const eliminarDeliverableError = estado => ({
    type:  ELIMINAR_DELIVERABLE_ERROR,
    payload: estado
})

//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function mostrarDeliverablesByContractAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(mostrarDeliverables(true))


        await axios({
            method: "GET",
            url: urlDeliverablesByContractApi + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarDeliverablesExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarDeliverablesError(true))
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
    type: CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_ERROR,
    payload: estado
})


//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function mostrarDeliverablesAction() {

    return async (dispatch) => {
        dispatch(mostrarDeliverables(true))


        await axios({
            method: "GET",
            url: urlDeliverablesApi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarDeliverablesExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarDeliverablesError(true))
            })

    }
}

const mostrarDeliverables = (estado) => ({
    type: MOSTRAR_DELIVERABLES,
    payload: true

})

const mostrarDeliverablesExito = risk_managements => ({
    type: MOSTRAR_DELIVERABLES_EXITO,
    payload: risk_managements

})

const mostrarDeliverablesError = estado => ({
    type: MOSTRAR_DELIVERABLES_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL INSERTAR**********************************************

export function cambiarVisibilidadModalInsertarAction(valorNuevo, modo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalInsertar())

        try {
            dispatch(cambiarVisibilidadModalInsertarExito(valorNuevo, modo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalInsertarError(true))
        }
    }
}

const cambiarVisibilidadModalInsertar = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE,
    payload: true

})

const cambiarVisibilidadModalInsertarExito = (valorNuevo, modo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_EXITO,
    payload: valorNuevo,
    modo: modo

})

const cambiarVisibilidadModalInsertarError = estado => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_ERROR,
    payload: estado
})


//************************ UPDATE IMPROVEMENT_PROPOSALS **********************************************

export function updateDeliverablesAction(id, json, idPerson) {

    return async (dispatch) => {
        dispatch(updateDeliverables())

        axios({
            method: "PUT",
            url: urlDeliverablesApi + id,
            data: json,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(updateDeliverablesExito(response.data))

                if (response.data['active'] == false) {
                    dispatch(
                        showMessage({
                            message: "Delete Deliverable",
                            variant: "success"
                        })
                    )
                }
                else {
                    dispatch(
                        showMessage({
                            message: "Updated Deliverable",
                            variant: "success"
                        })
                    )
                }

                dispatch(mostrarDeliverablesByContractAPIAction(idPerson))


            })
            .catch(error => {
                console.log(error.response)
                dispatch(updateDeliverablesError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating Deliverable",
                        variant: "error"
                    })
                )
            })

    }
}

const updateDeliverables = (rm_accion) => ({
    type: UPDATE_DELIVERABLES,
    payload: rm_accion

})

const updateDeliverablesExito = estado => ({
    type: UPDATE_DELIVERABLES_EXITO,
    payload: estado

})

const updateDeliverablesError = estado => ({
    type: UPDATE_DELIVERABLES_ERROR,
    payload: estado
})

//************************ INSERTA IMPROVEMENT_PROPOSALS MODAL INSERTAR**********************************************

export function insertarDeliverablesModalInsertarAction(deliverable, idPerson) {

    return async (dispatch) => {
        dispatch(insertarDeliverablesModalInsertar(true))


        await axios({
            method: "POST",
            url: urlDeliverablesApi,
            data: deliverable,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(insertarDeliverablesModalInsertarExito(response.data))

                dispatch(
                    showMessage({
                        message: "Deliverable successfully created",
                        variant: "success"
                    })

                )

                dispatch(mostrarDeliverablesByContractAPIAction(idPerson))


            })
            .catch(error => {
                console.log(error.response)
                dispatch(insertarDeliverablesModalInsertarError(false))
                dispatch(
                    showMessage({
                        message: "Error creating Deliverable",
                        variant: "error"
                    })
                )
            })
    }
}

const insertarDeliverablesModalInsertar = (estado) => ({
    type: INSERTAR_DELIVERABLES,
    payload: estado

})

const insertarDeliverablesModalInsertarExito = idCreado => ({
    type: INSERTAR_DELIVERABLES_EXITO,
    payload: idCreado

})

const insertarDeliverablesModalInsertarError = estado => ({
    type: INSERTAR_DELIVERABLES_ERROR,
    payload: estado
})



