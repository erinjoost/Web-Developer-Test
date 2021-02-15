import React, { Component} from "react";
import {hot} from "react-hot-loader";


class Main extends Component{
  render(){
    return(
      <div className="Main">
        <h1> Homepage </h1>
      </div>
    );
  }
} 

export default hot(module)(Main);
