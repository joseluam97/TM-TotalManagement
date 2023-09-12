import {

    // COMPONENTE PRINCIPAL ------------------

    CAMBIAR_VALOR_SELECCION_GRID_ACTION,
    CAMBIAR_VALOR_SELECCION_GRID_ACTION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ACTION_ERROR,

    ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS,
    ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR,

    MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS,
    MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR,

    UPDATE_ACTION_IMPROVEMENT_PROPOSALS,
    UPDATE_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    UPDATE_ACTION_IMPROVEMENT_PROPOSALS_ERROR,


    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_ACTIONS,
    CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_ERROR,

    POST_ACTION_IMPROVEMENT_PROPOSALS,
    POST_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    POST_ACTION_IMPROVEMENT_PROPOSALS_ERROR

} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlImprovementProposalsApi = process.env.REACT_APP_URL_DJANGO + "/api/accionesImprovement/"

//************************CAMBIAR VISIBILIDAD MODAL INSERTAR**********************************************

export function cambiarVisibilidadModalInsertarAPI(valorNuevo, modo) {

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
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION,
    payload: true

})

const cambiarVisibilidadModalInsertarExito = (valorNuevo, modo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_EXITO,
    payload: valorNuevo,
    modo: modo

})

const cambiarVisibilidadModalInsertarError = estado => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL ACTIONS**********************************************

export function cambiarVisibilidadModalActionsAPI(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalActions())

        try {
            dispatch(cambiarVisibilidadModalActionsExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalActionsError(true))
        }
    }
}

const cambiarVisibilidadModalActions = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_ACTIONS,
    payload: true

})

const cambiarVisibilidadModalActionsExito = (valorNuevo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalActionsError = estado => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_ERROR,
    payload: estado
})

//************************ MOSTRAR ACTION_IMPROVEMENT_PROPOSALS API GET **********************************************

export function mostrarActionsImprovementProposalsAction(idMejora) {

    return async (dispatch) => {
        dispatch(mostrarImprovementProposals(true))


        await axios({
            method: "GET",
            url: urlImprovementProposalsApi + "ByImprovement/" + idMejora,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarImprovementProposalsExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarImprovementProposalsError(true))
            })

    }
}

const mostrarImprovementProposals = (estado) => ({
    type: MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS,
    payload: true

})

const mostrarImprovementProposalsExito = risk_managements => ({
    type: MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    payload: risk_managements

})

const mostrarImprovementProposalsError = estado => ({
    type: MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR,
    payload: estado
})

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
    type: CAMBIAR_VALOR_SELECCION_GRID_ACTION,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_ACTION_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_ACTION_ERROR,
    payload: estado
})


//************************ ELIMINAR RISK MANAGEMENT **********************************************

export function eliminarImprovementProposalsAction(id, idPerson) {

    return async (dispatch) => {
        dispatch(eliminarImprovementProposals(true))


        await axios({
            method: "DELETE",
            url: urlImprovementProposalsApi + id,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(eliminarImprovementProposalsExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                //dispatch(mostrarImprovementProposalsAction())
                dispatch(mostrarImprovementProposalsByContractAPIAction(idPerson))

            })

            .catch(error => {
                console.log(error.response)
                dispatch(eliminarImprovementProposalsError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const eliminarImprovementProposals = (estado) => ({
    type: ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS,
    payload: estado

})

const eliminarImprovementProposalsExito = estado => ({
    type: ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    payload: estado,
    accionAlterada: ''

})

const eliminarImprovementProposalsError = estado => ({
    type: ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR,
    payload: estado
})

//************************ UPDATE ACTION_IMPROVEMENT_PROPOSALS **********************************************

export function postActionImprovementProposalsAPIAction(datos, idMejora) {

    return async (dispatch) => {
        dispatch(postActionImprovementProposalsAPI())

        axios({
            method: "POST",
            url: urlImprovementProposalsApi,
            data: datos,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(postActionImprovementProposalsAPIExito(response.data))

                dispatch(
                    showMessage({
                        message: "Post action improvement proposals",
                        variant: "success"
                    })
                )

                dispatch(mostrarActionsImprovementProposalsAction(idMejora))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(postActionImprovementProposalsAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when posting improvement proposals",
                        variant: "error"
                    })
                )
            })

    }
}

const postActionImprovementProposalsAPI = (rm_accion) => ({
    type: POST_ACTION_IMPROVEMENT_PROPOSALS,
    payload: rm_accion

})

const postActionImprovementProposalsAPIExito = estado => ({
    type: POST_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    payload: estado,
    accionAlterada: estado

})

const postActionImprovementProposalsAPIError = estado => ({
    type: POST_ACTION_IMPROVEMENT_PROPOSALS_ERROR,
    payload: estado
})

//************************ UPDATE ACTION_IMPROVEMENT_PROPOSALS **********************************************

export function updateActionImprovementProposalsAction(id, json, idMejora) {

    return async (dispatch) => {
        dispatch(updateActionImprovementProposals())

        axios({
            method: "PUT",
            url: urlImprovementProposalsApi + id,
            data: json,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(updateActionImprovementProposalsExito(response.data))

                dispatch(
                    showMessage({
                        message: "Updated improvement proposals",
                        variant: "success"
                    })
                )

                dispatch(mostrarActionsImprovementProposalsAction(idMejora))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(updateActionImprovementProposalsError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating improvement proposals",
                        variant: "error"
                    })
                )
            })

    }
}

const updateActionImprovementProposals = (rm_accion) => ({
    type: UPDATE_ACTION_IMPROVEMENT_PROPOSALS,
    payload: rm_accion

})

const updateActionImprovementProposalsExito = estado => ({
    type: UPDATE_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    payload: estado,
    accionAlterada: estado

})

const updateActionImprovementProposalsError = estado => ({
    type: UPDATE_ACTION_IMPROVEMENT_PROPOSALS_ERROR,
    payload: estado
})
