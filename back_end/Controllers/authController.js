/* Thank you  Lord Jesus Christ  🙏🙏🙏 */
/* author Feyisa Kenenisa */

//strategy is needed for logging in options
const { Strategy } = require("passport-local").Strategy;
const usersSchema  = require('../models/users');
const bcrypt       = require('bcrypt');
const passport     = require('passport');
const userService  = require('../services/userService')



/* it checks if the user has registered and
 * redirect the user to  bookstore page if the entered password and email are correct*/

exports.authenticate = 
    passport.authenticate('local', {
        successRedirect: '/mybookstore',
        failureRedirect: '/login', // Redirect to register page on authentication failure
    });


    // for session saving using local strategy
    // varifies user 
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async function  verify(username,password,cb){
        console.log('user being verified');

            try{
              // const user     = await us.find({user:username});///######################posgressql is needed here
              const user = await userService.getUser(username); 
               //checks whether the user exist in database and whether the user is unique in the database
                if(user.length===1 ){
                    // comparing the input password from a user with the stored hashed password
                     bcrypt.compare(  password,  user[0].password,  (err,result)=>{
                        if(err){
                            return cb(err);
                        }else{
                            if(result){
                                return cb(null, user[0]);
                            }
                            else{     
                                return cb(null , false),{message:"incorrect password"};           
                            }
                        }
                    });
                }else{
                   return cb("user not found"); }
            }catch(err){
                return cb(err);
                   // res.status(404).send('something went wrong');
                }  
        }));
/* ******************************************************************************************************* */




    passport.serializeUser((user , cb)=>{
        cb(null, user);
      });  
    
      passport.deserializeUser((user , cb)=>{
        cb(null, user);
      });


      
  /* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
