import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { hot } from "react-hot-loader";

import Cart from "./Cart"
import Main from "./Main"

class App extends Component {

  constructor(props) {
    super(props)
    this.handleResize = this.handleResize.bind(this);
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart){
      cart = [
        {
          "sku": "AWDT0001-S",
          "quantity": 1
        },
        {
          "sku": "AWDT0001-M",
          "quantity": 1
        },
        {
          "sku": "AWDT0003-M",
          "quantity": 5
        },
        {
          "sku": "AWDT0002",
          "quantity": 3
        },
      ]
    }

    this.state = {
      windowWidth: window.innerWidth,
      total:0,
      cart: cart,
    }
  }

  updateCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart: cart });
  }


  handleResize(e){
    this.setState({ windowWidth: window.innerWidth });
  }

 componentDidMount() {
  window.addEventListener("resize", this.handleResize);
 }

 componentWillUnMount() {
  window.addEventListener("resize", this.handleResize);
 } 

  render() {
    const currentCart = this.state.cart;
    const isMobile = (this.state.windowWidth < 768);
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/cart">
              <Cart cart={currentCart}
                isMobile={isMobile}
                updateCart={(cart) => this.updateCart(cart)}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);