const db = require("../../db");
const { ACCOUNT_PER_PAGE } = require("../../constant/index");

exports.countAllAccount = async () => {
    let count = await db.connection.execute(`select count(*) from user`);
    return count[0][0]["count(*)"];
};

exports.getAllAccount = async (page = 1, search, sort) => {
    let sqlOrder;
    if (sort === "name-mail-asc") {
        sqlOrder = "order by email asc, fullname asc"
    } else if (sort === "name-mail-desc") {
        sqlOrder = "order by email desc, fullname desc"
    } else if (sort === "day-asc") {
        sqlOrder = "order by created_at asc"
    } else if (sort === "day-desc") {
        sqlOrder = "order by created_at desc"
    }
    let sqlCount = "select count(*) from user"
    let sqlData = "select * from user"

    let sql = `${sqlData} ${search ? " where " : ""} ${search ? "email LIKE '%" + search + "%' " : ""} ${sqlOrder ? sqlOrder : ""} limit ${ACCOUNT_PER_PAGE} offset ${(Number(page) - 1) * ACCOUNT_PER_PAGE}`
    console.log(sql)
    let count = await db.connection.execute(`${sqlCount} ${search ? " where " : ""} ${search ? "email LIKE '%" + search + "%' " : ""} `);
    let data = await db.connection.execute(`${sqlData} ${search ? " where " : ""} ${search ? "email LIKE '%" + search + "%' " : ""} ${sqlOrder ? sqlOrder : ""} limit ${ACCOUNT_PER_PAGE} offset ${(Number(page) - 1) * ACCOUNT_PER_PAGE}`);

    count = count[0][0]["count(*)"]

    if (count == 0) {
        count = await db.connection.execute(`${sqlCount} ${search ? " where " : ""} ${search ? "fullname LIKE '%" + search + "%' " : ""} `);
        data = await db.connection.execute(`${sqlData} ${search ? " where " : ""} ${search ? "fullname LIKE '%" + search + "%' " : ""} ${sqlOrder ? sqlOrder : ""} limit ${ACCOUNT_PER_PAGE} offset ${(Number(page) - 1) * ACCOUNT_PER_PAGE}`);
    }


    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / + ACCOUNT_PER_PAGE),
        account_per_page: ACCOUNT_PER_PAGE,
    };
    return result;
};

exports.ban_user = async (id) => {
    return await db.connection.execute(`update user set isActive= not isActive where user_Id=${id}`);
}

exports.getSortedProductByNameOrEmail_DESC = async (page, name, email, nameFilter) => {
    let sqlCount = "select count(*) from user";
    let sqlData = "select * from user";
    let data;
    let count;

}

exports.getSortedProductByNameOrEmail_ASC = async (page, name, email, nameFilter) => {
    let sqlCount = "select count(*) from user";
    let sqlData = "select * from user";
    let data;
    let count;

}

exports.getSortedProductByDay_DESC = async (page, day, nameFilter) => {
    let sqlCount = "select count(*) from user";
    let sqlData = "select * from user";
    let data;
    let count;

}

exports.getSortedProductByDay_ASC = async (page, day, nameFilter) => {
    let sqlCount = "select count(*) from user";
    let sqlData = "select * from user";
    let data;
    let count;

}

exports.getAccountById = async (id) => {
    let data = await db.connection.execute(`select * from user where user_Id =? `, [id]);
    return data[0][0];
}