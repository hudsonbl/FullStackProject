// models/workOrders.js
const mysqlPool = require('../lib/mysqlPool');

const WorkOrderSchema = {
    userId: {required: true},
    title: {required: true},
    content: {required: true}
};
exports.WorkOrderSchema = WorkOrderSchema;

const WorkOrderPatchSchema = {
    userId: {required: true},
    orderId: {required: true},
    title: {required: false},
    content: {required: false}
};
exports.WorkOrderPatchSchema = WorkOrderPatchSchema;

async function insertNewWorkOrder(body){
    const [ results ] = await mysqlPool.query(  
        'INSERT INTO workorders SET ?',
        body 
    );
    console.log(body)
    return results.insertId;
}
exports.insertNewWorkOrder = insertNewWorkOrder;

async function getWorkOrdersById(userId){
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM workorders WHERE userId=?',
        [userId]
    );
    if(results.length === 0){
        throw new Error("No work order found");
    }
    // console.log results and understand what the sql query returns!
    return results;
}
exports.getWorkOrdersById = getWorkOrdersById;

async function updateWorkOrderById(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE workorders SET ? WHERE userId=? AND orderId=?',
        [body, body.userId, body.orderId]
    );
    // Helps say nothing new was changed
    if(results.affectedRows == 0){
        throw new Error("No workorder by orderId was affected");
    }
    return results;
}
exports.updateWorkOrderById = updateWorkOrderById;

async function deleteWorkOrderByIds(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM workorders WHERE userId=? AND orderId=?',
        [ids.userId, ids.orderId]
    );
    // Helps say nothing new was changed 
    if(results.affectedRows === 0){
        throw new Error("No workorder by orderId was affected");
    }
    return results.affectedRows;
}
exports.deleteWorkOrderByIds = deleteWorkOrderByIds;