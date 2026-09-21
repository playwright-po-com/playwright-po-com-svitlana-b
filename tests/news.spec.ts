import { test, expect } from '@playwright/test';

/**
 * Сирі тести новин (без POM).
 * TODO (студент): переписати через NewsPage / NewsList / NewsCard / NewsDetailPage
 * (композиція, як ClubsPage → ClubList → ClubCard).
 */
test.describe('News (raw locators — rewrite to POM + CO)', () => {
  test('News page shows title and first article', async ({ page }) => {
    await page.goto('./news');

    await expect(page.getByRole('heading', { name: 'Новини', exact: true })).toBeVisible();
    await expect(page.locator('#newsContainer').first()).toBeVisible();
    await expect(page.locator('#newsTitle').first()).toHaveText(
      'Зимові канікули з користю: гуртки, що працюють у грудні-січні',
    );
    await expect(page.locator('#newsDate').first()).toHaveText('15.12.2025');
  });

  test('Open news details from list card', async ({ page }) => {
    await page.goto('./news');

    await page.locator('#newsContainer').first().locator('#detailButton a').click();

    await expect(page).toHaveURL(/\/news\/8\/?$/);
    await expect(page.locator('#major-title')).toHaveText(
      'Зимові канікули з користю: гуртки, що працюють у грудні-січні',
    );
    await expect(page.locator('.news-page .content-text')).toContainText('Зимові канікули');
  });

  test('Pagination changes news list', async ({ page }) => {
    await page.goto('./news');

    await expect(page.locator('#newsTitle').first()).toHaveText(
      'Зимові канікули з користю: гуртки, що працюють у грудні-січні',
    );

    await page.locator('.ant-pagination-item-2').click();

    await expect(page.locator('#newsTitle').first()).toHaveText(
      'Марафон «Навчай українською»: освіта без кордонів',
    );
  });
});
