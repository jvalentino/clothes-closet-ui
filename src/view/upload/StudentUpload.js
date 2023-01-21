import Banner from "../banner/Banner";
import React, { Component } from "react";
import * as controller from "./upload-controller";
import AppState from "../../AppState";
import * as error from "../errorModal/error-modal";

class StudentUpload extends Component {
  constructor() {
    super();

    this.uploadClicked = this.uploadClicked.bind(this);
  }

  async componentDidMount() {}

  async uploadClicked(event) {
    event.preventDefault();

    const result = await controller.upload(
      event.target.elements["payload-form"].value,
      AppState.getSessionId(),
      AppState.getUrl()
    );

    console.log(result);

    if (result.success == false) {
      error.display(result.messages);
    } else {
      event.target.elements["payload-form"].value = "";
    }
  }

  render() {
    return (
      <div>
        <Banner />
        <div className="standard-view">
          <h1>Student ID Upload</h1>
          <p>
            The purpose of this page is to upload the list of eligible Students.
            This is done by taking the Excel spreadsheet that is given to us,
            saving it as a CSV file, and then pasting the content into the below
            text area. Note that doing this will erase all current eligible
            student information and replace it with what is given. The content
            will look like this:
          </p>
          <pre>
            Current Building Name,Student Id,Grade,Meal Status Name
            <br />
            Arbor Creek Elementary,T01 ,01,Eligible For Free Meals
            <br />
            Bedford Heights Elementary,T02 ,02,Eligible For Free Meals
            <br />
            Bedford Junior High,T03 ,03,Eligible For Free Meals
            <br />
          </pre>
          <p>
            It must have the data in the order ot School Name, Student ID,
            Grade, and Meal status.
          </p>
          <form onSubmit={this.uploadClicked}>
            <textarea
              name="payload-form"
              style={{ width: "100%", height: "400px" }}
            ></textarea>
            <button type="submit" className="default">
              Upload
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default StudentUpload;
