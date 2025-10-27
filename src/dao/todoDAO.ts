import type { Env, Todo } from '../interfaces/todo';

const TODO_KEY_PREFIX = 'todo:';

export class TodoDAO {
  constructor(private kv: Env['todo_kv']) {}

  async create(todo: Todo): Promise<void> {
    await this.kv.put(`${TODO_KEY_PREFIX}${todo.id}`, JSON.stringify(todo));
  }

  async get(id: string): Promise<Todo | null> {
    const value = await this.kv.get(`${TODO_KEY_PREFIX}${id}`);
    return value ? JSON.parse(value) : null;
  }

  async list(): Promise<Todo[]> {
    const list = await this.kv.list({ prefix: TODO_KEY_PREFIX });
    const todos: Todo[] = [];
    for (const key of list.keys) {
      const item = await this.get(key.name.replace(TODO_KEY_PREFIX, ''));
      if (item) todos.push(item);
    }
    return todos;
  }

  async delete(id: string): Promise<void> {
    await this.kv.delete(`${TODO_KEY_PREFIX}${id}`);
  }
}
