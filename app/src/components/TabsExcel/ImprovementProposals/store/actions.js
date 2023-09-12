import {

    // COMPONENTE PRINCIPAL ------------------

    CAMBIAR_VALOR_SELECCION_GRID,
    CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ERROR,

    ELIMINAR_IMPROVEMENT_PROPOSALS,
    ELIMINAR_IMPROVEMENT_PROPOSALS_EXITO,
    ELIMINAR_IMPROVEMENT_PROPOSALS_ERROR,

    MOSTRAR_IMPROVEMENT_PROPOSALS,
    MOSTRAR_IMPROVEMENT_PROPOSALS_EXITO,
    MOSTRAR_IMPROVEMENT_PROPOSALS_ERROR,

    CAMBIAR_STATE_INSERTADORISKMANAGEMENT,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_EXITO,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_ERROR,

    UPDATE_IMPROVEMENT_PROPOSALS,
    UPDATE_IMPROVEMENT_PROPOSALS_EXITO,
    UPDATE_IMPROVEMENT_PROPOSALS_ERROR,


    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR,
    INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_EXITO,
    INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_ERROR,

    CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS,
    CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_EXITO,
    CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_ERROR,

    CARGA_TABLA


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlImprovementProposalsApi = process.env.REACT_APP_URL_DJANGO + "/api/improvement/"
const urlImprovementProposalsByContractApi = process.env.REACT_APP_URL_DJANGO + "/api/improvement/persona/"

//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function mostrarImprovementProposalsByContractAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(mostrarImprovementProposals(true))


        await axios({
            method: "GET",
            url: urlImprovementProposalsByContractApi + idPersona,
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
    type: ELIMINAR_IMPROVEMENT_PROPOSALS,
    payload: estado

})

const eliminarImprovementProposalsExito = estado => ({
    type: ELIMINAR_IMPROVEMENT_PROPOSALS_EXITO,
    payload: estado

})

const eliminarImprovementProposalsError = estado => ({
    type: ELIMINAR_IMPROVEMENT_PROPOSALS_ERROR,
    payload: estado
})


//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function mostrarImprovementProposalsAction() {

    return async (dispatch) => {
        dispatch(mostrarImprovementProposals(true))


        await axios({
            method: "GET",
            url: urlImprovementProposalsApi,
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
    type: MOSTRAR_IMPROVEMENT_PROPOSALS,
    payload: true

})

const mostrarImprovementProposalsExito = risk_managements => ({
    type: MOSTRAR_IMPROVEMENT_PROPOSALS_EXITO,
    payload: risk_managements

})

const mostrarImprovementProposalsError = estado => ({
    type: MOSTRAR_IMPROVEMENT_PROPOSALS_ERROR,
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
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    payload: true

})

const cambiarVisibilidadModalInsertarExito = (valorNuevo, modo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    payload: valorNuevo,
    modo: modo

})

const cambiarVisibilidadModalInsertarError = estado => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,
    payload: estado
})

//************************CAMBIAR STATE INSERTADORISKMANAGEMENT**********************************************

export function cambiarStateInsertadoImprovementProposalsAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarStateInsertadoImprovementProposals())

        try {
            dispatch(cambiarStateInsertadoImprovementProposalsExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarStateInsertadoImprovementProposalsError(true))
        }
    }
}

const cambiarStateInsertadoImprovementProposals = () => ({
    type: CAMBIAR_STATE_INSERTADORISKMANAGEMENT,
    payload: true

})

const cambiarStateInsertadoImprovementProposalsExito = valorNuevo => ({
    type: CAMBIAR_STATE_INSERTADORISKMANAGEMENT_EXITO,
    payload: valorNuevo

})

const cambiarStateInsertadoImprovementProposalsError = estado => ({
    type: CAMBIAR_STATE_INSERTADORISKMANAGEMENT_ERROR,
    payload: estado
})

//************************ UPDATE IMPROVEMENT_PROPOSALS **********************************************

export function updateImprovementProposalsAction(id, json, idPerson) {

    return async (dispatch) => {
        dispatch(updateImprovementProposals())

        axios({
            method: "PUT",
            url: urlImprovementProposalsApi + id,
            data: json,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(updateImprovementProposalsExito(response.data))

                if (response.data['active'] == false) {
                    dispatch(
                        showMessage({
                            message: "Delete improvement proposals",
                            variant: "success"
                        })
                    )
                }
                else {
                    dispatch(
                        showMessage({
                            message: "Updated improvement proposals",
                            variant: "success"
                        })
                    )
                }

                //dispatch(mostrarImprovementProposalsAction())
                dispatch(mostrarImprovementProposalsByContractAPIAction(idPerson))
                //dispatch(cambiarVisibilidadModalInsertarAction(false, ''))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(updateImprovementProposalsError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating improvement proposals",
                        variant: "error"
                    })
                )
            })

    }
}

const updateImprovementProposals = (rm_accion) => ({
    type: UPDATE_IMPROVEMENT_PROPOSALS,
    payload: rm_accion

})

const updateImprovementProposalsExito = estado => ({
    type: UPDATE_IMPROVEMENT_PROPOSALS_EXITO,
    payload: estado

})

const updateImprovementProposalsError = estado => ({
    type: UPDATE_IMPROVEMENT_PROPOSALS_ERROR,
    payload: estado
})

//************************ INSERTA IMPROVEMENT_PROPOSALS MODAL INSERTAR**********************************************

export function insertarImprovementProposalsModalInsertarAction(risk_management, idPerson) {

    return async (dispatch) => {
        dispatch(insertarImprovementProposalsModalInsertar(true))


        await axios({
            method: "POST",
            url: urlImprovementProposalsApi,
            data: risk_management,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(insertarImprovementProposalsModalInsertarExito(response.data))

                dispatch(
                    showMessage({
                        message: "Improvement proposals successfully created",
                        variant: "success"
                    })

                )

                dispatch(mostrarImprovementProposalsByContractAPIAction(idPerson))



            })
            .catch(error => {
                console.log(error.response)
                dispatch(insertarImprovementProposalsModalInsertarError(false))
                dispatch(
                    showMessage({
                        message: "Error creating improvement proposals",
                        variant: "error"
                    })
                )
            })
    }
}

const insertarImprovementProposalsModalInsertar = (estado) => ({
    type: INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR,
    payload: estado

})

const insertarImprovementProposalsModalInsertarExito = idCreado => ({
    type: INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_EXITO,
    payload: idCreado

})

const insertarImprovementProposalsModalInsertarError = estado => ({
    type: INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_ERROR,
    payload: estado
})

//************************ CAMBIAR ESTADO IMPROVEMENT_PROPOSALS  **********************************************

export function cambiarEstadoImprovementProposalsAction(nombreEstado, valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarEstadoImprovementProposals())

        try {
            dispatch(cambiarEstadoImprovementProposalsExito(nombreEstado, valorNuevo))

        } catch (error) {

            dispatch(cambiarEstadoImprovementProposalsError(true))
        }
    }
}

const cambiarEstadoImprovementProposals = () => ({
    type: CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS,
    payload: true

})

const cambiarEstadoImprovementProposalsExito = (nombreEstado, valorNuevo) => ({
    type: CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_EXITO,
    nombre: nombreEstado,
    payload: valorNuevo


})

const cambiarEstadoImprovementProposalsError = estado => ({
    type: CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_ERROR,
    payload: estado
})


