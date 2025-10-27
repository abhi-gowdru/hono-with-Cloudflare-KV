import type { KVNamespace } from '@cloudflare/workers-types';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Env {
  todo_kv: KVNamespace;
}
