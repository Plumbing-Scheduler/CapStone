import express from "express";
import quoteRequestController from "../../controllers/quoteRequestController.js";
const router = express.Router();

router.route('/')
    .get(quoteRequestController.getAllQuoteRequest)
    .post(quoteRequestController.createQuoteRequest);

router.route('/:id')
    .get(quoteRequestController.getQuoteRequest)
    .put(quoteRequestController.updateQuoteRequest)
    .delete(quoteRequestController.deleteQuoteRequest);

router.route('/custDelete/:id')
    .delete(quoteRequestController.deleteCustomerQuoteRequest);

export default router;