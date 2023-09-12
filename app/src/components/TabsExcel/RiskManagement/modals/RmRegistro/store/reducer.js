import {

    // COMPONENTE PRINCIPAL ------------------

    CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY,
    CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_ERROR,

    ELIMINAR_RM_REGISTRO,
    ELIMINAR_RM_REGISTRO_EXITO,
    ELIMINAR_RM_REGISTRO_ERROR,

    MOSTRAR_RM_REGISTRO,
    MOSTRAR_RM_REGISTRO_EXITO,
    MOSTRAR_RM_REGISTRO_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL,
    CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_ERROR,

    CAMBIAR_ESTADO_RM_REGISTRO,
    CAMBIAR_ESTADO_RM_REGISTRO_EXITO,
    CAMBIAR_ESTADO_RM_REGISTRO_ERROR,

    UPDATE_RM_REGISTRO,
    UPDATE_RM_REGISTRO_EXITO,
    UPDATE_RM_REGISTRO_ERROR,

    RESET_STATES_RM_REGISTRO,
    RESET_STATES_RM_REGISTRO_EXITO,
    RESET_STATES_RM_REGISTRO_ERROR,


    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_RM_REGISTRO_MODAL_INSERTAR,
    INSERTAR_RM_REGISTRO_MODAL_INSERTAR_EXITO,
    INSERTAR_RM_REGISTRO_MODAL_INSERTAR_ERROR,

    CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR,
    CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO,
    CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_HISTORICO,
    CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_ERROR,

    CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA,
    CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_EXITO,
    CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_ERROR,

    MOSTRAR_RM_REGISTRO_LAST_VERSION,
    MOSTRAR_RM_REGISTRO_LAST_VERSION_EXITO,
    MOSTRAR_RM_REGISTRO_LAST_VERSION_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {

        visibilidad: true,
        ultimoIdCreado: '',
        rmRegistrosListAPI: [],
        rmRegistrosListLastVersionAPI: [],
        riskManagementListAPI: [],
        listOrganigramaRiskOportunitys: [],
        filaSeleccionadaGrid: '',
        rellenarCamposReevaluar: '',
        rev: '',
        modo: '',
        visibilidadModalInsertar: '',
        visibilidadModalEditar: '',
        visibilidadModalExito: '',
        visibilidadModalPrincipal: '',
        visibilidadModalRevision: '',
        visibilidadModalHistorico: '',
        error: null,
        loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {

    //********** MOSTRAR RM_REGISTRO FILTER API**********************************/ 


    case MOSTRAR_RM_REGISTRO_LAST_VERSION:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_RM_REGISTRO_LAST_VERSION_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            rmRegistrosListLastVersionAPI: action.payload

        }
    
    case MOSTRAR_RM_REGISTRO_LAST_VERSION_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //**********ORGANIGRAMA DE RISK OPORTUNITY**********************************/

    case CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA:
        return {
            ...state,
            loading: action.payload
        }
        
        case CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_EXITO:
            return {
                ...state,
                loading: false,
                listOrganigramaRiskOportunitys: action.payload

            }
        
        case CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

    //**********VISIBILIDAD MODAL INSERTAR**********************************/

    case CAMBIAR_MODAL_VISIBILIDAD_HISTORICO:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalHistorico: action.payload

            }
        
        case CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        
    //**********CAMBIAR ESTADO RM_TASKS **********************************/

    case  CAMBIAR_ESTADO_RM_REGISTRO:
        return {
            ...state,
            loading: action.payload
        }
    
    case  CAMBIAR_ESTADO_RM_REGISTRO_EXITO:
        return {
            ...state,
            loading: false,
            [action.nombre]: action.payload

        }
    
    case  CAMBIAR_ESTADO_RM_REGISTRO_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

     //**********FILA SELECIONADA GRID **********************************/

         case CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGrid: action.payload

            }
        
        case CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
            

     //********** ELIMINAR RM REGISTRO **********************************/ 


     case ELIMINAR_RM_REGISTRO:
        return {
            ...state,
            loading: action.payload
        }
    
    case ELIMINAR_RM_REGISTRO_EXITO:
        return {
            ...state,
            loading: false,
            error: null
            

        }
    
    case ELIMINAR_RM_REGISTRO_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }


     //********** MOSTRAR RM_REGISTRO API**********************************/ 


        case MOSTRAR_RM_REGISTRO:
            return {
                ...state,
                loading: action.payload
            }
        
        case MOSTRAR_RM_REGISTRO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                rmRegistrosListAPI: action.payload

            }
        
        case MOSTRAR_RM_REGISTRO_ERROR:
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
        

       //**********VISIBILIDAD MODAL PRINCIPAL**********************************/

         case CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL:
            return {
                ...state,
                loading: action.payload
            }
            
            case CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_EXITO:
                return {
                    ...state,
                    loading: false,
                    visibilidadModalPrincipal: action.payload
    
                }
            
            case CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
    
                }

      
     //********** INSERTAR RM_REGISTRO API MODAL INSERTAR**********************************/ 

     
        case INSERTAR_RM_REGISTRO_MODAL_INSERTAR:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_RM_REGISTRO_MODAL_INSERTAR_EXITO:
            return {
                ...state,
                loading: false,
                ultimoIdCreado: action.payload,
                error: null

            }
        
        case INSERTAR_RM_REGISTRO_MODAL_INSERTAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


      //********** MUESTRA RISK_MANAGEMENT MODAL **********************************/ 


        case CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR:
            return {
                ...state,
                loading: action.payload
            }
        
        case CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                riskManagementListAPI: action.payload

            }
        
        case CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


     //********** UPDATE RM_REGISTRO **********************************/ 

     
            case UPDATE_RM_REGISTRO:
                return {
                    ...state,
                    loading: action.payload
                }
            
            case UPDATE_RM_REGISTRO_EXITO:
                return {
                    ...state,
                    loading: false,
                    error: null
    
                }
            
            case UPDATE_RM_REGISTRO_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
    
                }


           //**********  RESET_STATES_RM_REGISTRO **********************************


            case RESET_STATES_RM_REGISTRO:
                return {
                    ...state,
                    loading: action.payload
                }
            
            case RESET_STATES_RM_REGISTRO_EXITO:
                return {
                    ...initialState,
                    loading: false,
                    error: null,
                    

                }
            
            case RESET_STATES_RM_REGISTRO_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload

                }
        default: 
            return state

    }

}