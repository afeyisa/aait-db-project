-- employee(
--     employeeId,
--     fristName,
--     lastName,
--     employeeRole,
--     email
--     phone
--     hireDate,
--     salary,

-- )

-- salaryRecord(
--     paidYear,
--     paidMonth,
--     employeeId,
--     paidSalary

-- )

CREATE TABLE employee (
    employeeId varchar(50) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    employeeRole VARCHAR(50) NOT NULL,
    phone VARCHAR(15)  NOT NULL,
    email VARCHAR(50),
    hireDate DATE NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    isActive BOOLEAN DEFAULT True
);


CREATE TABLE salaryRecord (
    paidYear INT NOT NULL,
    paidMonth INT NOT NULL,
    employeeId varchar(50) NOT NULL,
    paidSalary NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (paidYear,paidMonth,employeeId),
    FOREIGN KEY (employeeId) REFERENCES employee(employeeId)
);
