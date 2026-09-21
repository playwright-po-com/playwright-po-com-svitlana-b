import { type Locator, type Page } from '@playwright/test';
import { BaseModal } from './BaseModal';

/**
 * Component Object модалки реєстрації `.modal-registration`.
 *
 * TODO (студент): скелет за аналогією до LoginModal.
 * Локатори вже є — допишіть:
 *   - selectRole('Відвідувач' | 'Керівник')
 *   - fillRegistrationForm({ lastName, firstName, phone, email, password, confirm })
 *   - submit()
 * Далі підключіть у HomePage композицією (замість getRegistration* локаторів на сторінці).
 */
export class RegistrationModal extends BaseModal {
  public readonly TITLE = 'Реєстрація' as const;
  public readonly SUBTITLE = 'Приєднуйтесь до ініціативи «Навчай українською»' as const;
  public readonly SUBMIT_LABEL = 'Зареєструватися' as const;

  private readonly title: Locator;
  private readonly subtitle: Locator;
  private readonly visitorRoleOption: Locator;
  private readonly managerRoleOption: Locator;
  private readonly lastNameInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, page.locator('.modal-registration'));
    this.title = this.root.locator('.registration-title');
    this.subtitle = this.root.locator('.registration-subtitle');
    this.visitorRoleOption = this.root.getByText('Відвідувач', { exact: true });
    this.managerRoleOption = this.root.getByText('Керівник', { exact: true });
    this.lastNameInput = this.root.locator('#lastName');
    this.firstNameInput = this.root.locator('#firstName');
    this.phoneInput = this.root.locator('#phone');
    this.emailInput = this.root.locator('#email');
    this.passwordInput = this.root.locator('#password');
    this.confirmPasswordInput = this.root.locator('#confirm');
    this.submitButton = this.root.getByRole('button', { name: this.SUBMIT_LABEL, exact: true });
  }

  // TODO (студент): додати методи selectRole / fillRegistrationForm / submit.

  getTitleLocator(): Locator {
    return this.title;
  }

  getSubtitleLocator(): Locator {
    return this.subtitle;
  }

  getVisitorRoleOption(): Locator {
    return this.visitorRoleOption;
  }

  getManagerRoleOption(): Locator {
    return this.managerRoleOption;
  }

  getLastNameInput(): Locator {
    return this.lastNameInput;
  }

  getFirstNameInput(): Locator {
    return this.firstNameInput;
  }

  getPhoneInput(): Locator {
    return this.phoneInput;
  }

  getEmailInput(): Locator {
    return this.emailInput;
  }

  getPasswordInput(): Locator {
    return this.passwordInput;
  }

  getConfirmPasswordInput(): Locator {
    return this.confirmPasswordInput;
  }

  getSubmitButton(): Locator {
    return this.submitButton;
  }
}
