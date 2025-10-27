# hono-with-cloudflare-kv

A modern **Cloudflare Worker** project using the [Hono](https://hono.dev) web framework with **Cloudflare KV (Key-Value storage)** for globally distributed data access.

This project shows how to build, develop, and deploy a Hono Worker integrated with Cloudflare KV using **Wrangler v3+** and **`wrangler.jsonc`** configuration.

---

## Tech Stack

* [Hono](https://hono.dev/) — Fast, minimal web framework for the edge
* [Cloudflare Workers](https://developers.cloudflare.com/workers/) — Serverless platform at the edge
* [Cloudflare KV](https://developers.cloudflare.com/kv/) — Key-value storage for global apps
* [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — CLI for Cloudflare Workers (v3)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/hono-with-cloudflare-kv.git
cd hono-with-cloudflare-kv
```

### 2. Install dependencies

```bash
npm install
```

---

## Development

To start a local development server:

```bash
npm run dev
```

This runs `wrangler dev`, which emulates your Worker and KV locally.

---

## Deployment

To deploy to Cloudflare Workers:

```bash
npm run deploy
```

After deployment, you’ll get your production Worker URL (e.g.
`https://your-worker-name.your-account.workers.dev`).

---

## Cloudflare KV Setup

Add your KV namespace in your **`wrangler.jsonc`** configuration file:

```jsonc
{
  "name": "hono-with-cloudflare-kv",
  "main": "src/index.ts",
  "compatibility_date": "2025-10-01",

  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

You can create a new KV namespace via Wrangler:

```bash
npx wrangler kv namespace create BINDING_NAME
```

The command output will show an `id` (and `preview_id`) you can paste into `wrangler.jsonc`.

---

## Endpoints

| Method | Endpoint   | Description                               |
| ------ | ---------- | ----------------------------------------- |
| `GET`  | `/`        | Health check                              |
| `GET`  | `/api/todos` | Retrieve all todo from Cloudflare KV       |
| `POST` | `/api/todos`      | Create a todo in Cloudflare KV |
| `PUT` | `/api/todos/:id`      | Update a todo in Cloudflare KV |
| `DELTE` | `/api/todos/:id`      | Delete a todo in Cloudflare KV |

---

## Project Structure

```
hono-with-cloudflare-kv/
│
├── src/
│   └── dao/
│       └── todoDAO.ts        # Entry point
│   └── handlers/
│       └── todoHandler.ts    # Entry point
│   └── interfaces/
│       └── todo.ts           # Entry point
│   └── routes/
│       └── todoRoutes.ts     # Entry point
│   └── services/
│       └── todoService.ts    # Entry point
│   └── index.ts          # Main Hono app
│
├── wrangler.jsonc        # Worker + KV configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Common Commands

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Run local development server         |
| `npm run deploy`     | Deploy to Cloudflare Workers         |
| `npm run cf-typegen` | Generate Cloudflare type definitions |

---

## Tips

* Use **`wrangler dev --remote`** if you want to test directly on Cloudflare’s edge environment.
* For local KV emulation, Wrangler uses **Miniflare 3** under the hood — no extra setup required.
* Ensure your **KV binding name** in `wrangler.jsonc` matches what you use in `c.env.<binding>`.

---

## Contributing

Pull requests are welcome!
For significant changes, open an issue first to discuss improvements.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

Would you like me to add a **sample `package.json`** section (with the `dev`, `deploy`, and `cf-typegen` scripts) so the README matches the exact commands you’re using?
