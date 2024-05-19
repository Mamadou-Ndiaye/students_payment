import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {ProfileComponent} from "./profile/profile.component";
import {StudentsComponent} from "./students/students.component";
import {PaymentsComponent} from "./payments/payments.component";
import {LoadStudentsComponent} from "./load-students/load-students.component";
import {LoadPaymentsComponent} from "./load-payments/load-payments.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path : "admin", component : AdminTemplateComponent,
    canActivate: [AuthGuard],
    children : [
      {path : "home", component : HomeComponent},
      {path : "profile", component : ProfileComponent},
      {path : "students", component : StudentsComponent},
      {path : "payments", component : PaymentsComponent},
      {
        path : "loadStudents", component : LoadStudentsComponent,
        //canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
      {
        path : "loadPayments", component : LoadPaymentsComponent,
       // canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
