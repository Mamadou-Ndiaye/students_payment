import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {MatTableDataSource} from "@angular/material/table";
import {Payments} from "../models/payments";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements  OnInit{

  studentCode! : string;
  dataSource: any;
  private payments!: Array<Payments>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['ID', 'Date', 'Amount', 'Status', 'Type', 'Student','Details'];



  constructor(private activatedRoute: ActivatedRoute, private  studentsService : StudentsService, private router:  Router) {
  }
    ngOnInit(): void {
       this.studentCode=this.activatedRoute.snapshot.params['code'];
       this.studentsService.getStudentPayments(this.studentCode).subscribe({
         next: data => {
           this.payments = data;
           this.dataSource = new MatTableDataSource(this.payments);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
         }
       })
    }

  newPayment() {
       this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)  ;
  }

  paymentDetails(element: Payments) {
    this.router.navigateByUrl(`/admin/payment-details/${element.id}`)  ;
  }
}
