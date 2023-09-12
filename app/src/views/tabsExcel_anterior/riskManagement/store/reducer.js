import {

    CAMBIAR_VALOR_TAB,
    CAMBIAR_VALOR_TAB_EXITO,
    CAMBIAR_VALOR_TAB_ERROR

} from './types';


// cada reducer tiene su propio state
const initialState = {
    valorTab: 'risk_management',
    error: null,
    loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {
        case CAMBIAR_VALOR_TAB:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_TAB_EXITO:
            return {
                ...state,
                loading: false,
                valorTab: action.payload

            }
        
        case CAMBIAR_VALOR_TAB_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }    

        default: 
            return state

    }

}