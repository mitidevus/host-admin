const orderRepository = require('./orderRepository');

exports.countAllOrders = async () => {
    return orderRepository.countAllOrders();
}

exports.getAllOrder = async (page=1) => {
    return orderRepository.getAllOrder(page);
}

exports.getAllOrderAccepted = async (page=1) => {
    return orderRepository.getAllOrderAccepted(page);
}

exports.getAllOrderCancelled = async (page=1) => {
    return orderRepository.getAllOrderCancelled(page);
}

exports.getAllOrderPending = async (page=1) => {
    return orderRepository.getAllOrderPending(page);
}

exports.getOrderById = async (id) => {
    return orderRepository.getOrderById(id);
}

exports.getOrderDetailById = async (id) => {
    return orderRepository.getOrderDetailById(id);
}

exports.getSortedOrderByTime_New = async (page=1, nameFilter) => {
    return orderRepository.getSortedOrderByTime_New(page, nameFilter);
}

exports.getSortedOrderByTime_Old = async (page=1, nameFilter) => {
    return orderRepository.getSortedOrderByTime_Old(page, nameFilter);
}

exports.getSortedOrderByStatus_Delivering = async (page=1, nameFilter) => {
    return orderRepository.getSortedOrderByStatus_Delivering(page, nameFilter);
}

exports.getSortedOrderByStatus_Delivered = async (page=1, nameFilter) => {
    return orderRepository.getSortedOrderByStatus_Delivered(page, nameFilter);
}

exports.getSortedOrderByStatus_Cancelled = async (page=1, nameFilter) => {
    return orderRepository.getSortedOrderByStatus_Cancelled(page, nameFilter);
}

exports.filter = async (page=1, nameFilter) => {
    return orderRepository.filter(page, nameFilter);
}

exports.acceptOrder = async (id) => {
    return orderRepository.acceptOrder(id);
}

exports.pendingOrder = async (id) => {
    return orderRepository.pendingOrder(id);
}

exports.cancelOrder = async (id) => {
    return orderRepository.cancelOrder(id);
}