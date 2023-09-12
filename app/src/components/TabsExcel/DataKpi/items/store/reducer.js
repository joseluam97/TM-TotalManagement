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


// cada reducer tiene su propio state
const initialState = {

    dataSummaryAPI: [],
    datosGraficosOTD: [],
    datosGraficosOQD: [],
    dataSummarySemanalAPI: [],
    dataKpiListAPI: [],
    kpiSelect: [],
    filaSeleccionadaGrid: '',
    visibilidadModalInsertar: false,
    modo: '',
    resetStatesLocal: false,
    error: null,
    loading: false,
    insertadoDataKpi: false,
    exportacionFinalizada: false
}

export default function (state = initialState, action) {

    switch (action.type) {

        //**********CAMBIAR VALOR DE EXPORTACION**********************************/

        case CAMBIAR_VALOR_ESTADO_EXPORTACION:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_ESTADO_EXPORTACION_EXITO:
            return {
                ...state,
                loading: false,
                exportacionFinalizada: action.payload

            }

        case CAMBIAR_VALOR_ESTADO_EXPORTACION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER DATOS GRAFICOS BY MISION**********************************/ 

        case SOLITUD_EXPORTACION_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case SOLITUD_EXPORTACION_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                exportacionFinalizada: true

            }

        case SOLITUD_EXPORTACION_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER DATOS GRAFICOS BY MISION**********************************/ 

        case OBTENER_VALORES_GRAFICOS_OTD:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_VALORES_GRAFICOS_OTD_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                datosGraficosOTD: action.payload

            }

        case OBTENER_VALORES_GRAFICOS_OTD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER DATOS GRAFICOS BY MISION**********************************/ 

        case OBTENER_VALORES_GRAFICOS_OQD:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_VALORES_GRAFICOS_OQD_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                datosGraficosOQD: action.payload

            }

        case OBTENER_VALORES_GRAFICOS_OQD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER SUMMARY ESPECIAL ACTUAL**********************************/ 

        case GET_SUMMARY_ESPECIAL_ACTUAL:
            return {
                ...state,
                loading: action.payload
            }

        case GET_SUMMARY_ESPECIAL_ACTUAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                dataSummaryEspecialAPI: action.payload

            }

        case GET_SUMMARY_ESPECIAL_ACTUAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER SUMMARY SEMANAL ACTUAL**********************************/ 

        case GET_SUMMARY_SEMANAL_ACTUAL:
            return {
                ...state,
                loading: action.payload
            }

        case GET_SUMMARY_SEMANAL_ACTUAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                dataSummarySemanalAPI: action.payload

            }

        case GET_SUMMARY_SEMANAL_ACTUAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER SUMMARY ACTUAL**********************************/ 

        case GET_SUMMARY_ACTUAL:
            return {
                ...state,
                loading: action.payload
            }

        case GET_SUMMARY_ACTUAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                dataSummaryAPI: action.payload

            }

        case GET_SUMMARY_ACTUAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** GUARDAR KPI SELECCIONADO EN LA PESTAÑA DATA KPI**********************************/ 

        case SAVE_KPI_SELECT:
            return {
                ...state,
                loading: action.payload
            }

        case SAVE_KPI_SELECT_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                kpiSelect: action.payload

            }

        case SAVE_KPI_SELECT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** DELETE DATA_KPI **********************************/ 


        case ELIMINAR_DATA_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case ELIMINAR_DATA_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case ELIMINAR_DATA_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        //**********FILA SELECIONADA GRID **********************************/

        case CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGrid: action.payload

            }

        case CAMBIAR_VALOR_SELECCION_GRID_DATA_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //********** MOSTRAR IMPROVEMENT_PROPOSALS API**********************************/ 


        case MOSTRAR_DATA_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_DATA_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                dataKpiListAPI: action.payload

            }

        case MOSTRAR_DATA_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********VISIBILIDAD MODAL INSERTAR**********************************/

        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertar: action.payload,
                modo: action.modo

            }

        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DATA_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }



        //********** INSERTAR IMPROVEMENT_PROPOSALS API MODAL INSERTAR**********************************/ 


        case INSERTAR_DATA_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case INSERTAR_DATA_KPI_EXITO:
            return {
                ...state,
                loading: false,
                ultimoIdCreado: action.payload,
                insertadoDataKpi: true,
                error: null

            }

        case INSERTAR_DATA_KPI_ERROR:
            return {
                ...state,
                loading: action.payload,
                error: true

            }

        //********** UPDATE RM_IMPROVEMENT_PROPOSALS **********************************/ 


        case UPDATE_DATA_KPI:
            return {
                ...state,
                loading: action.payload
            }

        case UPDATE_DATA_KPI_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case UPDATE_DATA_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}
