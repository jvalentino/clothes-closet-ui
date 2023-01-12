import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as controller from "./appointment-controller";
import AppState from "../../AppState";

import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Date',
    selector: row => new Date(row.datetimeIso).toLocaleDateString(),
    sortable: true,
  },
  {
      name: 'Time',
      selector: row => new Date(row.datetimeIso).toLocaleTimeString(),
      sortable: true,
  },
  {
    name: 'Happened?',
    selector: row => row.happened == true ? "Yes": "No",
    sortable: true,
  },
  {
    name: 'Guardian',
    selector: row => row.guardian.firstName + " " + row.guardian.lastName,
    sortable: true,
  },
];

class Appointment extends Component {
  
    constructor() {
      super();

      this.onSearch = this.onSearch.bind(this);

      this.state = {
        date: null,
        searchResults: null
      };
    }
  
    async componentDidMount() {
      
    }

    async onSearch(event) {
      event.preventDefault();
      
      const elements = event.target.elements;

      const searchResults = await controller.search(
        elements['date-field'].value, 
        elements['name-field'].value,
        AppState.getSessionId(),
        AppState.getUrl());

      this.setState({
        searchResults: searchResults
      });
    }

    renderSearchResults() {
      if (this.state.searchResults == null) {
        return (<div />);
      }

      return (
        <div>
          <h3>Search Results</h3>
          <DataTable
            columns={columns}
            data={this.state.searchResults.appointments}
          />
        </div>
        
      );
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
          {this.renderSearchResults()}
        </div>
      );
    }
}
  
export default Appointment;
  