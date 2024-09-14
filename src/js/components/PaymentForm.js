import React, { Component } from "react";

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolderName: "" // New field for card holder's name
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Implement payment processing logic here
    console.log("Payment details submitted:", this.state);
    // Clear form fields after submission
    this.setState({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolderName: ""
    });
    // Close payment form
    this.props.onClose();
  }

  render() {
    return (
      <div className="paymentForm">
        <h2>Enter Payment Details</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="formGroup">
            <label htmlFor="cardNumber">Card Number:</label>
            <input className="paymentinput"
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={this.state.cardNumber}
              onChange={this.handleInputChange}
              placeholder="Enter card number"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input className="paymentinput"
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={this.state.expiryDate}
              onChange={this.handleInputChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="cvv">CVV:</label>
            <input className="paymentinput"
              type="text"
              id="cvv"
              name="cvv"
              value={this.state.cvv}
              onChange={this.handleInputChange}
              placeholder="CVV"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="cardHolderName">Cardholder's Name:</label>
            <input className="paymentinput"
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={this.state.cardHolderName}
              onChange={this.handleInputChange}
              placeholder="Enter cardholder's name"
              required
            />
          </div>
          <button type="submit">Submit Payment</button>
        </form>
      </div>
    );
  }
}

export default PaymentForm;
