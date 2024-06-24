import React, { useState } from "react";
import "./styles/sell.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SaleForm = () => {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isbn: "",
    date: "",
    quantity: "",
    price: "",
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
        "http://localhost:5000/booksell",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      setFormData({
        isbn: "",
        date: "",
        quantity: "",
        price: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
   
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Sale Form</h2>
      <input
        type="text"
        id="isbn"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={handleChange}
        className="form-input"
      />
   
      <input
        type="text"
        id="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        id="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="form-input"
      />
         <input style={{width:'34%'}}
        type="date"
        id="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
        className="form-input"
      />
      <div id="button-container">
    <button type="button" className="go-back" onClick={() => navigate(-1)}>
     Go Back
   </button>
      <button style={{marginRight:'10%'}} type="submit" className="form-button">
        Submit
      </button>
      </div>
    
    </form>
     
  
  );
};

export default SaleForm;