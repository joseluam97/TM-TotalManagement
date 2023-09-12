import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_SELECCION_GRID,
    CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ERROR,

    ELIMINAR_IMPROVEMENT_PROPOSALS,
    ELIMINAR_IMPROVEMENT_PROPOSALS_EXITO,
    ELIMINAR_IMPROVEMENT_PROPOSALS_ERROR,

    MOSTRAR_IMPROVEMENT_PROPOSALS,
    MOSTRAR_IMPROVEMENT_PROPOSALS_EXITO,
    MOSTRAR_IMPROVEMENT_PROPOSALS_ERROR,

    CAMBIAR_STATE_INSERTADORISKMANAGEMENT,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_EXITO,
    CAMBIAR_STATE_INSERTADORISKMANAGEMENT_ERROR,

    UPDATE_IMPROVEMENT_PROPOSALS,
    UPDATE_IMPROVEMENT_PROPOSALS_EXITO,
    UPDATE_IMPROVEMENT_PROPOSALS_ERROR,

    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR,
    INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_EXITO,
    INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_ERROR,

    CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS,
    CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_EXITO,
    CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_ERROR



} from './types';


// cada reducer tiene su propio state
const initialState = {

        improvementProposalsListAPI: [],
        filaSeleccionadaGrid: '',
        visibilidadModalInsertar: '',
        modo: '',
        resetStatesLocal: false,
        error: null,
        loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {

     //**********CAMBIAR ESTADO RISK MANAGEMENT **********************************/

    case  CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS:
        return {
            ...state,
            loading: action.payload
        }
    
    case  CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_EXITO:
        return {
            ...state,
            loading: false,
            [action.nombre]: action.payload

        }
    
    case  CAMBIAR_ESTADO_IMPROVEMENT_PROPOSALS_ERROR:
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


     case ELIMINAR_IMPROVEMENT_PROPOSALS:
        return {
            ...state,
            loading: action.payload
        }
    
    case ELIMINAR_IMPROVEMENT_PROPOSALS_EXITO:
        return {
            ...state,
            loading: action.payload,
            error: null
            

        }
    
    case ELIMINAR_IMPROVEMENT_PROPOSALS_ERROR:
        return {
            ...state,
            loading: action.payload,
            error: true

        }


     //********** MOSTRAR IMPROVEMENT_PROPOSALS API**********************************/ 


        case MOSTRAR_IMPROVEMENT_PROPOSALS:
            return {
                ...state,
                loading: action.payload
            }
        
        case MOSTRAR_IMPROVEMENT_PROPOSALS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                improvementProposalsListAPI: action.payload

            }
        
        case MOSTRAR_IMPROVEMENT_PROPOSALS_ERROR:
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
                visibilidadModalInsertar: action.payload,
                modo: action.modo

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        

      
     //********** INSERTAR IMPROVEMENT_PROPOSALS API MODAL INSERTAR**********************************/ 


        case INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_EXITO:
            return {
                ...state,
                loading: false,
                ultimoIdCreado:action.payload,
                insertadoRiskManagement: true,
                error: null

            }
        
        case INSERTAR_IMPROVEMENT_PROPOSALS_MODAL_INSERTAR_ERROR:
            return {
                ...state,
                loading: action.payload,
                error: true

            }

      //********** UPDATE RM_IMPROVEMENT_PROPOSALS **********************************/ 

     
        case UPDATE_IMPROVEMENT_PROPOSALS:
            return {
                ...state,
                loading: action.payload
            }
        
        case UPDATE_IMPROVEMENT_PROPOSALS_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case UPDATE_IMPROVEMENT_PROPOSALS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}
