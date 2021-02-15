import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {price,productListing} from "../utils/product";


class CartItem extends Component{

  render(){
    let item = productListing(this.props.sku);
    let cost = price(this.props.sku) * this.props.quantity;
    return(
     <div>{item.name}      {item.size} 
        <button className="dec"  onClick={this.props.decrementItemQuantity}> - </button>
        {this.props.quantity}
        <button className="inc" onClick={this.props.incrementItemQuantity}> + </button>
        x{price(this.props.sku)} ..... {cost}
        <button className="removeItem" onClick={this.props.removeItem}> X </button>
     </div>
    );
  }
} 

export default hot(module)(CartItem);
