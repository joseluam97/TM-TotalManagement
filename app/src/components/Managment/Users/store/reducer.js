import {

    MOSTRAR_USER,
    MOSTRAR_USER_EXITO,
    MOSTRAR_USER_ERROR,

    SESION_USER,
    SESION_USER_EXITO,
    SESION_USER_ERROR,

    PERMISOS_SESION_USER,
    PERMISOS_SESION_USER_EXITO,
    PERMISOS_SESION_USER_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_USER,
    CAMBIAR_VALOR_SELECCION_GRID_USER_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_USER_ERROR,

    OBTENER_CONTRATOS_USER,
    OBTENER_CONTRATOS_USER_EXITO,
    OBTENER_CONTRATOS_USER_EXITO_RESPALDO,
    OBTENER_CONTRATOS_USER_ERROR,

    MOSTRAR_USER_PERMISOS,
    MOSTRAR_USER_PERMISOS_EXITO,
    MOSTRAR_USER_PERMISOS_ERROR,

    PUT_USER,
    PUT_USER_EXITO,
    PUT_USER_ERROR,

    INSERTAR_NEW_USER,
    INSERTAR_NEW_USER_EXITO,
    INSERTAR_NEW_USER_ERROR,

    MOSTRAR_USER_PERMISOS_BY_GROUP,
    MOSTRAR_USER_PERMISOS_BY_GROUP_EXITO,
    MOSTRAR_USER_PERMISOS_BY_GROUP_ERROR,

    MOSTRAR_ALL_USER,
    MOSTRAR_ALL_USER_EXITO,
    MOSTRAR_ALL_USER_ERROR,

    PUT_PASSWORD_USER_MANUAL,
    PUT_PASSWORD_USER_MANUAL_EXITO,
    PUT_PASSWORD_USER_MANUAL_ERROR,

    GET_BLOQUES_HEREDADOS,
    GET_BLOQUES_HEREDADOS_EXITO,
    GET_BLOQUES_HEREDADOS_ERROR,

    OBTENER_SUB_MISION_DIRECTAS,
    OBTENER_SUB_MISION_DIRECTAS_EXITO,
    OBTENER_SUB_MISION_DIRECTAS_ERROR,

    OBTENER_MISION_DIRECTAS,
    OBTENER_MISION_DIRECTAS_EXITO,
    OBTENER_MISION_DIRECTAS_ERROR,

    OBTENER_WP_DIRECTAS,
    OBTENER_WP_DIRECTAS_EXITO,
    OBTENER_WP_DIRECTAS_ERROR,

    OBTENER_DEPARTAMENTOS_DIRECTAS,
    OBTENER_DEPARTAMENTOS_DIRECTAS_EXITO,
    OBTENER_DEPARTAMENTOS_DIRECTAS_ERROR,

    OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS,
    OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_EXITO,
    OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_ERROR,

    CAMBIAR_MODAL_NEW_USER,
    CAMBIAR_MODAL_NEW_USER_EXITO,
    CAMBIAR_MODAL_NEW_USER_ERROR,

    CAMBIAR_MODAL_INSERT_PERMISSIONS,
    CAMBIAR_MODAL_INSERT_PERMISSIONS_EXITO,
    CAMBIAR_MODAL_INSERT_PERMISSIONS_ERROR

} from './types';


// cada reducer tiene su propio state
const initialState = {
    subMisionesDirectas: [],
    misionesDirectas: [],
    WPDirectas: [],
    departamentosDirectas: [],
    direccionDepartamenalDirectas: [],
    listBloquesHeredadosUser: {},
    usersListAPI: [],
    allUsersListAPI: [],
    contractUserListAPI: [],
    contractUserListAPIRespaldo: [],
    filaSeleccionadaGrid: '',
    error: null,
    loading: false,
    person: {},
    personPermisos: [],
    permisosName: [],
    permisosByGroup: [],
    nuevoUsuarioCreado: {},
    visibilidadNewUser: false,
    modoDialogUser: '',
    visibilidadInsertPermissions: false
}


