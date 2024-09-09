import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DonationsList() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch the donations from the API
    axios.get('http://127.0.0.1:8000/api/donations/')
      .then(response => {
        setDonations(response.data);
      })
      .catch(error => {
        console.log('Error fetching the donations:', error);
      });
  }, []);

  return (
    <div>
      <h2>Donations</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Donor Email</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Method</th>
            {/* <th>Receipt Number</th> */}
          </tr>
        </thead>
        <tbody>
          {donations.map(donation => (
            <tr key={donation.id}>
              <td>{donation.user_email}</td> 
              <td>${donation.amount}</td>
              <td>{new Date(donation.date).toLocaleDateString()}</td>
              <td>{donation.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationsList;
