import {

    // COMPONENTE PRINCIPAL ------------------

    GET_LIST_WP,
    GET_LIST_WP_EXITO,
    GET_LIST_WP_ERROR,


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlWpAPI = process.env.REACT_APP_URL_DJANGO + "/api/workPackage/getMyWp/"

export function getListWorkPackageAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch (getListWorkPackageAPI())
             axios({
                    method: "GET",
                    url: urlWpAPI + idPersona,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (getListWorkPackageAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (getListWorkPackageAPIError(true))
            })

    }

}

const getListWorkPackageAPI = () => ({
    type: GET_LIST_WP,
    payload: true

})

const getListWorkPackageAPIExito = valorNuevo => ({
    type: GET_LIST_WP_EXITO,
    payload: valorNuevo

})

const getListWorkPackageAPIError = estado => ({
  type: GET_LIST_WP_ERROR,
  payload: estado
})