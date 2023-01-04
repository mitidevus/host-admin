const productService = require("../productService");
const qs = require("qs");

exports.getApiProducts = async (req, res) => {
    // const filter = req.params.filter
    const { name: nameFilter, sort: filter, cate_id: cate_id, brand_id: brand_id, min: min, max: max } = req.query;
    console.log("Query: ", req.query);
    let currentPage = req.query.page || 1;

    currentPage = Number(currentPage);
    //kt nếu có số page

    let listProducts;
    if (!nameFilter && !filter && !cate_id && !brand_id && !min && !max) {
        listProducts = await productService.getAllProduct(currentPage);
        return res.json(listProducts);
    }

    if (filter === "price-asc") {
        listProducts = await productService.getSortedProductByPrice_ASC(currentPage, cate_id, brand_id, nameFilter, min, max);
    } else if (filter === "price-desc") {
        listProducts = await productService.getSortedProductByPrice_DESC(currentPage, cate_id, brand_id, nameFilter, min, max);
    } else if (filter === "rate-star-asc") {
        listProducts = await productService.getSortedProductByRate_Star_ASC(currentPage, cate_id, brand_id, nameFilter, min, max);
    } else if (filter === "rate-star-desc") {
        listProducts = await productService.getSortedProductByRate_Star_DESC(currentPage, cate_id, brand_id, nameFilter, min, max);
    } else {
        listProducts = await productService.filter(currentPage, cate_id, brand_id, nameFilter, min, max);
    }

    for (let i = 0; i < listProducts.data.length; i++) {
        listProducts.data[i].price = listProducts.data[i].price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }

    return res.json(listProducts);
};
