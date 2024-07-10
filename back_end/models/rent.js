// Function to create a new rent
 const pool = require('./pool');


exports. createRent = async (rent) => {
    const { customerid, isbn, rentdate, returndate, quantity, amount_paid } = rent;
    const query = `
        INSERT INTO rent (customerid, isbn, rentdate, returndate, quantity, amount_paid)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [customerid, isbn, rentdate, returndate, quantity, amount_paid];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
};

// Function to return a rented book
exports.returnRentedBook = async (customerid, isbn, rentdate) => {
    const query = `
        UPDATE rent
        SET  isreturned = true
        WHERE customerid = $1 AND isbn = $2 AND rentdate = $3
        RETURNING *;
    `;
    const values = [customerid, isbn, rentdate];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
};

exports.getRents = async () =>{
    const query =  `
    SELECT customerid, isbn, TO_CHAR(rentdate, 'YYYY-MM-DD') AS rentdate, TO_CHAR(returndate, 'YYYY-MM-DD') AS returndate, quantity, amount_paid,isreturned
FROM rent`;

    try{
        const res = await pool.query(query);
        return res.rows;

    }
    catch(err){
        throw err;
    }
}