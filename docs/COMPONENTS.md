# 🧩 Каталог Компонентів Friendly Arcade UI

> Довідник готових HTML/CSS компонентів з прикладами розмітки, станів та доступності.

---

## 1. Кнопки (`.btn`)

Базовий клас `.btn` створює тактильну, пружну кнопку із сенсорною мішенню не менше $44\text{px}$.

```html
<!-- Головна дія (CTA / Зелена / WCAG AAA) -->
<button class="btn btn--primary">
  <span>Поїхали! 🚀</span>
</button>

<!-- Акцентна дія (Жовта / Золото / WCAG AAA) -->
<button class="btn btn--accent">
  <span>🎲 Випадкова модель</span>
</button>

<!-- Примарна / Другорядна (Ghost) -->
<button class="btn btn--ghost">
  <span>Скасувати</span>
</button>

<!-- Небезпечна дія (Danger / Червона) -->
<button class="btn btn--danger">
  <span>Видалити</span>
</button>

<!-- Розміри -->
<button class="btn btn--primary btn--sm">Мала кнопка</button>
<button class="btn btn--primary btn--lg">Велика кнопка</button>
```

---

## 2. Статус-Пігулки (`.pill`)

Овальні компактні індикатори складності, кількості деталей, вікових категорій або стану.

```html
<span class="pill pill--ok">✅ Готово</span>
<span class="pill pill--warn">⭐ 4–6 клас</span>
<span class="pill pill--danger">⚠️ Складно</span>
<span class="pill pill--info">ℹ️ 24 кроки</span>
```

---

## 3. Фільтр-Чіпи (`.chip`)

Сенсорні кнопки перемикання категорій або режимів відображення.

```html
<div class="filter-chips">
  <button class="chip active">🌟 Усі моделі</button>
  <button class="chip">🤖 Роботи</button>
  <button class="chip">🦖 Динозаври</button>
  <button class="chip">🏎️ Автомобілі</button>
</div>
```

---

## 4. Бейджі (`.badge`)

Мікро-мітки для позначення статусу картки (новинки, гаряче, квест).

```html
<span class="badge badge--new">NEW</span>
<span class="badge badge--hot">🔥 HOT</span>
<span class="badge badge--gold">👑 PRO</span>
```

---

## 5. Ігрові Картки Контенту (`.card` — Roblox-tile style)

Основний контейнер для моделей LEGO, 3D-генераторів або завдань. При ховері картка плавно піднімається на 8px із зеленою інженерною рамкою 3px.

```html
<div class="card">
  <div class="card-img-wrap">
    <span class="badge badge--new" style="position: absolute; top: 10px; left: 10px;">NEW</span>
    <img src="model.png" alt="LEGO Модель" loading="lazy">
  </div>
  <div class="card-body">
    <h4 class="card-title">Робот-Павук 3000</h4>
    <p class="card-desc">Покрокова інструкція для уроків робототехніки.</p>
    <div class="card-footer">
      <span class="pill pill--ok">24 кроки</span>
      <button class="btn btn--primary btn--sm">Зібрати</button>
    </div>
  </div>
</div>
```

---

## 6. Адаптивна Аркадна Сітка (`.arcade-grid`)

Самоадаптивна сітка без жодного медіа-запиту:

```html
<div class="arcade-grid">
  <!-- Тут розміщуються елементи .card -->
</div>
```

CSS під капотом:
```css
.arcade-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
```

---

## 7. Модальне Вікно (`.arcade-modal`)

Доступний діалог із заокругленням 24px, 3px рамкою, круглою кнопкою ✕ (36x36px) та блокуванням переповнення екрана (`max-height: 90vh`).

```html
<div class="arcade-modal-backdrop open" id="myModal">
  <div class="arcade-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="arcade-modal-header">
      <h3 class="arcade-modal-title" id="modalTitle">🎮 Заголовок Вікна</h3>
      <button class="arcade-modal-close" aria-label="Закрити">&times;</button>
    </div>
    <div class="arcade-modal-body">
      <p>Тіло модального вікна з автоматичним охайним внутрішнім скролом.</p>
    </div>
    <div class="arcade-modal-footer">
      <button class="btn btn--ghost">Скасувати</button>
      <button class="btn btn--primary">Зберегти</button>
    </div>
  </div>
</div>
```

---

## 8. Спливаючий Тост (`.arcade-toast`)

Ненав'язливе повідомлення успіху у нижньому правому кутку екрана:

```html
<div class="arcade-toast show">
  <span>✨</span>
  <span>Модель успішно збережена!</span>
</div>
```
