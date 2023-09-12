import {

    MOSTRAR_USER,
    MOSTRAR_USER_EXITO,
    MOSTRAR_USER_ERROR,

    SESION_USER,
    SESION_USER_EXITO,
    SESION_USER_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_USER,
    CAMBIAR_VALOR_SELECCION_GRID_USER_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_USER_ERROR,

    OBTENER_CONTRATOS_USER,
    OBTENER_CONTRATOS_USER_EXITO,
    OBTENER_CONTRATOS_USER_EXITO_RESPALDO,
    OBTENER_CONTRATOS_USER_ERROR,

    PERMISOS_SESION_USER,
    PERMISOS_SESION_USER_EXITO,
    PERMISOS_SESION_USER_ERROR,

    MOSTRAR_USER_PERMISOS,
    MOSTRAR_USER_PERMISOS_EXITO,
    MOSTRAR_USER_PERMISOS_ERROR,

    PUT_USER,
    PUT_USER_EXITO,
    PUT_USER_ERROR,

    INSERTAR_NEW_USER,
    INSERTAR_NEW_USER_EXITO,
    INSERTAR_NEW_USER_ERROR,

    MOSTRAR_USER_PERMISOS_BY_GROUP,
    MOSTRAR_USER_PERMISOS_BY_GROUP_EXITO,
    MOSTRAR_USER_PERMISOS_BY_GROUP_ERROR,

    MOSTRAR_ALL_USER,
    MOSTRAR_ALL_USER_EXITO,
    MOSTRAR_ALL_USER_ERROR,

    PUT_PASSWORD_USER,
    PUT_PASSWORD_USER_EXITO,
    PUT_PASSWORD_USER_ERROR,

    PUT_PASSWORD_USER_MANUAL,
    PUT_PASSWORD_USER_MANUAL_EXITO,
    PUT_PASSWORD_USER_MANUAL_ERROR,

    GET_BLOQUES_HEREDADOS,
    GET_BLOQUES_HEREDADOS_EXITO,
    GET_BLOQUES_HEREDADOS_ERROR,

    OBTENER_SUB_MISION_DIRECTAS,
    OBTENER_SUB_MISION_DIRECTAS_EXITO,
    OBTENER_SUB_MISION_DIRECTAS_ERROR,

    OBTENER_MISION_DIRECTAS,
    OBTENER_MISION_DIRECTAS_EXITO,
    OBTENER_MISION_DIRECTAS_ERROR,

    OBTENER_WP_DIRECTAS,
    OBTENER_WP_DIRECTAS_EXITO,
    OBTENER_WP_DIRECTAS_ERROR,

    OBTENER_DEPARTAMENTOS_DIRECTAS,
    OBTENER_DEPARTAMENTOS_DIRECTAS_EXITO,
    OBTENER_DEPARTAMENTOS_DIRECTAS_ERROR,

    OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS,
    OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_EXITO,
    OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_ERROR,

    CAMBIAR_MODAL_NEW_USER,
    CAMBIAR_MODAL_NEW_USER_EXITO,
    CAMBIAR_MODAL_NEW_USER_ERROR,
    
    CAMBIAR_MODAL_INSERT_PERMISSIONS,
    CAMBIAR_MODAL_INSERT_PERMISSIONS_EXITO,
    CAMBIAR_MODAL_INSERT_PERMISSIONS_ERROR

} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlUserApi = process.env.REACT_APP_URL_DJANGO + "/api/user/"
const urlAuthApi = process.env.REACT_APP_URL_DJANGO + "/api/auth/token/"
const urlAuthPermisosApi = process.env.REACT_APP_URL_DJANGO + "/api/auth/token/permisos/"
const urlContratosUserApi = process.env.REACT_APP_URL_DJANGO + "/api/contractuserByUser/"
const urlMisionResponsableApi = process.env.REACT_APP_URL_DJANGO + "/api/subMision/misSubmisiones"

//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function cambiarVisibilidadModalInsertarPermissionsAPI(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalInsertarPermisos())

        try {
            dispatch (cambiarVisibilidadModalInsertarPermisosExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalInsertarPermisosError(true))
        }
    }
}

const cambiarVisibilidadModalInsertarPermisos = () => ({
    type: CAMBIAR_MODAL_INSERT_PERMISSIONS,
    payload: true

})

