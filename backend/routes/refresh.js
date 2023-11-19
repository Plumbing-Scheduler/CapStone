import express from 'express';
import refreshTokenController from '../controllers/refreshTokenController.js';
const router = express.Router();

router.get('/', refreshTokenController.handleRefresh);

export default router;
