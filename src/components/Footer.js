import React, { Component } from "react";
import { hot } from "react-hot-loader";
import NavBar from "./NavBar"
import google from "../assets/images/google.png"
import instagram from "../assets/images/instagram.png"
import facebook from "../assets/images/facebook.png"
import twitter from "../assets/images/twitter.png"


import "../styles/footer.scss"

class Footer extends Component {
  render() {
    return (
        <footer>
        <div className="container">
            <NavBar id="bottom"/>
            <div id="info" className="container">
                <div className="social container">
                    <a href="https://google.com"><img src={google} alt="google"/></a>
                    <a href="https://facebook.com"><img src={facebook} alt="facebook"/></a>
                    <a href="https://instagram.com"><img src={instagram} alt="instagram"/></a>
                    <a href="https://twitter.com"><img src={twitter} alt="twitter"/></a>
                </div>
                
                    <p>Privacy Policy<br/>
                    © 2017 Google. All Rights Reserved</p>
            </div>
        </div>
        </footer>
    );
  }
}

export default hot(module)(Footer);
