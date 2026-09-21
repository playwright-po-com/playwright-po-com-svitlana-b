# Домашнє завдання: композиція Component Object

> Сайт: Docker `http://localhost/` (див. `playwright.config.ts`)
> Тема: від успадкування → до композиції modal CO

---

## Звідки ви стартуєте

Попередній крок (сирі локатори → POM через **успадкування**) уже зроблено:

- `HomePage extends SearchablePage` — тести в `home-auth.spec.ts` уже зелені через `HomePage`
- auth-модалки поки «зашиті» локаторами прямо в `HomePage` (`getLoginEmailInput()`, `getRegistrationLastNameInput()` …)

Це навмисно: так видно проблему «товстої» сторінки. Цей крок — винести модалки в Component Objects і підключити **композицією**.

---

## Що вже є для композиції

**Еталон на клубах:**

- `ClubsPage` **містить** `MapModal` (`new MapModal(page)` + `getMapModal()`)

**Auth modal CO:**

- `tests/components/modals/BaseModal.ts` — `waitForOpen` / `close` / `root`
- `tests/components/modals/LoginModal.ts` — **готовий** приклад (орієнтир)
- `tests/components/modals/RegistrationModal.ts` — **скелет** (дописати методи)

**Інше готове:**

- `Header` — `openProfileMenu()` / `clickLoginMenuItem()` / `clickRegisterMenuItem()`
- `home-auth.spec.ts` — сценарії вже на inheritance POM (їх треба **оновити**, не писати з нуля)

Кастомні фікстури не потрібні: `const homePage = new HomePage(page)`.

---

## Реальна модель auth

| Дія | Результат |
|-----|-----------|
| профіль → «Увійти» | `.modal-login` |
| профіль → «Зареєструватися» | `.modal-registration` |
| «Додати гурток» (guest) | `.modal-login` |

URL `/login` / `/register` — SPA-404, не використовуйте їх для auth.

---

## Що треба зробити

### 1. Дописати `RegistrationModal`

За аналогією до `LoginModal`:

- `selectRole('Відвідувач' | 'Керівник')`
- `fillRegistrationForm({ lastName, firstName, phone, email, password, confirm })`
- `submit()`

### 2. Рефакторинг `HomePage`: композиція замість дубльованих локаторів

Прибрати з `HomePage` поля/геттери модалок (`loginModalRoot`, `getLoginEmailInput`, …).  
Замість цього:

```ts
private readonly loginModal: LoginModal;
private readonly registrationModal: RegistrationModal;

constructor(page: Page) {
  super(page);
  this.loginModal = new LoginModal(page);
  this.registrationModal = new RegistrationModal(page);
  // ...
}

async openLoginFromProfile(): Promise<void> {
  await this.header.openProfileMenu();
  await this.header.clickLoginMenuItem();
  await this.loginModal.waitForOpen();
}

getLoginModal(): LoginModal {
  return this.loginModal;
}
```

Те саме для registration / `openLoginFromAddClub()`.

### 3. Оновити `home-auth.spec.ts` під CO

Не переписувати сценарії з нуля — лише переключити доступ до модалок:

```ts
// було (успадкування / «товста» сторінка):
await expect(homePage.getLoginTitleLocator()).toHaveText(homePage.LOGIN_TITLE);

// стало (композиція):
const login = homePage.getLoginModal();
await expect(login.getTitleLocator()).toHaveText(login.TITLE);
```

Сценарії лишаються ті самі (меню, login/register модалки, add club → login, валідація, навігація в Гуртки).

---

## Частина B. Новини (композиція list/card)

Окремий трек на тій самій ідеї композиції, що й клуби.

**Скелети (дописати самим):**

- `tests/components/news/NewsCard.ts`
- `tests/components/news/NewsList.ts`
- `tests/pages/NewsPage.ts` (`extends PaginatedListPage`)
- `tests/pages/NewsDetailPage.ts`
- `tests/news.spec.ts` — зараз **сирі локатори**, переписати під POM + CO

**Орієнтири:** `ClubCard` / `ClubList` / `ClubsPage` / `ClubDetailPage`.

**Реальний DOM `/news`:**

| Елемент | Селектор |
|---------|----------|
| Заголовок сторінки | heading «Новини» |
| Картка | `#newsContainer` |
| Дата / тайтл | `#newsDate` / `#newsTitle` |
| Деталі | `#detailButton a` → `/news/:id` |
| Детальна | `#major-title`, `.content-text` (дата: `.content-title`) |
| Пагінація | `.ant-pagination` (є в `PaginatedListPage`) |

**Сценарії в `news.spec.ts`:** список + перша новина, відкриття деталей, зміна сторінки пагінації.

---

## Definition of Done

**Модалки**

- [ ] `RegistrationModal` має робочі методи (не лише getters)
- [ ] `HomePage` композить `LoginModal` і `RegistrationModal`; дубльованих modal-локаторів у `HomePage` немає
- [ ] `home-auth.spec.ts` використовує `getLoginModal()` / `getRegistrationModal()`

**Новини**

- [ ] Дописані `NewsCard`, `NewsList`, `NewsPage`, `NewsDetailPage`
- [ ] `NewsPage` композить `NewsList` (і використовує pagination з бази)
- [ ] `news.spec.ts` переписаний під POM + CO (без сирих локаторів у тесті)

**Спільне**

- [ ] Зрозуміла різниця: **успадкування** (`extends`) vs **композиція** (has-a)
- [ ] `npx tsc --noEmit` без помилок
- [ ] `npx playwright test` — тести зелені

---

## Підказки

- Еталон композиції модалки: `ClubsPage` + `MapModal`
- Еталон modal CO: `LoginModal`
- Еталон list/card: `ClubList` + `ClubCard`
- Локатори модалки/картки — від `this.root`
- Validation errors: `login.getValidationErrors()` + `toHaveText([...])` (інколи не `toBeVisible`)
- `ROUTES.news` / `ROUTES.newsDetail(id)` уже в `app.config.ts`
