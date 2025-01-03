/* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
/* author Feyisa kenenisa */
  
/* 

    **********************************
    * pages and their corresponding  *
    * functions we need to impliment *
    * ********************************
    *******************************
    *pages          |  requests   *
    ****************|**************
    *login          |  post, get  *
    ****************|**************
    *home           |  get        *
    ****************|**************
    *register       |  post , get *
    *mybookstore    | post , get  * 
    *******************************/ 

    
    const dotenv      = require('dotenv');    
    const express     = require('express');
    const session     = require('express-session');
    const passport    = require('passport');
    const routeTo     = require('./router/route');
    // const { Pool }    = require('pg');
//const { getUser } = require('./inventory/models/users');
  


    const server       = express();
    dotenv.config({path: './.env'});
    
    
    




    /*************************cookies and authentication********************************** */

    /*note order matters when we are using both passport and session 
     * order is session then passport */
    server.use(
        session({
            // for signing the session
            secret: "random words are best for this",
            // for choosing where to save the session server or database (false=>server)
            resave: false,
            // store uninitialized session into server memory
            saveUninitialized: true,
            // Cookie settings
            cookie: {
                // maxAge is not set, so the session will expire when the browser is closed
                secure: false // set to true if using https
            }
        })
    );
    
    server.use(passport.initialize());
    server.use(passport.session());
/******************************************************************************************** */



    // take care of order on this part

    server.use('/',routeTo);   
       
    const port= process.env.PORT;
    server.listen(port,()=>{   
        console.log(`app running on port ${port} ...`); 
    });
 

    /* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */