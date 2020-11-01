import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Category } from './category';
import { Todo } from '../todo/todo';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[]
  todos: Todo[]
  constructor(private apiService: ApiService, public datepipe: DatePipe) { }
  categoryNo: number
  model: Category = new Category()
  ngOnInit() {
    this.getCategories();
    this.getTodos(0);
  }
  getCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  sendTodos(todos: Todo[],categoryNo:number) {
    this.apiService.sendTodos(this.todos,this.categoryNo)
  }
  getTodos(categoryNo:number) {
    this.apiService.getTodos(categoryNo).subscribe((data) => {
      this.todos = data;
      this.categoryNo = categoryNo;
      this.sendTodos(data, categoryNo);
    });
  }
  deleteCategory(categoryNo: number) {
    this.apiService.deleteCategory(categoryNo).subscribe();
    this.getTodos(categoryNo);
  }
addCategory(form: NgForm) {
  this.apiService.addCategory(this.model).subscribe();
  this.getTodos(this.categoryNo);
}



}
