const { Strategy } = require("passport-local").Strategy;
const usersSchema  = require('../models/users');
const path         = require('path');
const bcrypt       = require('bcrypt');
const passport     = require('passport');
const dotenv       = require('dotenv'); 
const fs           = require('node:fs');   
dotenv.config({path: './config.env'});




exports.root = ((req, res) =>{
    res.redirect('/home');

});

/*******************handles home part************************************************************** */

// sends home page to the req user is new
// sends login page to the req if user is arleady registered
exports.home  =  ( (req, res) => {

    if (parseInt(process.env.userNum) === 0){
        try{
            res.sendFile(path.join(__dirname,'../public','createdatabase.html'));}
            catch{
                res.status(404).send('server error');
            }
    }


    else if (parseInt(process.env.userNum) === 1){
        res.redirect("/login");
    }


    else{
        res.status(404).send("your database can't handle beyond one user check you enviroment variable");
    }
   
});
/* ****************************************************************************************** */


/*******************************handles login part***************************************************************** */

// send login page to the req
exports.login  =  ((req, res) => {
    
    try{
    res.sendFile(path.join(__dirname,'../public','login.html'));}
    catch{
        res.status(404).send('server error');
    }
});






/* ********************handles book store part******************************************************************** */

// this page is the protect page in this system
exports.bookStore  =  (req, res) => {
    if(req.isAuthenticated()){
        res.sendFile(path.join(__dirname,'../public/build','bookstore.html'));
    }else{
        res.redirect("/login");    
    }
};
/* ****************************************************************************************************** */

