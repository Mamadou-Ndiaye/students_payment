import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Payments} from "../models/payments";

@Component({
  selector: 'app-load-payments',
  templateUrl: './load-payments.component.html',
  styleUrls: ['./load-payments.component.css']
})
export class LoadPaymentsComponent implements OnInit{

  private  studentService = inject(StudentsService);
  payments!: Array<Payments>;
  dataSource:any;
  displayedColumns: string[] = ['ID', 'Date', 'Amount', 'Status', 'Type', 'Student'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments(){
    this.studentService.getAllPayments().subscribe({
      next: data => {
        this.payments = data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

}
