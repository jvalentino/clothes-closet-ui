import React, { Component } from "react";
import strings from "../../locale";
//import AppState from "../../AppState";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import PropTypes from "prop-types";

class ApptEntry extends Component {
  constructor() {
    super();

    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.clickAddStudent = this.clickAddStudent.bind(this);

    this.state = {
      currentPhoneNumber: null,
      phoneTypes: null,
      loaded: false,
      students: [1],
      genders: null,
      grades: null,
      schools: null
    };
  }

  onPhoneChange(event) {
    this.props.onPhoneNumberChange(event);
    this.setState({
      currentPhoneNumber: event
    });
  }

  clickAddStudent(event) {
    event.preventDefault();
    const list = this.state.students;
    list.push(list.length + 1);
    this.props.onStudentsChanged(list);
    this.setState({
      students: list
    });
  }

  async componentDidMount() {
    this.props.onPhoneNumberChange(null);
    this.props.onStudentsChanged(this.state.students);
    this.setState({
      loaded: true,
      phoneTypes: this.props.phoneTypes,
      genders: this.props.genders,
      grades: this.props.grades,
      schools: this.props.schools
    });
  }

  render() {
    if (this.state.loaded == false) {
      return <div />;
    }

    return (
      <div>
        <h3>{strings.appointmentParentInfo}</h3>
        <table className="standard-form">
          <tbody>
            <tr>
              <td>{strings.firstName}</td>
              <td>
                <input style={{ width: 192 }} name="firstName" type="text" />
              </td>

              <td>{strings.lastName}</td>
              <td>
                <input name="lastName" type="text" />
              </td>

              <td>{strings.emailAddress}</td>
              <td>
                <input name="email" type="text" style={{ width: "300px" }} />
              </td>
            </tr>

            <tr>
              <td>{strings.phoneNumber}</td>
              <td>
                <PhoneInput
                  style={{ width: 200 }}
                  name="phoneNumber"
                  value={this.state.currentPhoneNumber}
                  onChange={this.onPhoneChange}
                  defaultCountry="US"
                />
              </td>

              <td>{strings.phoneType}</td>
              <td>
                <select name="phoneTypeLabel">
                  {this.state.phoneTypes.map((phoneType) => (
                    <option value={phoneType.label} key={phoneType.label}>
                      {phoneType.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3>{strings.students}</h3>
        {this.state.students.map((student) => (
          <div key={"student" + student}>
            <table className="standard-form">
              <tbody>
                <tr>
                  <td>{strings.studentId}</td>
                  <td>
                    <input name={`student-id-${student}`} type="text" />
                  </td>

                  <td>{strings.gender}</td>
                  <td>
                    <select name={`student-gender-${student}`}>
                      {this.state.genders.map((gender) => (
                        <option value={gender.label} key={gender.label}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>{strings.grade}</td>
                  <td>
                    <select name={`student-grade-${student}`}>
                      {this.state.grades.map((grade) => (
                        <option value={grade.label} key={grade.label}>
                          {grade.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>{strings.school}</td>
                  <td>
                    <select name={`student-school-${student}`}>
                      {this.state.schools.map((school) => (
                        <option value={school.label} key={school.label}>
                          {school.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        ))}
        <button className="default" onClick={this.clickAddStudent}>
          {strings.addAnotherStudent}
        </button>
      </div>
    );
  }
}

ApptEntry.propTypes = {
  phoneTypes: PropTypes.array.isRequired,
  genders: PropTypes.array.isRequired,
  grades: PropTypes.array.isRequired,
  schools: PropTypes.array.isRequired,
  onPhoneNumberChange: PropTypes.func.isRequired,
  onStudentsChanged: PropTypes.func.isRequired
};

export default ApptEntry;
