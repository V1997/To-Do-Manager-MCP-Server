# Course Recommender MCP Server

An AI-powered course recommendation system built using the Model Context Protocol (MCP) and Next.js.

## 🚀 Features

- **Intelligent Course Recommendations**: Provides personalized course suggestions based on experience level
- **MCP Integration**: Built with Vercel's MCP adapter for seamless AI assistant integration
- **Experience-Based Logic**: Recommends courses for beginner, intermediate, and advanced developers
- **Real-time Processing**: Fast response times with optimized Next.js setup

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **MCP**: Vercel MCP Adapter
- **Validation**: Zod schema validation
- **Runtime**: Node.js with Turbopack for development

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Redis (optional, for enhanced functionality)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/course-recommender-mcp.git

# Navigate to the project directory
cd course-recommender-mcp

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
REDIS_URL=your_redis_url_here
```

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The server will be available at `http://localhost:3000`

## 🎯 How It Works

The MCP server provides a "Course Recommender" tool that:

1. **Accepts Experience Level**: Takes user input for experience level (beginner, intermediate, advanced)
2. **Processes Request**: Validates input using Zod schema
3. **Returns Recommendation**: Provides appropriate course suggestions based on experience

### Course Recommendations

- **Beginner**: Professional JavaScript course
- **Intermediate**: Professional React & Next.js course  
- **Advanced**: Advanced Full-Stack Development course

## 🔧 API Endpoints

- `GET /` - Home page
- `POST /[transport]` - MCP handler endpoint
- `GET /[transport]` - MCP handler endpoint
- `DELETE /[transport]` - MCP handler endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vercel MCP Adapter](https://github.com/vercel/mcp-adapter)
- Powered by [Next.js](https://nextjs.org/)
- Schema validation with [Zod](https://zod.dev/)
