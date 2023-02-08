import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = path.resolve();

export async function block_to_markdown(pageid, n2m) {
  // Get markdown blocks from page
  const mdBlocks = await n2m.pageToMarkdown(pageid);

  // Convert markdown blocks to markdown string
  const mdString = n2m.toMarkdownString(mdBlocks);

  // Write markdown string to file
  fs.writeFile(
    `${__dirname}/${process.env.OUT_MD}/${pageid}.md`, 
    mdString, 
    (err) => {
      if (err) {
        console.error(`An error occurred: ${err}. Please report it to the developer.`);
      }
    }
  );
}
