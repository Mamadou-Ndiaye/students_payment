import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent  implements OnInit{
  showToolbar: boolean=true;

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showToolbar = !event.url.includes('/login');
      }
    });
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout()
  }
}
