export interface SignUpDto {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  mobile: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}
