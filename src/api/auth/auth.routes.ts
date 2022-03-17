import express, { Router } from 'express';

import { authController } from './auth.controller';

const router: Router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.signIn);

export default router;
