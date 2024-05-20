import {Students} from "./students";

export interface Payments {

  id: number;
  date: Date;
  amount: number;
  status: string;
  type: string;
  file: string;
  student: Students;
}

export enum  PaymentStatus{
  CREATED, VALIDATED, REJECTED
}

export enum  PaymentType{
  CASH, CHECK, TRANSFER, DEPOT
}
