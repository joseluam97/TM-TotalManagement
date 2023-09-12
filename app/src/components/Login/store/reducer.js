import {

    // COMPONENTE PRINCIPAL ------------------
   
   
            OBTENER_TOKEN,
            OBTENER_TOKEN_EXITO,
            OBTENER_TOKEN_ERROR,

            CHECK_TOKEN,
            CHECK_TOKEN_EXITO,
            CHECK_TOKEN_ERROR,
   
   
   } from './types';


// cada reducer tiene su propio state
const initialState = {

        token: '',
        login: false,
        error: null,
        loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {


     //**********OBTENER TOKEN**********************************/

        case  OBTENER_TOKEN:
            return {
                ...state,
                loading: action.payload
            }
        
        case OBTENER_TOKEN_EXITO:
            return {
                ...state,
                loading: false,
                token: action.payload,
                login: true

            }
        
        case OBTENER_TOKEN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
    
     //**********CHECK TOKEN**********************************/

         case  CHECK_TOKEN:
            return {
                ...state,
                loading: action.payload
            }
        
        case CHECK_TOKEN_EXITO:
            return {
                ...state,
                loading: false,
                token: action.payload,
                login: true

            }
        
        case CHECK_TOKEN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}