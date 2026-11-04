# Журнал змін

Формат: [Keep a Changelog](https://keepachangelog.com/uk/1.1.0/), версії за [SemVer](https://semver.org/lang/uk/).

## [2.1.0] — 2026-11-04

### Додано
- Шари `tokens.css`, `base.css`, `components.css`; `friendly-arcade.css` тепер збирається з них (`npm run build`).
- Світла тема `[data-theme="light"]` для яскравих кабінетів і слабких проекторів, з перевіреним контрастом.
- Токени для похідних кольорів компонентів (`--ok-bg`, `--ok-text`, `--warn-*`, `--danger-*`, `--info-*`, `--overlay`, `--placeholder`, `--header-bg`, `--yellow-hover`, `--red-hover`, `--ghost-hover`, тіні). У шарах `base` і `components` більше немає жорстких кольорів.
- `package.json` з `exports`: `npm install github:Figarist/friendly-arcade#v2.1.0`, далі `@import 'friendly-arcade/tokens.css'`.
- `npm test`: бандл актуальний, кожен `var(--…)` визначено, кольори лише в токенах, контраст WCAG для обох тем і таблиця в README.
- Для сайтів без збирача: `scripts/update-friendly-arcade.sh` і багаторазовий workflow `verify-vendored.yml`, що звіряє копію з тегом.
- Перемикач теми у вітрині.

### Змінено
- Контур фокусу бере колір з `--border-focus` (у світлій темі темніший блакитний).
- Текст на кольорових плашках (`.badge--hot`, `.clear-btn`) бере `--on-red`; білий текст на поверхнях — `--text`.

## [2.0.0] — 2026-10-12
- Перший публічний реліз: токени Midnight Arcade, кнопки, пігулки, чіпи, бейджі, картки, сітка, шапка, поля, модалки, тости.
