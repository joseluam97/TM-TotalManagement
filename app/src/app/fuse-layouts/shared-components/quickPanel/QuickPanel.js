

import React from 'react';
import { Fragment } from 'react';

import { useEffect, useState, useRef } from 'react'
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { toggleQuickPanel } from './store/stateSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { getCookie } from 'app/js/generalFunctions'
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {
  getNotificationAPIAction,
  putNotificationAPIAction
} from '../../../../components/Managment/Notifications/store/actions'

import {
  getPermisosSesionActualAPIAction,
  getSesionActualAPIAction,
  mostrarUserAPIAction
} from '../../../../components/Managment/Users/store/actions'

import {
  descargarAdjuntoNotificacionAPIAction
} from '../../../../components/Managment/Notifications/store/actions'

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: theme.palette.text.primary
  },
}));

function QuickPanel(props) {
  const dispatch = useDispatch();
  const state = useSelector(({ quickPanel }) => quickPanel.state);
  const listNotificactions = useSelector(state => state.fuse.peopleManagementComponente.listNotificactions)
  const personLogin = useSelector(state => state.fuse.userComponente.person)

  const archivoDescargado = useSelector(state => state.fuse.notificacionesComponente.archivoDescargado)

  const getNotificationAPI = (idPerson) => dispatch(getNotificationAPIAction(idPerson));
  const descargarAdjuntoNotificacionAPI = (idNotificacion) => dispatch(descargarAdjuntoNotificacionAPIAction(idNotificacion));

  useEffect(() => {

    //GET USER
    dispatch(getSesionActualAPIAction({
      token: getCookie('token')
    }))
    //FIN GET USER

  }, [])

  useEffect(() => {

    getNotificationAPI(personLogin.id);

  }, [personLogin])

  function deleteNotification(notificacion) {
    dispatch(putNotificationAPIAction(notificacion.id, {
      origen_notification_id: notificacion.origen_notification_id,
      destino_notification_id: notificacion.destino_notification_id,
      fecha: notificacion.fecha,
      typeNotification: notificacion.typeNotification,
      active: false
    }, personLogin.id))

  }

  function descargaArchivo(idNotificacion) {
    descargarAdjuntoNotificacionAPI(idNotificacion)
  }

  useEffect(() => {

    //DESCARGA DEL ARCHIVO RECIBIDO

    if (archivoDescargado != "") {
      let fileName = "nuevo.xlsx"
      let excelData = archivoDescargado
      const byteCharacters = atob(excelData);
      //const byteCharacters = decodeURIComponent(escape(atob(excelData)));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

  }, [archivoDescargado])

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => { }}
      onClose={(ev) => dispatch(toggleQuickPanel())}
      disableSwipeToOpen
    >
      <FuseScrollbars>
        <div style={{ color: '#ffffff', width: '100%', textAlign: 'center', padding: '10px' }}>
          <h3>Notifications</h3>
          <Divider style={{ width: '100%', backgroundColor: '#ffffff' }} />
        </div>

        {listNotificactions.map((notification,index) => {
          return (
            <Fragment key={index}>
              <Card  sx={{ display: 'flex', backgroundColor: '#ffffff', margin: '3px' }}>
                {/*122C4D */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: "#000000" }} aria-label="recipe">
                        {notification.origen_notification_first_name.substr(0, 1) + notification.origen_notification_last_name.substr(0, 1)}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings" onClick={() => deleteNotification(notification)}>
                        <CloseIcon />
                      </IconButton>
                    }
                    title={notification.origen_notification_first_name + " " + notification.origen_notification_last_name}
                    subheader={notification.fecha}
                  />

                  <CardContent style={{ marginTop: "-20px" }}>
                    <div>
                      {notification.observations}
                    </div>

                    <div style={notification.archivo == null ? { display: "none" } : { display: "block", marginTop: "10px" }}>
                      <Button variant="outlined" onClick={() => { descargaArchivo(notification.id) }}>Download</Button>
                    </div>
                    
                    
                  </CardContent>
                </Box>
              </Card>
            </Fragment>
          );
        })}
      </FuseScrollbars>
    </StyledSwipeableDrawer>
  );
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
