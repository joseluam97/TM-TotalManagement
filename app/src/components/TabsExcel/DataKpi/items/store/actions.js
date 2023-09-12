import {

    // COMPONENTE PRINCIPAL ------------------

    CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI,
    CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI_ERROR,

    MOSTRAR_DATA_KPI,
    MOSTRAR_DATA_KPI_EXITO,
    MOSTRAR_DATA_KPI_ERROR,

    UPDATE_DATA_KPI,
    UPDATE_DATA_KPI_EXITO,
    UPDATE_DATA_KPI_ERROR,


    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI_ERROR,

    INSERTAR_DATA_KPI,
    INSERTAR_DATA_KPI_EXITO,
    INSERTAR_DATA_KPI_ERROR,

    ELIMINAR_DATA_KPI,
    ELIMINAR_DATA_KPI_EXITO,
    ELIMINAR_DATA_KPI_ERROR,

    SAVE_KPI_SELECT,
    SAVE_KPI_SELECT_EXITO,
    SAVE_KPI_SELECT_ERROR,

    GET_SUMMARY_ACTUAL,
    GET_SUMMARY_ACTUAL_EXITO,
    GET_SUMMARY_ACTUAL_ERROR,

    GET_SUMMARY_SEMANAL_ACTUAL,
    GET_SUMMARY_SEMANAL_ACTUAL_EXITO,
    GET_SUMMARY_SEMANAL_ACTUAL_ERROR,

    GET_SUMMARY_ESPECIAL_ACTUAL,
    GET_SUMMARY_ESPECIAL_ACTUAL_EXITO,
    GET_SUMMARY_ESPECIAL_ACTUAL_ERROR,

    OBTENER_VALORES_GRAFICOS_OQD,
    OBTENER_VALORES_GRAFICOS_OQD_EXITO,
    OBTENER_VALORES_GRAFICOS_OQD_ERROR,

    OBTENER_VALORES_GRAFICOS_OTD,
    OBTENER_VALORES_GRAFICOS_OTD_EXITO,
    OBTENER_VALORES_GRAFICOS_OTD_ERROR,

    SOLITUD_EXPORTACION_KPI,
    SOLITUD_EXPORTACION_KPI_EXITO,
    SOLITUD_EXPORTACION_KPI_ERROR,

    CAMBIAR_VALOR_ESTADO_EXPORTACION,
    CAMBIAR_VALOR_ESTADO_EXPORTACION_EXITO,
    CAMBIAR_VALOR_ESTADO_EXPORTACION_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'
import store from "app/store/index"

//Constantes globales
const urlDataKpiApi = process.env.REACT_APP_URL_DJANGO + "/api/dataKpi/"
const urlSummary = process.env.REACT_APP_URL_DJANGO + "/api/kpi/summary/"
const urlSummaryEspecial = process.env.REACT_APP_URL_DJANGO + "/api/kpi/summaryGantt/"
//const urlSummarySemanal = process.env.REACT_APP_URL_DJANGO + "/api/kpi/summarySemanal/"
const urlSummarySemanal = process.env.REACT_APP_URL_DJANGO + "/api/kpi/summarySemanalGantt/"
const urlDataKpiApiByYear = process.env.REACT_APP_URL_DJANGO + "/api/dataKpi/ano/"

//************************CAMBIAR VALOR EXPORTADO**********************************************

export function cambiarValorEstadoExportacionAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarValorEstadoExportacionAPI())

        try {
            dispatch(cambiarValorEstadoExportacionAPIExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarValorEstadoExportacionAPIError(true))
        }
    }
}

const cambiarValorEstadoExportacionAPI = () => ({
    type: CAMBIAR_VALOR_ESTADO_EXPORTACION,
    payload: true

})

const cambiarValorEstadoExportacionAPIExito = (valorNuevo) => ({
    type: CAMBIAR_VALOR_ESTADO_EXPORTACION_EXITO,
    payload: valorNuevo

})

const cambiarValorEstadoExportacionAPIError = estado => ({
    type: CAMBIAR_VALOR_ESTADO_EXPORTACION_ERROR,
    payload: estado
})

