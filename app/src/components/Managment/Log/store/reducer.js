import {

    MOSTRAR_KPI,
    MOSTRAR_KPI_EXITO,
    MOSTRAR_KPI_ERROR,

    INSERTAR_NEW_LOG,
    INSERTAR_NEW_LOG_EXITO,
    INSERTAR_NEW_LOG_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
        logListAPI:[],
        error: null,
        loading: false,
        modoDialogKpi: '',
}


export default function(state = initialState, action) {

    switch(action.type) {

    //********** MOSTRAR LOG API**********************************/ 

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
            logListAPI: action.payload
        }
    
    case MOSTRAR_KPI_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //post user

    case INSERTAR_NEW_LOG:
        return {
            ...state,
            loading: action.payload
        }
    
    case INSERTAR_NEW_LOG_EXITO:
        return {
            ...state,
            loading: false,
            error: null
        }
    
    case INSERTAR_NEW_LOG_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default: 
            return state

    }

}