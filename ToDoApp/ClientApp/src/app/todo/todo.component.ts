import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Todo } from './todo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
 
  constructor(private apiService: ApiService) { }
  todos: Todo[];
  model: Todo = new Todo();
  categoryNo=0;
  todono: number;
  ngOnInit() {
    this.apiService.todos$.subscribe((data) => {
      this.todos = data;
      console.log(this.todos);
    });
    this.apiService.categoryNo$.subscribe((data) => {
      this.categoryNo = data

      console.log(this.categoryNo);
    });
  }
  deleteTodo(categoryno: number, todono: number) {
    console.log(categoryno.toString() + todono.toString())
    this.apiService.deleteTodo(categoryno, todono).subscribe();
  }
  addTodo(form: NgForm) {
    this.apiService.addTodo(this.model, this.categoryNo).subscribe();
  }
  getCategoryno(event,todono:number): number {
    return this.categoryNo;
  }
  
  }


