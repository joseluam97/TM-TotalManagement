import {

    MOSTRAR_LOG_RISK,
    MOSTRAR_LOG_RISK_EXITO,
    MOSTRAR_LOG_RISK_ERROR,

    INSERTAR_NEW_LOG_RISK,
    INSERTAR_NEW_LOG_RISK_EXITO,
    INSERTAR_NEW_LOG_RISK_ERROR,

    VER_MODAL_DETALLES_LOG_RISK,
    VER_MODAL_DETALLES_LOG_RISK_EXITO,
    VER_MODAL_DETALLES_LOG_RISK_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
    logRiskListAPI: [],
    visibilidadDiaologoDetallesLogRisk: false,
    modoDialogoDetallesLogRisk: '',
    error: null,
    loading: false,
    modoDialogKpi: '',
}


export default function (state = initialState, action) {

    switch (action.type) {

        //********** GESTION DIALOGO DETALLES LOG**********************************/ 

        case VER_MODAL_DETALLES_LOG_RISK:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_DETALLES_LOG_RISK_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadDiaologoDetallesLogRisk: action.payload,
                modoDialogoDetallesLogRisk: action.modoDialogo
            }

        case VER_MODAL_DETALLES_LOG_RISK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** MOSTRAR LOG_RISK API**********************************/ 

        case MOSTRAR_LOG_RISK:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_LOG_RISK_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                logRiskListAPI: action.payload
            }

        case MOSTRAR_LOG_RISK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //post user

        case INSERTAR_NEW_LOG_RISK:
            return {
                ...state,
                loading: action.payload
            }

        case INSERTAR_NEW_LOG_RISK_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case INSERTAR_NEW_LOG_RISK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}