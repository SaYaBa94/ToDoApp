import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  model: User = new User();
  ngOnInit() {
  }
  login(form: NgForm) {
    this.apiService.login(this.model.email, this.model.pass).subscribe((data) => {
      localStorage.setItem("isLogged", data.userId);
      console.log(localStorage.getItem("isLogged"));
    });
  }
}
