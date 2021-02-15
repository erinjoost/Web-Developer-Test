import React, { Component} from "react";
import {hot} from "react-hot-loader";


class Cart extends Component{
  render(){
    return(
      <div className="Cart">
        <h1> It's a cart! </h1>
      </div>
    );
  }
} 

export default hot(module)(Cart);
