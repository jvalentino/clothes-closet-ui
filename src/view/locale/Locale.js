import Banner from "../banner/Banner";
import React, { Component } from "react";
import strings from "../../locale";

class Locale extends Component {
    constructor() {
      super();
      
      const languages = [];

      const en = this.generateLanguage("en", strings._props['en']);
      languages.push(en);
      
      for (const [language, value] of Object.entries(strings._props)) {
        if (language != "en") {
            languages.push(this.generateLanguage(language, value));
        }
      }
      
      this.state = {
        languages: languages
      };

    }

    generateLanguage(languageName, languageMap) {
        const result = {
            name: languageName,
            values: []
        };
        
        for (const [name, text] of Object.entries(languageMap)) {
            result.values.push(
                {
                    name: name,
                    text: text
                }
            );
        }
    
        return result;
    }
  
    async componentDidMount() {
      
    }
  
    render() {
      console.log(this.state.languages);
      return (
        <div>
          <Banner />
          <div className="standard-view">
            {this.state.languages.map((language) => (
                <div key={language.name} style={{"textAlign":language.name == "ar" ? "right" : "left"}}>
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
  