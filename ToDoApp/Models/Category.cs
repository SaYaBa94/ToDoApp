using System;
using System.Collections.Generic;
using System.Linq;


namespace ToDoApp.Models
{
    public class Category
    {

        public string CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Todo> Todos { get; set; }

    }
}
