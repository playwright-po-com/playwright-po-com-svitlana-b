import { type Page } from '@playwright/test';
import { SearchablePage } from './base/SearchablePage';

/**
 * TODO (студент): детальна новина `/news/:id`.
 * Орієнтир: `ClubDetailPage`.
 *
 * Підказки з DOM:
 * - обгортка: `.news-page`
 * - заголовок: `#major-title`
 * - дата в контенті: `.content-title`
 * - текст: `.content-text`
 */
export class NewsDetailPage extends SearchablePage {
  constructor(page: Page) {
    super(page);
    // TODO: локатори + gotoNewsDetailPage(id) + getters
  }
}
