import {

    // COMPONENTE PRINCIPAL ------------------


    GET_USER_APP,
    GET_USER_APP_EXITO,
    GET_USER_APP_ERROR,

    VER_MODAL_ANADIR_APP_PERSONA,
    VER_MODAL_ANADIR_APP_PERSONA_EXITO,
    VER_MODAL_ANADIR_APP_PERSONA_ERROR,

    GET_ALL_APP,
    GET_ALL_APP_EXITO,
    GET_ALL_APP_ERROR,

    POST_ASIGNAR_APP,
    POST_ASIGNAR_APP_EXITO,
    POST_ASIGNAR_APP_ERROR,

    GET_RESULT_USERAPP_BY_TEAM,
    GET_RESULT_USERAPP_BY_TEAM_EXITO,
    GET_RESULT_USERAPP_BY_TEAM_ERROR,

    VER_MODAL_VER_DETALLES_REQUERIMIENTOS,
    VER_MODAL_VER_DETALLES_REQUERIMIENTOS_EXITO,
    VER_MODAL_VER_DETALLES_REQUERIMIENTOS_ERROR,

    ITEM_SELECCIONADO_TEAM_REQUERIMENTS,
    ITEM_SELECCIONADO_TEAM_REQUERIMENTS_EXITO,
    ITEM_SELECCIONADO_TEAM_REQUERIMENTS_ERROR,

    DELETE_USER_APP,
    DELETE_USER_APP_EXITO,
    DELETE_USER_APP_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {

    valorTabPeople: 'miPersonal',
    verModalAnadirAppPersona: false,
    seleccionTableTeamRequeriment: '',
    verModalDetallesRequisitosUsuario: false,
    listUserApp: [],
    listApp: [],
    listResultUserAppByTeam: [],
    error: null,
    loading: false,
}

export default function (state = initialState, action) {

    switch (action.type) {

        //DELETE USER APP
        case DELETE_USER_APP:
            return {
                ...state,
                loading: action.payload
            }

        case DELETE_USER_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case DELETE_USER_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //ITEM SELECCIONADO EN TEAM REQUERIMENTS
        case ITEM_SELECCIONADO_TEAM_REQUERIMENTS:
            return {
                ...state,
                loading: action.payload
            }

        case ITEM_SELECCIONADO_TEAM_REQUERIMENTS_EXITO:
            return {
                ...state,
                loading: false,
                seleccionTableTeamRequeriment: action.payload

            }

        case ITEM_SELECCIONADO_TEAM_REQUERIMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //MODAL VER DATALLES DE REQUISITOS DE USUARIOS
        case VER_MODAL_VER_DETALLES_REQUERIMIENTOS:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_VER_DETALLES_REQUERIMIENTOS_EXITO:
            return {
                ...state,
                loading: false,
                verModalDetallesRequisitosUsuario: action.payload

            }

        case VER_MODAL_VER_DETALLES_REQUERIMIENTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET RESULT USER APP BY TEAM **********************************/

        case GET_RESULT_USERAPP_BY_TEAM:
            return {
                ...state,
                loading: action.payload
            }

        case GET_RESULT_USERAPP_BY_TEAM_EXITO:
            return {
                ...state,
                loading: false,
                listResultUserAppByTeam: action.payload

            }

        case GET_RESULT_USERAPP_BY_TEAM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********POST USER APP **********************************/

        case POST_ASIGNAR_APP:
            return {
                ...state,
                loading: action.payload
            }

        case POST_ASIGNAR_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case POST_ASIGNAR_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET ALL APP **********************************/

        case GET_ALL_APP:
            return {
                ...state,
                loading: action.payload
            }

        case GET_ALL_APP_EXITO:
            return {
                ...state,
                loading: false,
                listApp: action.payload

            }

        case GET_ALL_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET USER APP **********************************/

        case GET_USER_APP:
            return {
                ...state,
                loading: action.payload
            }

        case GET_USER_APP_EXITO:
            return {
                ...state,
                loading: false,
                listUserApp: action.payload

            }

        case GET_USER_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //MODAL ANADIR PERSONAL
        case VER_MODAL_ANADIR_APP_PERSONA:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_ANADIR_APP_PERSONA_EXITO:
            return {
                ...state,
                loading: false,
                verModalAnadirAppPersona: action.payload

            }

        case VER_MODAL_ANADIR_APP_PERSONA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}
