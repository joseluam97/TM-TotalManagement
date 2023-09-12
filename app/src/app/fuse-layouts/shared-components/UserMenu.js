import { navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';
import { deleteCookies } from 'app/js/generalFunctions'
import { useEffect, useState, useRef } from 'react'
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/core/styles";
import { getSesionActualAPIAction } from '../../../components/Managment/Users/store/actions'
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { showMessage } from 'app/store/fuse/messageSlice'

import {
  putPasswordUserManualAPIAction
} from '../../../components/Managment/Users/store/actions'

import {
  setValueUserSeleccionadoAPIAction,
  cambiarVisibilidadModalDetallesUserAPI
} from '../../../components/Managment/Users/modals/DetailsUser/store/actions'

import {
  mostrarUserAPIAction
} from '../../../components/Managment/Users/store/actions'

import DetailsUser from '../../../components/Managment/Users/modals/DetailsUser/DetailsUser.js'

const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});


function UserMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();

  const personLogin = useSelector(state => state.fuse.userComponente.person)

  const putPasswordUserManualAPI = (id, jsonPass) => dispatch(putPasswordUserManualAPIAction(id, jsonPass))
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())

  //DIALOGO DETALLES USER
  const setValueUserSeleccionadoAPI = (user) => dispatch(setValueUserSeleccionadoAPIAction(user))
  const cambiarVisibilidadModalDetallesUser = (value) => dispatch(cambiarVisibilidadModalDetallesUserAPI(value))

  const [userMenu, setUserMenu] = useState(null);
  const [visibilidadDialogoResetPassword, setVisibilidadDialogoResetPassword] = useState(false)
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  useEffect(() => {

    mostrarUserAPI()

    //GET USER
    store.dispatch(getSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

  }, []);

  useEffect(() => {

    if(visibilidadDialogoResetPassword == false){
      setPassword1("")
      setPassword2("")
    }

  }, [visibilidadDialogoResetPassword]);

  function resetPasswordManual() {
    if (password1 == password2) {
      putPasswordUserManualAPI(personLogin.id, { "password": password1 })
      setVisibilidadDialogoResetPassword(false)
    }
    else {
      dispatch(
        showMessage({
          message: "Passwords do not match",
          variant: "error"
        })
      )
    }

  }

  const userMenuClose = () => {
    setUserMenu(null);
  };

  async function eliminarCookies(){
    await deleteCookies();

    navigate('/login');
  }

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {/*{user.data.displayName}*/}
            {personLogin['first_name']}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="textSecondary">
            {personLogin['rolUser']}
          </Typography>
        </div>

        <Avatar
          className="md:mx-4"
          alt="user photo"
          src="assets/images/avatars/profile.jpg"
        />
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {user === false ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            {/*<MenuItem component={Link} to="/home" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem>
            <MenuItem component={Link} to="/home" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem>*/}
            <MenuItem role="button"
              onClick={() => {
                setValueUserSeleccionadoAPI(personLogin.id)
                cambiarVisibilidadModalDetallesUser(true)
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My information" />
            </MenuItem>

            <MenuItem role="button"
              onClick={() => {
                setVisibilidadDialogoResetPassword(true)
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Reset password" />
            </MenuItem>

            <MenuItem component={Link} to="/login" role="button"
              onClick={() => {
                eliminarCookies()
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>

      <Dialog open={visibilidadDialogoResetPassword} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Reset password
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} columns={8} style={{ marginTop: '1px' }}>
            <Grid item xs={8}>
              <TextField
                label="New password"
                id="firstName"
                type="password"
                value={password1}
                size="small"
                fullWidth
                onChange={e => setPassword1(e.target.value)}
              />

            </Grid>

            <Grid item xs={8}>
              <TextField
                label="Repeat password"
                id="lastName"
                type="password"
                value={password2}
                size="small"
                fullWidth
                onChange={e => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoResetPassword(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { resetPasswordManual()}}> Confirm</Button>

        </DialogActions>

        

      </Dialog>
      <DetailsUser />
    </>
  );
}

export default UserMenu;