//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function solicitudExportKPIAPIAction(misionSelect, kpiSelect, anoSelect, userSolicita) {

    return async (dispatch) => {

        dispatch(
            showMessage({
                message: "Your request has been received successfully, you will shortly receive a notification from the system to download your file.",
                variant: "success"
            })
        )

        dispatch(solicitudExportKPIAPI(true))

        await axios({
            method: "POST",
            url: urlDataKpiApi + "solicitudExport/",
            data: { misionSelect: misionSelect, kpiSelect: kpiSelect, anoSelect: anoSelect, userSolicita: userSolicita },
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(solicitudExportKPIAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(solicitudExportKPIAPIError(true))
            })

    }
}

const solicitudExportKPIAPI = (estado) => ({
    type: SOLITUD_EXPORTACION_KPI,
    payload: true

})

const solicitudExportKPIAPIExito = risk_managements => ({
    type: SOLITUD_EXPORTACION_KPI_EXITO,
    payload: risk_managements

})

const solicitudExportKPIAPIError = estado => ({
    type: SOLITUD_EXPORTACION_KPI_ERROR,
    payload: estado
})

//************************ OBTENER TODOS LOS DATOS GRAFICAS OTD POR MISION **********************************************

export function obtenerDatosGraficosOTDKpiByMisionAPIAction(kpiSelect, anoSelect) {

    return async (dispatch) => {
        dispatch(obtenerDatosGraficosOTDKpiByMisionAPI(true))

        await axios({
            method: "POST",
            url: urlDataKpiApi + "allGraficoOTD/" + kpiSelect,
            data: { anoSelect: anoSelect },
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerDatosGraficosOTDKpiByMisionAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerDatosGraficosOTDKpiByMisionAPIError(true))
            })

    }
}

//************************ OBTENER TODOS LOS DATOS GRAFICAS OQD POR MISION **********************************************

export function obtenerDatosGraficosKpiByMisionAPIAction(misionSelect, anoSelect) {

    return async (dispatch) => {
        dispatch(obtenerDatosGraficosKpiByMisionAPI(true))

        await axios({
            method: "POST",
            url: urlDataKpiApi + "allGraficoOQD/" + misionSelect,
            data: { anoSelect: anoSelect },
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerDatosGraficosKpiByMisionAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerDatosGraficosKpiByMisionAPIError(true))
            })

    }
}

//************************ OBTENER DATOS GRAFICAS OTD POR KPI **********************************************

export function obtenerDatosGraficosOTDKpiAPIAction(kpiSelect, anoSelect) {

    return async (dispatch) => {
        dispatch(obtenerDatosGraficosOTDKpiByMisionAPI(true))

        await axios({
            method: "POST",
            url: urlDataKpiApi + "graficoOTD/" + kpiSelect,
            data: { anoSelect: anoSelect },
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerDatosGraficosOTDKpiByMisionAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerDatosGraficosOTDKpiByMisionAPIError(true))
            })

    }
}

const obtenerDatosGraficosOTDKpiByMisionAPI = (estado) => ({
    type: OBTENER_VALORES_GRAFICOS_OTD,
    payload: true

})

const obtenerDatosGraficosOTDKpiByMisionAPIExito = risk_managements => ({
    type: OBTENER_VALORES_GRAFICOS_OTD_EXITO,
    payload: risk_managements

})

const obtenerDatosGraficosOTDKpiByMisionAPIError = estado => ({
    type: OBTENER_VALORES_GRAFICOS_OTD_ERROR,
    payload: estado
})

//************************ OBTENER DATOS GRAFICAS OQD POR KPI **********************************************

export function obtenerDatosGraficosKpiAPIAction(misionSelect, anoSelect) {

    return async (dispatch) => {
        dispatch(obtenerDatosGraficosKpiByMisionAPI(true))

        await axios({
            method: "POST",
            url: urlDataKpiApi + "graficoOQD/" + misionSelect,
            data: { anoSelect: anoSelect },
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerDatosGraficosKpiByMisionAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerDatosGraficosKpiByMisionAPIError(true))
            })

    }
}

const obtenerDatosGraficosKpiByMisionAPI = (estado) => ({
    type: OBTENER_VALORES_GRAFICOS_OQD,
    payload: true

})

