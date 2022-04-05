class ShipmentMapper {
  private address;
  private city;
  private postalCode;
  private country;

  constructor(data: any) {
    this.address = data.address;
    this.city = data.city;
    this.postalCode = data.postalCode;
    this.country = data.country;
  }
}

export default ShipmentMapper;
