const accountRepository = require('./accountRepository');

exports.countAllAccount = async () => {
    return accountRepository.countAllAccounts();
}

exports.getAllAccount = async (page = 1, search = '', sort = '') => {
    return accountRepository.getAllAccount(page, search, sort);
}

exports.ban_user = async (id) => {
    return await accountRepository.ban_user(id)
}

exports.getSortedAccountByNameOrEmail_DESC = async (page, name, email, nameFilter) => {
    return accountRepository.getSortedAccountByNameOrEmail_DESC(page, name, email, nameFilter);
}

exports.getSortedAccountByNameOrEmail_ASC = async (page, name, email, nameFilter) => {
    return accountRepository.getSortedAccountByNameOrEmail_ASC(page, name, email, nameFilter);
}

exports.getSortedAccountByDay_DESC = async (page, day, nameFilter) => {
    return accountRepository.getSortedAccountByDay_DESC(page, day, nameFilter);
}

exports.getSortedAccountByDay_ASC = async (page, day, nameFilter) => {
    return accountRepository.getSortedAccountByDay_ASC(page, day, nameFilter);
}

exports.getAccountById = async (id) => {
    return accountRepository.getAccountById(id);
}