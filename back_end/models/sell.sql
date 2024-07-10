



CREATE TABLE IF NOT EXISTS sellbooks (
  id SERIAL PRIMARY KEY,
  isbn VARCHAR(13) NOT NULL,
  date DATE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),  
  price DECIMAL(10, 2),
  FOREIGN KEY (isbn) REFERENCES book (isbn)
);




