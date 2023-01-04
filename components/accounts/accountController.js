const accountService = require("./accountService")

exports.list_accounts = async (req, res) => {
    const list_accounts = await accountService.getAllAccount()
    res.render("accounts/list_accounts", { list_accounts });
};

exports.get_accounts = async (req, res) => {
    const page = req.query.page || 1
    const search = req.query.search || ''
    const sort = req.query.sort || ''
    const list_accounts = await accountService.getAllAccount(page, search, sort)
    res.json(list_accounts);
}

exports.ban_handle = async (req, res) => {
    const id = req.params.id
    console.log("id ban controller: ", id);

    let result = await accountService.ban_user(id)
    res.json(result);
}

exports.view_account_detail = async (req, res) => {
    const account_id = req.params.id;
    console.log("account_id: ", account_id)
    const account = await accountService.getAccountById(account_id);
    console.log("account detail: ", account);
    res.render("accounts/account_detail", {account});
}