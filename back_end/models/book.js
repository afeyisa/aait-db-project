
const pool = require('./pool');


exports.isRecorded = async (isbn)=>{
    
    console.log('Fetching book deteils from the database');
    try {
        const res = await pool.query('SELECT * FROM book WHERE isbn = $1', [isbn]);
        
        if (res.rows.length > 0) {
            return true;
        } else {
            return false; // Return null if no user is found
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }

}



exports.getBookDetailsWithTotalQuantity = async (isbn) => {
    try {
        const res = await pool.query(`
            SELECT 
                b.isbn,
                b.title,
                b.author,
                b.genre,
                b.description,
                b.price,
                b.rent_rate,
                COALESCE(i.inventory_quantity, 0) AS inventory_quantity,
                COALESCE(r.retail_quantity, 0) AS retail_quantity,
                COALESCE(i.inventory_quantity, 0) + COALESCE(r.retail_quantity, 0) AS total_quantity
            FROM 
                book b
            LEFT JOIN (
                SELECT 
                    isbn,
                    SUM(quantity) AS inventory_quantity
                FROM 
                    inventory
                GROUP BY 
                    isbn
            ) i ON b.isbn = i.isbn
            LEFT JOIN (
                SELECT 
                    isbn,
                    SUM(quantity) AS retail_quantity
                FROM 
                    retailarea
                GROUP BY 
                    isbn
            ) r ON b.isbn = r.isbn
            WHERE 
                b.isbn = $1
        `, [isbn]);
       
        
        console.log(res.rows);

        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return null; // Return null if no book is found
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
};




exports.moveBook = async(isbookExistonlevel,inventory,retailInfo) =>{
    
    console.log('moving  book');
    console.log(isbookExistonlevel);
    
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');

            const retailValues = [
                retailInfo.isbn,
                retailInfo.quantity,
                retailInfo.shelf_number,
                retailInfo.shelf_level
            ];

            if(isbookExistonlevel){

                //update quantity on retail shelf
                const reatilQuery = `
                    UPDATE retailarea
                    SET quantity = quantity + $2
                    WHERE isbn = $1
                    AND shelf_number = $3
                    AND shelf_level = $4
                `;
            
                await client.query(reatilQuery, retailValues);
            }
            else{

                // insert to inventory
                const reatilQuery =` 
                 INSERT INTO retailarea (
                    isbn, shelf_number, shelf_level, quantity
                ) VALUES ($1, $2, $3, $4)

                `;
                await client.query(reatilQuery, retailValues);

            }
            
            // substruct from inventory quantity
            const inventoryQuery = `
            UPDATE inventory
            SET quantity = quantity - $2
            WHERE isbn = $1
              AND shelf_number = $3
              AND shelf_level = $4 `;
            
            const inventoryValues = [
                inventory.isbn,
                retailInfo.quantity,
                inventory.shelf_number,
                inventory.shelf_level
            ];
            await client.query(inventoryQuery, inventoryValues);
    
            await client.query('COMMIT');

        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Error inserting book and updating inventory', err);
            throw err;
        } finally {
            client.release();
        }

};
