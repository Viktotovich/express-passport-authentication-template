const pool = require("./pool");

module.exports.getUserByUname = async function (uname) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users_and_passwords WHERE username = $1",
      [uname]
    );
    return rows;
  } catch (err) {
    console.error(err);
  }
};
