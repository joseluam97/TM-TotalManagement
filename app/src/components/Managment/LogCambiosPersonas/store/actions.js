import {

    MOSTRAR_LOG_PERSONA,
    MOSTRAR_LOG_PERSONA_EXITO,
    MOSTRAR_LOG_PERSONA_ERROR,

    INSERTAR_NEW_LOG_PERSONA,
    INSERTAR_NEW_LOG_PERSONA_EXITO,
    INSERTAR_NEW_LOG_PERSONA_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlLogPersonaApi = process.env.REACT_APP_URL_DJANGO + "/api/logPersonas/"

//************************ MOSTRAR LOG_PERSONA API GET **********************************************

export function mostrarLogPersonaReducerAPIAction(iteracion) {

    return async (dispatch) => {
        dispatch (mostrarLogPersonaAPI(true))

            await axios({
                method: "GET",
                url: urlLogPersonaApi + "reducer/",
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{

                        if(iteracion != 1){
                            dispatch(
                                showMessage({
                                    message: "Correctly updated data",
                                    variant: "success"
                                })
                             ) 
                        }
                        
                        dispatch (mostrarLogPersonaAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarLogPersonaAPIError(true))
                    })

          }
}

export function mostrarLogPersonaAPIAction(iteracion) {

    return async (dispatch) => {
        dispatch (mostrarLogPersonaAPI(true))

            await axios({
                method: "GET",
                url: urlLogPersonaApi,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{

                        if(iteracion != 1){
                            dispatch(
                                showMessage({
                                    message: "Correctly updated data",
                                    variant: "success"
                                })
                             ) 
                        }

                        dispatch (mostrarLogPersonaAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarLogPersonaAPIError(true))
                    })

          }
}

const mostrarLogPersonaAPI = (estado) => ({
    type: MOSTRAR_LOG_PERSONA,
    payload: true

})

const mostrarLogPersonaAPIExito = customers => ({
    type: MOSTRAR_LOG_PERSONA_EXITO,
    payload: customers

})

const mostrarLogPersonaAPIError = estado => ({
  type: MOSTRAR_LOG_PERSONA_ERROR,
  payload: estado
})

//************************ INSERTA LOG_PERSONA **********************************************

export function insertarLogPersonaAPIAction(json) {

    return async (dispatch) => {
        dispatch (createLogPersonaAPI(true))

            await axios({
                method: "POST",
                url: urlLogPersonaApi,
                data: json,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        
                        dispatch (createLogPersonaAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (createLogPersonaAPIError(true))
                    })

          }
}

const createLogPersonaAPI = (customer) => ({
    type: INSERTAR_NEW_LOG_PERSONA,
    payload: customer

})

const createLogPersonaAPIExito = estado => ({
    type: INSERTAR_NEW_LOG_PERSONA_EXITO,
    payload: estado

})

const createLogPersonaAPIError = estado => ({
    type:  INSERTAR_NEW_LOG_PERSONA_ERROR,
    payload: estado
})