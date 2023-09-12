import {

    GET_ALL_MISION,
    GET_ALL_MISION_EXITO,
    GET_ALL_MISION_ERROR,

    PUT_MISION,
    PUT_MISION_EXITO,
    PUT_MISION_ERROR,

    POST_MISION,
    POST_MISION_EXITO,
    POST_MISION_ERROR,

    VER_MODAL_INSERT_MISION,
    VER_MODAL_INSERT_MISION_EXITO,
    VER_MODAL_INSERT_MISION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_MISION,
    CAMBIAR_VALOR_SELECCION_GRID_MISION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_MISION_ERROR,
    
    GET_RO_MISION,
    GET_RO_MISION_EXITO,
    GET_RO_MISION_ERROR,

    VER_MODAL_REQUERIMENTS_MISION,
    VER_MODAL_REQUERIMENTS_MISION_EXITO,
    VER_MODAL_REQUERIMENTS_MISION_ERROR,

    GET_REQUERIMENTS_BY_MISION,
    GET_REQUERIMENTS_BY_MISION_EXITO,
    GET_REQUERIMENTS_BY_MISION_ERROR,

    POST_MISION_APP,
    POST_MISION_APP_EXITO,
    POST_MISION_APP_ERROR,

    ELIMINAR_MISION_APP,
    ELIMINAR_MISION_APP_EXITO,
    ELIMINAR_MISION_APP_ERROR


} from './types';
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'
import {gestionLog} from '../../../Managment/Log/store/actions'


//Constantes
const urlMisionApi = process.env.REACT_APP_URL_DJANGO + "/api/mision/"
const urlRequerimentsMisionApi = process.env.REACT_APP_URL_DJANGO + "/api/misionApp/"
const urlRequerimentsByMisionApi = process.env.REACT_APP_URL_DJANGO + "/api/misionAppByContract/"
const urlMisionExtraApi = process.env.REACT_APP_URL_DJANGO + "/api/mision/misMisiones/"
const urlRiskOportunitysByMision = process.env.REACT_APP_URL_DJANGO + "/api/rm_risk_opportunity/roByMision/"

//************************ DELETE CONTRACT USER**********************************************

export function deleteMisionAppAPIAction(id, idSubMision) {

    return async (dispatch) => {
        dispatch ( deleteMisionAppAPI())

                await axios({
                    method: "DELETE",
                    url: urlRequerimentsMisionApi + id,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                         .then(response=>{
                            dispatch (deleteMisionAppAPIExito(false))
    
                            dispatch(
                                showMessage({
                                    message: "Correctly removed",
                                    variant: "success"
                                })
                            )
    
                            dispatch (mostrarAllRequerimentsByMisionAPIAction(idSubMision))
                            
                        })
                        
                     .catch(error => {
                        console.log(error.response)
                        dispatch (deleteMisionAppAPIError(false))
                        dispatch(
                            showMessage({
                                message: "Error when deleting",
                                variant: "error"
                            })
                        )
                    })

       
      }
}

const deleteMisionAppAPI = (id) => ({
    type: ELIMINAR_MISION_APP,
    payload: id

})

const deleteMisionAppAPIExito = estado => ({
    type: ELIMINAR_MISION_APP_EXITO,
    payload: estado

})

const deleteMisionAppAPIError = estado => ({
    type:  ELIMINAR_MISION_APP_ERROR,
    payload: estado
})

//************************POST MISION**********************************************

export function postMisionAppAPIAction(misionSelect, newMisionApp) {

    return  (dispatch) => {
        dispatch (postMisionAppAPI())

            
             axios({
                    method: "POST",
                    url: urlRequerimentsMisionApi,
                    data: newMisionApp,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (postMisionAppAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Created requeriments",
                        variant: "success"
                    })
                 )
                 
                 dispatch (mostrarAllRequerimentsByMisionAPIAction(misionSelect))
             })
             .catch(error => {
                console.log(error.response)
                dispatch (postMisionAppAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created requeriments",
                        variant: "error"
                    })
                )
            })

    }
}

const postMisionAppAPI = (programa) => ({
    type: POST_MISION_APP,
    payload: programa

})

const postMisionAppAPIExito = estado => ({
    type: POST_MISION_APP_EXITO,
    payload: estado

})

const postMisionAppAPIError = estado => ({
    type:  POST_MISION_APP_ERROR,
    payload: estado
})

//************************ MOSTRAR TODAS LOS REQUERIMIENTOS DE UNA MISION **********************************************

export function mostrarAllRequerimentsByMisionAPIAction(idMision) {

    return async (dispatch) => {
        dispatch (mostrarAllRequerimentsByMisionAPI(true))

        
            await axios({
                method: "GET",
                url: urlRequerimentsByMisionApi + idMision,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarAllRequerimentsByMisionAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarAllRequerimentsByMisionAPIError(true))
                    })

          }
}

const mostrarAllRequerimentsByMisionAPI = () => ({
    type: GET_REQUERIMENTS_BY_MISION,
    payload: false

})

const mostrarAllRequerimentsByMisionAPIExito = programas => ({
    type: GET_REQUERIMENTS_BY_MISION_EXITO,
    payload: programas

})

const mostrarAllRequerimentsByMisionAPIError = estado => ({
  type: GET_REQUERIMENTS_BY_MISION_ERROR,
  payload: estado
})


//************************ MOSTRAR DEPARTAMENTOS-MISION API **********************************************

