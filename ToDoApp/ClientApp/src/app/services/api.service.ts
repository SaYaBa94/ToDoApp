import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, Subject } from 'rxjs';
import { Category } from '../category/category';
import { Todo } from '../todo/todo';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private _todos = new Subject<Todo[]>();
  todos$ = this._todos.asObservable();

  private _categoryNo = new Subject<number>();
  categoryNo$ = this._categoryNo.asObservable();

  baseURL: string = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  loggedIn = false;

  register(user: User): Observable<User> {

    return this.http.post<User>(this.baseURL + "register", user);
  }


  sendTodos(todos: Todo[],categoryNo:number) {
    this._todos.next(todos);
    this._categoryNo.next(categoryNo);
  }

  login(email: string, pass:string): Observable<User> {
    let params = new HttpParams().set('email', email).set('pass', pass);

    return this.http.get<User>(this.baseURL + 'login', { params });;
  }



  getTodos(_categoryNo: number): Observable<Todo[]> {
    let params = new HttpParams().set('userId', localStorage.getItem("isLogged")).set('categoryno', _categoryNo.toString());
    return this.http.get<Todo[]>(this.baseURL + 'getTodos', { params });
  }
  addTodo(todo: Todo, _categoryNo:number) {
    let params = new HttpParams().set('userId', localStorage.getItem("isLogged")).set('categoryno', _categoryNo.toString());
    console.log(_categoryNo+"from api");
    return this.http.post<Category>(this.baseURL + "addTodo", todo, { params });
  }
  deleteTodo(categoryNo: number, todoNo:number): Observable<User> {
    let a = todoNo + "";
    let params = new HttpParams().set('userId', localStorage.getItem("isLogged")).set('categoryno', categoryNo.toString()).set('todono', a);
    console.log(categoryNo);
    return this.http.delete<User>(this.baseURL + "deleteTodo", { params });
  }

  getCategories(): Observable<Category[]> {
    let params = new HttpParams().set('userId', localStorage.getItem("isLogged"));
    return this.http.get<Category[]>(this.baseURL + 'getCategories', { params });
  }
  addCategory(category: Category): Observable<Category> {
    let params = new HttpParams().set('userId', localStorage.getItem("isLogged"));
    return this.http.post<Category>(this.baseURL + "addCategory", category, { params });
  }
  deleteCategory(categoryNo: number): Observable<Category> {
    let params = new HttpParams().set('userId', localStorage.getItem("isLogged")).set('categoryno', categoryNo.toString());
    return this.http.delete<Category>(this.baseURL + "deleteCategory", { params });
  }


  isLoggedIn() {
    var a=localStorage.getItem("isLogged")
    if (a == null) {
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
    }
    return this.loggedIn;
  }
  logOut() {
    localStorage.removeItem("isLogged");
    this.loggedIn = false;
  }
}
