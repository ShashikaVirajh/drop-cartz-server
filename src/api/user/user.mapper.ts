// import { IUser } from './user.model';

class UserMapper {
  private id;
  private firstName;
  private lastName;
  private gender;
  private email;
  private mobile;
  private password;
  private photo;
  private role;
  private status;

  constructor(data: any) {
    this.id = data?._id;
    this.firstName = data?.firstName;
    this.lastName = data?.lastName;
    this.gender = data?.gender;
    this.email = data?.email;
    this.mobile = data?.mobile;
    this.password = data?.password;
    this.photo = data?.photo?.url;
    this.role = data?.role;
    this.status = data?.status;
  }
}

export default UserMapper;
