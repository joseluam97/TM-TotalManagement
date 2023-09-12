import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY,
    CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_ERROR,

    ELIMINAR_RM_REGISTRO,
    ELIMINAR_RM_REGISTRO_EXITO,
    ELIMINAR_RM_REGISTRO_ERROR,

    MOSTRAR_RM_REGISTRO,
    MOSTRAR_RM_REGISTRO_EXITO,
    MOSTRAR_RM_REGISTRO_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL,
    CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_ERROR,

    CAMBIAR_ESTADO_RM_REGISTRO,
    CAMBIAR_ESTADO_RM_REGISTRO_EXITO,
    CAMBIAR_ESTADO_RM_REGISTRO_ERROR,

    UPDATE_RM_REGISTRO,
    UPDATE_RM_REGISTRO_EXITO,
    UPDATE_RM_REGISTRO_ERROR,

    RESET_STATES_RM_REGISTRO,
    RESET_STATES_RM_REGISTRO_EXITO,
    RESET_STATES_RM_REGISTRO_ERROR,

    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_RM_REGISTRO_MODAL_INSERTAR,
    INSERTAR_RM_REGISTRO_MODAL_INSERTAR_EXITO,
    INSERTAR_RM_REGISTRO_MODAL_INSERTAR_ERROR,

    CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR,
    CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO,
    CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_HISTORICO,
    CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_ERROR,

    CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA,
    CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_EXITO,
    CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_ERROR,

    MOSTRAR_RM_REGISTRO_LAST_VERSION,
    MOSTRAR_RM_REGISTRO_LAST_VERSION_EXITO,
    MOSTRAR_RM_REGISTRO_LAST_VERSION_ERROR


} from './types';
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'
import store from "app/store/index"

//Constantes
const urlRmRegistroApi = process.env.REACT_APP_URL_DJANGO + "/api/rm_risk_opportunity/"
const urlRiskManagementApi = process.env.REACT_APP_URL_DJANGO + "/api/risk_management/"

//************************ CONSULTA RISK OPORTUNITY ASOCIADOS MODAL **********************************************

export function consultaRiskOpportunityOrganigramaAPIAction(idRisk) {

    return async (dispatch) => {
        dispatch (consultaRiskOpportunityOrganigramaAPI())

        

             await axios({
                    method: "GET",
                    url: urlRmRegistroApi + "organigrama/" + idRisk,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                        
                    })
                    .then(response=>{
                        dispatch (consultaRiskOpportunityOrganigramaAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (consultaRiskOpportunityOrganigramaAPIError(true))
                    })
   
    }
}

const consultaRiskOpportunityOrganigramaAPI = () => ({
    type: CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA,
    payload: true

})

const consultaRiskOpportunityOrganigramaAPIExito = riskOportunity => ({
    type: CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_EXITO,
    payload: riskOportunity

})

const consultaRiskOpportunityOrganigramaAPIError = estado => ({
  type: CONSULTA_RISK_OPORTUNITY_ORGANIGRAMA_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL INSERTAR**********************************************

export function cambiarVisibilidadModalInsertarRmRiskOpportunityAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalInsertarRmRiskOpportunity())

        try {
            dispatch (cambiarVisibilidadModalInsertarRmRiskOpportunityExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalInsertarRmRiskOpportunityError(true))
        }
    }
}

const cambiarVisibilidadModalInsertarRmRiskOpportunity = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    payload: true

})

const cambiarVisibilidadModalInsertarRmRiskOpportunityExito = valorNuevo => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalInsertarRmRiskOpportunityError = estado => ({
  type:  CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,
  payload: estado
})


//************************CAMBIAR VISIBILIDAD MODAL PRINCIPAL**********************************************

export function cambiarVisibilidadModalPrincipalAction(valorNuevo) {

    return (dispatch) => {
        dispatch ( cambiarVisibilidadModalPrincipal())

        try {
            dispatch ( cambiarVisibilidadModalPrincipalExito(valorNuevo))

        } catch (error) {

            dispatch ( cambiarVisibilidadModalPrincipalError(true))
        }
    }
}

const  cambiarVisibilidadModalPrincipal = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL,
    payload: true

})

const  cambiarVisibilidadModalPrincipalExito = valorNuevo => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_EXITO,
    payload: valorNuevo

})

const  cambiarVisibilidadModalPrincipalError = estado => ({
  type:  CAMBIAR_MODAL_VISIBILIDAD_PRINCIPAL_ERROR,
  payload: estado
})

