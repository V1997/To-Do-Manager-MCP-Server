# To-Do Manager MCP Server

 
Welcome to your next productivity boost! This project is a modern, AI-ready To-Do Manager server, designed to work seamlessly with Model Context Protocol (MCP) clients and AI assistants. Whether you're a developer, a student, or just someone who loves organized lists, this project is for you.

---

## 🚀 Project Description

The To-Do Manager MCP Server is a cloud-ready backend that lets you add, list, update, and delete to-do items via a simple API. It’s built for integration with AI tools (like Claude Desktop) and supports persistent, auto-expiring storage using Redis. No more sticky notes—let your AI manage your tasks!

---

## ✨ Features

- **Add To-Dos:** Quickly add new tasks to your list.
- **List To-Dos:** View all your current tasks, including their status.
- **Update To-Dos:** Mark tasks as completed or edit their text.
- **Delete To-Dos:** Remove individual tasks or clear your entire list.
- **Auto-Expire:** To-dos are automatically deleted after 3 hours—perfect for short-term focus!
- **MCP Integration:** Works out-of-the-box with MCP-compatible AI clients.
- **Cloud-Ready:** Deployable on Vercel with managed Redis for persistence.

---

## 🛠️ Installation Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/V1997/course-recommender-mcp.git
   cd course-recommender-mcp
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up Redis:**
   - Use a managed Redis service (e.g., Upstash, Redis Cloud).
   - Add your Redis connection string to a `.env.local` file:
     ```env
     REDIS_URL=your_redis_connection_url
     ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The server will be available at [http://localhost:3000](http://localhost:3000)

---

## 💡 Usage

You can interact with the To-Do Manager via any MCP-compatible client or directly with HTTP requests.

### **Add a To-Do**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "add", "text": "Buy groceries"}}}'
```

### **List To-Dos**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "list"}}}'
```

### **Update a To-Do**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "update", "todoId": "YOUR_TODO_ID", "completed": true}}}'
```

### **Delete All To-Dos**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": {"name": "To-Do Manager", "arguments": {"action": "delete"}}}'
```

---

## 🧰 Technologies Used

- **TypeScript** – Type-safe JavaScript for robust code
- **Next.js** – Modern React framework for serverless APIs
- **Redis** – Fast, in-memory data store for persistent to-dos
- **@vercel/mcp-adapter** – MCP integration for AI tools
- **Zod** – Schema validation for safe API contracts
- **Vercel** – Effortless cloud deployment

---

## 🤝 Contributing Guidelines

We love contributions! To help improve this project:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit them
4. Push to your fork and open a Pull Request
5. Describe your changes and why they’re awesome!

All skill levels are welcome—let’s build something great together!

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact Information

Have questions, feedback, or want to collaborate?
- **GitHub Issues:** [Open an issue](https://github.com/V1997/course-recommender-mcp/issues)
- **Email:** patelvasu1997@gmail.com
- **Maintainer:** Vasu Patel

**This project is open source—use it as a reference or as a starting point for your own MCP development. Happy building! 🚀**
