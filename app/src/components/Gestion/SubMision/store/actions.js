import {

    ELIMINAR_CONTRACT_USER,
    ELIMINAR_CONTRACT_USER_EXITO,
    ELIMINAR_CONTRACT_USER_ERROR,

    VER_MODAL_ASSIGNED_PEOPLE,
    VER_MODAL_ASSIGNED_PEOPLE_EXITO,
    VER_MODAL_ASSIGNED_PEOPLE_ERROR,

    GET_PEOPLE_CONTRATO,
    GET_PEOPLE_CONTRATO_EXITO,
    GET_PEOPLE_CONTRATO_ERROR,

    POST_PEOPLE_CONTRATO,
    POST_PEOPLE_CONTRATO_EXITO,
    POST_PEOPLE_CONTRATO_ERROR,

    GET_APP_SUB_MISION,
    GET_APP_SUB_MISION_EXITO,
    GET_APP_SUB_MISION_ERROR,

    GET_ALL_SUB_MISION,
    GET_ALL_SUB_MISION_EXITO,
    GET_ALL_SUB_MISION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION,
    CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_ERROR,

    VER_MODAL_INSERT_SUB_MISION,
    VER_MODAL_INSERT_SUB_MISION_EXITO,
    VER_MODAL_INSERT_SUB_MISION_ERROR,

    POST_SUB_MISION,
    POST_SUB_MISION_EXITO,
    POST_SUB_MISION_ERROR,

    PUT_SUB_MISION,
    PUT_SUB_MISION_EXITO,
    PUT_SUB_MISION_ERROR,

    PUT_PEOPLE_CONTRATO,
    PUT_PEOPLE_CONTRATO_EXITO,
    PUT_PEOPLE_CONTRATO_ERROR,

    VER_MODAL_ASSIGNED_APP,
    VER_MODAL_ASSIGNED_APP_EXITO,
    VER_MODAL_ASSIGNED_APP_ERROR,

    POST_CONTRACT_APP,
    POST_CONTRACT_APP_EXITO,
    POST_CONTRACT_APP_ERROR,

    ELIMINAR_CONTRACT_APP,
    ELIMINAR_CONTRACT_APP_EXITO,
    ELIMINAR_CONTRACT_APP_ERROR,

    GET_ALL_JOB,
    GET_ALL_JOB_EXITO,
    GET_ALL_JOB_ERROR,

    VER_MODAL_GESTION_TRABAJOS,
    VER_MODAL_GESTION_TRABAJOS_EXITO,
    VER_MODAL_GESTION_TRABAJOS_ERROR,

    POST_JOB_SUB_MISION,
    POST_JOB_SUB_MISION_EXITO,
    POST_JOB_SUB_MISION_ERROR,

    PUT_JOB_SUB_MISION,
    PUT_JOB_SUB_MISION_EXITO,
    PUT_JOB_SUB_MISION_ERROR


} from './types';
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'


//Constantes
const urlContractUserAPI = process.env.REACT_APP_URL_DJANGO + "/api/contractuserByContratoUser/"
const urlSubMisionAPI = process.env.REACT_APP_URL_DJANGO + "/api/subMision/"
const urlUserAppApi = process.env.REACT_APP_URL_DJANGO + "/api/userAppByUser/"
const urlContractAppApi = process.env.REACT_APP_URL_DJANGO + "/api/contractAppByContract/"
const urlContractUser = process.env.REACT_APP_URL_DJANGO + "/api/contractuser/"
const urlContractApp = process.env.REACT_APP_URL_DJANGO + "/api/contractApp/"
const urlJobSubMisionAPI = process.env.REACT_APP_URL_DJANGO + "/api/jobInSubMision/"

//************************PUT JOB SUB MISION**********************************************

export function putJobSubMisionAPIAction(idJobSubMision, contractApp, modoPut) {

    return  (dispatch) => {
        dispatch (putJobSubMisionAPI())

            
             axios({
                    method: "PUT",
                    url: urlJobSubMisionAPI + idJobSubMision,
                    data: contractApp,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putJobSubMisionAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: modoPut == "editar" ? "Changed job in sub mision" : "Delete job in sub mision",
                        variant: "success"
                    })
                 )
                 dispatch (getAllJobAPIAction(contractApp.sub_mision))
             })
             .catch(error => {
                console.log(error.response)
                dispatch (putJobSubMisionAPIError(true))

                dispatch(
                    showMessage({
                        message: modoPut == "editar" ? "Error when changed job in Sub Mission" : "Error when delete job in Sub Mission",
                        variant: "error"
                    })
                )
            })

    }
}

