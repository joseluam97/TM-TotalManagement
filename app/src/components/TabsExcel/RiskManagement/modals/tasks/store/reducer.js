import {

    
    MOSTRAR_RM_ACCION,
    MOSTRAR_RM_ACCION_EXITO,
    MOSTRAR_RM_ACCION_ERROR,

    CAMBIAR_ESTADO_RM_ACCION,
    CAMBIAR_ESTADO_RM_ACCION_EXITO,
    CAMBIAR_ESTADO_RM_ACCION_ERROR,


    INSERTAR_RM_ACCION,
    INSERTAR_RM_ACCION_EXITO,
    INSERTAR_RM_ACCION_ERROR,

    UPDATE_RM_ACCION,
    UPDATE_RM_ACCION_EXITO,
    UPDATE_RM_ACCION_ERROR,

    RESET_STATES_RM_ACCION,
    RESET_STATES_RM_ACCION_EXITO,
    RESET_STATES_RM_ACCION_ERROR,

    DELETE_RM_ACCION,
    DELETE_RM_ACCION_EXITO,
    DELETE_RM_ACCION_ERROR

} from './types';



// cada reducer tiene su propio state
const initialState = {

    visibilidad: false,
    visibilidadNuevaAccion: false,
    rmAccionesListAPI: [],
    rmRegistrosListAPI: [],
    filaSeleccionada: '',
    guardarCambios: false,
    visibilidadModalInsertar: false,
    visibilidadModalEditar: false,
    visibilidadModalExito: false,
    error: null,
    accionCreada: '',
    loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {

        //********** DELETE RM_ACCION **********************************/ 

     
        case DELETE_RM_ACCION:
            return {
                ...state,
                loading: action.payload
            }
        
        case DELETE_RM_ACCION_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case DELETE_RM_ACCION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


     //********** MOSTRAR RM_ACCION API**********************************/ 


        case MOSTRAR_RM_ACCION:
            return {
                ...state,
                loading: action.payload
            }
        
        case MOSTRAR_RM_ACCION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                rmAccionesListAPI: action.payload

            }
        
        case MOSTRAR_RM_ACCION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
    

    //**********CAMBIAR ESTADO RM_TASKS **********************************/

            case CAMBIAR_ESTADO_RM_ACCION:
                return {
                    ...state,
                    loading: action.payload
                }
            
            case CAMBIAR_ESTADO_RM_ACCION_EXITO:
                return {
                    ...state,
                    loading: false,
                    [action.nombre]: action.payload
    
                }
            
            case CAMBIAR_ESTADO_RM_ACCION_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
    
                }




     //********** INSERTAR RM_ACCION **********************************/ 

     
         case INSERTAR_RM_ACCION:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_RM_ACCION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                accionCreada: action.payload

            }
        
        case INSERTAR_RM_ACCION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

    //********** UPDATE RM_ACCION **********************************/ 

     
         case UPDATE_RM_ACCION:
            return {
                ...state,
                loading: action.payload
            }
        
        case UPDATE_RM_ACCION_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case UPDATE_RM_ACCION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


      //**********  RESET_STATES_RM_ACCION **********************************


      case RESET_STATES_RM_ACCION:
        return {
            ...state,
            loading: action.payload
        }
    
    case RESET_STATES_RM_ACCION_EXITO:
        return {
            ...initialState,
            loading: false,
            error: null,
            

        }
    
    case RESET_STATES_RM_ACCION_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    
        default: 
            return state

    }

}