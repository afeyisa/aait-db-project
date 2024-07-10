
const pool = require('./pool');

exports. getBookByIsbn = async (isbn) => {

    console.log('Fetching book details from the from retail area using isbn');

    try {
        const res = await pool.query(`
            SELECT 
                b.isbn,
                b.title,
                r.quantity,
                r.shelf_number,
                r.shelf_level
            FROM 
                book b
            JOIN 
                retailarea r 
            ON 
                b.isbn = r.isbn
            WHERE 
                b.isbn = $1
        `, [isbn]);

        if (res.rows.length > 0) {
            return res.rows;
        } else {
            return null; // Return null if no book is found
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
}





exports. getBookByTitle = async (title) => {
    console.log('Fetching book details from the from retail using title');
    try {
        const res = await pool.query(`
            SELECT 
                b.isbn, 
                b.title, 
                r.quantity, 
                r.shelf_number, 
                r.shelf_level 
            FROM 
                book b 
            JOIN 
                retailarea r
            ON 
                b.isbn = r.isbn 
            WHERE 
                b.title LIKE $1 
            ORDER BY 
                b.title
        `, [`%${title}%`]);

        if (res.rows.length > 0) {
            return res.rows;
        } else {
            return null; // Return null if no book is found
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
}


exports.getBookByAuthor = async (author) => {
        console.log('Fetching book details from the retail using author');

        try {
            const res = await pool.query(`
                SELECT 
                    b.isbn,
                    b.title,
                    r.quantity,
                    r.shelf_number,
                    r.shelf_level
                FROM 
                    book b
                JOIN 
                    retailarea r
                ON 
                    b.isbn = r.isbn
                WHERE 
                    b.author LIKE $1
            `, [`%${author}%`]);
    
            if (res.rows.length > 0) {
                return res.rows;
            } else {
                return null; // Return null if no book is found
            }
        } catch (err) {
            console.error('Error executing query', err);
            throw err; // Rethrow the error for further handling
        }
    }
       

exports.updateRetailQuantity = async (isbn, shelfNumber, shelfLevel, newQuantity) => {

    try {
        console.log('updating retailarea quantity');
         await pool.query(`
            UPDATE retailarea
            SET quantity = quantity + $2
            WHERE isbn = $1
              AND shelf_number = $3
              AND shelf_level = $4
            
        `, [isbn, newQuantity,  shelfNumber, shelfLevel]);

    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
};




exports.insertRetail = async(retail)=>{
    // Insert into the inventory table
    console.log('inserting to retailarea');
    try{
    await pool.query(`
        INSERT INTO inventory (
            isbn, quantity, shelf_number, shelf_level
        ) VALUES ($1, $2, $3, $4)
    `, [
        retail.isbn,
        retail.quantity,
        retail.shelf_number,
        retail.shelf_level
    ]);}

    catch{

    }

}




exports.isShelfLevelHeld = async(isbn,shelfNumber,shelfLevel)=>{
    try {
        console.log('checking whether level is held');
        const res = await pool.query(`
            SELECT 
                *
            FROM 
                retailarea
            WHERE 
                isbn = $1
                AND shelf_number = $2
                AND shelf_level = $3
        `, [isbn, shelfNumber, shelfLevel]);
        
            console.log(res.rows.length);
        if (res.rows.length > 0) {
            return true; // 
        } else {
            return false; // Return false if no inventory record is found for the given ISBN, shelf number, and shelf level
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
}




exports.getBookQuantityAtShelf = async (isbn, shelfNumber, shelfLevel) => {

    console.log('getting on given level');

    try {
        const res = await pool.query(`
            SELECT 
                quantity
            FROM 
                retailarea
            WHERE 
                isbn = $1
                AND shelf_number = $2
                AND shelf_level = $3
        `, [isbn, shelfNumber, shelfLevel]);

        if (res.rows.length > 0) {
            return res.rows[0].quantity; // Return the quantity
        } else {
            return null; // Return null if no inventory record is found for the given ISBN, shelf number, and shelf level
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
};














