import React, { Component } from "react";
import Banner from "../../component/banner/Banner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as controller from "./reporting-controller";
import AppState from "../../AppState";

class Reporting extends Component {
  constructor() {
    super();

    this.onRunReport = this.onRunReport.bind(this);

    this.state = {
      startDate: new Date(),
      endDate: new Date().setFullYear(new Date().getFullYear() + 1),
      report: null,
      reportType: null
    };
  }

  async componentDidMount() {}

  async onRunReport(event) {
    event.preventDefault();
    const elements = event.target.elements;
    const startDate = elements["start-date-field"].value;
    const endDate = elements["end-date-field"].value;
    const reportType = elements["report-type-field"].value;

    let result = null;

    switch (reportType) {
      case "People Served":
        result = await controller.report(
          startDate,
          endDate,
          AppState.getSessionId(),
          AppState.getUrl()
        );
        break;
      case "Shoes":
        result = await controller.reportShoes(
          startDate,
          endDate,
          AppState.getSessionId(),
          AppState.getUrl()
        );
        break;
      case "Underwear":
        result = await controller.reportUnderwear(
          startDate,
          endDate,
          AppState.getSessionId(),
          AppState.getUrl()
        );
        break;
    }

    this.setState({
      report: result,
      reportType: reportType
    });

  }

  renderPeopleServed(report) {
    console.log(report);
    return (
      <div>
        <table style={{ width: "300px" }}>
          <tbody>
            <tr>
              <td>
                <h2>People Served</h2>
              </td>
              <td>
                <h2>{report.totalPeople}</h2>
              </td>
            </tr>
            <tr>
              <td>Students</td>
              <td>{report.students}</td>
            </tr>
            <tr>
              <td>Others</td>
              <td>{report.persons}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <hr />
              </td>
            </tr>
            <tr>
              <td>Socks</td>
              <td>{report.socks}</td>
            </tr>
            <tr>
              <td>Underwear</td>
              <td>{report.underwear}</td>
            </tr>
            <tr>
              <td>Shoes</td>
              <td>{report.shoes}</td>
            </tr>
            <tr>
              <td>Coats</td>
              <td>{report.coats}</td>
            </tr>
            <tr>
              <td>Backpacks</td>
              <td>{report.backpacks}</td>
            </tr>
            <tr>
              <td>Misc</td>
              <td>{report.misc}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <hr />
              </td>
            </tr>
            <tr>
              <td>
                <h2>Total</h2>
              </td>
              <td>
                <h2>{report.total}</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderNVP(report, title) {
    console.log(report);
    return (
      <div>
         <table style={{ width: "300px" }}>
          <thead>
            <tr>
              <th>{title}</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
          {report.map((record) => (
            <tr key={record.name}>
              <td>{record.name}</td>
              <td>{record.value}</td>
            </tr>
          ))}
          </tbody>
         </table>
      </div>
    );
  }

  renderUnderwear(report) {
    console.log(report);
    return (
      <div>

      </div>
    );
  }

  renderReport() {
    if (this.state.report == null) {
      return <br />;
    }

    const report = this.state.report;
    const reportType = this.state.reportType;

    switch (reportType) {
      case "People Served":
        return this.renderPeopleServed(report);
      case "Shoes":
        return this.renderNVP(report, "Shoe Size");
      case "Underwear":
        return this.renderNVP(report, "Underwear Size");
    }
    
  }

  render() {
    return (
      <div>
        <Banner />
        <div className="standard-view">
          <form onSubmit={this.onRunReport}>
            <table className="standard-form">
              <tbody>
                <tr>
                  <td>Start Date</td>
                  <td>
                    <DatePicker
                      name="start-date-field"
                      selected={this.state.startDate}
                      onChange={(date) => this.setState({ startDate: date })}
                    />
                  </td>
                  <td>End Date</td>
                  <td>
                    <DatePicker
                      name="end-date-field"
                      selected={this.state.endDate}
                      onChange={(date) => this.setState({ endDate: date })}
                    />
                  </td>
                  <td>
                    Report Type
                  </td>
                  <td>
                  <select name="report-type-field">
                    <option>People Served</option>
                    <option>Shoes</option>
                    <option>Underwear</option>
                  </select>
                  </td>
                  <td>
                    <button className="default" type="submit">
                      Run Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <br />
          {this.renderReport()}
        </div>
      </div>
    );
  }
}

export default Reporting;
