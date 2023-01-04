const db = require("../../db");
const { ITEM_PER_PAGE_PRODUCT } = require("../../constant/index");

exports.countAllProducts = async () => {
    let count = await db.connection.execute(`select count(*) from product`);
    return count[0][0]["count(*)"];
};

exports.getAllProduct = async (page = 1) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await this.countAllProducts();
    const data = await db.connection.execute(
        `select product.*, category.name as category_name, brand.name as brand_name from product, category, brand where product.category_Id = category.category_Id and product.brand_Id = brand.id limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / + ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
};

exports.getProductById = async (id) => {
    const result = await db.connection.execute("select product.*, category.name as category_name, brand.name as brand_name from product, category, brand where product.product_Id = ? and product.category_Id = category.category_Id and product.brand_Id = brand.id", [id]);
    return result[0][0];
};

exports.getProductByCategory = async (page, cate_Id) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await db.connection.execute(`select count(*) from Product where category_Id = ?`, [cate_Id]);
    const data = await db.connection.execute(
        `select * from Product where category_Id = ? limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT
        }`,
        [cate_Id]
    );
    count = count[0][0]["count(*)"];
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };

    return result;
};

exports.getProductByBrand = async (page, brand_Id) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await db.connection.execute(`select count(*) from Product where brand_Id = ?`, [brand_Id]);
    const data = await db.connection.execute(
        `select * from Product where brand_Id = ? limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT
        }`,
        [brand_Id]
    );
    count = count[0][0]["count(*)"];
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };

    return result;
};

exports.getAllCategory = async () => {
    const result = await db.connection.execute("select * from category");
    return result[0];
};

exports.getAllBrand = async () => {
    const result = await db.connection.execute("select * from brand");
    return result[0];
};

exports.getSortedProductByPrice_ASC = async (page, cate_Id, brand_Id, nameFilter, min, max) => {
    //let count = this.countAllProducts();
    //const result = await db.connection.execute('select * from Product order by price where category_Id=?',[cate_Id]);
    let sqlCount = "select count(*) from Product";
    let sqlData = "select product.*, category.name as category_name, brand.name as brand_name from product, category, brand where product.category_Id = category.category_Id and product.brand_Id = brand.id ";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("brand repo: ", brand_Id);
    console.log(
        "SQL: ",
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by price limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter || cate_Id || brand_Id || min ? " where " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } `
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by price limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = count[0][0]["count(*)"];
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };

    return result;

    //return result[0];
};

exports.getSortedProductByPrice_DESC = async (page, cate_Id, brand_Id, nameFilter, min, max) => {
    //let count = this.countAllProducts();
    //const result = await db.connection.execute('select * from Product order by price where category_Id=?',[cate_Id]);
    let sqlCount = "select count(*) from Product";
    let sqlData = "select product.*, category.name as category_name, brand.name as brand_name from product, category, brand where product.category_Id = category.category_Id and product.brand_Id = brand.id ";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("brand repo: ", brand_Id);
    console.log(
        "SQL: ",
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by price desc limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter || cate_Id || brand_Id || min ? " where " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } `
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by price desc limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = count[0][0]["count(*)"];
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };

    return result;
};

exports.getSortedProductByRate_Star_ASC = async (page, cate_Id, brand_Id, nameFilter, min, max) => {
    //let count = this.countAllProducts();
    //const result = await db.connection.execute('select * from Product order by price where category_Id=?',[cate_Id]);
    let sqlCount = "select count(*) from Product";
    let sqlData = "select product.*, category.name as category_name, brand.name as brand_name from product, category, brand where product.category_Id = category.category_Id and product.brand_Id = brand.id ";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("brand repo: ", brand_Id);
    console.log(
        "SQL: ",
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by rate_star limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter || cate_Id || brand_Id || min ? " where " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } `
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by rate_star limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = count[0][0]["count(*)"];
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };

    return result;
};

exports.getSortedProductByRate_Star_DESC = async (page, cate_Id, brand_Id, nameFilter, min, max) => {
    // const result = await db.connection.execute('select * from Product order by rate_star DESC');
    // return result[0];

    let sqlCount = "select count(*) from Product";
    let sqlData = "select product.*, category.name as category_name, brand.name as brand_name from product, category, brand where product.category_Id = category.category_Id and product.brand_Id = brand.id ";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("brand repo: ", brand_Id);
    console.log(
        "SQL: ",
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by rate_star desc limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter || cate_Id || brand_Id || min ? " where " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } `
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } order by rate_star desc limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = count[0][0]["count(*)"];
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };

    return result;
};

// exports.getProductByCategory = async (cate_Id) => {
//     const result = await db.connection.execute('select * from Product where category_Id = ?', [cate_Id]);
//     return result[0];
// }

exports.filter = async (page = 1, cate_Id = 0, brand_Id = 0, nameFilter, min, max) => {
    let sqlCount = "select count(*) from Product";
    let sqlData = "select product.*, category.name as category_name, brand.name as brand_name from product, category, brand where product.category_Id = category.category_Id and product.brand_Id = brand.id ";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("brand repo: ", brand_Id);
    console.log(
        "SQL filter method: ",
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        }  limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    console.log(
        "SQL count method: ",
        `${sqlCount} ${nameFilter || cate_Id || brand_Id || min ? " where " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } `
    )
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter || cate_Id || brand_Id || min ? " where " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        } `
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter || cate_Id || brand_Id || min ? " and " : ""} ${nameFilter ? " product.name LIKE '%" + nameFilter + "%' " : ""
        } ${cate_Id ? (nameFilter ? "and" : "") + " product.category_Id=" + cate_Id : ""} ${brand_Id ? (nameFilter ? "and" : "") + " product.brand_Id=" + brand_Id : ""} ${min ? (nameFilter || cate_Id || brand_Id ? " and " : "") + "price between " + min + " and " + max : ""
        }  limit ${ITEM_PER_PAGE_PRODUCT} offset ${(Number(page) - 1) * ITEM_PER_PAGE_PRODUCT}`
    );
    count = count[0][0]["count(*)"];
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    console.log({
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    });

    return result;
};

exports.getSortedProductByRelease_Date_Latest = async () => {
    const result = await db.connection.execute("select * from Product order by release_date");
    return result[0];
};


exports.addProduct = async (product) => {
    const result = await db.connection.execute(
        "insert into product(name, description, remain_Amount, price, image, category_Id, rate_Star, brand_Id, release_Date, hot_product, status) values(?,?,?,?,?,?,?,?,?,?,?)",
        [
            product.name,
            product.description,
            product.quantity,
            product.price,
            product.image,
            product.category_Id,
            product.rate_Star,
            product.brand_Id,
            product.release_Date,
            product.hot_product,
            product.status,
        ]
    );
    return result[0];
};

exports.updateProduct = async (product) => {
    const result = await db.connection.execute(
        "update product set name = ?, description = ?, remain_Amount = ?, price = ?, image = ?, category_Id = ?, rate_Star = ?, brand_Id = ?, hot_product = ?, status = ? where product_Id = ?",
        [
            product.name,
            product.description,
            product.quantity,
            product.price,
            product.image,
            product.category_Id,
            product.rate_Star,
            product.brand_Id,
            product.hot_product,
            product.status,
            product.id,
        ]
    );
    return result[0];
}

exports.deleteProduct = async (id) => {
    const result = await db.connection.execute("delete from product where product_Id = ?", [id]);
    return result[0];
}