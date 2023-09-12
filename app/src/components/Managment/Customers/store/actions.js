import {

    MOSTRAR_CUSTOMER,
    MOSTRAR_CUSTOMER_EXITO,
    MOSTRAR_CUSTOMER_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER,
    CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_ERROR,

    PUT_CUSTOMER,
    PUT_CUSTOMER_EXITO,
    PUT_CUSTOMER_ERROR,

    INSERTAR_NEW_CUSTOMER,
    INSERTAR_NEW_CUSTOMER_EXITO,
    INSERTAR_NEW_CUSTOMER_ERROR,

    CAMBIAR_MODAL_NEW_CUSTOMER,
    CAMBIAR_MODAL_NEW_CUSTOMER_EXITO,
    CAMBIAR_MODAL_NEW_CUSTOMER_ERROR,

    CAMBIAR_MODAL_CUSTOMER_LOCATION,
    CAMBIAR_MODAL_CUSTOMER_LOCATION_EXITO,
    CAMBIAR_MODAL_CUSTOMER_LOCATION_ERROR,

    MOSTRAR_LOCATION_CUSTOMER,
    MOSTRAR_LOCATION_CUSTOMER_EXITO,
    MOSTRAR_LOCATION_CUSTOMER_ERROR,

    CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION,
    CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_EXITO,
    CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_LOCATION,
    CAMBIAR_VALOR_SELECCION_GRID_LOCATION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_LOCATION_ERROR,

    INSERTAR_NEW_CUSTOMER_LOCATION,
    INSERTAR_NEW_CUSTOMER_LOCATION_EXITO,
    INSERTAR_NEW_CUSTOMER_LOCATION_ERROR,

    PUT_CUSTOMER_LOCATION,
    PUT_CUSTOMER_LOCATION_EXITO,
    PUT_CUSTOMER_LOCATION_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlCustomerApi = process.env.REACT_APP_URL_DJANGO + "/api/customer/"
const urlLocationCustomerApi = process.env.REACT_APP_URL_DJANGO + "/api/locationCustomer/customer/"
const urlLocationApi = process.env.REACT_APP_URL_DJANGO + "/api/locationCustomer/"
const urlMisionLocationApi = process.env.REACT_APP_URL_DJANGO + "/api/mision/locationsContract/"
const urlworkPLocationApi = process.env.REACT_APP_URL_DJANGO + "/api/workpackage/locationsWP/"
const urlLocationMisionApi = process.env.REACT_APP_URL_DJANGO + "/api/mision/locationsContract/"

//************************ GET LOCATIONS DE WORK PACKAGE CON CONTRACTO**********************************************

export function getAllLocationCustomerByWPAPIAction(idWP) {

    return async (dispatch) => {
        dispatch (getAllLocationCustomerAPI(true))

        
            await axios({
                method: "GET",
                url: urlworkPLocationApi + idWP,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (getAllLocationCustomerAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (getAllLocationCustomerAPIError(true))
                    })

          }
}

//************************ GET LOCATIONS DE MISION CON CONTRACTO**********************************************

export function getAllLocationCustomerByMisionAPIAction(idMision) {

    return async (dispatch) => {
        dispatch (getAllLocationCustomerAPI(true))

        
            await axios({
                method: "GET",
                url: urlMisionLocationApi + idMision,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (getAllLocationCustomerAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (getAllLocationCustomerAPIError(true))
                    })

          }
}

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function getLocationCustomerByMisionAPIAction(idMision) {

    return async (dispatch) => {
        dispatch (getAllLocationCustomerAPI(true))

        
            await axios({
                method: "GET",
                url: urlLocationMisionApi + idMision,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (getAllLocationCustomerAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (getAllLocationCustomerAPIError(true))
                    })

          }
}

export function getAllLocationCustomerAPIAction() {

    return async (dispatch) => {
        dispatch (getAllLocationCustomerAPI(true))

        
            await axios({
                method: "GET",
                url: urlLocationApi,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (getAllLocationCustomerAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (getAllLocationCustomerAPIError(true))
                    })

          }
}

const getAllLocationCustomerAPI = (customer) => ({
    type: MOSTRAR_LOCATION_CUSTOMER,
    payload: customer

})

const getAllLocationCustomerAPIExito = estado => ({
    type: MOSTRAR_LOCATION_CUSTOMER_EXITO,
    payload: estado

})

const getAllLocationCustomerAPIError = estado => ({
    type:  MOSTRAR_LOCATION_CUSTOMER_ERROR,
    payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewLocationCustomerAPIAction(customer) {

    return async (dispatch) => {
        dispatch (createNewLocationCustomer())
             axios({
                    method: "POST",
                    url: urlLocationApi,
                    data: customer,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (createNewLocationCustomerExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Location successfully created",
                        variant: "success"
                    })
                 ) 

                 //dispatch(mostrarCustomerAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (createNewLocationCustomerError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Location",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewLocationCustomer = (customer) => ({
    type: INSERTAR_NEW_CUSTOMER_LOCATION,
    payload: customer

})

const createNewLocationCustomerExito = estado => ({
    type: INSERTAR_NEW_CUSTOMER_LOCATION_EXITO,
    payload: estado

})

const createNewLocationCustomerError = estado => ({
    type:  INSERTAR_NEW_CUSTOMER_LOCATION_ERROR,
    payload: estado
})

//PUT CUSTOMER

export function putCustomerLocationAPIAction(id,customer) {

    return async (dispatch) => {
        dispatch (putCustomerLocationAPI())
             axios({
                    method: "PUT",
                    url: urlLocationApi + id,
                    data: customer,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putCustomerLocationAPIExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Customer successfully modified",
                        variant: "success"
                    })
                 ) 

                 //dispatch(mostrarCustomerAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (putCustomerLocationAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error modified Customer",
                        variant: "error"
                    })
                )
            })

    }
}

const putCustomerLocationAPI = () => ({
    type: PUT_CUSTOMER_LOCATION,
    payload: true

})

const putCustomerLocationAPIExito = estado => ({
    type: PUT_CUSTOMER_LOCATION_EXITO,
    payload: estado

})

const putCustomerLocationAPIError = estado => ({
    type:  PUT_CUSTOMER_LOCATION_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL GESTION DE LOCATIONS**********************************************

export function cambiarVisibilidadModalGestionLocationsAPIAction(valorNuevo, modoDialogGestionLocations) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalGestionLocationsAPI())

        try {
            dispatch (cambiarVisibilidadModalGestionLocationsAPIExito(valorNuevo, modoDialogGestionLocations))

        } catch (error) {

            dispatch (cambiarVisibilidadModalGestionLocationsAPIError(true))
        }
    }
}

