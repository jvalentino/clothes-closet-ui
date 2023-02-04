import Banner from "../../component/banner/Banner";
import React, { Component } from "react";
import * as controller from "./locale-controller";

class Locale extends Component {
  constructor() {
    super();

    this.state = {
      languages: controller.generateLanguages()
    };
  }

  async componentDidMount() {}

  render() {
    console.log(this.state.languages);
    return (
      <div>
        <Banner />
        <div className="standard-view">
          {this.state.languages.map((language) => (
            <div
              key={language.name}
              style={{ textAlign: language.name == "ar" ? "right" : "left" }}
            >
              <h1>{language.name}</h1>
              <table className="standard-form">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Text</th>
                  </tr>
                </thead>
                <tbody>
                  {language.values.map((value) => (
                    <tr key={`${language.name}-${value.name}`}>
                      <td>{value.name}</td>
                      <td>{value.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Locale;
