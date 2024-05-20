import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Students} from "../models/students";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Router} from "@angular/router";

@Component({
  selector: 'app-load-students',
  templateUrl: './load-students.component.html',
  styleUrls: ['./load-students.component.css']
})
export class LoadStudentsComponent  implements  OnInit{

  private  studentService = inject(StudentsService);
  students!: Array<Students>;
  dataSource:any;
  displayedColumns: string[] = ['ID', 'FirstName', 'LastName', 'Email', 'ProgramId', 'Code','Payments'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private router: Router) {
  }

    ngOnInit(): void {
        this.getAllStudent();
    }

    getAllStudent(){
      this.studentService.getAllStudents().subscribe({
        next: data => {
          this.students = data;
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
    }

    studentPayments(student: Students){
        this.router.navigateByUrl("/admin/student-details/" + student.code) ;
    }

}
