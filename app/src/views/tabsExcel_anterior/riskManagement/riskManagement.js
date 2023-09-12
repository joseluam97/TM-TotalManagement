//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//Componentes genéricos importaciones
import TabsExcelRiskManagement from '../../../components/TabsExcel/RiskManagement/RiskManagement.js'
import TabsExcelRmRegistro from '../../../components/TabsExcel/RiskManagement/modals/RmRegistro/RmRegistro.js'
import TabsExcelRmAccion from '../../../components/TabsExcel/RiskManagement/modals/RmAccion/RmAccion.js'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

//Stores
import { cambiarValorTabAction } from  './store/actions'


//**********************END_IMPORTACIONES ***********************/


function RiskManagement() {

    const dispatch = useDispatch()
   
    //obtener el state de Redux
    const valorTab = useSelector (state => state.fuse.riskManagementView.valorTab)

    //creamos funciones para hacer uso de Actions
    const cambiarValorTab = (valorTab) => dispatch(cambiarValorTabAction(valorTab))


    
    const cambiarEstado = (event, newValue) => {
         cambiarValorTab (newValue)

      }

    
      
      
    return (
        <FusePageCarded

            content={
                <Box sx={{ width: '100%' }}>
                    
                    <TabContext value={valorTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList onChange={cambiarEstado} aria-label="vista riskManagement">
                            <Tab label="Risk Management" value="risk_management" />
                            <Tab label="Rm Risk Opportunity" value="rm_registros" />
                            <Tab label="Rm Actions" value="rm_acciones" />
                          </TabList>
                        </Box>
                        <TabPanel value="risk_management"><TabsExcelRiskManagement /></TabPanel>
                        <TabPanel value="rm_registros"><TabsExcelRmRegistro /></TabPanel>
                        <TabPanel value="rm_acciones"><TabsExcelRmAccion /></TabPanel>
                      </TabContext>
                     
                </Box>
            }

          
       
    />
    );
  }

  export default  RiskManagement