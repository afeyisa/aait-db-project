import React, { useRef,useState} from 'react';
import './styles/newbook.css';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
  const navigate = useNavigate();

    const  [title, setTitle]                 = useState('');
    const  [author, setauthor]               = useState('');
    const  [genre, setgenre]                 = useState('');
    const  [description, setdescription]     = useState('');
    const  [price, setprice]                 = useState('');
    const  [rent_rate, setrent_rate]         = useState('');
    const [isbn,           setISBN]          = useState('');
    const [quantity,       setQuantity]      = useState('');
    const [shelf_number,   setShelfNumber]   = useState('');
    const [shelf_level,    setShelfLevel]    = useState('');
    const [responseMessage, setresponseMessage] = useState('');
    
    
    const isbnRef       = useRef(null);
    const quentityRef   = useRef(null);
    const shelfNoRef    = useRef(null);
    const titleRef   = useRef(null);
    const authorRef   = useRef(null);
    const priceRef   = useRef(null);
    const rent_rateRef   = useRef(null);
    const descriptionRef   = useRef(null);

    const genreRef   = useRef(null);

    const shelf_levelRef   = useRef(null);

    const handleClearInput = () => {
      // Clear the input field 
      isbnRef.current.value          = '';
      quentityRef.current.value      = '';
      shelfNoRef.current.value       = '';
      shelf_levelRef.current.value      ='';
      genreRef.current.value      ='';
      titleRef.current.value      ='';
      authorRef.current.value      ='';
      descriptionRef.current.value      ='';
      rent_rateRef.current.value      ='';
      priceRef.current.value      ='';


      // Clear the state
      setQuantity('');
      setISBN('');
      setShelfNumber('');
      setShelfLevel('');
      setrent_rate('');
      setprice('');
      setTitle('');
      setauthor('');
      setdescription('');
      setgenre('');
      
    };
   
        
      const handletitle=(event)=>{
        setTitle(event.target.value);
      };
      const handleauthor =(event)=>{
        setauthor(event.target.value);
      };
      const handlegenre =(event)=>{
        setgenre(event.target.value);
      };
      const handlediscription =(event)=>{
        setdescription(event.target.value);
      };

      const handleprice =(event)=>{
        setprice(event.target.value);
      };
      const handlerent =(event)=>{
        setrent_rate(event.target.value);
      }

      const handleISBNChange = (event) => {
        setISBN(event.target.value);
      };


      const handleQuantity =(event)=>{
        setQuantity(event.target.value);
      };


      const handleShelfNumber =(event)=>{
        setShelfNumber(event.target.value);
      };


      const handleShelflevel = (event) => {
          setShelfLevel(event.target.value);
    };


   const handleSubmit = async () => {
            
    
           // setresponseMessage('');

            const inventory = {'isbn':isbn,'quantity':quantity,'shelf_number': shelf_number,'shelf_level':shelf_level};
            const book ={
              "isbn":isbn,  
              'title':title,
              'author':author,
              'genre':genre,
              'description':description,
              'price':price,
              'rent_rate':rent_rate};
            const url = 'http://127.0.0.1:5000/newbook';
            
            // Options for the fetch request
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({'inventory':inventory,'book':book})
            };
           

                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    if(data){
                        setresponseMessage(data.message);
                        handleClearInput();
                       
                    }
                    
                  } catch (error) {
                    setresponseMessage('there was a problem with newtork or server');
                    console.error('There was a problem with the fetch operation:', error);
                  }
            };
               

  return (
    <div id="container">
      <h1 className="header">Add new book to Inventory</h1>
      <div>
        <div className="add-new-book" >
        {responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}  
              
              <div id='newbook-form-container'>   
               <div className='newbook-inner'>
                <div>
                <label>Title</label>
                    <input required type="text" ref={titleRef} onChange={handletitle} name="title"  />
                </div>
                <div>
                    <label>Author</label>
                    <input required type="text" ref={authorRef} onChange={handleauthor} name="author" />
                </div>
                <div>
                    <label>ISBN</label>
                    <input required ref={isbnRef} onChange={handleISBNChange} type="text" name="isbn"  />
                </div>
                
                <div>
                    <label>Genre</label>
                    <input required type="text" ref={genreRef}  onChange={handlegenre} name="genre"  />
                </div>

                <div>
                    <label>Quantity</label>
                    <input style={{height:"40px"}} required ref={quentityRef} onChange = {handleQuantity} type="number" name="quantity"  />
                </div>
                </div>

                <div   className='newbook-inner'> 
                <div>
                    <label>Price</label>
                    <input style={{height:"40px"}} required type="number" ref={priceRef} onChange={handleprice} name="price"  />
                </div>
                <div>
                    <label>rent_rate</label>
                    <input  style={{height:"40px"}} type="number"  ref={rent_rateRef} onChange={handlerent} required  name="rent_rate" />
                </div>    
                 
                <div>
                    <label>Shelf Number</label>
                    <input style={{height:"40px"}} required ref={shelfNoRef} onChange = {handleShelfNumber} type="number" name="shelf_number"  />
                </div>
                <div>
                    <label>Shelf level</label>
                    <input style={{height:"40px"}}required ref={shelf_levelRef} onChange={handleShelflevel} type="number" name="shelf_level"/>
                </div>
                </div>
                </div>
                <div>
                    <label>Description</label>
                    <textarea id='textarea' ref={descriptionRef} onChange={handlediscription} required type="text" name="description" />
                </div>
               
            <div id="button-container">
            <button type="button" className="go-back" onClick={() => navigate(-1)}>
                Go Back
              </button>
              
              <button id='submiit-restock' onClick={handleSubmit} >Summit</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NewBook;
