const employeeService = require('../services/employeeService');
// hire(deactivate) data (id)
// fire(new employee or activate) ( form)
// pay ( ampunt)
// checkPayment( id, month, year)

exports.hire =async( req,res)=>{
       try{
        const employeeInfo = req.body;
        
       
        const result = await employeeService.hire(employeeInfo); 
          
        res.json(result);

    }catch{
        res.json({message:'something went wrong'});
    }



};



exports.fire = async ( req ,res)=>{
    try{
        const result = await employeeService.fire(req.body.employeeId);
        res.json(result);

    }catch{
        res.json({message:'something went wrong'});
    }


};



exports.pay = async( req, res)=>{
    try{
        const result = await employeeService.pay(req.body.employeeId,req.body.amount);
        res.json(result);

    }catch{
        res.json({message:'something went wrong'});
    }

};


exports.checkPayment =async (req,res)=>{
    
    res.json(employeeService.checkPayment(req.body.employeeId,req.body.month,req.body.year));

};

exports.getEmployeeDetail = async (req,res)=>{
    try{
        console.log(req.body);
        console.log('employee  jhdfljdhfjkddetail')
        const result = await employeeService.getGetDetail(req.body.employeeId);
        res.json(result);

    }catch{
        res.json({message:'something went wrong while feching '});
    }

}
