import {

    MOSTRAR_PETICIONES_REQUERIMIENTOS,
    MOSTRAR_PETICIONES_REQUERIMIENTOS_EXITO,
    MOSTRAR_PETICIONES_REQUERIMIENTOS_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO,
    CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_ERROR,

    PUT_PETICION_REQUERIMIENTO,
    PUT_PETICION_REQUERIMIENTO_EXITO,
    PUT_PETICION_REQUERIMIENTO_ERROR,

    INSERTAR_NEW_PETICION_REQUERIMIENTO,
    INSERTAR_NEW_PETICION_REQUERIMIENTO_EXITO,
    INSERTAR_NEW_PETICION_REQUERIMIENTO_ERROR,

    CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO,
    CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_EXITO,
    CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
        peticionesRequerimientoListAPI:[],
        filaSeleccionadaGrid: '',
        error: null,
        loading: false,
        visibilidadNewPeticionesRequerimiento: false,
        modoDialogPeticionesRequerimiento: '',
}


export default function(state = initialState, action) {

    switch(action.type) {

        //**********VISIBILIDAD MODAL INSERTAR**********************************/
    case CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadNewPeticionesRequerimiento: action.payload,
                modoDialogPeticionesRequerimiento: action.nombre
            }
        
        case CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //post user

        case INSERTAR_NEW_PETICION_REQUERIMIENTO:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_NEW_PETICION_REQUERIMIENTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case INSERTAR_NEW_PETICION_REQUERIMIENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE CATEGORY
    case PUT_PETICION_REQUERIMIENTO:
        return {
            ...state,
            loading: action.payload
        }
    
    case PUT_PETICION_REQUERIMIENTO_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }
    
    case PUT_PETICION_REQUERIMIENTO_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //********** MOSTRAR CATEGORY API**********************************/ 

    case MOSTRAR_PETICIONES_REQUERIMIENTOS:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_PETICIONES_REQUERIMIENTOS_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            peticionesRequerimientoListAPI: action.payload
        }
    
    case MOSTRAR_PETICIONES_REQUERIMIENTOS_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    //**********FILA SELECIONADA GRID **********************************/

    case CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_EXITO:
        return {
            ...state,
            loading: false,
            filaSeleccionadaGrid: action.payload

        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default: 
            return state

    }

}