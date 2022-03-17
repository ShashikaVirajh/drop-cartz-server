import express, { Application } from 'express';
import AWS from 'aws-sdk';
import morgan from 'morgan';

import { errorHandler, routeNotFound } from './src/middleware';
import { baseRoutes } from './src/constants/base-routes.constants';
import { Environments } from './src/enums';

import connectDB from './src/database/database';
import authRoutes from './src/api/auth/auth.routes';
import productRoutes from './src/api/product/product.routes';
import userRoutes from './src/api/user/user.routes';
import orderRoutes from './src/api/order/order.routes';

export default (app: Application): void => {
  connectDB();

  const {} = process.env;

  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  if (process.env.NODE_ENV === Environments.Development) app.use(morgan('dev'));

  app.use(express.json({ limit: process.env.REQUEST_BODY_MAX_SIZE, type: process.env.REQUEST_TYPE }));

  app.use(baseRoutes.AUTH_ROUTE, authRoutes);
  app.use(baseRoutes.PRODUCT_ROUTE, productRoutes);
  app.use(baseRoutes.USER_ROUTE, userRoutes);
  app.use(baseRoutes.ORDER_ROUTE, orderRoutes);

  app.use(routeNotFound);
  app.use(errorHandler);
};
