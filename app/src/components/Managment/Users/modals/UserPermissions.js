//**********************IMPORTACIONES****************************

import { useEffect, useState, useRef } from 'react'
import * as React from 'react';

//DataGrid importaciones

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import { 
  cambiarVisibilidadModalInsertarPermissionsAPI, 
  getSesionActualAPIAction, 
  getPermisosSesionActualAPIAction 
} from '../store/actions'
import { 
  putUserAPI,
  mostrarUserPermisosAPIAction,
  mostrarUserPermisosByGroupAPIAction
} from '../store/actions'

import {
  cambiarVisibilidadModalInsertarUserAPI
} from '../store/actions'

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

const modulos = [
  'Risk',
  'People',
  'Improvement proposals',
  'Deliverables',
  'Process',
  'Department',
  'Users',
  'Customers',
  'Requirements',
  'Categories'
];

const subModulosRisk = [
  'risk management',
  'rm risk opportunity',
  'rm action'
];

const accionesModulos = [
  'view',
  'add',
  'change',
  'delete'
];

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserPermissions() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [rolUser, setrolUser] = React.useState('');
  const [esSuperuser, setEsSuperuser] = React.useState(false)
  const [checked, setChecked] = React.useState([]);
  const [moduleSelected, setModuleSelected] = React.useState('Risk');

  const visibilidadNewUser = useSelector(state => state.fuse.userComponente.visibilidadInsertPermissions)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const idFilaSeleccionada = useSelector(state => state.fuse.userComponente.filaSeleccionadaGrid)
  const userList = useSelector(state => state.fuse.userComponente.allUsersListAPI)
  const modoDialogUser = useSelector(state => state.fuse.userComponente.modoDialogUser)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const permisosNombres = useSelector(state => state.fuse.userComponente.permisosName)
  const permisosByGroup = useSelector(state => state.fuse.userComponente.permisosByGroup)

  const cambiarVisibilidadModalInsertarPermissions = (valor) => dispatch(cambiarVisibilidadModalInsertarPermissionsAPI(valor))
  const putUser = (id, user) => dispatch(putUserAPI(id, user))
  const cambiarVisibilidadModalInsertarUser = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarUserAPI(valor, modo))

  const classes = useStyles();
  const dispatch = useDispatch()


  useEffect(() => {

    //GET USER
    store.dispatch(getSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER
    //guardarPermisos()

    setActiveStep(2);

  }, []);

  useEffect(() => {
    if(idFilaSeleccionada != ""){
      //RESET VECTOR DE PERMISOS
      setChecked([])
      for (let index = 0; index < checked.length; index++) {
        checked.pop()
      }
      //OBTENER PERMISOS DEL USUARIO TRATADO
      dispatch(mostrarUserPermisosAPIAction(idFilaSeleccionada))
      dispatch(mostrarUserPermisosByGroupAPIAction(idFilaSeleccionada))
    }
    
  }, [idFilaSeleccionada]);

  useEffect(() => {
    if(idFilaSeleccionada != ""){
      //RESET VECTOR DE PERMISOS
      setChecked([])
      for (let index = 0; index < checked.length; index++) {
        checked.pop()
      }
      //OBTENER PERMISOS DEL USUARIO TRATADO
      dispatch(mostrarUserPermisosAPIAction(idFilaSeleccionada))
      dispatch(mostrarUserPermisosByGroupAPIAction(idFilaSeleccionada))
    }
    
  }, [visibilidadNewUser]);

  useEffect(() => {

    //PERMISOS INDIVIDUALES
    if (permisosNombres.length > 0) {
      let valoresChecked = []
      //Recorre los permisos del usuario y selecciona los checkbox
      for (let permisoValor of permisosNombres) {
        valoresChecked.push(permisoValor.name)
      }
      setChecked(valoresChecked.concat(checked))
    }

  }, [permisosNombres])

  useEffect(() => {

    //PERMISOS DE GRUPOS
    if (permisosByGroup.length > 0) {
      let valoresChecked = []
      for (let permisoValor2 of permisosByGroup) {
        if (checked.find((item) => item['name'] == permisoValor2.name) == undefined) {
          valoresChecked.push(permisoValor2.name)
        }
      }
      setChecked(valoresChecked.concat(checked))
    }

  }, [permisosByGroup])

  function funcionAtras() {
    setActiveStep(1);

    //MOSTRAR DIALOGO DE PERMISOS DEPENDE EL PERMISO SELECCIONADO
    cambiarVisibilidadModalInsertarUser(true, '');
    cambiarVisibilidadModalInsertarPermissions(false)
  }

  const handleComplete = () => {
    //const newCompleted = completed;
    //newCompleted[activeStep] = true;
    //setCompleted(newCompleted);
    //handleNext();
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {

    let userSelected = userList.filter(registro => registro.id == idFilaSeleccionada)[0];
    if (userSelected != null) {
      setrolUser(userSelected.rolUser)
      if (userSelected.is_superuser == true) {
        setEsSuperuser(true)
      }
      else {
        setEsSuperuser(false)
      }
    }

  }, [userList, idFilaSeleccionada])

  useEffect(() => {

    if(permisosNombres.length == 0 && permisosByGroup.length == 0){
      setChecked([])
    }

  }, [permisosNombres, permisosByGroup])

  function guardarPermisos() {
    let vectorNuevoPermisos = [];

    for (var i = 0; i < checked.length; i++) {
      if (permisosByGroup.find((item) => item['name'] == checked[i]) == undefined) {
        vectorNuevoPermisos.push(checked[i]);
      }
    }

    putUser(idFilaSeleccionada, {
      user_permissions: vectorNuevoPermisos
    })

    cambiarVisibilidadModalInsertarPermissions()
  }

  const handleToggle = (value) => () => {

    if (value == "aplication" || value == "categorizacion" || value == "mision" || value == "process" || value == "user" || value == "customer" || value == "sub mision" || value == "risk management" || value == "rm risk opportunity" || value == "rm action" || value == "improvement" || value == "deliverable" || value == "user app" || value == "acciones improvement" || value == "data KPI" || value == "service" || value == "division" || value == "kpi" || value == "log accion" || value == "log cambios personas" || value == "direccion departamental") {
      const currentIndexView = checked.indexOf('Can ' + accionesModulos[0] + ' ' + value);
      const currentIndexAdd = checked.indexOf('Can ' + accionesModulos[1] + ' ' + value);
      const currentIndexChange = checked.indexOf('Can ' + accionesModulos[2] + ' ' + value);
      const currentIndexDelete = checked.indexOf('Can ' + accionesModulos[3] + ' ' + value);
      const newChecked = [...checked];

      if (currentIndexView === -1 && permisosByGroup.find((item) => item['name'] == 'Can ' + accionesModulos[0] + ' ' + value) == undefined) {
        newChecked.push('Can ' + accionesModulos[0] + ' ' + value);
      }
      if (currentIndexAdd === -1 && permisosByGroup.find((item) => item['name'] == 'Can ' + accionesModulos[1] + ' ' + value) == undefined) {
        newChecked.push('Can ' + accionesModulos[1] + ' ' + value);
      }
      if (currentIndexChange === -1 && permisosByGroup.find((item) => item['name'] == 'Can ' + accionesModulos[2] + ' ' + value) == undefined) {
        newChecked.push('Can ' + accionesModulos[2] + ' ' + value);
      }
      if (currentIndexDelete === -1 && permisosByGroup.find((item) => item['name'] == 'Can ' + accionesModulos[3] + ' ' + value) == undefined) {
        newChecked.push('Can ' + accionesModulos[3] + ' ' + value);
      }

      setChecked(newChecked);
    }
    else {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    }


  };

  function clickMenu(nomModulo) {
    setModuleSelected(nomModulo)
  }

  function funcionPrueba() {
  }

  return (
    <>
      <Dialog open={visibilidadNewUser} fullWidth maxWidth='xl'>
        <Box sx={{ width: '100%' }} style={{ marginTop: "20px", marginBottom: "20px" }}>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

        </Box>

        <DialogTitle style={{ marginBottom: "5px" }} classes={{ root: classes.customDialogTitle }}>
          User Permissions
        </DialogTitle>


        <DialogContent>
          <div className="radialbar" style={{ display: esSuperuser == true ? 'block' : 'none', marginBottom: "5px" }}>
            <Alert severity="error">
              <AlertTitle>This user is superuser, the modification of permissions made on this screen will not be effective unless the Superuser option is deactivated.</AlertTitle>
              {/*<strong>hola</strong>  <IconButton><InfoOutlined /></IconButton>*/}
            </Alert>
          </div>

          <div className="radialbar" style={{ display: esSuperuser == false ? 'block' : 'none', marginBottom: "5px" }}>
            <Alert severity="info">
              <AlertTitle>This user has the predefined permissions of the {rolUser} role, these roles are the ones that are marked and are not allowed to be modified. In this section you can only add extra permissions to the assigned role.</AlertTitle>
              {/*<strong>hola</strong>  <IconButton><InfoOutlined /></IconButton>*/}
            </Alert>
          </div>

          <Grid container spacing={2} columns={16}>
            <Grid item xs={6}>

              <TreeView
                aria-label="customized"
                defaultExpanded={['1']}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
                <StyledTreeItem nodeId="1" label="Main">
                  <StyledTreeItem nodeId="Modules" label="Modules">
                    <StyledTreeItem nodeId="Risk" label="R&O" onClick={(e) => clickMenu("Risk")}>
                      <StyledTreeItem nodeId="RiskManagement" label="Risk management" onClick={(e) => clickMenu("risk management")} />
                      <StyledTreeItem nodeId="RiskOprtunity" label="Risk Oportunity" onClick={(e) => clickMenu("rm risk opportunity")} />
                      <StyledTreeItem nodeId="RiskAction" label="Risk Action" onClick={(e) => clickMenu("rm action")} />
                    </StyledTreeItem>
                    <StyledTreeItem nodeId="People" label="People" onClick={(e) => clickMenu("People")} />
                    <StyledTreeItem nodeId="Improvement" label="Improvement proposals" onClick={(e) => clickMenu("Improvement")} />
                    <StyledTreeItem nodeId="Deliverables" label="Deliverables" onClick={(e) => clickMenu("Deliverables")} />
                    <StyledTreeItem nodeId="DataKPI" label="Data KPI" onClick={(e) => clickMenu("DataKPI")} />
                  </StyledTreeItem>

                  <StyledTreeItem nodeId="Management" label="Management" onClick={(e) => clickMenu("Management")} >
                    <StyledTreeItem nodeId="Divisions" label="Divisions" onClick={(e) => clickMenu("Divisions")} />
                    <StyledTreeItem nodeId="Contract" label="Contract" onClick={(e) => clickMenu("Contract")} />
                    <StyledTreeItem nodeId="Department" label="Department" onClick={(e) => clickMenu("Department")} />
                    <StyledTreeItem nodeId="Process" label="Process" onClick={(e) => clickMenu("Process")} />
                    <StyledTreeItem nodeId="Categories" label="Categories" onClick={(e) => clickMenu("Categories")} />
                    <StyledTreeItem nodeId="KPI" label="KPI" onClick={(e) => clickMenu("KPI")} />
                    <StyledTreeItem nodeId="Requirements" label="Requirements" onClick={(e) => clickMenu("Requirements")} />
                    <StyledTreeItem nodeId="Log" label="Log" onClick={(e) => clickMenu("Log")} />
                  </StyledTreeItem>

                  <StyledTreeItem nodeId="UserManagement" label="User management" onClick={(e) => clickMenu("UserManagement")} >
                    <StyledTreeItem nodeId="Users" label="Users" onClick={(e) => clickMenu("Users")} />
                    <StyledTreeItem nodeId="Customers" label="Customers" onClick={(e) => clickMenu("Customers")} />
                    <StyledTreeItem nodeId="MovementsPeople" label="Movements of people" onClick={(e) => clickMenu("MovementsPeople")} />
                  </StyledTreeItem>

                </StyledTreeItem>
              </TreeView>

              {/*<MenuList style={{ backgroundColor: "#F1F1F1", border: "solid 1px #F1F1F1", borderRadius: "10px", padding: "20px" }}>

                {modulos.map((nomModulo) => {
                  return (
                    <MenuItem onClick={(e) => clickMenu(nomModulo)} style={{ backgroundColor: "white", border: "solid 1px white", borderRadius: "10px", marginBottom: "10px", fontWeight: "500", fontSize: "18px" }}>{nomModulo}</MenuItem>
                  );
                })}

              </MenuList>*/}

              <div className="radialbar" style={{ margin: "5px" }}>
                <Alert severity="info">
                  <AlertTitle>Clicking on the section titles selects all permissions.</AlertTitle>
                </Alert>
              </div>
            </Grid>
            <Grid item xs={10}>
              {/* MODULES */}

              <div style={{ display: moduleSelected == 'Risk' || moduleSelected == 'risk management' || moduleSelected == 'rm risk opportunity' || moduleSelected == 'rm action' ? 'block' : 'none', margin: "10px" }}>
                <ListItem
                  key={'Can See All Risk'}
                  disablePadding
                  style={{ margin: "0px" }}
                >
                  <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == 'Can See All Risk') == undefined ? handleToggle('Can See All Risk') : ""} dense style={{ margin: "0px" }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf('Can See All Risk') !== -1}
                        tabIndex={-1}
                        disableRipple
                        disabled={permisosByGroup.find((item) => item['name'] == 'Can See All Risk') != undefined ? true : false}
                        inputProps={{ 'aria-labelledby': 'Can See All Risk' }}
                      />
                    </ListItemIcon>
                    <ListItemText id={'Can See All Risk'} primary={'Can See All Risk'} />
                  </ListItemButton>
                </ListItem>

                <Grid container spacing={2} columns={15}>
                  {subModulosRisk.map((subModulosRisk) => {
                    return (
                      <>
                        <Grid item xs={5} style={{ display: subModulosRisk == moduleSelected || moduleSelected == "Risk" ? 'block' : 'none' }}>
                          <h3 onClick={handleToggle(subModulosRisk)} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>{subModulosRisk}</h3>
                          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                            {accionesModulos.map((accionPermit) => {
                              const labelId = `Can ${accionPermit} ${subModulosRisk}`;

                              return (
                                <ListItem
                                  key={labelId}
                                  disablePadding
                                  style={{ margin: "0px" }}
                                >
                                  <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : funcionPrueba()} dense style={{ margin: "0px" }}>
                                    <ListItemIcon>
                                      <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(labelId) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${accionPermit}`} />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </div>

              <div style={{ display: moduleSelected == 'People' ? 'block' : 'none', margin: "10px" }}>
                <Grid container spacing={2} columns={10}>
                  <Grid item xs={5}>
                    <h3 onClick={handleToggle('sub mision')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Team</h3>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                      {accionesModulos.map((accionPermit) => {
                        const labelId = `Can ${accionPermit} sub mision`;

                        return (
                          <ListItem
                            key={labelId}
                            disablePadding
                            style={{ margin: "0px" }}
                          >
                            <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(labelId) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={`${accionPermit}`} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid item xs={5}>
                    <h3 onClick={handleToggle('user app')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>User Requirements</h3>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                      {accionesModulos.map((accionPermit) => {
                        const labelId = `Can ${accionPermit} user app`;

                        return (
                          <ListItem
                            key={labelId}
                            disablePadding
                            style={{ margin: "0px" }}
                          >
                            <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(labelId) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={`${accionPermit}`} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                </Grid>

              </div>

              <div style={{ display: moduleSelected == 'Improvement' ? 'block' : 'none', margin: "10px" }}>
                <Grid container spacing={2} columns={10}>
                  <Grid item xs={5}>
                    <h3 onClick={handleToggle('improvement')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Improvement proposals</h3>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                      {accionesModulos.map((accionPermit) => {
                        const labelId = `Can ${accionPermit} improvement`;

                        return (
                          <ListItem
                            key={labelId}
                            disablePadding
                            style={{ margin: "0px" }}
                          >
                            <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(labelId) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={`${accionPermit}`} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid item xs={5}>
                    <h3 onClick={handleToggle('acciones improvement')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Actions Improvement proposals</h3>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                      {accionesModulos.map((accionPermit) => {
                        const labelId = `Can ${accionPermit} acciones improvement`;

                        return (
                          <ListItem
                            key={labelId}
                            disablePadding
                            style={{ margin: "0px" }}
                          >
                            <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(labelId) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={`${accionPermit}`} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>

                </Grid>

              </div>

              <div style={{ display: moduleSelected == 'Deliverables' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('deliverable')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Deliverables</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} deliverable`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'DataKPI' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('data kpi')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Data KPI</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} data kpi`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              {/* MANAGEMENT */}
              <div style={{ display: moduleSelected == 'Divisions' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('division')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Division</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} division`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'Contract' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('service')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Contract</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} service`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'Department' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('direccion departamental')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Department</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} direccion departamental`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'Process' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('process')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Process</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} process`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'Categories' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('categorizacion')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Categories</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} categorizacion`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'KPI' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('kpi')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>KPI</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} kpi`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'Requirements' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('aplication')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Requirements</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} aplication`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <div style={{ display: moduleSelected == 'Log' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('log accion')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Log</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} log accion`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>


              {/* USER MANAGEMENT */}

              <div style={{ display: moduleSelected == 'Users' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('user')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Users</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} user`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>

              </div>

              <div style={{ display: moduleSelected == 'Customers' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('customer')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Customers</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} customer`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>

              </div>

              <div style={{ display: moduleSelected == 'MovementsPeople' ? 'block' : 'none', margin: "10px" }}>
                <h3 onClick={handleToggle('log cambios personas')} style={{ backgroundColor: "#252F3E", color: "white", border: "solid 1px #252F3E", borderRadius: "10px", padding: "10px" }}>Movements of people</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} > {/*subheader={<ListSubheader>{subModulosRisk}</ListSubheader>}>*/}
                  {accionesModulos.map((accionPermit) => {
                    const labelId = `Can ${accionPermit} log cambios personas`;

                    return (
                      <ListItem
                        key={labelId}
                        disablePadding
                        style={{ margin: "0px" }}
                      >
                        <ListItemButton role={undefined} onClick={permisosByGroup.find((item) => item['name'] == labelId) == undefined ? handleToggle(labelId) : ""} dense style={{ margin: "0px" }}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(labelId) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={permisosByGroup.find((item) => item['name'] == labelId) != undefined ? true : false}

                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${accionPermit}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>

              </div>

            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" style={{ display: modoDialogUser == 'consultar' ? 'block' : 'none' }} onClick={() => { funcionAtras() }}>Back</Button>
          <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarPermissions(false) }}>Close</Button>
          <Button variant="outlined" style={{ display: modoDialogUser != 'consultar' ? 'block' : 'none' }} onClick={() => { guardarPermisos() }}>Save permissions</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

