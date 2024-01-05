import React, { Component } from "react";
import strings from "../../locale";
import AppState from "../../AppState";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import PropTypes from "prop-types";

class ApptEntry extends Component {
  constructor() {
    super();

    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.clickAddStudent = this.clickAddStudent.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      currentPhoneNumber: null,
      phoneTypes: null,
      loaded: false,
      students: [1],
      genders: null,
      grades: null,
      schools: null,
      mobile: AppState.isMobile(),
      sizes: ["", "Youth", "Adult"],
      currentShoeSizes: [
        "",
        "Youth 10",
        "Youth 11",
        "Youth 12",
        "Youth 13",
        "Youth 1",
        "Youth 2",
        "Youth 3",
        "Youth 4",
        "Youth 5",
        "Adult 6",
        "Adult 6.5",
        "Adult 7",
        "Adult 7.5",
        "Adult 8",
        "Adult 8.5",
        "Adult 9",
        "Adult 9.5",
        "Adult 10",
        "Adult 10.5",
        "Adult 11",
        "Adult 11.5",
        "Adult 12",
        "Adult 13",
        "Adult 14",
        "Adult 15"
      ],
      currentUnderwearSizes: [
        "",
        "Child 4t/5t",
        "Child 6",
        "Child 8",
        "Child 10",
        "Child 12",
        "Child 14",
        "Child 16",
        "Child 18",
        "Child 20",
        "Adult S",
        "Adult M",
        "Adult L",
        "Adult XL",
        "Adult XXL",
        "Adult XXXL",
        "Adult 4X"
      ]
    };
  }

  updateDimensions() {
    const mobile = AppState.isMobile();
    this.setState({ mobile: mobile });
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
    const index = list.length + 1;
    list.push(index);
    this.props.onStudentsChanged(list);

    this.setState({
      students: list
    });
  }

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
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

  firstName() {
    return <input style={{ width: 192 }} name="firstName" type="text" />;
  }

  lastName() {
    return <input name="lastName" type="text" />;
  }

  email() {
    return <input name="email" type="text" style={{ width: "300px" }} />;
  }

  phoneNumber() {
    return (
      <PhoneInput
        style={{ width: 200 }}
        name="phoneNumber"
        value={this.state.currentPhoneNumber}
        onChange={this.onPhoneChange}
        defaultCountry="US"
      />
    );
  }

  phoneTypeLabel() {
    return (
      <select name="phoneTypeLabel">
        {this.state.phoneTypes.map((phoneType) => (
          <option value={phoneType.label} key={phoneType.label}>
            {phoneType.label}
          </option>
        ))}
      </select>
    );
  }

  studentId(student) {
    return <input name={`student-id-${student}`} type="text" />;
  }

  studentGender(student) {
    return (
      <select name={`student-gender-${student}`}>
        <option value=""></option>
        {this.state.genders.map((gender) => (
          <option value={gender.label} key={gender.label}>
            {gender.label}
          </option>
        ))}
      </select>
    );
  }

  studentGrade(student) {
    return (
      <select name={`student-grade-${student}`}>
        <option value=""></option>
        {this.state.grades.map((grade) => (
          <option value={grade.label} key={grade.label}>
            {grade.label}
          </option>
        ))}
      </select>
    );
  }

  studentSchool(student) {
    return (
      <select name={`student-school-${student}`}>
        <option value=""></option>
        {this.state.schools.map((school) => (
          <option value={school.label} key={school.label}>
            {school.label}
          </option>
        ))}
      </select>
    );
  }

  studentShoes(student) {
    return (
      <select name={`student-shoe-size-${student}`}>
        {this.state.currentShoeSizes.map((size) => (
          <option value={size} key={size}>
            {size}
          </option>
        ))}
      </select>
    );
  }

  studentUnderwear(student) {
    return (
      <select name={`student-underwear-size-${student}`}>
        {this.state.currentUnderwearSizes.map((size) => (
          <option value={size} key={size}>
            {size}
          </option>
        ))}
      </select>
    );
  }

  renderParentEntry() {
    if (this.state.mobile === true) {
      return (
        <table className="standard-form">
          <tbody>
            <tr>
              <td>{strings.firstName}</td>
            </tr>
            <tr>
              <td>{this.firstName()}</td>
            </tr>
            <tr>
              <td>{strings.lastName}</td>
            </tr>
            <tr>
              <td>{this.lastName()}</td>
            </tr>
            <tr>
              <td>{strings.emailAddress}</td>
            </tr>
            <tr>
              <td>{this.email()}</td>
            </tr>
            <tr>
              <td>{strings.phoneNumber}</td>
            </tr>
            <tr>
              <td>{this.phoneNumber()}</td>
            </tr>
            <tr>
              <td>{strings.phoneType}</td>
            </tr>
            <tr>
              <td>{this.phoneTypeLabel()}</td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <table className="standard-form">
        <tbody>
          <tr>
            <td>{strings.firstName}</td>
            <td>{this.firstName()}</td>

            <td>{strings.lastName}</td>
            <td>{this.lastName()}</td>

            <td>{strings.emailAddress}</td>
            <td>{this.email()}</td>
          </tr>

          <tr>
            <td>{strings.phoneNumber}</td>
            <td>{this.phoneNumber()}</td>

            <td>{strings.phoneType}</td>
            <td>{this.phoneTypeLabel()}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderStudentEntry() {
    if (this.state.mobile === true) {
      return (
        <div>
          {this.state.students.map((student) => (
            <div key={"student" + student}>
              <table className="standard-form">
                <tbody>
                  <tr>
                    <td>{strings.studentId}</td>
                    <td>{this.studentId(student)}</td>
                    <td>{strings.gender}</td>
                    <td>{this.studentGender(student)}</td>
                  </tr>
                  <tr>
                    <td>{strings.grade}</td>
                    <td>{this.studentGrade(student)}</td>

                    <td>{strings.school}</td>
                    <td>{this.studentSchool(student)}</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        {this.state.students.map((student) => (
          <div key={"student" + student}>
            <table className="standard-form">
              <tbody>
                <tr>
                  <td>{strings.studentId}</td>
                  <td>{this.studentId(student)}</td>

                  <td>{strings.gender}</td>
                  <td>{this.studentGender(student)}</td>

                  <td>{strings.grade}</td>
                  <td>{this.studentGrade(student)}</td>

                  <td>{strings.school}</td>
                  <td>{this.studentSchool(student)}</td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{strings.shoeSize}</td>
                  <td>{this.studentShoes(student)}</td>
                  <td>{strings.underwearSize}</td>
                  <td>{this.studentUnderwear(student)}</td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.loaded == false) {
      return <div />;
    }

    return (
      <div>
        <h3>{strings.appointmentParentInfo}</h3>
        {this.renderParentEntry()}
        <br />
        <h3>{strings.students}</h3>
        {this.renderStudentEntry()}
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
