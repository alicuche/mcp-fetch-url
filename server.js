import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fetch from "node-fetch";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Initialize the MCP server
const server = new McpServer({
  name: "Fetch URL",
  version: "1.0.0"
});

// Define the tool to fetch URL
server.tool(
  "fetch_url",
  { url: z.string().url() },
  async ({ url }) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      return {
        content: [{ type: "text", text: data }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error fetching URL: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Connect the server
const transport = new StdioServerTransport();
await server.connect(transport);