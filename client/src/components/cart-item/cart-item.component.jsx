import React from "react";

import {
  CartItemContainer,
  ItemDetailsContainer,
  CartItemImage
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

// it memoizes the current state of this component and doesn't render if the props are the same
// same as PureComponent
export default React.memo(CartItem);
