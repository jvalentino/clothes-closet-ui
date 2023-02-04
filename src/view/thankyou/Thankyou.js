import React, { Component } from "react";
import Banner from "../../component/banner/Banner";
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

  getHeaderText(body) {
    if (body.datetime != null) {
      return strings.formatString(strings.thankYou, {
        datetime: inputUtil.prettyDateTimeFromIso(body.datetime)
      });
    }

    return strings.thankYouWaitList;
  }

  getBodyText(body) {
    if (body.datetime != null) {
      return strings.thankYouText;
    }

    return strings.thankYouWaitListText;
  }

  render() {
    const body = this.state.body;

    return (
      <div>
        <Banner />
        <div
          className="standard-view"
          style={{ textAlign: AppState.getTextAlign() }}
        >
          <h1>{this.getHeaderText(body)}</h1>
          <p>{this.getBodyText(body)}</p>
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
            <div key={"student" + student.studentId}>
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
