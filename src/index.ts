import { Hono } from 'hono';
import type { Env } from './interfaces/todo';
import todoRoutes from './routes/todoRoutes';

const app = new Hono<{ Bindings: Env }>();

app.route('/api/todos', todoRoutes);

app.get('/', (c) => c.text('Todo API is running'));

export default app;
