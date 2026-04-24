import { Course, Book, TestTask } from '../types';

export const courseProducts: Course[] = [
  { id: 'htmlcss', title: 'Основы HTML и CSS', description: 'Структура веб-страниц и оформление интерфейса', price: '2 900 ₸' },
  { id: 'javascript', title: 'JavaScript для начинающих', description: 'Логика, функции, DOM и события', price: '3 500 ₸' },
  { id: 'sql', title: 'Базы данных и SQL', description: 'Таблицы, связи и запросы', price: '3 200 ₸' },
  { id: 'python', title: 'Python и автоматизация', description: 'Скрипты, файлы и автоматизация', price: '3 900 ₸' },
  { id: 'php', title: 'PHP и backend', description: 'Серверная логика и формы', price: '3 900 ₸' },
  { id: 'csharp', title: 'C# разработка', description: 'ООП и desktop-приложения', price: '3 700 ₸' },
  { id: 'java', title: 'Java и ООП', description: 'Классы, интерфейсы и коллекции', price: '3 900 ₸' },
  { id: 'mobile', title: 'Мобильная разработка', description: 'Навигация, экраны и UX', price: '4 500 ₸' }
];

export const bookProducts: Book[] = [
  { id: 'intro', title: 'Введение в программирование', description: 'Логика, практика и мышление', price: '1 500 ₸' },
  { id: 'frontend', title: 'HTML, CSS и JavaScript', description: 'Теория frontend-разработки', price: '1 900 ₸' },
  { id: 'algorithms', title: 'Алгоритмы и базы данных', description: 'Алгоритмы, структуры и SQL', price: '1 900 ₸' },
  { id: 'backend', title: 'Серверная разработка', description: 'API, сервер и архитектура', price: '2 200 ₸' },
  { id: 'security', title: 'Безопасность данных', description: 'Пароли, роли и защита', price: '2 200 ₸' },
  { id: 'career', title: 'Карьера разработчика', description: 'Портфолио и собеседования', price: '1 200 ₸' },
  { id: 'ux', title: 'Проектирование интерфейсов', description: 'UX, формы и сценарии', price: '1 700 ₸' },
  { id: 'architecture', title: 'Архитектура систем', description: 'Модули и поддерживаемость', price: '2 200 ₸' }
];

export const motivation = [
  'Не сдавайся, решение уже рядом!',
  'Каждая ошибка делает тебя сильнее.',
  'Ты ближе к ответу, чем кажется.',
  'Попробуй еще раз — получится!',
  'Спокойно, внимательно и вперед!'
];

const baseTasksData = [
  ['htmlcss', 'Какой тег используется для ссылки?', '<a href="page.html">Ссылка</a>', ['a', '<a>'], null, 'Используй тег a.'],
  ['javascript', 'Как вывести текст в консоль?', 'console.log("Привет")', ['console.log', 'log'], null, 'Используй console.log.'],
  ['sql', 'Какой оператор выбирает данные?', 'SELECT * FROM users;', ['select'], null, 'Ответ: SELECT.'],
  ['htmlcss', 'Напишите кнопку с текстом Отправить', '<button>Отправить</button>', null, ['button', 'отправить'], 'Нужен button и текст.']
];

export const tasks: TestTask[] = Array.from({ length: 100 }, (_, i) => {
  const b = baseTasksData[i % baseTasksData.length];
  return {
    topic: b[0] as string,
    title: `Задание ${i + 1}`,
    level: i < 20 ? 'базовый' : i < 60 ? 'средний' : 'практика',
    text: `${b[1]} Вариант ${i + 1}.`,
    example: b[2] as string,
    answers: b[3] as string[] | undefined,
    required: b[4] as string[] | undefined,
    hint: b[5] as string,
    solved: false
  };
});
