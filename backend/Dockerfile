# Используем легковесный Node.js образ
FROM node:18-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и lock-файл
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем остальной код
COPY . .

# Переменная окружения
ENV NODE_ENV=production

# Порт (замени если у тебя другой)
EXPOSE 3000

# Команда запуска
CMD ["node", "src/index.js"]