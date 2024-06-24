import './styles/inventory.css'

import { Link } from "react-router-dom";
import React, {useState,useEffect } from 'react';


    const Customer = () => {

      const [searchQuery, setSearchQuery] = useState('');
      const [books, setBooks] = useState([]);
      const [by ,setBy] =useState('/searchinvbyisbn');
      const [query, setquery] =useState('');
      const [responseMessage, setresponseMessage] = useState('');

      const [customers, setCustomers] = useState([]);

      useEffect(() => {
        const fetchCustomers = async () => {
            const url = 'http://127.0.0.1:5000/customers';

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data) {
                    setCustomers(data);
                }
            } catch (error) {
                setresponseMessage('There was a problem with the network or server');
            }
        };

        fetchCustomers();
    }, []);


      const handleChange = (event) => {
        setSearchQuery(event.target.value);
      };


      const handlecombo = (event) => {
        setBy(event.target.value)
        const selectedValue = event.target.value;
  
        if (selectedValue === "/searchinvbyauthor") {
          handleQueryName("author");
          handleQueryName("title");
        }
        
      };
      const handleQueryName =(event)=>{
        setquery(event)
      }
      

      // it posts book id to server and get list of books
      const handleSearch = () => {
        fetchInventory();
      };

      const handKeyPress = (event)=>{
        if(event.key ==='Enter'){
          handleSearch();
        }
        if(event.key === 'Backspace'){
          setBooks([]);
        }
      }

    


      
      const fetchInventory = async () => {
        // Format the URL with the query string
        const url = new URL('http://127.0.0.1:5000/getcustomer');
        url.searchParams.append('query', searchQuery);
      
        // Options for the fetch request
        const options = {
          method: 'GET'
        };
      
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if(data){
            setCustomers(data);
            setresponseMessage('');

          }
        } catch (error) {
          setresponseMessage('There was a problem with the fetch operation:');
        }
      };

      return (
        <div> 
        
        <div className='methor' >
        <div className="container" style={{}}>
          <h1 className="header">Customer</h1>
          <div className='top'>
          <div className="search-container">
       
          <select id="combo-box" d className="combo-box" value={by} onChange={handlecombo}>
            <option value="" disabled>By</option>
            <option value="/searchinvbyauthor">CID</option>
            
           
          </select>
        
            <input 
              type="text"
              placeholder="type to search..."
              value={searchQuery}
              onChange={handleChange}
              onKeyDown={handKeyPress}
              autoFocus autoComplete='off'
              className="search-input"
            />

            <button className="search-button" onClick={handleSearch} >
            Go
            </button>
          </div >
        
            </div>
        </div>
        
        <div style={{flex:1,marginRight:'5%', paddingLeft:'5%'}}> 
        <button className = "add-button" >
          <Link to="/newcustomer" className='add-button-link'> +add customer</Link> 
        </button>
        </div>
        </div>


<div className ='item-li' style={{marginLeft:'25%',justifyContent:'center'}}>
{responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}  

<table className="table">
<thead className="thead-dark">
    <tr>
        <th style={{ width: '50px' }} scope="col">#</th>
        <th style={{ width: '100px' }} scope="col">ID</th>
        <th style={{ width: '100px' }} scope="col">First Name</th>
        <th style={{ width: '100px' }} scope="col">Last Name</th>
        <th style={{ width: '150px' }} scope="col">Email</th>
        <th style={{ width: '150px' }} scope="col">Phone</th>
        <th style={{ width: '100px' }} scope="col" className="text-end">Action</th>
    </tr>
</thead>
<tbody>
    {customers.length > 0 ? (
        customers.map((customer, index) => (
            <tr key={customer.customerid}>
                <th scope="row">{index + 1}</th>
                <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.customerid}</td>
                <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.firstname}</td>
                <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.lastname}</td>
                <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.email}</td>
                <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.phone}</td>
                <td className="text-end">
                    <a href="#" type="button" className="btn btn-light btn-small"><i className="bi bi-pencil"></i> update</a>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6" className="text-center">No customers found</td>
        </tr>
    )}
</tbody>
</table>
</div>

</div>
        
      );
    };


    export default Customer;