//************************ CAMBIAR ESTADO RM_REGISTRO  **********************************************

export function cambiarEstadoRmRegistroAction(nombreEstado, valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarEstadoRmRegistro())

        try {
            dispatch (cambiarEstadoRmRegistroExito(nombreEstado, valorNuevo))

        } catch (error) {

            dispatch (cambiarEstadoRmRegistroError(true))
        }
    }
}

const cambiarEstadoRmRegistro = () => ({
    type: CAMBIAR_ESTADO_RM_REGISTRO,
    payload: true

})

const cambiarEstadoRmRegistroExito = (nombreEstado, valorNuevo) => ({
    type: CAMBIAR_ESTADO_RM_REGISTRO_EXITO,
    nombre: nombreEstado,
    payload: valorNuevo
    

})

const cambiarEstadoRmRegistroError = estado => ({
  type:  CAMBIAR_ESTADO_RM_REGISTRO_ERROR,
  payload: estado
})



//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorSeleccionRmRiskOpportunityAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarValorSeleccionRmRiskOpportunity())

        try {
            dispatch (cambiarValorSeleccionRmRiskOpportunityExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarValorSeleccionRmRiskOpportunityError(true))
        }

    }

}

const cambiarValorSeleccionRmRiskOpportunity = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY,
    payload: false

})

const cambiarValorSeleccionRmRiskOpportunityExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionRmRiskOpportunityError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_RM_RISK_OPPORTUNITY_ERROR,
  payload: estado
})


//************************ ELIMINAR RM REGISTRO **********************************************

export function eliminarRmRegistroAction(id) {

    return async (dispatch) => {
        dispatch (eliminarRmRegistro())

        
                await axios({
                    method: "DELETE",
                    url: urlRmRegistroApi + id,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                         .then(response=>{
                            dispatch (eliminarRmRegistroExito(false))
    
                            dispatch(
                                showMessage({
                                    message: "Correctly removed",
                                    variant: "success"
                                })
                            )
    
                            if(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid != "" && store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid != undefined){
                                dispatch(mostrarRmRegistroAPIAction(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid))
                                dispatch(mostrarRmRegistroLastVersionAPIAction(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid));
                            }
                            else{
                                dispatch(mostrarRmRegistroAPIAction(store.getState().fuse.riskManagementComponente.ultimoIdCreado['id']))
                                dispatch(mostrarRmRegistroLastVersionAPIAction(store.getState().fuse.riskManagementComponente.ultimoIdCreado['id']));
                            }
                        })
                        
                     .catch(error => {
                        console.log(error.response)
                        dispatch (eliminarRmRegistroError(false))
                        dispatch(
                            showMessage({
                                message: "Error al eliminar",
                                variant: "error"
                            })
                        )
                    })

       
      }
}

const eliminarRmRegistro = (id) => ({
    type: ELIMINAR_RM_REGISTRO,
    payload: id

})

const eliminarRmRegistroExito = estado => ({
    type: ELIMINAR_RM_REGISTRO_EXITO,
    payload: estado

})

const eliminarRmRegistroError = estado => ({
    type:  ELIMINAR_RM_REGISTRO_ERROR,
    payload: estado
})



//************************ MOSTRAR RM_REGISTRO API **********************************************

export function mostrarRmRegistroLastVersionAPIAction(id_risk_management_value) {

    return async (dispatch) => {
        dispatch (mostrarRmRegistroLastVersionAPI())


              await axios({
                    method: "GET",
                    url: urlRmRegistroApi + "lastVersion/" + id_risk_management_value ,
                    headers: {
                            'Authorization': `Token ${getCookie('token')}` 
                              }
                        
                            })
                             .then(response=>{
                                dispatch (mostrarRmRegistroLastVersionAPIExito(response.data))
                            })
                            .catch(error => {
                                console.log(error.response)
                                dispatch (mostrarRmRegistroLastVersionAPIError(true))
                            })
   
    }
}

const mostrarRmRegistroLastVersionAPI = () => ({
    type: MOSTRAR_RM_REGISTRO_LAST_VERSION,
    payload: true

})

const mostrarRmRegistroLastVersionAPIExito = rm_risks => ({
    type: MOSTRAR_RM_REGISTRO_LAST_VERSION_EXITO,
    payload: rm_risks

})

const mostrarRmRegistroLastVersionAPIError = estado => ({
  type: MOSTRAR_RM_REGISTRO_LAST_VERSION_ERROR,
  payload: estado
})

export function mostrarRmRegistroAPIAction(id_risk_management_value) {

    return async (dispatch) => {
        dispatch (mostrarRmRegistroAPI())


              await axios({
                    method: "GET",
                    url: urlRmRegistroApi + "?id_risk_management=" + id_risk_management_value ,
                    headers: {
                            'Authorization': `Token ${getCookie('token')}` 
                              }
                        
                            })
                             .then(response=>{
                                dispatch (mostrarRmRegistroAPIExito(response.data))
                            })
                            .catch(error => {
                                console.log(error.response)
                                dispatch (mostrarRmRegistroAPIError(true))
                            })
   
    }
}

const mostrarRmRegistroAPI = () => ({
    type: MOSTRAR_RM_REGISTRO,
    payload: true

})

const mostrarRmRegistroAPIExito = rm_risks => ({
    type: MOSTRAR_RM_REGISTRO_EXITO,
    payload: rm_risks

})

const mostrarRmRegistroAPIError = estado => ({
  type: MOSTRAR_RM_REGISTRO_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL HISTORICO**********************************************

export function cambiarVisibilidadModalHistoricoRmRiskOpportunityAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalHistoricoRmRiskOpportunity())

        try {
            dispatch (cambiarVisibilidadModalHistoricoRmRiskOpportunityExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalHistoricoRmRiskOpportunityError(true))
        }
    }
}

const cambiarVisibilidadModalHistoricoRmRiskOpportunity = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_HISTORICO,
    payload: true

})

