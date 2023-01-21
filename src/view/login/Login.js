import React, { Component } from "react";
import { GoogleLogin } from "@react-oauth/google";
import * as controller from "./login-controller";
import { Navigate } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      success: false
    };
  }

  async componentDidMount() {}

  async onSuccess(credentialResponse) {
    const success = await controller.login(credentialResponse);

    if (success) {
      this.setState({
        success: success
      });
    } else {
      // FIXME: Display error
    }
  }

  onError() {
    console.log("Login Failed");
  }

  render() {
    if (this.state.success == true) {
      return <Navigate to="/appointment" push={true} />;
    }

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
