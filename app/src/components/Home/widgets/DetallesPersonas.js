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

function DetallesPersonas() {
  const theme = useTheme();

  const [numeroTemporal, setNumeroTemporal] = useState('')
  const [misApp, setMisApp] = useState(0)

  const contractUserList = useSelector(state => state.fuse.userComponente.contractUserListAPI)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const personLogin = useSelector(state => state.fuse.userComponente.person)

  useEffect(() => {

    let comoTemporal = contractUserList.filter(item => item.rol_employee == "temporary")

    setNumeroTemporal(comoTemporal.length)

  }, [contractUserList])

  useEffect(() => {

    if (personLogin != undefined && listUserApp.length != 0) {
      let misAplicaciones = listUserApp.filter(item => item.user_id == personLogin.id)

      if (misAplicaciones != undefined) {
        setMisApp(misAplicaciones.length)
      }
      else {
        setMisApp(0)
      }


    }

  }, [listUserApp, personLogin])


  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          People Module Details
        </Typography>
      </div>
      <div className="flex flex-col">
        <Typography className="font-medium" color="text.secondary">
          Details
        </Typography>

        <div className="flex-auto grid grid-cols-6 gap-16 mt-24">
          <div className="col-span-3 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
            <Typography className="text-5xl sm:text-6xl font-semibold leading-none tracking-tight">
              {contractUserList.length}
            </Typography>
            <Typography className="mt-4 text-sm sm:text-lg font-medium">Teams</Typography>
          </div>
          <div className="col-span-3 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-green-50 text-green-800">
            <Typography className="text-5xl sm:text-6xl font-semibold leading-none tracking-tight">
              {numeroTemporal}
            </Typography>
            <Typography className="mt-4 text-sm sm:text-lg font-medium">Temporary teams</Typography>
          </div>
          <Box
            sx={{
              backgroundColor: (_theme) =>
                _theme.palette.mode === 'light'
                  ? lighten(theme.palette.background.default, 0.4)
                  : lighten(theme.palette.background.default, 0.02),
            }}
            className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
          >
            <Typography className="text-5xl font-semibold leading-none tracking-tight">
              {listUserApp.length}
            </Typography>
            <Typography className="mt-4 text-sm font-medium text-center">Team app</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: (_theme) =>
                _theme.palette.mode === 'light'
                  ? lighten(theme.palette.background.default, 0.4)
                  : lighten(theme.palette.background.default, 0.02),
            }}
            className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
          >
            <Typography className="text-5xl font-semibold leading-none tracking-tight">
              {misApp}
            </Typography>
            <Typography className="mt-4 text-sm font-medium text-center">My Apps</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: (_theme) =>
                _theme.palette.mode === 'light'
                  ? lighten(theme.palette.background.default, 0.4)
                  : lighten(theme.palette.background.default, 0.02),
            }}
            className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
          >
            <Typography className="text-5xl font-semibold leading-none tracking-tight">
              0
            </Typography>
            <Typography className="mt-4 text-sm font-medium text-center">Request</Typography>
          </Box>
          {/*<Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                12
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Average Score</Typography>
            </Box>*/}
        </div>
      </div>
      {/*</div>*/}
    </Paper>
  );
}

export default memo(DetallesPersonas);
