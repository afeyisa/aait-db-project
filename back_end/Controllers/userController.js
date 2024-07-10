const path         = require('path'); 
const userService  = require('../services/userService'); 



/* *************************handles registiration of user************************************************/

/* it  stores user information to data base if the intered email is not in the database
 * and redirect the user to main dashboard after storing the information*/


exports.createUser = async(req,res)=>{ 
    try
    {
        const user  = await userService.getUser(req.body.username);
        // it checks the user email whether is in the database 
       
        console.log('new user being registering');
        if(!user)
        {
            try{
                
               const  newuser =  userService.createUser(req.body.Database,req.body.username, req.body.password);

                await req.login(newuser,(err)=>{

                    if(err){
                        console.log(err);
                        res.redirect('/home'); // this condition must checked to validate if it is the correct way to do this
                    }
                    else{
                        res.redirect('/mybookstore'); 
                    }
                });
             }
            catch{
                console.log('data base error during register');
                res.send('error occured');
                }

        }

        else
        {
            res.redirect('/login');
        }
         
     }

       
    catch(err){console.log(err);
                res.status(404).json({ error: 'server error' });
            }
};



/* ******************************************************************************************************** */

