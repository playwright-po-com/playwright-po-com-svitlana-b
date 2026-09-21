import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

/**
 * TODO (студент): Component Object однієї новини (`#newsContainer`).
 * Орієнтир: `ClubCard`.
 *
 * Підказки з DOM:
 * - дата: `#newsDate`
 * - заголовок: `#newsTitle`
 * - лінк: `#detailButton a` («Детальніше»)
 */
export class NewsCard extends BaseComponent {
  constructor(page: Page, cardRoot: Locator) {
    super(page, cardRoot);
    // TODO: локатори + openDetails() / getTitleLocator() / getDateLocator()
  }
}
