const customerModel = require('../models/customer')
// Controller function to create a new customer
exports. createCustomerController = async (req, res) => {
    try {
        console.log(req.body);
        const newCustomer = await customerModel.createCustomer(req.body);
       
        if(newCustomer){
            res.status(201).json({message:'created successfully'});
        }
        else{
            req.status(201).json({message:'mismatching data'});
        }
    } catch (err) {
        res.status(400).json({ message:'somthing went wrong during creatign customer' });
    }
};



// Controller function to get a customer by ID
exports. getCustomerByIdController = async (req, res) => {
    try {

        const q = req.query;
        const customer = await customerModel.getCustomerById(q.query);
        if (customer) {
            res.json([customer]);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Controller function to update a customer
exports. updateCustomerController = async (req, res) => {
    try {
        const updatedCustomer = await customerModel.updateCustomer(
            req.body
        );
        if(updatedCustomer){
            res.status(201).json({message:'updated'});
        }
        else{
            res.status(201).json({message:'not updated'});
        }
    } catch (err) {
        res.status(400).json({ message: 'some thing went wrong' });
    }
};


// Controller function to get a customer by ID
exports.getCustomerList = async (req, res) => {
    
    try {
        const customer = await customerModel.getCustomerList();
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

