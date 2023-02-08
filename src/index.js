import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import * as dotenv from 'dotenv';
dotenv.config();

import * as method from './method.js';

// Create a new Notion client instance
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Create a new NotionToMarkdown instance
const n2m = new NotionToMarkdown({ notionClient: notion });
