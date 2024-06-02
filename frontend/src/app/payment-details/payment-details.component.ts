import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit{
   idPayment: any;

  constructor(private activatedRoute: ActivatedRoute, private  studentsService : StudentsService, private router:  Router) {
  }

  ngOnInit(): void {
    this.idPayment=this.activatedRoute.snapshot.params['id'];
    this.studentsService.paymentDetails(this.idPayment);

  }
}
