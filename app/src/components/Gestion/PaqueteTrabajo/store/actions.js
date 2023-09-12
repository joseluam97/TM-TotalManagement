import {

    GET_WORK_PACKAGE,
    GET_WORK_PACKAGE_EXITO,
    GET_WORK_PACKAGE_ERROR,

    POST_WORK_PACKAGE,
    POST_WORK_PACKAGE_EXITO,
    POST_WORK_PACKAGE_ERROR,

    PUT_WORK_PACKAGE,
    PUT_WORK_PACKAGE_EXITO,
    PUT_WORK_PACKAGE_ERROR,

    CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE,
    CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_EXITO,
    CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE,
    CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_ERROR,

    GET_REQUERIMENTS_BY_WORK_PACKAGE,
    GET_REQUERIMENTS_BY_WORK_PACKAGE_EXITO,
    GET_REQUERIMENTS_BY_WORK_PACKAGE_ERROR,

    POST_WORK_PACKAGE_APP,
    POST_WORK_PACKAGE_APP_EXITO,
    POST_WORK_PACKAGE_APP_ERROR,

    ELIMINAR_WORK_PACKAGE_APP,
    ELIMINAR_WORK_PACKAGE_APP_EXITO,
    ELIMINAR_WORK_PACKAGE_APP_ERROR,

    VER_MODAL_REQUERIMENTS_WORK_PACKAGE,
    VER_MODAL_REQUERIMENTS_WORK_PACKAGE_EXITO,
    VER_MODAL_REQUERIMENTS_WORK_PACKAGE_ERROR

} from './types';
import axios from 'axios'
import { getCookie } from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'


//Constantes
const urlMisionPaqueteApi = process.env.REACT_APP_URL_DJANGO + "/api/workpackage/"
const urlRequerimentsWorkPackageApi = process.env.REACT_APP_URL_DJANGO + "/api/wpApp/"
const urlRequerimentsByWorkPackageApi = process.env.REACT_APP_URL_DJANGO + "/api/wpAppByContract/"

//************************ DELETE CONTRACT USER**********************************************

export function deleteWorkPackageAppAPIAction(id, idSubWorkPackage) {

    return async (dispatch) => {
        dispatch(deleteWorkPackageAppAPI())

        await axios({
            method: "DELETE",
            url: urlRequerimentsWorkPackageApi + id,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(deleteWorkPackageAppAPIExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllRequerimentsByWorkPackageAPIAction(idSubWorkPackage))

            })

            .catch(error => {
                console.log(error.response)
                dispatch(deleteWorkPackageAppAPIError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const deleteWorkPackageAppAPI = (id) => ({
    type: ELIMINAR_WORK_PACKAGE_APP,
    payload: id

})

const deleteWorkPackageAppAPIExito = estado => ({
    type: ELIMINAR_WORK_PACKAGE_APP_EXITO,
    payload: estado

})

const deleteWorkPackageAppAPIError = estado => ({
    type: ELIMINAR_WORK_PACKAGE_APP_ERROR,
    payload: estado
})

//************************POST SUB WORK_PACKAGE**********************************************

export function postWorkPackageAppAPIAction(misionSelect, newWorkPackageApp) {

    return (dispatch) => {
        dispatch(postWorkPackageAppAPI())


        axios({
            method: "POST",
            url: urlRequerimentsWorkPackageApi,
            data: newWorkPackageApp,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(postWorkPackageAppAPIExito(response.data))
                dispatch(
                    showMessage({
                        message: "Created requeriments",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllRequerimentsByWorkPackageAPIAction(misionSelect))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(postWorkPackageAppAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created requeriments",
                        variant: "error"
                    })
                )
            })

    }
}

const postWorkPackageAppAPI = (programa) => ({
    type: POST_WORK_PACKAGE_APP,
    payload: programa

})

const postWorkPackageAppAPIExito = estado => ({
    type: POST_WORK_PACKAGE_APP_EXITO,
    payload: estado

})

const postWorkPackageAppAPIError = estado => ({
    type: POST_WORK_PACKAGE_APP_ERROR,
    payload: estado
})

//************************ MOSTRAR TODAS LOS REQUERIMIENTOS DE UNA WORK_PACKAGE **********************************************

export function mostrarAllRequerimentsByWorkPackageAPIAction(idWorkPackage) {

    return async (dispatch) => {
        dispatch(mostrarAllRequerimentsByWorkPackageAPI(true))


        await axios({
            method: "GET",
            url: urlRequerimentsByWorkPackageApi + idWorkPackage,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAllRequerimentsByWorkPackageAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAllRequerimentsByWorkPackageAPIError(true))
            })
    }
}

const mostrarAllRequerimentsByWorkPackageAPI = () => ({
    type: GET_REQUERIMENTS_BY_WORK_PACKAGE,
    payload: false

})

const mostrarAllRequerimentsByWorkPackageAPIExito = programas => ({
    type: GET_REQUERIMENTS_BY_WORK_PACKAGE_EXITO,
    payload: programas

})

const mostrarAllRequerimentsByWorkPackageAPIError = estado => ({
    type: GET_REQUERIMENTS_BY_WORK_PACKAGE_ERROR,
    payload: estado
})

//************************ MOSTRAR DIALOGO INSERTAR WORK_PACKAGE **********************************************

export function cambiarVisibilidadModalRequerimentsAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalRequerimentsAPI())

        try {
            dispatch(cambiarVisibilidadModalRequerimentsAPIExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalRequerimentsAPIError(true))
        }

    }
}

const cambiarVisibilidadModalRequerimentsAPI = () => ({
    type: VER_MODAL_REQUERIMENTS_WORK_PACKAGE,
    payload: true

})

const cambiarVisibilidadModalRequerimentsAPIExito = (valorNuevo) => ({
    type: VER_MODAL_REQUERIMENTS_WORK_PACKAGE_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalRequerimentsAPIError = estado => ({
    type: VER_MODAL_REQUERIMENTS_WORK_PACKAGE_ERROR,
    payload: estado
})


export function mostrarMisionPaquetesAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarMisionPaqueteAPI(true))


        await axios({
            method: "GET",
            url: urlMisionPaqueteApi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarMisionPaqueteAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarMisionPaqueteAPIError(true))
            })

    }
}

