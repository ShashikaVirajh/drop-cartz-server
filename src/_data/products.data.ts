/* eslint-disable max-len */

import { IProduct } from 'api/product/product.model';
import { ProductStatuses } from 'enums';

const products: IProduct[] = [
  {
    productName: 'Airpods Wireless Bluetooth Headphones',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    status: ProductStatuses.InStock,
    reviewCount: 12,
    reviews: [],
    photo: {
      key: 'products/9cfa2516-0eb6-4b5b-9088-a92fce4c2497.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/products/9cfa2516-0eb6-4b5b-9088-a92fce4c2497.jpeg',
    },
  },
  {
    productName: 'iPhone 11 Pro 256GB Memory',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    status: ProductStatuses.InStock,
    reviewCount: 8,
    reviews: [],
    photo: {
      key: 'products/a6428093-aab1-45f7-9d9f-37822966fe96.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/products/a6428093-aab1-45f7-9d9f-37822966fe96.jpeg',
    },
  },
  {
    productName: 'Cannon EOS 80D DSLR Camera',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    status: ProductStatuses.InStock,
    reviewCount: 12,
    reviews: [],
    photo: {
      key: 'products/069b25ed-f5ae-42f9-9c8d-fc864cf833c0.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/products/069b25ed-f5ae-42f9-9c8d-fc864cf833c0.jpeg',
    },
  },
  {
    productName: 'Sony Playstation 4 Pro White Version',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    status: ProductStatuses.InStock,
    reviewCount: 12,
    reviews: [],
    photo: {
      key: 'products/b0edd50a-b439-498c-8b7f-feafd89ccfb9.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/products/b0edd50a-b439-498c-8b7f-feafd89ccfb9.jpeg',
    },
  },
  {
    productName: 'Logitech G-Series Gaming Mouse',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    status: ProductStatuses.InStock,
    reviewCount: 10,
    reviews: [],
    photo: {
      key: 'products/f667d0c7-401d-494a-9777-d65bbb093f4b.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/products/f667d0c7-401d-494a-9777-d65bbb093f4b.jpeg',
    },
  },
  {
    productName: 'Amazon Echo Dot 3rd Generation',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    status: ProductStatuses.InStock,
    reviewCount: 12,
    reviews: [],
    photo: {
      key: 'products/904f4114-f7bf-4982-9ddd-20d837a40a19.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/products/904f4114-f7bf-4982-9ddd-20d837a40a19.jpeg',
    },
  },
];

export default products;
