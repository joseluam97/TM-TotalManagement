import {

    CAMBIAR_VALOR_TAB_DEPARTAMENTO,
    CAMBIAR_VALOR_TAB_DEPARTAMENTO_EXITO,
    CAMBIAR_VALOR_TAB_DEPARTAMENTO_ERROR,

    GET_ALL_DEPARTAMENTOS,
    GET_ALL_DEPARTAMENTOS_EXITO,
    GET_ALL_DEPARTAMENTOS_ERROR,

    GET_ALL_DIRECCION_DEPARTAMENTAL,
    GET_ALL_DIRECCION_DEPARTAMENTAL_EXITO,
    GET_ALL_DIRECCION_DEPARTAMENTAL_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO,
    CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL,
    CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_ERROR,

    VER_MODAL_INSERT_DEPARTAMENTO,
    VER_MODAL_INSERT_DEPARTAMENTO_EXITO,
    VER_MODAL_INSERT_DEPARTAMENTO_ERROR,

    VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL,
    VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_EXITO,
    VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_ERROR,

    PUT_DEPARTAMENTO,
    PUT_DEPARTAMENTO_EXITO,
    PUT_DEPARTAMENTO_ERROR,

    POST_DEPARTAMENTO,
    POST_DEPARTAMENTO_EXITO,
    POST_DEPARTAMENTO_ERROR,

    PUT_FUNCION_DEPARTAMENTAL,
    PUT_FUNCION_DEPARTAMENTAL_EXITO,
    PUT_FUNCION_DEPARTAMENTAL_ERROR,

    POST_FUNCION_DEPARTAMENTAL,
    POST_FUNCION_DEPARTAMENTAL_EXITO,
    POST_FUNCION_DEPARTAMENTAL_ERROR,

    GET_REQUERIMENTS_BY_DEPARTAMENTO,
    GET_REQUERIMENTS_BY_DEPARTAMENTO_EXITO,
    GET_REQUERIMENTS_BY_DEPARTAMENTO_ERROR,

    POST_DEPARTAMENTO_APP,
    POST_DEPARTAMENTO_APP_EXITO,
    POST_DEPARTAMENTO_APP_ERROR,

    ELIMINAR_DEPARTAMENTO_APP,
    ELIMINAR_DEPARTAMENTO_APP_EXITO,
    ELIMINAR_DEPARTAMENTO_APP_ERROR,

    VER_MODAL_REQUERIMENTS_DEPARTAMENTO,
    VER_MODAL_REQUERIMENTS_DEPARTAMENTO_EXITO,
    VER_MODAL_REQUERIMENTS_DEPARTAMENTO_ERROR,

    //REQUERIMENTS DIRECCION DEPARTAMENTAL
    GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL,
    GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_EXITO,
    GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_ERROR,

    POST_DIRECCION_DEPARTAMENTAL_APP,
    POST_DIRECCION_DEPARTAMENTAL_APP_EXITO,
    POST_DIRECCION_DEPARTAMENTAL_APP_ERROR,

    ELIMINAR_DIRECCION_DEPARTAMENTAL_APP,
    ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_EXITO,
    ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_ERROR,

    VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL,
    VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_EXITO,
    VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_ERROR

} from './types';


// cada reducer tiene su propio state
const initialState = {
    valorTabDepartamento: 'direccionDepartamental',

    listAllDireccionesDepartamentalesAPI: [],
    filaSeleccionadaGridDireccionDepartamental: '',
    visibilidadModalInsertarDireccionDepartamental: false,
    modoAperturaDireccionDepartamental: '',
    newDireccionDepartamentalCreated: '',
    listRequerimentsByDireccionDepartamental: [],
    visibilidadModalRequerimentsDireccionDepartamental: false,

    listAllDepartamentAPI: [],
    filaSeleccionadaGridDepartament: '',
    visibilidadModalInsertarDepartamento: false,
    modoAperturaDepartamento: '',
    newDepartamentoCreated: '',
    listRequerimentsByDepartment: [],
    visibilidadModalRequerimentsDepartamentos: false,

    error: null,
    loading: false
}

