using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ToDoApp.Models
{

    public class Todo
    {

        public string TodoId { get; set; }
        public string Content { get; set; }
        public DateTime TodoDate { get; set; }

        public bool status { get; set; }
    }
}


