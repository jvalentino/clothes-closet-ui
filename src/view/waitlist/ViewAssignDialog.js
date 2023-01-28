import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, { Component } from "react";

import PropTypes from "prop-types";

import AppState from "../../AppState";

import * as controller from "./waitlist-controller";
import * as error from "../errorModal/error-modal";

let onCloseReference = null;

class Content extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      date: null
    };
  }

  async onSubmit(event) {
    event.preventDefault();

    const elements = event.target.elements;
    const date = elements["date-field"].value;
    const time = elements["time-field"].value;

    onCloseReference();

    const messages = controller.validate(date, time);

    if (messages.length != 0) {
      error.display(messages);
      return;
    }

    const appointmentId = this.props.appointment.appointmentId;
    await controller.moveFromWaitList(
      appointmentId,
      date,
      time,
      AppState.getSessionId(),
      AppState.getUrl(),
      AppState.getTimeZoneOffsetInHours()
    );

    window.location = "./waitlist";
  }

  renderVisit(visit) {
    return (
      <table key={visit.visitId} className="standard-form">
        <tbody>
          <tr>
            <td>
              <b>Student ID:</b>
            </td>
            <td>{visit.student.studentId}</td>
            <td>
              <b>Grade:</b>
            </td>
            <td>{visit.student.grade}</td>
          </tr>
          <tr>
            <td>
              <b>School:</b>
            </td>
            <td colSpan={3}>{visit.student.school}</td>
          </tr>
          <tr>
            <td colSpan={4}>
              <hr />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const appointment = this.props.appointment;
    const guardian = appointment.guardian;
    const timeZone = AppState.getTimeZone();

    return (
      <div className="react-confirm-alert">
        <div className="react-confirm-alert-body">
          <h1 className="alert__title">Appointment</h1>
          <form onSubmit={this.onSubmit}>
            <table className="standard-form">
              <tbody>
                <tr>
                  <td>
                    <b>Guardian:</b>
                  </td>
                  <td>{`${guardian.firstName} ${guardian.lastName} (${guardian.email})`}</td>
                </tr>
                <tr>
                  <td>
                    <b>Phone:</b>
                  </td>
                  <td>{`${guardian.phoneNumber} (${guardian.phoneTypeLabel})`}</td>
                </tr>
              </tbody>
            </table>
            <h2>Students</h2>
            {appointment.visits.map((visit) => this.renderVisit(visit))}
            <h2>Pick Date/Time ({timeZone})</h2>
            <table className="standard-form">
              <tbody>
                <tr>
                  <td>
                    <b>Date:</b>
                  </td>
                  <td>
                    <DatePicker
                      name="date-field"
                      selected={this.state.date}
                      onChange={(date) => this.setState({ date: date })}
                    />
                  </td>
                  <td>
                    <b>Time:</b>
                  </td>
                  <td>
                    <select name="time-field">
                      {controller.generateTimeStrings().map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="react-confirm-alert-button-group">
              <button type="submit">Schedule</button>
              <button onClick={onCloseReference}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  appointment: PropTypes.object.isRequired
};

function display(appointment) {
  console.log(`Displaying appointment ${appointment.appointmentId}`);
  //const guardian = appointment.guardian;
  confirmAlert({
    customUI: ({ onClose }) => {
      onCloseReference = onClose;
      return <Content appointment={appointment} />;
    }
  });
}

export { display };
