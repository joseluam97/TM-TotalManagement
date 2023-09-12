import {
    ELIMINAR_CONTRACT_USER,
    ELIMINAR_CONTRACT_USER_EXITO,
    ELIMINAR_CONTRACT_USER_ERROR,

    VER_MODAL_ASSIGNED_PEOPLE,
    VER_MODAL_ASSIGNED_PEOPLE_EXITO,
    VER_MODAL_ASSIGNED_PEOPLE_ERROR,

    GET_PEOPLE_CONTRATO,
    GET_PEOPLE_CONTRATO_EXITO,
    GET_PEOPLE_CONTRATO_ERROR,

    POST_PEOPLE_CONTRATO,
    POST_PEOPLE_CONTRATO_EXITO,
    POST_PEOPLE_CONTRATO_ERROR,

    GET_APP_SUB_MISION,
    GET_APP_SUB_MISION_EXITO,
    GET_APP_SUB_MISION_ERROR,

    GET_ALL_SUB_MISION,
    GET_ALL_SUB_MISION_EXITO,
    GET_ALL_SUB_MISION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION,
    CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_ERROR,

    VER_MODAL_INSERT_SUB_MISION,
    VER_MODAL_INSERT_SUB_MISION_EXITO,
    VER_MODAL_INSERT_SUB_MISION_ERROR,

    POST_SUB_MISION,
    POST_SUB_MISION_EXITO,
    POST_SUB_MISION_ERROR,

    PUT_SUB_MISION,
    PUT_SUB_MISION_EXITO,
    PUT_SUB_MISION_ERROR,

    PUT_PEOPLE_CONTRATO,
    PUT_PEOPLE_CONTRATO_EXITO,
    PUT_PEOPLE_CONTRATO_ERROR,

    VER_MODAL_ASSIGNED_APP,
    VER_MODAL_ASSIGNED_APP_EXITO,
    VER_MODAL_ASSIGNED_APP_ERROR,

    POST_CONTRACT_APP,
    POST_CONTRACT_APP_EXITO,
    POST_CONTRACT_APP_ERROR,

    ELIMINAR_CONTRACT_APP,
    ELIMINAR_CONTRACT_APP_EXITO,
    ELIMINAR_CONTRACT_APP_ERROR,

    GET_ALL_JOB,
    GET_ALL_JOB_EXITO,
    GET_ALL_JOB_ERROR,

    VER_MODAL_GESTION_TRABAJOS,
    VER_MODAL_GESTION_TRABAJOS_EXITO,
    VER_MODAL_GESTION_TRABAJOS_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
    listSubMisiones: [],
    visibilidadModalInsertarMision: false,
    visibilidadModalAssignedPeople: '',
    visibilidadModalAssignedApp: false,
    visibilidadModalGestionTrabajos: false,
    listPeopleContratoAPI: [],
    error: null,
    loading: false,
    filaSeleccionadaGrid: '',
    listContractApp: [],
    listJobSubMision: [],
    modoApertura: '',
    modoAperturaInsert: '',
    newSubMisionCreated: '',
    deleteUserSubMision: '' //SE VA A ALMACENAR EL ID DE LA SUBMISION PARA RECALCULAR
}

export default function (state = initialState, action) {

    switch (action.type) {

        //**********CAMBIAR VISIBILIDAD MODAL VER TRABAJOS ASIGNADOS A CONTRATOS**********************************/

        case VER_MODAL_GESTION_TRABAJOS:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_GESTION_TRABAJOS_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalGestionTrabajos: action.payload

            }

        case VER_MODAL_GESTION_TRABAJOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET JOB DE SUB MISION **********************************/

        case GET_ALL_JOB:
            return {
                ...state,
                loading: action.payload
            }

        case GET_ALL_JOB_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listJobSubMision: action.payload
            }

        case GET_ALL_JOB_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

    //**********FILA SELECIONADA GRID **********************************/

    case CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION:
        return {
            ...state,
            loading: action.payload
        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_EXITO:
        return {
            ...state,
            loading: false,
            filaSeleccionadaGrid: action.payload

        }
    
    case CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        case GET_ALL_SUB_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case GET_ALL_SUB_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listSubMisiones: action.payload
            }

        case GET_ALL_SUB_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

    //deleteee CONTRACT APP
    case ELIMINAR_CONTRACT_APP:
        return {
            ...state,
            loading: action.payload
        }

    case ELIMINAR_CONTRACT_APP_EXITO:
        return {
            ...state,
            loading: false,
            error: null

        }

    case ELIMINAR_CONTRACT_APP_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload

        }

        //deleteee
        case ELIMINAR_CONTRACT_USER:
            return {
                ...state,
                loading: action.payload
            }

        case ELIMINAR_CONTRACT_USER_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                deleteUserSubMision: action.payload
            }

        case ELIMINAR_CONTRACT_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB MISION**********************************/

        case VER_MODAL_INSERT_SUB_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_INSERT_SUB_MISION_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertarMision: action.payload,
                modoAperturaInsert: action.modoApertura

            }

        case VER_MODAL_INSERT_SUB_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR VISIBILIDAD MODAL VER APPS ASIGNADAS A CONTRATOS**********************************/

        case VER_MODAL_ASSIGNED_APP:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_ASSIGNED_APP_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalAssignedApp: action.payload

            }

        case VER_MODAL_ASSIGNED_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        //**********CAMBIAR VISIBILIDAD MODAL VER PERSONAS ASIGNADAS A CONTRATOS**********************************/

        case VER_MODAL_ASSIGNED_PEOPLE:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_ASSIGNED_PEOPLE_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalAssignedPeople: action.payload,
                modoApertura: action.modoApertura

            }

        case VER_MODAL_ASSIGNED_PEOPLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        //**********GET PERSONAS EN CONTRATO**********************************/

        case GET_PEOPLE_CONTRATO:
            return {
                ...state,
                loading: action.payload
            }

        case GET_PEOPLE_CONTRATO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listPeopleContratoAPI: action.payload
            }

        case GET_PEOPLE_CONTRATO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********PUT PEOPLE CONTRACT**********************************/

        case PUT_PEOPLE_CONTRATO:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_PEOPLE_CONTRATO_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case PUT_PEOPLE_CONTRATO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********PUT SUB MISION**********************************/

        case PUT_SUB_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_SUB_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case PUT_SUB_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

            //**********POST CONTRACT APP**********************************/

        case POST_CONTRACT_APP:
            return {
                ...state,
                loading: action.payload
            }

        case POST_CONTRACT_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case POST_CONTRACT_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********POST SUB MISION**********************************/

        case POST_SUB_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case POST_SUB_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                newSubMisionCreated: action.payload['id']
            }

        case POST_SUB_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********POST persona a contrato**********************************/

        case POST_PEOPLE_CONTRATO:
            return {
                ...state,
                loading: action.payload
            }

        case POST_PEOPLE_CONTRATO_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case POST_PEOPLE_CONTRATO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET PERSONAS EN CONTRATO**********************************/

        case GET_APP_SUB_MISION:
            return {
                ...state,
                loading: action.payload
            }

        case GET_APP_SUB_MISION_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listContractApp: action.payload
            }

        case GET_APP_SUB_MISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}