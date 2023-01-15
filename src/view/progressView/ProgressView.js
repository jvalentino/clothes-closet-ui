import React, { Component } from "react";
import { CircularProgress } from "react-loading-indicators";
import './progress-view.css';

class ProgressView extends Component {
    constructor() {
      super();
      
    }
  
    async componentDidMount() {
      
    }
  
    render() {
      return (
        <div className="progress">
          <div style={{"height":"40%"}}></div>
          <CircularProgress 
            variant="bubble-dotted" 
            color="#298e46" 
            size="large" 
            text="" 
            textColor="" />
        </div>
      );
    }
}
  
export default ProgressView;
  