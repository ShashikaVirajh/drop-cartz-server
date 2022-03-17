import dotenv from 'dotenv';

import { UserModel } from 'api/user/user.schema';
import { ProductModel } from 'api/product/product.model';
import { OrderModel } from 'api/order/order.model';
import { messages } from 'constants/messages.constants';

import connectDB from 'database/database';
import Logger from 'library/logger.library';
import users from 'data/users.data';
import products from 'data/products.data';

dotenv.config();

connectDB();

const resetCollections = async () => {
  await OrderModel.deleteMany();
  await ProductModel.deleteMany();
  await UserModel.deleteMany();
};

const seed = async () => {
  try {
    await resetCollections();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await ProductModel.insertMany(sampleProducts);

    Logger.log.info(messages.DATA_SEED_SUCCESS);
    process.exit();
  } catch (err) {
    Logger.log.info(messages.DATA_SEED_ERROR);
    process.exit(1);
  }
};

const destroy = async () => {
  try {
    await resetCollections();

    Logger.log.info(messages.DATA_DESTROY_SUCCESS);
    process.exit();
  } catch (err) {
    Logger.log.info(messages.DATA_DESTROY_ERROR);
    process.exit(1);
  }
};

switch (process.argv[2]) {
  case 'seed':
    seed();
    break;
  case 'destroy':
    destroy();
    break;
  default:
    Logger.log.info(messages.SEED_COMMAND_ERROR);
    process.exit();
}
