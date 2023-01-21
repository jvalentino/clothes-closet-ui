import React, { Component } from "react";
import Banner from "../banner/Banner";
import AppState from "../../AppState";
import strings from "../../locale";
import * as inputUtil from "../../util/input-util";

class Thankyou extends Component {
  constructor() {
    super();
    this.state = {
      body: AppState.getAppointment()
    };
  }

  async componentDidMount() {}

  render() {
    const body = this.state.body;

    return (
      <div>
        <Banner />
        <div
          className="standard-view"
          style={{ textAlign: AppState.getTextAlign() }}
        >
          <h1>
            {strings.formatString(strings.thankYou, {
              datetime: inputUtil.prettyDateTimeFromIso(body.datetime)
            })}
          </h1>
          <p>{strings.thankYouText}</p>
          <h3>{strings.appointmentParentInfo}</h3>
          <table className="standard-form">
            <tbody>
              <tr>
                <td>{strings.firstName}</td>
                <td>{body.guardian.firstName}</td>

                <td>{strings.lastName}</td>
                <td>{body.guardian.lastName}</td>

                <td>{strings.emailAddress}</td>
                <td>{body.guardian.email}</td>
              </tr>

              <tr>
                <td>{strings.phoneNumber}</td>
                <td>{body.guardian.email}</td>

                <td>{strings.phoneType}</td>
                <td>{body.guardian.phoneTypeLabel}</td>
              </tr>
            </tbody>
          </table>

          <br />
          <h3>{strings.students}</h3>
          {body.students.map((student) => (
            <div key={"student" + student}>
              <table className="standard-form">
                <tbody>
                  <tr>
                    <td>{strings.studentId}</td>
                    <td>{student.studentId}</td>

                    <td>{strings.gender}</td>
                    <td>{student.gender}</td>

                    <td>{strings.grade}</td>
                    <td>{student.grade}</td>

                    <td>{strings.school}</td>
                    <td>{student.school}</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Thankyou;
