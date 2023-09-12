import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react'
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  '& .username, & .email': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  '& .avatar': {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}));

import { getSesionActualAPIAction } from '../../../components/Managment/Users/store/actions'

function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);

  const personLogin = useSelector(state => state.fuse.userComponente.person)

  useEffect(() => {

    //GET USER
    store.dispatch(getSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

  }, []);

  return (
    <StyledAppBar
      position="static"
      color="primary"
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
    >
      <Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
        {personLogin['first_name']}
      </Typography>
      <Typography
        className="email text-13 opacity-50 whitespace-nowrap font-medium"
        color="inherit"
      >
        {personLogin['email']}
      </Typography>
      {/*<div className="flex items-center justify-center absolute bottom-0 -mb-44">
        <Avatar
          className="avatar w-72 h-72 p-8 box-content"
          alt="user photo"
          src="assets/images/avatars/profile.jpg"
        />
      </div>*/}
    </StyledAppBar>
  );
}

export default UserNavbarHeader;