const obtenerDatosGraficosKpiByMisionAPIExito = risk_managements => ({
    type: OBTENER_VALORES_GRAFICOS_OQD_EXITO,
    payload: risk_managements

})

const obtenerDatosGraficosKpiByMisionAPIError = estado => ({
    type: OBTENER_VALORES_GRAFICOS_OQD_ERROR,
    payload: estado
})

//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function obtenerSummarySemanalActualAPIAction(idPersona, ano) {



    return async (dispatch) => {
        dispatch(obtenerSummarySemanalAPI(true))


        await axios({
            method: "POST",
            url: urlSummarySemanal + idPersona,
            data: ano,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerSummarySemanalAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerSummarySemanalAPIError(true))
            })

    }
}

const obtenerSummarySemanalAPI = (estado) => ({
    type: GET_SUMMARY_SEMANAL_ACTUAL,
    payload: true

})

const obtenerSummarySemanalAPIExito = risk_managements => ({
    type: GET_SUMMARY_SEMANAL_ACTUAL_EXITO,
    payload: risk_managements

})

const obtenerSummarySemanalAPIError = estado => ({
    type: GET_SUMMARY_SEMANAL_ACTUAL_ERROR,
    payload: estado
})

//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function obtenerSummaryEspecialActualAPIAction(idPersona, ano) {

    return async (dispatch) => {
        dispatch(obtenerSummaryEspecialAPI(true))


        await axios({
            method: "POST",
            url: urlSummaryEspecial + idPersona,
            data: ano,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerSummaryEspecialAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerSummaryEspecialAPIError(true))
            })

    }
}

const obtenerSummaryEspecialAPI = (estado) => ({
    type: GET_SUMMARY_ESPECIAL_ACTUAL,
    payload: true

})

const obtenerSummaryEspecialAPIExito = risk_managements => ({
    type: GET_SUMMARY_ESPECIAL_ACTUAL_EXITO,
    payload: risk_managements

})

const obtenerSummaryEspecialAPIError = estado => ({
    type: GET_SUMMARY_ESPECIAL_ACTUAL_ERROR,
    payload: estado
})

//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function obtenerSummaryActualAPIAction(idPersona, ano) {

    return async (dispatch) => {
        dispatch(obtenerSummaryAPI(true))


        await axios({
            method: "POST",
            url: urlSummary + idPersona,
            data: ano,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerSummaryAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerSummaryAPIError(true))
            })

    }
}

const obtenerSummaryAPI = (estado) => ({
    type: GET_SUMMARY_ACTUAL,
    payload: true

})

const obtenerSummaryAPIExito = risk_managements => ({
    type: GET_SUMMARY_ACTUAL_EXITO,
    payload: risk_managements

})

const obtenerSummaryAPIError = estado => ({
    type: GET_SUMMARY_ACTUAL_ERROR,
    payload: estado
})

//************************ CAMBIAR KPI SELECCIONADO**********************************************

export function saveKpiSelectAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch(saveKpiSelectAPI())

        try {
            dispatch(saveKpiSelectAPIExito(valorNuevo))

        } catch (error) {

            dispatch(saveKpiSelectAPIError(true))
        }

    }

}

const saveKpiSelectAPI = () => ({
    type: SAVE_KPI_SELECT,
    payload: true

})

const saveKpiSelectAPIExito = valorNuevo => ({
    type: SAVE_KPI_SELECT_EXITO,
    payload: valorNuevo

})

const saveKpiSelectAPIError = estado => ({
    type: SAVE_KPI_SELECT_ERROR,
    payload: estado
})

//************************ ELIMINAR DATA KPI**********************************************