const cambiarVisibilidadModalGestionLocationsAPI = () => ({
    type: CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION,
    payload: true

})

const cambiarVisibilidadModalGestionLocationsAPIExito = (valorNuevo, modoDialogGestionLocations) => ({
    type: CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_EXITO,
    payload: valorNuevo,
    modoDialogGestionLocations: modoDialogGestionLocations

})

const cambiarVisibilidadModalGestionLocationsAPIError = estado => ({
  type:  CAMBIAR_MODAL_GESTION_CUSTOMER_LOCATION_ERROR,
  payload: estado
})

//************************ MOSTRAR CUSTOMER API GET **********************************************

export function mostrarLocationCustomerAPIAction(idCustomer) {

    return async (dispatch) => {
        dispatch (mostrarLocationCustomerAPI(true))

        
            await axios({
                method: "GET",
                url: urlLocationCustomerApi + idCustomer,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarLocationCustomerAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarLocationCustomerAPIError(true))
                    })

          }
}

const mostrarLocationCustomerAPI = (estado) => ({
    type: MOSTRAR_LOCATION_CUSTOMER,
    payload: true

})

const mostrarLocationCustomerAPIExito = customers => ({
    type: MOSTRAR_LOCATION_CUSTOMER_EXITO,
    payload: customers

})

const mostrarLocationCustomerAPIError = estado => ({
  type: MOSTRAR_LOCATION_CUSTOMER_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL LOCATIONS**********************************************

export function cambiarVisibilidadModalLocationsAPIAction(valorNuevo, modoDialogCustomer) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalLocationsAPI())

        try {
            dispatch (cambiarVisibilidadModalLocationsAPIExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalLocationsAPIError(true))
        }
    }
}

const cambiarVisibilidadModalLocationsAPI = () => ({
    type: CAMBIAR_MODAL_CUSTOMER_LOCATION,
    payload: true

})

