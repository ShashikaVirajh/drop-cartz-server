import express, { Router } from 'express';

import { userController } from './user.controller';
import { UserModel } from './user.schema';
import userMapper from './user.mapper';

import { admin, auth, pagination } from 'middleware';

const router: Router = express.Router();

/** TODO: Once all the other functionalities are stable, fix these 3 endpoints */

// router.route('/register/activate').patch(userController.activateAccount);
// router.route('/forgot').post(userController.forgotPassword);
// router.route('/password/reset').patch(userController.resetPassword);

router.route('/profile').get(auth, userController.getProfile);
router.route('/profile').put(auth, userController.updateProfile);
router.route('/photo').patch(auth, userController.uploadUserPhoto);
router.route('/role').patch(admin, userController.updateUserRole);

router.route('/').get([admin, pagination(UserModel, userMapper)], userController.getUsers);
router.route('/:id/delete').patch(admin, userController.deleteUser);
router.route('/:id').get(admin, userController.getUserById);

export default router;
