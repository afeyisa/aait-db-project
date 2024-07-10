
const pool = require('./pool');

exports. getBookByIsbn = async (isbn) => {

    console.log('Fetching book details from the from invetory using isbn');

    try {
        const res = await pool.query(`
            SELECT 
                b.isbn,
                b.title,
                i.quantity,
                i.shelf_number,
                i.shelf_level
            FROM 
                book b
            JOIN 
                inventory i 
            ON 
                b.isbn = i.isbn
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
    console.log('Fetching book details from the from invetory using title');
    try {
        const res = await pool.query(`
            SELECT 
                b.isbn, 
                b.title, 
                i.quantity, 
                i.shelf_number, 
                i.shelf_level 
            FROM 
                book b 
            JOIN 
                inventory i 
            ON 
                b.isbn = i.isbn 
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
        console.log('Fetching book details from the inventory using author');

        try {
            const res = await pool.query(`
                SELECT 
                    b.isbn,
                    b.title,
                    i.quantity,
                    i.shelf_number,
                    i.shelf_level
                FROM 
                    book b
                JOIN 
                    inventory i 
                ON 
                    b.isbn = i.isbn
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
    




    exports.insertNewBook = async (book, inventory) => {

        console.log('inseting new book');

        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
    
            // Insert into the book table
            const bookQuery = `
                INSERT INTO book (
                    isbn, title, author, genre, description, price, rent_rate
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;
            const bookValues = [
                book.isbn,
                book.title,
                book.author,
                book.genre,
                book.description,
                book.price,
                book.rent_rate
            ];
            await client.query(bookQuery, bookValues);
    
            // Insert into the inventory table
            const inventoryQuery = `
                INSERT INTO inventory (
                    isbn, quantity, shelf_number, shelf_level
                ) VALUES ($1, $2, $3, $4)
            `;
            const inventoryValues = [
                inventory.isbn,
                inventory.quantity,
                inventory.shelf_number,
                inventory.shelf_level
            ];
            await client.query(inventoryQuery, inventoryValues);
    
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Error inserting book and inventory', err);
            throw err;
        } finally {
            client.release();
        }
    };
    
    


  exports.insertIventory = async(inventory)=>{
        // Insert into the inventory table
        console.log('inserting to inventory');

        await pool.query(`
            INSERT INTO inventory (
                isbn, quantity, shelf_number, shelf_level
            ) VALUES ($1, $2, $3, $4)
        `, [
            inventory.isbn,
            inventory.quantity,
            inventory.shelf_number,
            inventory.shelf_level
        ]);

    }


    exports.getBookQuantityAtShelf = async (isbn, shelfNumber, shelfLevel) => {

        console.log('getting on given level');

        try {
            const res = await pool.query(`
                SELECT 
                    quantity
                FROM 
                    inventory
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
    



exports.isShelfLevelHeld = async(isbn,shelfNumber,shelfLevel)=>{
    try {
        console.log(isbn);
        console.log(shelfNumber);
        console.log(shelfLevel);


        console.log('checking whether level in inventory shelf is held');
        const res = await pool.query(`
            SELECT 
                *
            FROM 
                inventory
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
    

exports.updateInventoryQuantity = async (isbn, shelfNumber, shelfLevel, newQuantity) => {

    try {
        console.log('updating inventory quantity');
         await pool.query(`
            UPDATE inventory
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







/////////////////////
exports.updateInvtory =async (newData)=>{
    try {
        const res = await pool.query(`
            UPDATE inventory
            SET quantity = $2, shelf_number = $3, shelf_level = $4
            WHERE isbn = $7
            RETURNING *
        `, [newData.quantity, newData.shelf_number, newData.shelf_level]);

        if (res.rows.length > 0) {
            return res.rows[0]; // Return updated book details
        } else {
            return null; // Return null if no book with the given ISBN is found
        }
    } catch (err) {
        console.error('Error updating book', err);
        throw err;
    }

}






















