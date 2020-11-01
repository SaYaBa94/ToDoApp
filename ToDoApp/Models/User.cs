using System;
using System.Collections.Generic;
using System.Linq;


namespace ToDoApp.Models
{

    public class User
    {

        public string UserId { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<Category> Categories { get; set; }


    }
}
