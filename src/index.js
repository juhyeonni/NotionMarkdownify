import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import * as dotenv from 'dotenv';
dotenv.config();

/** TODO: Start-up method setting
 *
 * */ 

import * as method from './method.js';

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
