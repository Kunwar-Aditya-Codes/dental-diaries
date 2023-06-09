interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: number;
}

interface IHEALTHFORM {
  formId: string;
  description: string;
  User: IUser;
  formStatus: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: string;
}
