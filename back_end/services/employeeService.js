const empModel = require('../models/employee');

// hire(deactivate) data (id)
// fire(new employee or activate) ( form)
// pay ( ampunt)
// checkPayment( id, month, year)
// 
// -- employee(
//     --     employeeId,
//     --     fristName,
//     --     lastName,
//     --     employeeRole,
//     --     email
//     --     phone
//     --     hireDate,
//     --     salary,
    
//     -- )
    
//     -- salaryRecord(
//     --     paidYear,
//     --     paidMonth,
//     --     employeeId,
//     --     paidSalary
    
//     -- )



exports.hire = async(data)=>{
    try{
        const id = data.employeeId;
        console.log(id);
        const isExist = await empModel.wasEmployee(data.employeeId);
        if(!isExist){

            const dateObj = new Date();
            const month   = dateObj.getUTCMonth() + 1; // months from 1-12
            const day     = dateObj.getUTCDate();
            const year    = dateObj.getUTCFullYear();
            const date = year+'-'+month+'-'+day

            const res = await empModel.createEmployee (
                data.employeeId,
                data.firstName,
                data.lastName,
                data.phone,
                data.email,
                data.employeeRole,
                date,
                data.salary);
                

                if(res){
                    return{message:'Employee has hell been registered'};
                }
                else{
                    return{message:'Employee has not been registered'};
                }

        }
        else{
            const isactive = await empModel.getStatus(id);
            console.log('activated'+ isactive);
            if(!isactive){
                await empModel.activate(id);
                return{message:'employee has been activated'};
            }
            else{
                return{message:'employee already active'}
            }


        }
      

    }catch{
        return{message:'something went wrong'};

    }

};



exports.fire = async(employeeId)=>{

    try{

        await empModel.deactivate(employeeId);
        return {message:'eployee has been deactivated'};
    }
    catch{
        return{message: 'error occured while diactivating employee'};
    }
   

}
exports.pay =async (emoloyeeId,amount)=>{
    try{
        const dateObj = new Date();
        const month   = dateObj.getUTCMonth() + 1; // months from 1-12
        const year    = dateObj.getUTCFullYear();

       const check = await empModel.isPaid(emoloyeeId,month,year);
        if(check){
            return {message:'employee has already been paid this month'};
        }
        else{

             const res = await empModel.createPaymentRecord(emoloyeeId,month,year,amount);
             
            if(res){
                return{message:'recorded successfully'};
            }
            else return{message:'something went wrong while recoding'};

        }
    }catch{
        return{message:'something went wrong while recoding'};

    }


};

exports.checkPayment =async (emoloyeeId,month,year)=>{
    try{
       const check = await empModel.isPaid(emoloyeeId,month,year);
       if(check){
        return{message:'allright your employee was in '+year+' year '+month+' month '}
       }
       else return{ message:'oops you have not paid  this employee'};
    }
    catch{
        return{message:"somthing went wrong while checking for payment"}
    }

};



exports.getGetDetail = async (employeeId)=>{


    try{
        const check = await empModel.wasEmployee(employeeId);
        if(check){
            const emp = await empModel.getEmployee(employeeId);
            return emp;
        }
        else return{message:'no employee with this id'};



    }catch{
        return {message:'something went wrong'};
    }
}