import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';
import { CityDropdown } from '../dropdowns/CityDropdown';
import { TopMenu, type TopMenuItem } from './TopMenu';

export class Header extends BaseComponent {
  public readonly LOGIN_MENU_ITEM_LABEL = 'Увійти' as const;
  public readonly REGISTER_MENU_ITEM_LABEL = 'Зареєструватися' as const;

  private readonly logoLink: Locator;
  private readonly topMenu: TopMenu;
  private readonly cityDropdown: CityDropdown;
  private readonly userProfileTrigger: Locator;

  constructor(page: Page) {
    super(page, page.locator('header.ant-layout-header'));
    this.logoLink = page.locator('header .left-side-menu a').first();
    this.topMenu = new TopMenu(page);
    this.cityDropdown = new CityDropdown(page);
    this.userProfileTrigger = this.root.locator('.user-profile');
  }

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }

  async navigateViaTopMenu(item: TopMenuItem): Promise<void> {
    await this.topMenu.navigateTo(item);
  }

  async selectCity(cityName: string): Promise<void> {
    await this.cityDropdown.selectCity(cityName);
  }

  async openProfileMenu(): Promise<void> {
    await this.userProfileTrigger.click();
  }

  async clickLoginMenuItem(): Promise<void> {
    await this.getLoginMenuItem().click();
  }

  async clickRegisterMenuItem(): Promise<void> {
    await this.getRegisterMenuItem().click();
  }

  getCityDropdown(): CityDropdown {
    return this.cityDropdown;
  }

  // Меню Ant Design рендериться в портал поза <header>, тому шукаємо на page.
  getLoginMenuItem(): Locator {
    return this.page.getByRole('menuitem', { name: this.LOGIN_MENU_ITEM_LABEL, exact: true });
  }

  getRegisterMenuItem(): Locator {
    return this.page.getByRole('menuitem', { name: this.REGISTER_MENU_ITEM_LABEL, exact: true });
  }
}
