import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

/**
 * Уже на POM через успадкування (результат попереднього кроку).
 *
 * TODO (цей крок): після композиції LoginModal / RegistrationModal у HomePage
 * переключити асерти на homePage.getLoginModal() / getRegistrationModal()
 * (див. README).
 */
test.describe('Guest auth & registration (inheritance POM → refactor to CO)', () => {
  test('Profile dropdown shows Login and Register', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openProfileMenu();

    await expect(homePage.getLoginMenuItem()).toBeVisible();
    await expect(homePage.getRegisterMenuItem()).toBeVisible();
  });

  test('Login menu item opens login modal', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openLoginFromProfile();

    await expect(homePage.getLoginModalRoot()).toBeVisible();
    await expect(homePage.getLoginTitleLocator()).toHaveText(homePage.LOGIN_TITLE);
    await expect(homePage.getLoginSubtitleLocator()).toHaveText(homePage.LOGIN_SUBTITLE);
    await expect(homePage.getLoginGoogleLink()).toBeVisible();
    await expect(homePage.getLoginFacebookLink()).toBeVisible();
    await expect(homePage.getLoginEmailInput()).toBeVisible();
    await expect(homePage.getLoginPasswordInput()).toBeVisible();
    await expect(homePage.getLoginSubmitButton()).toBeVisible();
    await expect(homePage.getForgotPasswordLink()).toBeVisible();
  });

  test('Register menu item opens registration modal', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openRegistrationFromProfile();

    await expect(homePage.getRegistrationModalRoot()).toBeVisible();
    await expect(homePage.getRegistrationTitleLocator()).toHaveText(homePage.REGISTER_TITLE);
    await expect(homePage.getRegistrationSubtitleLocator()).toHaveText(homePage.REGISTER_SUBTITLE);
    await expect(homePage.getVisitorRoleOption()).toBeVisible();
    await expect(homePage.getManagerRoleOption()).toBeVisible();
    await expect(homePage.getRegistrationLastNameInput()).toBeVisible();
    await expect(homePage.getRegistrationFirstNameInput()).toBeVisible();
    await expect(homePage.getRegistrationPhoneInput()).toBeVisible();
    await expect(homePage.getRegistrationEmailInput()).toBeVisible();
    await expect(homePage.getRegistrationPasswordInput()).toBeVisible();
    await expect(homePage.getRegistrationConfirmInput()).toBeVisible();
    await expect(homePage.getRegistrationSubmitButton()).toBeDisabled();
  });

  test('Add club button opens login modal for guest', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openLoginFromAddClub();

    await expect(homePage.getLoginModalRoot()).toBeVisible();
    await expect(homePage.getLoginTitleLocator()).toHaveText(homePage.LOGIN_TITLE);
  });

  test('Login modal shows validation errors on empty submit', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openLoginFromProfile();
    await homePage.submitLoginForm();

    await expect(homePage.getLoginValidationErrors()).toHaveText([
      'Please enter Емейл',
      'Please enter Пароль',
    ]);
  });

  test('Home page has Add club button and navigates to clubs via menu', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await expect(homePage.getAddClubButton()).toBeVisible();

    await homePage.navigateViaTopMenu('Гуртки');
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Гуртки в місті');
  });
});
