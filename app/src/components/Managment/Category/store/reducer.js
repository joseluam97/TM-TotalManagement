import {

    MOSTRAR_CATEGORY,
    MOSTRAR_CATEGORY_EXITO,
    MOSTRAR_CATEGORY_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_CATEGORY,
    CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_ERROR,

    PUT_CATEGORY,
    PUT_CATEGORY_EXITO,
    PUT_CATEGORY_ERROR,

    INSERTAR_NEW_CATEGORY,
    INSERTAR_NEW_CATEGORY_EXITO,
    INSERTAR_NEW_CATEGORY_ERROR,

    CAMBIAR_MODAL_NEW_CATEGORY,
    CAMBIAR_MODAL_NEW_CATEGORY_EXITO,
    CAMBIAR_MODAL_NEW_CATEGORY_ERROR,

    MOSTRAR_TIPOS_CATEGORIA,
    MOSTRAR_TIPOS_CATEGORIA_EXITO,
    MOSTRAR_TIPOS_CATEGORIA_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
        categoriaListAPI:[],
        tipoCategoriasAPI: [],
        filaSeleccionadaGrid: '',
        error: null,
        loading: false,
        visibilidadNewCategory: false,
        modoDialogCategoria: '',
}


export default function(state = initialState, action) {

    switch(action.type) {

        //**********GET TIPOS DE CATEGORIAS**********************************/
    case MOSTRAR_TIPOS_CATEGORIA:
        return {
            ...state,
            loading: action.payload
        }
        
        case MOSTRAR_TIPOS_CATEGORIA_EXITO:
            return {
                ...state,
                loading: false,
                tipoCategoriasAPI: action.payload
            }
        
        case MOSTRAR_TIPOS_CATEGORIA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********VISIBILIDAD MODAL INSERTAR**********************************/
    case CAMBIAR_MODAL_NEW_CATEGORY:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_NEW_CATEGORY_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadNewCategory: action.payload,
                modoDialogCategoria: action.nombre
            }
        
        case CAMBIAR_MODAL_NEW_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //post user

        case INSERTAR_NEW_CATEGORY:
            return {
                ...state,
                loading: action.payload
            }
        
        case INSERTAR_NEW_CATEGORY_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case INSERTAR_NEW_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE CATEGORY
    case PUT_CATEGORY:
        return {
            ...state,
            loading: action.payload
        }
    
    case PUT_CATEGORY_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }
    
    case PUT_CATEGORY_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

    //********** MOSTRAR CATEGORY API**********************************/ 

    case MOSTRAR_CATEGORY:
        return {
            ...state,
            loading: action.payload
        }
    
    case MOSTRAR_CATEGORY_EXITO:
        return {
            ...state,
            loading: false,
            error: null,
            categoriaListAPI: action.payload
        }
    
    case MOSTRAR_CATEGORY_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }
    //**********FILA SELECIONADA GRID **********************************/

    case CAMBIAR_VALOR_SELECCION_GRID_CATEGORY:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_EXITO:
        return {
            ...state,
            loading: false,
            filaSeleccionadaGrid: action.payload

        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default: 
            return state

    }

}