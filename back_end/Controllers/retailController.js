const retailService = require('../services/retailService');


exports.getBookByIsbn = async (req,res) => {

    try{ 
        
        const book = await retailService.getBookByIsbn(req.query.isbn);
      
            res.status(201).json(book);

       }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
           }        
}



exports.getBookByTitle = async (req,res) => {
    try{ 
        const book = await retailService.getBookByTitle(req.query.title);
        
        res.status(201).json(book);

       }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
           }          
}


exports.getBookByAuthor = async (req,res) => {
    
    try{ 
       const book = await retailService.getBookByAuthor(req.query.author);
        
        res.status(201).json(book);

       }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
           }        
    }


    


























