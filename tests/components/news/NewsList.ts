import { BaseComponent } from '../../pages/base/BaseComponent';
import { type Locator, type Page } from '@playwright/test';
import { NewsCard } from './NewsCard';

export class NewsList extends BaseComponent {
  private readonly newsCards: Locator;

  constructor(page: Page) {
    super(page, page.locator('.news-content'));
    this.newsCards = this.root.locator('#newsContainer');
  }
  async waitForLoaded(): Promise<void> {
    await this.newsCards.first().waitFor({ state: 'visible' });
  }
  
  getFirstCard(): NewsCard {
    return new NewsCard(this.page, this.newsCards.first());
  }
  
  getCardByTitle(title: string): NewsCard {
    const cardRoot = this.newsCards.filter({ hasText: title });
    return new NewsCard(this.page, cardRoot);
  }
}
