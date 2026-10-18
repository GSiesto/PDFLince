#!/usr/bin/env node

/**
 * PDFLince MCP Server
 * Privacy-first local PDF toolkit for Model Context Protocol clients.
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createPdfLinceMcpServer } from './server';

async function main() {
  const server = createPdfLinceMcpServer();
  const transport = new StdioServerTransport();

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    await server.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await server.close();
    process.exit(0);
  });

  // Stdio transport uses stdout for JSON-RPC messages.
  // All server logs/diagnostics MUST be directed to stderr.
  await server.connect(transport);
  process.stderr.write('PDFLince MCP Server running on stdio\n');
}

main().catch((error) => {
  process.stderr.write(`Fatal error in PDFLince MCP Server: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
