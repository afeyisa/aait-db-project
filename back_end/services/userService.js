
const usersSchema  = require('../models/users');
const bcrypt       = require('bcrypt');
const dotenv       = require('dotenv'); 
const fs           = require('node:fs');  
dotenv.config({path: './config.env'});



exports.getUser = async (username)=>{
    
    const user = await usersSchema.getUser(username);
     return user;   
};




exports.createUser = async (db,username,password)=>{


    const saltingRound = 10;
    // hashing password with salting property  
    bcrypt.hash(password,saltingRound, async(err,hash)=>{
    // it create user and stores to database if error not occurred while hashing the password 
        if(!err){
            try {
                // here posgressql is neded ########################
            
                const createUser = await usersSchema.createUser(db,username,hash);
                
                if (createUser.isCreated){
                    //update enviroment variable from 0 to 1
                    const filePath = './config.env';
                    // Step 1: Read the file content
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading the file: ${err}`);
                            return;
                        }

                        // Step 2: Modify the content
                        const modifiedContent = data.replace('userNum=0', 'userNum=1');

                        // Step 3: Write the modified content back to the file
                        fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
                           
                            if (err) {
                                console.error(`Error writing the file: ${err}`);
                                return;
                            }

                            console.log('File has been updated!');
                            process.env.userNum = 1;
                        
                        });
                    });
                
            // returns new user
            const result = (await usersSchema.getUser(username)).user;
            const user   = result[0];
            return user;
        }
        else{
            return null;
        }

        }
            catch(err){
                console.log('data base error');
               return err;
            }

        }
        else{
               // res.status(404).send('some thing is wrong');
               return err;
            }
    }); 


};
