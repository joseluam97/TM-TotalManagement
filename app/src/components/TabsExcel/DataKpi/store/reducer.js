import {

    CAMBIAR_VALOR_TAB_KPI,
    CAMBIAR_VALOR_TAB_KPI_EXITO,
    CAMBIAR_VALOR_TAB_KPI_ERROR,

    CAMBIAR_VALOR_KPI_SELECCIONADO,
    CAMBIAR_VALOR_KPI_SELECCIONADO_EXITO,
    CAMBIAR_VALOR_KPI_SELECCIONADO_ERROR,

    CAMBIAR_VALOR_MISION_SELECCIONADO,
    CAMBIAR_VALOR_MISION_SELECCIONADO_EXITO,
    CAMBIAR_VALOR_MISION_SELECCIONADO_ERROR,

    CAMBIAR_VALOR_ANO_SELECCIONADO,
    CAMBIAR_VALOR_ANO_SELECCIONADO_EXITO,
    CAMBIAR_VALOR_ANO_SELECCIONADO_ERROR

} from './types';


// cada reducer tiene su propio state
const initialState = {
    valorTab: 'table',
    kpiSeleccionado: '',
    misionSeleccionado: '',
    anoSeleccionado: '',
    error: null,
    loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {
        case CAMBIAR_VALOR_ANO_SELECCIONADO:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_ANO_SELECCIONADO_EXITO:
            return {
                ...state,
                loading: false,
                anoSeleccionado: action.payload

            }
        
        case CAMBIAR_VALOR_ANO_SELECCIONADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        case CAMBIAR_VALOR_MISION_SELECCIONADO:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_MISION_SELECCIONADO_EXITO:
            return {
                ...state,
                loading: false,
                misionSeleccionado: action.payload

            }
        
        case CAMBIAR_VALOR_MISION_SELECCIONADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        case CAMBIAR_VALOR_KPI_SELECCIONADO:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_KPI_SELECCIONADO_EXITO:
            return {
                ...state,
                loading: false,
                kpiSeleccionado: action.payload

            }
        
        case CAMBIAR_VALOR_KPI_SELECCIONADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }  

        case CAMBIAR_VALOR_TAB_KPI:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_TAB_KPI_EXITO:
            return {
                ...state,
                loading: false,
                valorTab: action.payload

            }
        
        case CAMBIAR_VALOR_TAB_KPI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }    

        default: 
            return state

    }

}