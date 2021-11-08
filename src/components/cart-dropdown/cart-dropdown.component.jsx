import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ toggleCartHidden }) => (
  <div className="cart-dropdown">
    <div className="cart-items" />
    <CustomButton onClick={() => toggleCartHidden() }>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartDropdown);
