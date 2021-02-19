import React, { Component } from "react";
import { hot } from "react-hot-loader";
import mountain from "../assets/images/mountain.png"

import "../styles/main.scss"

class Main extends Component {
  render() {
    return (
      <div id="main">
        <header>
          <span>Apps unveils new studio</span>
          <h1>Lagom</h1>
        </header>
        <section className="horizontal">
          <h2>Innovation and experience design agency. </h2>
          <p>Apps is an innovation and experience design agency.<br/>
          We exist to create a better future with you.</p>
          <button className="blue">Products</button>
        </section>
        <div className="container">
          <img src={mountain} alt="snowy mountain peak" />
          <div className="vertical">
            <section>
              <h2>The imaginative application of art and science.</h2>
              <p>We architect, design and deliver iconic experiences, services and products that improve people’s lives. </p>
              <button className="blue">Read Latest</button>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(Main);
