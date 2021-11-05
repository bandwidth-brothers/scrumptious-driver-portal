import { Address } from "./address";

export interface Driver {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    licenseNum: string;
    phone: string;
    dob: Date;
    address: Address;

}