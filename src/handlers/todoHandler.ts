import { TodoService } from '../services/todoService';
import { TodoDAO } from '../dao/todoDAO';
import type { Env } from '../interfaces/todo';
import type { Context } from 'hono';

export const todoHandler = {
  list: async (c: Context<{ Bindings: Env }>) => {
    const dao = new TodoDAO(c.env.todo_kv);
    const service = new TodoService(dao);
    const todos = await service.list();
    return c.json(todos);
  },

  create: async (c: Context<{ Bindings: Env }>) => {
    const { title } = await c.req.json<{ title: string }>();
    const dao = new TodoDAO(c.env.todo_kv);
    const service = new TodoService(dao);
    const todo = await service.create(title);
    return c.json(todo, 201);
  },

  toggle: async (c: Context<{ Bindings: Env }>) => {
    const id = c.req.param('id');
    const dao = new TodoDAO(c.env.todo_kv);
    const service = new TodoService(dao);
    const updated = await service.toggle(id);
    if (!updated) return c.json({ error: 'Todo not found' }, 404);
    return c.json(updated);
  },

  delete: async (c: Context<{ Bindings: Env }>) => {
    const id = c.req.param('id');
    const dao = new TodoDAO(c.env.todo_kv);
    const service = new TodoService(dao);
    await service.delete(id);
    return c.json({ message: 'Deleted successfully' });
  },
};
