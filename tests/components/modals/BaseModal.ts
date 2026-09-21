import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

/**
 * Базовий Component Object для Ant Design модалок.
 *
 * Показує ДВІ речі одночасно:
 * - успадкування: конкретні модалки (LoginModal, RegistrationModal) наслідують цей клас;
 * - композицію: сторінка (HomePage) містить такі модалки як свої поля.
 *
 * `root` — це корінь конкретної модалки (`.modal-login`, `.modal-registration`).
 * Усі локатори всередині модалки шукаємо від `this.root`, а не від усієї сторінки.
 */
export abstract class BaseModal extends BaseComponent {
  protected readonly closeButton: Locator;

  constructor(page: Page, root: Locator) {
    super(page, root);
    this.closeButton = this.root.locator('.ant-modal-close');
  }

  async waitForOpen(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async waitForClosed(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.waitForClosed();
  }

  isOpen(): Promise<boolean> {
    return this.root.isVisible();
  }

  getRootLocator(): Locator {
    return this.root;
  }
}
