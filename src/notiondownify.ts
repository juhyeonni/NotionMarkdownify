import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NotionToMarkdownOptions } from './types';
import * as dotenv from 'dotenv';
import fs from 'fs';
import mkdir from './utils/mkdir';
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default class NotionDownify {
  private notionClient;

  constructor(options: NotionToMarkdownOptions) {
    this.notionClient = options.notionClient;
  }
  
  async getPageIDs(databaseID: string): Promise<string[]> {
    const queryData = await this.notionClient.databases.query({
      database_id: databaseID,
    });
    const pageIDs = queryData.results.map((page) => page.id);
  
    return pageIDs;
  }

  async fileMDDocument(pageId: string, buildLocation: string) {
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
}


// Bring DatabaseID
const databaseID = process.env.DATABASE_ID ?? '';

// Bring BuildLocation
const buildLocation = 'build';

const a = new NotionDownify({notionClient: notion});

a.getPageIDs(databaseID).then((pageIDs) => {
  pageIDs.map((pageID) => {
    a.fileMDDocument(pageID, buildLocation);
  });
})

// // Bring BuildLocation
// const buildLocation = 'build';

// method.getPageIDs(databaseID).then((pageIDs) => {
//   pageIDs.map((pageID) => {
//     method.fileMDDocument(pageID, buildLocation);
//   });
// });
