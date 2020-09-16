// workOrderData.js

const workOrderData = (state = [], action) => {
    switch(action.type){
        case 'WORK_ORDER_DATA_INIT':
            return state = action.data;
        case 'WORK_ORDER_DATA_ADD':
            state.push(action.data);
            return state;
        case 'WORK_ORDER_DATA_EDIT':
            for(var i = 0; i < state.length; i++){
                if(state[i].orderId === action.data.orderId){
                    state[i].title = action.data.title;
                    state[i].context = action.data.context;
                    break;
                }
            }
            return state;
        case 'WORK_ORDER_DATA_DELETE':
            var newState = [];
            for(var i = 0; i < state.length; i++) {
                if(state[i].orderId === action.orderId){
                    continue;
                }else {
                    newState.push(state[i]);
                }
            }
            return newState;
        default:
            return state;
    }
}

export default workOrderData