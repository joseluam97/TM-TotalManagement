import {

    CAMBIAR_VALOR_TAB_DEPARTAMENTO,
    CAMBIAR_VALOR_TAB_DEPARTAMENTO_EXITO,
    CAMBIAR_VALOR_TAB_DEPARTAMENTO_ERROR,

    GET_ALL_DEPARTAMENTOS,
    GET_ALL_DEPARTAMENTOS_EXITO,
    GET_ALL_DEPARTAMENTOS_ERROR,

    GET_ALL_DIRECCION_DEPARTAMENTAL,
    GET_ALL_DIRECCION_DEPARTAMENTAL_EXITO,
    GET_ALL_DIRECCION_DEPARTAMENTAL_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO,
    CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL,
    CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_ERROR,

    VER_MODAL_INSERT_DEPARTAMENTO,
    VER_MODAL_INSERT_DEPARTAMENTO_EXITO,
    VER_MODAL_INSERT_DEPARTAMENTO_ERROR,

    VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL,
    VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_EXITO,
    VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_ERROR,

    PUT_DEPARTAMENTO,
    PUT_DEPARTAMENTO_EXITO,
    PUT_DEPARTAMENTO_ERROR,

    POST_DEPARTAMENTO,
    POST_DEPARTAMENTO_EXITO,
    POST_DEPARTAMENTO_ERROR,

    PUT_FUNCION_DEPARTAMENTAL,
    PUT_FUNCION_DEPARTAMENTAL_EXITO,
    PUT_FUNCION_DEPARTAMENTAL_ERROR,

    POST_FUNCION_DEPARTAMENTAL,
    POST_FUNCION_DEPARTAMENTAL_EXITO,
    POST_FUNCION_DEPARTAMENTAL_ERROR,

    //REQUERIMENTS DEPARTAMENTOS

    GET_REQUERIMENTS_BY_DEPARTAMENTO,
    GET_REQUERIMENTS_BY_DEPARTAMENTO_EXITO,
    GET_REQUERIMENTS_BY_DEPARTAMENTO_ERROR,

    POST_DEPARTAMENTO_APP,
    POST_DEPARTAMENTO_APP_EXITO,
    POST_DEPARTAMENTO_APP_ERROR,

    ELIMINAR_DEPARTAMENTO_APP,
    ELIMINAR_DEPARTAMENTO_APP_EXITO,
    ELIMINAR_DEPARTAMENTO_APP_ERROR,

    VER_MODAL_REQUERIMENTS_DEPARTAMENTO,
    VER_MODAL_REQUERIMENTS_DEPARTAMENTO_EXITO,
    VER_MODAL_REQUERIMENTS_DEPARTAMENTO_ERROR,

    //REQUERIMENTS DIRECCION DEPARTAMENTAL
    GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL,
    GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_EXITO,
    GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_ERROR,

    POST_DIRECCION_DEPARTAMENTAL_APP,
    POST_DIRECCION_DEPARTAMENTAL_APP_EXITO,
    POST_DIRECCION_DEPARTAMENTAL_APP_ERROR,

    ELIMINAR_DIRECCION_DEPARTAMENTAL_APP,
    ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_EXITO,
    ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_ERROR,

    VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL,
    VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_EXITO,
    VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_ERROR

} from './types';

import axios from 'axios'
import { getCookie } from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'

const urlUser = process.env.REACT_APP_URL_DJANGO + "/api/user/"
const urlDepartamentos = process.env.REACT_APP_URL_DJANGO + "/api/departamento/"
const urlDireccionDepartamentos = process.env.REACT_APP_URL_DJANGO + "/api/direccionDepartamental/"

const urlRequerimentsDepartamentosApi = process.env.REACT_APP_URL_DJANGO + "/api/departamentoApp/"
const urlRequerimentsByDepartamentosApi = process.env.REACT_APP_URL_DJANGO + "/api/departamentoAppByContract/"

const urlRequerimentsDireccionDepartamentalApi = process.env.REACT_APP_URL_DJANGO + "/api/direccionDepartamentalApp/"
const urlRequerimentsByDireccionDepartamentalApi = process.env.REACT_APP_URL_DJANGO + "/api/direccionDepartamentalAppByContract/"

//************************ DELETE CONTRACT USER**********************************************

