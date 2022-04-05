class PaymentMapper {
  private id;
  private status;
  private updateTime;
  private emailAddress;

  constructor(data: any) {
    this.id = data.id;
    this.status = data.status;
    this.updateTime = data.updateTime;
    this.emailAddress = data.emailAddress;
  }
}

export default PaymentMapper;
