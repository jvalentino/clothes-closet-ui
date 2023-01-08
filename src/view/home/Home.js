import React, { Component } from "react";
import * as controller from "./home-controller";

class Home extends Component {
    constructor() {
      super();
      this.clickAddStudent = this.clickAddStudent.bind(this);
      this.state = {
        data: null,
        students: [1]
      };
    }
  
    async componentDidMount() {
      const data = await controller.getSettings();
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
  
    render() {
      if (this.state.data == null) {
        return <p>Loading...</p>;
      }

      return (
        <div>
          <form>
            <h3>Parent/Guardian Information</h3>
             <table>
              <tbody>

                <tr>
                  <td>
                    First Name:
                  </td>
                  <td>
                   <input type="text" />
                  </td>
                  <td>
                    &nbsp;
                  </td>
                  <td>
                    Last Name:
                  </td>
                  <td>
                   <input type="text" />
                  </td>
                  <td>
                    &nbsp;
                  </td>
                  <td>
                    Email Address:
                  </td>
                  <td>
                   <input type="text" style={{width: "300px"}} />
                  </td>
                </tr>

                <tr>
                  <td>
                    Phone Number:
                  </td>
                  <td>
                   <input type="text" />
                  </td>
                  <td>
                    &nbsp;
                  </td>
                  <td>
                    Phone Type:
                  </td>
                  <td>
                    <select>
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
                       <input type="text" />
                      </td>
                      <td>
                       &nbsp;
                      </td>
                      <td>
                        Gender:
                      </td>
                      <td>
                        <select>
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
                        <select>
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
                        <select>
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

          </form>
        </div>
      );
    }
  }
  
  export default Home;
  