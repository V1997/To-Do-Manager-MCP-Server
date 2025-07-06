# To-Do Manager MCP Server

A server for managing to-do items via the Model Context Protocol (MCP). Designed for integration with AI assistants and MCP-compatible clients. Provides persistent, auto-expiring to-do storage using Redis and is deployable on Vercel.

---

## Project Description

This project implements a to-do manager API with add, list, update, and delete operations. It is intended for use with MCP clients and AI tools, and is suitable as a reference or starting point for MCP-based integrations.

---

## Features

- Add, list, update, and delete to-do items
- Auto-expiry: to-dos are deleted after 3 hours
- Persistent storage using Redis
- MCP protocol support for AI and automation workflows
- Deployable on Vercel

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/V1997/course-recommender-mcp.git
   cd course-recommender-mcp
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure Redis:**
   - Use a managed Redis service (Upstash, Redis Cloud, or Vercel Redis integration).
   - Add your Redis connection string to `.env.local`:
     ```env
     REDIS_URL=your_redis_connection_url
     ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The server will be available at [http://localhost:3000](http://localhost:3000)

---

## Deployment & Technical Details

### Vercel Deployment

- Connect your GitHub repository to Vercel.
- Set the `REDIS_URL` environment variable in Vercel project settings.
- Vercel will build and deploy on each push to the main branch.
- The application will be available at a Vercel-provided URL.

### Redis Usage

- Each to-do is stored as a Redis hash (`todo:{id}`) with fields: `id`, `text`, `completed`, `createdAt`.
- A Redis list (`todos`) maintains the order of to-do IDs.
- All Redis operations are performed per request; the Redis client is created and closed in each handler for serverless compatibility.

### Auto-Expiry

- When a to-do is created, a 3-hour TTL is set using Redis `EXPIRE`.
- After 3 hours, Redis deletes the to-do hash automatically.
- On list/update, expired IDs are removed from the `todos` list.

---

## Live Chat Examples

**Add a To-Do**
```
User: Add "Buy groceries" to my to-do list using the To-Do Manager tool.
Assistant: Added to-do: Buy groceries
```

**List To-Dos**
```
User: Show me my current to-dos with the To-Do Manager tool.
Assistant:
Current to-dos:
1751776995308: Buy groceries [ ]
```

**Mark a To-Do as Completed**
```
User: Mark the to-do with ID 1751776995308 as completed using the To-Do Manager tool.
Assistant: Updated to-do 1751776995308.
```

**Delete a To-Do**
```
User: Delete the to-do with ID 1751776995308 using the To-Do Manager tool.
Assistant: Deleted to-do 1751776995308.
```

**Delete All To-Dos**
```
User: Clear all my to-dos using the To-Do Manager tool.
Assistant: Deleted all to-dos.
```

---

## Usage

Interact with the To-Do Manager via any MCP-compatible client or with HTTP requests.

**Add a To-Do**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "add", "text": "Buy groceries"}}}'
```

**List To-Dos**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "list"}}}'
```

**Update a To-Do**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "update", "todoId": "YOUR_TODO_ID", "completed": true}}}'
```

**Delete All To-Dos**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "delete"}}}'
```

---

## Technologies Used

- TypeScript
- Next.js
- Redis
- @vercel/mcp-adapter
- Zod
- Vercel

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit them
4. Push to your fork and open a Pull Request

---

## License

MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

- GitHub Issues: [Open an issue](https://github.com/V1997/course-recommender-mcp/issues)
- Email: patelvasu1997@gmail.com
- Maintainer: Vasu Patel

This project is open source—use it as a reference or as a starting point for your own MCP development.
