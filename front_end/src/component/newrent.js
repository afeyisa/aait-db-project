import React, { useState } from "react";
import axios from "axios";
import "./styles/RentForm.css"; // Import the CSS file
import './styles/newcustomer.css'
import { useNavigate } from 'react-router-dom';

const RentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerid: "",
    isbn: "",
    rentdate: "",
    returndate: "",
    quantity: "",
    amount_paid: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/createrent",
        formData
      );
      console.log("Form submitted successfully:", response.data);

      setFormData({
        customerid: "",
        isbn: "",
        rentdate: "",
        returndate: "",
        quantity: "",
        amount_paid: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="customer-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerid">Customer ID:</label>
          <input 
            type="text" 
            id="customerid" 
            name="customerid" 
            value={formData.customerid}
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">Book ISBN:</label>
          <input 
            type="text" 
            id="isbn" 
            name="isbn" 
            value={formData.isbn}
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rentdate">Rent Date:</label>
          <input 
            type="date" 
            id="rentdate" 
            name="rentdate" 
            value={formData.rentdate}
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returndate">Return Date:</label>
          <input 
            type="date" 
            id="returndate" 
            name="returndate" 
            value={formData.returndate}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={formData.quantity}
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount_paid">Amount Paid:</label>
          <input 
            type="number" 
            id="amount_paid" 
            name="amount_paid" 
            value={formData.amount_paid}
            onChange={handleChange} 
            required
          />
        </div>
        <div id="button-container">
          <button type="button" className="go-back" onClick={() => navigate(-1)}>
              Go Back
          </button>
          <button type="submit" id='submit-rent'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RentForm;
