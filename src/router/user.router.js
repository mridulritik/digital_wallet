import { Router } from "express";
import { registerUser, userLogin, deleteAccount, userLogout} from "../controller/user.controller.js";
const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(userLogin)
router.route('/deleteAccount').post(deleteAccount)
router.route('/logout').post(userLogout)

export default router