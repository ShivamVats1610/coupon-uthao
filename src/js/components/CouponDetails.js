import React from "react";
import PaymentForm from "./PaymentForm"; // Import the PaymentForm component
import { FaLock } from "react-icons/fa"; // Import lock and unlock icons from react-icons library

class CouponDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPaymentForm: false, // State to control the visibility of the payment form
      showCouponCode: false // State to control the visibility of the coupon code
    };
    this.handlePaymentButtonClick = this.handlePaymentButtonClick.bind(this);
    this.handlePaymentFormClose = this.handlePaymentFormClose.bind(this);
    this.handleShowCouponCode = this.handleShowCouponCode.bind(this);
  }

  // Function to handle the payment button click event
  handlePaymentButtonClick() {
    this.setState({ showPaymentForm: true }); // Show the payment form
  }

  // Function to handle the payment form close event
  handlePaymentFormClose() {
    this.setState({ showPaymentForm: false }); // Close the payment form
  }

  // Function to handle the show coupon code button click event
  handleShowCouponCode() {
    this.setState(prevState => ({
      showCouponCode: !prevState.showCouponCode // Toggle the visibility of the coupon code
    }));
  }

  render() {
    const { coupon } = this.props;
    const { showPaymentForm, showCouponCode } = this.state;

    return (
      <div className="couponDetails">
        <div className="detailDescription">
          Description: {coupon.description}
        </div>
        <div className="detailInfo">
          <div>Category: {coupon.category}</div>
          <div>Coupon Type: {coupon.couponType}</div>
          <div>Validity Start Date: {coupon.validityStart}</div>
          <div>Validity End Date: {coupon.validityEnd}</div>
          <div>Owner ID: {coupon.ownerID}</div>
          <div>Source Product ID: {coupon.sourceProductID}</div>
          <div>Exchange Info: {coupon.exchangeInfo}</div>
          <div>Exchange Type: {coupon.exchangeType}</div>
          <div>Coupon Price: {coupon.couponPrice}</div>
          <div>Exchange Price: {coupon.exchangePrice}</div>
          <div>Quantity: {coupon.quantity}</div>
          <div>Negotiable: {coupon.negotiable}</div>
          <div>Currency: {coupon.currency}</div>
        </div>
        <div className="paymentbutton">
          {(!coupon.exchangeType || coupon.exchangeType.toLowerCase() !== "free") && (
            <button onClick={this.handlePaymentButtonClick}>Make Payment</button>
          )}
          {showPaymentForm && (
            <div className="modalOverlay">
              <div className="modalContent">
                <span className="closeButton" onClick={this.handlePaymentFormClose}>&times;</span>
                <PaymentForm onClose={this.handlePaymentFormClose} />
              </div>
            </div>
          )}
        </div>

        {coupon.exchangeType && coupon.exchangeType.toLowerCase() === "free" && (
          <div className="couponCodeButton">
            <button className="codeButton" onClick={this.handleShowCouponCode}>
              {showCouponCode ? (
                <div>
                  {coupon.couponCode}
                </div>
              ) : (
                <div>
                  <FaLock /> Show Coupon Code
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CouponDetails;
