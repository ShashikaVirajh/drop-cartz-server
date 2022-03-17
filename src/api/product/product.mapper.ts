import { IProductDocument } from './product.model';

class Product {
  private id;
  private name;
  private photo;
  private brand;
  private category;
  private description;
  private rating;
  private reviewCount;
  private price;
  private countInStock;
  private status;
  private reviews;

  constructor(data?: IProductDocument) {
    this.id = data?.id;
    this.name = data?.productName;
    this.photo = data?.photo?.url;
    this.brand = data?.brand;
    this.category = data?.category;
    this.description = data?.description;
    this.rating = data?.rating;
    this.reviewCount = data?.reviewCount;
    this.price = data?.price;
    this.countInStock = data?.countInStock;
    this.status = data?.status;
    this.reviews = data?.reviews;
  }
}

export default Product;
