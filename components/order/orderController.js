const orderService = require("./orderService");
const qs = require("qs");

exports.list_orders = async (req, res) => {
    const filter = req.params.filter;
    const { name: nameFilter } = req.query;
    let currentPage = req.query.page || 1;
    let url_filter = "";
    let url_sort = "";

    currentPage = Number(currentPage);

    console.log("currentPage", currentPage);

    console.log("a= " + nameFilter);

    //kt nếu có số page
    if (nameFilter) {
        url_filter = "?name=" + nameFilter;
    }
    if (filter) url_sort = "/sort/" + filter;

    let listOrders = [];
    if (!nameFilter && !filter) {
        listOrders = await orderService.getAllOrder(currentPage);
    }
    if (nameFilter) {
        listOrders = await orderService.filter(nameFilter);
        console.log("listOrders Filter", listOrders);
    }

    if (filter === "default") {
        listOrders = await orderService.getAllOrder(currentPage);
    } else if (filter === "time-new") {
        listOrders = await orderService.getSortedOrderByTime_New(currentPage, nameFilter);
    } else if (filter === "time-old") {
        listOrders = await orderService.getSortedOrderByTime_Old(currentPage, nameFilter);
    } else if (filter === "status-delivering") {
        listOrders = await orderService.getSortedOrderByStatus_Delivering(currentPage, nameFilter);
    } else if (filter === "status-delivered") {
        listOrders = await orderService.getSortedOrderByStatus_Delivered(currentPage, nameFilter);
    } else if (filter === "status-cancelled") {
        listOrders = await orderService.getSortedOrderByStatus_Cancelled(currentPage, nameFilter);
    }

    const sumPage = listOrders.total_page;

    let listcurrentPage = currentPage;
    let listLeftPage = [];
    let listRightPage = [];

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i < currentPage) {
            if (i > 0) listLeftPage.push(i);
        }
        if (i > currentPage) {
            if (i <= sumPage) listRightPage.push(i);
        }
    }

    res.render("order/list_order", {
        url_sort,
        url_filter,
        listOrders,
        listLeftPage,
        listcurrentPage,
        listRightPage,
        sumPage,
    });
};

exports.detail_order = async (req, res) => {
    const id = req.params.id;
    const order = await orderService.getOrderById(id);
    const orderDetail = await orderService.getOrderDetailById(id);
    console.log("order", order)
    console.log("orderDetail", orderDetail)

    for (let i = 0; i < orderDetail.length; i++) {
        // Add key total
        orderDetail[i].total = orderDetail[i].price * orderDetail[i].quantity;
    }

    // Total of order
    let totalOrder = 0;
    for (let i = 0; i < orderDetail.length; i++) {
        totalOrder += orderDetail[i].price * orderDetail[i].quantity;
    }
    for (let i = 0; i < orderDetail.length; i++) {
        orderDetail[i].price = orderDetail[i].price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
        orderDetail[i].total = orderDetail[i].total.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }
    totalOrder = totalOrder.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });

    res.render("order/order_detail", { order, orderDetail, totalOrder });
};

exports.accept_order = async (req, res) => {
    const id = req.params.id;
    await orderService.acceptOrder(id);
    res.redirect("/order");
};

exports.pending_order = async (req, res) => {
    const id = req.params.id;
    await orderService.pendingOrder(id);
    res.redirect("/order");
};

exports.cancel_order = async (req, res) => {
    const id = req.params.id;
    await orderService.cancelOrder(id);
    res.redirect("/order");
}