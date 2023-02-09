import { Client } from '@notionhq/client';
import fs from 'fs';
import mkdir from './utils/mkdir';
import * as dotenv from 'dotenv';
import { NotionToMarkdown } from 'notion-to-md';
dotenv.config()

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getPageIDs(databaseID: string): Promise<string[]> {
  const queryData = await notion.databases.query({
    database_id: databaseID,
  });
  const pageIDs = queryData.results.map((page) => page.id);

  return pageIDs;
}

export async function fileMDDocument(pageId: string, buildLocation: string) {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  
  // make directory
  mkdir(buildLocation);

  // Get markdown blocks from page
  const mdBlocks = await n2m.pageToMarkdown(pageId);

  // Convert markdown blocks to markdown string
  const mdString = n2m.toMarkdownString(mdBlocks);

  // Write markdown string to file
  fs.writeFile(
    `${buildLocation}/${pageId}.md`,
    mdString,
    (err) => {
      if (err) {
        throw new Error(`An error occurred: ${err}. Please report it to the developer.`);
      }
    },
  );
}
