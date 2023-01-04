const brandService = require("./brandService");
const qs = require("qs");

exports.list_brand = async (req, res) => {
    const filter = req.params.filter;
    const { name: nameFilter } = req.query;
    let currentPage = req.query.page || 1;
    let url_filter = "";

    currentPage = Number(currentPage);

    console.log("currentPage", currentPage);

    console.log("a= " + nameFilter);

    //kt nếu có số page
    if (nameFilter) {
        url_filter = "?name=" + nameFilter;
    }

    let listBrand = [];
    if (!nameFilter) {
        listBrand = await brandService.getAllBrand(currentPage);
    }
    if (nameFilter) {
        listBrand = await brandService.filter(currentPage, nameFilter);
        console.log("listBrand Filter", listBrand);
    }

    const sumPage = listBrand.total_page;

    let listcurrentPage = currentPage;
    let listLeftPage = [];
    let listRightPage = [];

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i < currentPage) {
            if (i > 0) listLeftPage.push(i);
        }
        if (i > currentPage) {
            if (i <= sumPage) listRightPage.push(i);
        }
    }

    console.log("currentPage", currentPage);

    res.render("brand/list_brand", {
        // url_filter,
        listBrand,
        // listLeftPage,
        // listcurrentPage,
        // listRightPage,
        // originalUrl: `/product/page/1/${qs.stringify(filter)}`,
    });
};

exports.show_add_brand = (req, res) => {
    res.render("brand/add_brand");
};

exports.add_brand = async (req, res) => {
    const { name: brand_name, image: brand_img } = req.body;
    console.log("brand_name", brand_name);
    console.log("brand_img", brand_img);

    try {
        const result = await brandService.addBrand(brand_name, brand_img);
        console.log("add_brand_result", result);
        res.redirect("/brand");
    } catch (err) {
        console.log(err);
        res.render("brand/add_brand", { error: err.message });
    }
};

exports.show_edit_brand = async (req, res) => {
    const brand_id = req.params.id;
    const brand = await brandService.getBrandById(brand_id);
    console.log("brand:", brand);
    res.render("brand/edit_brand", { brand });
};

exports.edit_brand = async (req, res) => {
    const { id: brand_id, name: brand_name, image: brand_img } = req.body;
    console.log("brand_id", brand_id);
    console.log("brand_name", brand_name);
    console.log("brand_img", brand_img);

    try {
        const result = await brandService.editBrand(brand_id, brand_name, brand_img);
        console.log("edit_brand_result", result);
        res.redirect("/brand");
    } catch {
        console.log(err);
        res.render("brand/edit_brand", { error: err.message });
    }
};