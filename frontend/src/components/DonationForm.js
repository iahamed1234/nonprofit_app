import React, { useState } from 'react';
import axios from 'axios';

function DonationForm() {
  const [user, setUser] = useState(''); // Assuming you'll provide the user ID in some way
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the donation object
    const donationData = {
      user, // You need to get the logged-in user's ID dynamically or pass this
      amount: parseFloat(amount),
      payment_method: paymentMethod,
      receipt_number: receiptNumber,
    };

    // Make an API request to submit the donation
    axios.post('http://127.0.0.1:8000/api/donations/', donationData)
      .then(response => {
        setSuccessMessage('Donation submitted successfully!');
        setErrorMessage('');
        // Clear the form
        setAmount('');
        setPaymentMethod('');
        setReceiptNumber('');
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
          <label htmlFor="user">User ID:</label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
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
          <label htmlFor="receiptNumber">Receipt Number:</label>
          <input
            type="text"
            id="receiptNumber"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
}

export default DonationForm;
