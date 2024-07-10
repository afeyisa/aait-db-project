
const pool = require('./pool');


// Function to create a new customer
exports. createCustomer = async (customer) => {
    const { customerid, firstname, lastname, phone, email } = customer;
    const query = `
        INSERT INTO customer (customerid, firstname, lastname, phone, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [customerid, firstname, lastname, phone, email];

    try {
        const res = await pool.query(query, values);
        if(res.rows.length > 0){
            return true
        }
        else return false;
    } catch (err) {
        throw err;
    }
};

// Function to view a customer by ID
exports. getCustomerById = async (customerid) => {
    const query = `SELECT * FROM customer WHERE customerid = $1`;
    const values = [customerid];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
};

// Function to view a customer by ID
exports. getCustomerList = async () => {
    const query = `SELECT * FROM customer`;

    try {
        const res = await pool.query(query);

        if(res.rows.length > 0){
            return res.rows
        }
        else return null;
        
    } catch (err) {
        throw err;
    }
};


// Function to update a customer
exports. updateCustomer = async (customer) => {
    const { customerid, firstname, lastname, phone, email } = customer;
    const query = `
        UPDATE customer
        SET firstname = $2, lastname = $3, phone = $4, email = $5
        WHERE customerid = $1
        RETURNING *;
    `;
    const values = [customerid, firstname, lastname, phone, email];

    try {
        const res = await pool.query(query, values);
        if(res.rows.length > 0){
            return true
        }
        else return false;
    } catch (err) {
        throw err;
    }
};


