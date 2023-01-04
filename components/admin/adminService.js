const adminRepository = require('./adminRepository');

exports.getAdminById = async (id) => {
    return adminRepository.getAdminById(id);
}

exports.updateAdminProfile = async (id, fullname, address, phone, avatar) => {
    return adminRepository.updateAdminProfile(id, fullname, address, phone, avatar);
}