export function deleteDireccionDepartamentalAppAPIAction(id, idSubDireccionDepartamental) {

    return async (dispatch) => {
        dispatch(deleteDireccionDepartamentalAppAPI())

        await axios({
            method: "DELETE",
            url: urlRequerimentsDireccionDepartamentalApi + id,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(deleteDireccionDepartamentalAppAPIExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllRequerimentsByDireccionDepartamentalAPIAction(idSubDireccionDepartamental))

            })

            .catch(error => {
                console.log(error.response)
                dispatch(deleteDireccionDepartamentalAppAPIError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const deleteDireccionDepartamentalAppAPI = (id) => ({
    type: ELIMINAR_DIRECCION_DEPARTAMENTAL_APP,
    payload: id

})

const deleteDireccionDepartamentalAppAPIExito = estado => ({
    type: ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_EXITO,
    payload: estado

})

const deleteDireccionDepartamentalAppAPIError = estado => ({
    type: ELIMINAR_DIRECCION_DEPARTAMENTAL_APP_ERROR,
    payload: estado
})

//************************POST SUB DEPARTAMENTO**********************************************

export function postDireccionDepartamentalAppAPIAction(misionSelect, newDireccionDepartamentalApp) {

    return (dispatch) => {
        dispatch(postDireccionDepartamentalAppAPI())


        axios({
            method: "POST",
            url: urlRequerimentsDireccionDepartamentalApi,
            data: newDireccionDepartamentalApp,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(postDireccionDepartamentalAppAPIExito(response.data))
                dispatch(
                    showMessage({
                        message: "Created requeriments",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllRequerimentsByDireccionDepartamentalAPIAction(misionSelect))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(postDireccionDepartamentalAppAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created requeriments",
                        variant: "error"
                    })
                )
            })

    }
}

const postDireccionDepartamentalAppAPI = (programa) => ({
    type: POST_DIRECCION_DEPARTAMENTAL_APP,
    payload: programa

})

const postDireccionDepartamentalAppAPIExito = estado => ({
    type: POST_DIRECCION_DEPARTAMENTAL_APP_EXITO,
    payload: estado

})

const postDireccionDepartamentalAppAPIError = estado => ({
    type: POST_DIRECCION_DEPARTAMENTAL_APP_ERROR,
    payload: estado
})

//************************ MOSTRAR TODAS LOS REQUERIMIENTOS DE UNA DEPARTAMENTO **********************************************

export function mostrarAllRequerimentsByDireccionDepartamentalAPIAction(idDireccionDepartamental) {

    return async (dispatch) => {
        dispatch(mostrarAllRequerimentsByDireccionDepartamentalAPI(true))


        await axios({
            method: "GET",
            url: urlRequerimentsByDireccionDepartamentalApi + idDireccionDepartamental,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAllRequerimentsByDireccionDepartamentalAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAllRequerimentsByDireccionDepartamentalAPIError(true))
            })

    }
}

const mostrarAllRequerimentsByDireccionDepartamentalAPI = () => ({
    type: GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL,
    payload: false

})

const mostrarAllRequerimentsByDireccionDepartamentalAPIExito = programas => ({
    type: GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_EXITO,
    payload: programas

})

const mostrarAllRequerimentsByDireccionDepartamentalAPIError = estado => ({
    type: GET_REQUERIMENTS_BY_DIRECCION_DEPARTAMENTAL_ERROR,
    payload: estado
})

//************************ MOSTRAR DIALOGO INSERTAR DEPARTAMENTO **********************************************

export function cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPI())

        try {
            dispatch(cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIExito(valorNuevo))

        } catch (error) {

            dispatch(cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIError(true))
        }

    }
}

const cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPI = () => ({
    type: VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL,
    payload: true

})

const cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIExito = (valorNuevo) => ({
    type: VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIError = estado => ({
    type: VER_MODAL_REQUERIMENTS_DIRECCION_DEPARTAMENTAL_ERROR,
    payload: estado
})


export function deleteDepartamentoAppAPIAction(id, idSubDireccionDepartamental) {

    return async (dispatch) => {
        dispatch(deleteDepartamentoAppAPI())

        await axios({
            method: "DELETE",
            url: urlRequerimentsDepartamentosApi + id,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(deleteDepartamentoAppAPIExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllRequerimentsByDepartamentoAPIAction(idSubDireccionDepartamental))

            })

            .catch(error => {
                console.log(error.response)
                dispatch(deleteDepartamentoAppAPIError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const deleteDepartamentoAppAPI = (id) => ({
    type: ELIMINAR_DEPARTAMENTO_APP,
    payload: id

})

const deleteDepartamentoAppAPIExito = estado => ({
    type: ELIMINAR_DEPARTAMENTO_APP_EXITO,
    payload: estado

})

const deleteDepartamentoAppAPIError = estado => ({
    type: ELIMINAR_DEPARTAMENTO_APP_ERROR,
    payload: estado
})

//************************POST SUB DEPARTAMENTO**********************************************

export function postDepartamentoAppAPIAction(misionSelect, newDepartamentoApp) {

    return (dispatch) => {
        dispatch(postDepartamentoAppAPI())


        axios({
            method: "POST",
            url: urlRequerimentsDepartamentosApi,
            data: newDepartamentoApp,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(postDepartamentoAppAPIExito(response.data))
                dispatch(
                    showMessage({
                        message: "Created requeriments",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllRequerimentsByDepartamentoAPIAction(misionSelect))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(postDepartamentoAppAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created requeriments",
                        variant: "error"
                    })
                )
            })

    }
}

const postDepartamentoAppAPI = (programa) => ({
    type: POST_DEPARTAMENTO_APP,
    payload: programa

})

const postDepartamentoAppAPIExito = estado => ({
    type: POST_DEPARTAMENTO_APP_EXITO,
    payload: estado

})

const postDepartamentoAppAPIError = estado => ({
    type: POST_DEPARTAMENTO_APP_ERROR,
    payload: estado
})

//************************ MOSTRAR TODAS LOS REQUERIMIENTOS DE UNA DEPARTAMENTO **********************************************

export function mostrarAllRequerimentsByDepartamentoAPIAction(idDepartamento) {

    return async (dispatch) => {
        dispatch(mostrarAllRequerimentsByDepartamentoAPI(true))


        await axios({
            method: "GET",
            url: urlRequerimentsByDepartamentosApi + idDepartamento,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAllRequerimentsByDepartamentoAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAllRequerimentsByDepartamentoAPIError(true))
            })

    }
}

const mostrarAllRequerimentsByDepartamentoAPI = () => ({
    type: GET_REQUERIMENTS_BY_DEPARTAMENTO,
    payload: false

})

const mostrarAllRequerimentsByDepartamentoAPIExito = programas => ({
    type: GET_REQUERIMENTS_BY_DEPARTAMENTO_EXITO,
    payload: programas

})

const mostrarAllRequerimentsByDepartamentoAPIError = estado => ({
    type: GET_REQUERIMENTS_BY_DEPARTAMENTO_ERROR,
    payload: estado
})

//************************ MOSTRAR DIALOGO INSERTAR DEPARTAMENTO **********************************************

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
    type: VER_MODAL_REQUERIMENTS_DEPARTAMENTO,
    payload: true

})

const cambiarVisibilidadModalRequerimentsAPIExito = (valorNuevo) => ({
    type: VER_MODAL_REQUERIMENTS_DEPARTAMENTO_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalRequerimentsAPIError = estado => ({
    type: VER_MODAL_REQUERIMENTS_DEPARTAMENTO_ERROR,
    payload: estado
})

//************************PUT funcionDepartamental**********************************************

export function putDireccionDepartamentalAPIAction(idDireccionDepartamental, funcionDepartamentalNew) {

    return (dispatch) => {
        dispatch(putDireccionDepartamentalAPI())


        axios({
            method: "PUT",
            url: urlDireccionDepartamentos + idDireccionDepartamental,
            data: funcionDepartamentalNew,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(putDireccionDepartamentalAPIExito(response.data))
                dispatch(
                    showMessage({
                        message: "Updated funcionDepartamental",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllDireccionDepartamentalAPIAction())
            })
            .catch(error => {
                console.log(error.response)
                dispatch(putDireccionDepartamentalAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when update funcionDepartamental",
                        variant: "error"
                    })
                )
            })

    }
}

const putDireccionDepartamentalAPI = (programa) => ({
    type: PUT_FUNCION_DEPARTAMENTAL,
    payload: programa

})

const putDireccionDepartamentalAPIExito = estado => ({
    type: PUT_FUNCION_DEPARTAMENTAL_EXITO,
    payload: estado

})

const putDireccionDepartamentalAPIError = estado => ({
    type: PUT_FUNCION_DEPARTAMENTAL_ERROR,
    payload: estado
})

//************************POST funcionDepartamental**********************************************

export function postDireccionDepartamentalAPIAction(funcionDepartamentalNew) {

    return (dispatch) => {
        dispatch(postDireccionDepartamentalAPI())


        axios({
            method: "POST",
            url: urlDireccionDepartamentos,
            data: funcionDepartamentalNew,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(postDireccionDepartamentalAPIExito(response.data))
                dispatch(
                    showMessage({
                        message: "Created funcionDepartamental",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllDireccionDepartamentalAPIAction())
            })
            .catch(error => {
                console.log(error.response)
                dispatch(postDireccionDepartamentalAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created funcionDepartamental",
                        variant: "error"
                    })
                )
            })

    }
}

const postDireccionDepartamentalAPI = (programa) => ({
    type: POST_FUNCION_DEPARTAMENTAL,
    payload: programa

})

const postDireccionDepartamentalAPIExito = estado => ({
    type: POST_FUNCION_DEPARTAMENTAL_EXITO,
    payload: estado

})

const postDireccionDepartamentalAPIError = estado => ({
    type: POST_FUNCION_DEPARTAMENTAL_ERROR,
    payload: estado
})

//************************PUT departamento**********************************************

export function putDepartamentoAPIAction(idDepartamento, DepartamentoNew) {

    return (dispatch) => {
        dispatch(putDepartamentoAPI())


        axios({
            method: "PUT",
            url: urlDepartamentos + idDepartamento,
            data: DepartamentoNew,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(putDepartamentoAPIExito(response.data))
                dispatch(
                    showMessage({
                        message: "Updated departamento",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllDepartamentosAPIAction())
            })
            .catch(error => {
                console.log(error.response)
                dispatch(putDepartamentoAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when update departamento",
                        variant: "error"
                    })
                )
            })

    }
}

const putDepartamentoAPI = (programa) => ({
    type: PUT_DEPARTAMENTO,
    payload: programa

})

const putDepartamentoAPIExito = estado => ({
    type: PUT_DEPARTAMENTO_EXITO,
    payload: estado

})

const putDepartamentoAPIError = estado => ({
    type: PUT_DEPARTAMENTO_ERROR,
    payload: estado
})

//************************POST departamento**********************************************

export function postDepartamentoAPIAction(DepartamentoNew) {

    return (dispatch) => {
        dispatch(postDepartamentoAPI())


        axios({
            method: "POST",
            url: urlDepartamentos,
            data: DepartamentoNew,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(postDepartamentoAPIExito(response.data))
                dispatch(
                    showMessage({
                        message: "Created departamento",
                        variant: "success"
                    })
                )

                dispatch(mostrarAllDepartamentosAPIAction())
            })
            .catch(error => {
                console.log(error.response)
                dispatch(postDepartamentoAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error when created departamento",
                        variant: "error"
                    })
                )
            })

    }
}

const postDepartamentoAPI = (programa) => ({
    type: POST_DEPARTAMENTO,
    payload: programa

})

const postDepartamentoAPIExito = estado => ({
    type: POST_DEPARTAMENTO_EXITO,
    payload: estado

})

const postDepartamentoAPIError = estado => ({
    type: POST_DEPARTAMENTO_ERROR,
    payload: estado
})

//************************ SELECCIONAR FUNCION_DEPARTAMENTAL API **********************************************
export function seleccionarDireccionDepartamentalTablaAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch(seleccionarDireccionDepartamentalTabla())

        try {
            dispatch(seleccionarDireccionDepartamentalTablaExito(valorNuevo))


        } catch (error) {

            dispatch(seleccionarDireccionDepartamentalTablaError(true))
        }

    }

}

const seleccionarDireccionDepartamentalTabla = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL,
    payload: false

})

const seleccionarDireccionDepartamentalTablaExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_EXITO,
    payload: valorNuevo

})

