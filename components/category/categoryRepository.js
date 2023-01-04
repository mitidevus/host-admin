const db = require("../../db");
const { ITEM_PER_PAGE_CATEGORY } = require("../../constant/index");

exports.countAllCategory = async () => {
    let count = await db.connection.execute(`select count(*) from category`);
    return count[0][0]["count(*)"];
};

exports.getAllCategory = async (page = 1) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await this.countAllCategory();
    const data = await db.connection.execute(
        `SELECT c.category_Id, c.name, c.image, COUNT(p.product_Id) as productsCount
        FROM category c
        LEFT JOIN product p ON p.category_Id = c.category_Id
        GROUP BY c.category_Id limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );

    // let productsCount = await db.connection.execute(
    //     `select count(*) from category, product where category.category_Id = product.category_Id group by category.category_Id limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    // );

    // for (let i = 0; i < data[0].length; i++) {
    //     data[0][i].productsCount = productsCount[0][i]["count(*)"];
    // }

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / + ITEM_PER_PAGE_CATEGORY),
        item_per_page: ITEM_PER_PAGE_CATEGORY,
    };
    return result;
};

// exports.getProductByCategory = async (cate_Id) => {
//     const result = await db.connection.execute('select * from Product where category_Id = ?', [cate_Id]);
//     return result[0];
// }

exports.filter = async (page = 1, nameFilter) => {
    let sqlCount = "select count(*) from category";
    let sqlData = "select * from category";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log(
        "SQL filter method: ",
        `${sqlData} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        } limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        }`
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        } limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );
    count = count[0][0]["count(*)"];

    let productsCount = await db.connection.execute(
        `select count(*) from category, product where category.category_Id = product.category_Id group by category.category_Id limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );

    for (let i = 0; i < data[0].length; i++) {
        data[0][i].productsCount = productsCount[0][i]["count(*)"];
    }

    console.log("data: ", data[0]);

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_CATEGORY),
        item_per_page: ITEM_PER_PAGE_CATEGORY,
    };
    console.log({
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_CATEGORY),
        item_per_page: ITEM_PER_PAGE_CATEGORY,
    });

    return result;
};

exports.checkCategoryExisted = async (name) => {
    const result = await db.connection.execute("select * from category where name = ?", [name]);
    console.log("result_length: ", result[0].length);
    return result[0].length > 0;
};

exports.addCategory = async (name, image) => {
    const result = await db.connection.execute(
        "insert into category (name, image) values (?, ?)",
        [name, image]
    );
    console.log("sql_add_result: ", result[0]);
    return result[0];
};

exports.getCategoryById = async (id) => {
    const result = await db.connection.execute("select * from category where category_Id = ?", [id]);
    return result[0][0];
};

exports.updateCategory = async (id, name, image) => {
    const result = await db.connection.execute("update category set name = ?, image = ? where category_Id = ?", [name, image, id]);
    console.log("sql_update_result: ", result[0]);
    return result[0];
};