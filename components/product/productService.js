const productRepository = require('./productRepository');

exports.countAllProducts = async () => {
    return productRepository.countAllProducts();
}

exports.getAllProduct = async (page = 1) => {
    return productRepository.getAllProduct(page);
}

exports.getProductById = async (id) => {
    return productRepository.getProductById(id);
}

exports.getProductByCategory = async (page = 1, cate_Id) => {
    return productRepository.getProductByCategory(page, cate_Id)
}

exports.getProductByBrand = async (page = 1, brand_Id) => {
    return productRepository.getProductByBrand(page, brand_Id)
}

exports.getAllCategory = async () => {
    return productRepository.getAllCategory();
}

exports.getAllBrand = async () => {
    return productRepository.getAllBrand();
}

exports.getSortedProductByPrice_ASC = async (page, cate_Id, brand_id, nameFilter, min, max) => {
    return productRepository.getSortedProductByPrice_ASC(page, cate_Id, brand_id, nameFilter, min, max)
}

exports.getSortedProductByPrice_DESC = async (page, cate_Id, brand_id, nameFilter, min, max) => {
    return productRepository.getSortedProductByPrice_DESC(page, cate_Id, brand_id, nameFilter, min, max)
}

exports.getSortedProductByRate_Star_ASC = async (page, cate_Id, brand_id, nameFilter, min, max) => {
    return productRepository.getSortedProductByRate_Star_ASC(page, cate_Id, brand_id, nameFilter, min, max)
}

exports.getSortedProductByRate_Star_DESC = async (page, cate_Id, brand_id, nameFilter, min, max) => {
    return productRepository.getSortedProductByRate_Star_DESC(page, cate_Id, brand_id, nameFilter, min, max)
}

exports.filter = async (page = 1, cate_id = 0, brand_id = 0, nameFilter, min, max) => {
    return productRepository.filter(page, cate_id, brand_id, nameFilter, min, max)
}

exports.getSortedProductByRelease_Date_Latest = () => {
    return productRepository.getSortedProductByRelease_Date_Latest();
}

exports.addProduct = async (product) => {
    return productRepository.addProduct(product);
}

exports.updateProduct = async (product) => {
    return productRepository.updateProduct(product);
}

exports.deleteProduct = async (id) => {
    return productRepository.deleteProduct(id);
}