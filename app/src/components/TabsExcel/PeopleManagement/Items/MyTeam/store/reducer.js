import {

    // COMPONENTE PRINCIPAL ------------------


    GET_LIST_WP,
    GET_LIST_WP_EXITO,
    GET_LIST_WP_ERROR,


} from './types';


// cada reducer tiene su propio state
const initialState = {

    listUserWP: [],
    listUserMision: [],
    listUserSubMision: [],
    error: null,
    loading: false,
}

export default function (state = initialState, action) {

    switch (action.type) {

        //**********GET USER APP **********************************/

        case GET_LIST_WP:
            return {
                ...state,
                loading: action.payload
            }

        case GET_LIST_WP_EXITO:
            return {
                ...state,
                loading: false,
                listUserApp: action.payload

            }

        case GET_LIST_WP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state

    }

}
