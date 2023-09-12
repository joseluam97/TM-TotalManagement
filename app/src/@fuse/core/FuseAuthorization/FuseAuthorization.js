import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import settingsConfig from 'app/fuse-configs/settingsConfig';
import history from '@history';
import { useEffect } from 'react'
import { getCookie } from 'app/js/generalFunctions'
import store from "app/store/index"

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenAction } from 'components/Login/store/actions'
import { showMessage } from 'app/store/fuse/messageSlice'

import { getSesionActualAPIAction } from '../../../components/Managment/Users/store/actions'



class FuseAuthorization extends Component {

  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: false,
      routes,
    };
    this.defaultLoginRedirectUrl = settingsConfig.loginRedirectUrl || '/';
  }


  componentDidMount() {

    const { dispatch } = this.props

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let is_active = urlParams.get('is_active')

    //Creamos funciones para hacer uso de Actions Redux
    const checkToken = (token) => dispatch(checkTokenAction(token))

    if (is_active == "false") {
      this.redirectRoute();
      dispatch(
        showMessage({
          message: "Inactive user of the application",
          variant: "error",
        })
      )
    }
    else {
      
      if (getCookie('token')) {

        checkToken(getCookie('token'))

        setTimeout(function () {
          if (this.props.login === false) {
            this.redirectRoute();

          }
        }.bind(this), 2000)

      } else {

        this.redirectRoute();
      }

    }



  }

  shouldComponentUpdate(nextProps, nextState) {

    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {

    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matchedRoutes = matchRoutes(state.routes, pathname);

    const matched = matchedRoutes ? matchedRoutes[0] : false;
    return {
      accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : false,
    };
  }

  redirectRoute() {
    const { location, userRole } = this.props;
    const { pathname } = location;
    const loginRedirectUrl = settingsConfig.loginRedirectUrl
      ? settingsConfig.loginRedirectUrl
      : this.defaultLoginRedirectUrl;
    /*
        User is guest
        Redirect to Login Page
        */
    if (!userRole || userRole.length === 0) {
      setTimeout(() => history.push('/login'), 0);
      settingsConfig.loginRedirectUrl = pathname;
    } else {
      /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or loginRedirectUrl
        */
      setTimeout(() => history.push(loginRedirectUrl), 0);
      settingsConfig.loginRedirectUrl = this.defaultLoginRedirectUrl;
    }
  }

  render() {

    console.info('Authorization rendered', this.state.accessGranted);
    return this.state.accessGranted ? <>{this.props.children}</> : null;
  }
}

function mapStateToProps({ auth, fuse }) {

  return {
    userRole: auth.user.role,
    login: fuse.loginComponente.login
  };

}



FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));