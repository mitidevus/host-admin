const brandService = require("../brandService");
const qs = require("qs");

exports.getApiBrands = async (req, res) => {
    // const filter = req.params.filter
    const { name: nameFilter } = req.query;
    console.log("Query: ", req.query);
    let currentPage = req.query.page || 1;

    currentPage = Number(currentPage);
    //kt nếu có số page

    let listBrands;
    if (!nameFilter) {
        listBrands = await brandService.getAllBrand(currentPage);
        return res.json(listBrands);
    } else {
        listBrands = await brandService.filter(currentPage, nameFilter);
    }

    return res.json(listBrands);
};
