import {

    OBTENER_USER_DETAILS,
    OBTENER_USER_DETAILS_EXITO,
    OBTENER_USER_DETAILS_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_DETALLES,
    CAMBIAR_MODAL_VISIBILIDAD_DETALLES_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_DETALLES_ERROR


} from './types';


// cada reducer tiene su propio state
const initialState = {
    userSeleccionado: '',
    visibilidadModalDetalles: false,
    error: null,
    loading: false
}

export default function (state = initialState, action) {

    switch (action.type) {

        //********** MOSTRAR RM_ACCION API**********************************/ 

        case OBTENER_USER_DETAILS:
            return {
                ...state,
                loading: action.payload
            }

        case OBTENER_USER_DETAILS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                userSeleccionado: action.payload

            }

        case OBTENER_USER_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        //**********VISIBILIDAD MODAL INSERTAR**********************************/

        case CAMBIAR_MODAL_VISIBILIDAD_DETALLES:
            return {
                ...state,
                loading: action.payload
            }

        case CAMBIAR_MODAL_VISIBILIDAD_DETALLES_EXITO:
            return {
                ...state,
                loading: false,
                visibilidadModalDetalles: action.payload

            }

        case CAMBIAR_MODAL_VISIBILIDAD_DETALLES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}