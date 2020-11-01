import { Todo } from "../todo/todo"

export class Category {
  categoryId: string
  name: string
  description: string
  todos: Todo[]
}
