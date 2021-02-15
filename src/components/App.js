import React, { Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {hot} from "react-hot-loader";

import "../styles/App.css";
import Cart from "./Cart"
import Main from "./Main"


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      cart:[
        {
          "sku": "AWDT0001-S",
          "quantity":1
        },
        {
          "sku": "AWDT0001-M",
          "quantity":1
        },
      ]
    }
  }
  incrementItemQuantity(item_sku){
    let cart = this.state.cart.slice();
    var item = cart.find(cartItem => {
      return cartItem.sku === item_sku
    })
    if(!item){
      cart.push({
        sku:item_sku,
        quantity:1
      })
    }else{
      item.quantity += 1;
    }
    this.setState({cart:cart});
  }
  decrementItemQuantity(item_sku){
    let cart = this.state.cart.slice();
    var item = cart.find(cartItem => {
      return cartItem.sku === item_sku;
    })
    if(item){
      item.quantity -= 1;
    }
    if(item.quantity >= 0){
      cart = this.removeItem(item_sku);
    }else{
      this.setState({cart:cart});
    }
  }
  removeItem(item_sku){
    let cart = this.state.cart.slice();
    var item = cart.find(cartItem => {
      return cartItem.sku === item_sku;
    });
    var index = cart.indexOf(item);
    console.log(index)
    if (index > -1) {
      cart.splice(index, 1);
    }
    this.setState({cart:cart});
  }
  render(){
    const currentCart = this.state.cart;
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
            <Cart  cart={currentCart}
              incrementItemQuantity={(item_sku) => this.incrementItemQuantity(item_sku)}
              decrementItemQuantity={(item_sku) => this.decrementItemQuantity(item_sku)}
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