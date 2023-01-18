import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as controller from "./appointment-controller";
import AppState from "../../AppState";

import DataTable from 'react-data-table-component';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Banner from "../banner/Banner";

class Appointment extends Component {
  
  columns = [
    {
      cell:(row)=><button onClick={this.appointmentSelected} id={row.appointmentId}>Select</button>,
    },
    {
      cell:(row)=><button onClick={this.printSelected} id={row.appointmentId}>Print</button>,
    },
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

    constructor() {
      super();

      this.onSearch = this.onSearch.bind(this);
      this.appointmentSelected = this.appointmentSelected.bind(this);
      this.onAddPerson = this.onAddPerson.bind(this);
      this.updateVisit = this.updateVisit.bind(this);
      this.cancelAppointment = this.cancelAppointment.bind(this);
      this.printSelected = this.printSelected.bind(this);

      this.state = {
        date: null,
        searchResults: null,
        appointment: null
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
        searchResults: searchResults,
        appointment: null
      });
    }

    async appointmentSelected(event) {
      const appointmentId = event.target.id;
      const appointment = await controller.getDetails(
        appointmentId, AppState.getSessionId(), AppState.getUrl());
      
      this.setState({
        searchResults: null,
        appointment: appointment
      });
    }

    printSelected(event) {
      const appointmentId = event.target.id;
      AppState.setCurrentAppointmentId(appointmentId);
      window.open("/print");
    }

    renderSearchResults() {
      if (this.state.searchResults == null) {
        return (<div />);
      }

      return (
        <div>
          <h3>Search Results</h3>
          <DataTable
            columns={this.columns}
            data={this.state.searchResults.appointments}
            button={true}
          />
        </div>
        
      );
    }

    async onAddPerson(event) {
      event.preventDefault();
      const visit = await controller.addPerson(
        this.state.appointment.appointmentId,
        event.target.elements['new-relation'].value,
        AppState.getSessionId(), 
        AppState.getUrl()
      );
      this.state.appointment.visits.push(visit);

      event.target.elements['new-relation'].value = null;

      this.setState({
        appointment: this.state.appointment
      });
    }

    async updateVisit(event) {
      event.preventDefault();
      const elements = event.target.elements;

      const visits = this.state.appointment.visits;
      visits.forEach(visit => {
        visit.socks = +elements[`socks-visit-${visit.visitId}`].value;
        visit.underwear = +elements[`underwear-visit-${visit.visitId}`].value;
        visit.shoes = +elements[`shoes-visit-${visit.visitId}`].value;
        visit.coats = +elements[`coats-visit-${visit.visitId}`].value;
        visit.backpacks = +elements[`backpacks-visit-${visit.visitId}`].value;
        visit.misc = +elements[`misc-visit-${visit.visitId}`].value;
        visit.happened = true;
      });

      console.log(visits);
      const result = await controller.updateAppointment(
        this.state.appointment.appointmentId,
        visits,
        AppState.getSessionId(),
        AppState.getUrl()
      );
      console.log(result);

      this.setState({
        date: null,
        searchResults: null,
        appointment: null
      });

    }

    async cancelAppointment(event) {
      event.preventDefault();

      confirmAlert({
        title: 'Are you sure?',
        message: 'Are you sure you want to cancel this appointment?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.confirmCancelAppointment()
          },
          {
            label: 'No',
            onClick: () => console.log('closed')
          }
        ]
      });
    }

    async confirmCancelAppointment() {
      console.log('Doing cancel');
      const result = await controller.cancel(
        this.state.appointment.appointmentId, AppState.getSessionId(), AppState.getUrl());
      console.log(result);

      this.setState({
        date: null,
        searchResults: null,
        appointment: null
      });
    }

    renderNumberRows(visit) {
      return (
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td><b>Socks:</b></td>
              <td>
                <input name={`socks-visit-${visit.visitId}`} type="text" defaultValue={visit.socks} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><b>Underwear:</b></td>
              <td>
                <input name={`underwear-visit-${visit.visitId}`} type="text" defaultValue={visit.underwear} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><b>Shoes:</b></td>
              <td>
                <input name={`shoes-visit-${visit.visitId}`} type="text" defaultValue={visit.shoes} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><b>Coats:</b></td>
              <td>
                <input name={`coats-visit-${visit.visitId}`} type="text" defaultValue={visit.coats} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><b>Backpacks:</b></td>
              <td>
                <input name={`backpacks-visit-${visit.visitId}`} type="text" defaultValue={visit.backpacks} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><b>Misc:</b></td>
              <td>
                <input name={`misc-visit-${visit.visitId}`} type="text" defaultValue={visit.misc} />
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    renderVisit(visit) {
      if (visit.student != null) {
        return (
          <table>
            <tbody>
              <tr>
                <td><b>Student:</b></td>
                <td>{visit.student.studentId}</td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
          </table>
        );
      }

      return (
        <table>
            <tbody>
              <tr>
                <td><b>Person:</b></td>
                <td>{visit.person.relation}</td>
                <td></td>
                  <td></td>
                </tr>
                </tbody>
            </table>
      );
    }

    renderAppointmentHeader() {
      if (this.state.appointment == null) {
        return (<div />);
      }

      const appointment = this.state.appointment;

      return (
        <h3>
            Appointment: {new Date(appointment.datetimeIso).toLocaleDateString()}
            {" @ " + new Date(appointment.datetimeIso).toLocaleTimeString()}
          </h3>
      );
    }

    renderDetails() {
      if (this.state.appointment == null) {
        return (<div />);
      }

      const appointment = this.state.appointment;

      return (
        <div>          
          <table>
            <tbody>
              <tr>
                <td><b>Name:</b></td>
                <td>{appointment.guardian.firstName + " " + appointment.guardian.lastName}</td>
                <td><b>Email:</b></td>
                <td>{appointment.guardian.email}</td>
                <td><b>Phone:</b></td>
                <td>{appointment.guardian.phoneNumber + " (" + appointment.guardian.phoneTypeLabel + ")"}</td>
              </tr>
            </tbody>
          </table>
          <div>
            {appointment.visits.map((visit) => (
              <div key={visit.visitId}>
                  {this.renderVisit(visit)}
                  {this.renderNumberRows(visit)}
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </div>
      );
    }

    renderAddPerson() {
      if (this.state.appointment == null) {
        return (<div />);
      }

      return (
        <table>
            <tbody>
              <tr>
                <td><b>Relation:</b></td>
                <td>
                <input type="text" name="new-relation" />
                </td>
                <td>
                  <button type="submit">Add New Person</button>
                </td>
              </tr>
            </tbody>
          </table>
      );
    }

    renderCancel() {
      if (this.state.appointment == null) {
        return (<div />);
      }

      return (
        <button type="submit">Cancel Appointment</button>
      );
    }
  
    render() {
      return (
        <div>
          <Banner />
          <div className="standard-view" >
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
            {this.renderAppointmentHeader()}
            <form onSubmit={this.onAddPerson}>
            {this.renderAddPerson()}
            </form>
            <form onSubmit={this.updateVisit}>
            {this.renderDetails()}
            </form>
            <br />
            <form onSubmit={this.cancelAppointment}>
              {this.renderCancel()}
            </form>
          </div>
        </div>
      );
    }
}
  
export default Appointment;
  