const retailarea = require('../models/retailarea');
const book      = require('../models/book');

//worked
exports.getBookByIsbn = async (isbn) => {

    return retailarea.getBookByIsbn(isbn);
        
}

//woked
exports.getBookByTitle = async (title) => {

    return retailarea.getBookByTitle(title);
          
}

//worked
exports.getBookByAuthor = async (author) => {

        return retailarea.getBookByAuthor(author);
        
    }


// worked
exports.rent = async()=>{

}

exports.sale = async ()=>{

}
    


























