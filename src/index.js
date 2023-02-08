import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import * as dotenv from 'dotenv';
dotenv.config();

/** TODO: Start-up method setting
 * 1. argv[0]: expect node.exe
 * 2. argv[1]: expect arguments.js
 * 3. argv[2]: method command
 * 4. argv[3]: pageid or blockid
 * 5. argv[4]: build location
 * */ 

import * as method from './method.js';

/** TODO: Validate env variables
 * 1. isVaild NOTION_TOKEN?
 */

// Create a new Notion client instance
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Create a new NotionToMarkdown instance
const n2m = new NotionToMarkdown({ notionClient: notion });

/* Implementations */
//
//
//
//
/*                 */

// Methods
method.block_to_markdown('9c9a0ae8c3ba4334b0b161b9861e9413', n2m);