const cambiarVisibilidadModalHistoricoRmRiskOpportunityExito = valorNuevo => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalHistoricoRmRiskOpportunityError = estado => ({
  type:  CAMBIAR_MODAL_VISIBILIDAD_HISTORICO_ERROR,
  payload: estado
})


//************************ INSERTA RM_REGISTRO MODAL INSERTAR**********************************************

export function insertarRmRegistroModalInsertarAction(rm_risk) {

    return async (dispatch) => {
        dispatch (insertarRmRegistroModalInsertar())
            
             axios({
                    method: "POST",
                    url: urlRmRegistroApi,
                    data: rm_risk,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                     }
                       
              })   
              .then(response => {
                


                 dispatch(
                    showMessage({
                        message: "Risk successfully created",
                        variant: "success"
                    }) 
                    
                )

                 /* ******** Asocia en fila seleccionada el R&O recién creado   */  

                  /* ** dispatch(cambiarEstadoRmRegistroAction('filaSeleccionadaGrid', response.data.id))  */  
                
                 /* ********Detecta si ha habido cambio de versión   */                

                  let ultimaCreado = store.getState().fuse.rmRegistroComponente.filaSeleccionadaGrid

                  if (ultimaCreado == "" || ultimaCreado == undefined) {

                    ultimaCreado = store.getState().fuse.rmRegistroComponente.ultimoIdCreado['id']

                  }
                    if(rm_risk.rev>1) {
                        //let stringPut = '{"closed": true, "padreRiskOpportunity": '+ response.data.id +'}'
                        //dispatch(updateRmRegistroAction(ultimaCreado, stringPut))

                        let riskOportunityHistorico = store.getState().fuse.rmRegistroComponente.rmRegistrosListAPI
                        let riskOportunitySelected = riskOportunityHistorico.filter(elemento => elemento.id == ultimaCreado)[0]

                        dispatch(updateRmRegistroAction(ultimaCreado,{
                            id_risk_management: riskOportunitySelected.id_risk_management,
                            risk: riskOportunitySelected.risk,
                            d_detection: riskOportunitySelected.d_detection,
                            glitch_effect: riskOportunitySelected.glitch_effect,
                            cause_failure: riskOportunitySelected.cause_failure,
                            current_controls: riskOportunitySelected.current_controls,
                            gravity: riskOportunitySelected.gravity,
                            idea: riskOportunitySelected.idea,
                            detection: riskOportunitySelected.detection,
                            npr: riskOportunitySelected.npr,
                            priorization: riskOportunitySelected.priorization,
                            observations: riskOportunitySelected.observations,
                            categorizacion: riskOportunitySelected.categorizacion,
                            type: riskOportunitySelected.type,
                            site: riskOportunitySelected.site,
                            rev: riskOportunitySelected.rev,
                            padreRiskOpportunity: response.data.id,
                            closed: true
                        }))
                   }
                   

                dispatch (insertarRmRegistroModalInsertarExito(response.data))
                dispatch(cambiarEstadoRmRegistroAction('filaSeleccionadaGrid', response.data.id))

                if(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid != "" && store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid != undefined){
                    dispatch(mostrarRmRegistroAPIAction(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid))
                    dispatch(mostrarRmRegistroLastVersionAPIAction(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid));
                }
                else{
                    dispatch(mostrarRmRegistroAPIAction(store.getState().fuse.riskManagementComponente.ultimoIdCreado['id']))
                    dispatch(mostrarRmRegistroLastVersionAPIAction(store.getState().fuse.riskManagementComponente.ultimoIdCreado['id']));
                }
                
             })
             .catch(error => {
                console.log(error.response)
                dispatch (insertarRmRegistroModalInsertarError(true))
                dispatch(
                    showMessage({
                        message: "Error creating risk / opportunity",
                        variant: "error"
                    })
                )

            })

    }
}