const mostrarMisionPaqueteAPI = () => ({
    type: GET_WORK_PACKAGE,
    payload: true

})

const mostrarMisionPaqueteAPIExito = programas => ({
    type: GET_WORK_PACKAGE_EXITO,
    payload: programas

})

const mostrarMisionPaqueteAPIError = estado => ({
    type: GET_WORK_PACKAGE_ERROR,
    payload: estado
})


//************************POST CONJUNTOS**********************************************

export function crearMisionPaqueteActionAPIAction(conjunto) {

    return (dispatch) => {
        dispatch(crearMisionPaquete())


        axios({
            method: "POST",
            url: urlMisionPaqueteApi,
            data: conjunto,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(crearMisionPaqueteExito(response.data))
                dispatch(
                    showMessage({
                        message: "Created Program",
                        variant: "success"
                    })
                )
                
                dispatch(mostrarMisionPaquetesAPIAction())
            })
            .catch(error => {
                console.log(error.response)
                dispatch(crearMisionPaqueteError(true))

                dispatch(
                    showMessage({
                        message: "Error when created Program",
                        variant: "error"
                    })
                )
            })

    }
}

const crearMisionPaquete = (programa) => ({
    type: POST_WORK_PACKAGE,
    payload: programa

})

const crearMisionPaqueteExito = estado => ({
    type: POST_WORK_PACKAGE_EXITO,
    payload: estado

})

const crearMisionPaqueteError = estado => ({
    type: POST_WORK_PACKAGE_ERROR,
    payload: estado
})

//************************PUT CONJUNTO**********************************************


export function updateMisionPaqueteActionAPIAction(id, json) {

    return async (dispatch) => {
        dispatch(updateMisionPaquete())

        axios({
            method: "PUT",
            url: urlMisionPaqueteApi + id,
            data: json,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(updateMisionPaqueteExito(response.data))

                if (response.data['active'] == false) {
                    dispatch(
                        showMessage({
                            message: "Delete Work Package",
                            variant: "success"
                        })
                    )
                }
                else {

                    dispatch(
                        showMessage({
                            message: "Updated Work Package",
                            variant: "success"
                        })
                    )
                }

                dispatch(mostrarMisionPaquetesAPIAction())

            })
            .catch(error => {
                console.log(error.response)
                dispatch(updateMisionPaqueteError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating Work Package",
                        variant: "error"
                    })
                )
            })

    }
}

const updateMisionPaquete = (rm_accion) => ({
    type: PUT_WORK_PACKAGE,
    payload: rm_accion

})

const updateMisionPaqueteExito = estado => ({
    type: PUT_WORK_PACKAGE_EXITO,
    payload: estado

})

const updateMisionPaqueteError = estado => ({
    type: PUT_WORK_PACKAGE_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD ACTION**********************************************

export function cambiarValorVisibilidadAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarValorVisibilidad())

        try {
            dispatch(cambiarValorVisibilidadExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarValorVisibilidadError(true))
        }

    }

}

const cambiarValorVisibilidad = () => ({
    type: CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE,
    payload: true

})

const cambiarValorVisibilidadExito = valorNuevo => ({
    type: CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_EXITO,
    payload: valorNuevo

})

const cambiarValorVisibilidadError = estado => ({
    type: CAMBIAR_VALOR_VISIBILIDAD_WORK_PACKAGE_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_WORK_PACKAGE_ERROR,
    payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL INSERTAR**********************************************

export function cambiarVisibilidadModalInsertarMisionPaqueteAction(valorNuevo, modo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalInsertar())

        try {
            dispatch(cambiarVisibilidadModalInsertarExito(valorNuevo, modo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalInsertarError(true))
        }
    }
}

const cambiarVisibilidadModalInsertar = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE,
    payload: true

})

const cambiarVisibilidadModalInsertarExito = (valorNuevo, modo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_EXITO,
    payload: valorNuevo,
    modo: modo

})

const cambiarVisibilidadModalInsertarError = estado => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_WORK_PACKAGE_ERROR,
    payload: estado
})

