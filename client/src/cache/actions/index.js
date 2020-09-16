export const loginUser = userData => {
    return {
        type: 'USER_LOGIN',
        payload: userData
    }
}

export const logoutUser = () => {
    return {
        type: 'USER_LOGOUT'
    }
}

export const initWorkOrders = data => {
    return {
        type: 'WORK_ORDER_DATA_INIT',
        data: data
    }
}

export const addWorkOrder = data => {
    return {
        type: 'WORK_ORDER_DATA_ADD',
        data: data 
    }
}

export const editWorkOrder = data => {
    return {
        type: 'WORK_ORDER_DATA_EDIT',
        data: data 
    }
}

export const deleteWorkOrder = orderId => {
    return {
        type: 'WORK_ORDER_DATA_DELETE',
        orderId: orderId
    }
}