const categoryService = require("../categoryService");
const qs = require("qs");

exports.getApiCategories = async (req, res) => {
    // const filter = req.params.filter
    const { name: nameFilter} = req.query;
    console.log("Query: ", req.query);
    let currentPage = req.query.page || 1;

    currentPage = Number(currentPage);
    //kt nếu có số page

    let listCategories;
    if (!nameFilter) {
        listCategories = await categoryService.getAllCategory(currentPage);
        return res.json(listCategories);
    } else {
        listCategories = await categoryService.filter(currentPage, nameFilter);
    }

    return res.json(listCategories);
};
