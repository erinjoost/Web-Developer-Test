import React, { Component } from "react";
import { hot } from "react-hot-loader";
import CartItem from "./CartItem";
import { price } from "../utils/product";

import "../styles/checkout.scss";

function TotalBar(props) {
  const subtotal = parseFloat(props.subtotal);
  const vat = (subtotal * 0.2);
  const total = subtotal + vat;
  const buyNow = total > 0 ?
    <button className="cost buynow"> Buy Now </button> :
    <button className="cost buynow inactive"> Buy Now </button>;
  if(props.isMobile){
    return (
      <div className="total container">
        <div className="grid">
          <label>SubTotal:</label>
          <div className="cost">${subtotal.toFixed(2)}</div>
          <label>VAT at 20%:</label>
          <div className="cost">${vat.toFixed(2)}</div>
          <label>Total:</label>
          <div className="cost">${total.toFixed(2)}</div>
          
        </div>
        {buyNow}
      </div>
    );
  } else {
    return (
      <div className="total">
        <div className="grid">
          <div className="label">SubTotal:</div>
          <div className="cost">${subtotal.toFixed(2)}</div>
        </div>
        <div className="grid">
          <div className="label">VAT at 20%:</div>
          <div className="cost">${vat.toFixed(2)}</div>
        </div>
        <div className="grid">
          <div className="label">Total:</div>
          <div className="cost">${total.toFixed(2)}</div>
        </div>
        <hr className="spacer" />
        <div className="grid">
          {buyNow}
        </div>
      </div>
    )
  }
}

function CartTableLabels(props) {
  if(props.isMobile){
    return <div/> ;
  }
  return (
    <div className="grid item header">
      <div className="product">Product</div>
      <div>Price</div>
      <div>Quantity</div>
      <div className="cost">Cost</div>
    </div>
  )
}
class Cart extends Component {
  getCartTotal() {
    //returns cart total in double to two decimal places
    let total = 0;
    this.props.cart.map(cartItem => {
      total += cartItem.quantity * price(cartItem.sku);
    });
    return total;
  }
  render() {
    const subtotal = this.getCartTotal();
    const isMobile = this.props.isMobile;

    return (
      <div className="checkout">
        <div className="heading">
          <h1>Your Basket</h1>
          <p>Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.</p>
        </div>
        <div className="cart">
          <CartTableLabels isMobile={isMobile}/>
          {!isMobile && <hr />}
          {this.props.cart.map(cartItem => (
            <CartItem isMobile={isMobile} key={cartItem.sku} sku={cartItem.sku} quantity={cartItem.quantity}
              setItemQuantity={this.props.setItemQuantity}
              removeItem={() => this.props.removeItem(cartItem.sku)}
            />
          ))}
          <hr className="spacer" />
          <TotalBar subtotal={subtotal} isMobile={isMobile}/>
        </div>
      </div>
    );
  }
}

export default hot(module)(Cart);
