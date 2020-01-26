import React from "react";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem
} from "../../redux/cart/cart.actions";
import "./checkout-item.styles.scss";

const quantityStyles = {
  width: "23%",
  display: "flex"
};

const arrowStyles = {
  cursor: "pointer"
};

const valueStyles = {
  margin: "0 10px"
};

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span style={quantityStyles} className="quantity">
        <div
          style={arrowStyles}
          className="arrow"
          onClick={() => removeItem(cartItem)}
        >
          &#10094;
        </div>
        <span style={valueStyles} className="value">
          {quantity}
        </span>
        <div
          style={arrowStyles}
          className="arrow"
          onClick={() => addItem(cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
