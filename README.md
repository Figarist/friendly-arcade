# 🎮 Friendly Arcade UI

[![Vanilla CSS](https://img.shields.io/badge/Pure_Vanilla-CSS3-blue?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success?style=for-the-badge)](https://github.com/Figarist/friendly-arcade)
[![Version](https://img.shields.io/badge/version-2.1.0-00d26a?style=for-the-badge)](CHANGELOG.md)
[![WCAG AAA](https://img.shields.io/badge/Accessibility-WCAG_AAA-brightgreen?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![100% Offline](https://img.shields.io/badge/Offline-100%25_Ready-yellow?style=for-the-badge)](https://github.com/Figarist/friendly-arcade)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Автономна відкрита дизайн-система та легкий CSS-фреймворк для дитячих освітніх застосунків, STEM-гуртків, робототехніки та вебігор.**  
> Створено викладачем IT та робототехніки **Ігорем Сівочкою** ([sivochka.com](https://sivochka.com)).

---

## 🌟 Чому Friendly Arcade?

Більшість сучасних UI-бібліотек (Bootstrap, Tailwind, Shadcn, Material) створені для корпоративних панелей керування або дорослих SaaS-сервісів: вони сірі, сухі, перевантажені збирачами (Node.js, npm, Webpack) та вимагають підключення до Інтернету.

**Friendly Arcade UI** створено з іншою філософією:
1. **Ігровий, тактильний характер (Roblox / Nintendo / LEGO):** соковиті контрастні кольори, великі заокруглення 16–24px, товсті 2–3px інженерні рамки, пружні анімації натискання та ховеру, які обожнюють діти 6–14 років.
2. **Безкомпромісна доступність (WCAG AAA):** вивірений математичний контраст тексту (жодного сліпого білого тексту на салатовому тлі!), контур фокусу клавіатури `:focus-visible` (3px Cyan) та сенсорні мішені $\ge 44\text{px}$ для старих шкільних планшетів.
3. **100% Офлайн і Нуль Залежностей:** один файл `friendly-arcade.css` без жодного зовнішнього шрифту чи CDN. Працює в бомбосховищі, на селі або в літаку прямо через `file://index.html`.

---

## 🚀 Швидкий старт

Дизайн-система має три шари і готовий бандл:

| Файл | Що всередині |
|---|---|
| [`tokens.css`](tokens.css) | Усі кольори, радіуси, тіні, шрифти, анімації. Темна тема в `:root`, світла в `[data-theme="light"]`. **Кольори живуть тільки тут.** |
| [`base.css`](base.css) | Скидання, тіло сторінки, типографіка, фокус клавіатури, `prefers-reduced-motion`, сенсорні цілі ≥ 44px. |
| [`components.css`](components.css) | `.btn`, `.pill`, `.chip`, `.badge`, `.card`, `.arcade-grid`, `.arcade-header`, поля, `.arcade-modal`, `.arcade-toast`. |
| [`friendly-arcade.css`](friendly-arcade.css) | Усе разом. **Генерується** `npm run build`, руками не редагувати. |

### Варіант 1. Проєкт із Vite / npm (як «Тихий клас»)

```bash
npm install github:Figarist/friendly-arcade#v2.1.0
```

```css
/* main.css, першим рядком */
@import 'friendly-arcade/tokens.css';   /* або 'friendly-arcade' — весь бандл */
```

Vite вбудовує файл у збірку, тож сайт лишається 100% офлайн. Завжди закріплюйте **тег** (`#v2.1.0`), а не гілку: нова палітра потрапить у продукт лише тоді, коли ви самі піднімете версію.

### Варіант 2. Статичний сайт без збирача (як LEGO Catalog і 3D Club Studio)

Покладіть копію шарів у `vendor/friendly-arcade/` і підключіть **до** своїх стилів:

```html
<link rel="stylesheet" href="vendor/friendly-arcade/tokens.css">
<link rel="stylesheet" href="app.css">
```

Копію не редагують руками. Оновлення одною командою (скрипт лежить у [docs/INTEGRATION_GUIDE.md](docs/INTEGRATION_GUIDE.md#2-статичний-сайт-без-збирача)):

```bash
scripts/update-friendly-arcade.sh v2.1.0
```

Скрипт кладе поруч файл `VERSION`, а GitHub Actions на кожному пуші звіряє копію з цим тегом.

### Варіант 3. Один HTML-файл

```html
<link rel="stylesheet" href="friendly-arcade.css">
```

### Світла тема

```html
<html lang="uk" data-theme="light">
```

Або перемикайте з JS: `document.documentElement.dataset.theme = 'light'`. Компоненти міняти не треба: вони беруть кольори з токенів.

---

## 🎨 Контраст (перевіряє `npm test`)

Розраховано за формулою W3C: $\text{Contrast} = \frac{L_1 + 0.05}{L_2 + 0.05}$. Тест падає, якщо пара опуститься нижче свого рівня або ця таблиця застаріє.

| Тема | Текст | Тло | Коефіцієнт | Рівень |
|---|---|---|---|:---:|
| dark | `--text` `#ffffff` | `--bg` `#1a1a2e` | **17.06:1** | AAA |
| dark | `--text2` `#c3dcff` | `--card` `#1e3a5f` | **8.22:1** | AAA |
| dark | `--text-muted` `#8da6cc` | `--bg` `#1a1a2e` | **6.87:1** | AA |
| dark | `--on-green` `#06210f` | `--green` `#00d26a` | **8.46:1** | AAA |
| dark | `--on-yellow` `#261b00` | `--yellow` `#ffc312` | **10.54:1** | AAA |
| dark | `--on-cyan` `#061e38` | `--cyan` `#00d2ff` | **9.33:1** | AAA |
| dark | `--on-red` `#ffffff` | `--red` `#c02937` | **5.81:1** | AA |
| dark | `--ok-text` `#86efac` | `--bg` `#1a1a2e` | **12.15:1** | AAA |
| dark | `--warn-text` `#ffc312` | `--bg` `#1a1a2e` | **10.61:1** | AAA |
| dark | `--danger-text` `#fca5a5` | `--bg` `#1a1a2e` | **8.99:1** | AAA |
| dark | `--info-text` `#7dd3fc` | `--bg` `#1a1a2e` | **10.23:1** | AAA |
| light | `--text` `#0f172a` | `--bg` `#f1f5fb` | **16.32:1** | AAA |
| light | `--text2` `#334155` | `--card` `#f4f7fc` | **9.64:1** | AAA |
| light | `--text-muted` `#475569` | `--surface` `#ffffff` | **7.58:1** | AAA |
| light | `--on-green` `#06210f` | `--green` `#00d26a` | **8.46:1** | AAA |
| light | `--ok-text` `#046c40` | `--surface` `#ffffff` | **6.51:1** | AA |
| light | `--warn-text` `#7c4a03` | `--surface` `#ffffff` | **7.40:1** | AAA |
| light | `--danger-text` `#9f1d2b` | `--surface` `#ffffff` | **7.82:1** | AAA |
| light | `--info-text` `#075985` | `--surface` `#ffffff` | **7.56:1** | AAA |

---

## 🔖 Версії

* `vX.Y.Z` — git-теги з [журналом змін](CHANGELOG.md). PATCH: виправлення, MINOR: нові токени чи компоненти, MAJOR: перейменування або видалення токенів.
* Змінюйте лише `tokens.css`, `base.css`, `components.css`, потім `npm run build && npm test`, і ставте новий тег.

## 🧱 Живі кейси використання у реальних продуктах

Дизайн-система живить три відкриті EdTech-проєкти:

1. **[LEGO WeDo 2.0 Catalog](https://sivochka.com/lego-catalog/)** — відкритий офлайн PWA-каталог інструкцій для вчителів робототехніки та STEM-шкіл.
2. **[3D Club Studio v2.0.0](https://sivochka.com/3d-club-studio/)** ([GitHub](https://github.com/Figarist/3d-club-studio)) — автономна тривимірна CAD-студія моделювання для школярів на базі Three.js r128.
3. **[Тихий клас](https://sivochka.com/bouncy/)** ([GitHub](https://github.com/Figarist/bouncy)) — шумомір і таймер тиші для уроку на смарт-дошці, зі світлою темою для яскравого кабінету.

---

## 🧩 Готові компоненти бібліотеки

* `.btn` — тактильні кнопки з пружним ховером (`.btn--primary`, `.btn--accent`, `.btn--ghost`, `.btn--danger`).
* `.pill` — овальні статуси (`.pill--ok`, `.pill--warn`, `.pill--danger`, `.pill--info`).
* `.chip` — сенсорні фільтри-перемикачі категорій.
* `.badge` — плаваючі кутові мітки (`.badge--new`, `.badge--hot`, `.badge--gold`).
* `.card` — ігрові картки Roblox-tile з анімацією підйому `translateY(-8px) scale(1.02)`.
* `.arcade-grid` — самоадаптивна сітка без медіа-запитів (`repeat(auto-fill, minmax(...))`).
* `.arcade-modal` — доступні модальні вікна із круглим ✕ та обмеженням 90vh.
* `.arcade-toast` — спливаючі повідомлення успіху.

---

## 📚 Повна Документація Проєкту

Для розробників та AI-агентів у репозиторії створено повний комплект специфікацій:

* 🤖 [**AGENTS.md**](AGENTS.md) — Головний операційний контракт для AI-агентів (Antigravity) з правилами чистоти коду та картою токенів.
* 📐 [**docs/ARCHITECTURE.md**](docs/ARCHITECTURE.md) — Глибокий аналіз архітектурних шарів, математика формул WCAG AAA та фізика анімацій.
* 🧩 [**docs/COMPONENTS.md**](docs/COMPONENTS.md) — Каталог усіх компонентів із готовими HTML-шаблонами для копіювання.
* 🔌 [**docs/INTEGRATION_GUIDE.md**](docs/INTEGRATION_GUIDE.md) — Покроковий посібник інтеграції у сторонні веб-сайти та PWA.
* 📜 [**docs/ECOSYSTEM_MIGRATION_LOG.md**](docs/ECOSYSTEM_MIGRATION_LOG.md) — Детальний журнал того, що було взято та змінено в LEGO WeDo 2.0 Catalog та 3D Club Studio v2.0.0.

---

## 👨‍🏫 Про автора та контакти

**Ігор Сівочка (Ihor Sivochka)**  
Викладач IT, програмування та робототехніки для дітей.

* 🌐 **Персональний сайт:** [sivochka.com](https://sivochka.com/)
* 🚀 **Індивідуальні онлайн-заняття:** [sivochka.com/tutoring](https://sivochka.com/tutoring/) (Scratch, Python, 3D-друк, робототехніка)
* ✈️ **Telegram-канал:** [@proVR_ua](https://t.me/proVR_ua)
* ▶️ **YouTube:** [@proVR_ua](https://www.youtube.com/@proVR_ua)
* 💻 **GitHub:** [@Figarist](https://github.com/Figarist)

---

## 📄 Ліцензія

Цей проєкт поширюється за відкритою ліцензією **MIT License**. Ви можете вільно використовувати його для створення комерційних чи некомерційних шкільних та дитячих сайтів.