const putJobSubMisionAPI = (programa) => ({
    type: PUT_JOB_SUB_MISION,
    payload: programa

})

const putJobSubMisionAPIExito = estado => ({
    type: PUT_JOB_SUB_MISION_EXITO,
    payload: estado

})

const putJobSubMisionAPIError = estado => ({
    type:  PUT_JOB_SUB_MISION_ERROR,
    payload: estado
})

//************************POST JOB SUB MISION**********************************************

export function postJobSubMisionAPIAction(contractApp) {

    return  (dispatch) => {
        dispatch (postJobSubMisionAPI())

            
             axios({
                    method: "POST",
                    url: urlJobSubMisionAPI,
                    data: contractApp,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (postJobSubMisionAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Created job in sub mision",
                        variant: "success"
                    })
                 )
                 dispatch (getAllJobAPIAction(contractApp.sub_mision))
             })
             .catch(error => {
                console.log(error.response)
                dispatch (postJobSubMisionAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created job in Sub Mission",
                        variant: "error"
                    })
                )
            })

    }
}

const postJobSubMisionAPI = (programa) => ({
    type: POST_JOB_SUB_MISION,
    payload: programa

})

const postJobSubMisionAPIExito = estado => ({
    type: POST_JOB_SUB_MISION_EXITO,
    payload: estado

})

const postJobSubMisionAPIError = estado => ({
    type:  POST_JOB_SUB_MISION_ERROR,
    payload: estado
})

//************************ GET ALL TRABAJOS DE SUBMISION **********************************************

export function getAllJobAPIAction(idSubMision) {

    return async (dispatch) => {
        dispatch (getAllJobAPI())
             axios({
                    method: "GET",
                    url: urlJobSubMisionAPI + "mySubMision/" + idSubMision,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (getAllJobAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (getAllJobAPIError(true))
            })

    }
}

const getAllJobAPI = (user) => ({
    type: GET_ALL_JOB,
    payload: user

})

const getAllJobAPIExito = notification => ({
    type: GET_ALL_JOB_EXITO,
    payload: notification

})

const getAllJobAPIError = estado => ({
    type: GET_ALL_JOB_ERROR,
    payload: estado
})

//************************ DELETE CONTRACT USER**********************************************

export function deleteContractAppAPIAction(id, idSubMision) {

    return async (dispatch) => {
        dispatch ( deleteContractApp())

                await axios({
                    method: "DELETE",
                    url: urlContractApp + id,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                         .then(response=>{
                            dispatch (deleteContractAppExito(false))
    
                            dispatch(
                                showMessage({
                                    message: "Correctly removed",
                                    variant: "success"
                                })
                            )
    
                            dispatch (obtenerContractAppAPIAction(idSubMision))
                            
                        })
                        
                     .catch(error => {
                        console.log(error.response)
                        dispatch (deleteContractAppError(false))
                        dispatch(
                            showMessage({
                                message: "Error when deleting",
                                variant: "error"
                            })
                        )
                    })

       
      }
}

const deleteContractApp = (id) => ({
    type: ELIMINAR_CONTRACT_APP,
    payload: id

})

const deleteContractAppExito = estado => ({
    type: ELIMINAR_CONTRACT_APP_EXITO,
    payload: estado

})

const deleteContractAppError = estado => ({
    type:  ELIMINAR_CONTRACT_APP_ERROR,
    payload: estado
})

//************************POST CONTRACT APP**********************************************

export function postContractAppAPIAction(contractApp) {

    return  (dispatch) => {
        dispatch (postContractAppAPI())

            
             axios({
                    method: "POST",
                    url: urlContractApp,
                    data: contractApp,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (postContractAppAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Created requirement in sub mision",
                        variant: "success"
                    })
                 )
                 dispatch (obtenerContractAppAPIAction(contractApp.subMision_id))
             })
             .catch(error => {
                console.log(error.response)
                dispatch (postContractAppAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created requirement in Sub Mission",
                        variant: "error"
                    })
                )
            })

    }
}