const cambiarVisibilidadModalInsertarPermisosExito = valorNuevo => ({
    type: CAMBIAR_MODAL_INSERT_PERMISSIONS_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalInsertarPermisosError = estado => ({
  type:  CAMBIAR_MODAL_INSERT_PERMISSIONS_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function cambiarVisibilidadModalInsertarUserAPI(valorNuevo, modoDialogUser) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalNuevoUser())

        try {
            dispatch (cambiarVisibilidadModalNuevoUserExito(valorNuevo, modoDialogUser))

        } catch (error) {

            dispatch (cambiarVisibilidadModalNuevoUserError(true))
        }
    }
}

const cambiarVisibilidadModalNuevoUser = () => ({
    type: CAMBIAR_MODAL_NEW_USER,
    payload: true

})

const cambiarVisibilidadModalNuevoUserExito = (valorNuevo, modoDialogUser) => ({
    type: CAMBIAR_MODAL_NEW_USER_EXITO,
    nombre: modoDialogUser,
    payload: valorNuevo

})

const cambiarVisibilidadModalNuevoUserError = estado => ({
  type:  CAMBIAR_MODAL_NEW_USER_ERROR,
  payload: estado
})


//************************ OBTENER DireccionDepartamental DIRECTAS DEL USUARIO**********************************************

export function obtenerDireccionDepartamentalDirectasAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(obtenerDireccionDepartamentalDirectasAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + "misDireccionDepartamentalDirectas/" + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerDireccionDepartamentalDirectasAPIExito(response.data))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerDireccionDepartamentalDirectasAPIError(true))
            })

    }
}

const obtenerDireccionDepartamentalDirectasAPI = (estado) => ({
    type: OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS,
    payload: true

})

const obtenerDireccionDepartamentalDirectasAPIExito = contratos_user => ({
    type: OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_EXITO,
    payload: contratos_user

})

const obtenerDireccionDepartamentalDirectasAPIError = estado => ({
    type: OBTENER_DIRECCION_DEPARTAMENTAL_DIRECTAS_ERROR,
    payload: estado
})

//************************ OBTENER DEPARTAMENTOS DIRECTAS DEL USUARIO**********************************************

export function obtenerDepartamentosDirectasAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(obtenerDepartamentosDirectasAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + "misDepartamentosDirectas/" + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerDepartamentosDirectasAPIExito(response.data))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerDepartamentosDirectasAPIError(true))
            })

    }
}

const obtenerDepartamentosDirectasAPI = (estado) => ({
    type: OBTENER_DEPARTAMENTOS_DIRECTAS,
    payload: true

})

const obtenerDepartamentosDirectasAPIExito = contratos_user => ({
    type: OBTENER_DEPARTAMENTOS_DIRECTAS_EXITO,
    payload: contratos_user

})

const obtenerDepartamentosDirectasAPIError = estado => ({
    type: OBTENER_DEPARTAMENTOS_DIRECTAS_ERROR,
    payload: estado
})

//************************ OBTENER WP DIRECTAS DEL USUARIO**********************************************

export function obtenerWPDirectasAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(obtenerWPDirectasAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + "misWPDirectas/" + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerWPDirectasAPIExito(response.data))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerWPDirectasAPIError(true))
            })

    }
}

const obtenerWPDirectasAPI = (estado) => ({
    type: OBTENER_WP_DIRECTAS,
    payload: true

})

const obtenerWPDirectasAPIExito = contratos_user => ({
    type: OBTENER_WP_DIRECTAS_EXITO,
    payload: contratos_user

})

const obtenerWPDirectasAPIError = estado => ({
    type: OBTENER_WP_DIRECTAS_ERROR,
    payload: estado
})

//************************ OBTENER MISIONES DIRECTAS DEL USUARIO**********************************************

export function obtenerMisionesDirectasAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(obtenerMisionesDirectasAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + "misMisionesDirectas/" + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerMisionesDirectasAPIExito(response.data))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerMisionesDirectasAPIError(true))
            })

    }
}

const obtenerMisionesDirectasAPI = (estado) => ({
    type: OBTENER_MISION_DIRECTAS,
    payload: true

})

