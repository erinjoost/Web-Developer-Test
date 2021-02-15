import React, { Component} from "react";
import {hot} from "react-hot-loader";
import CartItem from "./CartItem";
import {price} from "../utils/product";
class Cart extends Component{
  getCartTotal(){
    //returns cart total in double to two decimal places
    let total = 0;
    this.props.cart.map(cartItem => {
      total += cartItem.quantity * price(cartItem.sku);
    });
    return total; 
  }
  render(){
    const subtotal = this.getCartTotal();
    const vat = (subtotal * 0.2);
    const total = subtotal+vat;
    const buyNow = total>0?
    <button className="buyNow"> Buy Now </button>:
      "";
    

    return(
      <div className="Cart">
        <h1>Your Basket</h1>
        <p>Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.</p>
        <ul className="cart-items">
          {this.props.cart.map(cartItem => (
            <li key={cartItem.sku}>
            <CartItem key={cartItem.sku} sku={cartItem.sku} quantity={cartItem.quantity}
              setItemQuantity={this.props.setItemQuantity}
              removeItem={()=>this.props.removeItem(cartItem.sku)}
              />
            </li>
          ))}
        </ul>
      SubTotal{subtotal.toFixed(2)}
      VAT at 20%:{vat.toFixed(2)}
      Total:{total.toFixed(2)}
      {buyNow}
      </div>
    );
  }
} 

export default hot(module)(Cart);
