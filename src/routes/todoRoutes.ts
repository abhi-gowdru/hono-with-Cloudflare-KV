import { Hono } from 'hono';
import { todoHandler } from '../handlers/todoHandler';
import type { Env } from '../interfaces/todo';

const todoRoutes = new Hono<{ Bindings: Env }>();

todoRoutes.get('/', todoHandler.list);
todoRoutes.post('/', todoHandler.create);
todoRoutes.put('/:id', todoHandler.toggle);
todoRoutes.delete('/:id', todoHandler.delete);

export default todoRoutes;
