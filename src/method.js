import path from 'path';
import fs from 'fs';
import mkdir from './utils/mkdir.js';

const __dirname = path.resolve();

export async function block_to_markdown(pageId, buildLocation, n2m) {
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
        console.error(`An error occurred: ${err}. Please report it to the developer.`);
      }
    }
  );
}
