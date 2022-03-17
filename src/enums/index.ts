export enum Environments {
  Development = 'development',
  Production = 'production',
  Testing = 'testing',
}

export enum UserRoles {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatuses {
  Active = 'Active',
  Blocked = 'Blocked',
  Closed = 'Closed',
  Deleted = 'Deleted',
  Pending = 'Pending',
}

export enum ProductStatuses {
  Pending = 'Pending',
  InStock = 'InStock',
  OutOfStock = 'OutOfStock',
  Deleted = 'Deleted',
}

export enum OrderStatuses {
  Processing = 'Processing',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export enum Genders {
  Male = 'Male',
  Female = 'Female',
}

export enum S3Folders {
  App = 'app',
  Users = 'users',
  Products = 'products',
}

export enum ModelNames {
  PRODUCT = 'Product',
  USER = 'User',
  ORDER = 'Order',
}
