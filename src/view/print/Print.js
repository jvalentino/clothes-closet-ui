import React, { Component } from "react";
import AppState from "../../AppState";
import * as controller from "./print-controller";
import ProgressView from "../../component/progressView/ProgressView";

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
      data: result
    });
  }

  getLastDateTime(lastAppointmentDateIso) {
    if (lastAppointmentDateIso == null) {
      return "N/A";
    }

    return (
      new Date(lastAppointmentDateIso).toLocaleDateString() +
      " @ " +
      new Date(lastAppointmentDateIso).toLocaleTimeString()
    );
  }

  renderSettings(settings) {
    return (
      <table>
        <tbody>
          {settings.map((setting) => (
            <tr key={setting.settingsId}>
              <td>
                <b>{setting.quantity + " " + setting.label}</b>
              </td>
              <td>_______</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderVisit(visit) {
    if (visit.student != null) {
      return (
        <tbody>
          <tr key={visit.visitId}>
            <td>
              <b>Student ID:</b>
            </td>
            <td>{visit.student?.studentId}</td>
            <td>
              <b>Gender:</b>
            </td>
            <td>{visit.student?.gender}</td>
            <td>
              <b>Grade:</b>
            </td>
            <td>{visit.student?.grade}</td>
            <td>
              <b>School:</b>
            </td>
            <td>{visit.student?.school}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <b>Shoe:</b>
            </td>
            <td>{visit.student?.shoeSize}</td>
            <td>
              <b>Underwear:</b>
            </td>
            <td>{visit.student?.underwearSize}</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tr key={visit.visitId}>
        <td>
          <b>Additional Person</b>
        </td>
        <td></td>
        <td>
          <b>Relation</b>
        </td>
        <td>{visit.person?.relation}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }

  render() {
    if (this.state.data == null) {
      return <ProgressView />;
    }

    const data = this.state.data;
    const appointment = data.appointment;

    return (
      <div className="standard-view">
        <table className="standard-form">
          <tbody>
            <tr>
              <td>
                <b>Name:</b>
              </td>
              <td>{`${appointment.guardian.firstName} ${appointment.guardian.lastName}`}</td>
              <td>
                <b>Email:</b>
              </td>
              <td>{appointment.guardian.email}</td>
              <td>
                <b>Phone:</b>
              </td>
              <td>{appointment.guardian.phoneNumber}</td>
              <td>
                <b>Type:</b>
              </td>
              <td>{appointment.guardian.phoneTypeLabel}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="standard-form">
          {appointment.visits.map((visit) => this.renderVisit(visit))}
        </table>
        <br />
        <table className="standard-form">
          <tbody>
            <tr>
              <td>
                <b>Appointment Date:</b>
              </td>
              <td>{new Date(appointment.datetimeIso).toLocaleDateString()}</td>
              <td>
                <b>Appointment Time:</b>
              </td>
              <td>{new Date(appointment.datetimeIso).toLocaleTimeString()}</td>
            </tr>
            <tr>
              <td>
                <b>First Time?</b>
              </td>
              <td>{data.firstTime ? "Yes" : "No"}</td>
              <td>
                <b>Last Appointment:</b>
              </td>
              <td>{this.getLastDateTime(data.lastAppointmentDateIso)}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="standard-form">
          <tbody>
            <tr>
              <td style={{ verticalAlign: "top" }}>
                <p>Girl Student</p>
                {this.renderSettings(data.girlSettings)}
              </td>
              <td style={{ verticalAlign: "top" }}>
                <p>Boy Student</p>
                {this.renderSettings(data.boySettings)}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <table className="standard-form">
          <tbody>
            <tr>
              <td>
                <b>Order Filled By:</b>
              </td>
              <td>_____________________________</td>
              <td>
                <b>Parent Signature:</b>
              </td>
              <td>_____________________________</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Print;
