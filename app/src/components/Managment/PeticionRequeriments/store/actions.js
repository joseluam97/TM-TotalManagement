import {

    MOSTRAR_PETICIONES_REQUERIMIENTOS,
    MOSTRAR_PETICIONES_REQUERIMIENTOS_EXITO,
    MOSTRAR_PETICIONES_REQUERIMIENTOS_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO,
    CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_ERROR,

    PUT_PETICION_REQUERIMIENTO,
    PUT_PETICION_REQUERIMIENTO_EXITO,
    PUT_PETICION_REQUERIMIENTO_ERROR,

    INSERTAR_NEW_PETICION_REQUERIMIENTO,
    INSERTAR_NEW_PETICION_REQUERIMIENTO_EXITO,
    INSERTAR_NEW_PETICION_REQUERIMIENTO_ERROR,

    CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO,
    CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_EXITO,
    CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_ERROR

} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlPeticionesRequerimientosApi = process.env.REACT_APP_URL_DJANGO + "/api/peticionRequerimiento/"

//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function cambiarVisibilidadModalInsertarPeticionRequerimientoAPI(valorNuevo, modoDialogPeticionRequerimiento) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalNuevoPeticionRequerimiento())

        try {
            dispatch (cambiarVisibilidadModalNuevoPeticionRequerimientoExito(valorNuevo, modoDialogPeticionRequerimiento))

        } catch (error) {

            dispatch (cambiarVisibilidadModalNuevoPeticionRequerimientoError(true))
        }
    }
}

const cambiarVisibilidadModalNuevoPeticionRequerimiento = () => ({
    type: CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO,
    payload: true

})

const cambiarVisibilidadModalNuevoPeticionRequerimientoExito = (valorNuevo, modoDialogPeticionRequerimiento) => ({
    type: CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_EXITO,
    nombre: modoDialogPeticionRequerimiento,
    payload: valorNuevo

})

const cambiarVisibilidadModalNuevoPeticionRequerimientoError = estado => ({
  type:  CAMBIAR_MODAL_NUEVA_PETICION_REQUERIMIENTO_ERROR,
  payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewPeticionRequerimientoAPIAction(peticionRequerimiento) {

    return async (dispatch) => {
        dispatch (createNewPeticionRequerimiento())
             axios({
                    method: "POST",
                    url: urlPeticionesRequerimientosApi,
                    data: peticionRequerimiento,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (createNewPeticionRequerimientoExito(response.data))

                 /*dispatch(
                    showMessage({
                        message: "PeticionRequerimiento successfully created",
                        variant: "success"
                    })
                 )*/

                 dispatch(mostrarPeticionRequerimientoAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (createNewPeticionRequerimientoError(true))

                dispatch(
                    showMessage({
                        message: "Error creating PeticionRequerimiento",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewPeticionRequerimiento = (peticionRequerimiento) => ({
    type: INSERTAR_NEW_PETICION_REQUERIMIENTO,
    payload: peticionRequerimiento

})

const createNewPeticionRequerimientoExito = estado => ({
    type: INSERTAR_NEW_PETICION_REQUERIMIENTO_EXITO,
    payload: estado

})

const createNewPeticionRequerimientoError = estado => ({
    type:  INSERTAR_NEW_PETICION_REQUERIMIENTO_ERROR,
    payload: estado
})

//PUT CATEGORY

export function putPeticionRequerimientoAPIAction(id,peticionRequerimiento) {

    return async (dispatch) => {
        dispatch (putPeticionRequerimiento())
             axios({
                    method: "PUT",
                    url: urlPeticionesRequerimientosApi + id,
                    data: peticionRequerimiento,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putPeticionRequerimientoExito(response.data))

                 dispatch(
                    showMessage({
                        message: "PeticionRequerimiento successfully modified",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarPeticionRequerimientoAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (putPeticionRequerimientoError(true))

                dispatch(
                    showMessage({
                        message: "Error modified PeticionRequerimiento",
                        variant: "error"
                    })
                )
            })

    }
}

const putPeticionRequerimiento = () => ({
    type: PUT_PETICION_REQUERIMIENTO,
    payload: true

})

const putPeticionRequerimientoExito = estado => ({
    type: PUT_PETICION_REQUERIMIENTO_EXITO,
    payload: estado

})

const putPeticionRequerimientoError = estado => ({
    type:  PUT_PETICION_REQUERIMIENTO_ERROR,
    payload: estado
})

//************************ MOSTRAR CATEGORY API GET **********************************************

export function mostrarPeticionRequerimientoAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarPeticionRequerimientoAPI(true))

        
            await axios({
                method: "GET",
                url: urlPeticionesRequerimientosApi,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarPeticionRequerimientoAPIExito(response.data))

                        dispatch(cambiarValorSeleccionAction(''))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarPeticionRequerimientoAPIError(true))
                    })

          }
}

const mostrarPeticionRequerimientoAPI = (estado) => ({
    type: MOSTRAR_PETICIONES_REQUERIMIENTOS,
    payload: true

})

const mostrarPeticionRequerimientoAPIExito = peticionRequerimientos => ({
    type: MOSTRAR_PETICIONES_REQUERIMIENTOS_EXITO,
    payload: peticionRequerimientos

})

const mostrarPeticionRequerimientoAPIError = estado => ({
  type: MOSTRAR_PETICIONES_REQUERIMIENTOS_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_PETICION_REQUERIMIENTO_ERROR,
  payload: estado
})
