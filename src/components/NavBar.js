import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from "react-router-dom";

import "../styles/navbar.scss"
import cart from '../assets/images/cart.png'


class NavBar extends Component{
  render(){
    return(
      <div id={this.props.id} className="navbar">
        <h2><Link to="/">APP</Link></h2>
         <ul className="menu">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/">News</Link>
            </li>
            <li>
              <Link to="/">Content</Link>
            </li>
            <li>
              <Link to="/cart"><img src={cart} alt="cart icon"/><div id="yourcart">Your Cart</div></Link>
            </li>
          </ul>
      </div>
    );
  }
} 

export default hot(module)(NavBar);
