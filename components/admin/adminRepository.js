const db = require("../../db");

exports.getAdminById = async (id) => {
    let data = await db.connection.execute(`select * from user where user_Id=?`, [id]);
    console.log("user", data[0][0]);
    return data[0] && data[0][0];
}

exports.updateAdminProfile = async (id, fullname, address, phone, avatar) => {
    await db.connection.execute('update user set fullname = ?, address = ?, phone = ?, avatar = ? where user_Id = ?', [fullname, address, phone, avatar, id]);
}