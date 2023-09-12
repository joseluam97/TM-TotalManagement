import { motion } from 'framer-motion';
import SummaryWidget from './widgets/SummaryWidget.js';
import OverdueWidget from './widgets/OverdueWidget.js';
import IssuesWidget from './widgets/IssuesWidget.js';
import FeaturesWidget from './widgets/FeaturesWidget.js';
import DetallesRisk from './widgets/DetallesRisk.js';
import TaskDistributionWidget from './widgets/TaskDistributionWidget.js';
import ScheduleWidget from './widgets/ScheduleWidget.js';
import DetallesPersonas from './widgets/DetallesPersonas.js';
import DetallesMejoras from './widgets/DetallesMejoras.js';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import {
  getPermisosSesionActualAPIAction,
  getSesionActualAPIAction
} from '../Managment/Users/store/actions'

import {
  getNotificationAPIAction
} from '../../components/Managment/Notifications/store/actions.js'


export default function Home() {

  const dispatch = useDispatch()

  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const listNotificactions = useSelector(state => state.fuse.peopleManagementComponente.listNotificactions)

  const getNotificationAPI = (idPerson) => dispatch(getNotificationAPIAction(idPerson));

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {

    if (personLogin.id != undefined && personLoginPermisos.length > 0) {

      //GET NOTIFICACIONES
      getNotificationAPI(personLogin.id)

    }

  }, [personLogin, personLoginPermisos])

  useEffect(() => {

    //GET USER
    dispatch(getSesionActualAPIAction({
      token: getCookie('token')
    }))
    //FIN GET USER

    //GET USER
    dispatch(getPermisosSesionActualAPIAction({
      token: getCookie('token')
    }))
    //FIN GET USER

  }, [])


  return (
    <>
                                           
      <div className="flex flex-col w-full px-24 sm:px-32">
        <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
          <div className="flex flex-auto items-center min-w-0">
            
            <div className="flex flex-col min-w-0 mx-16">
              <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
                Welcome to TM!!
              </Typography>

              <div className="flex items-center">
                <NotificationsIcon />
                <Typography className="mx-6 leading-6 truncate" color="text.secondary">
                  You have {listNotificactions.length} new notifications.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


