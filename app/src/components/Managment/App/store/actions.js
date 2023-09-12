import {

    CAMBIAR_VALOR_TAB_REQUERIMENTS,
    CAMBIAR_VALOR_TAB_REQUERIMENTS_EXITO,
    CAMBIAR_VALOR_TAB_REQUERIMENTS_ERROR,

    MOSTRAR_APP,
    MOSTRAR_APP_EXITO,
    MOSTRAR_APP_ERROR,

    PUT_APP,
    PUT_APP_EXITO,
    PUT_APP_ERROR,

    INSERTAR_NEW_APP,
    INSERTAR_NEW_APP_EXITO,
    INSERTAR_NEW_APP_ERROR,

    CAMBIAR_MODAL_INSERTAR_APLICATION,
    CAMBIAR_MODAL_INSERTAR_APLICATION_EXITO,
    CAMBIAR_MODAL_INSERTAR_APLICATION_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_APLICATION,
    CAMBIAR_VALOR_SELECCION_GRID_APLICATION_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_APLICATION_ERROR,

    MOSTRAR_TYPES_APP,
    MOSTRAR_TYPES_APP_EXITO,
    MOSTRAR_TYPES_APP_ERROR,

    MOSTRAR_GRUPOS_REQUERIMIENTOS,
    MOSTRAR_GRUPOS_REQUERIMIENTOS_EXITO,
    MOSTRAR_GRUPOS_REQUERIMIENTOS_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_GRUPO,
    CAMBIAR_VALOR_SELECCION_GRID_GRUPO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_GRUPO_ERROR,

    CAMBIAR_MODAL_INSERTAR_GRUPO,
    CAMBIAR_MODAL_INSERTAR_GRUPO_EXITO,
    CAMBIAR_MODAL_INSERTAR_GRUPO_ERROR,

    INSERTAR_NEW_GROUP,
    INSERTAR_NEW_GROUP_EXITO,
    INSERTAR_NEW_GROUP_ERROR,

    MOSTRAR_REQUERIMENTS_WITH_DETAILS,
    MOSTRAR_REQUERIMENTS_WITH_DETAILS_EXITO,
    MOSTRAR_REQUERIMENTS_WITH_DETAILS_ERROR,

    INSERTAR_REQUERIMENTS_WITH_DETAILS,
    INSERTAR_REQUERIMENTS_WITH_DETAILS_EXITO,
    INSERTAR_REQUERIMENTS_WITH_DETAILS_ERROR,

    CAMBIAR_ESTADO_VALUES_REQUERIMENTS,
    CAMBIAR_ESTADO_VALUES_REQUERIMENTS_EXITO,
    CAMBIAR_ESTADO_VALUES_REQUERIMENTS_ERROR,

    DELETE_REQUERIMENT,
    DELETE_REQUERIMENT_EXITO,
    DELETE_REQUERIMENT_ERROR,

    COMPROBAR_ITEM_LIST_REQUERIMENT,
    COMPROBAR_ITEM_LIST_REQUERIMENT_EXITO,
    COMPROBAR_ITEM_LIST_REQUERIMENT_ERROR,

    DELETE_GROUP_REQUERIMENT,
    DELETE_GROUP_REQUERIMENT_EXITO,
    DELETE_GROUP_REQUERIMENT_ERROR,

    PUT_GROUP_REQUERIMENTS,
    PUT_GROUP_REQUERIMENTS_EXITO,
    PUT_GROUP_REQUERIMENTS_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlAppAPI = process.env.REACT_APP_URL_DJANGO + "/api/aplication/"
const urlRequerimentsWithDetailsAPI = process.env.REACT_APP_URL_DJANGO + "/api/aplicationWithRequeriments/"
const urlGruposAppAPI = process.env.REACT_APP_URL_DJANGO + "/api/groupsRequeriment/"

export function deleteGroupRequerimentAPIAction(id) {

    return async (dispatch) => {
        dispatch(deleteGroupRequerimentAPI())

        await axios({
            method: "DELETE",
            url: urlGruposAppAPI + id,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(deleteGroupRequerimentAPIExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                dispatch(mostrarGruposRequerimientosAPIAction())

            })

            .catch(error => {
                console.log(error.response)
                dispatch(deleteGroupRequerimentAPIError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const deleteGroupRequerimentAPI = (id) => ({
    type: DELETE_GROUP_REQUERIMENT,
    payload: id

})

const deleteGroupRequerimentAPIExito = estado => ({
    type: DELETE_GROUP_REQUERIMENT_EXITO,
    payload: estado

})

const deleteGroupRequerimentAPIError = estado => ({
    type: DELETE_GROUP_REQUERIMENT_ERROR,
    payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function comprobarItemListRequerimentBorrableAPIAction(idRequeriment, nameItem) {

    return async (dispatch) => {
        dispatch(comprobarItemListRequerimentBorrableAPI())
        axios({
            method: "POST",
            url: urlAppAPI + 'checkItemList/' + idRequeriment,
            data: {"nameItem": nameItem},
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(comprobarItemListRequerimentBorrableAPIExito(response.data))

                /*dispatch(
                    showMessage({
                        message: "Requirements successfully created",
                        variant: "success"
                    })
                )*/

            })
            .catch(error => {
                console.log(error.response)
                dispatch(comprobarItemListRequerimentBorrableAPIError(true))

                /*dispatch(
                    showMessage({
                        message: "Error creating Requirements",
                        variant: "error"
                    })
                )*/
            })

    }
}

const comprobarItemListRequerimentBorrableAPI = (app) => ({
    type: COMPROBAR_ITEM_LIST_REQUERIMENT,
    payload: app

})

const comprobarItemListRequerimentBorrableAPIExito = estado => ({
    type: COMPROBAR_ITEM_LIST_REQUERIMENT_EXITO,
    payload: estado

})

const comprobarItemListRequerimentBorrableAPIError = estado => ({
    type: COMPROBAR_ITEM_LIST_REQUERIMENT_ERROR,
    payload: estado
})

export function deleteRequerimentAPIAction(id) {

    return async (dispatch) => {
        dispatch(deleteRequerimentAPI())

        await axios({
            method: "DELETE",
            url: urlAppAPI + id,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(deleteRequerimentAPIExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                dispatch(mostrarAppAPIAction())

            })

            .catch(error => {
                console.log(error.response)
                dispatch(deleteRequerimentAPIError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const deleteRequerimentAPI = (id) => ({
    type: DELETE_REQUERIMENT,
    payload: id

})

const deleteRequerimentAPIExito = estado => ({
    type: DELETE_REQUERIMENT_EXITO,
    payload: estado

})

const deleteRequerimentAPIError = estado => ({
    type: DELETE_REQUERIMENT_ERROR,
    payload: estado
})

//************************ ACTUALIZAR GRUPO DE REQUERIMIENTOS**********************************************

export function putGroupRequerimentsAPIAction(idGroup, app) {

    return async (dispatch) => {
        dispatch(putGroupRequerimentsAPI())
        axios({
            method: "PUT",
            url: urlGruposAppAPI + idGroup,
            data: app,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(putGroupRequerimentsAPIExito(response.data))

                dispatch(
                    showMessage({
                        message: "Group successfully updated",
                        variant: "success"
                    })
                )

                dispatch(mostrarGruposRequerimientosAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(putGroupRequerimentsAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error editing group",
                        variant: "error"
                    })
                )
            })

    }
}

const putGroupRequerimentsAPI = (app) => ({
    type: PUT_GROUP_REQUERIMENTS,
    payload: app

})

const putGroupRequerimentsAPIExito = estado => ({
    type: PUT_GROUP_REQUERIMENTS_EXITO,
    payload: estado

})

const putGroupRequerimentsAPIError = estado => ({
    type: PUT_GROUP_REQUERIMENTS_ERROR,
    payload: estado
})

//************************ INSERTA NUEVO GRUPO DE REQUERIMIENTOS**********************************************

export function insertarNewGroupAppAPIAction(app) {

    return async (dispatch) => {
        dispatch(insertarNewGroupAppAPI())
        axios({
            method: "POST",
            url: urlGruposAppAPI,
            data: app,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(insertarNewGroupAppAPIExito(response.data))

                dispatch(
                    showMessage({
                        message: "Group successfully created",
                        variant: "success"
                    })
                )

                dispatch(mostrarGruposRequerimientosAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(insertarNewGroupAppAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error creating group",
                        variant: "error"
                    })
                )
            })

    }
}

const insertarNewGroupAppAPI = (app) => ({
    type: INSERTAR_NEW_GROUP,
    payload: app

})

const insertarNewGroupAppAPIExito = estado => ({
    type: INSERTAR_NEW_GROUP_EXITO,
    payload: estado

})

const insertarNewGroupAppAPIError = estado => ({
    type: INSERTAR_NEW_GROUP_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL **********************************************

export function cambiarVisibilidadModalInsertarGrupoAPIAction(valorNuevo, modoDialogo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalInsertarGrupoAPI())

        try {
            dispatch(cambiarVisibilidadModalInsertarGrupoAPIExito(valorNuevo, modoDialogo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalInsertarGrupoAPIError(true))
        }
    }
}

const cambiarVisibilidadModalInsertarGrupoAPI = () => ({
    type: CAMBIAR_MODAL_INSERTAR_GRUPO,
    payload: true

})

const cambiarVisibilidadModalInsertarGrupoAPIExito = (valorNuevo, modoDialogo) => ({
    type: CAMBIAR_MODAL_INSERTAR_GRUPO_EXITO,
    payload: valorNuevo,
    modoDialogo: modoDialogo

})

const cambiarVisibilidadModalInsertarGrupoAPIError = estado => ({
    type: CAMBIAR_MODAL_INSERTAR_GRUPO_ERROR,
    payload: estado
})

//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorSeleccionGridGrupoActionAPI(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarValorSeleccionGridGrupo())

        try {
            dispatch(cambiarValorSeleccionGridGrupoExito(valorNuevo))


        } catch (error) {

            dispatch(cambiarValorSeleccionGridGrupoError(true))
        }

    }

}

const cambiarValorSeleccionGridGrupo = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_GRUPO,
    payload: false

})

const cambiarValorSeleccionGridGrupoExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_GRUPO_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionGridGrupoError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_GRUPO_ERROR,
    payload: estado
})

//************************ MOSTRAR CUSTOMER API GET **********************************************

export function mostrarGruposRequerimientosAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarGruposRequerimientosAPI(true))


        await axios({
            method: "GET",
            url: urlGruposAppAPI,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarGruposRequerimientosAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarGruposRequerimientosAPIError(true))
            })

    }
}

const mostrarGruposRequerimientosAPI = (estado) => ({
    type: MOSTRAR_GRUPOS_REQUERIMIENTOS,
    payload: true

})

const mostrarGruposRequerimientosAPIExito = apps => ({
    type: MOSTRAR_GRUPOS_REQUERIMIENTOS_EXITO,
    payload: apps

})

const mostrarGruposRequerimientosAPIError = estado => ({
    type: MOSTRAR_GRUPOS_REQUERIMIENTOS_ERROR,
    payload: estado
})

//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorTabPeopleAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarValorTabPeople())

        try {
            dispatch(cambiarValorTabPeopleExito(valorNuevo))


        } catch (error) {

            dispatch(cambiarValorTabPeopleError(true))
        }

    }

}

const cambiarValorTabPeople = () => ({
    type: CAMBIAR_VALOR_TAB_REQUERIMENTS,
    payload: true

})

const cambiarValorTabPeopleExito = valorNuevo => ({
    type: CAMBIAR_VALOR_TAB_REQUERIMENTS_EXITO,
    payload: valorNuevo

})

const cambiarValorTabPeopleError = estado => ({
    type: CAMBIAR_VALOR_TAB_REQUERIMENTS_ERROR,
    payload: estado
})

//************************ MOSTRAR CUSTOMER API GET **********************************************

export function mostrarTypesAppAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarTypesAppAPI(true))


        await axios({
            method: "GET",
            url: urlAppAPI + "allTypes/",
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarTypesAppAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarTypesAppAPIError(true))
            })

    }
}

