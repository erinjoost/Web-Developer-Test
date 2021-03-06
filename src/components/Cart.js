import React, { Component } from "react";
import { hot } from "react-hot-loader";
import CartItem from "./CartItem";
import { price } from "../utils/product";

import "../styles/checkout.scss";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.setItemQuantity = this.setItemQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  getCartTotal() {
    //returns cart total in double to two decimal places
    let total = 0;
    this.props.cart.map(cartItem => {
      total += cartItem.quantity * price(cartItem.sku);
    });
    return total;
  }

  setItemQuantity(item_sku, new_quantity) {
    if (new_quantity >= 0) {
      let cart = this.props.cart.slice();
      var item = cart.find(cartItem => {
        return cartItem.sku === item_sku;
      })
      item.quantity = new_quantity;
      this.props.updateCart(cart)
    }
  }

  removeItem(item_sku) {
    let cart = this.props.cart.slice();
    var item = cart.find(cartItem => {
      return cartItem.sku === item_sku;
    });
    var index = cart.indexOf(item);
    if (index > -1) {
      cart.splice(index, 1);
    }
    this.props.updateCart(cart)
  }
  render() {
    const subtotal = this.getCartTotal();
    const isMobile = this.props.isMobile;
    const buyNow = subtotal > 0 ?
    <button className="blue buynow"> Buy Now </button> :
    <button className="blue buynow inactive"> Buy Now </button>;
    return (
      <div className="checkout">
        <header>
          <h2>Your Basket</h2>
          <span>Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.</span>
        </header>
        <ul className="cart">
          <CartLabels isMobile={isMobile} />
          {!isMobile && <hr />}
          {this.props.cart.map(cartItem => (
            <CartItem isMobile={isMobile} key={cartItem.sku} sku={cartItem.sku} quantity={cartItem.quantity}
              setItemQuantity={this.setItemQuantity}
              removeItem={() => this.removeItem(cartItem.sku)}
            />
          ))}
          <TotalBar subtotal={subtotal} isMobile={isMobile} />
          {buyNow}
        </ul>
      </div>
    );
  }
}
function TotalBar(props) {
  const subtotal = parseFloat(props.subtotal);
  const vat = (subtotal * 0.2);
  const total = subtotal + vat;
 
  if (props.isMobile) {
    return (
      <div id="cartLabels" className="total container">
        <div className="grid">
          <label>SubTotal:</label>
          <div className="cost">${subtotal.toFixed(2)}</div>
          <label>VAT at 20%:</label>
          <div className="cost">${vat.toFixed(2)}</div>
          <label>Total:</label>
          <div className="cost">${total.toFixed(2)}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="cartLabels" className="total">
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
        
      </div>
    )
  }
}

function CartLabels(props) {
  if (props.isMobile) {
    return <div />;
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
export default hot(module)(Cart);
