import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Students} from "../models/students";
import {Payments} from "../models/payments";



@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private  http: HttpClient) { }

   getAllStudents(): Observable<Array<Students>>{
         return  this.http.get<Array<Students>>(`${environment.apiUrl}students`);
   }

  getAllPayments() {
    return  this.http.get<Array<Payments>>(`${environment.apiUrl}payments`);
  }

  getStudentPayments(code : string) {
    return  this.http.get<Array<Payments>>(`${environment.apiUrl}students/${code}/payments`);
  }
}
