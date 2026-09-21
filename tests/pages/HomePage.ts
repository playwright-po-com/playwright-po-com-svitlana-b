import { type Locator, type Page } from '@playwright/test';
import { ROUTES } from '../config/app.config';
import { SearchablePage } from './base/SearchablePage';

/**
 * Результат попереднього кроку (POM через успадкування).
 *
 * Auth-модалки поки описані локаторами прямо в HomePage.
 * TODO (цей крок): винести їх у Component Objects і підключити композицією —
 *   private readonly loginModal = new LoginModal(page)
 *   private readonly registrationModal = new RegistrationModal(page)
 * як ClubsPage тримає MapModal. Див. README.
 */
export class HomePage extends SearchablePage {
  public readonly ADD_CLUB_BUTTON_LABEL = 'Додати гурток' as const;
  public readonly LOGIN_TITLE = 'Вхід' as const;
  public readonly LOGIN_SUBTITLE = 'Раді вас бачити знову на платформі' as const;
  public readonly REGISTER_TITLE = 'Реєстрація' as const;
  public readonly REGISTER_SUBTITLE = 'Приєднуйтесь до ініціативи «Навчай українською»' as const;

  private readonly addClubButton: Locator;
  private readonly loginModalRoot: Locator;
  private readonly registrationModalRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.addClubButton = page.getByRole('button', {
      name: this.ADD_CLUB_BUTTON_LABEL,
      exact: true,
    });
    this.loginModalRoot = page.locator('.modal-login');
    this.registrationModalRoot = page.locator('.modal-registration');
  }

  async gotoHomePage(): Promise<void> {
    await this.open(ROUTES.home);
  }

  async openProfileMenu(): Promise<void> {
    await this.header.openProfileMenu();
  }

  async openLoginFromProfile(): Promise<void> {
    await this.header.openProfileMenu();
    await this.header.clickLoginMenuItem();
    await this.loginModalRoot.waitFor({ state: 'visible' });
  }

  async openRegistrationFromProfile(): Promise<void> {
    await this.header.openProfileMenu();
    await this.header.clickRegisterMenuItem();
    await this.registrationModalRoot.waitFor({ state: 'visible' });
  }

  async openLoginFromAddClub(): Promise<void> {
    await this.addClubButton.click();
    await this.loginModalRoot.waitFor({ state: 'visible' });
  }

  async submitLoginForm(): Promise<void> {
    await this.getLoginSubmitButton().click();
  }

  getAddClubButton(): Locator {
    return this.addClubButton;
  }

  getLoginMenuItem(): Locator {
    return this.header.getLoginMenuItem();
  }

  getRegisterMenuItem(): Locator {
    return this.header.getRegisterMenuItem();
  }

  getLoginModalRoot(): Locator {
    return this.loginModalRoot;
  }

  getLoginTitleLocator(): Locator {
    return this.loginModalRoot.locator('.login-title');
  }

  getLoginSubtitleLocator(): Locator {
    return this.loginModalRoot.locator('.login-subtitle');
  }

  getLoginEmailInput(): Locator {
    return this.loginModalRoot.locator('#basic_email');
  }

  getLoginPasswordInput(): Locator {
    return this.loginModalRoot.locator('#basic_password');
  }

  getLoginGoogleLink(): Locator {
    return this.loginModalRoot.getByRole('link', { name: 'Увійти через Google' });
  }

  getLoginFacebookLink(): Locator {
    return this.loginModalRoot.getByRole('link', { name: 'Увійти через Facebook' });
  }

  getLoginSubmitButton(): Locator {
    return this.loginModalRoot.getByRole('button', { name: 'Увійти', exact: true });
  }

  getForgotPasswordLink(): Locator {
    return this.loginModalRoot.getByRole('link', { name: 'Забули пароль?' });
  }

  getLoginValidationErrors(): Locator {
    return this.loginModalRoot.locator('.ant-form-item-explain-error');
  }

  getRegistrationModalRoot(): Locator {
    return this.registrationModalRoot;
  }

  getRegistrationTitleLocator(): Locator {
    return this.registrationModalRoot.locator('.registration-title');
  }

  getRegistrationSubtitleLocator(): Locator {
    return this.registrationModalRoot.locator('.registration-subtitle');
  }

  getVisitorRoleOption(): Locator {
    return this.registrationModalRoot.getByText('Відвідувач', { exact: true });
  }

  getManagerRoleOption(): Locator {
    return this.registrationModalRoot.getByText('Керівник', { exact: true });
  }

  getRegistrationLastNameInput(): Locator {
    return this.registrationModalRoot.locator('#lastName');
  }

  getRegistrationFirstNameInput(): Locator {
    return this.registrationModalRoot.locator('#firstName');
  }

  getRegistrationPhoneInput(): Locator {
    return this.registrationModalRoot.locator('#phone');
  }

  getRegistrationEmailInput(): Locator {
    return this.registrationModalRoot.locator('#email');
  }

  getRegistrationPasswordInput(): Locator {
    return this.registrationModalRoot.locator('#password');
  }

  getRegistrationConfirmInput(): Locator {
    return this.registrationModalRoot.locator('#confirm');
  }

  getRegistrationSubmitButton(): Locator {
    return this.registrationModalRoot.getByRole('button', {
      name: 'Зареєструватися',
      exact: true,
    });
  }
}
