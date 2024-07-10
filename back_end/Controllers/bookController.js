/* Thank you  Lord Jesus Christ  🙏🙏🙏 */
/* author Feyisa Kenenisa */

 const bookService = require('../services/bookService')


 
// search is only on book table
exports.bookdeteils = async (req,res)=>{
   try{
  //  console.log(req.body.isbn);
    const book = await bookService.getBookDetailsByisbn (req.query.isbn);
    res.json(book);

   }
   catch{
    res.status(500).json({message:"somthing went wrong"});
   }
   
}




exports.updateBookInfo =(req,res)=>{


}

exports.moveBookTOshelf = async(req,res)=>{
  
  
  const result = await bookService.moveBookFromInventorytoRetail(req.body.inventory,req.body.retail);
  res.json(result);

}
