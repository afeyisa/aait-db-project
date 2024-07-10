

-- Create the book table
CREATE TABLE book (
    isbn VARCHAR(13) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    rent_rate DECIMAL(10, 2) NOT NULL CHECK (rent_rate >= 0)
);

-- Create the inventory table
CREATE TABLE inventory (
    isbn VARCHAR(13) NOT NULL,
    quantity INTEGER NOT NULL,
    shelf_number INTEGER,
    shelf_level INTEGER,
    PRIMARY KEY(isbn,shelf_number,shelf_level)
    FOREIGN KEY (isbn) REFERENCES book (isbn)
);


-- Create the retailArea table
CREATE TABLE retailarea (
    shelf_number INTEGER NOT NULL,
    isbn varchar(13) NOT NULL,
    quantity INTEGER NOT NULL,
    shelf_level INTEGER NOT NULL,
    PRIMARY KEY (shelf_number, shelf_level,isbn),
    FOREIGN KEY (isbn) REFERENCES book (isbn)
);



CREATE OR REPLACE FUNCTION delete_inventory_if_zero() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity = 0 THEN
        DELETE FROM inventory WHERE isbn = NEW.isbn AND shelf_number = NEW.shelf_number AND shelf_level = NEW.shelf_level;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER trg_delete_inventory_if_zero
AFTER UPDATE ON inventory
FOR EACH ROW
WHEN (NEW.quantity = 0)
EXECUTE FUNCTION delete_inventory_if_zero();
