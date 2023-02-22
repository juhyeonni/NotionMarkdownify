import { NotionToMarkdown } from 'notion-to-md';
import { Client } from '@notionhq/client';
import fs from 'fs';
import mkdir from './utils/mkdir';

interface NotionToMarkdownOptions {
  notionClient: Client
}

export class NotionDownify {
  private notionClient;

  constructor(options: NotionToMarkdownOptions) {
    this.notionClient = options.notionClient;
  }

  /**
   * Take a page from your database and mark it up.
   * @param databaseID 
   */
  async dbDownify(databaseID: string) {
    this.getPageIDs(databaseID).then((pageIDs) => {
      pageIDs.map((pageID) => {
        // make directory
        mkdir(pageID);
        this.savePageToMd(pageID);
      });
    })
  }

  /**
   * Get pageIDs from database
   * @param databaseID 
   * @returns pageIDs
   */
  async getPageIDs(databaseID: string): Promise<string[]> {
    const queryData = await this.notionClient.databases.query({
      database_id: databaseID,
    });
    const pageIDs = queryData.results.map((page) => page.id);

    return pageIDs;
  }

  /**
   * Markdown a page
   * @param pageId 
   * @param buildLocation 
   */
  async savePageToMd(pageId: string) {
    const n2m = new NotionToMarkdown({ notionClient: this.notionClient });

    // Get markdown blocks from page
    const mdBlocks = await n2m.pageToMarkdown(pageId);

    // Convert markdown blocks to markdown string
    const mdString = n2m.toMarkdownString(mdBlocks);

    // Write markdown string to file
    fs.writeFile(
      `${pageId}/index.md`,
      mdString,
      (err) => {
        if (err) {
          throw new Error(`An error occurred: ${err}. Please report it to the developer.`);
        }
      },
    );

    // notify Success
    console.log(`Successful save as '${pageId}'`)
  }
}
