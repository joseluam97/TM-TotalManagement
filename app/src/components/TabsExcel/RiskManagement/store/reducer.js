import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_SELECCION_GRID,
    CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ERROR,

    ELIMINAR_RISK_MANAGEMENT,
    ELIMINAR_RISK_MANAGEMENT_EXITO,
    ELIMINAR_RISK_MANAGEMENT_ERROR,

    MOSTRAR_RISK_MANAGEMENT,
    MOSTRAR_RISK_MANAGEMENT_EXITO,
    MOSTRAR_RISK_MANAGEMENT_ERROR,

    CAMBIAR_STATE_INSERTADORISKMANAGEMENT,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_EXITO,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_ERROR,

    UPDATE_RISK_MANAGEMENT,
    UPDATE_RISK_MANAGEMENT_EXITO,
    UPDATE_RISK_MANAGEMENT_ERROR,

    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR,
    INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO,
    INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR,

    CAMBIAR_ESTADO_RISK_MANAGEMENT,
    CAMBIAR_ESTADO_RISK_MANAGEMENT_EXITO,
    CAMBIAR_ESTADO_RISK_MANAGEMENT_ERROR



} from './types';


// cada reducer tiene su propio state
const initialState = {

        riskManagementListAPI: [],
        ultimoIdCreado: '',
        filaSeleccionadaGrid: '',
        visibilidadModalInsertar: '',
        visibilidadModalEditar: '',
        visibilidadModalExito: '',
        visibilidadModalEliminar: '',
        origenEliminar: '',
        insertadoRiskManagement: false,
        resetStatesLocal: false,
        error: null,
        loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {

     //**********CAMBIAR ESTADO RISK MANAGEMENT **********************************/

    case  CAMBIAR_ESTADO_RISK_MANAGEMENT:
        return {
            ...state,
            loading: action.payload
        }
    
    case  CAMBIAR_ESTADO_RISK_MANAGEMENT_EXITO:
        return {
            ...state,
            loading: false,
            [action.nombre]: action.payload

        }
    
    case  CAMBIAR_ESTADO_RISK_MANAGEMENT_ERROR:
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

     //*********CAMBIAR STATE INSERTADORISKMANAGEMENT **********************************/

     case CAMBIAR_STATE_INSERTADORISKMANAGEMENT:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_STATE_INSERTADORISKMANAGEMENT_EXITO:
        return {
            ...state,
            loading: false,
            insertadoRiskManagement: action.payload

        }
    
    case CAMBIAR_STATE_INSERTADORISKMANAGEMENT_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    
            

     //********** ELIMINAR RISK MANAGEMENT **********************************/ 


     case ELIMINAR_RISK_MANAGEMENT:
        return {
            ...state,
            loading: action.payload
        }
    
    case ELIMINAR_RISK_MANAGEMENT_EXITO:
        return {
            ...state,
            loading: action.payload,
            error: null
            

        }
    
    case ELIMINAR_RISK_MANAGEMENT_ERROR:
        return {
            ...state,
            loading: action.payload,
            error: true

        }


     //********** MOSTRAR RISK_MANAGEMENT API**********************************/ 


        case MOSTRAR_RISK_MANAGEMENT:
            return {
                ...state,
                loading: action.payload
            }
        
        case MOSTRAR_RISK_MANAGEMENT_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                riskManagementListAPI: action.payload

            }
        
        case MOSTRAR_RISK_MANAGEMENT_ERROR:
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
        

      
     //********** INSERTAR RISK_MANAGEMENT API MODAL INSERTAR**********************************/ 


        case INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO:
            return {
                ...state,
                loading: false,
                ultimoIdCreado:action.payload,
                insertadoRiskManagement: true,
                error: null

            }
        
        case INSERTAR_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR:
            return {
                ...state,
                loading: action.payload,
                error: true

            }


      //********** UPDATE RM_RISK_MANAGEMENT **********************************/ 

     
        case UPDATE_RISK_MANAGEMENT:
            return {
                ...state,
                loading: action.payload
            }
        
        case UPDATE_RISK_MANAGEMENT_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case UPDATE_RISK_MANAGEMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}
