import {

    // COMPONENTE PRINCIPAL ------------------

    OBTENER_USER_BY_REQUERIMENTS,
    OBTENER_USER_BY_REQUERIMENTS_EXITO,
    OBTENER_USER_BY_REQUERIMENTS_ERROR,

    CAMBIAR_VALOR_USER_SELECTED,
    CAMBIAR_VALOR_USER_SELECTED_EXITO,
    CAMBIAR_VALOR_USER_SELECTED_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
    listUserSearch: [],
    userSelected: '',
    error: null,
    loading: false,
}

export default function(state = initialState, action) {

    switch(action.type) {

        //**********USUARIO SELECTED TABLE **********************************/

        case CAMBIAR_VALOR_USER_SELECTED:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_USER_SELECTED_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                userSelected: action.payload
            }
        
        case CAMBIAR_VALOR_USER_SELECTED_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET USUARIOS CON LOS REQUISITOS CITADOS **********************************/

        case OBTENER_USER_BY_REQUERIMENTS:
            return {
                ...state,
                loading: action.payload
            }
        
        case OBTENER_USER_BY_REQUERIMENTS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listUserSearch: action.payload
            }
        
        case OBTENER_USER_BY_REQUERIMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        
        default: 
            return state

    }

}
