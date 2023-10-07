import express from "express";
import workOrderController from "../../controllers/workOrderController.js";
const router = express.Router();

router.route('/')
    .get(workOrderController.getAllWorkOrders)
    .post(workOrderController.createWorkOrder);

router.route('/:id')
    .get(workOrderController.getWorkOrder)
    .put(workOrderController.updateWorkOrder)
    .delete(workOrderController.deleteWorkOrder);

export default router;