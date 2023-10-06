import  express  from "express";
import calendarController from "../../controllers/calendarController.js";
const router = express.Router();

router.route('/')
    .get(calendarController.getAllCalendar)
    .post(calendarController.createCalendar);

router.route('/:id')
    .get(calendarController.getCalendar)
    .put(calendarController.updateCalendar)
    .delete(calendarController.deleteCalendar);

export default router;