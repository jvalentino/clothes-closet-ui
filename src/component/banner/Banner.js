import React, { Component } from "react";
import "./banner.css";
import strings from "../../locale";
import AppState from "../../AppState";

class Banner extends Component {
  constructor() {
    super();

    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      mobile: AppState.isMobile()
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    const mobile = AppState.isMobile();
    this.setState({ mobile: mobile });
  }

  renderLoggedIn() {
    if (AppState.getLoggedInName() == null) {
      return <br />;
    }

    return (
      <div>
        <img
          height="40"
          style={{ borderRadius: "50%" }}
          referrerPolicy="no-referrer"
          src={AppState.getLoggedInPicture()}
        />
        <br />
        Logged In as <b>{AppState.getLoggedInName()}</b>
      </div>
    );
  }

  renderMenu() {
    if (AppState.getLoggedInName() == null) {
      return <tr></tr>;
    }

    return (
      <tr>
        <td colSpan="5" className="headerMenu">
          <a href="./">Schedule Appointment</a> | &nbsp;
          <a href="./dashboard">Dashboard</a> | &nbsp;
          <a href="./appointment">Search Appointments</a> | &nbsp;
          <a href="./waitlist">Wait List</a> | &nbsp;
          <a href="./manual">Manual Entry</a> | &nbsp;
          <a href="./reporting">Reporting</a> | &nbsp;
          <a href="./settings">Settings</a> | &nbsp;
          <a href="./locales">Locales</a> | &nbsp;
          <a href="./upload">Student ID Upload</a> | &nbsp;
          <a href="./logout">Logout</a>
        </td>
      </tr>
    );
  }

  renderDirections() {
    if (this.state.mobile == true) {
      return <div></div>;
    }

    return (
      <div>
        <br />
        <img src={require("./google-map.png")} />
        &nbsp;&nbsp;
        <a
          href="https://www.google.com/maps/dir//32.8199886,-97.1358205/@32.8202211,-97.1357283,122m/data=!3m1!1e3"
          rel="noreferrer"
          target="_blank"
        >
          1100 Raider Dr, Euless, TX, United States, Texas
        </a>{" "}
        <br />
        <img src={require("./facebook.png")} />
        &nbsp;
        <a
          href="https://www.facebook.com/HEBISDPTACC/"
          rel="noreferrer"
          target="_blank"
        >
          {strings.bannerFollowUs}
        </a>
      </div>
    );
  }

  render() {
    return (
      <div>
        <table className="header">
          <tbody>
            <tr>
              <td className="headerMenuNoWrap">
                <img src={require("./logo.jpeg")} height="80" />
              </td>
              <td className="headerMenuNoWrap">
                <b>HEB ISD Council PTAs Clothes Closet</b>
                <br />
                <img src={require("./mail.png")} />
                &nbsp; clothescloset@hebisd.edu <br />
                <img src={require("./phone.png")} />
                &nbsp;&nbsp; 817-399-2559
              </td>
              <td>&nbsp; &nbsp; &nbsp;</td>
              <td className="headerMenuNoWrap">{this.renderDirections()}</td>
              <td className="header-right">{this.renderLoggedIn()}</td>
            </tr>
            {this.renderMenu()}
          </tbody>
        </table>
        <hr />
      </div>
    );
  }
}

export default Banner;
