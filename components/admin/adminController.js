const adminService = require("./adminService")

exports.account_profile = async (req, res) => {
    const id = req.user.user_Id
    const account = await adminService.getAdminById(id)
    res.render("admin/profile", { account });
}
exports.account_show_edit_profile = async (req, res) => {
    const id = req.user.user_Id
    const account = await adminService.getAdminById(id)
    console.log("account", account)
    res.render("admin/edit_profile", { account });
}

exports.account_edit_profile = async (req, res) => {
    const { id, fullname, address, phone, avatar } = req.body;
    // console.log("id", id);
    // console.log("fullname", fullname);
    // console.log("address", address);
    // console.log("avatar", avatar);

    await adminService.updateAdminProfile(id, fullname, address, phone, avatar);

    req.session.passport.user.fullname = fullname;
    req.session.passport.user.address = address;
    req.session.passport.user.phone = phone;
    req.session.passport.user.avatar = avatar;
    res.redirect("/admin/")
}