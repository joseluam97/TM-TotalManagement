import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { React, useEffect } from 'react'

function FeaturesWidget() {

  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
  const [userActivos, setUserActivos] = useState(0)

  useEffect(() => {
    let activos = usersListAPI.filter(elemento => elemento.is_active == true)
    setUserActivos(activos.length)

  }, [usersListAPI])

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-8 pt-12">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          Number of users
        </Typography>
        <IconButton aria-label="more" size="large">
          <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
        </IconButton>
      </div>
      <div className="text-center mt-8">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500">
          {usersListAPI.length}
        </Typography>
        <Typography className="text-lg font-medium text-green-600">users</Typography>
      </div>
      <Typography
        className="flex items-baseline justify-center w-full mt-20 mb-24"
        color="text.secondary"
      >
        <span className="truncate">Active</span>:
        <b className="px-8">{userActivos}</b>
      </Typography>
    </Paper>
  );
}

export default memo(FeaturesWidget);
