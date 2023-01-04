const bcrypt = require("bcryptjs");
const authRepository = require("./authRepository");

// exports.register = async (fullname, email, address, password) => {
//     if (await authRepository.emailExists(email)) throw new Error("Email exists!");
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     return authRepository.insertUser(fullname, email, address, hash);
// };

/**
 * Check user credential and return the user info, otherwise null
 * @param email
 * @param password
 * @returns {Promise<Object|null>}
 */
exports.checkUserCredential = async (email, password) => {
    const user = await authRepository.getUserByEmail(email);
    // console.log("fullname: ", user.fullname)
    if (!user) return null;
    if (!user.isActive || !user.isAdmin) return null;

    let temp = await bcrypt.compare(password, user.password);

    if (temp) {
        return user;
    }
    return null;
};

exports.getUserByEmail = async (email) => {
    const result = await authRepository.getUserByEmail(email);
    if (!result) return null;
    return result;
};

exports.getUserById = async (id) => {
    const result = await authRepository.getUserById(id);
    if (!result) return null;
    return result;
};

exports.updatePassword = async (id, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return authRepository.updatePassword(id, hash);
};

exports.emailExists = (email) => authRepository.emailExists(email);
