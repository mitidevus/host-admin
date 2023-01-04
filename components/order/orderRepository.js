const db = require("../../db");
const { ITEM_PER_PAGE_ORDER } = require("../../constant/index");
const { DB_DATABASE } = require("../../config");

exports.countAllOrders = async () => {
    let data = await db.connection.execute(`select count(*) from orders`);
    return data[0][0]["count(*)"];
};

exports.getAllOrder = async (page = 1) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id limit ${ITEM_PER_PAGE_ORDER} offset ${(page - 1) * ITEM_PER_PAGE_ORDER}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_ORDER),
        item_per_page: ITEM_PER_PAGE_ORDER,
    };
    return result;
};

exports.getOrderById = async (id) => {
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and id = ${id}`
    );
    return data[0][0];
}

exports.getOrderDetailById = async (id) => {
    let data = await db.connection.execute(
        `select order_detail.*, product.name as product_name, product.image, product.price, category.name as category_name, brand.name as brand_name from order_detail, product, category, brand where order_Id = ${id} and order_detail.product_Id = product.product_Id and product.category_Id = category.category_Id and product.brand_Id = brand.id;`
    );
    return data[0];
}

exports.getSortedOrderByTime_New = async (page = 1, nameFilter) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id order by orders.release_Date desc limit ${ITEM_PER_PAGE_ORDER} offset ${(page - 1) * ITEM_PER_PAGE_ORDER}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_ORDER),
        item_per_page: ITEM_PER_PAGE_ORDER,
    };
    return result;
}

exports.getSortedOrderByTime_Old = async (page = 1, nameFilter) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id order by orders.release_Date asc limit ${ITEM_PER_PAGE_ORDER} offset ${(page - 1) * ITEM_PER_PAGE_ORDER}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_ORDER),
        item_per_page: ITEM_PER_PAGE_ORDER,
    };
    return result;
}

exports.getSortedOrderByStatus_Delivering = async (page = 1, nameFilter) => {
    let count = await db.connection.execute(`select count(*) from orders where status = "Delivering"`);
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and orders.status = "Delivering" limit ${ITEM_PER_PAGE_ORDER} offset ${(page - 1) * ITEM_PER_PAGE_ORDER}`
    );
    count = count[0][0]["count(*)"]
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_ORDER),
        item_per_page: ITEM_PER_PAGE_ORDER,
    };
    return result;
}

exports.getSortedOrderByStatus_Delivered = async (page = 1, nameFilter) => {
    let count = await db.connection.execute(`select count(*) from orders where status = "Delivered"`);
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and orders.status = "Delivered" limit ${ITEM_PER_PAGE_ORDER} offset ${(page - 1) * ITEM_PER_PAGE_ORDER}`
    );
    count = count[0][0]["count(*)"]
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_ORDER),
        item_per_page: ITEM_PER_PAGE_ORDER,
    };
    return result;
}

exports.getSortedOrderByStatus_Cancelled = async (page = 1, nameFilter) => {
    let count = await db.connection.execute(`select count(*) from orders where status = "Cancelled"`);
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and orders.status = "Cancelled" limit ${ITEM_PER_PAGE_ORDER} offset ${(page - 1) * ITEM_PER_PAGE_ORDER}`
    );
    count = count[0][0]["count(*)"]
    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_ORDER),
        item_per_page: ITEM_PER_PAGE_ORDER,
    };
    return result;
}

exports.filter = async (page = 1, nameFilter) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and user.fullname like "%${nameFilter}%" limit ${ITEM_PER_PAGE_ORDER} offset ${(page - 1) * ITEM_PER_PAGE_ORDER}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_ORDER),
        item_per_page: ITEM_PER_PAGE_ORDER,
    };
    return result;
}

exports.acceptOrder = async (id) => {
    let data = await db.connection.execute(
        `update orders set status = "Delivered" where id = ${id}`
    );
    return data[0];
}

exports.pendingOrder = async (id) => {
    let data = await db.connection.execute(
        `update orders set status = "Delivering" where id = ${id}`
    );
    return data[0];
}

exports.cancelOrder = async (id) => {
    let data = await db.connection.execute(
        `update orders set status = "Cancelled" where id = ${id}`
    );
    return data[0];
}
