import {

    CAMBIAR_VALOR_TAB_PEOPLE,
    CAMBIAR_VALOR_TAB_PEOPLE_EXITO,
    CAMBIAR_VALOR_TAB_PEOPLE_ERROR,

    VER_MODAL_SOLICITAR_PERSONAL,
    VER_MODAL_SOLICITAR_PERSONAL_EXITO,
    VER_MODAL_SOLICITAR_PERSONAL_ERROR,

    GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION,
    GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_EXITO,
    GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_ERROR,

    SET_MEMBER_SELECT_PEOPLE,
    SET_MEMBER_SELECT_PEOPLE_EXITO,
    SET_MEMBER_SELECT_PEOPLE_ERROR,

    GET_MY_MANAGER,
    GET_MY_MANAGER_EXITO,
    GET_MY_MANAGER_ERROR,

    SET_SUB_MISION_ESTRUCTURA_SELECCIONADA,
    SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_EXITO,
    SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_ERROR,


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlTeamAPI = process.env.REACT_APP_URL_DJANGO + "/api/user/"
const urlGetUserPermisosPeopleManagment = process.env.REACT_APP_URL_DJANGO + "/api/workPackage/getUserResponsablesWP/"
const urlGetResponsablesMisionesAsociadasSubMisiones = process.env.REACT_APP_URL_DJANGO + "/api/subMision/misSubmisiones/"

//************************ CAMBIAR SELECCION CARD PERSONAL MEMBERS **********************************************

export function setSubMisionEstructuraSeleccionadaAPIAction(valorNuevo) {
    return (dispatch) => {
        dispatch (setSubMisionEstructuraSeleccionadaAPI())

        try {
            dispatch (setSubMisionEstructuraSeleccionadaAPIExito(valorNuevo))

        } catch (error) {

            dispatch (setSubMisionEstructuraSeleccionadaAPIError(true))
        }

    }

}

const setSubMisionEstructuraSeleccionadaAPI = () => ({
    type: SET_SUB_MISION_ESTRUCTURA_SELECCIONADA,
    payload: true

})

const setSubMisionEstructuraSeleccionadaAPIExito = valorNuevo => ({
    type: SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_EXITO,
    payload: valorNuevo

})

const setSubMisionEstructuraSeleccionadaAPIError = estado => ({
  type: SET_SUB_MISION_ESTRUCTURA_SELECCIONADA_ERROR,
  payload: estado
})

//************************ CAMBIAR SELECCION CARD PERSONAL MEMBERS **********************************************

export function setMemberSelectAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (setMemberSelectAPI())

        try {
            dispatch (setMemberSelectAPIExito(valorNuevo))

        } catch (error) {

            dispatch (setMemberSelectAPIError(true))
        }

    }

}

const setMemberSelectAPI = () => ({
    type: SET_MEMBER_SELECT_PEOPLE,
    payload: true

})

const setMemberSelectAPIExito = valorNuevo => ({
    type: SET_MEMBER_SELECT_PEOPLE_EXITO,
    payload: valorNuevo

})

const setMemberSelectAPIError = estado => ({
  type: SET_MEMBER_SELECT_PEOPLE_ERROR,
  payload: estado
})

//************************ GET RESPONSABLES DE SUBMISION ASOCIADA A MISION**********************************************

export function getResponsablesMisionAsociadaSubMisionAPIAction(idSubMision) {

    return async (dispatch) => {
        dispatch (getResponsablesMisionAsociadaSubMisionAPI())
             axios({
                    method: "GET",
                    url: urlGetResponsablesMisionesAsociadasSubMisiones + idSubMision,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (getResponsablesMisionAsociadaSubMisionAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (getResponsablesMisionAsociadaSubMisionAPIError(true))
            })

    }
}

const getResponsablesMisionAsociadaSubMisionAPI = (user) => ({
    type: GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION,
    payload: user

})

const getResponsablesMisionAsociadaSubMisionAPIExito = notification => ({
    type: GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_EXITO,
    payload: notification

})

const getResponsablesMisionAsociadaSubMisionAPIError = estado => ({
    type: GET_RESPONSABLES_MISION_ASOCIADA_SUB_MISION_ERROR,
    payload: estado
})

//************************ GET MY MANAGERS**********************************************

export function getMyManagersAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch (getMyManagersAPI())
             axios({
                    method: "GET",
                    url: urlTeamAPI + "estructuraPersonalManager/" + idPersona,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (getMyManagersAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (getMyManagersAPIError(true))
            })

    }
}

const getMyManagersAPI = (user) => ({
    type: GET_MY_MANAGER,
    payload: user

})

const getMyManagersAPIExito = notification => ({
    type: GET_MY_MANAGER_EXITO,
    payload: notification

})

const getMyManagersAPIError = estado => ({
    type: GET_MY_MANAGER_ERROR,
    payload: estado
})

//************************ MODAL SOLICITUD PERSONAL**********************************************
export function verModalSolicitudPersonalAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (verModalSolicitudPersonalAPI())

        try {
            dispatch (verModalSolicitudPersonalAPIExito(valorNuevo))
            

        } catch (error) {

            dispatch (verModalSolicitudPersonalAPIError(true))
        }

    }

}

const verModalSolicitudPersonalAPI = () => ({
    type: VER_MODAL_SOLICITAR_PERSONAL,
    payload: true

})

const verModalSolicitudPersonalAPIExito = valorNuevo => ({
    type: VER_MODAL_SOLICITAR_PERSONAL_EXITO,
    payload: valorNuevo

})

const verModalSolicitudPersonalAPIError = estado => ({
  type: VER_MODAL_SOLICITAR_PERSONAL_ERROR,
  payload: estado
})

//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorTabPeopleAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarValorTabPeople())

        try {
            dispatch (cambiarValorTabPeopleExito(valorNuevo))
            

        } catch (error) {

            dispatch (cambiarValorTabPeopleError(true))
        }

    }

}

const cambiarValorTabPeople = () => ({
    type: CAMBIAR_VALOR_TAB_PEOPLE,
    payload: true

})

const cambiarValorTabPeopleExito = valorNuevo => ({
    type: CAMBIAR_VALOR_TAB_PEOPLE_EXITO,
    payload: valorNuevo

})

const cambiarValorTabPeopleError = estado => ({
  type: CAMBIAR_VALOR_TAB_PEOPLE_ERROR,
  payload: estado
})