const seleccionarDireccionDepartamentalTablaError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_FUNCION_DEPARTAMENTAL_ERROR,
    payload: estado
})

//************************ SELECCIONAR DEPARTAMENTO API **********************************************
export function seleccionarDepartamentoTablaAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch(seleccionarDepartamentoTabla())

        try {
            dispatch(seleccionarDepartamentoTablaExito(valorNuevo))


        } catch (error) {

            dispatch(seleccionarDepartamentoTablaError(true))
        }

    }

}

const seleccionarDepartamentoTabla = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO,
    payload: false

})

const seleccionarDepartamentoTablaExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_EXITO,
    payload: valorNuevo

})

const seleccionarDepartamentoTablaError = estado => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_DEPARTAMENTO_ERROR,
    payload: estado
})

//************************ MOSTRAR TODOS LOS DEPARTAMENTOS **********************************************

export function mostrarAllDepartamentosAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarAllDepartamentosAPI(true))


        await axios({
            method: "GET",
            url: urlDepartamentos,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAllDepartamentosAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAllDepartamentosAPIError(true))
            })

    }
}

const mostrarAllDepartamentosAPI = () => ({
    type: GET_ALL_DEPARTAMENTOS,
    payload: true

})

const mostrarAllDepartamentosAPIExito = programas => ({
    type: GET_ALL_DEPARTAMENTOS_EXITO,
    payload: programas

})

