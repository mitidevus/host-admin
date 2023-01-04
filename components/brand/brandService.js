const brandRepository = require('./brandRepository');

exports.countAllBrand = async () => {
  return brandRepository.countAllBrand();
}

exports.getAllBrand = async (page = 1) => {
  return brandRepository.getAllBrand(page);
}

exports.filter = async (page = 1,nameFilter) => {
  return brandRepository.filter(page, nameFilter)
}

exports.checkBrandExisted = async (name) => {
  return brandRepository.checkBrandExisted(name);
}

exports.addBrand = async (name, image) => {
  const status = await this.checkBrandExisted(name);
  if (status) throw new Error("brand existed");
  return brandRepository.addBrand(name, image);
}

exports.getBrandById = async (id) => {
  return brandRepository.getBrandById(id);
};

exports.editBrand = async (id, name, image) => {
  return brandRepository.updateBrand(id, name, image);
};