import {

 // COMPONENTE PRINCIPAL ------------------


         OBTENER_TOKEN,
         OBTENER_TOKEN_EXITO,
         OBTENER_TOKEN_ERROR,

         CHECK_TOKEN,
         CHECK_TOKEN_EXITO,
         CHECK_TOKEN_ERROR,


} from './types';
import axios from 'axios'

import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes
const urlAuth = process.env.REACT_APP_URL_DJANGO + "/api/auth/"
const urlCheckToken = process.env.REACT_APP_URL_DJANGO + "/api/checktoken/"


//************************ OBTENER_TOKEN ACTION**********************************************

export function obtenerTokenAction(credenciales) {

    return (dispatch) => {
         dispatch (obtenerToken(true))

            
             axios({
                    method: "POST",
                    url: urlAuth,
                    data: credenciales
                    
                       
              })   
              .then(response => {
                if(response.data.name != ""){
                    document.cookie = "token="+response.data.token;
                    document.cookie = "name="+response.data.name;
                    document.cookie = "email="+response.data.email;
                    dispatch (obtenerTokenExito(response.data))

                    window.location.reload()
                }
                else{
                    dispatch (obtenerTokenError(true))
                    dispatch(
                        showMessage({
                        message: "No access permissions",
                        variant: "error",
                        })
                    )
                }
                 
                
             })
             .catch(error => {
                    console.log(error.response)
                    dispatch(
                        showMessage({
                        message: "Invalid credentials",
                        variant: "error",
                        })
                    )
              
                    dispatch (obtenerTokenError(true))
            })

    }
}

const obtenerToken = loading => ({
    type: OBTENER_TOKEN,
    payload: loading

})

const obtenerTokenExito = token => ({
  
    type: OBTENER_TOKEN_EXITO,
    payload: token

})

const obtenerTokenError = error => ({
    type:   OBTENER_TOKEN_ERROR,
    payload: error
})


//************************ CHECK_TOKEN ACTION**********************************************

export function checkTokenAction(token) {

    return (dispatch) => {
        dispatch (checkToken(true))
          
          let token = getCookie('token')

          let apiurl = ''

              apiurl = urlCheckToken

              axios({
                    method: "GET",
                    url: apiurl,
                    params: {
                        token: token
                      }
                    
                       
              })   
              .then(response => {
                 
                 dispatch (checkTokenExito(response.data))
                
             })
             .catch(error => {
                console.log(error.response)
                dispatch (checkTokenError(false))
            })

    }
}

const checkToken = loading => ({
    type: CHECK_TOKEN,
    payload: loading

})

const checkTokenExito = token => ({
  
    type: CHECK_TOKEN_EXITO,
    payload: token

})

const checkTokenError = error => ({
    type:   CHECK_TOKEN_ERROR,
    payload: error
})


