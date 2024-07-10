/* user dabase schema  mongo database*/
 const pool = require('./pool');


exports.createUser = async (db,username,hashPassword)=>{
    try
    {
        const res = await pool.query('INSERT INTO users (databaseName, username,password) VALUES ($1, $2, $3) RETURNING *', [db, username,hashPassword]);
        //return 
        //console.log(res.rows[0]);
      
        return {isCreated:true};
      
    }
    catch
    {
        return {isCreated:false};
    }

};

exports.getUser = async (username)=>{
    console.log('Fetching user from the database');
    try {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        
        if (res.rows.length > 0) {
            return res.rows;
        } else {
            return null; // Return null if no user is found
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
}


