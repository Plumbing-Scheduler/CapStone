import express from "express";
import customerController from "../../controllers/customerController.js";
const router = express.Router();

router.route('/')
    .get(customerController.getAllCustomer)
    .post(customerController.createCustomer);

router.route('/:id')
    .get(customerController.getCustomer)
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

router.route('/quote/:email&:phone')
    .get(customerController.getCustomerByNamePhoneEmail);

export default router;