# NotionMarkdownify

NotionMarkdownify is a program that allows you to autoconvert a Notion page to a Markdown file. The program is composed of two source codes, one is the main program, and the other is the method module.
## Getting Started

    Install the required packages by running npm install in your terminal.

    Set up your Notion API token by adding it to your .env file. You can find more information on how to obtain your API token in the Notion API documentation.

    Run the program by typing node index.js in your terminal.

## How it Works

The main program imports the required packages and sets up a new Notion API client. The method module exports a function block_to_markdown which takes in two parameters, a pageid and a NotionToMarkdown object. The function then uses the NotionToMarkdown object to convert the Notion page with the specified pageid to Markdown, and writes the result to a file with the same name as the pageid.
## Conclusion

NotionMarkdownify is a useful tool for anyone looking to convert their Notion pages to Markdown. The program is easy to set up and use, and the resulting Markdown files can be used in a variety of ways, such as to embed the pages on a website or to version control the pages with Git.