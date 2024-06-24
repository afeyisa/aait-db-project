import './styles/newbook.css';
import { useNavigate } from 'react-router-dom';
import React, { useRef,useState} from 'react';

const Mover = () => {
  const navigate = useNavigate();

    const [isbn,          setISBN]                       = useState('');
    const [quantity,        setQuentiry]                 = useState('');
    const [shelf_number,   setShelfNumber]               = useState('');
    const [shelf_level,    setShelfLevel]                = useState('');
    const [retail_shelfnumber,   setRetailShelfNumber]   = useState('');
    const [retail_shelflevel,    setREtailShelfLevel]    = useState('');

    const [responseMessage, setresponseMessage] = useState('');
    
    
    const isbnRef       = useRef(null);
    const quentityRef   = useRef(null);
    const shelfNoRef    = useRef(null);
    const shelfLevRef   = useRef(null);

    const handleClearInput = () => {
      // Clear the input field 
      isbnRef.current.value          = '';
      quentityRef.current.value      = '';
      shelfNoRef.current.value       = '';
      shelfLevRef.current.value      ='';
      // Clear the state
      setQuentiry('');
      setISBN('');
      setShelfNumber('');
      setShelfLevel('');
    };

    const handleISBNChange = (event) => {
      setISBN(event.target.value);
    };


    const handleQuantity =(event)=>{
      setQuentiry(event.target.value);

    };


    const handleShelfNumber =(event)=>{
      setShelfNumber(event.target.value);

    };


    const handleShelflevel = (event) => {
        setShelfLevel(event.target.value);
   };

   const handleRetailShelf =(event)=>{
    console.log(event.target.value);
    setRetailShelfNumber(event.target.value);

   }
   const handleRetailLevel = (event)=>{
    setREtailShelfLevel(event.target.value);

   }
   const handleSubmit = async () => {
            
    
           // setresponseMessage('');

            const invtorydata = {'isbn':isbn,'shelf_number': shelf_number,'shelf_level':shelf_level};
            const retaildata = {'isbn':isbn,'quantity':quantity,'shelf_number': retail_shelfnumber,'shelf_level':retail_shelflevel};

            const url = 'http://127.0.0.1:5000/mover';
            
            // Options for the fetch request
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({'retail':retaildata,'inventory':invtorydata})
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
                  }
            };
               
            


  return (
    <div id="container">
      <h1 className="header">You are taking your book from inventory to retail area</h1>
      <div>
        <div className="add-new-book" >
           {responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}       
           <div style={{display: 'flex',flexDirection: 'row', justifyContent:' space-between'}}>
              <div className='mover-inner-div'>
                    <label>ISBN</label>
                    <input required ref={isbnRef} onChange={handleISBNChange} type="text" name="isbn"  />
                </div>
                <div className='mover-inner-div'>
                    <label>Quantity</label>
                    <input required style={{height:"40px"}} ref={quentityRef} onChange = {handleQuantity} type="number" name="quantity"  />
                </div>
                </div>
            <div id='mover-container'>
            <div className='mover-inner-div'>
                <p> From</p>
                <div>
                    <label>Inventory Shelf Number</label>
                    <input required  style={{height:"40px"}} ref={shelfNoRef} onChange = {handleShelfNumber} type="number" name="shelf_number"  />
                </div>
                <div>
                    <label>Inventory Shelf level</label>
                    <input required style={{height:"40px"}} ref={shelfLevRef} onChange={handleShelflevel} type="number" name="shelf_level"/>
                </div>
                
                </div>

                <div className='mover-inner-div'>
                    <p> To</p> 
                <div>
                    <label>Retail Shelf Number</label>
                    <input required  style={{height:"40px"}} ref={shelfNoRef} onChange = {handleRetailShelf} type="number" name="shelf_number"  />
                </div>
                <div>
                    <label>Retail Shelf level</label>
                    <input required style={{height:"40px"}} ref={shelfLevRef} onChange={handleRetailLevel} type="number" name="shelf_level"/>
                </div>
                </div>
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

export default Mover;
