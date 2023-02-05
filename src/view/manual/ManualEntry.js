import React, { Component } from "react";
import Banner from "../../component/banner/Banner";
import AppState from "../../AppState";
import ProgressView from "../../component/progressView/ProgressView";
import * as commonSerivce from "../../util/common-service";
import ApptEntry from "../../component/apptEntry/ApptEntry";
import DateTime from "../../component/dateTime/DateTime";
import * as error from "../../component/errorModal/error-modal";
import * as inputUtil from "../../util/input-util";
import * as controller from "./manual-entry-controller";

class ManualEntry extends Component {
  constructor() {
    super();

    this.submit = this.submit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      data: null,
      currentPhoneNumber: null,
      students: null,
      date: null
    };
  }

  async componentDidMount() {
    const data = await commonSerivce.getSettings(AppState.getUrl());
    this.setState({
      data: data
    });
  }

  async submit(event) {
    event.preventDefault();

    const elements = event.target.elements;

    const date = elements["date-field"].value;
    const time = elements["time-field"].value;
    const datetime = inputUtil.dateAndTimeToIso(
      date,
      time,
      AppState.getTimeZoneOffsetInHours()
    );

    const body = commonSerivce.assembleAppointmentPayload(
      datetime,
      "en",
      this.state.currentPhoneNumber,
      this.state.students,
      elements
    );

    console.log(body);
    const errors = commonSerivce.validateAppointmentPayload(body);

    if (errors.length != 0) {
      error.display(errors);
      return;
    }

    const result = await controller.makeAppointment(
      body,
      AppState.getUrl(),
      AppState.getSessionId()
    );
    console.log(result);

    window.location = "./manual";
  }

  onDateChange(date) {
    this.setState({
      date: date
    });
  }

  render() {
    if (this.state.data == null) {
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
          <h1>Manual Data Entry</h1>
          <p>
            This form can be used to enter appointments in directly with no
            validation regarding eligibility or previous visists, as well as to
            put them directly on the wait list when no date/time is selected.
          </p>
          <form onSubmit={this.submit}>
            <ApptEntry
              phoneTypes={this.state.data.phoneTypes}
              genders={this.state.data.genders}
              grades={this.state.data.grades}
              schools={this.state.data.schools}
              onPhoneNumberChange={(value) =>
                this.setState({ currentPhoneNumber: value })
              }
              onStudentsChanged={(students) =>
                this.setState({ students: students })
              }
            />
            <br />
            <DateTime onDateChange={this.onDateChange} />
            <br />
            <button className="default" type="submit">
              {this.state.date == null ? "Put on Wait List" : "Schedule"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ManualEntry;
