import {

    GET_ALL_MISION,
    GET_ALL_MISION_EXITO,
    GET_ALL_MISION_ERROR,

    PUT_MISION,
    PUT_MISION_EXITO,
    PUT_MISION_ERROR,

    POST_MISION,
    POST_MISION_EXITO,
    POST_MISION_ERROR,

    VER_MODAL_INSERT_MISION,
    VER_MODAL_INSERT_MISION_EXITO,
    VER_MODAL_INSERT_MISION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_MISION,
    CAMBIAR_VALOR_SELECCION_GRID_MISION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_MISION_ERROR,

    GET_RO_MISION,
    GET_RO_MISION_EXITO,
    GET_RO_MISION_ERROR,

    VER_MODAL_REQUERIMENTS_MISION,
    VER_MODAL_REQUERIMENTS_MISION_EXITO,
    VER_MODAL_REQUERIMENTS_MISION_ERROR,

    GET_REQUERIMENTS_BY_MISION,
    GET_REQUERIMENTS_BY_MISION_EXITO,
    GET_REQUERIMENTS_BY_MISION_ERROR,

    POST_MISION_APP,
    POST_MISION_APP_EXITO,
    POST_MISION_APP_ERROR,

    ELIMINAR_MISION_APP,
    ELIMINAR_MISION_APP_EXITO,
    ELIMINAR_MISION_APP_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
    newMisionCreated: [],
    listMisionAPI: [], 
    listRiskOportunitysByMision: [],
    listRequerimentsByMision: [],
    visibilidadModalInsertarMision: false,
    visibilidadModalRequeriments: false,
    error: null,
    loading: false,
    filaSeleccionadaGrid: '',
    modo: ''
}

export default function(state = initialState, action) {

    switch(action.type) {

        //deleteee CONTRACT APP
    case ELIMINAR_MISION_APP:
        return {
            ...state,
            loading: action.payload
        }

    case ELIMINAR_MISION_APP_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }

    case ELIMINAR_MISION_APP_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //**********POST MISION APP**********************************/

        case POST_MISION_APP:
            return {
                ...state,
                loading: action.payload
            }

        case POST_MISION_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case POST_MISION_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********GET REQUERIMENTS BY MISION**********************************/

        case GET_REQUERIMENTS_BY_MISION:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_REQUERIMENTS_BY_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listRequerimentsByMision: action.payload
            }
        
        case GET_REQUERIMENTS_BY_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB MISION**********************************/

        case VER_MODAL_REQUERIMENTS_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_REQUERIMENTS_MISION_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalRequeriments: action.payload

            }

        case VER_MODAL_REQUERIMENTS_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET R&O BY MISION**********************************/

        case GET_RO_MISION:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_RO_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listRiskOportunitysByMision: action.payload
            }
        
        case GET_RO_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********FILA SELECIONADA GRID **********************************/

    case CAMBIAR_VALOR_SELECCION_GRID_MISION:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_MISION_EXITO:
        return {
            ...state,
            loading: false,
            filaSeleccionadaGrid: action.payload

        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_MISION_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

     //**********GET MISIONES**********************************/

        case GET_ALL_MISION:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_ALL_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listMisionAPI: action.payload
            }
        
        case GET_ALL_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB MISION**********************************/

        case VER_MODAL_INSERT_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_INSERT_MISION_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertarMision: action.payload,
                modoAperturaInsert: action.modoApertura

            }

        case VER_MODAL_INSERT_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********POST MISION**********************************/

        case POST_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case POST_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                newMisionCreated: action.payload
            }

        case POST_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********POST persona a contrato**********************************/

        case PUT_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case PUT_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}