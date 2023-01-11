import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as controller from "./appointment-controller";
import AppState from "../../AppState";

class Appointment extends Component {
  
    constructor() {
      super();

      this.onSearch = this.onSearch.bind(this);

      this.state = {
        date: null
      };
    }
  
    async componentDidMount() {
      
    }

    async onSearch(event) {
      event.preventDefault();
      
      const elements = event.target.elements;

      await controller.search(
        elements['date-field'].value, 
        elements['name-field'].value,
        AppState.getSessionId(),
        AppState.getUrl())
    }
  
    render() {
      return (
        <div>
          <h3>Appointment Selection</h3>
          <form onSubmit={this.onSearch}>
            <table>
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>
                    <DatePicker 
                      name="date-field"
                      selected={this.state.date} onChange={(date) => this.setState({date: date})}  />
                  </td>
                  <td>and/or</td>
                  <td>First or Last Name</td>
                  <td>
                    <input name="name-field" type="text" />
                  </td>
                  <td>
                    <button type="submit">Search</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }
}
  
export default Appointment;
  