const cambiarVisibilidadModalLocationsAPIExito = valorNuevo => ({
    type: CAMBIAR_MODAL_CUSTOMER_LOCATION_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalLocationsAPIError = estado => ({
  type:  CAMBIAR_MODAL_CUSTOMER_LOCATION_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function cambiarVisibilidadModalInsertarCustomerAPI(valorNuevo, modoDialogCustomer) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalNuevoCustomer())

        try {
            dispatch (cambiarVisibilidadModalNuevoCustomerExito(valorNuevo, modoDialogCustomer))

        } catch (error) {

            dispatch (cambiarVisibilidadModalNuevoCustomerError(true))
        }
    }
}

const cambiarVisibilidadModalNuevoCustomer = () => ({
    type: CAMBIAR_MODAL_NEW_CUSTOMER,
    payload: true

})

const cambiarVisibilidadModalNuevoCustomerExito = (valorNuevo, modoDialogCustomer) => ({
    type: CAMBIAR_MODAL_NEW_CUSTOMER_EXITO,
    nombre: modoDialogCustomer,
    payload: valorNuevo

})

const cambiarVisibilidadModalNuevoCustomerError = estado => ({
  type:  CAMBIAR_MODAL_NEW_CUSTOMER_ERROR,
  payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewCustomerAPIAction(customer) {

    return async (dispatch) => {
        dispatch (createNewCustomer())
             axios({
                    method: "POST",
                    url: urlCustomerApi,
                    data: customer,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (createNewCustomerExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Customer successfully created",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarCustomerAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (createNewCustomerError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Customer",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewCustomer = (customer) => ({
    type: INSERTAR_NEW_CUSTOMER,
    payload: customer

})

const createNewCustomerExito = estado => ({
    type: INSERTAR_NEW_CUSTOMER_EXITO,
    payload: estado

})

const createNewCustomerError = estado => ({
    type:  INSERTAR_NEW_CUSTOMER_ERROR,
    payload: estado
})

//PUT CUSTOMER

export function putCustomerAPIAction(id,customer) {

    return async (dispatch) => {
        dispatch (putCustomer())
             axios({
                    method: "PUT",
                    url: urlCustomerApi + id,
                    data: customer,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putCustomerExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Customer successfully modified",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarCustomerAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (putCustomerError(true))

                dispatch(
                    showMessage({
                        message: "Error modified Customer",
                        variant: "error"
                    })
                )
            })

    }
}

const putCustomer = () => ({
    type: PUT_CUSTOMER,
    payload: true

})

const putCustomerExito = estado => ({
    type: PUT_CUSTOMER_EXITO,
    payload: estado

})

const putCustomerError = estado => ({
    type:  PUT_CUSTOMER_ERROR,
    payload: estado
})

//************************ MOSTRAR CUSTOMER API GET **********************************************

export function mostrarCustomerAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarCustomerAPI(true))

        
            await axios({
                method: "GET",
                url: urlCustomerApi,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarCustomerAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarCustomerAPIError(true))
                    })

          }
}

const mostrarCustomerAPI = (estado) => ({
    type: MOSTRAR_CUSTOMER,
    payload: true

})

const mostrarCustomerAPIExito = customers => ({
    type: MOSTRAR_CUSTOMER_EXITO,
    payload: customers

})

const mostrarCustomerAPIError = estado => ({
  type: MOSTRAR_CUSTOMER_ERROR,
  payload: estado
})


//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorSeleccionAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarValorSeleccion())

        try {
            dispatch (cambiarValorSeleccionExito(valorNuevo))
            

        } catch (error) {

            dispatch (cambiarValorSeleccionError(true))
        }

    }

}

const cambiarValorSeleccion = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_CUSTOMER_ERROR,
  payload: estado
})


//************************ CAMBIAR SELECCION GRID ACTION location**********************************************

export function cambiarValorSeleccionLocationAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarValorSeleccionLocationAPI())

        try {
            dispatch (cambiarValorSeleccionLocationAPIExito(valorNuevo))
            

        } catch (error) {

            dispatch (cambiarValorSeleccionLocationAPIError(true))
        }

    }

}

const cambiarValorSeleccionLocationAPI = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_LOCATION,
    payload: false

})

const cambiarValorSeleccionLocationAPIExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_LOCATION_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionLocationAPIError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_LOCATION_ERROR,
  payload: estado
})