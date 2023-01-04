const db = require("../../db");
const { ITEM_PER_PAGE_BRAND } = require("../../constant/index");

exports.countAllBrand = async () => {
    let count = await db.connection.execute(`select count(*) from brand`);
    return count[0][0]["count(*)"];
};

exports.getAllBrand = async (page = 1) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await this.countAllBrand();
    const data = await db.connection.execute(
        `SELECT b.id, b.name, b.image, COUNT(p.product_Id) as productsCount
        FROM brand b
        LEFT JOIN product p ON p.brand_Id = b.id
        GROUP BY b.id limit ${ITEM_PER_PAGE_BRAND} offset ${(Number(page) - 1) * ITEM_PER_PAGE_BRAND}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / + ITEM_PER_PAGE_BRAND),
        item_per_page: ITEM_PER_PAGE_BRAND,
    };
    return result;
};

exports.filter = async (page = 1, nameFilter) => {
    let sqlCount = "select count(*) from brand";
    let sqlData = "select * from brand";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log(
        "SQL filter method: ",
        `${sqlData} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        } limit ${ITEM_PER_PAGE_BRAND} offset ${(Number(page) - 1) * ITEM_PER_PAGE_BRAND}`
    );
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        }`
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        } limit ${ITEM_PER_PAGE_BRAND} offset ${(Number(page) - 1) * ITEM_PER_PAGE_BRAND}`
    );
    count = count[0][0]["count(*)"];

    let productsCount = await db.connection.execute(
        `select count(*) from brand, product where brand.id = product.brand_Id group by brand.id limit ${ITEM_PER_PAGE_BRAND} offset ${(Number(page) - 1) * ITEM_PER_PAGE_BRAND}`
    );

    for (let i = 0; i < data[0].length; i++) {
        data[0][i].productsCount = productsCount[0][i]["count(*)"];
    }

    console.log("data: ", data[0]);

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_BRAND),
        item_per_page: ITEM_PER_PAGE_BRAND,
    };
    console.log({
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_BRAND),
        item_per_page: ITEM_PER_PAGE_BRAND,
    });

    return result;
};

exports.checkBrandExisted = async (name) => {
    const result = await db.connection.execute("select * from brand where name = ?", [name]);
    console.log("result_length: ", result[0].length);
    return result[0].length > 0;
};

exports.addBrand = async (name, image) => {
    const result = await db.connection.execute(
        "insert into brand (name, image) values (?, ?)",
        [name, image]
    );
    console.log("sql_add_result: ", result[0]);
    return result[0];
};

exports.getBrandById = async (id) => {
    const result = await db.connection.execute("select * from brand where id = ?", [id]);
    return result[0][0];
};

exports.updateBrand = async (id, name, image) => {
    const result = await db.connection.execute("update brand set name = ?, image = ? where id = ?", [name, image, id]);
    console.log("sql_update_result: ", result[0]);
    return result[0];
};