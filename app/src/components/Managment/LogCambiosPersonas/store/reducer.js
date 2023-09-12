import {

    MOSTRAR_LOG_PERSONA,
    MOSTRAR_LOG_PERSONA_EXITO,
    MOSTRAR_LOG_PERSONA_ERROR,

    INSERTAR_NEW_LOG_PERSONA,
    INSERTAR_NEW_LOG_PERSONA_EXITO,
    INSERTAR_NEW_LOG_PERSONA_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
        logPersonaListAPI:[],
        error: null,
        loading: false,
        modoDialogKpi: '',
}


export default function(state = initialState, action) {

    switch(action.type) {

    //********** MOSTRAR LOG_PERSONA API**********************************/ 

    case MOSTRAR_LOG_PERSONA:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_LOG_PERSONA_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            logPersonaListAPI: action.payload
        }
    
    case MOSTRAR_LOG_PERSONA_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //post user

    case INSERTAR_NEW_LOG_PERSONA:
        return {
            ...state,
            loading: action.payload
        }
    
    case INSERTAR_NEW_LOG_PERSONA_EXITO:
        return {
            ...state,
            loading: false,
            error: null
        }
    
    case INSERTAR_NEW_LOG_PERSONA_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default: 
            return state

    }

}