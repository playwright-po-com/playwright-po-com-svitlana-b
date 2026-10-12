import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class NewsCard extends BaseComponent {
  private readonly date: Locator;
private readonly title: Locator;
private readonly detailsLink: Locator;
  constructor(page: Page, cardRoot: Locator) {
    super(page, cardRoot);
    this.date = this.root.locator('#newsDate');
    this.title = this.root.locator('#newsTitle');
    this.detailsLink = this.root.locator('#detailButton a');
  }

  async openDetails(): Promise<void> {
    await this.detailsLink.click();
  }

  getDateLocator(): Locator {
    return this.date;
  }

  getTitleLocator(): Locator {
    return this.title;
  }
}
