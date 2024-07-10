
/***********************handles  database initializations  */
const bookModel = require("../models/book");
const retailModel = require('../models/retailarea');
const invModel = require('../models/inventory');




// updates book information which are in invetory
exports.updateBookInfo =()=>{


};

// Example usage

exports.getBookDetailsByisbn = (isbn)=>{
    
    return bookModel.getBookDetailsWithTotalQuantity(isbn);
}


exports.moveBookFromInventorytoRetail = async (inv,ret)=>{

    //is levelheld
    //is quantity at shlef leve greater than user given quantity
    // if so subtract that quantity from inventory
    // then if the book is never added to retail area at given level
    // insert to retail 
    // else update quantity of the at the given level
    console.log(inv)
    try{

    

    const isbookExist = await invModel.isShelfLevelHeld(inv.isbn,inv.shelf_number,inv.shelf_level);
    if(isbookExist){
        const invQuantiy = await invModel.getBookQuantityAtShelf(inv.isbn,inv.shelf_number,inv.shelf_level);
        const isEnough = parseInt(invQuantiy) >= parseInt(ret.quantity);
        if(isEnough){
            try{  
                 const isRetailShelfLevelHeld = await retailModel.isShelfLevelHeld(ret.isbn,ret.shelf_number,ret.shelf_level);
                await bookModel.moveBook(isRetailShelfLevelHeld,inv,ret);
                return {message:"moved succefully"};

            }catch{
                return {message:"error occured during moving the book"};
            }

        }
        else{
            return {message :"You have only "+invQuantiy+"on level "+inv.shelf_level};
        }
    }
    else{
        return{ message:"No book at  shelf level " + inv.shelf_level};
    }
}catch{
    return {message:" check you data"};
}


}
    


