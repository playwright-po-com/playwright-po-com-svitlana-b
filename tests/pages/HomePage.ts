import { type Locator, type Page } from '@playwright/test';
import { RegistrationModal } from '../components/modals/RegistrationModal';
import { ROUTES } from '../config/app.config';
import { SearchablePage } from './base/SearchablePage';
import { LoginModal } from '../components/modals/LoginModal';

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

  private readonly addClubButton: Locator;
  private readonly loginModal: LoginModal;
  private readonly registrationModal: RegistrationModal;

  constructor(page: Page) {
    super(page);
    this.addClubButton = page.getByRole('button', {
      name: this.ADD_CLUB_BUTTON_LABEL,
      exact: true,
    });
    this.loginModal = new LoginModal(page);
    this.registrationModal = new RegistrationModal(page);
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
    await this.loginModal.waitForOpen();
  }

  async openRegistrationFromProfile(): Promise<void> {
    await this.header.openProfileMenu();
    await this.header.clickRegisterMenuItem();
    await this.registrationModal.waitForOpen();
  }

  async openLoginFromAddClub(): Promise<void> {
    await this.addClubButton.click();
    await this.loginModal.waitForOpen();
  }

  async submitLoginForm(): Promise<void> {
    await this.loginModal.submit();
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

  getLoginModal(): LoginModal {
    return this.loginModal;
  }

  getRegistrationModal(): RegistrationModal {
    return this.registrationModal;
  }
}
