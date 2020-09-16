// api/workOrders.js
const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { requireAuthentication } = require('../lib/auth');
const { 
    insertNewWorkOrder,
    getWorkOrdersById,
    updateWorkOrderById,
    deleteWorkOrderByIds,
    WorkOrderSchema,
    WorkOrderPatchSchema
} = require('../models/workOrders');

// PATH: localhost:5000/work-orders/:id
router.get('/:id', requireAuthentication, async(req, res) => {
    const userId = parseInt(req.params.id);
    // Check if user is a valid user from db
    if(req.authenticated) { 
        try {
            // Query for the list of work orders by user
            const workorders = await getWorkOrdersById(userId);
            
            res.status(200).send({
                orders: workorders,
                successStatus: true 
            });
        } catch(err) {
            res.status(500).send({
                errorMessage: "Server failed to get work orders",
                successStatus: false
            });
        }
    } else {
        res.status(400).send({
            errorMessage: "Unauthenticated user",
            successStatus: false 
        });
    }
});

// PATH: localhost:5000/work-orders/:id
router.post('/:id', requireAuthentication, async(req, res) => {
    req.body.userId = parseInt(req.params.id); // Append the user ID to the body
    const body = extractValidFields(req.body, WorkOrderSchema);

    if(validateAgainstSchema(body, WorkOrderSchema) && req.authenticated){
        try{
            // Make query to database
            const insertId = await insertNewWorkOrder(body);
          
            res.status(201).send({
                orderId: insertId,
                successStatus: true
            });
        } catch (err) {
            res.status(500).send({
                errorMessage: "Server failed access",
                successStatus: false 
            });
        }
    } else {
        res.status(400).send({
            errorMessage: "Request body contained inadequate fields",
            successStatus: false
        });
    }
});

// PATH: localhost:5000/work-orders/:id
router.patch('/:id', requireAuthentication, async (req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, WorkOrderPatchSchema);
    // Check if request body is valid
    if(validateAgainstSchema(body, WorkOrderPatchSchema)) {
        // Validate authenticated user
        if(req.authenticated){
            try {
                // Query to update the work order
                await updateWorkOrderById(body);
                
                res.status(200).send({
                    successStatus: true 
                });
            } catch (err) {
                res.status(500).send({
                    errorMessage: "Server not responding",
                    successStatus: false
                });
            }
        } else {
            res.status(403).send({
                errorMessage: "Unauthenticated user",
                successStatus: false
            });
        }
    } else {
        res.status(400).send({
            errorMessage: "Invalid request body",
            successStatus: false
        });
    }
});

// PATH: localhost:5000/work-orders/:id/:orderId
router.delete('/:id/:orderId', requireAuthentication, async (req, res) => {
    // Get the user and allergy id from uri
    const ids = {
        userId: parseInt(req.params.id),
        orderId: parseInt(req.params.orderId)
    };
    if(req.authenticated){
        try {
            // Make query to delete a allergy
            await deleteWorkOrderByIds(ids);
        
            res.status(200).send({
                successStatus: true
            });
        } catch (err) {
            
            res.status(500).send({
                errorMessage: "Server was not responding to request",
                successStatus: false 
            });
        }
    } else {
        res.status(401).send({
            errorMessage: "Unauthenticated action",
            successStatus: false 
        });
    }
});

module.exports = router;