import './styles/newbook.css';
import { useNavigate } from 'react-router-dom';
import React, { useRef,useEffect,useState} from 'react';




const Hire = () => {



    const [employeeId,   setEployeeId]         = useState('');
    const [firstName,   setQuentiry]           = useState('');
    const [lastName,   setShelfNumber]          = useState('');
    const [phone,    setShelfLevel]              = useState('');
    const [email,   setRetailShelfNumber]   = useState('');
    const [employeeRole,    setREtailShelfLevel]    = useState('');
    const [salary, setSalary] = useState('');

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
      setEployeeId('');
      setShelfNumber('');
      setShelfLevel('');
    };

    const handleISBNChange = (event) => {
      setEployeeId(event.target.value);
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
    setRetailShelfNumber(event.target.value);

   }
   const handleRetailLevel = (event)=>{
    setREtailShelfLevel(event.target.value);

   }

   const handleSalary = (event)=>{
    setSalary(event.target.value);
   }
   const handleSubmit = async () => {
            
    
   

            const empLoyeedata = {'employeeId':employeeId,'firstName': firstName,'lastName':lastName,'phone':phone,'email':email,'employeeRole':employeeRole,'salary':salary};

            const url = 'http://127.0.0.1:5000/hire';
            
            // Options for the fetch request
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(empLoyeedata)
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
      <h1 className="header">New Employee Information</h1>
      <div>
        <div className="add-new-book" >
           {responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}       
           <div style={{display: 'flex',flexDirection: 'row', justifyContent:' space-between'}}>
              <div className='mover-inner-div'>
                    <label>ID</label>
                    <input required ref={isbnRef} onChange={handleISBNChange} type="text" name="employeeId"  />
                </div>
                <div className='mover-inner-div'>
                    <label>First Name</label>
                    <input required style={{height:"40px"}} ref={quentityRef} onChange = {handleQuantity} type="txt" name="firstName"  />
                </div>
                </div>
            <div id='mover-container'>
            <div className='mover-inner-div'>
                <div>
                    <label>last Name</label>
                    <input required  style={{height:"40px"}} ref={shelfNoRef} onChange = {handleShelfNumber} type="text" name="lastname"  />
                </div>
                <div>
                    <label>phone number </label>
                    <input required style={{height:"40px"}} ref={shelfLevRef} onChange={handleShelflevel} type="phone" name="shelf_level"/>
                </div>
                <div>
                    <label>Salary</label>
                    <input required style={{height:"40px"}} ref={shelfLevRef} onChange={handleSalary} type="number" name="salary"/>
                </div>
                
                </div>

                <div className='mover-inner-div'>
                   
                <div>
                    <label>Email</label>
                    <input required  style={{height:"40px"}} ref={shelfNoRef} onChange = {handleRetailShelf} type="email" name="email"  />
                </div>
                <div>
                    <label>Employee Role</label>
                    <input required style={{height:"40px"}} ref={shelfLevRef} onChange={handleRetailLevel} type="text" name="shelf_level"/>
                </div>
               
                </div>
                </div>

            <div id="button-container">
            
              
              <button id='submiit-restock' onClick={handleSubmit} >Summit</button>
        
          </div>
          
          
        </div>
        
      </div>
    </div>
  );
};



