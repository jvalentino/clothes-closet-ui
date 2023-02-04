import React, { Component } from "react";

import Banner from "../banner/Banner";
import ProgressView from "../progressView/ProgressView";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import * as controller from "./waitlist-controller";
import AppState from "../../AppState";
import * as ViewAssignDialog from "../rescheduleModal/RescheduleModal";

class Waitlist extends Component {
  constructor() {
    super();

    this.onSearch = this.onSearch.bind(this);
    this.appointmentSelected = this.appointmentSelected.bind(this);
    this.deletedSelected = this.deletedSelected.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);

    this.state = {
      searchResults: null,
      date: null,
      columns: null
    };
  }

  async componentDidMount() {
    const searchResults = await controller.search(
      null,
      null,
      AppState.getSessionId(),
      AppState.getUrl()
    );

    this.setState({
      searchResults: searchResults,
      columns: this.generateColumns()
    });
  }

  async onSearch(event) {
    event.preventDefault();

    const elements = event.target.elements;

    const searchResults = await controller.search(
      null,
      elements["name-field"].value,
      AppState.getSessionId(),
      AppState.getUrl()
    );

    this.setState({
      searchResults: searchResults,
      columns: this.generateColumns()
    });
  }

  async appointmentSelected(event) {
    event.preventDefault();

    const appointmentId = event.target.id;
    const appointment = await controller.getDetails(
      appointmentId,
      AppState.getSessionId(),
      AppState.getUrl()
    );
    ViewAssignDialog.display(appointment, "./waitlist");
  }

  async deletedSelected(event) {
    event.preventDefault();

    const appointmentId = event.target.id;

    confirmAlert({
      title: "Are you sure?",
      message: "Are you sure you want to delete this wait listed appointment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmDelete(appointmentId)
        },
        {
          label: "No",
          onClick: () => console.log("closed")
        }
      ]
    });
  }

  async confirmDelete(appointmentId) {
    console.log(`Deleting appointment ${appointmentId}`);
    await controller.deleteAppointment(
      appointmentId,
      AppState.getSessionId(),
      AppState.getUrl()
    );
    await this.componentDidMount();
  }

  generateColumns() {
    const columns = [
      {
        cell: (row) => (
          <button
            onClick={this.appointmentSelected}
            id={row.appointmentId}
            className="default"
          >
            View/Assign
          </button>
        )
      },
      {
        cell: (row) => (
          <button
            onClick={this.deletedSelected}
            id={row.appointmentId}
            className="default"
          >
            Delete
          </button>
        )
      },
      {
        name: "Created Date",
        selector: (row) =>
          new Date(row.createdDateTimeIso).toLocaleDateString(),
        sortable: true
      },
      {
        name: "Created Time",
        selector: (row) =>
          new Date(row.createdDateTimeIso).toLocaleTimeString(),
        sortable: true
      },
      {
        name: "Guardian",
        selector: (row) => row.guardian.firstName + " " + row.guardian.lastName,
        sortable: true
      },
      {
        name: "Locale",
        selector: (row) => row.locale,
        sortable: true
      }
    ];
    return columns;
  }

  renderSearchResults() {
    if (this.state.searchResults == null) {
      return <div />;
    }

    return (
      <div>
        <h3>{this.state.searchResults.appointments.length} Search Results</h3>

        <DataTable
          columns={this.state.columns}
          data={this.state.searchResults.appointments}
          button={true}
          filterable
        />
      </div>
    );
  }

  renderAppointmentSelection() {
    return (
      <table>
        <tbody>
          <tr>
            <td>First or Last Name</td>
            <td>
              <input name="name-field" type="text" />
            </td>
            <td>
              <button id="search-button" type="submit" className="default">
                Search
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    if (this.state.searchResults == null) {
      return (
        <div>
          <Banner />
          <ProgressView />
        </div>
      );
    }

    return (
      <div>
        <Banner />
        <div className="standard-view">
          <h3>Wait List Selection</h3>
          <form onSubmit={this.onSearch}>
            {this.renderAppointmentSelection()}
          </form>
          <br />
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}

export default Waitlist;
