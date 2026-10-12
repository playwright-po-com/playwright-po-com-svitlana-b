import { test, expect } from "@playwright/test";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { NewsPage } from "./pages/NewsPage";

test.describe("News (raw locators — rewrite to POM + CO)", () => {
  test("News page shows title and first article", async ({ page }) => {
    const newsPage = new NewsPage(page);
    await newsPage.gotoNewsPage();
    await newsPage.waitForNewsLoaded();
    const firstCard = newsPage.getNewsList().getFirstCard();

    await expect(newsPage.getPageTitleLocator()).toBeVisible();
    await expect(firstCard.getTitleLocator()).toHaveText(
      "Зимові канікули з користю: гуртки, що працюють у грудні-січні",
    );
    await expect(firstCard.getDateLocator()).toHaveText("15.12.2025");
  });

  test("Open news details from list card", async ({ page }) => {
    const newsPage = new NewsPage(page);
    const newsDetailPage = new NewsDetailPage(page);

    await newsPage.gotoNewsPage();
    await newsPage.getNewsList().getFirstCard().openDetails();

    await expect(page).toHaveURL(/\/news\/8\/?$/);

    await expect(newsDetailPage.getTitleLocator()).toHaveText(
      "Зимові канікули з користю: гуртки, що працюють у грудні-січні",
    );
    await expect(newsDetailPage.getContentLocator()).toContainText(
      "Зимові канікули",
    );
  });

  test("Pagination changes news list", async ({ page }) => {
    const newsPage = new NewsPage(page);
    const list = newsPage.getNewsList();

    await newsPage.gotoNewsPage();

    await expect(list.getFirstCard().getTitleLocator()).toHaveText(
      "Зимові канікули з користю: гуртки, що працюють у грудні-січні",
    );

    await newsPage.goToPage(2);

    await expect(list.getFirstCard().getTitleLocator()).toHaveText(
      "Марафон «Навчай українською»: освіта без кордонів",
    );
  });
});
