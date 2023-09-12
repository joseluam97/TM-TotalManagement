import {

    MOSTRAR_KPI,
    MOSTRAR_KPI_EXITO,
    MOSTRAR_KPI_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_KPI,
    CAMBIAR_VALOR_SELECCION_GRID_KPI_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_KPI_ERROR,

    PUT_KPI,
    PUT_KPI_EXITO,
    PUT_KPI_ERROR,

    INSERTAR_NEW_KPI,
    INSERTAR_NEW_KPI_EXITO,
    INSERTAR_NEW_KPI_ERROR,

    CAMBIAR_MODAL_NEW_KPI,
    CAMBIAR_MODAL_NEW_KPI_EXITO,
    CAMBIAR_MODAL_NEW_KPI_ERROR,

    MOSTRAR_ALL_KPI,
    MOSTRAR_ALL_KPI_EXITO,
    MOSTRAR_ALL_KPI_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlKpiApi = process.env.REACT_APP_URL_DJANGO + "/api/kpi/"

//************************ MOSTRAR KPI API GET **********************************************

export function mostrarAllKpiAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarAllKpiAPI(true))

        await axios({
            method: "GET",
            url: urlKpiApi + "all",
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAllKpiAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAllKpiAPIError(true))
            })

    }
}

const mostrarAllKpiAPI = (estado) => ({
    type: MOSTRAR_ALL_KPI,
    payload: true

})

const mostrarAllKpiAPIExito = customers => ({
    type: MOSTRAR_ALL_KPI_EXITO,
    payload: customers

})

const mostrarAllKpiAPIError = estado => ({
    type: MOSTRAR_ALL_KPI_ERROR,
    payload: estado
})

//************************ MOSTRAR KPI API GET **********************************************

export function mostrarKpiByPersonAPIAction(idPerson) {

    return async (dispatch) => {
        dispatch(mostrarKpiAPI(true))

        await axios({
            method: "GET",
            url: urlKpiApi + "contrato/" + idPerson,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarKpiAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarKpiAPIError(true))
            })

    }
}

export function mostrarKpiAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarKpiAPI(true))

        await axios({
            method: "GET",
            url: urlKpiApi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarKpiAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarKpiAPIError(true))
            })

    }
}

const mostrarKpiAPI = (estado) => ({
    type: MOSTRAR_KPI,
    payload: true

})

const mostrarKpiAPIExito = customers => ({
    type: MOSTRAR_KPI_EXITO,
    payload: customers

})

const mostrarKpiAPIError = estado => ({
    type: MOSTRAR_KPI_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function cambiarVisibilidadModalInsertarKpiAPI(valorNuevo, modoDialogKpi) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalNuevoKpi())

        try {
            dispatch(cambiarVisibilidadModalNuevoKpiExito(valorNuevo, modoDialogKpi))

        } catch (error) {

            dispatch(cambiarVisibilidadModalNuevoKpiError(true))
        }
    }
}

const cambiarVisibilidadModalNuevoKpi = () => ({
    type: CAMBIAR_MODAL_NEW_KPI,
    payload: true

})

const cambiarVisibilidadModalNuevoKpiExito = (valorNuevo, modoDialogKpi) => ({
    type: CAMBIAR_MODAL_NEW_KPI_EXITO,
    nombre: modoDialogKpi,
    payload: valorNuevo

})

const cambiarVisibilidadModalNuevoKpiError = estado => ({
    type: CAMBIAR_MODAL_NEW_KPI_ERROR,
    payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewKpiAPIAction(customer) {

    return async (dispatch) => {
        dispatch(createNewKpi())
        axios({
            method: "POST",
            url: urlKpiApi,
            data: customer,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(createNewKpiExito(response.data))

                dispatch(
                    showMessage({
                        message: "KPI successfully created",
                        variant: "success"
                    })
                )

                dispatch(mostrarKpiAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(createNewKpiError(true))

                dispatch(
                    showMessage({
                        message: "Error creating KPI",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewKpi = (customer) => ({
    type: INSERTAR_NEW_KPI,
    payload: customer

})

const createNewKpiExito = estado => ({
    type: INSERTAR_NEW_KPI_EXITO,
    payload: estado

})

const createNewKpiError = estado => ({
    type: INSERTAR_NEW_KPI_ERROR,
    payload: estado
})

//PUT KPI

export function putKpiAPIAction(id, customer) {

    return async (dispatch) => {
        dispatch(putKpi())
        axios({
            method: "PUT",
            url: urlKpiApi + id,
            data: customer,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(putKpiExito(response.data))

                if (response.data['active'] == false) {
                    dispatch(
                        showMessage({
                            message: "KPI successfully deleted",
                            variant: "success"
                        })
                    )
                }
                else {
                    dispatch(
                        showMessage({
                            message: "KPI successfully modified",
                            variant: "success"
                        })
                    )
                }


                dispatch(mostrarKpiAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(putKpiError(true))

                dispatch(
                    showMessage({
                        message: "Error modified KPI",
                        variant: "error"
                    })
                )
            })

    }
}

const putKpi = () => ({
    type: PUT_KPI,
    payload: true

})

const putKpiExito = estado => ({
    type: PUT_KPI_EXITO,
    payload: estado

})

const putKpiError = estado => ({
    type: PUT_KPI_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID_KPI,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_KPI_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_KPI_ERROR,
    payload: estado
})
