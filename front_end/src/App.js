import './App.css';
import Invetory from './component/inventory';
import React from 'react';
import Navigation from './component/navigation';
import NewBook from './component/newBook';
import BookDiscription from './component/bookdiscription';
import Restock from './component/restock';
import Retail from './component/retail';
import Mover from './component/mover';
import Employee from './component/employee';
import SaleForm from './component/sell';
import Customer from './component/customer';
import NewCustomer from './component/newcustomer';
import Rent from './component/rent';
import RentForm from './component/newrent';
import {Hire,Fire, AboutEmoloyee,Payment,CheckPayment} from './component/employeeComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () =>{
    
  return (
    <Router>
      <div className="App">
       <Navigation/>
       </div>
      <Routes>
        <Route path="/" element={<Invetory/>} />
        <Route path='/mover' element ={<Mover/>}/>
        <Route path='/employee' element ={<Employee/>}/>
         <Route path='/retail' element={<Retail/>}/>
        <Route path="/newbook" element={<NewBook />} />
        <Route path='/description' element ={<BookDiscription/>}/>
        <Route path='/restock' element ={<Restock/>}/>

        <Route path='/hireE' element ={<Hire/>}/>
        <Route path='/fireE' element ={<Fire/>}/>
        <Route path='/aboutE' element ={<AboutEmoloyee/>}/>
        <Route path='/payE' element ={<Payment/>}/>
        <Route path='/checkpay' element ={<CheckPayment/>}/>
        <Route path='/sell-book' element ={<SaleForm/>}/>
        <Route path='/custpage' element ={<Customer/>}/>
        <Route path='/newcustomer' element ={<NewCustomer/>}/>
        <Route path='/rents' element ={<Rent/>}/>
        <Route path='/rentform' element ={<RentForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
  

