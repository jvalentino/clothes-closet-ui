import React, { Component } from "react";
import './banner.css';
import strings from "../../locale";
import AppState from "../../AppState";

class Banner extends Component {
    constructor() {
      super();
      
    }
  
    async componentDidMount() {
      
    }

    renderLoggedIn() {
      if (AppState.getLoggedInName() == null) {
        return (
          <br />
        );
      }

      return (
        <div>
          <img height="40" referrerPolicy="no-referrer" src={AppState.getLoggedInPicture()} />
          <br />
          Logged In as <b>{AppState.getLoggedInName()}</b> 
        </div>
      );
    }

    renderMenu() {
      if (AppState.getLoggedInName() == null) {
        return (
          <tr></tr>
        );
      }

      return (
        <tr>
          <td colSpan="5" style={{"textAlign":"center"}}>
            <a href="./">Schedule Appointment</a> | &nbsp;
            <a href="./appointment">Search Appointments</a> | &nbsp;
            <a href="./logout">Logout</a>
          </td>
        </tr>
      );
    }
  
    render() {
      return (
        <div>
          <table className="header">
            <tbody>
              <tr>
                <td><img src={require('./logo.jpeg')} height="80" /></td>
                <td>
                  <b>HEB ISD Council PTAs Clothes Closet</b><br />
                  <img src={require('./mail.png')} />
                  &nbsp;
                  clothescloset@hebisd.edu <br />
                  <img src={require('./phone.png')} />
                  &nbsp;&nbsp;
                  817-399-2559
                </td>
                <td>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                </td>
                <td>
                  <br />
                  <img src={require('./google-map.png')} />
                  &nbsp;&nbsp;
                  <a href="https://goo.gl/maps/ozvTgjHYwGSKezdw6" rel="noreferrer" target="_blank">
                    1100 Raider Dr, Euless, TX, United States, Texas
                  </a> <br />
                  <img src={require('./facebook.png')} />
                  &nbsp;
                  <a href="https://www.facebook.com/HEBISDPTACC/" rel="noreferrer" target="_blank">
                    {strings.bannerFollowUs}
                  </a>
                </td>
                <td className="header-right">
                  {this.renderLoggedIn()}
                </td>
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
  