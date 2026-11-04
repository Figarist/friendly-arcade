# 🤖 AGENTS.md — Інструкція для AI-агентів (Antigravity & Copilot)
# Проєкт: Friendly Arcade UI (Офіційна Дизайн-Система Екосистеми)

> **Призначення:** Цей файл є головним операційним контрактом для штучного інтелекту, агентів Antigravity та розробників, які працюють у репозиторії `friendly-arcade` або інтегрують його компоненти в інші проєкти автора.

---

## 1. Ідентичність та Місія Проєкту

* **Назва:** Friendly Arcade UI (v2.1.0)
* **Автор та мейнтейнер:** Ігор Сівочка ([sivochka.com](https://sivochka.com) | [sivochka.com/tutoring](https://sivochka.com/tutoring/))
* **Тип репозиторію:** Публічна відкрита дизайн-система, легкий автономний CSS-фреймворк та портфоліо-шоурум викладача.
* **Репозиторій GitHub:** `https://github.com/Figarist/friendly-arcade`
* **Живий сайт (Showcase):** `https://figarist.github.io/friendly-arcade/`

### Філософія проєкту:
Більшість сучасних бібліотек (Tailwind, Bootstrap, Shadcn) створені для дорослих корпоративних SaaS: вони похмурі, сірі, потребують `npm/webpack` і залежать від CDN.
**Friendly Arcade** створено спеціально для дітей 6–14 років (2–8 класи), STEM-гуртків, робототехніки та веб-ігор:
1. **Ігровий характер (Roblox / LEGO / Nintendo):** глибокий нічний ультрамарин (`#1a1a2e`), соковиті акценти, великі радіуси 16–24px, товсті рамки 2–3px, тактильні пружні мікро-анімації.
2. **Безкомпромісна доступність (WCAG AAA):** вивірений математичний контраст тексту (темний текст `--on-green` та `--on-yellow` на яскравих кнопках), обов'язковий фокус клавіатури `:focus-visible` (3px Cyan), тач-зони $\ge 44\text{px}$.
3. **100% Офлайн і Нуль Залежностей:** один файл `friendly-arcade.css`. Працює без інтернету, без збирачів, прямо з локального диска або флешки через `file://`.

---

## 2. Золоті Правила для Агента (Rules of Engagement)

1. 🚫 **ЖОДНИХ ЗОВНІШНІХ ЗАЛЕЖНОСТЕЙ ТА CDN:**
   * Заборонено підключати Google Fonts, CDN (FontAwesome, Bootstrap, Tailwind, Tailwind Play), сторонні JS-бібліотеки.
   * Шрифти виключно системні стек-шрифти (`--font-sans`: Segoe UI, Roboto, sans-serif).
   * Звукові ефекти реалізуються **виключно через Web Audio API** (вбудований осцилятор), без завантаження зовнішніх `.mp3` чи `.wav`.

2. 🚫 **ЖОДНОГО ЗБИРАЧА В ПРОДАКШЕНІ, ЖОДНИХ NPM-ЗАЛЕЖНОСТЕЙ:**
   * CSS пишеться чистим Vanilla CSS3 з нативними змінними `:root`.
   * JS пишеться чистим Vanilla ES6+.
   * `scripts/build.mjs` і тести працюють на голому Node без `npm install`. `friendly-arcade.css` генерується: правте шари `tokens.css` / `base.css` / `components.css`, потім `npm run build && npm test`.
   * **Кольори тільки в `tokens.css`** (тест це перевіряє). Новий колір компонента = новий токен у `:root` і, за потреби, у `[data-theme="light"]`.

3. ♿ **СУВОРА ДОСТУПНІСТЬ (WCAG AAA / AA):**
   * Білий текст на зеленому (`#00d26a`) чи жовтому (`#ffc312`) суворо **ЗАБОРОНЕНИЙ** (контраст < 2:1 — це провал WCAG). Завжди використовувати токени `--on-green: #06210f` (8.46:1) та `--on-yellow: #261b00` (10.54:1).
   * Кожен інтерактивний елемент зобов'язаний мати `:focus-visible` з яскравим блакитним контуром (`--border-focus: #00d2ff`).
   * Повага до `prefers-reduced-motion`: анімації вимикаються або зменшуються до мінімуму для чутливих очей.

4. 🎯 **РОЗМІР СЕНСОРНИХ МІШЕНЕЙ:**
   * Мінімальний розмір для кнопок, перемикачів і табів — $44 \times 44\text{px}$ для комфортної роботи на дитячих планшетах.

5. 📢 **МАРКЕТИНГОВА ЦІЛІСНІСТЬ:**
   * Усі файли проєкту мають містити коректне авторство: Ігор Сівочка, посилання на персональний сайт [sivochka.com](https://sivochka.com) та сторінку індивідуальних занять [sivochka.com/tutoring](https://sivochka.com/tutoring/).

---

## 3. Структура Репозиторію

```
friendly-arcade/
├── tokens.css                 # Токени: темна тема (:root) + світла ([data-theme="light"]). Кольори лише тут
├── base.css                   # Скидання, тіло, типографіка, фокус, reduced-motion, 44px цілі
├── components.css             # .btn, .pill, .chip, .badge, .card, .arcade-*
├── friendly-arcade.css        # ЗГЕНЕРОВАНИЙ бандл (npm run build), руками не правити
├── package.json               # exports для npm/Vite: friendly-arcade/tokens.css тощо
├── scripts/build.mjs          # Збирає бандл; --check для CI
├── scripts/update-friendly-arcade.sh  # Копіюється у статичні сайти-споживачі
├── test/build.test.mjs        # Бандл актуальний, var() визначені, кольори в токенах, контраст WCAG, таблиця README
├── .github/workflows/test.yml             # CI цього репо
├── .github/workflows/verify-vendored.yml  # Багаторазова перевірка копії у споживачів
├── CHANGELOG.md               # Журнал версій (SemVer, теги vX.Y.Z + рухомий v2)
├── index.html                 # Вітрина з перемикачем теми
└── docs/                      # ARCHITECTURE, COMPONENTS, INTEGRATION_GUIDE, ECOSYSTEM_MIGRATION_LOG
```

## 4. Карта Токенів Дизайн-Системи (`:root`)

| Категорія | Токен | Значення | Призначення |
|---|---|---|---|
| **Поверхня** | `--bg` | `#1a1a2e` | Головне нічне тло сторінки (Deep Midnight) |
| | `--bg2` | `#16213e` | Поглиблені блоки, інпути, сайдбар |
| | `--surface` | `#0f3460` | Шапка, панелі інструментів, модалки |
| | `--surface2` | `#1a4080` | Рамки контролів, розділювачі |
| | `--card` | `#1e3a5f` | Тло карток контенту (Roblox-tile) |
| | `--card-hover` | `#264d73` | Тло картки при ховері |
| **Акценти** | `--green` | `#00d26a` | Головний CTA / Успіх |
| | `--on-green` | `#06210f` | **Контрастний темний текст на зеленому (8.46:1)** |
| | `--yellow` | `#ffc312` | Золото / Нагороди / Рулетка |
| | `--on-yellow` | `#261b00` | **Контрастний темний текст на жовтому (10.54:1)** |
| | `--red` | `#c02937` | Червоний для кнопок і плашок з білим текстом |
| | `--red-bright` | `#ff4757` | Сердечка, вибране, іконки |
| | `--cyan` | `#00d2ff` | Фокус `:focus-visible`, неоновий контур |
| | `--on-cyan` | `#061e38` | Темний текст на блакитному (8.85:1) |
| | `--purple` | `#a855f7` | Магія, рідкісні квести |
| | `--orange` | `#ff6b35` | Вогонь, новинки |
| **Текст** | `--text` | `#ffffff` | Головний білий текст |
| | `--text2` | `#c3dcff` | Другорядний світло-блакитний текст (8.22:1) |
| | `--text-muted` | `#8da6cc` | Підписи, дати, дрібні підказки |
| **Радіуси** | `--r-xs` | `6px` | Мініатюрні чіпи |
| | `--r-sm` | `10px` | Поля вводу, бейджі |
| | `--r-md` | `16px` | **Картки контенту, випадаючі списки** |
| | `--r-lg` | `24px` | **Модальні вікна, великі банери** |
| | `--r-pill` | `999px` | **Кнопки, статус-пігулки, лічильники** |

---

## 5. Залежні Проєкти в Екосистемі Автора

| Проєкт | Як підключено | Оновлення |
|---|---|---|
| [Тихий клас](https://sivochka.com/bouncy/) (`Figarist/bouncy`, Vite) | npm git-залежність `friendly-arcade#vX.Y.Z`, `@import 'friendly-arcade/tokens.css'` | змінити тег у `package.json` |
| [LEGO WeDo 2.0 Catalog](https://sivochka.com/lego-catalog/) (статичний PWA) | копія `vendor/friendly-arcade/` + `VERSION`, CI `verify-vendored.yml@v2` | `scripts/update-friendly-arcade.sh vX.Y.Z` + підняти кеш `sw.js` |
| [3D Club Studio](https://sivochka.com/3d-club-studio/) (статичний, працює з `file://`) | копія `vendor/friendly-arcade/` + `VERSION`, CI `verify-vendored.yml@v2` | `scripts/update-friendly-arcade.sh vX.Y.Z` |

Жоден споживач не тримає власних копій токенів у своєму CSS: лише аліаси на кшталт `--panel: var(--bg2)`.

## 6. Регламент Внесення Змін для Агентів

1. Правити шари `tokens.css` / `base.css` / `components.css` (не бандл).
2. `npm run build && npm test` — бандл, токени, контраст обох тем, таблиця в README.
3. Живий приклад у [`index.html`](index.html), перевірка в обох темах, тач-цілі ≥ 44px.
4. Документація в [`docs/COMPONENTS.md`](docs/COMPONENTS.md), запис у [`CHANGELOG.md`](CHANGELOG.md), версія в `package.json`.
5. Реліз: тег `vX.Y.Z`, пересунути `v2`, GitHub Release. Потім оновити споживачів (таблиця вище) і запис у [`docs/ECOSYSTEM_MIGRATION_LOG.md`](docs/ECOSYSTEM_MIGRATION_LOG.md).