const Fire = () => {
  
      const [employeeId, setEployeeId]   = useState('');
  
      const [responseMessage, setresponseMessage] = useState('');
      const isbnRef       = useRef(null);
      const handleClearInput = () => {
        // Clear the input field 
        isbnRef.current.value          = '';
        
        // Clear the state
        
        setEployeeId('');
       
      };
  
      const handleISBNChange = (event) => {
        setEployeeId(event.target.value);
      };
  
  
      
  
  
    
     const handleSubmit = async () => {
  
              const EmpId = {'employeeId':employeeId};
  
              const url = 'http://127.0.0.1:5000/fire';
              
              // Options for the fetch request
              const options = {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(EmpId)
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
        <h1 className="header">Fire Employee</h1>
        <div>
          <div className="add-new-book" >
             {responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}       
             <div style={{display: 'flex',flexDirection: 'row', justifyContent:' space-between'}}>
                <div className='mover-inner-div'>
                      <label>emoloyee Id  </label>
                      <input required ref={isbnRef} placeholder='Emp Id' onChange={handleISBNChange} type="text" name="isbn"  />
                  </div>
        
                  </div>
  
              <div id="button-container">
                <button id='submiit-restock' onClick={handleSubmit} >Summit</button>
          
            </div>
            
            
          </div>
          
        </div>
      </div>
    );
  };



  const CheckPayment = () => {
  
      const [isbn,          setEployeeId]                       = useState('');
      const [quantity,        setQuentiry]                 = useState('');
      const [shelf_number,   setShelfNumber]               = useState('');
     
  
      const [responseMessage, setresponseMessage] = useState('');
      
      
      const isbnRef       = useRef(null);
      const quentityRef   = useRef(null);
      const shelfNoRef    = useRef(null);
      
  
      const handleClearInput = () => {
        // Clear the input field 
        isbnRef.current.value          = '';
        quentityRef.current.value      = '';
        shelfNoRef.current.value       = '';
        // Clear the state
        setQuentiry('');
        setEployeeId('');
        setShelfNumber('');
      };
  
      const handleISBNChange = (event) => {
        setEployeeId(event.target.value);
      };
  
  
      const handleQuantity =(event)=>{
        
       
        const [year, month] = event.target.value.split('-');
        setQuentiry(year);
        setShelfNumber(month);
        console.log(month);
  
      };
  
  
      
      
  
     const handleSubmit = async () => {
            
              const checkp = {'employeeId':isbn,'month': shelf_number,'year':quantity};
  
              const url = 'http://127.0.0.1:5000/checkpayment';
              
              // Options for the fetch request
              const options = {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(checkp)
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
        <h1 className="header">check payment</h1>
        <div>
          <div className="add-new-book" >
             {responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}       
             <div style={{display: 'flex',flexDirection: 'row', justifyContent:' space-between'}}>
                <div className='mover-inner-div'>
                      <label>Employee Id</label>
                      <input  placeholder='id'required ref={isbnRef} onChange={handleISBNChange} type="text"   />
                  </div>
                  <div className='mover-inner-div'>
                      <label>month</label>
                      <input required style={{height:"40px"}} ref={quentityRef} onChange = {handleQuantity} type="MOnth"  />
                  </div>
                  </div>
              <div id='mover-container'>
              <div className='mover-inner-div'>
                 
                  </div>
  
                
                  </div>
  
              <div id="button-container">
              
                
                <button id='submiit-restock' onClick={handleSubmit} >check</button>
          
            </div>
            
            
          </div>
          
        </div>
      </div>
    );
  };



  const Payment = ({ID,salary}) => {
    const navigate = useNavigate();
  
      const [isbn,          setISBN]                       = useState(ID);
      const [quantity,        setQuentiry]                 = useState(salary);
      
     
  
      const [responseMessage, setresponseMessage] = useState('');
      
      
      const isbnRef       = useRef(null);
      const quentityRef   = useRef(null);
      
  
      const handleClearInput = () => {
        // Clear the input field 
        isbnRef.current.value          = '';
        quentityRef.current.value      = '';
       
        // Clear the state
        setQuentiry('');
        setISBN('');
       
      };
  
      const handleISBNChange = (event) => {
        setISBN(event.target.value);
      };
  
  
      const handleQuantity =(event)=>{
        setQuentiry(event.target.value);
  
      };
  
     const handleSubmit = async () => {
              
  
  
              const paydata = {'employeeId':isbn,'amount': quantity};
  
              const url = 'http://127.0.0.1:5000/pay';
              
              // Options for the fetch request
              const options = {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(paydata)
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
        <h1 className="header">pay </h1>
        <div>
          <div className="add-new-book" >
             {responseMessage && <p id='successMessage' style={{color: 'green',fontWeight:'bolder'}}>{responseMessage}</p>}       
             <div style={{display: 'flex',flexDirection: 'row', justifyContent:' space-between'}}>
                <div className='mover-inner-div'>
                      <label>Employee id</label>
                      <input required ref={isbnRef} onChange={handleISBNChange} type="text" defaultValue={isbn}  />
                  </div>
                  <div className='mover-inner-div'>
                      <label>Amount</label>
                      <input required style={{height:"40px"}} ref={quentityRef} onChange = {handleQuantity} type="number" defaultValue={quantity}  />
                  </div>
                  </div>
              <div id='mover-container'>
              <div className='mover-inner-div'>
                 
                  
                  </div>
  
                  <div className='mover-inner-div'>
                 
                  </div>
                  </div>
  
              <div id="button-container">   
                <button id='submiit-restock' onClick={handleSubmit} >Summit</button>
          
            </div>
            
            
          </div>
          
        </div>
      </div>
    );
  };



  const AboutEmoloyee = ({ ID }) => {
    
    const [employeeData, setEmpData] = useState(null);  // Initialize with null 
    const [showPayment, setShowPayment] = useState(false);
    const handlePay = () => {
      setShowPayment(true);
      
        };

    useEffect(() => {
      const fetchEmployeeData = async () => {
        const url = 'http://127.0.0.1:5000/employeedateail';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "employeeId":ID })
        };
  
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setEmpData(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchEmployeeData();
    }, []);  

  
    if (!employeeData) {
      return <div>Loading...</div>;  
    }
  
    const { employeeid, firstname, lastname, employeerole, phone, email, hiredate, salary, isactive } = employeeData[0];
  
    return (
      <div id="description-container">
        <div className="description-head">
          <h1>Employee Details</h1>
        </div>
        <div style={{display:'flex'}}> 

        
        <div>
          <p>First Name: {firstname}</p>
          <p>Last Name: {lastname}</p>
          <p>Employee Id: {employeeid}</p>
          <p style={{ fontWeight: 'bold' }}>Salary: ${salary}</p>
          <p>Role: {employeerole}</p>
          <p>Phone Number: {phone}</p>
          <p>Email: {email}</p>
          <p>Hire Date: {hiredate}</p>
          <p>Status: {isactive ? 'Active' : 'Dormant'}</p>
          <div>
            <button className = "add-button" onClick={handlePay}>
            Pay 
          </button>
          </div>
          </div>

          <div>
          {showPayment && <Payment  ID ={ID} salary = {salary}/> }

          </div>
          </div>
      </div>
    );
  };

  export {Hire,Fire, AboutEmoloyee,Payment,CheckPayment}
