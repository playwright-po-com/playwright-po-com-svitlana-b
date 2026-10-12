import { type Locator, type Page } from "@playwright/test";
import { ROUTES } from "../config/app.config";
import { SearchablePage } from "./base/SearchablePage";

export class NewsDetailPage extends SearchablePage {
  private readonly newsRoot: Locator;
  private readonly title: Locator;
  private readonly date: Locator;
  private readonly content: Locator;

  constructor(page: Page) {
    super(page);
    this.newsRoot = page.locator(".news-page");
    this.title = this.newsRoot.locator("#major-title");
    this.date = this.newsRoot.locator(".content-title");
    this.content = this.newsRoot.locator(".content-text");
  }
  async gotoNewsDetailPage(id: number | string): Promise<void> {
    await this.open(ROUTES.newsDetail(id));
  }

  getTitleLocator(): Locator {
    return this.title;
  }

  getDateLocator(): Locator {
    return this.date;
  }

  getContentLocator(): Locator {
    return this.content;
  }
}
