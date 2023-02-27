import { NotionToMarkdown } from 'notion-to-md';
import { Client } from '@notionhq/client';
import fs from 'fs';
import mkdir from './utils/mkdir';
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface NotionToMarkdownOptions {
  notionClient: Client
}

interface UserInfo {
  title: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
}

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

  private toStringUserInfo(userInfo: UserInfo) {
    const { title, date, author, tags, category } = userInfo;
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
   */
  async dbDownify(databaseID: string) {
    const response = await this.notionClient.databases.retrieve({ database_id: databaseID });
    // FIXME: 
    // 왜 안됨??
    // ttts에서의 문제는 없는데, 왜 여기서 안되는지 확인해야됨
    // TODO:
    // 각 마크다운에 
    // title, date, author, tags, categories를 추가한다.
    // 해당 코드는 ttts에 정리 해두었다.
    // 모두 작성하고 실제로 기동가능한 코드를 만들었지만, 
    // Commit을 안한탓에 모두 날아가버렸다.....
    // 반드시 작업을 완료하면 commit을 하길....바란다...



    const categorie = response.title[0].plain_text;

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