const postContractAppAPI = (programa) => ({
    type: POST_CONTRACT_APP,
    payload: programa

})

const postContractAppAPIExito = estado => ({
    type: POST_CONTRACT_APP_EXITO,
    payload: estado

})

const postContractAppAPIError = estado => ({
    type:  POST_CONTRACT_APP_ERROR,
    payload: estado
})

//************************PUT SUB MISION**********************************************

export function putSubMisionAPIAction(idSubMision, subMisionNew) {

    return  (dispatch) => {
        dispatch (putSubMisionAPI())

            
             axios({
                    method: "PUT",
                    url: urlSubMisionAPI + idSubMision,
                    data: subMisionNew,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putSubMisionAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Updated sub mision",
                        variant: "success"
                    })
                )
                dispatch(getSubMisionAPIAction())
             })
             .catch(error => {
                console.log(error.response)
                dispatch (putSubMisionAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when update Sub Mission",
                        variant: "error"
                    })
                )
            })

    }
}

const putSubMisionAPI = (programa) => ({
    type: PUT_SUB_MISION,
    payload: programa

})

const putSubMisionAPIExito = estado => ({
    type: PUT_SUB_MISION_EXITO,
    payload: estado

})

const putSubMisionAPIError = estado => ({
    type:  PUT_SUB_MISION_ERROR,
    payload: estado
})

//************************POST SUB MISION**********************************************

export function postSubMisionAPIAction(subMisionNew) {

    return  (dispatch) => {
        dispatch (postSubMisionAPI())

            
             axios({
                    method: "POST",
                    url: urlSubMisionAPI,
                    data: subMisionNew,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (postSubMisionAPIExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Created sub mision",
                        variant: "success"
                    })
                 )
                 dispatch (getSubMisionAPIAction())
             })
             .catch(error => {
                console.log(error.response)
                dispatch (postSubMisionAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created Sub Mission",
                        variant: "error"
                    })
                )
            })

    }
}

const postSubMisionAPI = (programa) => ({
    type: POST_SUB_MISION,
    payload: programa

})

const postSubMisionAPIExito = estado => ({
    type: POST_SUB_MISION_EXITO,
    payload: estado

})

const postSubMisionAPIError = estado => ({
    type:  POST_SUB_MISION_ERROR,
    payload: estado
})

export function seleccionarSubMisionTablaAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (seleccionarSubMisionTabla())

        try {
            dispatch (seleccionarSubMisionTablaExito(valorNuevo))
            

        } catch (error) {

            dispatch (seleccionarSubMisionTablaError(true))
        }

    }

}

const seleccionarSubMisionTabla = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION,
    payload: false

})

const seleccionarSubMisionTablaExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_EXITO,
    payload: valorNuevo

})

const seleccionarSubMisionTablaError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_SUB_MISION_ERROR,
  payload: estado
})

//************************ GET SUB MISIONES**********************************************

