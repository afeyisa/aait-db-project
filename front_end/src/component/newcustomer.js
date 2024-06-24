import React, { useState } from 'react';
import './styles/newcustomer.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const NewCustomer = () => {
    const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerid: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/newcustomer",
        customer
      );
      console.log("Form submitted successfully:", response.data);
      setCustomer({
        customerid: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: ''
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
            value={customer.customerid} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input 
            type="text" 
            id="firstname" 
            name="firstname" 
            value={customer.firstname} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input 
            type="text" 
            id="lastname" 
            name="lastname" 
            value={customer.lastname} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input 
            type="text" 
            id="phone" 
            name="phone" 
            value={customer.phone} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={customer.email} 
            onChange={handleChange} 
          />
        </div>
        <div id="button-container">
            <button type="button" className="go-back" onClick={() => navigate(-1)}>
                Go Back
              </button>
              
              <button id='submiit-restock' onClick={handleSubmit} >Summit</button>
        
          </div>
      </form>
    </div>
  );
};

export default NewCustomer;
