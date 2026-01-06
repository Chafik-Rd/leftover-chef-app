// Type for login
export interface LoginType {
  email: string;
  password: string;
}

// Type for register
export interface RegisterType extends LoginType {
  firstName: string;
  lastName: string;
  //   role?: UserRoles;
}
