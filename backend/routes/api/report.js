import express from "express";
import reportController from "../../controllers/reportController.js";
const router = express.Router();

router.route('/')
    .get(reportController.getReports)
    .post(reportController.createReport);

router.route('/:id')
    .get(reportController.getReportById)
    .delete(reportController.deleteReport);

    
export default router;