export default function (state = initialState, action) {

    switch (action.type) {

        //deleteee CONTRACT APP
        case ELIMINAR_DIRECCION_DEPARTAMENTAL_APP:
            return {
                ...state,
                loading: action.payload
            }

        case ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********POST DIRECCION_DEPARTAMENTAL APP**********************************/

        case POST_DIRECCION_DEPARTAMENTAL_APP:
            return {
                ...state,
                loading: action.payload
            }

        case POST_DIRECCION_DEPARTAMENTAL_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case POST_DIRECCION_DEPARTAMENTAL_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********GET REQUERIMENTS BY DIRECCION_DEPARTAMENTAL**********************************/

        case GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL:
            return {
                ...state,
                loading: action.payload
            }

        case GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listRequerimentsByDireccionDepartamental: action.payload
            }

        case GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB DIRECCION_DEPARTAMENTAL**********************************/

        case VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalRequerimentsDireccionDepartamental: action.payload

            }

        case VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //deleteee CONTRACT APP
        case ELIMINAR_DEPARTAMENTO_APP:
            return {
                ...state,
                loading: action.payload
            }

        case ELIMINAR_DEPARTAMENTO_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case ELIMINAR_DEPARTAMENTO_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********POST DEPARTAMENTO APP**********************************/

        case POST_DEPARTAMENTO_APP:
            return {
                ...state,
                loading: action.payload
            }

        case POST_DEPARTAMENTO_APP_EXITO:
            return {
                ...state,
                loading: false,
                error: null
            }

        case POST_DEPARTAMENTO_APP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********GET REQUERIMENTS BY DEPARTAMENTO**********************************/

        case GET_REQUERIMENTS_BY_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload
            }

        case GET_REQUERIMENTS_BY_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listRequerimentsByDepartment: action.payload
            }

        case GET_REQUERIMENTS_BY_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB DEPARTAMENTO**********************************/

        case VER_MODAL_REQUERIMENTS_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_REQUERIMENTS_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalRequerimentsDepartamentos: action.payload

            }

        case VER_MODAL_REQUERIMENTS_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********POST MISION**********************************/

        case POST_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload
            }

        case POST_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                newDepartamentoCreated: action.payload
            }

        case POST_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********POST persona a contrato**********************************/

        case PUT_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case PUT_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //**********POST MISION**********************************/

        case POST_FUNCION_DEPARTAMENTAL:
            return {
                ...state,
                loading: action.payload
            }

        case POST_FUNCION_DEPARTAMENTAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                newDireccionDepartamentalCreated: action.payload
            }

        case POST_FUNCION_DEPARTAMENTAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //**********POST persona a contrato**********************************/

        case PUT_FUNCION_DEPARTAMENTAL:
            return {
                ...state,
                loading: action.payload
            }

        case PUT_FUNCION_DEPARTAMENTAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null

            }

        case PUT_FUNCION_DEPARTAMENTAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB MISION**********************************/

        case VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertarDireccionDepartamental: action.payload,
                modoAperturaDireccionDepartamental: action.modoApertura

            }

        case VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }


        //**********CAMBIAR VISIBILIDAD MODAL INSERTAR SUB MISION**********************************/

        case VER_MODAL_INSERT_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload
            }

        case VER_MODAL_INSERT_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalInsertarDepartamento: action.payload,
                modoAperturaDepartamento: action.modoApertura

            }

        case VER_MODAL_INSERT_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********FILA SELECIONADA GRID **********************************/

        case CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGridDireccionDepartamental: action.payload

            }

        case CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********FILA SELECIONADA GRID **********************************/

        case CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                filaSeleccionadaGridDepartament: action.payload

            }

        case CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET RESPALDO MISIONES**********************************/

        case GET_ALL_DEPARTAMENTOS:
            return {
                ...state,
                loading: action.payload
            }

        case GET_ALL_DEPARTAMENTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listAllDepartamentAPI: action.payload
            }

        case GET_ALL_DEPARTAMENTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********GET RESPALDO MISIONES**********************************/

        case GET_ALL_DIRECCION_DEPARTAMENTAL:
            return {
                ...state,
                loading: action.payload
            }

        case GET_ALL_DIRECCION_DEPARTAMENTAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                listAllDireccionesDepartamentalesAPI: action.payload
            }

        case GET_ALL_DIRECCION_DEPARTAMENTAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        case CAMBIAR_VALOR_TAB_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_VALOR_TAB_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                valorTabDepartamento: action.payload

            }

        case CAMBIAR_VALOR_TAB_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}