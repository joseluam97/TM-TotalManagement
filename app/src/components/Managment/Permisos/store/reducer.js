import {

    MOSTRAR_GROUP,
    MOSTRAR_GROUP_EXITO,
    MOSTRAR_GROUP_ERROR,

    MOSTRAR_PERMISOS,
    MOSTRAR_PERMISOS_EXITO,
    MOSTRAR_PERMISOS_ERROR,

    MOSTRAR_ALL_PERMISOS,
    MOSTRAR_ALL_PERMISOS_EXITO,
    MOSTRAR_ALL_PERMISOS_ERROR,

    PUT_GROUP,
    PUT_GROUP_EXITO,
    PUT_GROUP_ERROR,

    INSERTAR_NEW_GROUP,
    INSERTAR_NEW_GROUP_EXITO,
    INSERTAR_NEW_GROUP_ERROR,

    CAMBIAR_MODAL_INSERTAR_GROUP,
    CAMBIAR_MODAL_INSERTAR_GROUP_EXITO,
    CAMBIAR_MODAL_INSERTAR_GROUP_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_GROUP,
    CAMBIAR_VALOR_SELECCION_GRID_GROUP_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_GROUP_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
        groupListAPI:[],
        permisosListAPI:[],
        allPermisosListAPI:[],
        filaSeleccionadaGrid: '',
        visbilidadModalInsertar: false,
        modoDialogo: '',
        error: null,
        loading: false
}


export default function(state = initialState, action) {

    switch(action.type) {

        //********** VER PERMISOS BY GROUP**********************************/ 

    case MOSTRAR_PERMISOS:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_PERMISOS_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            permisosListAPI: action.payload
        }
    
    case MOSTRAR_PERMISOS_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //********** VER TODOS LOS PERMISOS**********************************/ 

    case MOSTRAR_ALL_PERMISOS:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_ALL_PERMISOS_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            allPermisosListAPI: action.payload
        }
    
    case MOSTRAR_ALL_PERMISOS_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //********** ver mn**********************************/ 

    case CAMBIAR_VALOR_SELECCION_GRID_GROUP:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_GROUP_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            filaSeleccionadaGrid: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_GROUP_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //INSERTAR NUEVA GROUP

        case INSERTAR_NEW_GROUP:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_NEW_GROUP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case INSERTAR_NEW_GROUP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE CUSTOMER
    case PUT_GROUP:
        return {
            ...state,
            loading: action.payload
        }
    
    case PUT_GROUP_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }
    
    case PUT_GROUP_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //********** ver mn**********************************/ 

    case MOSTRAR_GROUP:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_GROUP_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            groupListAPI: action.payload
        }
    
    case MOSTRAR_GROUP_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    

    //********** MOSTRAR CUSTOMER API**********************************/ 

    case CAMBIAR_MODAL_INSERTAR_GROUP:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_MODAL_INSERTAR_GROUP_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            visbilidadModalInsertar: action.payload,
            modoDialogo: action.modoDialogo

        }
    
    case CAMBIAR_MODAL_INSERTAR_GROUP_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default: 
            return state

    }

}