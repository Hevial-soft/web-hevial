# Хевиал — Студия 3D-печати

Сайт компании Хевиал, реализованный на **Vite + React + TypeScript + Tailwind CSS**.

## Стек

- **Vite** 5.x — сборщик
- **React** 18 + **TypeScript** 5 — UI и типизация
- **Tailwind CSS** 3 — стилизация
- **React Router** v6 — маршрутизация
- **Шрифт** Garet (cdnfonts.com)

## Страницы

| Маршрут | Компонент | Описание |
|---------|-----------|----------|
| `/` | `HomePage` | Главная: Hero, MarqueeStrip, О нас, Контакты |
| `/account` | `AccountPage` | Личный кабинет: авторизация, подписка, заказы |

## Структура проекта

```
src/
├── components/
│   ├── Logo.tsx           # Логотип с тегом
│   ├── Navbar.tsx         # Навигация главной
│   ├── AccountNav.tsx     # Навигация кабинета
│   ├── Footer.tsx         # Подвал
│   ├── MarqueeStrip.tsx   # Бегущая строка
│   └── PlansModal.tsx     # Модалка выбора тарифа
├── pages/
│   ├── HomePage.tsx       # Главная страница
│   └── AccountPage.tsx    # Личный кабинет
├── hooks/
│   ├── useAuth.ts         # Хук авторизации
│   └── useReveal.ts       # Intersection Observer для анимаций
├── types/
│   └── index.ts           # TypeScript типы
├── App.tsx                # Роутер
├── main.tsx               # Точка входа
└── index.css              # Глобальные стили + Tailwind
```

## Запуск

```bash
# Установка зависимостей
npm install

# Dev-сервер
npm run dev

# Сборка
npm run build

# Превью сборки
npm run preview
```

## TODO

- [ ] Подключить Telegram Login Widget
- [ ] Интегрировать оплату через ЮКасса
- [ ] Добавить API для управления заказами
- [ ] Реализовать хранение состояния через Context API или Zustand
