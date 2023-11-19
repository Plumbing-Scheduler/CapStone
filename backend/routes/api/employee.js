import express from "express";
import employeeController from "../../controllers/employeeController.js";
const router = express.Router();

router.route('/')
    .get(employeeController.getAllEmployee)
    .post(employeeController.createEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

router.route('/password/:id')
    .put(employeeController.changePassword)

export default router;