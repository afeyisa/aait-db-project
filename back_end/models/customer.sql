-- Create the customer table
CREATE TABLE customer (
    customerid varchar(12) PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE
);

-- Create the book table


-- Create the rent table
CREATE TABLE rent (
    customerid varchar(12) REFERENCES customer(customerid),
    isbn VARCHAR(13) REFERENCES book(isbn),
    rentdate DATE NOT NULL,
    returndate DATE,
    quantity INT NOT NULL CHECK (quantity > 0),
    amount_paid DECIMAL(10, 2),
    PRIMARY KEY (customerid, isbn, rentdate)
);
