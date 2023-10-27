import  express  from "express";
import managementController from "../../controllers/managementController.js";
const router = express.Router();

router.route('/')
    .get(managementController.getAllManagement)
    .post(managementController.createManagement);

router.route('/:id')
    .get(managementController.getManagement)
    .put(managementController.updateManagement)
    .delete(managementController.deleteManagement);

export default router;