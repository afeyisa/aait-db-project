import './styles/inventory.css'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Rent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [by, setBy] = useState('/searchinvbyisbn');
  const [query, setQuery] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const url = 'http://127.0.0.1:5000/getrents';

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
        setResponseMessage('There was a problem with the network or server');
      }
    };

    fetchCustomers();
  }, []);

  async function handleButton(isvisible, customerid, isbn, rentdate) {
    console.log(rentdate);
    const url = 'http://127.0.0.1:5000/return';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'customerid': customerid, 'isbn': isbn, 'rentdate': rentdate }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data) {
        console.log(data)
        setCustomers(customers.map(c => c.customerid === customerid && c.isbn === isbn && c.rentdate === rentdate ? { ...c, isreturned: true } : c));
      }
    } catch (error) {
      setResponseMessage('There was a problem with the network or server');
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCombo = (event) => {
    setBy(event.target.value);
    const selectedValue = event.target.value;

    if (selectedValue === "/searchinvbyauthor") {
      handleQueryName("author");
      handleQueryName("title");
    }
  };

  const handleQueryName = (event) => {
    setQuery(event);
  }

  const handleSearch = () => {
    fetchInventory();
  };

  const handKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    if (event.key === 'Backspace') {
      setBooks([]);
    }
  }

  const fetchInventory = async () => {
    const url = new URL('http://127.0.0.1:5000/getcustomer');
    url.searchParams.append('query', searchQuery);

    const options = {
      method: 'GET'
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data) {
        setCustomers(data);
        setResponseMessage('');
      }
    } catch (error) {
      setResponseMessage('There was a problem with the fetch operation:');
    }
  };

  return (
    <div>
    <div className='methor'>
      <div className="container" style={{}}>
        <h1 className="header">Rent</h1>
        <div className='top'>
          <div className="search-container">
            <select id="combo-box" className="combo-box" value={by} onChange={handleCombo}>
              <option value="" disabled>By</option>
              <option value="/searchinvbyauthor">CID</option>
            </select>

            <input
              type="text"
              placeholder="type to search..."
              value={searchQuery}
              onChange={handleChange}
              onKeyDown={handKeyPress}
              autoFocus
              autoComplete='off'
              className="search-input"
            />

            <button className="search-button" onClick={handleSearch}>
              Go
            </button>
          </div>
        </div>

      
      </div>

      <div style={{flex:1,marginRight:'5%', paddingLeft:'5%'}}> 
              <button className="add-button">
                <Link to="/rentform" className='add-button-link'> + Add Rent</Link>
            </button>
            </div>
    </div>
    <div className ='item-li' style={{marginLeft:'10%',justifyContent:'center'}}>
    {responseMessage && <p id='successMessage' style={{ color: 'green', fontWeight: 'bolder' }}>{responseMessage}</p>}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '150px'}} scope="col">#</th>
                <th style={{ width: '150px'}} scope="col">CID</th>
                <th style={{ width: '150px'}} scope="col">Isbn</th>
                <th style={{ width: '150px'}} scope="col">Rented Date</th>
                <th style={{ width: '150px'}} scope="col">Return Date</th>
                <th style={{  width: '150px'}} scope="col">$Amount Paid</th>
                <th style={{  width: '150px'}} scope="col">Quantity</th>
                <th style={{ width: '150px'}} scope="col" className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={`${customer.customerid}-${customer.isbn}-${customer.rentdate}`}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.customerid}</td>
                    <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.isbn}</td>
                    <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.rentdate}</td>
                    <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.returndate}</td>
                    <td style={{ paddingRight: '20px',textAlign:'center' }}>{customer.amount_paid}</td>
                    <td style={{ paddingRight: '20px' ,textAlign:'center'}}>{customer.quantity}</td>
                    <td className="text-end">
                      {!customer.isreturned && (
                        <button
                          onClick={() => handleButton(customer.isreturned, customer.customerid, customer.isbn, customer.rentdate)}
                          className="return"
                          style={{ borderRadius: '4px', borderBlockColor: 'none', backgroundColor: '#22a6b3', width: '70px' }}
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

</div>
  );
};

export default Rent;
