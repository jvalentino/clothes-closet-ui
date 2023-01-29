import React, { Component } from "react";
import AppState from "../../AppState";
import Banner from "../banner/Banner";
import * as controller from "./dashboard-controller";
import ProgressView from "../progressView/ProgressView";
import DataTable from "react-data-table-component";
//import * as inputUtil from "../../util/input-util";

class Dashboard extends Component {
  constructor() {
    super();

    this.upcomingSelected = this.upcomingSelected.bind(this);
    this.attentionSelected = this.attentionSelected.bind(this);

    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    const result = await controller.load(
      AppState.getSessionId(),
      AppState.getUrl(),
      AppState.getTimeZone()
    );

    this.setState({
      data: result
    });
  }

  upcomingSelected(event) {
    event.preventDefault();
    const appointmentId = event.target.id;

    this.selectAppointment(appointmentId, this.state.data.upcomingAppointments);
  }

  attentionSelected(event) {
    event.preventDefault();
    const appointmentId = event.target.id;

    this.selectAppointment(appointmentId, this.state.data.requireAttention);
  }

  selectAppointment(appointmentId, list) {
    let appointment = null;

    list.forEach((element) => {
      if (element.appointmentId == appointmentId) {
        appointment = element;
      }
    });

    const date = new Date(appointment.datetimeIso).toLocaleDateString();

    window.location = `./appointment?date=${date}&name=${appointment.guardian.lastName}`;
  }

  generateUpcomingColumns() {
    const columns = [
      {
        cell: (row) => (
          <button
            onClick={this.upcomingSelected}
            id={row.appointmentId}
            className="default"
          >
            View
          </button>
        )
      },
      {
        name: "Date",
        selector: (row) => new Date(row.datetimeIso).toLocaleDateString(),
        sortable: true
      },
      {
        name: "Time",
        selector: (row) => new Date(row.datetimeIso).toLocaleTimeString(),
        sortable: true
      },
      {
        name: "Guardian",
        selector: (row) => row.guardian.firstName + " " + row.guardian.lastName,
        sortable: true
      },
      {
        name: "Email",
        selector: (row) => row.guardian.email,
        sortable: true
      },
      {
        name: "Phone",
        selector: (row) =>
          row.guardian.phoneNumber + " (" + row.guardian.phoneTypeLabel + ")",
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

  generateAttendtionColumns() {
    const columns = [
      {
        cell: (row) => (
          <button
            onClick={this.attentionSelected}
            id={row.appointmentId}
            className="default"
          >
            View
          </button>
        )
      },
      {
        name: "Date",
        selector: (row) => new Date(row.datetimeIso).toLocaleDateString(),
        sortable: true
      },
      {
        name: "Time",
        selector: (row) => new Date(row.datetimeIso).toLocaleTimeString(),
        sortable: true
      },
      {
        name: "Guardian",
        selector: (row) => row.guardian.firstName + " " + row.guardian.lastName,
        sortable: true
      },
      {
        name: "Email",
        selector: (row) => row.guardian.email,
        sortable: true
      },
      {
        name: "Phone",
        selector: (row) =>
          row.guardian.phoneNumber + " (" + row.guardian.phoneTypeLabel + ")",
        sortable: true
      },
      {
        name: "Locale",
        selector: (row) => row.locale,
        sortable: true
      },
      {
        name: "Happened?",
        selector: (row) => (row.happend ? "Yes" : "No"),
        sortable: true
      }
    ];
    return columns;
  }

  renderHeader(data) {
    return (
      <div>
        <h1>{`${data.semester} ${data.year}`}</h1>
      </div>
    );
  }

  renderStats(data) {
    return (
      <table className="standard-form">
        <tbody>
          <tr>
            <td>
              <b>Appointments</b>
            </td>
            <td>{data.report.appointments}</td>
            <td>
              <b>Total People</b>
            </td>
            <td>
              {data.report.totalPeople} &nbsp; (
              {`${data.report.students} Students, ${data.report.persons} Others`}
              )
            </td>
            <td>
              <b>Total Items</b>
            </td>
            <td>{data.report.total}</td>
          </tr>
          <tr>
            <td>
              <b>Upcoming Appointments</b>
            </td>
            <td>{data.upcomingAppointments.length}</td>
            <td>
              <b>Appointments Requiring Data Entry</b>
            </td>
            <td>{data.requireAttention.length}</td>
            <td>
              <b>On Wait List</b>
            </td>
            <td>{data.onWaitList}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderUpcoming(data) {
    return (
      <div>
        <h3>Upcoming Appointments ({data.upcomingAppointments.length})</h3>
        <p>These are the appointments that are scheduled in the next 7 days.</p>

        <DataTable
          columns={this.generateUpcomingColumns()}
          data={data.upcomingAppointments}
          filterable
          pagination
        />
      </div>
    );
  }

  renderAttention(data) {
    return (
      <div>
        <h3>
          Appointments Requiring Attention ({data.requireAttention.length})
        </h3>
        <p>
          These are appointments that have already passed, but that have not had
          their data entered. That means that one of the following actions needs
          to occur:
        </p>
        <ol>
          <li>The appointment needs to have its data entered.</li>
          <li>The appointment needs to be marked as a no-show.</li>
          <li>The appointment needs to be cancelled.</li>
        </ol>

        <DataTable
          columns={this.generateAttendtionColumns()}
          data={data.requireAttention}
          filterable
          pagination
        />
      </div>
    );
  }

  render() {
    if (this.state.data == null) {
      return (
        <div>
          <Banner />
          <ProgressView />;
        </div>
      );
    }

    const data = this.state.data;

    return (
      <div>
        <Banner />
        <div className="standard-view">
          {this.renderHeader(data)}
          <hr />
          {this.renderStats(data)}
          <hr />
          <br />
          {this.renderUpcoming(data)}
          <hr />
          <br />
          {this.renderAttention(data)}
        </div>
      </div>
    );
  }
}

export default Dashboard;
