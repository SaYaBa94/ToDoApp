import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private apiService: ApiService) { }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  isLoggedIn(): boolean {
    return this.apiService.isLoggedIn();
  }
  logOut() {
    this.apiService.logOut();
  }
}
