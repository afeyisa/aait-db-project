import './styles/inventory.css'

// import { Link } from "react-router-dom";
import {Hire,Fire, AboutEmoloyee,Payment,CheckPayment} from './employeeComponent';
import React, {useState } from 'react';
// import { faL } from '@fortawesome/free-solid-svg-icons/faL';








    const Employee = () => {

      const [searchQuery, setSearchQuery] = useState('');
      const [responseMessage, setresponseMessage] = useState('');

      const [showAbout, setShowAbout] = useState(false);
      const [showHire, setShowHIre] = useState(false);
      const [showFire, setShowFire] = useState(false);
      const [showPayment, setShowPayment] = useState(false);
      const [showCheckPayment, setShowcheckPayment] = useState(false);

        const handleAbout = () => {
            setShowAbout(true);
            setShowFire(false);
            setShowHIre(false);
            setShowPayment(false);
            setShowcheckPayment(false);
        };


        const handleFire = () => {
            setShowAbout(false);
            setShowFire(true);
            setShowHIre(false);
            setShowPayment(false);
            setShowcheckPayment(false);
        };
        const handleHire = () => {
            setShowAbout(false);
            setShowFire(false);
            setShowHIre(true);
            setShowPayment(false);
            setShowcheckPayment(false);
        };

        const handlePay = () => {
            setShowAbout(false);
            setShowFire(false);
            setShowHIre(false);
            setShowPayment(true);
            setShowcheckPayment(false);
        };

        const handlecheckPay = () => {
            setShowAbout(false);
            setShowFire(false);
            setShowHIre(false);
            setShowPayment(false);
            setShowcheckPayment(true);
        };


      const handleChange = (event) => {
        setSearchQuery(event.target.value);
      };
      
      // it posts book id to server and get list of books
      const handleSearch = () => {
        handleAbout();
      };

      const handKeyPress = (event)=>{
        if(event.key ==='Enter'){
          handleAbout();
        }
      
      };

      return (
        
        <div className='methor' >
        <div className="container" style={{}}>
          <h1 className="header">Employee</h1>
          <div className='top'>
          <div className="search-container">
       
          <p id="combo-box"  className="combo-box" >ID
          </p>
        
            <input 
              type="text"
              placeholder="about emoloyee..."
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

           
          <di>
            
          {showAbout && <AboutEmoloyee ID ={searchQuery} />}
          {showFire && <Fire  />}
          {showHire && <Hire  />}
          {showCheckPayment && <CheckPayment  />}
          {showPayment && <Payment/>}


          </di>
          </div>
        </div>


        
        
        <div style={{flex:1,marginLeft:'5%'}}> 
        <button className = "add-button" onClick={handleHire} style={{height:'50px'}} >
           hire
        </button>
        <button className = "add-button"  onClick={handleFire}>
          fire
        </button> 
       
        <button className = "add-button" onClick={handlecheckPay} >
           check Payment 
        </button>
        <button className = "add-button" onClick={handlePay}>
          Payment 
        </button>
        </div>
        </div>
        
      );
    };


    export default Employee;
