const inventoryService = require('../services/inventoryService')


exports.getBookByIsbn = async (req,res) => {

    try{ 
        
        const book = await inventoryService.getBookByIsbn(req.query.isbn);
      
            res.status(201).json(book);

        
       
        

       }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
           }        
}





exports.getBookByTitle = async (req,res) => {
    try{ 
        const book = await inventoryService.getBookByTitle(req.query.title);
        
        res.status(201).json(book);

       }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
           }          
}


exports.getBookByAuthor = async (req,res) => {
    
    try{ 
       const book = await inventoryService.getBookByAuthor(req.query.author);
        
        res.status(201).json(book);

       }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
           }        
    }


exports.addNewBook = async (req, res) => {
       try{ 
         await inventoryService.insertNewBook(req.body.book,req.body.inventory);
        
        res.status(201).json( {message:'Book added successfully' });

       }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
           }
    };
    

exports.reStock = async(req,res)=>{
   console.log(req.body);

    try{
        const result = await inventoryService.restock(req.body);
        
        res.status(200).json(result);
    }
    catch{
        res.status(500).json({ message:'Internal server error' });
    }
}
























