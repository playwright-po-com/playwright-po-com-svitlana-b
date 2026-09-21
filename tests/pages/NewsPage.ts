import { type Page } from '@playwright/test';
import { PaginatedListPage } from './base/PaginatedListPage';

/**
 * TODO (студент): сторінка `/news`.
 * Орієнтир композиції: `ClubsPage` (list + pagination через PaginatedListPage).
 *
 * Зробити:
 * - `extends PaginatedListPage`
 * - поле `NewsList` (композиція)
 * - `gotoNewsPage()` через `ROUTES.news`
 * - title «Новини»
 * - за потреби sider `.club-sider` (опційно)
 */
export class NewsPage extends PaginatedListPage {
  constructor(page: Page) {
    super(page);
    // TODO: newsList = new NewsList(page), pageTitle, ...
  }

  // TODO: gotoNewsPage / waitForNewsLoaded / getNewsList / getPageTitleLocator
}
