import { TodoDAO } from '../dao/todoDAO';
import type { Todo } from '../interfaces/todo';
import { nanoid } from 'nanoid'; // you can include this dependency

export class TodoService {
  constructor(private dao: TodoDAO) {}

  async create(title: string): Promise<Todo> {
    const todo: Todo = {
      id: nanoid(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    await this.dao.create(todo);
    return todo;
  }

  async list(): Promise<Todo[]> {
    return await this.dao.list();
  }

  async toggle(id: string): Promise<Todo | null> {
    const todo = await this.dao.get(id);
    if (!todo) return null;
    todo.completed = !todo.completed;
    await this.dao.create(todo);
    return todo;
  }

  async delete(id: string): Promise<void> {
    await this.dao.delete(id);
  }
}
