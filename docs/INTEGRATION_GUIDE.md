# 🔌 Посібник Інтеграції Friendly Arcade UI

> Інструкція з підключення та використання дизайн-системи у нових та існуючих проєктах автора чи сторонніх розробників.

---

## 1. Базове Підключення (Zero Build Step)

Оскільки дизайн-система не вимагає Node.js або збирачів, інтеграція займає рівно 1 хвилину:

1. Скопіюйте [`friendly-arcade.css`](../friendly-arcade.css) у свій проєкт (наприклад, у папку `css/` або в корінь).
2. Підключіть у тег `<head>` вашого HTML:
   ```html
   <link rel="stylesheet" href="friendly-arcade.css">
   ```
3. Готово! Усі CSS-змінні `:root`, стилі заголовків, кнопок, карток та контур фокусу вже працюють.

---

## 2. Підключення у проєкт із власними стилями

Якщо у вашому проєкті вже є специфічні стилі (як `app.css` у каталозі LEGO або `styles.css` у 3D Кузні):

```html
<!-- 1. Базова дизайн-система (Ядро токенів та компонентів) -->
<link rel="stylesheet" href="friendly-arcade.css">

<!-- 2. Специфіка конкретного застосунку (Доменні стилі) -->
<link rel="stylesheet" href="app.css">
```

### Переваги такого розділення:
* **Ізоляція:** Оновлення `friendly-arcade.css` автоматично осучаснює всі кнопки, радіуси та контраст у проєкті.
* **Чистота коду:** `app.css` не дублює базові змінні та містить лише специфічні селектори продукту.

---

## 3. Робота з PWA та Офлайн-Кешуванням (Service Worker)

Якщо ваш сайт є PWA (як [LEGO WeDo 2.0 Catalog](https://sivochka.com/lego-catalog/)), додайте файл у масив кешування вашого `sw.js`:

```javascript
const CACHE_NAME = 'my-app-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './friendly-arcade.css',  // <-- Додано ядро дизайн-системи
  './app.css',
  './app.js'
];
```

---

## 4. Підключення Аркадного Аудіо-Синтезатора (Web Audio API)

Щоб надати сайту фірмових тактильних звуків кліку без використання зовнішніх аудіофайлів:

```javascript
// Автономний генератор аркадного кліку
function playArcadeBeep(frequency = 520, duration = 0.08) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Тихо ігнорувати, якщо аудіо заблоковано політикою браузера
  }
}

// Виклик при кліку на кнопки:
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => playArcadeBeep(600));
});
```
