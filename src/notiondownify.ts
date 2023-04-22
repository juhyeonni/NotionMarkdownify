import { NotionToMarkdown } from 'notion-to-md';
import * as fs from 'fs';
import mkdir from './utils/mkdir';
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdownOptions, PageInfo } from './types';

export class NotionDownify {
  private notionClient;

  constructor(options: NotionToMarkdownOptions) {
    this.notionClient = options.notionClient;
  }
  /**
   * ISO Date to 'yyyy-mm-dd HH:ii:ss'
   * @param date 
   * @returns 
   */
  private isoToFormatted(date: string) {
    const beforeDate = new Date(date);
    const formattedDate = beforeDate.toISOString().replace('T', ' ').slice(0, 19);
    return formattedDate;
  }

  private toStringPageInfo(pageInfo: PageInfo) {
    const { title, date, author, tags, category } = pageInfo;
    const tagsStr = tags.join(' ');
    return (
      `---\n` +
      `title: '${title}'\n` +
      `date: '${date}'\n` +
      `author: '${author}'\n` +
      `tags: ${tagsStr}\n` +
      `categories: '${category}'\n` +
      `---\n`
    );
  }

  /**
   * Take a page from your database and mark it up.
   * @param databaseID 
   * The databaseID is needed to retrieve the information in the database and the information on each page.
   */
  public async dbDownify(databaseID: string, contentLocation: string = '.'): Promise<void> {
    const res = await this.notionClient.databases.retrieve({ database_id: databaseID }) as DatabaseObjectResponse;

    mkdir(contentLocation);

    const category = res.title[0].plain_text.replace(' ', '\u00a0');

    const pageIDs = await this.getPageIDs(databaseID);
    for (const pageID of pageIDs) {
      const res = await this.notionClient.pages.retrieve({ page_id: pageID }) as PageObjectResponse;
      const properties = res.properties;

      const title = properties['Name'].type === 'title' ? properties['Name'].title[0].plain_text : '';
      const date = this.isoToFormatted(res.last_edited_time);
      const authorID = res.created_by.id;
      const author = (await this.notionClient.users.retrieve({ user_id: authorID })).name ?? '';
      const tags = properties['Tags'].type === 'multi_select' ? properties['Tags'].multi_select.map(tag => tag.name) : [];

      const pageInfo: PageInfo = {
        title,
        date,
        author,
        tags,
        category,
      }

      mkdir(`${contentLocation}/${pageID}`);
      this.savePageToMd(pageID, pageInfo, contentLocation);
    }
  }

  /**
   * Get pageIDs from database
   * @param databaseID 
   * @returns pageIDs
   */
  private async getPageIDs(databaseID: string): Promise<string[]> {
    const queryData = await this.notionClient.databases.query({
      database_id: databaseID,
    });
    const pageIDs = queryData.results.map((page) => page.id);

    return pageIDs;
  }

  /**
   * Markdown a page
   * @param pageId 
   * @param pageInfo
   */
  private async savePageToMd(pageId: string, pageInfo: PageInfo, contentLocation: string): Promise<void> {
    const n2m = new NotionToMarkdown({ notionClient: this.notionClient });

    // Get markdown blocks from page
    const mdBlocks = await n2m.pageToMarkdown(pageId);

    // Convert markdown blocks to markdown string
    const mdString = await n2m.toMarkdownString(mdBlocks);

    try {
      // Write markdown string to file
      await fs.promises.writeFile(
        `${contentLocation}/${pageId}/index.md`,
        this.toStringPageInfo(pageInfo) + mdString,
        { encoding: 'utf-8' }
      );

      // notify Success
      console.log(`Successful save as '${pageId}/index.md'`)
    } catch (e) {
      console.error(`Error writing file: ${e}`)
    }
  }
}
