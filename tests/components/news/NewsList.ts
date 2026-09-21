import { type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

/**
 * TODO (студент): список новин на `/news`.
 * Орієнтир: `ClubList` + `NewsCard`.
 *
 * Підказки з DOM:
 * - контейнер контенту: `.news-content`
 * - картки: `#newsContainer`
 */
export class NewsList extends BaseComponent {
  constructor(page: Page) {
    super(page);
    // TODO: задати root (напр. `.news-content`), картки `#newsContainer`
    // TODO: waitForLoaded() / getFirstCard() / getCardByTitle(title)
  }
}