const obtenerMisionesDirectasAPIExito = contratos_user => ({
    type: OBTENER_MISION_DIRECTAS_EXITO,
    payload: contratos_user

})

const obtenerMisionesDirectasAPIError = estado => ({
    type: OBTENER_MISION_DIRECTAS_ERROR,
    payload: estado
})


//************************ OBTENER SUB MISIONES DIRECTAS DEL USUARIO**********************************************

export function obtenerSubMisionesDirectasAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch(obtenerSubMisionesDirectasAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + "misSubMisionesDirectas/" + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(obtenerSubMisionesDirectasAPIExito(response.data))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerSubMisionesDirectasAPIError(true))
            })

    }
}

const obtenerSubMisionesDirectasAPI = (estado) => ({
    type: OBTENER_SUB_MISION_DIRECTAS,
    payload: true

})

const obtenerSubMisionesDirectasAPIExito = contratos_user => ({
    type: OBTENER_SUB_MISION_DIRECTAS_EXITO,
    payload: contratos_user

})

const obtenerSubMisionesDirectasAPIError = estado => ({
    type: OBTENER_SUB_MISION_DIRECTAS_ERROR,
    payload: estado
})


//************************ GET BLOQUES HEREDADOS Y NO USUARIO **********************************************

export function getBloquesHeredadosYNoAPIAction(idUser) {

    return async (dispatch) => {
        dispatch(getBloquesHeredadosYNoAPI())

        await axios({
            method: "GET",
            url: urlUserApi + "allBlokByUser/" + idUser,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(getBloquesHeredadosYNoAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(getBloquesHeredadosYNoAPIError(true))
            })

    }
}

const getBloquesHeredadosYNoAPI = () => ({
    type: GET_BLOQUES_HEREDADOS,
    payload: false

})

const getBloquesHeredadosYNoAPIExito = userData => ({
    type: GET_BLOQUES_HEREDADOS_EXITO,
    payload: userData

})

const getBloquesHeredadosYNoAPIError = estado => ({
    type: GET_BLOQUES_HEREDADOS_ERROR,
    payload: estado
})

//************************DELETE RELACIONES USER**********************************************

export function deleteRelacionesUserAPIAction(idUser) {

    return async (dispatch) => {
        dispatch(putPasswordUserManualAPI())
        axios({
            method: "PUT",
            url: urlUserApi + "customUserDeleteRelaciones/" + idUser,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(
                    showMessage({
                        message: "User assignments deleted",
                        variant: "success"
                    })
                )

            })
            .catch(error => {
                console.log(error.response)

                dispatch(
                    showMessage({
                        message: "Error in deleting user assignments",
                        variant: "error"
                    })
                )
            })

    }
}

//************************PUT PASSWORD USER**********************************************

export function putPasswordUserManualAPIAction(idUser, jsonPassword) {

    return async (dispatch) => {
        dispatch(putPasswordUserManualAPI())
        axios({
            method: "POST",
            url: urlUserApi + "postPasswordUserManual/" + idUser,
            data: jsonPassword,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(putPasswordUserManualAPIExito(response.data))

                dispatch(
                    showMessage({
                        message: "Password successfully updated",
                        variant: "success"
                    })
                )

            })
            .catch(error => {
                console.log(error.response)
                dispatch(putPasswordUserManualAPIError(true))

                dispatch(
                    showMessage({
                        message: "A problem has occurred",
                        variant: "error"
                    })
                )
            })

    }
}

const putPasswordUserManualAPI = (user) => ({
    type: PUT_PASSWORD_USER_MANUAL,
    payload: user

})

const putPasswordUserManualAPIExito = estado => ({
    type: PUT_PASSWORD_USER_MANUAL_EXITO,
    payload: estado

})

const putPasswordUserManualAPIError = estado => ({
    type: PUT_PASSWORD_USER_MANUAL_ERROR,
    payload: estado
})

//************************ FUNCION PARA COMPROBAR SI EL USUARIO ES RESPONSABLE DE UNA MISION**********************************************
export function getUsuarioResponsableMisionAPIAction(idPersona) {

    return async (dispatch) => {
        //dispatch (getUsuarioResponsableMisionAPI())

        await axios({
            method: "GET",
            url: urlMisionResponsableApi + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                //dispatch (getUsuarioResponsableMisionAPIExito(response.data))
                if (response.data.length != 0) {
                    dispatch(obtenerContratosUserAPIExito(response.data))
                }
                else {
                    dispatch(obtenerContratosUserAPIAction(idPersona, "1"))
                }
            })
            .catch(error => {
                console.log(error.response)
                //dispatch (getUsuarioResponsableMisionAPIError(true))
            })

    }
}

//************************ OBTENER CONTRATOS DEL USUARIO **********************************************

export function obtenerContratosUserAPIAction(idPersona, modo) {

    return async (dispatch) => {
        dispatch(obtenerContratosUserAPI(true))


        await axios({
            method: "GET",
            url: urlContratosUserApi + idPersona,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                if (modo == "1") {
                    dispatch(obtenerContratosUserAPIExito(response.data))
                }
                if (modo == "2") {
                    dispatch(obtenerContratosUserAPIExitoRespaldo(response.data))
                }

            })
            .catch(error => {
                console.log(error.response)
                dispatch(obtenerContratosUserAPIError(true))
            })

    }
}

const obtenerContratosUserAPI = (estado) => ({
    type: OBTENER_CONTRATOS_USER,
    payload: true

})

const obtenerContratosUserAPIExito = contratos_user => ({
    type: OBTENER_CONTRATOS_USER_EXITO,
    payload: contratos_user

})

const obtenerContratosUserAPIExitoRespaldo = contratos_user => ({
    type: OBTENER_CONTRATOS_USER_EXITO_RESPALDO,
    payload: contratos_user

})

const obtenerContratosUserAPIError = estado => ({
    type: OBTENER_CONTRATOS_USER_ERROR,
    payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewUserAPI(user) {

    return async (dispatch) => {
        dispatch(createNewUser())
        axios({
            method: "POST",
            url: urlUserApi,
            data: user,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(createNewUserExito(response.data))

                dispatch(
                    showMessage({
                        message: "User successfully created",
                        variant: "success"
                    })
                )

                dispatch(mostrarUserAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(createNewUserError(true))

                dispatch(
                    showMessage({
                        message: "Error creating User",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewUser = (user) => ({
    type: INSERTAR_NEW_USER,
    payload: user

})

const createNewUserExito = estado => ({
    type: INSERTAR_NEW_USER_EXITO,
    payload: estado

})

const createNewUserError = estado => ({
    type: INSERTAR_NEW_USER_ERROR,
    payload: estado
})

//PUT USER

export function putUserAPI(id, user) {

    return async (dispatch) => {
        dispatch(putUser())
        axios({
            method: "PUT",
            url: urlUserApi + id,
            data: user,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }
        })
            .then(response => {
                dispatch(putUserExito(response.data))

                dispatch(
                    showMessage({
                        message: "User successfully modified",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllUserAPIAction())

                //OBTENER PERMISOS DEL USUARIO MODIFICADO
                dispatch(mostrarUserPermisosAPIAction(id))
                dispatch(mostrarUserPermisosByGroupAPIAction(id))

            })
            .catch(error => {
                console.log(error.response)
                dispatch(putUserError(true))

                dispatch(
                    showMessage({
                        message: "Error modified User",
                        variant: "error"
                    })
                )
            })

    }
}

const putUser = () => ({
    type: PUT_USER,
    payload: true

})

const putUserExito = estado => ({
    type: PUT_USER_EXITO,
    payload: estado

})

const putUserError = estado => ({
    type: PUT_USER_ERROR,
    payload: estado
})

//************************ GESTION SESION PERSON **********************************************

export function getSesionActualAPIAction(varToken) {

    return async (dispatch) => {
        dispatch(getSesionUserAPI())
        await axios({
            method: "POST",
            url: urlAuthApi,
            data: varToken/*,
                headers: {
                    'Authorization': `Token ${getCookie('token')}`
                }*/

        })
            .then(response => {
                dispatch(getSesionUserAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(getSesionUserAPIError())
            })

    }
}

const getSesionUserAPI = () => ({
    type: SESION_USER,
    payload: true

})

const getSesionUserAPIExito = person => ({
    type: SESION_USER_EXITO,
    payload: person

})

const getSesionUserAPIError = () => ({
    type: SESION_USER_ERROR,
    payload: false
})

//************************ GESTION PERMISOS SESION PERSON **********************************************

export function getPermisosSesionActualAPIAction(varToken) {

    return async (dispatch) => {
        dispatch(getPermisosSesionUserAPI())
        await axios({
            method: "POST",
            url: urlAuthPermisosApi,
            data: varToken/*,
                headers: {
                    'Authorization': `Token ${getCookie('token')}`
                }*/

        })
            .then(response => {
                dispatch(getPermisosSesionUserAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(getPermisosSesionUserAPIError())
            })

    }
}

const getPermisosSesionUserAPI = () => ({
    type: PERMISOS_SESION_USER,
    payload: true

})

const getPermisosSesionUserAPIExito = person => ({
    type: PERMISOS_SESION_USER_EXITO,
    payload: person

})

const getPermisosSesionUserAPIError = () => ({
    type: PERMISOS_SESION_USER_ERROR,
    payload: false
})

//************************ MOSTRAR ALL USER API GET **********************************************

export function mostrarAllUserAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarAllUserAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + "all/",
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAllUserAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAllUserAPIError(true))
            })

    }
}

const mostrarAllUserAPI = (estado) => ({
    type: MOSTRAR_ALL_USER,
    payload: true

})

const mostrarAllUserAPIExito = users => ({
    type: MOSTRAR_ALL_USER_EXITO,
    payload: users

})

const mostrarAllUserAPIError = estado => ({
    type: MOSTRAR_ALL_USER_ERROR,
    payload: estado
})


//************************ MOSTRAR USER API GET **********************************************

export function mostrarUserAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarUserAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarUserAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarUserAPIError(true))
            })

    }
}

const mostrarUserAPI = (estado) => ({
    type: MOSTRAR_USER,
    payload: true

})

const mostrarUserAPIExito = users => ({
    type: MOSTRAR_USER_EXITO,
    payload: users

})

const mostrarUserAPIError = estado => ({
    type: MOSTRAR_USER_ERROR,
    payload: estado
})

//************************ MOSTRAR PERMISOS QUE PROVIENEN DEL GROUPO ASOCIADOS AL USUARIO API GET **********************************************

export function mostrarUserPermisosByGroupAPIAction(idUser) {

    return async (dispatch) => {
        dispatch(mostrarUserPermisosByGroupAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + "permisosByGroup/" + idUser,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarUserPermisosByGroupAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarUserPermisosByGroupAPIError(true))
            })

    }
}

const mostrarUserPermisosByGroupAPI = (estado) => ({
    type: MOSTRAR_USER_PERMISOS_BY_GROUP,
    payload: false

})

const mostrarUserPermisosByGroupAPIExito = permissions => ({
    type: MOSTRAR_USER_PERMISOS_BY_GROUP_EXITO,
    payload: permissions

})

const mostrarUserPermisosByGroupAPIError = estado => ({
    type: MOSTRAR_USER_PERMISOS_BY_GROUP_ERROR,
    payload: estado
})

//************************ MOSTRAR PERMISOS ASOCIADOS AL USUARIO API GET **********************************************

export function mostrarUserPermisosAPIAction(idUser) {

    return async (dispatch) => {
        dispatch(mostrarUserPermisosAPI(true))


        await axios({
            method: "GET",
            url: urlUserApi + idUser,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarUserPermisosAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarUserPermisosAPIError(true))
            })

    }
}

const mostrarUserPermisosAPI = (estado) => ({
    type: MOSTRAR_USER_PERMISOS,
    payload: false

})

const mostrarUserPermisosAPIExito = permissions => ({
    type: MOSTRAR_USER_PERMISOS_EXITO,
    payload: permissions

})

const mostrarUserPermisosAPIError = estado => ({
    type: MOSTRAR_USER_PERMISOS_ERROR,
    payload: estado
})


//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorSeleccionAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarValorSeleccion())

        try {
            dispatch(cambiarValorSeleccionExito(valorNuevo))


        } catch (error) {

            dispatch(cambiarValorSeleccionError(true))
        }

    }

}

const cambiarValorSeleccion = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_USER,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_USER_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_USER_ERROR,
    payload: estado
})