import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";
import { createClient } from "redis";

const THREE_HOURS_SEC = 3 * 60 * 60;

async function getRedis() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

async function addTodo(text: string) {
  const redis = await getRedis();
  const id = String(Date.now() + Math.floor(Math.random() * 10000));
  const todo = { id, text, completed: "false", createdAt: Date.now().toString() };
  await redis.hSet(`todo:${id}`, todo);
  await redis.expire(`todo:${id}`, THREE_HOURS_SEC);
  await redis.lPush("todos", id);
  await redis.quit();
  return { ...todo, completed: false, createdAt: Number(todo.createdAt) };
}

async function listTodos() {
  const redis = await getRedis();
  const ids = await redis.lRange("todos", 0, -1);
  const todos = await Promise.all(
    ids.map(async (id: string) => {
      const todo = await redis.hGetAll(`todo:${id}`);
      if (Object.keys(todo).length === 0) {
        await redis.lRem("todos", 0, id);
        return null;
      }
      return {
        id: todo.id,
        text: todo.text,
        completed: todo.completed === "true",
        createdAt: Number(todo.createdAt),
      };
    })
  );
  await redis.quit();
  return todos.filter(Boolean);
}

async function updateTodo(id: string, text?: string, completed?: boolean) {
  const redis = await getRedis();
  const todo = await redis.hGetAll(`todo:${id}`);
  if (Object.keys(todo).length === 0) {
    await redis.quit();
    return null;
  }
  if (typeof text === "string") todo.text = text;
  if (typeof completed === "boolean") todo.completed = completed ? "true" : "false";
  await redis.hSet(`todo:${id}`, todo);
  await redis.quit();
  return {
    id: todo.id,
    text: todo.text,
    completed: todo.completed === "true",
    createdAt: Number(todo.createdAt),
  };
}

async function deleteTodo(id: string) {
  const redis = await getRedis();
  await redis.del(`todo:${id}`);
  await redis.lRem("todos", 0, id);
  await redis.quit();
}

async function deleteAllTodos() {
  const redis = await getRedis();
  const ids = await redis.lRange("todos", 0, -1);
  await Promise.all(ids.map((id: string) => redis.del(`todo:${id}`)));
  await redis.del("todos");
  await redis.quit();
}

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "Course Recommender",
      "Give a course recommendation based on experience level",
      {
        experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ experienceLevel }, _) => ({
        content: [
          {
            type: "text" as const,
            text: `I recommend you take the ${
              experienceLevel === "beginner"
                ? "Professional JavaScript"
                : experienceLevel === "intermediate"
                ? "Professional React & Next.js"
                : "Advanced Full-Stack Development"
            } course.`,
          },
        ],
      })
    );

    server.tool(
      "To-Do Manager",
      "Manage a simple to-do list (add, list, update, delete)",
      {
        action: z.enum(["add", "list", "update", "delete"]),
        text: z.string().optional(),
        todoId: z.string().optional(),
        completed: z.boolean().optional(),
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async ({ action, text, todoId, completed }, _) => {
        if (action === "add") {
          if (!text) {
            return { content: [{ type: "text" as const, text: "Missing to-do text." }] };
          }
          const todo = await addTodo(text);
          return { content: [{ type: "text" as const, text: `Added to-do: ${todo.text}` }] };
        }
        if (action === "list") {
          const todos = (await listTodos()).filter((t) => t !== null);
          return {
            content: [
              { type: "text" as const, text: todos.length ? "Current to-dos:" : "No to-dos yet." },
              ...todos.map((t) => ({ type: "text" as const, text: `${t.id}: ${t.text} [${t.completed ? "✓" : " "}]` }))
            ]
          };
        }
        if (action === "update") {
          if (!todoId) {
            return { content: [{ type: "text" as const, text: "Missing to-do id." }] };
          }
          const todo = await updateTodo(todoId, text, completed);
          if (!todo) {
            return { content: [{ type: "text" as const, text: "To-do not found." }] };
          }
          return { content: [{ type: "text" as const, text: `Updated to-do ${todoId}.` }] };
        }
        if (action === "delete") {
          if (todoId) {
            await deleteTodo(todoId);
            return { content: [{ type: "text" as const, text: `Deleted to-do ${todoId}.` }] };
          } else {
            await deleteAllTodos();
            return { content: [{ type: "text" as const, text: "Deleted all to-dos." }] };
          }
        }
        return { content: [{ type: "text" as const, text: "Unknown action." }] };
      }
    );
  },
  {
    capabilities: {
      tools: {},
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export async function GET() {
  const todos = await listTodos();
  return Response.json({ todos });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    await deleteTodo(id);
    const todos = await listTodos();
    return Response.json({ message: "To-do deleted.", todos });
  } else {
    await deleteAllTodos();
    return Response.json({ message: "All to-dos deleted.", todos: [] });
  }
}

export { handler as POST };