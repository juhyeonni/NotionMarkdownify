import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import * as dotenv from 'dotenv';
import * as method from './method.js';

dotenv.config();

/** TODO: Start-up method setting
 * 1. argv[0]: expect node.exe
 * 2. argv[1]: expect arguments.js
 * 3. argv[2]: method command
 * 4. argv[3]: pageid or blockid
 * 5. argv[4]: build location
 * */ 
const inputMethod = process.argv[2];
const pageId = process.argv[3];
const buildLocation = process.argv[4] ?? 'build';

/** TODO: Validate env variables
 * 1. isValid NOTION_TOKEN?
 */

// isValid NOTION_TOKEN
if (process.env.NOTION_TOKEN === null) {
  console.error('TOKEN value does not exist or is invalid.');
  process.exit(1);
}

// Create a new Notion client instance
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Create a new NotionToMarkdown instance
const n2m = new NotionToMarkdown({ notionClient: notion });

// FIXME: Error Handling
// Main method
async function main() {
  /* Implementations */
  switch (inputMethod) {
    case 'help':
    case undefined:
      console.error(`
        Usage:  node COMMAND PAGE_ID BUILD_LOCATION
      `);
      break;

    case 'page':
      await method.block_to_markdown(pageId, buildLocation, n2m);
      break;

    default:
      console.error(`An error occurred: Invalid command ${inputMethod}`);
      process.exit(1);
  }
  // FIXME:
  console.log(`Completed build to ${buildLocation}`)
}

main();