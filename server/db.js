const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.db'));

// Инициализация таблиц
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'Студент'
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT
  );

  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS progress (
    user_id INTEGER,
    topic TEXT,
    completed INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    score INTEGER DEFAULT 0,
    PRIMARY KEY(user_id, topic),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Наполнение начальными данными
const insertProduct = db.prepare('INSERT OR IGNORE INTO products (id, type, title, description, price) VALUES (?, ?, ?, ?, ?)');

const courses = [
  ['htmlcss', 'course', 'Основы HTML и CSS', 'Структура веб-страниц и оформление интерфейса', '2 900 ₸'],
  ['javascript', 'course', 'JavaScript для начинающих', 'Логика, функции, DOM и события', '3 500 ₸'],
  ['sql', 'course', 'Базы данных и SQL', 'Таблицы, связи и запросы', '3 200 ₸'],
  ['python', 'course', 'Python и автоматизация', 'Скрипты, файлы и автоматизация', '3 900 ₸'],
  ['php', 'course', 'PHP и backend', 'Серверная логика и формы', '3 900 ₸'],
  ['csharp', 'course', 'C# разработка', 'ООП и desktop-приложения', '3 700 ₸'],
  ['java', 'course', 'Java и ООП', 'Классы, интерфейсы и коллекции', '3 900 ₸'],
  ['mobile', 'course', 'Мобильная разработка', 'Навигация, экраны и UX', '4 500 ₸']
];

const books = [
  ['intro', 'book', 'Введение в программирование', 'Логика, практика и мышление', '1 500 ₸'],
  ['frontend', 'book', 'HTML, CSS и JavaScript', 'Теория frontend-разработки', '1 900 ₸'],
  ['algorithms', 'book', 'Алгоритмы и базы данных', 'Алгоритмы, структуры и SQL', '1 900 ₸'],
  ['backend', 'book', 'Серверная разработка', 'API, сервер и архитектура', '2 200 ₸'],
  ['security', 'book', 'Безопасность данных', 'Пароли, роли и защита', '2 200 ₸'],
  ['career', 'book', 'Карьера разработчика', 'Портфолио и собеседования', '1 200 ₸'],
  ['ux', 'book', 'Проектирование интерфейсов', 'UX, формы и сценарии', '1 700 ₸'],
  ['architecture', 'book', 'Архитектура систем', 'Модули и поддерживаемость', '2 200 ₸']
];

db.transaction(() => {
  for (const p of courses) insertProduct.run(...p);
  for (const p of books) insertProduct.run(...p);
})();

module.exports = db;
