import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_TAB_PEOPLE,
    CAMBIAR_VALOR_TAB_PEOPLE_EXITO,
    CAMBIAR_VALOR_TAB_PEOPLE_ERROR,

    VER_MODAL_SOLICITAR_PERSONAL,
    VER_MODAL_SOLICITAR_PERSONAL_EXITO,
    VER_MODAL_SOLICITAR_PERSONAL_ERROR,

    GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION,
    GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_EXITO,
    GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_ERROR,

    SET_MEMBER_SELECT_PEOPLE,
    SET_MEMBER_SELECT_PEOPLE_EXITO,
    SET_MEMBER_SELECT_PEOPLE_ERROR,

    GET_MY_MANAGER,
    GET_MY_MANAGER_EXITO,
    GET_MY_MANAGER_ERROR,

    SET_SUB_MISION_ESTRUCTURA_SELECCIONADA,
    SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_EXITO,
    SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_ERROR,


} from './types';


// cada reducer tiene su propio state
const initialState = {

    valorTabPeople: 'miPersonalNew',
    setSubMisionSeleccionadaEstructura: {},
    verModalSolicitudPersonal: false,
    error: null,
    loading: false,
    listNotificactions: [],
    listMyManager: [],
    listResponsablesSubMision: [],
    memberSelectSubMision: ''
}

export default function(state = initialState, action) {

    switch(action.type) {

        //**********GET ESTRUCTURA PERSONAL SECUNDARIA **********************************/

        case SET_SUB_MISION_ESTRUCTURA_SELECCIONADA:
            return {
                ...state,
                loading: action.payload
            }
        
        case SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                setSubMisionSeleccionadaEstructura: action.payload
            }
        
        case SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET MANAGER **********************************/

        case GET_MY_MANAGER:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_MY_MANAGER_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listMyManager: action.payload
            }
        
        case GET_MY_MANAGER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********FILA SELECIONADA MEMBER DE PEOPLE **********************************/

        case SET_MEMBER_SELECT_PEOPLE:
            return {
                ...state,
                loading: action.payload
            }
        
        case SET_MEMBER_SELECT_PEOPLE_EXITO:
            return {
                ...state,
                loading: false,
                memberSelectSubMision: action.payload

            }
        
        case SET_MEMBER_SELECT_PEOPLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********FILA SELECIONADA GRID **********************************/

        case GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION:
            return {
                ...state,
                loading: action.payload
            }
        
        case GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_EXITO:
            return {
                ...state,
                loading: false,
                listResponsablesSubMision: action.payload

            }
        
        case GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


     //**********FILA SELECIONADA GRID **********************************/

         case CAMBIAR_VALOR_TAB_PEOPLE:
            return {
                ...state,
                loading: action.payload
            }
        
        case CAMBIAR_VALOR_TAB_PEOPLE_EXITO:
            return {
                ...state,
                loading: false,
                valorTabPeople: action.payload

            }
        
        case CAMBIAR_VALOR_TAB_PEOPLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //MODAL SOLICITUD DE PERSONAL
        case VER_MODAL_SOLICITAR_PERSONAL:
            return {
                ...state,
                loading: action.payload
            }
        
        case VER_MODAL_SOLICITAR_PERSONAL_EXITO:
            return {
                ...state,
                loading: false,
                verModalSolicitudPersonal: action.payload

            }
        
        case VER_MODAL_SOLICITAR_PERSONAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

            

        default: 
            return state

    }

}
