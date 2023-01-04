const categoryRepository = require('./categoryRepository');

exports.countAllCategory = async () => {
  return categoryRepository.countAllCategory();
}

exports.getAllCategory = async (page = 1) => {
  return categoryRepository.getAllCategory(page);
}

exports.filter = async (page = 1, nameFilter) => {
  return categoryRepository.filter(page, nameFilter)
}

exports.checkCategoryExisted = async (name) => {
  return categoryRepository.checkCategoryExisted(name);
}

exports.addCategory = async (name, image) => {
  const status = await this.checkCategoryExisted(name);
  if (status) throw new Error("Category existed");
  return categoryRepository.addCategory(name, image);
}

exports.getCategoryById = async (id) => {
  return categoryRepository.getCategoryById(id);
};

exports.editCategory = async (id, name, image) => {
  return categoryRepository.updateCategory(id, name, image);
};