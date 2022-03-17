import { IOrderDocument } from './order.model';

class OrderMapper {
  private id;
  private userId;
  private orderItems;
  private shippingAddress;
  private paymentInfo;
  private paymentMethod;
  private taxPrice;
  private shippingPrice;
  private totalPrice;
  private orderStatus;
  private paidAt;
  private deliveredAt;

  constructor(data: IOrderDocument) {
    this.id = data._id;
    this.userId = data.userId;
    this.orderItems = data.orderItems;
    this.shippingAddress = data.shippingAddress;
    this.paymentInfo = data.paymentInfo;
    this.paymentMethod = data.paymentMethod;
    this.taxPrice = data.taxPrice;
    this.shippingPrice = data.shippingPrice;
    this.totalPrice = data.totalPrice;
    this.orderStatus = data.orderStatus;
    this.paidAt = data.paidAt;
    this.deliveredAt = data.deliveredAt;
  }
}

export default OrderMapper;
