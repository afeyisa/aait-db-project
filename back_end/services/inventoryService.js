const inventory = require('../models/inventory');
const book      = require('../models/book');

//worked
exports.getBookByIsbn = async (isbn) => {

    return inventory.getBookByIsbn(isbn);
        
}

//woked
exports.getBookByTitle = async (title) => {

    return inventory.getBookByTitle(title);
          
}

//worked
exports.getBookByAuthor = async (author) => {

        return inventory.getBookByAuthor(author);
        
    }


// worked
exports.insertNewBook = async (bookInfo, inventoryData) => {

  try{
    const isrocorded = await book.isRecorded(bookInfo.isbn);
    if(isrocorded){
        return this.restock(inventoryData);
    }
    else{
        console.log(isrocorded);
        return inventory.insertNewBook(bookInfo,inventoryData);  
    }

  }catch(err){
    throw err;}
    };
    

//worked
exports.restock = async (inventoryData)=>{
    try{

    

     const isrocorded = await book.isRecorded(inventoryData.isbn);
    
        if(isrocorded){

            const { isbn, quantity, shelf_number, shelf_level } = inventoryData;

            const isLevelHeld = await inventory.isShelfLevelHeld(isbn,shelf_number,shelf_level);

            if(isLevelHeld){

                await inventory.updateInventoryQuantity(isbn, shelf_number, shelf_level, quantity);
               
                return {message :"Book added to inventory successfully"};
            }
            else{

                await inventory.insertIventory(inventoryData);

                return {message :"Book added to inventory successfully"};

            }
        }
        else{
            return {message:" no book with this isbn in your inventory before"};
        }}
        catch{
            return {message:"something was wrong in you data"};
        }

    }


// move book from inventory to shelf;
exports.moveBookToRetail =(isbn)=>{

};




/////////////
exports.updateInvetory =(data)=>{
    inventory.updateInvtory(data);
}






















