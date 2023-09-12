import {

    CAMBIAR_VALOR_TAB_KPI,
    CAMBIAR_VALOR_TAB_KPI_EXITO,
    CAMBIAR_VALOR_TAB_KPI_ERROR,

    CAMBIAR_VALOR_KPI_SELECCIONADO,
    CAMBIAR_VALOR_KPI_SELECCIONADO_EXITO,
    CAMBIAR_VALOR_KPI_SELECCIONADO_ERROR,

    CAMBIAR_VALOR_MISION_SELECCIONADO,
    CAMBIAR_VALOR_MISION_SELECCIONADO_EXITO,
    CAMBIAR_VALOR_MISION_SELECCIONADO_ERROR,

    CAMBIAR_VALOR_ANO_SELECCIONADO,
    CAMBIAR_VALOR_ANO_SELECCIONADO_EXITO,
    CAMBIAR_VALOR_ANO_SELECCIONADO_ERROR

} from './types';

//CAMBIAR EL ANO SELECCIONADO
export function cambiarValorAnoSeleccionadoAPIAction(anoSelect) {

    return (dispatch) => {
        dispatch (cambiarValorAnoSeleccionadoAPI())

        try {
            dispatch (cambiarValorAnoSeleccionadoAPIExito(anoSelect))

        } catch (error) {

            dispatch (cambiarValorAnoSeleccionadoAPIError(true))
        }

    }

}

const cambiarValorAnoSeleccionadoAPI = () => ({
    type: CAMBIAR_VALOR_ANO_SELECCIONADO,
    payload: true

})

const cambiarValorAnoSeleccionadoAPIExito = anoSelect => ({
    type: CAMBIAR_VALOR_ANO_SELECCIONADO_EXITO,
    payload: anoSelect

})

const cambiarValorAnoSeleccionadoAPIError = estado => ({
  type: CAMBIAR_VALOR_ANO_SELECCIONADO_ERROR,
  payload: estado
})


//SAVE la mision SELECCIONA

export function cambiarValorMisionSeleccionadoAPIAction(misionSelect) {

    return (dispatch) => {
        dispatch (cambiarValorMisionSeleccionadoAPI())

        try {
            dispatch (cambiarValorMisionSeleccionadoAPIExito(misionSelect))

        } catch (error) {

            dispatch (cambiarValorMisionSeleccionadoAPIError(true))
        }

    }

}

const cambiarValorMisionSeleccionadoAPI = () => ({
    type: CAMBIAR_VALOR_MISION_SELECCIONADO,
    payload: true

})

const cambiarValorMisionSeleccionadoAPIExito = misionSelect => ({
    type: CAMBIAR_VALOR_MISION_SELECCIONADO_EXITO,
    payload: misionSelect

})

const cambiarValorMisionSeleccionadoAPIError = estado => ({
  type: CAMBIAR_VALOR_MISION_SELECCIONADO_ERROR,
  payload: estado
})

//SAVE EL KPI SELECCION

export function cambiarValorKpiSeleccionadoAPIAction(kpiSelect) {

    return (dispatch) => {
        dispatch (cambiarValorKpiSeleccionadoAPI())

        try {
            dispatch (cambiarValorKpiSeleccionadoAPIExito(kpiSelect))

        } catch (error) {

            dispatch (cambiarValorKpiSeleccionadoAPIError(true))
        }

    }

}

const cambiarValorKpiSeleccionadoAPI = () => ({
    type: CAMBIAR_VALOR_KPI_SELECCIONADO,
    payload: true

})

const cambiarValorKpiSeleccionadoAPIExito = kpiSelect => ({
    type: CAMBIAR_VALOR_KPI_SELECCIONADO_EXITO,
    payload: kpiSelect

})

const cambiarValorKpiSeleccionadoAPIError = estado => ({
  type: CAMBIAR_VALOR_KPI_SELECCIONADO_ERROR,
  payload: estado
})

//Cambiar valorTAB

export function cambiarValorTabAction(valorTab) {

    return (dispatch) => {
        dispatch (cambiarValorTab())

        try {
            dispatch (cambiarValorTabExito(valorTab))

        } catch (error) {

            dispatch (cambiarValorTabError(true))
        }

    }

}

const cambiarValorTab = () => ({
    type: CAMBIAR_VALOR_TAB_KPI,
    payload: true

})

const cambiarValorTabExito = valorTab => ({
    type: CAMBIAR_VALOR_TAB_KPI_EXITO,
    payload: valorTab

})

const cambiarValorTabError = estado => ({
  type: CAMBIAR_VALOR_TAB_KPI_ERROR,
  payload: estado
})