import './styles/inventory.css'

import { Link } from "react-router-dom";
import React, {useState } from 'react';



let bookId ;
const setBookIndex =(data)=>{
  bookId = data;
};
// Custom hook for components that can only read the data
export function useReadOnlyData (){
  //const { data } = useContext(DataContext);
  return bookId;
};




    const Retail = () => {

      const [searchQuery, setSearchQuery]         = useState('');
      const [books, setBooks]                     = useState([]);
      const [by ,setBy]                           = useState('/searchretaibyisbn');
      const [queryName, setquery]                 = useState('');
      const [responseMessage, setresponseMessage] = useState('');


      const handleChange = (event) => {
        setSearchQuery(event.target.value);
      };


      const handlecombo = (event) => {
        setBy(event.target.value)
        const selectedValue = event.target.value;
  
        if (selectedValue === "/searchretaibyauthor") {
          handleQueryName("author");
        } else if (selectedValue === "/searchretaibyisbn") {
          handleQueryName("isbn");
        } else if (selectedValue === "/searchretailbytitle") {
          handleQueryName("title");
        }
        
      };
      const handleQueryName =(event)=>{
        setquery(event)
        console.log(event);
      }
      

      // it posts book id to server and get list of books
      const handleSearch = () => {
        fetchInventory();
      };

      const handKeyPress = (event)=>{
        if(event.key ==='Enter'){
          handleSearch();
        }
        if(event.key ==='Backspace'){
          setBooks([]);
        }
      }

      const handleLinkClick = (id) => {
        setBookIndex(id);
      };


      
      const fetchInventory = async () => {
        // Format the URL with the query string
        const url = new URL('http://127.0.0.1:5000'+by);
        url.searchParams.append(queryName, searchQuery);
      
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
            setBooks(data);
            setresponseMessage('');

          }
        } catch (error) {
          setresponseMessage('There was a problem with the fetch operation:');
        }
      };

      return (
        <div className='methor' >
        <div className="container">
          <h1 className="header">Retail Area</h1>
          <div className='top'>
          <div className="search-container">
       
          <select id="combo-box" className="combo-box" value={by} onChange={handlecombo}>
            <option value="" disabled>By</option>
            <option value="/searchretaibyauthor">Author</option>
            <option value="/searchretaibyisbn">ISBN</option>
            <option value="/searchretailbytitle">Title</option>
           
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
            
            <div className='item-lis'>
            {responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}  

            <ul className="item-list">
              {books.map((book) => (
                <div className='book-list' key={book.isbn}>
                  <button value={book.isbn} className="item" onClick={() => handleLinkClick(book.isbn)}>
                    <Link to="/description" onClick={() => handleLinkClick(book.isbn)} className='link'>
                      {book.title} quantity {book.quantity} on shelf number{book.shelf_number} level{book.shelf_level}
                    </Link>
                  </button>
                </div>
              ))}
          </ul>
          </div>
        </div>
        <div style={{flex:1,marginLeft:'5%'}}> 
            <button className = "add-button" >
              <Link to="/mover" className='add-button-link'> Bringer</Link> 
            </button>
            <button className = "add-button" >
              <Link to="/sell-book" className='add-button-link'> sell</Link> 
            </button>
            
            <button className = "add-button" >
              <Link to="/rents" className='add-button-link'> Rent </Link> 
            </button>
            </div>
            
        </div>
      );

    };


    export default Retail;