export default function (state = initialState, action) {

    switch (action.type) {

        //**********VISIBILIDAD MODAL INSERTAR PERMISOS**********************************/
    case CAMBIAR_MODAL_INSERT_PERMISSIONS:
        return {
            ...state,
            loading: action.payload
        }
        
        case CAMBIAR_MODAL_INSERT_PERMISSIONS_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadInsertPermissions: action.payload
            }
        
        case CAMBIAR_MODAL_INSERT_PERMISSIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        
        //**********VISIBILIDAD MODAL INSERTAR**********************************/
        case CAMBIAR_MODAL_NEW_USER:
            return {
                ...state,
                loading: action.payload
            }
            
            case CAMBIAR_MODAL_NEW_USER_EXITO:
                return {
                    ...state,
                    loading: false,
                    visibilidadNewUser: action.payload,
                    modoDialogUser: action.nombre
                }
            
            case CAMBIAR_MODAL_NEW_USER_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
    
                }

        //********** OBTENER SUB MISIONES USER API**********************************/ 

        case OBTENER_SUB_MISION_DIRECTAS:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_SUB_MISION_DIRECTAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                subMisionesDirectas: action.payload
            }

        case OBTENER_SUB_MISION_DIRECTAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

            //********** OBTENER MISIONES USER API**********************************/ 

        case OBTENER_MISION_DIRECTAS:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_MISION_DIRECTAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                misionesDirectas: action.payload
            }

        case OBTENER_MISION_DIRECTAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER WP USER API**********************************/ 

        case OBTENER_WP_DIRECTAS:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_WP_DIRECTAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                WPDirectas: action.payload
            }

        case OBTENER_WP_DIRECTAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER DEPARTAMENTOS USER API**********************************/ 

        case OBTENER_DEPARTAMENTOS_DIRECTAS:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_DEPARTAMENTOS_DIRECTAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                departamentosDirectas: action.payload
            }

        case OBTENER_DEPARTAMENTOS_DIRECTAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER DIRECCION DEPARTAMENTAL USER API**********************************/ 

        case OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                direccionDepartamenalDirectas: action.payload
            }

        case OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //**********GET BLOQUES HEREDADOS Y NO USUARIO**********************************/
        case GET_BLOQUES_HEREDADOS:
            return {
                ...state,
                loading: action.payload
            }

        case GET_BLOQUES_HEREDADOS_EXITO:
            return {
                ...state,
                loading: false,
                listBloquesHeredadosUser: action.payload

            }

        case GET_BLOQUES_HEREDADOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //RESET PASSWORD MANUAL

        case PUT_PASSWORD_USER_MANUAL:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_PASSWORD_USER_MANUAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
            }

        case PUT_PASSWORD_USER_MANUAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** MOSTRAR ALL USER API**********************************/ 

        case MOSTRAR_ALL_USER:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_ALL_USER_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                allUsersListAPI: action.payload
            }

        case MOSTRAR_ALL_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //post user

        case INSERTAR_NEW_USER:
            return {
                ...state,
                loading: action.payload
            }

        case INSERTAR_NEW_USER_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                nuevoUsuarioCreado: action.payload
            }

        case INSERTAR_NEW_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //UPDATE USER
        case PUT_USER:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_USER_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case PUT_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        //**********USUARIO DE LA SESION ACTUAL **********************************/
        case SESION_USER:
            return {
                ...state,
                loading: action.payload
            }

        case SESION_USER_EXITO:
            return {
                ...state,
                loading: false,
                person: action.payload

            }

        case SESION_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********PERMISOS USUARIO DE LA SESION ACTUAL **********************************/
        case PERMISOS_SESION_USER:
            return {
                ...state,
                loading: action.payload
            }

        case PERMISOS_SESION_USER_EXITO:
            return {
                ...state,
                loading: false,
                personPermisos: action.payload

            }

        case PERMISOS_SESION_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********PERMISOS PERMISOS DEL USUARIO DE LOS GRUPOS **********************************/

        case MOSTRAR_USER_PERMISOS_BY_GROUP:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_USER_PERMISOS_BY_GROUP_EXITO:
            return {
                ...state,
                loading: false,
                permisosByGroup: action.payload

            }

        case MOSTRAR_USER_PERMISOS_BY_GROUP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********PERMISOS USUARIO DE LA SESION ACTUAL **********************************/

        case MOSTRAR_USER_PERMISOS:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_USER_PERMISOS_EXITO:
            return {
                ...state,
                loading: false,
                permisosName: action.payload

            }

        case MOSTRAR_USER_PERMISOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** OBTENER CONTRATOS USER API**********************************/ 

        case OBTENER_CONTRATOS_USER:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_CONTRATOS_USER_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                contractUserListAPI: action.payload
            }

        case OBTENER_CONTRATOS_USER_EXITO_RESPALDO:
            return {
                ...state,
                loading: false,
                error: null,
                contractUserListAPIRespaldo: action.payload
            }


        case OBTENER_CONTRATOS_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //********** MOSTRAR USER API**********************************/ 

        case MOSTRAR_USER:
            return {
                ...state,
                loading: action.payload
            }

        case MOSTRAR_USER_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                usersListAPI: action.payload
            }

        case MOSTRAR_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        //**********FILA SELECIONADA GRID **********************************/

        case CAMBIAR_VALOR_SELECCION_GRID_USER:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_USER_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGrid: action.payload

            }

        case CAMBIAR_VALOR_SELECCION_GRID_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}