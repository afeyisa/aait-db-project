/* user dabase schema  mongo database*/
const e = require('cors');
const pool = require('./pool');


//     --     phone


exports.createEmployee = async (employeeid,firstName,lastName,phone,email,employeeRole,hireDate,salary)=>{
    try
    { console.log('hooooooo')
       const res =  await pool.query(`INSERT INTO employee (
        employeeid,firstname, 
        lastname,phone,email,employeerole,hiredate,salary) 
        VALUES ($1, $2, $3,$4,$5,$6,$7,$8)`,

             [employeeid,firstName, lastName,phone,email,employeeRole,hireDate,salary]);

             console.log(res);
      
        return {isCreated:true};
      
    }
    catch
    {
        return {isCreated:false};
    }

};

exports.getEmployee = async (empId)=>{
    console.log('Fetching employee from the database');
    try {
        const res = await pool.query('SELECT * FROM employee WHERE employeeid = $1', [empId]);
        
        if (res.rows.length > 0) {
            return res.rows;
        } else {
            return null; // Return null if no user is found
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // Rethrow the error for further handling
    }
};


// Update employee function
exports.updateEmployee = async(employeeId, firstName, lastName, employeeRole, hireDate, salary)=> {
    const query = `
      UPDATE employee
      SET
        firstName = COALESCE($2, firstName),
        lastName = COALESCE($3, lastName),
        employeeRole = COALESCE($4, employeeRole),
        hireDate = COALESCE($5, hireDate),
        salary = COALESCE($6, salary)
      WHERE employeeId = $1;
    `;
  
    const values = [employeeId, firstName, lastName, employeeRole, hireDate, salary];
  
    try {
      await pool.query(query, values);
      console.log(`Employee with ID ${employeeId} updated successfully.`);
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  exports.deactivate = async(employeeId)=> {
    console.log(employeeId);
    const query = `
      UPDATE employee
      SET
        isActive = FALSE
      WHERE employeeId = $1;
    `;
  
    const values = [employeeId];
  
    try {
      await pool.query(query, values);
      console.log(`Employee with ID ${employeeId} diactivated successfully.`);
    } catch (err) {
      console.error('Error diactivating employee:', err);
      throw err;
    }
  };



  exports.activate = async(employeeId)=> {
    const query = `
      UPDATE employee
      SET
        isactive = TRUE
      WHERE employeeid = $1;
    `;
  
    const values = [employeeId];
  
    try {
      await pool.query(query, values);
      console.log(`Employee with ID ${employeeId} activated successfully.`);
    } catch (err) {
      console.error('Error activating employee:', err);
      throw err;
    }
  };




  exports.wasEmployee = async(empId)=>{

    console.log('hell'+empId);
    try{
        const rs = await pool.query(`
          select * from employee where employeeid = $1 `, [empId]);

         if(rs.rows.length > 0){
             return true
         }
         else return false;
 
     }
     catch(err){
         console.log("error accurred while checking whether employee is paid");
         throw err;
 
     }

  };


  exports.getStatus = async(empId)=>{

    try{
        const rs = await pool.query(`
           SELECT isactive from employee
             WHERE employeeid = $1`, [empId]);

             
             
         if(rs.rows[0].isactive){
          console.log('status '+rs.rows[0].isactive);
             return rs.rows[0].isactive;
         }
         else return false;
 
     }
     catch(err){
         console.log("error accurred while checking whether employee is active");
         throw err;
 
     }

  };



  exports.isPaid = async(id,month,year)=>{
    try{
       const rs = await pool.query(`
            SELECT * from salaryRecord
            WHERE employeeid = $1
                AND paidYear = $2
                AND paidMonth = $3;
            
        `, [id, month,  year]);
        if(rs.rows.length > 0){
            return true

        }
        else return false;

    }
    catch(err){
        console.log("error accurred while checking whether employee is paid");
        throw err;

    }

  };
  
  exports.createPaymentRecord = async(id,month,year,salary)=>{
    try
        { 
          const checkIsactive = await this.getStatus(id);
          if(checkIsactive){
            const result = await pool.query(
              'INSERT INTO salaryrecord (paidYear, paidmonth, employeeId, paidsalary) VALUES ($1, $2, $3, $4) RETURNING *',
              [year, month, id, salary]
            );
    
           if (result.rows.length > 0) {
            return  true// Return the inserted row
          } else {
            return  false;
          }

          }
          return false;
             
    }
     catch (error) {
      throw error;
  }


  }
  

