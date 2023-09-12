import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { React } from 'react'

function DetallesMejoras() {
  const theme = useTheme();

  const [mejorasRechazadas, setMejorasRechazadas] = useState('')
  const [mejorasAceptadas, setMejorasAceptadas] = useState('')
  const [mejorasEnEstudio, setMejorasEnEstudio] = useState('')
  const [mejorasSolicitadas, setMejorasSolicitadas] = useState('')

  const improvementProposalsList = useSelector(state => state.fuse.improvementProposalsComponent.improvementProposalsListAPI)



  const contractUserList = useSelector(state => state.fuse.userComponente.contractUserListAPI)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const personLogin = useSelector(state => state.fuse.userComponente.person)

  useEffect(() => {
    
    let mejorasRechazadas = improvementProposalsList.filter(item => item.estado == "REJECTED")
    let mejorasAceptadas = improvementProposalsList.filter(item => item.estado == "ACCEPTED")
    let mejorasEnEstudio = improvementProposalsList.filter(item => item.estado == "IN STUDY")
    let mejorasSolicitadas = improvementProposalsList.filter(item => item.estado == "REQUESTED")

    setMejorasRechazadas(mejorasRechazadas.length)
    setMejorasAceptadas(mejorasAceptadas.length)
    setMejorasEnEstudio(mejorasEnEstudio.length)
    setMejorasSolicitadas(mejorasSolicitadas.length)

  }, [improvementProposalsList])

   return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Improvement proposal Module Details
        </Typography>
        </div>
        <div className="flex flex-col">
          <Typography className="font-medium" color="text.secondary">
          Details
          </Typography>
          
          <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
            <div className="col-span-4 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
              <Typography className="text-5xl sm:text-6xl font-semibold leading-none tracking-tight">
                {improvementProposalsList.length}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">Improvement proposal</Typography>
            </div>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {mejorasSolicitadas}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Requested</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {mejorasEnEstudio}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Under study</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {mejorasAceptadas}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Accepted</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {mejorasRechazadas}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Rejected</Typography>
            </Box>
          </div>
        </div>
      {/*</div>*/}
    </Paper>
  );
}

export default memo(DetallesMejoras);
