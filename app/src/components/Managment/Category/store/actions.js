import {

    MOSTRAR_CATEGORY,
    MOSTRAR_CATEGORY_EXITO,
    MOSTRAR_CATEGORY_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_CATEGORY,
    CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_ERROR,

    PUT_CATEGORY,
    PUT_CATEGORY_EXITO,
    PUT_CATEGORY_ERROR,

    INSERTAR_NEW_CATEGORY,
    INSERTAR_NEW_CATEGORY_EXITO,
    INSERTAR_NEW_CATEGORY_ERROR,

    CAMBIAR_MODAL_NEW_CATEGORY,
    CAMBIAR_MODAL_NEW_CATEGORY_EXITO,
    CAMBIAR_MODAL_NEW_CATEGORY_ERROR,

    MOSTRAR_TIPOS_CATEGORIA,
    MOSTRAR_TIPOS_CATEGORIA_EXITO,
    MOSTRAR_TIPOS_CATEGORIA_ERROR

} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlCategoriaApi = process.env.REACT_APP_URL_DJANGO + "/api/categorizacion/"

//************************ MOSTRAR CATEGORY API GET **********************************************

export function mostrarTiposUnicosAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarTiposUnicosAPI(true))

        
            await axios({
                method: "GET",
                url: urlCategoriaApi + "allCategory/",
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarTiposUnicosAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarTiposUnicosAPIError(true))
                    })

          }
}

const mostrarTiposUnicosAPI = (estado) => ({
    type: MOSTRAR_TIPOS_CATEGORIA,
    payload: true

})

const mostrarTiposUnicosAPIExito = categorias => ({
    type: MOSTRAR_TIPOS_CATEGORIA_EXITO,
    payload: categorias

})

const mostrarTiposUnicosAPIError = estado => ({
  type: MOSTRAR_TIPOS_CATEGORIA_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function cambiarVisibilidadModalInsertarCategoryAPI(valorNuevo, modoDialogCategory) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalNuevoCategory())

        try {
            dispatch (cambiarVisibilidadModalNuevoCategoryExito(valorNuevo, modoDialogCategory))

        } catch (error) {

            dispatch (cambiarVisibilidadModalNuevoCategoryError(true))
        }
    }
}

const cambiarVisibilidadModalNuevoCategory = () => ({
    type: CAMBIAR_MODAL_NEW_CATEGORY,
    payload: true

})

const cambiarVisibilidadModalNuevoCategoryExito = (valorNuevo, modoDialogCategory) => ({
    type: CAMBIAR_MODAL_NEW_CATEGORY_EXITO,
    nombre: modoDialogCategory,
    payload: valorNuevo

})

const cambiarVisibilidadModalNuevoCategoryError = estado => ({
  type:  CAMBIAR_MODAL_NEW_CATEGORY_ERROR,
  payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewCategoryAPIAction(categoria) {

    return async (dispatch) => {
        dispatch (createNewCategory())
             axios({
                    method: "POST",
                    url: urlCategoriaApi,
                    data: categoria,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (createNewCategoryExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Category successfully created",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarCategoryAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (createNewCategoryError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Category",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewCategory = (categoria) => ({
    type: INSERTAR_NEW_CATEGORY,
    payload: categoria

})

const createNewCategoryExito = estado => ({
    type: INSERTAR_NEW_CATEGORY_EXITO,
    payload: estado

})

const createNewCategoryError = estado => ({
    type:  INSERTAR_NEW_CATEGORY_ERROR,
    payload: estado
})

//PUT CATEGORY

export function putCategoryAPIAction(id,categoria) {

    return async (dispatch) => {
        dispatch (putCategory())
             axios({
                    method: "PUT",
                    url: urlCategoriaApi + id,
                    data: categoria,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putCategoryExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Category successfully modified",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarCategoryAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (putCategoryError(true))

                dispatch(
                    showMessage({
                        message: "Error modified Category",
                        variant: "error"
                    })
                )
            })

    }
}

const putCategory = () => ({
    type: PUT_CATEGORY,
    payload: true

})

const putCategoryExito = estado => ({
    type: PUT_CATEGORY_EXITO,
    payload: estado

})

const putCategoryError = estado => ({
    type:  PUT_CATEGORY_ERROR,
    payload: estado
})

//************************ MOSTRAR CATEGORY API GET **********************************************

export function mostrarCategoryDesactivateAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarCategoryAPI(true))

        
            await axios({
                method: "GET",
                url: urlCategoriaApi + "noActive/",
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarCategoryAPIExito(response.data))

                        dispatch(cambiarValorSeleccionAction(''))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarCategoryAPIError(true))
                    })

          }
}

export function mostrarCategoryAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarCategoryAPI(true))

        
            await axios({
                method: "GET",
                url: urlCategoriaApi,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarCategoryAPIExito(response.data))

                        dispatch(cambiarValorSeleccionAction(''))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarCategoryAPIError(true))
                    })

          }
}

const mostrarCategoryAPI = (estado) => ({
    type: MOSTRAR_CATEGORY,
    payload: true

})

const mostrarCategoryAPIExito = categorias => ({
    type: MOSTRAR_CATEGORY_EXITO,
    payload: categorias

})

const mostrarCategoryAPIError = estado => ({
  type: MOSTRAR_CATEGORY_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID_CATEGORY,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_CATEGORY_ERROR,
  payload: estado
})