const insertarRmRegistroModalInsertar = (rm_risk) => ({
    type: INSERTAR_RM_REGISTRO_MODAL_INSERTAR,
    payload: rm_risk

})

const insertarRmRegistroModalInsertarExito = idCreado => ({
    type: INSERTAR_RM_REGISTRO_MODAL_INSERTAR_EXITO,
    payload: idCreado

})

const insertarRmRegistroModalInsertarError = estado => ({
    type:  INSERTAR_RM_REGISTRO_MODAL_INSERTAR_ERROR,
    payload: estado
})

//************************ CONSULTA RISK MANAGEMENT MODAL **********************************************

export function consultaRiskManagementAction() {

    return async (dispatch) => {
        dispatch (consultaRiskManagement())

        

             await axios({
                    method: "GET",
                    url: urlRiskManagementApi,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                        
                    })
                    .then(response=>{
                        dispatch (consultaRiskManagementActionExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (consultaRiskManagementActionError(true))
                    })
   
    }
}

const consultaRiskManagement = () => ({
    type: CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR,
    payload: true

})

const consultaRiskManagementActionExito = programas => ({
    type: CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_EXITO,
    payload: programas

})

const consultaRiskManagementActionError = estado => ({
  type: CONSULTA_RISK_MANAGEMENT_MODAL_INSERTAR_ERROR,
  payload: estado
})


//************************ UPDATE RM_REGISTRO **********************************************

export function updateRmRegistroAction(id, json) {

    return async (dispatch) => {
        dispatch (updateRmRegistro())

             axios({
                    method: "PUT",
                    url: urlRmRegistroApi + id,
                    data: json,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (updateRmRegistroExito(response.data))

                 if(response.data['active'] == true){
                 dispatch(
                    showMessage({
                        message: "Updated Registro",
                        variant: "success"
                    })
                 )
                }
                else{
                    dispatch(
                        showMessage({
                            message: "Delete R&O",
                            variant: "success"
                        })
                     )
                }
                
                if(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid != "" && store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid != undefined){
                    dispatch(mostrarRmRegistroAPIAction(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid))
                    dispatch(mostrarRmRegistroLastVersionAPIAction(store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid));
                }
                else{
                    dispatch(mostrarRmRegistroAPIAction(store.getState().fuse.riskManagementComponente.ultimoIdCreado['id']))
                    dispatch(mostrarRmRegistroLastVersionAPIAction(store.getState().fuse.riskManagementComponente.ultimoIdCreado['id']));
                }
                 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (updateRmRegistroError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating Registro",
                        variant: "error"
                    })
                )
            })

    }
}

const updateRmRegistro = (rm_accion) => ({
    type: UPDATE_RM_REGISTRO,
    payload: rm_accion

})

const updateRmRegistroExito = estado => ({
    type: UPDATE_RM_REGISTRO_EXITO,
    payload: estado

})

const updateRmRegistroError = estado => ({
    type:  UPDATE_RM_REGISTRO_ERROR,
    payload: estado
})



//************************ RESET ESTADOS  **********************************************

export function resetEstadosRmRegistroAction() {

    return (dispatch) => {
        dispatch (resetEstadosRmRegistro())


        try {
            dispatch (resetEstadosRmRegistroExito(true))


        } catch (error) {

            dispatch (resetEstadosRmRegistroError(true))
        }
    }
}

const resetEstadosRmRegistro = () => ({
    type: RESET_STATES_RM_REGISTRO,
    payload: true

})

const resetEstadosRmRegistroExito = estado => ({
    type: RESET_STATES_RM_REGISTRO_EXITO,
    payload: estado
    

})

const resetEstadosRmRegistroError = estado => ({
  type:  RESET_STATES_RM_REGISTRO_ERROR,
  payload: estado
})