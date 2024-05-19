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
