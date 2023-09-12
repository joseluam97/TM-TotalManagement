//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import { cambiarValorTabAction } from  './store/actions'

import { useNavigate } from "react-router-dom";

//**********************END_IMPORTACIONES ***********************/


function Programa() {

    const navigate = useNavigate();

    //obtener el state de Redux
    const valorTab = useSelector (state => state.fuse.programasView.valorTab)

    //creamos una función para hacer uso de Actions
    const dispatch = useDispatch()
    const cambiarValorTab = (valorTab) => dispatch(cambiarValorTabAction(valorTab))
    
    const cambiarEstado = (event, newValue) => {
         cambiarValorTab (newValue)
         navigate('/404')
      }
      
    return (
        <FusePageCarded

            content={
                <Box sx={{ width: '100%' }}>
                    
                    <Tabs
                        value={valorTab}
                        onChange={cambiarEstado}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                            <Tab value="programa" label="Programa" />
                            <Tab value="subconjunto" label="Subconjunto" />
                            <Tab value="contrato" label="Contrato/Servicio" />
                            <Tab value="mision" label="Misión/Paquete trabajo" />
                    </Tabs>
                </Box>
            }

          
       
    />
    );
  }

  export default Programa