const mostrarAllDepartamentosAPIError = estado => ({
    type: GET_ALL_DEPARTAMENTOS_ERROR,
    payload: estado
})

//************************ MOSTRAR TODAS LAS FUNCIONES DEPARTAMENTALES **********************************************

export function mostrarAllDireccionDepartamentalAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarAllDireccionDepartamentalAPI(true))


        await axios({
            method: "GET",
            url: urlDireccionDepartamentos,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(mostrarAllDireccionDepartamentalAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarAllDireccionDepartamentalAPIError(true))
            })

    }
}

const mostrarAllDireccionDepartamentalAPI = () => ({
    type: GET_ALL_DIRECCION_DEPARTAMENTAL,
    payload: true

})

const mostrarAllDireccionDepartamentalAPIExito = programas => ({
    type: GET_ALL_DIRECCION_DEPARTAMENTAL_EXITO,
    payload: programas

})

const mostrarAllDireccionDepartamentalAPIError = estado => ({
    type: GET_ALL_DIRECCION_DEPARTAMENTAL_ERROR,
    payload: estado
})


//Cambiar ValorTabDepartamento

export function cambiarValorTabDepartamentoAction(ValorTabDepartamento) {

    return (dispatch) => {
        dispatch(cambiarValorTabDepartamento())

        try {
            dispatch(cambiarValorTabDepartamentoExito(ValorTabDepartamento))

        } catch (error) {

            dispatch(cambiarValorTabDepartamentoError(true))
        }

    }

}

