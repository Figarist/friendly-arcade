# 🔌 Посібник інтеграції Friendly Arcade UI

Правило одне: **копії токенів у проєктах не пишуться руками.** Проєкт або ставить пакет, або тримає байт-у-байт копію, яку звіряє CI. Так палітра не розходиться між сайтами, а оновлення — це одна команда.

## 1. Проєкт із Vite / npm

```bash
npm install github:Figarist/friendly-arcade#v2.1.0
```

```css
/* перший рядок головного CSS */
@import 'friendly-arcade/tokens.css';
/* за потреби: */
@import 'friendly-arcade/base.css';
@import 'friendly-arcade/components.css';
```

* Vite вбудовує файли у збірку: жодних CDN, сайт працює офлайн.
* Закріплюйте тег, а не гілку. Оновлення: змініть тег у `package.json` (або `npm install github:Figarist/friendly-arcade#vX.Y.Z`), запустіть тести, подивіться сайт у браузері.
* Свої назви змінних мапте на токени в одному місці (`--panel: var(--bg2);`), а не переписуйте всі правила одразу.

## 2. Статичний сайт без збирача

1. Скопіюйте [`scripts/update-friendly-arcade.sh`](../scripts/update-friendly-arcade.sh) у свій репозиторій як `scripts/update-friendly-arcade.sh` і запустіть:

   ```bash
   scripts/update-friendly-arcade.sh v2.1.0
   ```

   З'явиться `vendor/friendly-arcade/` з `tokens.css`, `base.css`, `components.css` і `VERSION`.

2. Підключіть шари **перед** своїми стилями:

   ```html
   <link rel="stylesheet" href="vendor/friendly-arcade/tokens.css">
   <link rel="stylesheet" href="app.css">
   ```

3. Додайте перевірку в `.github/workflows/friendly-arcade.yml`:

   ```yaml
   name: Friendly Arcade
   on: [push, workflow_dispatch]
   jobs:
     verify:
       uses: Figarist/friendly-arcade/.github/workflows/verify-vendored.yml@v2
   ```

   Вона падає, якщо копію хтось поправив руками, і пише підказку, коли вийшла нова версія.

4. Якщо є Service Worker, додайте файли з `vendor/friendly-arcade/` у список кешу і піднімайте версію кешу після оновлення.

Чому копія, а не git submodule: архів «Download ZIP» з GitHub не містить сабмодулів, а студії й каталоги вчителі часто качають саме так і відкривають через `file://`.

## 3. Світла тема

```html
<html data-theme="light">
```

```js
document.documentElement.dataset.theme = 'light'; // або delete document.documentElement.dataset.theme
```

Якщо у вас є власні змінні, що посилаються на токени (`--panel: var(--bg2)`), оголошуйте їх на тому ж елементі, де стоїть `data-theme`, або нижче (наприклад на `body`). Змінні, оголошені на `:root` вище за `data-theme`, «заморозять» темні значення.

## 4. Аркадний звук без файлів (Web Audio)

```javascript
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
  } catch {
    // аудіо заблоковане політикою браузера
  }
}
```

## 5. Випуск нової версії (для мейнтейнера)

1. Правки лише в `tokens.css`, `base.css`, `components.css`.
2. `npm run build && npm test`.
3. Запис у [CHANGELOG.md](../CHANGELOG.md), версія в `package.json`.
4. Тег `vX.Y.Z`, пересунути тег мажорної версії (`v2`), GitHub Release.
5. Оновити споживачів (Тихий клас, LEGO Catalog, 3D Club Studio) і перевірити їх у браузері.
