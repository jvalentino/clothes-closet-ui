import React, { Component } from "react";
import * as controller from "./home-controller";
import { Navigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timegridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import Banner from "../banner/Banner";

import strings from "../../locale";

class Home extends Component {

   calendarRef = React.createRef();

    constructor() {
      super();
      this.clickAddStudent = this.clickAddStudent.bind(this);
      this.dateClick = this.dateClick.bind(this);
      this.submit = this.submit.bind(this);
      this.onLanguageChange = this.onLanguageChange.bind(this);
      this.state = {
        data: null,
        students: [1],
        event: null,
        body: null,
        textAlign: 'left'
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

      console.log(data);
      this.setState({
        data: data
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
      console.log(event);
      
      const startDate = new Date(event.dateStr);
      const endDate = new Date(startDate.getTime() + 30 * 60000);

      const newEvent = {
          id: 'new-appointment',
          title: 'New',
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          color: '#378006'
      };

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
        datetime: this.state.event?.start?.replace('Z', '+0000'),
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
      
      //navigate('/thankyou');
      //this.context.router.transitionTo('/thankyou');
      //browserHistory.push('/thankyou');
      //this.context.router.push('/thankyou');
    }

    onLanguageChange(event) {
      console.log(event.target.value);
      strings.setLanguage(event.target.value);
      this.setState({
        textAlign: event.target.value == 'ar' ? 'right' : 'left'
      });
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
            Language:  &nbsp;
              <select onChange={this.onLanguageChange}>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="ar">عربى</option>
                <option value="fr">Français</option>
              </select>
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
              <FullCalendar
                ref={this.calendarRef}
                plugins={[ timegridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                dateClick={this.dateClick}
                events={this.state.data.events}
                datesSet={this.datesSet}
              />
              <br />
              <button className="default" type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Home;
  