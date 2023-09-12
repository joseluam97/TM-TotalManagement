//**********************IMPORTACIONES****************************

import { useEffect, useState, useRef } from 'react'
import * as React from 'react';

//DataGrid importaciones

import * as global from 'global.js';
import { showMessage } from 'app/store/fuse/messageSlice'
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import { 
  cambiarVisibilidadModalInsertarUserAPI, 
  cambiarVisibilidadModalInsertarPermissionsAPI 
} from '../store/actions'

import {
  insertarNewUserAPI,
  putUserAPI,
  mostrarUserPermisosAPIAction,
  mostrarUserPermisosByGroupAPIAction,
} from '../store/actions'

import {
  getSubMisionAPIAction,
  postPersonalAsignadoContratoAPIAction,
  getAllJobAPIAction
} from '../../../Gestion/SubMision/store/actions'

import {
  mostrarMisionAPIAction,
  putMisionAPIAction
} from '../../../Gestion/Mision/store/actions'

import {
  mostrarMisionPaquetesAPIAction,
  updateMisionPaqueteActionAPIAction
} from '../../../Gestion/PaqueteTrabajo/store/actions'

import {
  mostrarAllDireccionDepartamentalAPIAction,
  mostrarAllDepartamentosAPIAction,
  putDireccionDepartamentalAPIAction,
  putDepartamentoAPIAction
} from '../../../Gestion/Departamentos/store/actions'

import {
  insertarLogPersonaAPIAction
} from '../../LogCambiosPersonas/store/actions'

//**********************END_IMPORTACIONES ***********************/

const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});

const steps = [
  'User data',
  'User permissions',
];

