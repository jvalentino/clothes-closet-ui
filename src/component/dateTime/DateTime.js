import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import * as controller from "./date-time-controller";

class DateTime extends Component {
  constructor() {
    super();

    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      date: null
    };
  }

  async componentDidMount() {}

  onDateChange(date) {
    if (this.props.onDateChange != null) {
      this.props.onDateChange(date);
    }

    this.setState({
      date: date
    });
  }

  render() {
    return (
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
                onChange={this.onDateChange}
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
    );
  }
}

DateTime.propTypes = {
  onDateChange: PropTypes.func
};

export default DateTime;