const cambiarValorTabDepartamento = () => ({
    type: CAMBIAR_VALOR_TAB_DEPARTAMENTO,
    payload: true

})

const cambiarValorTabDepartamentoExito = ValorTabDepartamento => ({
    type: CAMBIAR_VALOR_TAB_DEPARTAMENTO_EXITO,
    payload: ValorTabDepartamento

})

const cambiarValorTabDepartamentoError = estado => ({
    type: CAMBIAR_VALOR_TAB_DEPARTAMENTO_ERROR,
    payload: estado
})


//************************ MOSTRAR DIALOGO INSERTAR DEPARTAMENTO **********************************************

export function cambiarVisibilidadModalInsertarDepartamentoAPIAction(valorNuevo, modoApertura) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalInsertarDepartamentoAPI())

        try {
            dispatch(cambiarVisibilidadModalInsertarDepartamentoAPIExito(valorNuevo, modoApertura))

        } catch (error) {

            dispatch(cambiarVisibilidadModalInsertarDepartamentoAPIError(true))
        }

    }
}

const cambiarVisibilidadModalInsertarDepartamentoAPI = () => ({
    type: VER_MODAL_INSERT_DEPARTAMENTO,
    payload: true

})

const cambiarVisibilidadModalInsertarDepartamentoAPIExito = (valorNuevo, modoApertura) => ({
    type: VER_MODAL_INSERT_DEPARTAMENTO_EXITO,
    payload: valorNuevo,
    modoApertura: modoApertura

})

const cambiarVisibilidadModalInsertarDepartamentoAPIError = estado => ({
    type: VER_MODAL_INSERT_DEPARTAMENTO_ERROR,
    payload: estado
})


//************************ MOSTRAR DIALOGO INSERTAR DEPARTAMENTO **********************************************

export function cambiarVisibilidadModalInsertarDireccionDepartamentalAPIAction(valorNuevo, modoApertura) {

    return (dispatch) => {
        dispatch(cambiarVisibilidadModalInsertarDireccionDepartamentalAPI())

        try {
            dispatch(cambiarVisibilidadModalInsertarDireccionDepartamentalAPIExito(valorNuevo, modoApertura))

        } catch (error) {

            dispatch(cambiarVisibilidadModalInsertarDireccionDepartamentalAPIError(true))
        }

    }
}

const cambiarVisibilidadModalInsertarDireccionDepartamentalAPI = () => ({
    type: VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL,
    payload: true

})

const cambiarVisibilidadModalInsertarDireccionDepartamentalAPIExito = (valorNuevo, modoApertura) => ({
    type: VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_EXITO,
    payload: valorNuevo,
    modoApertura: modoApertura

})

const cambiarVisibilidadModalInsertarDireccionDepartamentalAPIError = estado => ({
    type: VER_MODAL_INSERT_FUNCION_DEPARTAMENTAL_ERROR,
    payload: estado
})