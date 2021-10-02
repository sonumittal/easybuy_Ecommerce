import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const Checkout = ({ onEmptyCart }) => {
  useEffect(() => {
    onEmptyCart();
  }, [])
  return (
    <div class="container">
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h3">Order Confirmation</Typography>
      <br />
      <Typography variant="body1">
        Your products will be delivered to you in 3 working days.&nbsp;
        <Link to="/fashion">Buy More</Link>!
      </Typography>
    </div>
  );
};

export default Checkout;