const mostrarTypesAppAPI = (estado) => ({
    type: MOSTRAR_TYPES_APP,
    payload: true

})

const mostrarTypesAppAPIExito = apps => ({
    type: MOSTRAR_TYPES_APP_EXITO,
    payload: apps

})

const mostrarTypesAppAPIError = estado => ({
    type: MOSTRAR_TYPES_APP_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID_APLICATION,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_APLICATION_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_APLICATION_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL **********************************************

export function cambiarVisibilidadModalInsertarAPIAction(valorNuevo, modoDialogo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalInsertarAPI())

        try {
            dispatch(cambiarVisibilidadModalInsertarAPIExito(valorNuevo, modoDialogo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalInsertarAPIError(true))
        }
    }
}

const cambiarVisibilidadModalInsertarAPI = () => ({
    type: CAMBIAR_MODAL_INSERTAR_APLICATION,
    payload: true

})

const cambiarVisibilidadModalInsertarAPIExito = (valorNuevo, modoDialogo) => ({
    type: CAMBIAR_MODAL_INSERTAR_APLICATION_EXITO,
    payload: valorNuevo,
    modoDialogo: modoDialogo

})

const cambiarVisibilidadModalInsertarAPIError = estado => ({
    type: CAMBIAR_MODAL_INSERTAR_APLICATION_ERROR,
    payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewAppAPIAction(app) {

    return async (dispatch) => {
        dispatch(createNewApp())
        axios({
            method: "POST",
            url: urlAppAPI,
            data: app,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(createNewAppExito(response.data))

                dispatch(
                    showMessage({
                        message: "Requeriment successfully created",
                        variant: "success"
                    })
                )

                dispatch(mostrarAppAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(createNewAppError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Requeriment",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewApp = (app) => ({
    type: INSERTAR_NEW_APP,
    payload: app

})

const createNewAppExito = estado => ({
    type: INSERTAR_NEW_APP_EXITO,
    payload: estado

})

const createNewAppError = estado => ({
    type: INSERTAR_NEW_APP_ERROR,
    payload: estado
})

//PUT CUSTOMER

export function putAppAPIAction(id, app) {

    return async (dispatch) => {
        dispatch(putApp())
        axios({
            method: "PUT",
            url: urlAppAPI + id,
            data: app,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(putAppExito(response.data))

                dispatch(
                    showMessage({
                        message: "Requeriment successfully modified",
                        variant: "success"
                    })
                )

                dispatch(mostrarAppAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(putAppError(true))

                dispatch(
                    showMessage({
                        message: "Error modified Requeriment",
                        variant: "error"
                    })
                )
            })

    }
}

const putApp = () => ({
    type: PUT_APP,
    payload: true

})

const putAppExito = estado => ({
    type: PUT_APP_EXITO,
    payload: estado

})

const putAppError = estado => ({
    type: PUT_APP_ERROR,
    payload: estado
})

//************************ MOSTRAR CUSTOMER API GET **********************************************

export function mostrarAppAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarAppAPI(true))


        await axios({
            method: "GET",
            url: urlAppAPI,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAppAPIExito(response.data))
                dispatch(mostrarTypesAppAPIAction())
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAppAPIError(true))
            })

    }
}

const mostrarAppAPI = (estado) => ({
    type: MOSTRAR_APP,
    payload: true

})

const mostrarAppAPIExito = apps => ({
    type: MOSTRAR_APP_EXITO,
    payload: apps

})

const mostrarAppAPIError = estado => ({
    type: MOSTRAR_APP_ERROR,
    payload: estado
})

//************************ MOSTRAR CUSTOMER API GET **********************************************

export function mostrarRequerimentsWithDetailsAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarRequerimentsWithDetailsAPI(true))


        await axios({
            method: "GET",
            url: urlRequerimentsWithDetailsAPI,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarRequerimentsWithDetailsAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarRequerimentsWithDetailsAPIError(true))
            })

    }
}

