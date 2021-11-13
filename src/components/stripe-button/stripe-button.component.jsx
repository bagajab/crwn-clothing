import React from "react";
import StripeCheckout from "react-stripe-checkout";
import "./stripe-button.component.jsx";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J5HHLLQsFbMofqxoYSFshwpA0t81MyNg6FWXuR180ucHKfgP3O3TRcjk8teDWmFuVngMd4hRA9FRBq7tus4Vh3100zYAioMXK";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/Cuz.svg"
      amount={priceForStripe}
      stripeKey={publishableKey}
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;
