const pool = require( '../models/pool');

exports.sellBook = async (req, res) => {
  const { isbn, date, quantity, price } = req.body;

  try {
    const query = `
      INSERT INTO sellbooks (isbn, date, quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [isbn, date, quantity, price];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Book sold successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error selling book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
