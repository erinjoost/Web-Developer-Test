import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {price, productListing, stockLevel} from "../utils/product";

class CartItem extends Component{
    constructor(props){
        super(props);
        this.state = {quantity: this.props.quantity};

        this.handleChangeItemQuantity = this.handleChangeItemQuantity.bind(this);
        this.incrementItemQuantity = this.incrementItemQuantity.bind(this);
        this.decrementItemQuantity = this.decrementItemQuantity.bind(this);
     }

    incrementItemQuantity(){
       let current = parseInt(this.props.quantity);
       this.setQuantity(current+1)
    }
    decrementItemQuantity(){
        let current = parseInt(this.state.quantity);
        this.setQuantity(current-1);
    }
    setQuantity(new_quantity){
        if(new_quantity){
            new_quantity = parseInt(new_quantity)
        }
        if(validQuantity(new_quantity, this.props.sku)){
            this.props.setItemQuantity(this.props.sku,new_quantity)
            this.setState({quantity: new_quantity});
        }
    }

    handleChangeItemQuantity(event) {
        const new_quantity = event.target.value;
        this.setQuantity(new_quantity);
    }
    render(){
        const sku = this.props.sku;
        const item = productListing(sku);
        const cost = price(sku) * this.props.quantity;
        return(
        <div>{item.name}      {item.size} 
            <button className="dec"  onClick={this.decrementItemQuantity}> - </button>
            <input type="number" value={this.state.quantity} onChange={this.handleChangeItemQuantity} />
            <button className="inc" onClick={this.incrementItemQuantity}> + </button>
            x{price(this.props.sku)} ..... {cost}
            <button className="removeItem" onClick={this.props.removeItem}> X </button>
        </div>
        );
    }
} 

function validQuantity(new_quantity, item_sku){
    if(new_quantity>stockLevel(item_sku) || new_quantity < 0){
        console.error("invalid quantity")
        return false;
    }
    return true;
}

export default hot(module)(CartItem);
