import {

    CAMBIAR_VALOR_TAB_REQUERIMENTS,
    CAMBIAR_VALOR_TAB_REQUERIMENTS_EXITO,
    CAMBIAR_VALOR_TAB_REQUERIMENTS_ERROR,

    MOSTRAR_APP,
    MOSTRAR_APP_EXITO,
    MOSTRAR_APP_ERROR,

    PUT_APP,
    PUT_APP_EXITO,
    PUT_APP_ERROR,

    INSERTAR_NEW_APP,
    INSERTAR_NEW_APP_EXITO,
    INSERTAR_NEW_APP_ERROR,

    CAMBIAR_MODAL_INSERTAR_APLICATION,
    CAMBIAR_MODAL_INSERTAR_APLICATION_EXITO,
    CAMBIAR_MODAL_INSERTAR_APLICATION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_APLICATION,
    CAMBIAR_VALOR_SELECCION_GRID_APLICATION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_APLICATION_ERROR,

    MOSTRAR_TYPES_APP,
    MOSTRAR_TYPES_APP_EXITO,
    MOSTRAR_TYPES_APP_ERROR,

    MOSTRAR_GRUPOS_REQUERIMIENTOS,
    MOSTRAR_GRUPOS_REQUERIMIENTOS_EXITO,
    MOSTRAR_GRUPOS_REQUERIMIENTOS_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_GRUPO,
    CAMBIAR_VALOR_SELECCION_GRID_GRUPO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_GRUPO_ERROR,

    CAMBIAR_MODAL_INSERTAR_GRUPO,
    CAMBIAR_MODAL_INSERTAR_GRUPO_EXITO,
    CAMBIAR_MODAL_INSERTAR_GRUPO_ERROR,

    INSERTAR_NEW_GROUP,
    INSERTAR_NEW_GROUP_EXITO,
    INSERTAR_NEW_GROUP_ERROR,

    MOSTRAR_REQUERIMENTS_WITH_DETAILS,
    MOSTRAR_REQUERIMENTS_WITH_DETAILS_EXITO,
    MOSTRAR_REQUERIMENTS_WITH_DETAILS_ERROR,

    INSERTAR_REQUERIMENTS_WITH_DETAILS,
    INSERTAR_REQUERIMENTS_WITH_DETAILS_EXITO,
    INSERTAR_REQUERIMENTS_WITH_DETAILS_ERROR,

    CAMBIAR_ESTADO_VALUES_REQUERIMENTS,
    CAMBIAR_ESTADO_VALUES_REQUERIMENTS_EXITO,
    CAMBIAR_ESTADO_VALUES_REQUERIMENTS_ERROR,

    DELETE_REQUERIMENT,
    DELETE_REQUERIMENT_EXITO,
    DELETE_REQUERIMENT_ERROR,

    COMPROBAR_ITEM_LIST_REQUERIMENT,
    COMPROBAR_ITEM_LIST_REQUERIMENT_EXITO,
    COMPROBAR_ITEM_LIST_REQUERIMENT_ERROR,

    DELETE_GROUP_REQUERIMENT,
    DELETE_GROUP_REQUERIMENT_EXITO,
    DELETE_GROUP_REQUERIMENT_ERROR,

    PUT_GROUP_REQUERIMENTS,
    PUT_GROUP_REQUERIMENTS_EXITO,
    PUT_GROUP_REQUERIMENTS_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
    valorTabRequeriments: 'requeriments',
    listGruposAPI: [],
    listRequerimentsWithDetails: [],
    appListAPI: [],
    listTypesAppAPI: [],
    filaSeleccionadaGrid: '',
    filaSeleccionadaGridGrupo: '',
    visbilidadModalInsertar: false,
    modoDialogo: '',
    visbilidadModalInsertarGrupo: false,
    modoDialogoGrupo: '',
    newRequerimentsWithDetails: '',
    error: null,
    loading: false,
    esPosibleEliminarItemListRequeriment: '',
}


