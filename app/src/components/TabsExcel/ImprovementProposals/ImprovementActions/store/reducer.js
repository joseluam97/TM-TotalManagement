import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_SELECCION_GRID_ACTION,
    CAMBIAR_VALOR_SELECCION_GRID_ACTION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ACTION_ERROR,

    ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS,
    ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR,

    MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS,
    MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR,

    UPDATE_ACTION_IMPROVEMENT_PROPOSALS,
    UPDATE_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    UPDATE_ACTION_IMPROVEMENT_PROPOSALS_ERROR,

    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_ACTIONS,
    CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_ERROR,

    POST_ACTION_IMPROVEMENT_PROPOSALS,
    POST_ACTION_IMPROVEMENT_PROPOSALS_EXITO,
    POST_ACTION_IMPROVEMENT_PROPOSALS_ERROR



} from './types';


// cada reducer tiene su propio state
const initialState = {

        actionImprovementProposalsListAPI: [],
        filaSeleccionadaGridActionsImprovement: '',
        visibilidadModalInsertar: '',
        visibilidadModalAction: '',
        modo: '',
        resetStatesLocal: false,
        error: null,
        loading: false,
        accionAlterada: 'inicio'
}

export default function(state = initialState, action) {

    switch(action.type) {

        //********** POST ACTION IMPROVEMENT PROPOSALS**********************************/ 


     case POST_ACTION_IMPROVEMENT_PROPOSALS:
        return {
            ...state,
            loading: action.payload
        }
    
    case POST_ACTION_IMPROVEMENT_PROPOSALS_EXITO:
        return {
            ...state,
            loading: action.payload,
            accionAlterada: action.accionAlterada,
            error: null

        }
    
    case POST_ACTION_IMPROVEMENT_PROPOSALS_ERROR:
        return {
            ...state,
            loading: action.payload,
            error: true

        }

        //**********VISIBILIDAD MODAL INSERTAR**********************************/

       case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertar: action.payload,
                modo: action.modo

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ACTION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

     //**********FILA SELECIONADA GRID **********************************/

         case CAMBIAR_VALOR_SELECCION_GRID_ACTION:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_ACTION_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGridActionsImprovement: action.payload

            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_ACTION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
    
            

     //********** ELIMINAR RISK MANAGEMENT **********************************/ 


     case ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS:
        return {
            ...state,
            loading: action.payload
        }
    
    case ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO:
        return {
            ...state,
            loading: action.payload,
            accionAlterada: action.accionAlterada,
            error: null
            

        }
    
    case ELIMINAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR:
        return {
            ...state,
            loading: action.payload,
            error: true

        }


     //********** MOSTRAR ACTION_IMPROVEMENT_PROPOSALS API**********************************/ 


        case MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS:
            return {
                ...state,
                loading: action.payload
            }
        
        case MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                actionImprovementProposalsListAPI: action.payload

            }
        
        case MOSTRAR_ACTION_IMPROVEMENT_PROPOSALS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
    
     //**********VISIBILIDAD MODAL actions**********************************/

       case CAMBIAR_MODAL_VISIBILIDAD_ACTIONS:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalAction: action.payload

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_ACTIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

      //********** UPDATE RM_ACTION_IMPROVEMENT_PROPOSALS **********************************/ 

     
        case UPDATE_ACTION_IMPROVEMENT_PROPOSALS:
            return {
                ...state,
                loading: action.payload
            }
        
        case UPDATE_ACTION_IMPROVEMENT_PROPOSALS_EXITO:
            return {
                ...state,
                loading: false,
                accionAlterada: action.accionAlterada,
                error: null

            }
        
        case UPDATE_ACTION_IMPROVEMENT_PROPOSALS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}
