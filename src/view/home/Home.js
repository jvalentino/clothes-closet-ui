import React, { Component } from "react";
import * as controller from "./home-controller";
import { Navigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timegridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import Banner from "../banner/Banner";

import strings from "../../locale";
import './home.css';
import Select from 'react-select';

import Switch from "react-switch";

class Home extends Component {

   calendarRef = React.createRef();

    constructor() {
      super();
      this.clickAddStudent = this.clickAddStudent.bind(this);
      this.dateClick = this.dateClick.bind(this);
      this.submit = this.submit.bind(this);
      this.onLanguageChange = this.onLanguageChange.bind(this);
      this.slotChange = this.slotChange.bind(this);

      this.state = {
        data: null,
        students: [1],
        event: null,
        body: null,
        textAlign: 'left',
        language: 'en',
        showCalender: false,
        timeslots: null,
      };
    }
  
    async componentDidMount() {
      const data = await controller.getSettings();
      /*data.events = [
        {
          title: 'Closed',
          start: '2023-01-09T08:00:00.000+0000',
          end: '2023-01-09T16:30:00Z'
        }
      ];*/

      
      const timeslots = [];
      data.availability.availabilities.forEach(available => {
        timeslots.push({
          label: this.formatDateTime(available),
          value: new Date(available).getTime()
        });
      });

      console.log(timeslots);


      this.setState({
        data: data,
        timeslots: timeslots
      });

    }

    clickAddStudent(event) {
      event.preventDefault();
      const list = this.state.students;
      list.push(list.length + 1);
      this.setState({
        students: list
      });
    }

    dateClick(event) {
      // TODO: Don't allow booking on top of appointments
      
      
      const startDate = new Date(event.dateStr);
      const endDate = new Date(startDate.getTime() + 30 * 60000);

      const newEvent = {
          id: 'new-appointment',
          title: 'New',
          start: startDate.toISOString()?.replace('Z', '+0000'),
          end: endDate.toISOString()?.replace('Z', '+0000'),
          color: '#378006',
          label: this.formatDateTime(startDate.toISOString()?.replace('Z', '+0000')),
          datetimeValue: new Date(startDate.toISOString()?.replace('Z', '+0000')).getTime()
      };

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

      let calendarApi = this.calendarRef.current.getApi()
      
      if (calendarApi.getEventById('new-appointment')) {
        calendarApi.getEventById('new-appointment').remove()
      }
      
      calendarApi.addEvent(newEvent)

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

      const body = {
        datetime: this.state.event?.start,
        guardian: {
          email: elements.email.value,
          firstName: elements.firstName.value,
          lastName: elements.lastName.value,
          phoneNumber: elements.phoneNumber.value,
          phoneTypeLabel: elements.phoneTypeLabel.value
        },
        students: []
      };

      for (let i = 1; i <= this.state.students.length; i++) {
        const student = {
          id: elements[`student-id-${i}`].value,
          school: elements[`student-school-${i}`].value,
          gender: elements[`student-gender-${i}`].value,
          grade: elements[`student-grade-${i}`].value
        };
        body.students.push(student);
      }

      // TODO: form validation

      console.log(body);

      const result = await controller.makeAppointment(body);
      console.log(result);

      if (result.success) {
        this.setState({
          body: body
        });
      } else {

      }
      
    }

    onLanguageChange(event) {
      event.preventDefault();
      strings.setLanguage(event.target.id);
      this.setState({
        textAlign: event.target.id == 'ar' ? 'right' : 'left',
        language: event.target.id
      });
    }

    getLanguageStyle(locale) {
      if (locale == this.state.language) {
        return 'language-selected';
      }
      return 'language';
    }

    formatDateTime(iso) {
      const date = new Date(iso);
      const dayMonthYear = date.toLocaleDateString()
      const time = date.toLocaleTimeString()

      return `${dayMonthYear} ${time}`;
    }

    slotChange(event) {
      const startDate = new Date(event.value);
      const endDate = new Date(startDate.getTime() + 30 * 60000);

      const newEvent = {
          id: 'new-appointment',
          title: 'New',
          start: startDate.toISOString()?.replace('Z', '+0000'),
          end: endDate.toISOString()?.replace('Z', '+0000'),
          color: '#378006',
          label: this.formatDateTime(startDate.toISOString()?.replace('Z', '+0000')),
          datetimeValue: new Date(startDate.toISOString()?.replace('Z', '+0000')).getTime()
      };

      this.setState({
        event: newEvent
      });

      console.log(newEvent);
    }

    renderCalendar() {
      if (!this.state.showCalender) {
        return (
          <br />
        );
      }

      return (
        <FullCalendar
                ref={this.calendarRef}
                plugins={[ timegridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                dateClick={this.dateClick}
                events={this.state.data.events}
                datesSet={this.datesSet}
                height={600}
              />
      );
    }
  
    render() {

      if (this.state.body != null) {
        return <Navigate to="/thankyou" push={true} />
      }

      if (this.state.data == null) {
        return <p>Loading</p>;
      }

      return (
        <div>
          <Banner />
          
          <div className="standard-view" style={{'textAlign':this.state.textAlign}}>
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <button 
                        id="en" 
                        className={this.getLanguageStyle('en')} 
                        onClick={this.onLanguageChange}>English</button>
                    </td>
                    <td>
                      <button 
                        id="es" 
                        className={this.getLanguageStyle('es')} 
                        onClick={this.onLanguageChange}>Español</button>
                    </td>
                    <td>
                      <button 
                        id="ar" 
                        className={this.getLanguageStyle('ar')} 
                        onClick={this.onLanguageChange}>عربى</button>
                    </td>
                    <td>
                      <button 
                        id="fr" 
                        className={this.getLanguageStyle('fr')} 
                        onClick={this.onLanguageChange}>Français</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            
            <h1>{strings.appointmentScheduling}</h1>
            <p>{strings.appointmentPurpose}</p>
            <form onSubmit={this.submit}>
              <h3>{strings.appointmentParentInfo}</h3>
              <table className="standard-form">
                <tbody>

                  <tr>
                    <td>
                      {strings.firstName}
                    </td>
                    <td>
                    <input name="firstName" type="text" />
                    </td>
                   
                    <td>
                      {strings.lastName}
                    </td>
                    <td>
                    <input name="lastName" type="text" />
                    </td>
                    
                    <td>
                      {strings.emailAddress}
                    </td>
                    <td>
                    <input name="email" type="text" style={{width: "300px"}} />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {strings.phoneNumber}
                    </td>
                    <td>
                    <input name="phoneNumber" type="text" />
                    </td>
                    
                    <td>
                      {strings.phoneType}
                    </td>
                    <td>
                      <select name="phoneTypeLabel">
                      {this.state.data.phoneTypes.map((phoneType) => (
                      <option value={phoneType.label} key={phoneType.label}>{phoneType.label}</option>
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
                        <td>
                          {strings.studentId}
                        </td>
                        <td>
                        <input name={`student-id-${student}`} type="text" />
                        </td>
                       
                        <td>
                          {strings.gender}
                        </td>
                        <td>
                          <select name={`student-gender-${student}`}>
                            {this.state.data.genders.map((gender) => (
                            <option value={gender.label} key={gender.label}>{gender.label}</option>
                            ))}
                          </select>
                        </td>
                       
                        <td>
                          {strings.grade}
                        </td>
                        <td>
                          <select name={`student-grade-${student}`}>
                            {this.state.data.grades.map((grade) => (
                            <option value={grade.label} key={grade.label}>{grade.label}</option>
                            ))}
                          </select>
                        </td>
                       
                        <td>
                          {strings.school}
                        </td>
                        <td>
                          <select name={`student-school-${student}`}>
                            {this.state.data.schools.map((school) => (
                            <option value={school.label} key={school.label}>{school.label}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <br />
                  </div>
                ))}
              <button className="default" onClick={this.clickAddStudent}>{strings.addAnotherStudent}</button>

              <br />
              <br />
              <h3>Schedule Appointment</h3>
              <table className="header">
                <tbody>
                  <tr>
                    <td>Pick an available date and time for your appointment&nbsp;&nbsp;</td>
                    <td style={{width: '100%'}}>
                      <Select 
                        options={this.state.timeslots} 
                        onChange={this.slotChange}
                        value={{label:this.state.event?.label, value:this.state.event?.datetimeValue}}
                        />
                      &nbsp;&nbsp; &nbsp;&nbsp;
                    </td>
                    <td>
                    &nbsp;&nbsp;Show Calendar?&nbsp;&nbsp;
                    </td>
                    <td>
                        <Switch 
                          className="react-switch"
                          checked={this.state.showCalender}
                          onChange={() => this.setState({showCalender: !this.state.showCalender})}
                           />
                    </td>
                    <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button className="default" type="submit">Submit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              {this.renderCalendar()}
              
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Home;
  