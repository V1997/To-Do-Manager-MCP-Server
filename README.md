# Course Recommender MCP Server

This project is an AI-powered course recommendation server built with Next.js and the Model Context Protocol (MCP). It provides course suggestions based on user experience level (beginner, intermediate, advanced) and is designed for easy integration with AI assistants and MCP-compatible clients.

## Key Features
- **Course Recommender Tool:** Returns tailored course recommendations for different experience levels.
- **MCP Protocol:** Exposes a /mcp endpoint for tool-based AI workflows.
- **Deployed on Vercel:** Fast, serverless, and easy to access.

## How It Works
- The server exposes a "Course Recommender" tool.
- Clients send a request with an `experienceLevel` parameter (`beginner`, `intermediate`, or `advanced`).
- The server responds with a recommended course for that level.

## Example Usage
**Prompt for an AI assistant:**
> Use the "Course Recommender" tool to suggest a course for a beginner.

**Direct API call:**
```bash
curl -X POST https://course-recommender-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "Course Recommender", "arguments": {"experienceLevel": "beginner"}}}'
```

## Quick Start
1. **Clone the repo:**
   ```sh
   git clone https://github.com/V1997/course-recommender-mcp.git
   cd course-recommender-mcp
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run locally:**
   ```sh
   npm run dev
   ```
4. **Test the endpoint:**
   Visit [http://localhost:3000](http://localhost:3000) or use the API example above.

## Configuration
- **mcp.json**: Points MCP clients to the deployed endpoint.
  ```json
  {
    "mcpServers": {
      "course-recommender": {
        "url": "https://course-recommender-mcp.vercel.app/mcp"
      }
    }
  }
  ```

## Project Structure
- `src/app/[transport]/route.ts` — MCP handler logic
- `src/app/page.tsx` — Home page
- `mcp.json` — MCP client configuration

## Contact
For questions or onboarding help, contact the project maintainer or open an issue on GitHub.