export default function NewUser() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [botonControlSave, setBotonControl] = React.useState(true);


  const [numIdentification, setNumIdentification] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [organization, setOrganization] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [rolUser, setRolUser] = React.useState('');

  const [emailYaRegistrado, setEmailYaRegistrado] = useState(false);

  const visibilidadNewUser = useSelector(state => state.fuse.userComponente.visibilidadNewUser)
  const modoDialogUser = useSelector(state => state.fuse.userComponente.modoDialogUser)
  const idFilaSeleccionada = useSelector(state => state.fuse.userComponente.filaSeleccionadaGrid)
  const userList = useSelector(state => state.fuse.userComponente.allUsersListAPI)

  const cambiarVisibilidadModalInsertarUser = (valor, modoDialogUser) => dispatch(cambiarVisibilidadModalInsertarUserAPI(valor, modoDialogUser))
  const cambiarVisibilidadModalInsertarPermissions = (valor) => dispatch(cambiarVisibilidadModalInsertarPermissionsAPI(valor))
  const insertarNewUser = (user) => dispatch(insertarNewUserAPI(user))
  const putUser = (id, user) => dispatch(putUserAPI(id, user))

  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {

  }, []);

  useEffect(() => {

    if (visibilidadNewUser == false) {
      //resetValues()
    }

  }, [visibilidadNewUser]);

  function resetValues() {
    setNumIdentification("")
    setFirstName("")
    setLastName("")
    setPhone("")
    setOrganization("")
    setEmail("")
    setRolUser("")
  }

  useEffect(() => {
    if (modoDialogUser == "nuevo" && email != "") {
      let emailExiste = userList.filter(elemento => elemento.email == email)
      if (emailExiste.length != 0) {
        setEmailYaRegistrado(true)

        dispatch(
          showMessage({
            message: "The email address you want to register is already registered.",
            variant: "error"
          })
        )
      }
      else {
        setEmailYaRegistrado(false)
      }
    }

  }, [email]);

  useEffect(() => {
    setActiveStep(0);
    setNumIdentification('')

    if (modoDialogUser == 'editar') {
      let userSelected = userList.filter(registro => registro.id == idFilaSeleccionada)[0]
      if (userSelected != null) {
        setNumIdentification(userSelected.IDidentification)
        setFirstName(userSelected.first_name)
        setLastName(userSelected.last_name)
        setPhone(userSelected.phone)
        setOrganization(userSelected.organization)
        setEmail(userSelected.email)
        setRolUser(userSelected.rolUser)

      }
    }
    if (modoDialogUser == 'nuevo') {
      setNumIdentification('')
      setFirstName('')
      setLastName('')
      setPhone('')
      setOrganization('')
      setEmail('')
      setRolUser('')
    }
    if (modoDialogUser == 'consultar') {
      let userSelected = userList.filter(registro => registro.id == idFilaSeleccionada)[0];
      if (userSelected != null) {
        setNumIdentification(userSelected.IDidentification)
        setFirstName(userSelected.first_name)
        setLastName(userSelected.last_name)
        setPhone(userSelected.phone)
        setOrganization(userSelected.organization)
        setEmail(userSelected.email)
        setRolUser(userSelected.rolUser)
      }
    }
  }, [modoDialogUser]);

  const handleStep = (step) => () => {
    if (modoDialogUser != 'nuevo') {
      setActiveStep(step);
    }
  };

  const funcionNext = () => {
    setActiveStep(activeStep + 1);

    //MOSTRAR DIALOGO DE PERMISOS DEPENDE EL PERMISO SELECCIONADO
    cambiarVisibilidadModalInsertarUser(false, '');
    cambiarVisibilidadModalInsertarPermissions(true)
  };


  useEffect(() => {
    if (emailYaRegistrado == false && firstName.trim() != '' && lastName.trim() != '' && phone.trim() != '' && organization.trim() != '' && email.trim() != '' && rolUser != '') {
      setBotonControl(false)

    } else {
      setBotonControl(true)

    }
  })

  const createUser = () => {
    //MOSTRAR DIALOGO DE PERMISOS DEPENDE EL PERMISO SELECCIONADO
    cambiarVisibilidadModalInsertarUser(false, '');
    cambiarVisibilidadModalInsertarPermissions(true)

    if (modoDialogUser == 'nuevo') {
      if (activeStep + 1 == 1) {
        //SET PERMISOS
        let vectorPermisos = []
        let today = new Date();
        insertarNewUser({
          IDidentification: numIdentification,
          first_name: firstName,
          last_name: lastName,
          organization: organization,
          phone: phone,
          email: email,
          is_superuser: false,
          is_staff: false,
          is_active: true,
          date_joined: today,
          user_permissions: vectorPermisos,
          rolUser: rolUser
        })
      }
    }

    if (modoDialogUser == 'editar') {
      //ACTUALIZAR USUARIO
      putUser(idFilaSeleccionada, {
        IDidentification: numIdentification,
        first_name: firstName,
        last_name: lastName,
        organization: organization,
        phone: phone,
        email: email,
        rolUser: rolUser
      })


    }
  };

  return (
    <>
      <Dialog open={visibilidadNewUser} fullWidth maxWidth='md'>
        <Box sx={{ width: '100%' }} style={{ marginTop: "20px", marginBottom: "20px" }}>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

        </Box>

        <DialogTitle classes={{ root: classes.customDialogTitle }}>
          {modoDialogUser == 'editar' ? "Edit User" : modoDialogUser == 'nuevo' ? "New User" : "Details User"}
        </DialogTitle>


        <DialogContent>

          <Grid container spacing={2} columns={16} style={{ marginTop: '1px' }}>
            <Grid item xs={8}>
              <TextField
                label="Identification"
                id="identification"
                value={numIdentification}
                size="small"
                fullWidth
                onChange={e => setNumIdentification(e.target.value)}
                disabled={modoDialogUser == 'consultar'}
              />
            </Grid>

            <Grid item xs={8}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="rol"
                  label="Rol"
                  disabled={modoDialogUser == 'consultar'}
                  onChange={e => { setRolUser(e.target.value); }}
                  value={rolUser}>


                  <MenuItem value={global.rolN1}>N1 - {global.rolN1}</MenuItem>
                  <MenuItem value={global.rolN2}>N2 - {global.rolN2}</MenuItem>
                  <MenuItem value={global.rolN4}>N4 - {global.rolN4}</MenuItem>
                  <MenuItem value={global.rolN5}>N5 - {global.rolN5}</MenuItem>
                  <MenuItem value={global.rolN6}>N6 - {global.rolN6}</MenuItem>
                  <MenuItem value={global.rolN7}>N7 - {global.rolN7}</MenuItem>
                  <MenuItem value={global.rolN8}>N8 - {global.rolN8}</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={16}>
              <Divider />
            </Grid>

            <Grid item xs={8}>
              <TextField
                label="First Name"
                id="firstName"
                value={firstName}
                size="small"
                fullWidth
                onChange={e => setFirstName(e.target.value)}
                disabled={modoDialogUser == 'consultar'}
              />

            </Grid>

            <Grid item xs={8}>
              <TextField
                label="Last Name"
                id="lastName"
                value={lastName}
                size="small"
                fullWidth
                onChange={e => setLastName(e.target.value)}
                disabled={modoDialogUser == 'consultar'}
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                label="Phone"
                id="phone"
                value={phone}
                size="small"
                fullWidth
                onChange={e => setPhone(e.target.value)}
                disabled={modoDialogUser == 'consultar'}
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                label="Organization"
                id="organization"
                value={organization}
                size="small"
                fullWidth
                onChange={e => setOrganization(e.target.value)}
                disabled={modoDialogUser == 'consultar'}
              />

            </Grid>

            <Grid item xs={8}>
              <TextField
                label="Email"
                id="email"
                value={email}
                size="small"
                fullWidth
                onChange={e => setEmail(e.target.value)}
                disabled={modoDialogUser == 'consultar'}
              />

            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarUser(false, '') }}>Close</Button>
          <Button variant="outlined" disabled={botonControlSave} style={{ display: modoDialogUser == 'consultar' ? 'none' : 'block' }} onClick={() => { createUser() }}> {modoDialogUser == 'editar' ? 'Edit user and assign permissions' : 'Save user and assign permissions'} &nbsp; <ArrowCircleRightIcon /></Button>
          <Button variant="outlined" style={{ display: modoDialogUser != 'nuevo' ? 'block' : 'none' }} onClick={() => { funcionNext() }}> Next &nbsp; <ArrowCircleRightIcon /></Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

