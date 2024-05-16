import { Router } from "express";
const router = Router()

import {getAllPurchase, getPurchase, createPurchase, updatePurchase, deleteJob, getMonthlyPrice } from '../controllers/purchaseController.js';
import { validatePurchaseInput, validateIdParam } from "../middleware/validationMiddleware.js";

// router.get('/', getAllPurchase)
// router.post('/', createJob)

router.route('/').get(getAllPurchase).post(validatePurchaseInput, createPurchase)
router.get('/prices/:year', getMonthlyPrice)
router
  .route("/:id")
  .get(validateIdParam, getPurchase)
  .patch(validatePurchaseInput, validateIdParam, updatePurchase)
  .delete(validateIdParam, deleteJob);

export default router;