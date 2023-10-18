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

export default router;