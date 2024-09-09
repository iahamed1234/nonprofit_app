import React, { useState } from 'react';
import axios from 'axios';

function DonationForm() {
  const [email, setEmail] = useState(''); // User email instead of ID
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCard, setCreditCard] = useState('4111111111111111');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the donation object
    const donationData = {
      email, // Use email instead of user ID
      amount: parseFloat(amount),
      payment_method: paymentMethod,
    };

    // Make an API request to submit the donation
    axios.post('http://127.0.0.1:8000/api/donations/', donationData)
      .then(response => {
        setSuccessMessage('Donation submitted successfully!');
        setErrorMessage('');
        // Clear the form
        setAmount('');
        setPaymentMethod('');
        setCreditCard('4111111111111111'); // Reset credit card for testing
      })
      .catch(error => {
        setErrorMessage('Error submitting donation. Please try again.');
        setSuccessMessage('');
        console.error('There was an error submitting the donation:', error);
      });
  };

  return (
    <div>
      <h2>Make a Donation</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Credit Card Number:</label>
          <input
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
}

export default DonationForm;
