import React, { Component } from "react";
import AppState from "../../AppState";
import * as controller from "./print-controller";

class Print extends Component {
    constructor() {
      super();
      
      this.state = {
        appointment: null
      };
    }
  
    async componentDidMount() {
      const result = await controller.getDetails(
        AppState.getCurrentAppointmentId(),
        AppState.getSessionId(),
        AppState.getUrl()
      );
      console.log(result);

      this.setState({
        appointment: result
      });
    }
  
    render() {
      if (this.state.appointment == null) {
        return (<p>Loading...</p>);
      }

      return (
        <p>Print</p>
      );
    }
}
  
export default Print;
  