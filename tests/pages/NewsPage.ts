import { type Locator, type Page } from '@playwright/test';
import { NewsList } from '../components/news/NewsList';
import { ROUTES } from '../config/app.config';
import { PaginatedListPage } from './base/PaginatedListPage';


export class NewsPage extends PaginatedListPage {
  public readonly PAGE_TITLE = 'Новини' as const;

  private readonly pageTitle: Locator;
  private readonly newsList: NewsList;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: this.PAGE_TITLE, exact: true });
    this.newsList = new NewsList(page);
  }

  async gotoNewsPage(): Promise<void> {
    await this.open(ROUTES.news);
  }

  async waitForNewsLoaded(): Promise<void> {
    await this.newsList.waitForLoaded();
  }

  getNewsList(): NewsList {
    return this.newsList;
  }

  getPageTitleLocator(): Locator {
    return this.pageTitle;
  }
}