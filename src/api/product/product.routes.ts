import express, { Router } from 'express';

import { productController } from './product.controller';
import { ProductModel } from './product.model';
import productMapper from './product.mapper';

import { admin, auth, pagination } from 'middleware';

const router: Router = express.Router();

router.route('/').get(pagination(ProductModel, productMapper), productController.getProducts);
router.route('/top').get(productController.getTopProducts);
router.route('/:id').get(productController.getProductById);
router.route('/:id/reviews').post(auth, productController.createProductReview);

router.route('/').post(admin, productController.createProduct);
router.route('/:id').put(admin, productController.updateProduct);
/** TODO: Make this route an auth one */
router.route('/:id/photo').patch(productController.uploadProductPhoto);
router.route('/delete/:id').patch(admin, productController.deleteProduct);

export default router;
