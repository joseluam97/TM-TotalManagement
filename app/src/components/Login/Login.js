//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import { styled, darken } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useNavigate } from "react-router-dom";
import store from "app/store/index"


//Redux importaciones
import { useSelector } from 'react-redux'
import { obtenerTokenAction } from './store/actions'
import { isThisQuarter } from 'date-fns';


//**********************END_IMPORTACIONES ***********************/



const Root = styled('div')(({ theme }) => ({
  '& .Login3-leftSection': {},

  '& .Login3-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));


/**
 * Form Validation Schema
 */


const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};



function Login() {

  let navigate = useNavigate();

  //estados locales del formulario

  const [email, setUser] = useState('')
  const [password, setPassword] = useState('')

  function usoObtenerToken() {

    store.dispatch(obtenerTokenAction({

      username: email,
      password: password,

    }))


  }


  //Detector de cambios Redux

  function detectaCambiosRedux() {
    suscribe_unsub()
    let login = store.getState().fuse.loginComponente.login

    if (login) {

      navigate('/')


    }
  }

  const suscribe_unsub = store.subscribe(detectaCambiosRedux)



  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Login3-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
              <img className="logo-icon w-48" src="assets/images/logos/firebase.svg" alt="logo" />
                <div className="border-l-1 mr-4 w-1 h-40" />
                <div>
                  <Typography className="text-24 font-semibold logo-text" color="inherit">
                    TM
                  </Typography>
                  <Typography
                    className="text-16 tracking-widest -mt-8 font-700"
                    color="textSecondary"
                  >
                    Technology
                  </Typography>
                </div>
              </div>
            </motion.div>

            <div className="my-24 flex items-center justify-center">
              <Divider className="w-32" />
              <span className="mx-8 font-semibold">LOGIN</span>
              <Divider className="w-32" />
            </div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                    value={email}
                    onChange={e => setUser(e.target.value)}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                )}
              />

              {/*<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                    <Controller
                      name="remember"
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <FormControlLabel label="Remember Me" control={<Checkbox {...field} />} />
                        </FormControl>
                      )}
                    />

                    <Link className="font-normal" to="/pages/auth/forgot-password-2">
                      Forgot Password?
                    </Link>
                  </div>*/}

              <Button
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="LOG IN"
                type="submit"
                onClick={() => usoObtenerToken()}
              >
                Login
              </Button>
            </form>


          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32">
            {/*<span className="font-normal">Don't have an account?</span>
                <Link className="font-normal" to="/pages/auth/register-3">
                  Create an account
                </Link>*/}
          </div>
        </Card>

        <div className="Login3-rightSection flex hidden md:flex flex-1 items-center justify-center p-64">
          <div className="max-w-320">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                color="inherit"
                className="text-32 sm:text-44 font-semibold leading-tight"
              >
                Welcome <br />
                to TM <br /> Technology!
              </Typography>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default Login;