import React, { Component} from "react";
import {hot} from "react-hot-loader";
import CartItem from "./CartItem";
import {price} from "../utils/product";
class Cart extends Component{
  getTotal(){
    //returns cart total in double to two decimal places
    let total = 0;
    this.props.cart.map(cartItem => {
      total += cartItem.quantity * price(cartItem.sku);
    });
    return total.toFixed(2); 
  }
  render(){
    const total = this.getTotal();
    const buyNow = total>0?
    <button className="buyNow"> Buy Now </button>:
      "";
    

    return(
      <div className="Cart">
        <h1> Your Cart </h1>
        <ul className="cart-items">
          {this.props.cart.map(cartItem => (
            <li key={cartItem.sku}>
            <CartItem key={cartItem.sku} sku={cartItem.sku} quantity={cartItem.quantity}
              incrementItemQuantity={()=>this.props.incrementItemQuantity(cartItem.sku)}
              decrementItemQuantity={()=>this.props.decrementItemQuantity(cartItem.sku)}
              removeItem={()=>this.props.removeItem(cartItem.sku)}
              />
            </li>
          ))}
        </ul>
       Total:{total}
       {buyNow}
      </div>
    );
  }
} 

export default hot(module)(Cart);
