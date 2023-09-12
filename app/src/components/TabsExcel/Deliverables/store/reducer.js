import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES,
    CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_ERROR,

    MOSTRAR_DELIVERABLES,
    MOSTRAR_DELIVERABLES_EXITO,
    MOSTRAR_DELIVERABLES_ERROR,

    UPDATE_DELIVERABLES,
    UPDATE_DELIVERABLES_EXITO,
    UPDATE_DELIVERABLES_ERROR,

    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_ERROR,

    INSERTAR_DELIVERABLES,
    INSERTAR_DELIVERABLES_EXITO,
    INSERTAR_DELIVERABLES_ERROR,

    ELIMINAR_DELIVERABLE,
    ELIMINAR_DELIVERABLE_EXITO,
    ELIMINAR_DELIVERABLE_ERROR,



} from './types';


// cada reducer tiene su propio state
const initialState = {

    deliverableListAPI: [],
    filaSeleccionadaGrid: '',
    visibilidadModalInsertar: false,
    modo: '',
    resetStatesLocal: false,
    error: null,
    loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {

        //********** DELETE DELIVERABLE **********************************/ 

     
        case ELIMINAR_DELIVERABLE:
            return {
                ...state,
                loading: action.payload
            }
        
        case ELIMINAR_DELIVERABLE_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case ELIMINAR_DELIVERABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
     //**********FILA SELECIONADA GRID **********************************/

         case CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGrid: action.payload

            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_DELIVERABLES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


     //********** MOSTRAR IMPROVEMENT_PROPOSALS API**********************************/ 


        case MOSTRAR_DELIVERABLES:
            return {
                ...state,
                loading: action.payload
            }
        
        case MOSTRAR_DELIVERABLES_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                deliverableListAPI: action.payload

            }
        
        case MOSTRAR_DELIVERABLES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
    
     //**********VISIBILIDAD MODAL INSERTAR**********************************/

       case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertar: action.payload,
                modo: action.modo

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_DELIVERABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        

      
     //********** INSERTAR IMPROVEMENT_PROPOSALS API MODAL INSERTAR**********************************/ 


        case INSERTAR_DELIVERABLES:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_DELIVERABLES_EXITO:
            return {
                ...state,
                loading: false,
                ultimoIdCreado:action.payload,
                insertadoRiskManagement: true,
                error: null

            }
        
        case INSERTAR_DELIVERABLES_ERROR:
            return {
                ...state,
                loading: action.payload,
                error: true

            }

      //********** UPDATE RM_IMPROVEMENT_PROPOSALS **********************************/ 

     
        case UPDATE_DELIVERABLES:
            return {
                ...state,
                loading: action.payload
            }
        
        case UPDATE_DELIVERABLES_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }
        
        case UPDATE_DELIVERABLES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default: 
            return state

    }

}
