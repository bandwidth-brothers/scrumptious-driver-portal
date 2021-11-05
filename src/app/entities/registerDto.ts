import { Address } from "./address";

export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
    licenseNo: string;
    phone: string;
    password: string;
    address: Address;
}