import { Client } from "@notionhq/client";

export interface NotionToMarkdownOptions {
  notionClient: Client
}

export interface PageInfo {
  title: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
}
