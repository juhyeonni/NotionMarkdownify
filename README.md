![NotionMarkdownify](https://user-images.githubusercontent.com/64972038/217763800-7758c37d-a8f2-4279-b6a3-c17e41efc3ab.svg)

# NotionMarkdownify

NotionMarkdownify is a program that allows you to autoconvert a Notion page to a Markdown file. The program is composed of two source codes, one is the main program, and the other is the method module.
## Getting Started

  Install the required packages by running npm install in your terminal.

  Set up your Notion API token by adding it to your .env file. You can find more information on how to obtain your API token in the Notion API documentation.

  Run the program by typing node index.js in your terminal.

## Usage
~~~TypeScript
import { Client } from '@notionhq/client';

import { NotionDownify } from './index';

const DATABASE_ID = 'your notion database_id';

const notion = new Client({ 
  auth: 'your integration token'
});
const buildLocati

// passing notion client to option
const downify = new NotionDownify({notionClient: notion});

// Markdown elements in the database.
downify.dbDownify(DATABASE_ID, buildLocation);
~~~
## Conclusion

NotionMarkdownify is a useful tool for anyone looking to convert their Notion pages to Markdown. The program is easy to set up and use, and the resulting Markdown files can be used in a variety of ways, such as to embed the pages on a website or to version control the pages with Git.
