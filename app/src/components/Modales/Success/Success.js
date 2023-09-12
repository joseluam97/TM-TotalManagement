// IMPORTACIONES *******************************************

import { React, useEffect, useState, useRef} from 'react'

import {
    CModal,
    CButton,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
  } from '@coreui/react'

//END_IMPORTACIONES *******************************************


//ENTORNO GLOBAL ************************************************

export default function Success(props) {

   
    return (
        <>
    
        {/* MODAL OCULTO DE SUCCESS ********************************************************************/}
        
        <CModal visible={props.visible} >
          <CModalHeader onClose={() => props.cambiarVisibilidad(false)}>
            <CModalTitle>Acción exitosa</CModalTitle>
          </CModalHeader>
          <CModalBody>
              {props.mensaje}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => props.cambiarVisibilidad(false)}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
  
        {/* MODAL_OCULTO_END_SUCCESS ********************************************************************/}

  
        </>
  )
}

