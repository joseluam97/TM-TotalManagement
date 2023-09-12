import {

    GET_CONTRATO_SERVICIO,
    GET_CONTRATO_SERVICIO_EXITO,
    GET_CONTRATO_SERVICIO_ERROR,

    POST_CONTRATO_SERVICIO,
    POST_CONTRATO_SERVICIO_EXITO,
    POST_CONTRATO_SERVICIO_ERROR,

    PUT_CONTRATO_SERVICIO,
    PUT_CONTRATO_SERVICIO_EXITO,
    PUT_CONTRATO_SERVICIO_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO,
    CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_ERROR,

    GET_LOCATIONS_MISION_CONTRACT,
    GET_LOCATIONS_MISION_CONTRACT_EXITO,
    GET_LOCATIONS_MISION_CONTRACT_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
    listContratoAPI: [],
    listLocationsMisionesAsociadas: [],
    filaSeleccionadaGrid: '',
    visibilidadModalInsertarContrato: false,
    error: null,
    loading: false,
    modo: '',
}

export default function(state = initialState, action) {

    switch(action.type) {

        //**********GET LOCATIONS DE MISIONES DE SERVICIOS**********************************/

        case GET_LOCATIONS_MISION_CONTRACT:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_LOCATIONS_MISION_CONTRACT_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listLocationsMisionesAsociadas: action.payload
            }
        
        case GET_LOCATIONS_MISION_CONTRACT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //**********VISIBILIDAD MODAL INSERTAR**********************************/

    case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertarContrato: action.payload,
                modo: action.modo

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        

        //**********FILA SELECIONADA GRID **********************************/

        case CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGrid: action.payload

            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

     //**********GET CONJUNTOS**********************************/

        case GET_CONTRATO_SERVICIO:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_CONTRATO_SERVICIO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listContratoAPI: action.payload
            }
        
        case GET_CONTRATO_SERVICIO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


     //**********POST CONJUNTO**********************************/

         case POST_CONTRATO_SERVICIO:
            return {
                ...state,
                loading: action.payload
            }
        
        case POST_CONTRATO_SERVICIO_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case POST_CONTRATO_SERVICIO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
            

     //********** PUT CONJUNTO **********************************/ 


     case PUT_CONTRATO_SERVICIO:
        return {
            ...state,
            loading: action.payload
        }
    
    case PUT_CONTRATO_SERVICIO_EXITO:
        return {
            ...state,
            loading: false,
            error: null
        }
    
    case PUT_CONTRATO_SERVICIO_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default: 
            return state

    }

}