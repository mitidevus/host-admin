const db = require('../../db');

exports.emailExists = async (email) => {
  const result = await db.connection.execute('select email from user where email = ? limit 1', [email]);
  return result[0].length > 0;
};

/**
 * Return the user info with specify email, otherwise null
 * @param email
 * @returns {Promise<object|null>}
 */
exports.getUserByEmail = async (email) => {
  const result = await db.connection.execute('select * from user where email = ? and isActive = 1 limit 1', [email]);
  //console.log(typeof result[0][0].user_Id)
  return result[0] && result[0][0];
};


exports.insertUser = async (fullname, email, address, password) => {
  await db.connection.execute('INSERT INTO `user` (`fullname`, `email`, `address`, `password`) VALUES (?,?,?,?)', [fullname, email, address, password]);
};

exports.getUserById = async (id) => {
  const result = await db.connection.execute('select * from user where user_Id = ?', [id]);
  return result[0] && result[0][0];
};

exports.updatePassword = async (id, password) => {
  await db.connection.execute('UPDATE `user` SET `password` = ? WHERE (`user_Id` = ?)', [password, id]);
};