export function deleteDataKpiAction(idDataKpi, idPerson) {
    return async (dispatch) => {
        dispatch(eliminarDataKpi())

        await axios({
            method: "DELETE",
            url: urlDataKpiApi + idDataKpi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(eliminarDataKpiExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                dispatch(mostrarDataKpiAction(store.getState().fuse.gestionDataKpiComponent.anoSeleccionado))
                dispatch(cambiarValorSeleccionAction(''))

            })

            .catch(error => {
                console.log(error.response)
                dispatch(eliminarDataKpiError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const eliminarDataKpi = (id) => ({
    type: ELIMINAR_DATA_KPI,
    payload: id

})

const eliminarDataKpiExito = estado => ({
    type: ELIMINAR_DATA_KPI_EXITO,
    payload: estado

})

const eliminarDataKpiError = estado => ({
    type: ELIMINAR_DATA_KPI_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI_ERROR,
    payload: estado
})


//************************ MOSTRAR IMPROVEMENT_PROPOSALS API GET **********************************************

export function mostrarDataKpiAction(anoSelect) {

    return async (dispatch) => {
        dispatch(mostrarDataKpi(true))


        await axios({
            method: "GET",
            url: urlDataKpiApiByYear + anoSelect,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarDataKpiExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarDataKpiError(true))
            })

    }
}

const mostrarDataKpi = (estado) => ({
    type: MOSTRAR_DATA_KPI,
    payload: true

})

const mostrarDataKpiExito = risk_managements => ({
    type: MOSTRAR_DATA_KPI_EXITO,
    payload: risk_managements

})

const mostrarDataKpiError = estado => ({
    type: MOSTRAR_DATA_KPI_ERROR,
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
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI,
    payload: true

})

const cambiarVisibilidadModalInsertarExito = (valorNuevo, modo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI_EXITO,
    payload: valorNuevo,
    modo: modo

})

const cambiarVisibilidadModalInsertarError = estado => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI_ERROR,
    payload: estado
})


//************************ UPDATE IMPROVEMENT_PROPOSALS **********************************************

export function updateDataKpiAction(id, json, idPerson) {

    return async (dispatch) => {
        dispatch(updateDataKpi())

        axios({
            method: "PUT",
            url: urlDataKpiApi + id,
            data: json,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(updateDataKpiExito(response.data))

                if (response.data['active'] == false) {
                    dispatch(
                        showMessage({
                            message: "Delete DataKpi",
                            variant: "success"
                        })
                    )
                }
                else {
                    dispatch(
                        showMessage({
                            message: "Updated DataKpi",
                            variant: "success"
                        })
                    )
                }

                dispatch(mostrarDataKpiAction(store.getState().fuse.gestionDataKpiComponent.anoSeleccionado))


            })
            .catch(error => {
                console.log(error.response)
                dispatch(updateDataKpiError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating DataKpi",
                        variant: "error"
                    })
                )
            })

    }
}

const updateDataKpi = (rm_accion) => ({
    type: UPDATE_DATA_KPI,
    payload: rm_accion

})

const updateDataKpiExito = estado => ({
    type: UPDATE_DATA_KPI_EXITO,
    payload: estado

})

const updateDataKpiError = estado => ({
    type: UPDATE_DATA_KPI_ERROR,
    payload: estado
})

//************************ INSERTA IMPROVEMENT_PROPOSALS MODAL INSERTAR**********************************************

export function insertarDataKpiModalInsertarAction(dataKpi, idPerson) {

    return async (dispatch) => {
        dispatch(insertarDataKpiModalInsertar(true))


        await axios({
            method: "POST",
            url: urlDataKpiApi,
            data: dataKpi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(insertarDataKpiModalInsertarExito(response.data))

                dispatch(
                    showMessage({
                        message: "DataKpi successfully created",
                        variant: "success"
                    })

                )
                dispatch(mostrarDataKpiAction(store.getState().fuse.gestionDataKpiComponent.anoSeleccionado))


            })
            .catch(error => {
                console.log(error.response)
                dispatch(insertarDataKpiModalInsertarError(false))
                dispatch(
                    showMessage({
                        message: "Error creating DataKpi",
                        variant: "error"
                    })
                )
            })
    }
}

const insertarDataKpiModalInsertar = (estado) => ({
    type: INSERTAR_DATA_KPI,
    payload: estado

})

const insertarDataKpiModalInsertarExito = idCreado => ({
    type: INSERTAR_DATA_KPI_EXITO,
    payload: idCreado

})

const insertarDataKpiModalInsertarError = estado => ({
    type: INSERTAR_DATA_KPI_ERROR,
    payload: estado
})