export function getROByMisionAPIAction(idMision) {

    return async (dispatch) => {
        dispatch (getROByMisionAPI(true))

            await axios({
                method: "GET",
                url: urlRiskOportunitysByMision + idMision,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (getROByMisionAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (getROByMisionAPIError(true))
                    })

          }
}

const getROByMisionAPI = () => ({
    type: GET_RO_MISION,
    payload: true

})

const getROByMisionAPIExito = programas => ({
    type: GET_RO_MISION_EXITO,
    payload: programas

})

const getROByMisionAPIError = estado => ({
  type: GET_RO_MISION_ERROR,
  payload: estado
})


//************************ SELECCIONAR MISION API **********************************************
export function seleccionarMisionTablaAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (seleccionarMisionTabla())

        try {
            dispatch (seleccionarMisionTablaExito(valorNuevo))
            

        } catch (error) {

            dispatch (seleccionarMisionTablaError(true))
        }

    }

}

const seleccionarMisionTabla = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_MISION,
    payload: false

})

const seleccionarMisionTablaExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_MISION_EXITO,
    payload: valorNuevo

})

const seleccionarMisionTablaError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_MISION_ERROR,
  payload: estado
})

//************************ MOSTRAR MISION DEL USUARIO Y MISIONES ASOCIADAS A LAS SUBMISIONES API **********************************************

export function mostrarMisionIncluyendoMisionesHeredadasAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch (mostrarMisionAPI(true))

        
            await axios({
                method: "GET",
                url: urlMisionExtraApi + idPersona,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarMisionAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarMisionAPIError(true))
                    })

          }
}

//************************ MOSTRAR MISION API **********************************************

export function mostrarMisionAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarMisionAPI(true))

        
            await axios({
                method: "GET",
                url: urlMisionApi,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarMisionAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarMisionAPIError(true))
                    })

          }
}

const mostrarMisionAPI = () => ({
    type: GET_ALL_MISION,
    payload: true

})

const mostrarMisionAPIExito = programas => ({
    type: GET_ALL_MISION_EXITO,
    payload: programas

})

const mostrarMisionAPIError = estado => ({
  type: GET_ALL_MISION_ERROR,
  payload: estado
})

//************************PUT MISION**********************************************

export function putMisionAPIAction(idMision, subMisionNew) {

    return  (dispatch) => {
        dispatch (putMisionAPI())

            
             axios({
                    method: "PUT",
                    url: urlMisionApi + idMision,
                    data: subMisionNew,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putMisionAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Updated mission",
                        variant: "success"
                    })
                 )

                 dispatch (mostrarMisionAPIAction())
             })
             .catch(error => {
                console.log(error.response)
                dispatch (putMisionAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when update Sub Mission",
                        variant: "error"
                    })
                )
            })

    }
}

const putMisionAPI = (programa) => ({
    type: PUT_MISION,
    payload: programa

})

const putMisionAPIExito = estado => ({
    type: PUT_MISION_EXITO,
    payload: estado

})

const putMisionAPIError = estado => ({
    type:  PUT_MISION_ERROR,
    payload: estado
})

//************************POST MISION**********************************************

export function postMisionAPIAction(subMisionNew) {

    return  (dispatch) => {
        dispatch (postMisionAPI())

            
             axios({
                    method: "POST",
                    url: urlMisionApi,
                    data: subMisionNew,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (postMisionAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Created mission",
                        variant: "success"
                    })
                 )

                 dispatch (mostrarMisionAPIAction())
             })
             .catch(error => {
                console.log(error.response)
                dispatch (postMisionAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created Sub Mission",
                        variant: "error"
                    })
                )
            })

    }
}

const postMisionAPI = (programa) => ({
    type: POST_MISION,
    payload: programa

})

const postMisionAPIExito = estado => ({
    type: POST_MISION_EXITO,
    payload: estado

})

const postMisionAPIError = estado => ({
    type:  POST_MISION_ERROR,
    payload: estado
})

//************************ MOSTRAR DIALOGO INSERTAR MISION **********************************************

export function cambiarVisibilidadModalInsertarAPIAction(valorNuevo, modoApertura) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalInsertarAPI())

        try {
            dispatch (cambiarVisibilidadModalInsertarAPIExito(valorNuevo, modoApertura))

        } catch (error) {

            dispatch (cambiarVisibilidadModalInsertarAPIError(true))
        }

    }
}

const cambiarVisibilidadModalInsertarAPI = () => ({
    type: VER_MODAL_INSERT_MISION,
    payload: true

})

const cambiarVisibilidadModalInsertarAPIExito = (valorNuevo, modoApertura) => ({
    type: VER_MODAL_INSERT_MISION_EXITO,
    payload: valorNuevo,
    modoApertura: modoApertura

})

const cambiarVisibilidadModalInsertarAPIError = estado => ({
  type: VER_MODAL_INSERT_MISION_ERROR,
  payload: estado
})

//************************ MOSTRAR DIALOGO INSERTAR MISION **********************************************

export function cambiarVisibilidadModalRequerimentsAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalRequerimentsAPI())

        try {
            dispatch (cambiarVisibilidadModalRequerimentsAPIExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalRequerimentsAPIError(true))
        }

    }
}

const cambiarVisibilidadModalRequerimentsAPI = () => ({
    type: VER_MODAL_REQUERIMENTS_MISION,
    payload: true

})

const cambiarVisibilidadModalRequerimentsAPIExito = (valorNuevo) => ({
    type: VER_MODAL_REQUERIMENTS_MISION_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalRequerimentsAPIError = estado => ({
  type: VER_MODAL_REQUERIMENTS_MISION_ERROR,
  payload: estado
})