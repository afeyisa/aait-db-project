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




    const Invetory = () => {

      const [searchQuery, setSearchQuery] = useState('');
      const [books, setBooks] = useState([]);
      const [by ,setBy] =useState('/searchinvbyisbn');
      const [queryName, setquery] =useState('isbn');
      const [responseMessage, setresponseMessage] = useState('');


      const handleChange = (event) => {
        setSearchQuery(event.target.value);
      };


      const handlecombo = (event) => {
        setBy(event.target.value)
        const selectedValue = event.target.value;
  
        if (selectedValue === "/searchinvbyauthor") {
          handleQueryName("author");
        } else if (selectedValue === "/searchinvbyisbn") {
          handleQueryName("isbn");
        } else if (selectedValue === "/searchinvbytitle") {
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
        <di>
        
        <div className='methor' >
        <div className="container" style={{}}>
          <h1 className="header">Inventory</h1>
          <div className='top'>
          <div className="search-container">
       
          <select id="combo-box" className="combo-box" value={by} onChange={handlecombo}>
            <option value="" disabled>By</option>
            <option value="/searchinvbyauthor">Author</option>
            <option value="/searchinvbyisbn">ISBN</option>
            <option value="/searchinvbytitle">Title</option>
           
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
            
            <div className ='item-lis'>
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
          <Link to="/newbook" className='add-button-link'> +add book</Link> 
        </button>
        <button className = "add-button" >
          <Link to="/restock" className='add-button-link'> +restock</Link> 
        </button> 
        <button className = "add-button" >
          <Link to="/mover" className='add-button-link'> mover</Link> 
        </button>
        
        </div>
        </div>

        
        </di>
      );
    };


    export default Invetory;
