import {

    MOSTRAR_CUSTOMER,
    MOSTRAR_CUSTOMER_EXITO,
    MOSTRAR_CUSTOMER_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER,
    CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_ERROR,

    PUT_CUSTOMER,
    PUT_CUSTOMER_EXITO,
    PUT_CUSTOMER_ERROR,

    INSERTAR_NEW_CUSTOMER,
    INSERTAR_NEW_CUSTOMER_EXITO,
    INSERTAR_NEW_CUSTOMER_ERROR,

    CAMBIAR_MODAL_NEW_CUSTOMER,
    CAMBIAR_MODAL_NEW_CUSTOMER_EXITO,
    CAMBIAR_MODAL_NEW_CUSTOMER_ERROR,

    CAMBIAR_MODAL_CUSTOMER_LOCATION,
    CAMBIAR_MODAL_CUSTOMER_LOCATION_EXITO,
    CAMBIAR_MODAL_CUSTOMER_LOCATION_ERROR,

    MOSTRAR_LOCATION_CUSTOMER,
    MOSTRAR_LOCATION_CUSTOMER_EXITO,
    MOSTRAR_LOCATION_CUSTOMER_ERROR,

    CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION,
    CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_EXITO,
    CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_LOCATION,
    CAMBIAR_VALOR_SELECCION_GRID_LOCATION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_LOCATION_ERROR,

    INSERTAR_NEW_CUSTOMER_LOCATION,
    INSERTAR_NEW_CUSTOMER_LOCATION_EXITO,
    INSERTAR_NEW_CUSTOMER_LOCATION_ERROR,

    PUT_CUSTOMER_LOCATION,
    PUT_CUSTOMER_LOCATION_EXITO,
    PUT_CUSTOMER_LOCATION_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
        customerListAPI:[],
        locationCustomerListAPI:[],
        filaSeleccionadaGrid: '',
        filaSeleccionadaGridLocation: '',
        error: null,
        loading: false,
        visibilidadNewCustomer: false,
        visibilidadLocationCustomer: false,
        visibilidadGestionLocationCustomer: false,
        modoDialogCustomer: '',
        modoDialogGestionLocations: ''
}


export default function(state = initialState, action) {

    switch(action.type) {

        //post LOCATION

        case INSERTAR_NEW_CUSTOMER_LOCATION:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_NEW_CUSTOMER_LOCATION_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case INSERTAR_NEW_CUSTOMER_LOCATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE LOCATION
    case PUT_CUSTOMER_LOCATION:
        return {
            ...state,
            loading: action.payload
        }
    
    case PUT_CUSTOMER_LOCATION_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }
    
    case PUT_CUSTOMER_LOCATION_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //**********VISIBILIDAD MODAL GESTIONES locations**********************************/
    case CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadGestionLocationCustomer: action.payload,
                modoDialogGestionLocations: action.modoDialogGestionLocations
            }
        
        case CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********VISIBILIDAD MODAL locations**********************************/
    case CAMBIAR_MODAL_CUSTOMER_LOCATION:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_CUSTOMER_LOCATION_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadLocationCustomer: action.payload
            }
        
        case CAMBIAR_MODAL_CUSTOMER_LOCATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********VISIBILIDAD MODAL INSERTAR**********************************/
    case CAMBIAR_MODAL_NEW_CUSTOMER:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_NEW_CUSTOMER_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadNewCustomer: action.payload,
                modoDialogCustomer: action.nombre
            }
        
        case CAMBIAR_MODAL_NEW_CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //post user

        case INSERTAR_NEW_CUSTOMER:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_NEW_CUSTOMER_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case INSERTAR_NEW_CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE CUSTOMER
    case PUT_CUSTOMER:
        return {
            ...state,
            loading: action.payload
        }
    
    case PUT_CUSTOMER_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }
    
    case PUT_CUSTOMER_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //********** MOSTRAR LOCATION CUSTOMER API**********************************/ 

    case MOSTRAR_LOCATION_CUSTOMER:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_LOCATION_CUSTOMER_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            locationCustomerListAPI: action.payload
        }
    
    case MOSTRAR_LOCATION_CUSTOMER_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //********** MOSTRAR CUSTOMER API**********************************/ 

    case MOSTRAR_CUSTOMER:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_CUSTOMER_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            customerListAPI: action.payload
        }
    
    case MOSTRAR_CUSTOMER_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    //**********FILA SELECIONADA GRID **********************************/

    case CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_EXITO:
        return {
            ...state,
            loading: false,
            filaSeleccionadaGrid: action.payload

        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //**********FILA SELECIONADA GRID LOCATION**********************************/

    case CAMBIAR_VALOR_SELECCION_GRID_LOCATION:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_LOCATION_EXITO:
        return {
            ...state,
            loading: false,
            filaSeleccionadaGridLocation: action.payload

        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_LOCATION_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default: 
            return state

    }

}