export default function (state = initialState, action) {

    switch (action.type) {

        //**********DELETE REQUERIMENTS **********************************/
        case DELETE_GROUP_REQUERIMENT:
            return {
                ...state,
                loading: action.payload
            }

        case DELETE_GROUP_REQUERIMENT_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case DELETE_GROUP_REQUERIMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********DELETE REQUERIMENTS **********************************/
        case COMPROBAR_ITEM_LIST_REQUERIMENT:
            return {
                ...state,
                loading: action.payload
            }

        case COMPROBAR_ITEM_LIST_REQUERIMENT_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                esPosibleEliminarItemListRequeriment: action.payload

            }

        case COMPROBAR_ITEM_LIST_REQUERIMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                esPosibleEliminarItemListRequeriment: 'error'

            }

        //**********DELETE REQUERIMENTS **********************************/
        case DELETE_REQUERIMENT:
            return {
                ...state,
                loading: action.payload
            }

        case DELETE_REQUERIMENT_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case DELETE_REQUERIMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR ESTADO RM_TASKS **********************************/

        case CAMBIAR_ESTADO_VALUES_REQUERIMENTS:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_ESTADO_VALUES_REQUERIMENTS_EXITO:
            return {
                ...state,
                loading: false,
                [action.nombre]: action.payload

            }

        case CAMBIAR_ESTADO_VALUES_REQUERIMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** ver mn**********************************/ 

        case MOSTRAR_REQUERIMENTS_WITH_DETAILS:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_REQUERIMENTS_WITH_DETAILS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listRequerimentsWithDetails: action.payload
            }

        case MOSTRAR_REQUERIMENTS_WITH_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

            //PUT GROUP REQUERIMENTS

        case PUT_GROUP_REQUERIMENTS:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_GROUP_REQUERIMENTS_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case PUT_GROUP_REQUERIMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //INSERTAR NUEVA APP

        case INSERTAR_NEW_GROUP:
            return {
                ...state,
                loading: action.payload
            }

        case INSERTAR_NEW_GROUP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case INSERTAR_NEW_GROUP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** GET TYPES**********************************/ 

        case MOSTRAR_GRUPOS_REQUERIMIENTOS:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_GRUPOS_REQUERIMIENTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listGruposAPI: action.payload
            }

        case MOSTRAR_GRUPOS_REQUERIMIENTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********FILA SELECIONADA GRID **********************************/

        case CAMBIAR_VALOR_TAB_REQUERIMENTS:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_TAB_REQUERIMENTS_EXITO:
            return {
                ...state,
                loading: false,
                valorTabRequeriments: action.payload

            }

        case CAMBIAR_VALOR_TAB_REQUERIMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** GET TYPES**********************************/ 

        case MOSTRAR_TYPES_APP:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_TYPES_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listTypesAppAPI: action.payload
            }

        case MOSTRAR_TYPES_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** ver mn**********************************/ 

        case CAMBIAR_VALOR_SELECCION_GRID_GRUPO:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_GRUPO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                filaSeleccionadaGridGrupo: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_GRUPO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** ver mn**********************************/ 

        case CAMBIAR_VALOR_SELECCION_GRID_APLICATION:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_APLICATION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                filaSeleccionadaGrid: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_APLICATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //INSERTAR NUEVA APP

        case INSERTAR_NEW_APP:
            return {
                ...state,
                loading: action.payload
            }

        case INSERTAR_NEW_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case INSERTAR_NEW_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE CUSTOMER
        case PUT_APP:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case PUT_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** ver mn**********************************/ 

        case MOSTRAR_APP:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                appListAPI: action.payload
            }

        case MOSTRAR_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** MOSTRAR CUSTOMER API**********************************/ 

        case CAMBIAR_MODAL_INSERTAR_GRUPO:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_MODAL_INSERTAR_GRUPO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                visbilidadModalInsertarGrupo: action.payload,
                modoDialogoGrupo: action.modoDialogo

            }

        case CAMBIAR_MODAL_INSERTAR_GRUPO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //********** MOSTRAR CUSTOMER API**********************************/ 

        case CAMBIAR_MODAL_INSERTAR_APLICATION:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_MODAL_INSERTAR_APLICATION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                visbilidadModalInsertar: action.payload,
                modoDialogo: action.modoDialogo

            }

        case CAMBIAR_MODAL_INSERTAR_APLICATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //INSERTAR NUEVA APP

        case INSERTAR_REQUERIMENTS_WITH_DETAILS:
            return {
                ...state,
                loading: action.payload
            }

        case INSERTAR_REQUERIMENTS_WITH_DETAILS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                newRequerimentsWithDetails: action.payload
            }

        case INSERTAR_REQUERIMENTS_WITH_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}