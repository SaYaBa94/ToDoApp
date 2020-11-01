import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  model: User = new User();
  ngOnInit() {
  }

  register(form: NgForm) {
    this.apiService.register(this.model).subscribe((data) => {
      console.log(data.email)
    });
  }

}
