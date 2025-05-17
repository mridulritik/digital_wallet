import { accountHistory, accountDetail, checkBalance, transferAmount } from "../controller/transaction.controller.js";

import { Router } from "express";

const router = Router()

router.route('/accountDetail').post(accountDetail)
router.route('/accountHistory').post(accountHistory)
router.route('/checkBalance').post(checkBalance)
router.route('/transferAmount').post(transferAmount)

export default router
