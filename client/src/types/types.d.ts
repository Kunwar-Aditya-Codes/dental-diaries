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

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
declare module "*.pdf";
declare module "*.doc";
declare module "*.docx";
declare module "*.xls";
