import React, { Component } from "react";
import { GoogleLogin } from '@react-oauth/google';
import * as controller from "./login-controller";

class Login extends Component {
    constructor() {
      super();
      
    }
  
    async componentDidMount() {
      
    }

    async onSuccess(credentialResponse) {
      await controller.login(credentialResponse);
    }

    onError() {
      console.log('Login Failed');
    }
  
    render() {
      return (
        <GoogleLogin
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            onSuccess={this.onSuccess}
            onError={this.onError}
          />
      );
    }
  }
  
  export default Login;
  