export function getSubMisionAPIAction() {

    return async (dispatch) => {
        dispatch (getSubMisionAPI())
             axios({
                    method: "GET",
                    url: urlSubMisionAPI,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (getSubMisionAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (getSubMisionAPIError(true))
            })

    }
}

const getSubMisionAPI = (user) => ({
    type: GET_ALL_SUB_MISION,
    payload: user

})

const getSubMisionAPIExito = notification => ({
    type: GET_ALL_SUB_MISION_EXITO,
    payload: notification

})

const getSubMisionAPIError = estado => ({
    type: GET_ALL_SUB_MISION_ERROR,
    payload: estado
})

//************************ DELETE CONTRACT USER**********************************************

export function deleteContractUserAPIAction(datos) {

    return async (dispatch) => {
        dispatch ( deleteContractUser())

                await axios({
                    method: "DELETE",
                    url: urlContractUserAPI,
                    data: datos,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                         .then(response=>{
                            dispatch (deleteContractUserExito(datos))
    
                            dispatch(
                                showMessage({
                                    message: "Correctly removed",
                                    variant: "success"
                                })
                            )
                            
                            dispatch(obtenerPersonalAsignadoContratoAPIAction(datos['subMision_id']))
                            
                        })
                        
                     .catch(error => {
                        console.log(error.response)
                        dispatch (deleteContractUserError(false))
                        dispatch(
                            showMessage({
                                message: "Error when deleting",
                                variant: "error"
                            })
                        )
                    })

       
      }
}

const deleteContractUser = (id) => ({
    type: ELIMINAR_CONTRACT_USER,
    payload: id

})

const deleteContractUserExito = estado => ({
    type: ELIMINAR_CONTRACT_USER_EXITO,
    payload: estado['subMision_id']

})

const deleteContractUserError = estado => ({
    type:  ELIMINAR_CONTRACT_USER_ERROR,
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
    type: VER_MODAL_INSERT_SUB_MISION,
    payload: true

})

const cambiarVisibilidadModalInsertarAPIExito = (valorNuevo, modoApertura) => ({
    type: VER_MODAL_INSERT_SUB_MISION_EXITO,
    payload: valorNuevo,
    modoApertura: modoApertura

})

const cambiarVisibilidadModalInsertarAPIError = estado => ({
  type: VER_MODAL_INSERT_SUB_MISION_ERROR,
  payload: estado
})

//************************ MOSTRAR DIALOGO VER APP ASIGNADAS A CONTRATO API **********************************************

export function cambiarVisibilidadModalAssignedAppAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalAssignedAppAPI())

        try {
            dispatch (cambiarVisibilidadModalAssignedAppAPIExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalAssignedAppAPIError(true))
        }

    }
}

const cambiarVisibilidadModalAssignedAppAPI = () => ({
    type: VER_MODAL_ASSIGNED_APP,
    payload: true

})

const cambiarVisibilidadModalAssignedAppAPIExito = (valorNuevo) => ({
    type: VER_MODAL_ASSIGNED_APP_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalAssignedAppAPIError = estado => ({
  type: VER_MODAL_ASSIGNED_APP_ERROR,
  payload: estado
})

//************************ MOSTRAR DIALOGO VER TRABAJADORES ASIGNADOS A CONTRATO API **********************************************

export function cambiarVisibilidadModalTrabajoAPIAction(valorNuevo, modoApertura) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalTrabajoAPI())

        try {
            dispatch (cambiarVisibilidadModalTrabajoAPIExito(valorNuevo, modoApertura))

        } catch (error) {

            dispatch (cambiarVisibilidadModalTrabajoAPIError(true))
        }

    }
}

const cambiarVisibilidadModalTrabajoAPI = () => ({
    type: VER_MODAL_GESTION_TRABAJOS,
    payload: true

})

const cambiarVisibilidadModalTrabajoAPIExito = (valorNuevo, modoApertura) => ({
    type: VER_MODAL_GESTION_TRABAJOS_EXITO,
    payload: valorNuevo,
    modoApertura: modoApertura

})

const cambiarVisibilidadModalTrabajoAPIError = estado => ({
  type: VER_MODAL_GESTION_TRABAJOS_ERROR,
  payload: estado
})

//************************ MOSTRAR DIALOGO VER PERSONAS ASIGNADAS A CONTRATO API **********************************************

export function cambiarVisibilidadModalAssignedPeopleAPIAction(valorNuevo, modoApertura) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalAssignedPeopleAPI())

        try {
            dispatch (cambiarVisibilidadModalAssignedPeopleAPIExito(valorNuevo, modoApertura))

        } catch (error) {

            dispatch (cambiarVisibilidadModalAssignedPeopleAPIError(true))
        }

    }
}

const cambiarVisibilidadModalAssignedPeopleAPI = () => ({
    type: VER_MODAL_ASSIGNED_PEOPLE,
    payload: true

})

const cambiarVisibilidadModalAssignedPeopleAPIExito = (valorNuevo, modoApertura) => ({
    type: VER_MODAL_ASSIGNED_PEOPLE_EXITO,
    payload: valorNuevo,
    modoApertura: modoApertura

})

const cambiarVisibilidadModalAssignedPeopleAPIError = estado => ({
  type: VER_MODAL_ASSIGNED_PEOPLE_ERROR,
  payload: estado
})


//************************ MOSTRAR PERSONAS ASIGNADAS A CONTRATO**********************************************

