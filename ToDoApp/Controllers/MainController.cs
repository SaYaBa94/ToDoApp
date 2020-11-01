using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Couchbase.Core;
using Couchbase.Extensions.DependencyInjection;
using Couchbase.N1QL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models;

namespace ToDoApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class MainController : ControllerBase
    {

        private readonly IBucket _bucket;

        public MainController(IBucketProvider bucketProvider)
        {
            _bucket = bucketProvider.GetBucket("todoBucket");

        }


        [HttpGet]
        [Route("login")]
        public IActionResult Login(string email, string pass)
        {
            var n1ql = "SELECT t.* FROM todoBucket t WHERE t.email = $email AND t.pass = $pass ";
            var query = QueryRequest.Create(n1ql);
            query.AddNamedParameter("$email", email).AddNamedParameter("$pass", pass);
            var result = _bucket.Query<User>(query).FirstOrDefault();
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);

        }


        [HttpPost]
        [Route("register")]
        public IActionResult Register(User user)
        {
            var n1ql = "SELECT t.* FROM todoBucket t WHERE t.email = $email";
            var query = QueryRequest.Create(n1ql);
            query.AddNamedParameter("$email", user.Email);
            var result = _bucket.Query<User>(query).FirstOrDefault();
            if (result != null)
            {
                return BadRequest("This email already exists");
            }

            var key = Guid.NewGuid().ToString();
            user.UserId = key;

            List<Todo> todoList = new List<Todo>();
            todoList.Add(new Todo { TodoId = Guid.NewGuid().ToString(), Content = "First todo", TodoDate = DateTime.Now.ToLocalTime(), status = true });

            List<Category> categoryList = new List<Category>();
            categoryList.Add(new Category { CategoryId = Guid.NewGuid().ToString(), Name = "General", Description = "General Category", Todos = todoList });

            user.Categories = categoryList;
            _bucket.Insert(key, user);
            return Ok("User Successfully created");
        }


        //Categories
        [HttpGet]
        [Route("getCategories")]
        public IActionResult GetCategories(string userId)
        {
            var u = _bucket.Get<User>(userId);
            User user = u.Value;
            if (user != null)
            {
                var q = _bucket.Get<User>(user.UserId);
                List<Category> categorylist = new List<Category>();
                categorylist = q.Value.Categories;
                return Ok(categorylist);
            }
            return BadRequest();

        }
        [HttpPost]
        [Route("addCategory")]
        public async Task<IActionResult> AddCategory(string userId, Category category)
        {
            var u = await _bucket.GetAsync<User>(userId);
            User user = u.Value;
            List<Todo> todoList = new List<Todo>();

            category.CategoryId = Guid.NewGuid().ToString();
            category.Todos = todoList;

            user.Categories.Add(category);

            _bucket.Upsert(user.UserId, user);
            return Ok();
        }

        [HttpDelete]
        [Route("deleteCategory")]
        public async Task<IActionResult> deleteCategory(string userId, int categoryNo)
        {
            var u = await _bucket.GetAsync<User>(userId);
            User user = u.Value;
            Category category = user.Categories.ElementAt(categoryNo);
            user.Categories.Remove(category);
            _bucket.Upsert(user.UserId, user);
            return Ok();
        }


        //Todos
        [HttpPost]
        [Route("addTodo")]
        public async Task<IActionResult> AddTodo(string userId, Todo todo, int categoryNo)
        {

            var u = await _bucket.GetAsync<User>(userId);
            User user = u.Value;
            todo.TodoId = Guid.NewGuid().ToString();

            user.Categories[categoryNo].Todos.Add(todo);

            _bucket.Upsert(user.UserId, user);
            return Ok();
        }

        [HttpGet]
        [Route("getTodos")]
        public async Task<IActionResult> GetTodos(string userId, int categoryno)
        {
            var q = await _bucket.GetAsync<User>(userId);
            List<Todo> todolist = q.Value.Categories.ElementAt(categoryno).Todos;
            return Ok(todolist);

        }

       
        [HttpDelete]
        [Route("deleteTodo")]
        public async Task<IActionResult> DeleteTodo(string userId, int categoryno, int todoNo)
        {

            var u = await _bucket.GetAsync<User>(userId);
            User user = u.Value;
            Todo todo = user.Categories[categoryno].Todos[todoNo];
            user.Categories[categoryno].Todos.Remove(todo);

            _bucket.Upsert(user.UserId, user);
            return Ok();
        }
  
        [HttpGet]
        [Route("getActiveTodos")]
        public async Task<IActionResult> GetActiveTodos(string userId, int categoryno)
        {
            var q = await _bucket.GetAsync<User>(userId);

            List<Todo> todolist = q.Value.Categories.ElementAt(categoryno).Todos.Where(t => t.status == true).ToList();
            return Ok(todolist);
        }


        [HttpGet]
        [Route("getPassiveTodos")]
        public async Task<IActionResult> GetPassiveTodos(string userId, int categoryno)
        {
            var q = await _bucket.GetAsync<User>(userId);

            List<Todo> todolist = q.Value.Categories.ElementAt(categoryno).Todos.Where(t => t.status == false).ToList();
            return Ok(todolist);
        }


        [HttpPut]
        [Route("changeStatus")]
        public async Task<IActionResult> changeStatus(string userId, int categoryno, int todoNo)
        {
            var u = await _bucket.GetAsync<User>(userId);
            User user = u.Value;
            Todo todo = user.Categories[categoryno].Todos[todoNo];
            if (todo.status==true)
            {
                todo.status = false;
            }
            else
            {
                todo.status=true;
            }
            

            _bucket.Upsert(user.UserId, user);
            return Ok();
        }



    }

}

