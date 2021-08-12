import { isDefined } from "../../../helpers/utils";

export const updateOrders = (orders, setOrders, user, data, setData) => {
    const { updatedOrders, newData } = getOrdersWithUpdates(data, orders, user);
    setOrders(updatedOrders);
    setData(newData.filter(d => !isDefined(d.treated)));
    return new Promise((resolve, reject) => resolve(false));
};

const getOrdersWithUpdates = (data, orders, user) => {
    let updatedOrders = orders;
    const newData = data.map(order => {
        if (isDefined(order.id)) {
            const orderToEdit = {...order, items : getFormattedItems(order)};
            if (isDefined(order.user) && user.id === order.user.id)
                updatedOrders = getUpdatedOrders(orderToEdit, updatedOrders);
        } else {
            updatedOrders = [...updatedOrders].filter(o => o['@id'] !== order['@id']);
        }
        return {...order, treated: true};
    });
    return { updatedOrders, newData };
};

const getUpdatedOrders = (newOrder, updatedOrders) => {
    const index = updatedOrders.findIndex(o => o['@id'] === newOrder['@id']);
    const newOrders = index !== -1 ? updatedOrders.map(o => o['@id'] !== newOrder['@id'] ? o : newOrder) : [...updatedOrders, newOrder];
    return newOrders;
};

const getFormattedItems = order => !Array.isArray(order.items) ? Object.keys(order.items).map(key => order.items[key]) : order.items;