export function obtenerPersonalAsignadoContratoAPIAction(idContrato) {

    return async (dispatch) => {
        dispatch (obtenerPersonalAsignadoContratoAPI(true))

        
            await axios({
                method: "GET",
                url: urlContractUserAPI+idContrato,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (obtenerPersonalAsignadoContratoAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (obtenerPersonalAsignadoContratoAPIError(true))
                    })

          }
}

const obtenerPersonalAsignadoContratoAPI = () => ({
    type: GET_PEOPLE_CONTRATO,
    payload: true

})

const obtenerPersonalAsignadoContratoAPIExito = programas => ({
    type: GET_PEOPLE_CONTRATO_EXITO,
    payload: programas

})

const obtenerPersonalAsignadoContratoAPIError = estado => ({
  type: GET_PEOPLE_CONTRATO_ERROR,
  payload: estado
})

//************************ PUT PERSONA CONTRATO**********************************************

export function putPersonalAsignadoContratoAPIAction(idItem, datos) {

    return async (dispatch) => {
        dispatch (putPersonalAsignadoContratoAPI(true))

        
            await axios({
                method: "PUT",
                url: urlContractUser + idItem,
                data: datos,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (putPersonalAsignadoContratoAPIExito(response.data)) 
                        dispatch(
                            showMessage({
                                message: "Correct update",
                                variant: "success"
                            })
                         )
                         dispatch (obtenerPersonalAsignadoContratoAPIAction(datos.subMision_id))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (putPersonalAsignadoContratoAPIError(true))
                        dispatch(
                            showMessage({
                                message: "Error",
                                variant: "error"
                            })
                        )
                    })

          }
}

const putPersonalAsignadoContratoAPI = () => ({
    type: PUT_PEOPLE_CONTRATO,
    payload: true

})

const putPersonalAsignadoContratoAPIExito = programas => ({
    type: PUT_PEOPLE_CONTRATO_EXITO,
    payload: programas

})

const putPersonalAsignadoContratoAPIError = estado => ({
  type: PUT_PEOPLE_CONTRATO_ERROR,
  payload: estado
})


//************************ ASIGNAR PERSONA A CONTRATO**********************************************

export function postPersonalAsignadoContratoAPIAction(datos, mensajeSINO, subMisionBusqueda) {

    return async (dispatch) => {
        dispatch (postPersonalAsignadoContratoAPI(true))

        
            await axios({
                method: "POST",
                url: urlContractUser,
                data: datos,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (postPersonalAsignadoContratoAPIExito(response.data)) 
                        if(mensajeSINO == true){
                            dispatch(
                                showMessage({
                                    message: "Person correctly assigned",
                                    variant: "success"
                                })
                             )
                        }
                         dispatch (obtenerPersonalAsignadoContratoAPIAction(subMisionBusqueda))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (postPersonalAsignadoContratoAPIError(true))
                        dispatch(
                            showMessage({
                                message: "Error",
                                variant: "error"
                            })
                        )
                    })

          }
}

const postPersonalAsignadoContratoAPI = () => ({
    type: POST_PEOPLE_CONTRATO,
    payload: true

})

const postPersonalAsignadoContratoAPIExito = programas => ({
    type: POST_PEOPLE_CONTRATO_EXITO,
    payload: programas

})

const postPersonalAsignadoContratoAPIError = estado => ({
  type: POST_PEOPLE_CONTRATO_ERROR,
  payload: estado
})

//************************ GET APP DE CONTRACTO**********************************************

export function obtenerContractAppAPIAction(idContrato) {

    return async (dispatch) => {
        dispatch (obtenerContractAppAPI(true))

        
            await axios({
                method: "GET",
                url: urlContractAppApi+idContrato,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (obtenerContractAppAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (obtenerContractAppAPIError(true))
                    })

          }
}

const obtenerContractAppAPI = () => ({
    type: GET_APP_SUB_MISION,
    payload: true

})

const obtenerContractAppAPIExito = programas => ({
    type: GET_APP_SUB_MISION_EXITO,
    payload: programas

})

const obtenerContractAppAPIError = estado => ({
  type: GET_APP_SUB_MISION_ERROR,
  payload: estado
})