const mostrarRequerimentsWithDetailsAPI = (estado) => ({
    type: MOSTRAR_REQUERIMENTS_WITH_DETAILS,
    payload: true

})

const mostrarRequerimentsWithDetailsAPIExito = apps => ({
    type: MOSTRAR_REQUERIMENTS_WITH_DETAILS_EXITO,
    payload: apps

})

const mostrarRequerimentsWithDetailsAPIError = estado => ({
    type: MOSTRAR_REQUERIMENTS_WITH_DETAILS_ERROR,
    payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarRequerimentsWithDetailsAPIAction(app) {

    return async (dispatch) => {
        dispatch(insertarRequerimentsWithDetailsAPI())
        axios({
            method: "POST",
            url: urlRequerimentsWithDetailsAPI,
            data: app,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(insertarRequerimentsWithDetailsAPIExito(response.data))

                {/*dispatch(
                    showMessage({
                        message: "Requeriment successfully created",
                        variant: "success"
                    })
                )*/}

                dispatch(mostrarRequerimentsWithDetailsAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(insertarRequerimentsWithDetailsAPIError(true))

                {/*dispatch(
                    showMessage({
                        message: "Error creating Requeriment",
                        variant: "error"
                    })
                )*/}
            })

    }
}

const insertarRequerimentsWithDetailsAPI = (app) => ({
    type: INSERTAR_REQUERIMENTS_WITH_DETAILS,
    payload: app

})

const insertarRequerimentsWithDetailsAPIExito = estado => ({
    type: INSERTAR_REQUERIMENTS_WITH_DETAILS_EXITO,
    payload: estado

})

const insertarRequerimentsWithDetailsAPIError = estado => ({
    type: INSERTAR_REQUERIMENTS_WITH_DETAILS_ERROR,
    payload: estado
})

//************************ CAMBIAR ESTADO RM_REGISTRO  **********************************************

export function cambiarEstadoValuesRequerimentsAPIAction(nombreEstado, valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarEstadoValuesRequerimentsAPI())

        try {
            dispatch(cambiarEstadoValuesRequerimentsAPIExito(nombreEstado, valorNuevo))

        } catch (error) {

            dispatch(cambiarEstadoValuesRequerimentsAPIError(true))
        }
    }
}

const cambiarEstadoValuesRequerimentsAPI = () => ({
    type: CAMBIAR_ESTADO_VALUES_REQUERIMENTS,
    payload: true

})

const cambiarEstadoValuesRequerimentsAPIExito = (nombreEstado, valorNuevo) => ({
    type: CAMBIAR_ESTADO_VALUES_REQUERIMENTS_EXITO,
    nombre: nombreEstado,
    payload: valorNuevo


})

const cambiarEstadoValuesRequerimentsAPIError = estado => ({
    type: CAMBIAR_ESTADO_VALUES_REQUERIMENTS_ERROR,
    payload: estado
})
