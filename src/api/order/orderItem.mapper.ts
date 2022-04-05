class OrderItemMapper {
  private productId;
  private productName;
  private quantity;
  private price;
  private image;

  constructor(data: any) {
    this.productId = data.productId;
    this.productName = data.productName;
    this.quantity = data.quantity;
    this.price = data.price;
    this.image = data.image;
  }
}

export default OrderItemMapper;
