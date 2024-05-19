import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm! : FormGroup;
   authService= inject(AuthenticationService);
  constructor(private fb : FormBuilder,
              private router : Router) {
  }
  ngOnInit() {
    this.loginForm= this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    console.log("=================== Startt  dbczhddhikd;nbDHJ  ===================") ;

    let auth = this.authService.login(username, password);
    console.log(`************  ${auth}  *****************`) ;
    if(auth){
      console.log("=================== qdbdhfgjqzhhhhf  ===================") ;
      this.router.navigateByUrl("/admin")
    }
  }

}
