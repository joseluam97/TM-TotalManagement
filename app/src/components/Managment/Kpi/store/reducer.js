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


// cada reducer tiene su propio state
const initialState = {
    kpiListAPI: [],
    allKpiListAPI: [],
    filaSeleccionadaGrid: '',
    error: null,
    loading: false,
    visibilidadNewKpi: false,
    modoDialogKpi: '',
}


export default function (state = initialState, action) {

    switch (action.type) {

        //********** MOSTRAR ALL KPI API**********************************/ 

        case MOSTRAR_ALL_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_ALL_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                allKpiListAPI: action.payload
            }

        case MOSTRAR_ALL_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********VISIBILIDAD MODAL INSERTAR**********************************/
        case CAMBIAR_MODAL_NEW_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_MODAL_NEW_KPI_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadNewKpi: action.payload,
                modoDialogKpi: action.nombre
            }

        case CAMBIAR_MODAL_NEW_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //post user

        case INSERTAR_NEW_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case INSERTAR_NEW_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case INSERTAR_NEW_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE KPI
        case PUT_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case PUT_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //********** MOSTRAR KPI API**********************************/ 

        case MOSTRAR_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                kpiListAPI: action.payload
            }

        case MOSTRAR_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        //**********FILA SELECIONADA GRID **********************************/

        case CAMBIAR_VALOR_SELECCION_GRID_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_KPI_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGrid: action.payload

            }

        case CAMBIAR_VALOR_SELECCION_GRID_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}