# 🎮 Friendly Arcade UI

[![Vanilla CSS](https://img.shields.io/badge/Pure_Vanilla-CSS3-blue?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success?style=for-the-badge)](https://github.com/Figarist/friendly-arcade)
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

## 🚀 Швидкий старт за 1 хвилину

### 1. Скопіюйте файл у свій проєкт:
Завантажте [`friendly-arcade.css`](friendly-arcade.css) у папку свого сайту.

### 2. Підключіть у HTML:
```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Мій Дитячий Проєкт</title>
  <!-- Підключення стилів -->
  <link rel="stylesheet" href="friendly-arcade.css">
</head>
<body>
  <!-- Готова аркадна картка завдання -->
  <div class="card">
    <div class="card-img-wrap">
      <span class="badge badge--new">NEW</span>
      <img src="robot.png" alt="Робот">
    </div>
    <div class="card-body">
      <h3 class="card-title">Робот-Павук 3000</h3>
      <p class="card-desc">Покрокова інструкція для уроків робототехніки.</p>
      <div class="card-footer">
        <span class="pill pill--ok">⭐ 2–4 клас</span>
        <button class="btn btn--primary btn--sm">Відкрити 🚀</button>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 🎨 Математика контрасту та палітра кольорів

Розраховано за офіційною формулою W3C: $\text{Contrast} = \frac{L_1 + 0.05}{L_2 + 0.05}$

| Токен кольору | HEX | Контрастний текст | Коефіцієнт | Стандарт WCAG |
|---|---|---|---|:---:|
| `--green` | `#00d26a` | `--on-green: #06210f` | **8.46:1** | **AAA (найвищий)** |
| `--yellow` | `#ffc312` | `--on-yellow: #261b00` | **10.54:1** | **AAA (найвищий)** |
| `--cyan` | `#00d2ff` | `--on-cyan: #061e38` | **8.85:1** | **AAA (найвищий)** |
| `--red` | `#c02937` | `#ffffff` | **5.81:1** | **AA (пройдено)** |
| `--card` | `#1e3a5f` | `#ffffff` | **8.22:1** | **AAA (найвищий)** |
| `--bg` | `#1a1a2e` | `--text2: #c3dcff` | **12.19:1** | **AAA (найвищий)** |

---

## 🧱 Живі кейси використання у реальних продуктах

Дизайн-система успішно живить два великих відкритих EdTech-проєкти:

1. **[LEGO WeDo 2.0 Catalog](https://sivochka.com/lego-catalog/)** — відкритий офлайн PWA-каталог інструкцій для вчителів робототехніки та STEM-шкіл.
2. **[3D Club Studio v2.0.0](https://sivochka.com/3d-club-studio/)** ([GitHub](https://github.com/Figarist/3d-club-studio)) — автономна тривимірна CAD-студія моделювання для школярів на базі Three.js r128.

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
