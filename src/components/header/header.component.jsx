import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { signOutRequest } from "../../redux/user/user.action";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartItem from "../cart-icon/cart-icon.component";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.style";

const Header = ({ currentUser, hidden, signOutRequest }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">Shop</OptionLink>
      <OptionLink to="/contact">Contact</OptionLink>

      {currentUser ? (
        <OptionLink as="div" onClick={signOutRequest}>
          Sign Out
        </OptionLink>
      ) : (
        <OptionLink className="option" to="/signin">
          Signin
        </OptionLink>
      )}
      <CartItem />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  signOutRequest: () => dispatch(signOutRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
