import React, { Component } from "react";
import Banner from "../banner/Banner";
import AppState from "../../AppState";

class Logout extends Component {
    constructor() {
      super();
      AppState.markLoggedIn(null, null, null);
      
    }
  
    async componentDidMount() {
     
    }
  
    render() {

      return (
        <div>
          <Banner />
          <div className="standard-view">
            <p>You have been logged out</p>
          </div>
        </div>
      );
    }
}
  
export default Logout;
  