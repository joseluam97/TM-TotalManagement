import {

    GET_WORK_PACKAGE,
    GET_WORK_PACKAGE_EXITO,
    GET_WORK_PACKAGE_ERROR,

    POST_WORK_PACKAGE,
    POST_WORK_PACKAGE_EXITO,
    POST_WORK_PACKAGE_ERROR,

    PUT_WORK_PACKAGE,
    PUT_WORK_PACKAGE_EXITO,
    PUT_WORK_PACKAGE_ERROR,

    CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE,
    CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_EXITO,
    CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE,
    CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_ERROR,

    GET_REQUERIMENTS_BY_WORK_PACKAGE,
    GET_REQUERIMENTS_BY_WORK_PACKAGE_EXITO,
    GET_REQUERIMENTS_BY_WORK_PACKAGE_ERROR,

    POST_WORK_PACKAGE_APP,
    POST_WORK_PACKAGE_APP_EXITO,
    POST_WORK_PACKAGE_APP_ERROR,

    ELIMINAR_WORK_PACKAGE_APP,
    ELIMINAR_WORK_PACKAGE_APP_EXITO,
    ELIMINAR_WORK_PACKAGE_APP_ERROR,

    VER_MODAL_REQUERIMENTS_WORK_PACKAGE,
    VER_MODAL_REQUERIMENTS_WORK_PACKAGE_EXITO,
    VER_MODAL_REQUERIMENTS_WORK_PACKAGE_ERROR,


} from './types';


// cada reducer tiene su propio state
const initialState = {
    newWPCreated: '',
    listMisionPaquetesAPI: [],
    visibilidadModalInsertarMisionPaquete: false,
    listRequerimentsByWP: [],
    visibilidadModalRequeriments: false,
    error: null,
    loading: false,
    filaSeleccionadaGrid: '',
    modo: ''
}

export default function(state = initialState, action) {

    switch(action.type) {

        //deleteee CONTRACT APP
    case ELIMINAR_WORK_PACKAGE_APP:
        return {
            ...state,
            loading: action.payload
        }

    case ELIMINAR_WORK_PACKAGE_APP_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }

    case ELIMINAR_WORK_PACKAGE_APP_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //**********POST WORK_PACKAGE APP**********************************/

        case POST_WORK_PACKAGE_APP:
            return {
                ...state,
                loading: action.payload
            }

        case POST_WORK_PACKAGE_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case POST_WORK_PACKAGE_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********GET REQUERIMENTS BY WORK_PACKAGE**********************************/

        case GET_REQUERIMENTS_BY_WORK_PACKAGE:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_REQUERIMENTS_BY_WORK_PACKAGE_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listRequerimentsByWP: action.payload
            }
        
        case GET_REQUERIMENTS_BY_WORK_PACKAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

            //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB WORK_PACKAGE**********************************/

        case VER_MODAL_REQUERIMENTS_WORK_PACKAGE:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_REQUERIMENTS_WORK_PACKAGE_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalRequeriments: action.payload

            }

        case VER_MODAL_REQUERIMENTS_WORK_PACKAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

     //**********GET CONJUNTOS**********************************/

        case GET_WORK_PACKAGE:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_WORK_PACKAGE_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listMisionPaquetesAPI: action.payload
            }
        
        case GET_WORK_PACKAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


     //**********POST CONJUNTO**********************************/

         case POST_WORK_PACKAGE:
            return {
                ...state,
                loading: action.payload
            }
        
        case POST_WORK_PACKAGE_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                newWPCreated: action.payload
            }
        
        case POST_WORK_PACKAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
            

     //********** PUT CONJUNTO **********************************/ 


     case PUT_WORK_PACKAGE:
        return {
            ...state,
            loading: action.payload
        }
    
    case PUT_WORK_PACKAGE_EXITO:
        return {
            ...state,
            loading: false,
            error: null
        }
    
    case PUT_WORK_PACKAGE_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    //**********VISIBILIDAD**********************************/

    case CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_EXITO:
        return {
            ...state,
            loading: false,
            visibilidad: action.payload

        }
    
    case CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }


 //**********FILA SELECIONADA GRID **********************************/

     case CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_EXITO:
        return {
            ...state,
            loading: false,
            filaSeleccionadaGrid: action.payload

        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    //**********VISIBILIDAD MODAL INSERTAR**********************************/

    case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertarMisionPaquete: action.payload,
                modo: action.modo

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}