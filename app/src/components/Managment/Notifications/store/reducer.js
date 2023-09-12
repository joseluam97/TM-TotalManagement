import {

    DESCARGAR_ADJUNTO_NOTIFICACION,
    DESCARGAR_ADJUNTO_NOTIFICACION_EXITO,
    DESCARGAR_ADJUNTO_NOTIFICACION_ERROR,

    POST_NUEVA_NOTIFICACION,
    POST_NUEVA_NOTIFICACION_EXITO,
    POST_NUEVA_NOTIFICACION_ERROR,

    PUT_NOTIFICACION,
    PUT_NOTIFICACION_EXITO,
    PUT_NOTIFICACION_ERROR,

    GET_NOTIFICACION,
    GET_NOTIFICACION_EXITO,
    GET_NOTIFICACION_ERROR,


} from './types';


// cada reducer tiene su propio state
const initialState = {
    archivoDescargado: '',
    error: null,
    loading: false,
    modoDialogKpi: '',
}


export default function (state = initialState, action) {

    switch (action.type) {
        
        //**********GET NOTIFICACION **********************************/

        case GET_NOTIFICACION:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_NOTIFICACION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listNotificactions: action.payload
            }
        
        case GET_NOTIFICACION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        
        //**********PUT_NOTIFICACION **********************************/

        case PUT_NOTIFICACION:
            return {
                ...state,
                loading: action.payload
            }
        
        case PUT_NOTIFICACION_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case PUT_NOTIFICACION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        
        //**********POST_CORREO_SOLICITUD **********************************/

        case POST_NUEVA_NOTIFICACION:
            return {
                ...state,
                loading: action.payload
            }
        
        case POST_NUEVA_NOTIFICACION_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case POST_NUEVA_NOTIFICACION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** MOSTRAR LOG_RISK API**********************************/ 

        case DESCARGAR_ADJUNTO_NOTIFICACION:
            return {
                ...state,
                loading: action.payload
            }

        case DESCARGAR_ADJUNTO_NOTIFICACION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                archivoDescargado: action.payload
            }

        case DESCARGAR_ADJUNTO_NOTIFICACION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}