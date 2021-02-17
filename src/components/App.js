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
    
    this.state = {
      windowWidth: window.innerWidth,
      total:0,
      cart: [
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
  }

  setItemQuantity(item_sku, new_quantity) {
    if (new_quantity >= 0) {
      let cart = this.state.cart.slice();
      var item = cart.find(cartItem => {
        return cartItem.sku === item_sku;
      })
      item.quantity = new_quantity;
      this.setState({ cart: cart });
    }
  }

  removeItem(item_sku) {
    let cart = this.state.cart.slice();
    var item = cart.find(cartItem => {
      return cartItem.sku === item_sku;
    });
    var index = cart.indexOf(item);
    console.log(index)
    if (index > -1) {
      cart.splice(index, 1);
    }
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
                setItemQuantity={(item_sku, number) => this.setItemQuantity(item_sku, number)}
                removeItem={(item_sku) => this.removeItem(item_sku)}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);