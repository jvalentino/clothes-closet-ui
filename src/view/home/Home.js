import React, { Component } from "react";
import * as controller from "./home-controller";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timegridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

class Home extends Component {

   calendarRef = React.createRef()

    constructor() {
      super();
      this.clickAddStudent = this.clickAddStudent.bind(this);
      this.dateClick = this.dateClick.bind(this);
      this.submit = this.submit.bind(this);
      this.state = {
        data: null,
        students: [1],
        event: null
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
      // the good news is that you only get this event when you click on an empty space
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

    submit(event) {
      event.preventDefault();
      const elements = event.target.elements;

      const body = {
        datetime: this.state.event.start,
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

      console.log(body);
    }
  
    render() {
      if (this.state.data == null) {
        return <p>Loading...</p>;
      }

      return (
        <div>
          <form onSubmit={this.submit}>
            <h3>Parent/Guardian Information</h3>
             <table>
              <tbody>

                <tr>
                  <td>
                    First Name:
                  </td>
                  <td>
                   <input name="firstName" type="text" />
                  </td>
                  <td>
                    &nbsp;
                  </td>
                  <td>
                    Last Name:
                  </td>
                  <td>
                   <input name="lastName" type="text" />
                  </td>
                  <td>
                    &nbsp;
                  </td>
                  <td>
                    Email Address:
                  </td>
                  <td>
                   <input name="email" type="text" style={{width: "300px"}} />
                  </td>
                </tr>

                <tr>
                  <td>
                    Phone Number:
                  </td>
                  <td>
                   <input name="phoneNumber" type="text" />
                  </td>
                  <td>
                    &nbsp;
                  </td>
                  <td>
                    Phone Type:
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

             {this.state.students.map((student) => (
                <div key={"student" + student}>
                  <h3>Student {student}</h3>
                  <table>
                    <tbody>
                     <tr>
                      <td>
                        Student ID:
                      </td>
                      <td>
                       <input name={`student-id-${student}`} type="text" />
                      </td>
                      <td>
                       &nbsp;
                      </td>
                      <td>
                        Gender:
                      </td>
                      <td>
                        <select name={`student-gender-${student}`}>
                          {this.state.data.genders.map((gender) => (
                          <option value={gender.label} key={gender.label}>{gender.label}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                       &nbsp;
                      </td>
                      <td>
                        Grade:
                      </td>
                      <td>
                        <select name={`student-grade-${student}`}>
                          {this.state.data.grades.map((grade) => (
                          <option value={grade.label} key={grade.label}>{grade.label}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                      &nbsp;
                      </td>
                      <td>
                        School:
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
                  <button onClick={this.clickAddStudent}>Add Another Student</button>
                </div>
              ))}
            <FullCalendar
              ref={this.calendarRef}
              plugins={[ timegridPlugin, interactionPlugin ]}
              initialView="timeGridWeek"
              dateClick={this.dateClick}
              events={this.state.data.events}
              datesSet={this.datesSet}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }
  
  export default Home;
  