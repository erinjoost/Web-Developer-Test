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
      <div className="checkout">
        <h1>Your Basket</h1>
        <p>Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.</p>
        <div className="cart">
          <div className="grid item header">
            <div className="product">Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Cost</div>
          </div>
          <hr/>
          {this.props.cart.map(cartItem => (
            <CartItem key={cartItem.sku} sku={cartItem.sku} quantity={cartItem.quantity}
              setItemQuantity={this.props.setItemQuantity}
              removeItem={()=>this.props.removeItem(cartItem.sku)}
              />
          ))}
          <hr className="spacer"/>
          <div className="grid total">
            <div className="label">SubTotal:</div>
            <div className="cost">${subtotal.toFixed(2)}</div>
          </div>
          <div className="grid total">
            <div className="label">VAT at 20%:</div>
            <div className="cost">${vat.toFixed(2)}</div>
          </div>
          <div className="grid total">
            <div className="label">Total:</div>
            <div className="cost">${total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  }
} 

export default hot(module)(Cart);
