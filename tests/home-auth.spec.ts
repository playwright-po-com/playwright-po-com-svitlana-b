import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

/**
 * Уже на POM через успадкування (результат попереднього кроку).
 *
 * TODO (цей крок): після композиції LoginModal / RegistrationModal у HomePage
 * переключити асерти на homePage.getLoginModal() / getRegistrationModal()
 * (див. README).
 */
test.describe("Guest auth & registration (inheritance POM → refactor to CO)", () => {
  test("Profile dropdown shows Login and Register", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openProfileMenu();

    await expect(homePage.getLoginMenuItem()).toBeVisible();
    await expect(homePage.getRegisterMenuItem()).toBeVisible();
  });

  test("Login menu item opens login modal", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.openLoginFromProfile();
    const login = homePage.getLoginModal();

    await expect(login.getRootLocator()).toBeVisible();
    await expect(login.getTitleLocator()).toHaveText(login.TITLE);
    await expect(login.getSubtitleLocator()).toHaveText(login.SUBTITLE);
    await expect(login.getGoogleLink()).toBeVisible();
    await expect(login.getFacebookLink()).toBeVisible();
    await expect(login.getEmailInput()).toBeVisible();
    await expect(login.getPasswordInput()).toBeVisible();
    await expect(login.getSubmitButton()).toBeVisible();
    await expect(login.getForgotPasswordLink()).toBeVisible();
  });

  test("Register menu item opens registration modal", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.openRegistrationFromProfile();
    const registration = homePage.getRegistrationModal();

    await expect(registration.getRootLocator()).toBeVisible();
    await expect(registration.getTitleLocator()).toHaveText(registration.TITLE);
    await expect(registration.getSubtitleLocator()).toHaveText(
      registration.SUBTITLE,
    );
    await expect(registration.getVisitorRoleOption()).toBeVisible();
    await expect(registration.getManagerRoleOption()).toBeVisible();
    await expect(registration.getLastNameInput()).toBeVisible();
    await expect(registration.getFirstNameInput()).toBeVisible();
    await expect(registration.getPhoneInput()).toBeVisible();
    await expect(registration.getEmailInput()).toBeVisible();
    await expect(registration.getPasswordInput()).toBeVisible();
    await expect(registration.getConfirmPasswordInput()).toBeVisible();
    await expect(registration.getSubmitButton()).toBeDisabled();
  });

  test("Add club button opens login modal for guest", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openLoginFromAddClub();
    const login = homePage.getLoginModal();

    await expect(login.getRootLocator()).toBeVisible();
    await expect(login.getTitleLocator()).toHaveText(login.TITLE);
  });

  test("Login modal shows validation errors on empty submit", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.openLoginFromProfile();
    await homePage.submitLoginForm();
    const login = homePage.getLoginModal();

    await expect(login.getValidationErrors()).toHaveText([
      "Please enter Емейл",
      "Please enter Пароль",
    ]);
  });

  test("Home page has Add club button and navigates to clubs via menu", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await expect(homePage.getAddClubButton()).toBeVisible();

    await homePage.navigateViaTopMenu("Гуртки");
    await expect(page.getByRole("heading", { level: 2 })).toContainText(
      "Гуртки в місті",
    );
  });
});
