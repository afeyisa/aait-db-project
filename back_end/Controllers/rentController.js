









const rentModel = require('../models/rent');





// Controller function to create a new rent
exports. createRentController = async (req, res) => {
    try {
        console.log(req.body);
        const newRent = await rentModel.createRent(req.body);
        res.status(201).json({message:'rent has been created'});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message:'error occured' });
    }
};


// Controller function to return a rented book
exports. returnRentedBookController = async (req, res) => {

    const { customerid, isbn, rentdate} = req.body;
    
    console.log(isbn +"  "+customerid+"  "+rentdate);
    try {
        const updatedRent = await rentModel.returnRentedBook(customerid, isbn, rentdate );
        console.log(updatedRent);
        res.json({message:'rent has been created'});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message:'error occured' });
    }
};



exports.getAllRents = async(req,res)=>{

    try{
        const rents = await rentModel.getRents();
        res.status(201).json(rents);
    }
    catch{
        res.status(400).json({ message:'error occured' });
    }
}

