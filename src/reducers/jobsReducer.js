
export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_ORDERS': {
            return { ...state, orders: action.orders }
        }
        case 'NO_ORDERS': {
            return { ...state, orders: undefined }
        }
        case 'GET_COMPLETED_ORDERS': {
            return { ...state, completedOrders: action.completedOrders, noCompletedOrders: action.noCompletedOrders }
        }
        case 'ORDER_DETAILS': {
            console.log('reducer')
            return { ...state, orderDetails: action.orderDetails }
        }
        default:
            return state
    }
}