import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_SELECCION_GRID,
    CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ERROR,

    ELIMINAR_RM_ACCION,
    ELIMINAR_RM_ACCION_EXITO,
    ELIMINAR_RM_ACCION_ERROR,

    MOSTRAR_RM_ACCION,
    MOSTRAR_RM_ACCION_EXITO,
    MOSTRAR_RM_ACCION_ERROR,

    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_RM_ACCION_MODAL_INSERTAR,
    INSERTAR_RM_ACCION_MODAL_INSERTAR_EXITO,
    INSERTAR_RM_ACCION_MODAL_INSERTAR_ERROR,

    CONSULTA_RM_REGISTRO_MODAL_INSERTAR,
    CONSULTA_RM_REGISTRO_MODAL_INSERTAR_EXITO,
    CONSULTA_RM_REGISTRO_MODAL_INSERTAR_ERROR,

    MOSTRAR_MY_ACTIONS_RM_ACCION,
    MOSTRAR_MY_ACTIONS_RM_ACCION_EXITO,
    MOSTRAR_MY_ACTIONS_RM_ACCION_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {

        visibilidad: true,
        rmAccionesListAPI: [],
        rmAccionesListAPIHome: [],
        rmMisAccionesListAPI: [],
        rmRegistrosListAPI: [],
        filaSeleccionadaGrid: '',
        visibilidadModalInsertar: '',
        visibilidadModalEditar: '',
        visibilidadModalExito: '',
        error: null,
        loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {
        //********** MOSTRAR MY ACTIONS RM_ACCION API**********************************/ 


        case MOSTRAR_MY_ACTIONS_RM_ACCION:
            return {
                ...state,
                loading: action.payload
            }
        
        case MOSTRAR_MY_ACTIONS_RM_ACCION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                rmMisAccionesListAPI: action.payload

            }
        
        case MOSTRAR_MY_ACTIONS_RM_ACCION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

     //**********FILA SELECIONADA GRID **********************************/

         case CAMBIAR_VALOR_SELECCION_GRID:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGrid: action.payload

            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
            

     //********** ELIMINAR PROGRAMA **********************************/ 


     case ELIMINAR_RM_ACCION:
        return {
            ...state,
            loading: action.payload
        }
    
    case ELIMINAR_RM_ACCION_EXITO:
        return {
            ...state,
            loading: false,
            error: null
            

        }
    
    case ELIMINAR_RM_ACCION_ERROR:
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
                rmAccionesListAPIHome: action.payload

            }
        
        case MOSTRAR_RM_ACCION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
    
     //**********VISIBILIDAD MODAL INSERTAR**********************************/

       case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertar: action.payload

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        

      
     //********** INSERTAR RM_ACCION API MODAL INSERTAR**********************************/ 

     
        case INSERTAR_RM_ACCION_MODAL_INSERTAR:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_RM_ACCION_MODAL_INSERTAR_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case INSERTAR_RM_ACCION_MODAL_INSERTAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


      //********** MUESTRA RM_REGISTROS MODAL **********************************/ 


        case CONSULTA_RM_REGISTRO_MODAL_INSERTAR:
            return {
                ...state,
                loading: action.payload
            }
        
        case CONSULTA_RM_REGISTRO_MODAL_INSERTAR_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                rmRegistrosListAPI: action.payload

            }
        
        case CONSULTA_RM_REGISTRO_MODAL_INSERTAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}