import React, { Component } from "react";
import * as controller from "./home-controller";
import { Navigate } from "react-router-dom";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timegridPlugin from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import Banner from "../../component/banner/Banner";
import ProgressView from "../../component/progressView/ProgressView";

import strings from "../../locale";
import "./home.css";
import Select from "react-select";

import Switch from "react-switch";
import * as error from "../../component/errorModal/error-modal";

import AppState from "../../AppState";
import * as inputUtil from "../../util/input-util";
import ApptEntry from "../../component/apptEntry/ApptEntry";
import * as commonSerivce from "../../util/common-service";

class Home extends Component {
  calendarRef = React.createRef();

  constructor() {
    super();

    this.dateClick = this.dateClick.bind(this);
    this.submit = this.submit.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.slotChange = this.slotChange.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onStudentsChanged = this.onStudentsChanged.bind(this);

    this.state = {
      data: null,
      event: null,
      body: null,
      textAlign: "left",
      language: "en",
      showCalender: false,
      timeslots: null,
      noOptions: false,
      currentPhoneNumber: null,
      students: null
    };
  }

  onPhoneNumberChange(newPhoneNumber) {
    this.setState({
      currentPhoneNumber: newPhoneNumber
    });
  }

  onStudentsChanged(students) {
    this.setState({
      students: students
    });
  }

  async componentDidMount() {
    const data = await commonSerivce.getSettings(AppState.getUrl());

    const timeslots = [];
    data.availability.availabilities.forEach((available) => {
      timeslots.push({
        label: inputUtil.prettyDateTimeFromIso(available),
        value: new Date(available).getTime()
      });
    });

    let newEvent = null;
    let noOptions = false;
    if (timeslots.length != 0) {
      const startDate = new Date(timeslots[0].value);
      const endDate = new Date(startDate.getTime() + 30 * 60000);
      newEvent = controller.makeNewEvent(startDate, endDate);
    } else {
      noOptions = true;
    }

    console.log(data);

    this.setState({
      data: data,
      timeslots: timeslots,
      event: newEvent,
      noOptions: noOptions
    });
  }

  dateClick(event) {
    const startDate = new Date(event.dateStr);
    const endDate = new Date(startDate.getTime() + 30 * 60000);

    const newEvent = controller.makeNewEvent(startDate, endDate);

    console.log(newEvent);

    let found = false;
    for (let i = 0; i < this.state.timeslots.length; i++) {
      const timeslot = this.state.timeslots[i];

      if (timeslot.value == newEvent.datetimeValue) {
        found = true;
        break;
      }
    }

    if (!found) {
      return;
    }

    let calendarApi = this.calendarRef.current.getApi();

    if (calendarApi.getEventById("new-appointment")) {
      calendarApi.getEventById("new-appointment").remove();
    }

    calendarApi.addEvent(newEvent);

    this.setState({
      event: newEvent
    });
  }

  datesSet(event) {
    console.log(event);
  }

  async submit(event) {
    event.preventDefault();
    const elements = event.target.elements;

    const body = commonSerivce.assembleAppointmentPayload(
      this.state.event?.start,
      this.state.language,
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

    const result = await controller.makeAppointment(body, AppState.getUrl());
    console.log(result);

    if (result.success) {
      this.setState({
        body: body
      });

      AppState.setLanguage(this.state.language);
      AppState.setAppointment(body);
      AppState.setTextAlign(this.state.textAlign);
    } else {
      error.display(result.messages);
    }
  }

  onLanguageChange(event) {
    event.preventDefault();
    strings.setLanguage(event.target.id);
    this.setState({
      textAlign: event.target.id == "ar" ? "right" : "left",
      language: event.target.id
    });
  }

  getLanguageStyle(locale) {
    if (locale == this.state.language) {
      return "language-selected";
    }
    return "language";
  }

  slotChange(event) {
    const startDate = new Date(event.value);
    const endDate = new Date(startDate.getTime() + 30 * 60000);

    const newEvent = controller.makeNewEvent(startDate, endDate);

    this.setState({
      event: newEvent
    });

    console.log(newEvent);
  }

  renderCalendar() {
    if (!this.state.showCalender) {
      return <br />;
    }

    return (
      <FullCalendar
        ref={this.calendarRef}
        plugins={[timegridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        dateClick={this.dateClick}
        events={this.state.data.events}
        datesSet={this.datesSet}
        height={600}
      />
    );
  }

  renderScheduleAppointment() {
    if (this.state.noOptions == true) {
      return (
        <div>
          <h1>{strings.noAvailability}</h1>
          <p>{strings.noAvailabilityText}</p>
          <button className="default" type="submit">
            {strings.addToWaitList}
          </button>
        </div>
      );
    }

    return (
      <div>
        <h1>{strings.scheduleAppointment}</h1>
        <table className="header">
          <tbody>
            <tr>
              <td>{strings.pickAvailable}&nbsp;&nbsp;</td>
              <td style={{ width: "100%" }}>
                <Select
                  options={this.state.timeslots}
                  onChange={this.slotChange}
                  value={{
                    label: this.state.event?.label,
                    value: this.state.event?.datetimeValue
                  }}
                />
                &nbsp;&nbsp; &nbsp;&nbsp;
              </td>
              <td>&nbsp;&nbsp;{strings.showCalendar}&nbsp;&nbsp;</td>
              <td>
                <Switch
                  className="react-switch"
                  checked={this.state.showCalender}
                  onChange={() =>
                    this.setState({
                      showCalender: !this.state.showCalender
                    })
                  }
                />
              </td>
              <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="default" type="submit">
                  {strings.scheduleAppointment}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.submit}>
        <ApptEntry
          phoneTypes={this.state.data.phoneTypes}
          genders={this.state.data.genders}
          grades={this.state.data.grades}
          schools={this.state.data.schools}
          onPhoneNumberChange={this.onPhoneNumberChange}
          onStudentsChanged={this.onStudentsChanged}
        />
        <br />
        <br />
        {this.renderScheduleAppointment()}
        <br />
        {this.renderCalendar()}
      </form>
    );
  }

  render() {
    if (this.state.body != null) {
      return <Navigate to="/thankyou" push={true} />;
    }

    if (this.state.data == null) {
      return <ProgressView />;
    }

    return (
      <div>
        <Banner />

        <div
          className="standard-view"
          style={{ textAlign: this.state.textAlign }}
        >
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <button
                      id="en"
                      className={this.getLanguageStyle("en")}
                      onClick={this.onLanguageChange}
                    >
                      English
                    </button>
                  </td>
                  <td>
                    <button
                      id="es"
                      className={this.getLanguageStyle("es")}
                      onClick={this.onLanguageChange}
                    >
                      Español
                    </button>
                  </td>
                  <td>
                    <button
                      id="ar"
                      className={this.getLanguageStyle("ar")}
                      onClick={this.onLanguageChange}
                    >
                      عربى
                    </button>
                  </td>
                  <td>
                    <button
                      id="fr"
                      className={this.getLanguageStyle("fr")}
                      onClick={this.onLanguageChange}
                    >
                      Français
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <h1>{strings.appointmentScheduling}</h1>
          <p>{strings.appointmentPurpose}</p>

          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default Home;
