import {

    MOSTRAR_KPI,
    MOSTRAR_KPI_EXITO,
    MOSTRAR_KPI_ERROR,

    INSERTAR_NEW_LOG,
    INSERTAR_NEW_LOG_EXITO,
    INSERTAR_NEW_LOG_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlLogApi = process.env.REACT_APP_URL_DJANGO + "/api/log/"
const urlLogReducerApi = process.env.REACT_APP_URL_DJANGO + "/api/logReducer/"

//************************ MOSTRAR KPI API GET **********************************************

export function mostrarLogReducerAPIAction(iteracion) {

    return async (dispatch) => {
        dispatch (mostrarKpiAPI(true))

            await axios({
                method: "GET",
                url: urlLogReducerApi,
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
                        
                        dispatch (mostrarKpiAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarKpiAPIError(true))
                    })

          }
}

export function mostrarLogAPIAction(iteracion) {

    return async (dispatch) => {
        dispatch (mostrarKpiAPI(true))

            await axios({
                method: "GET",
                url: urlLogApi,
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

                        dispatch (mostrarKpiAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarKpiAPIError(true))
                    })

          }
}

const mostrarKpiAPI = (estado) => ({
    type: MOSTRAR_KPI,
    payload: true

})

const mostrarKpiAPIExito = customers => ({
    type: MOSTRAR_KPI_EXITO,
    payload: customers

})

const mostrarKpiAPIError = estado => ({
  type: MOSTRAR_KPI_ERROR,
  payload: estado
})

//************************ INSERTA LOG **********************************************

export function insertarLogAPIAction(json) {

    return async (dispatch) => {
        dispatch (createLogAPI(true))

            await axios({
                method: "POST",
                url: urlLogApi,
                data: json,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        
                        dispatch (createLogAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (createLogAPIError(true))
                    })

          }
}

const createLogAPI = (customer) => ({
    type: INSERTAR_NEW_LOG,
    payload: customer

})

const createLogAPIExito = estado => ({
    type: INSERTAR_NEW_LOG_EXITO,
    payload: estado

})

const createLogAPIError = estado => ({
    type:  INSERTAR_NEW_LOG_ERROR,
    payload: estado
})