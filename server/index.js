const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = 3001;
const SECRET = 'super-secret-key-404-school';

app.use(cors());
app.use(express.json());

// Middleware для проверки JWT
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

// Auth Эндпоинты
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = (name === 'admin' && password === 'admin') ? 'Администратор' : 'Студент';

  try {
    const info = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(name, email, hashedPassword, role);
    const userId = info.lastInsertRowid;
    
    // Начальный прогресс
    const topics = ['htmlcss', 'javascript', 'sql'];
    const insertProgress = db.prepare('INSERT INTO progress (user_id, topic, total) VALUES (?, ?, ?)');
    topics.forEach(t => insertProgress.run(userId, t, 33));

    const token = jwt.sign({ id: userId }, SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: userId, name, email, role } });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// Данные
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

app.get('/api/user/data', authenticate, (req, res) => {
  const purchases = db.prepare('SELECT product_id FROM purchases WHERE user_id = ?').all(req.userId).map(p => p.product_id);
  const progress = db.prepare('SELECT topic, completed, total, score FROM progress WHERE user_id = ?').all(req.userId);
  
  const progressObj = {};
  progress.forEach(p => {
    progressObj[p.topic] = { completed: p.completed, total: p.total, score: p.score };
  });

  res.json({ purchases, progress: progressObj });
});

app.post('/api/purchase', authenticate, (req, res) => {
  const { productId } = req.body;
  try {
    db.prepare('INSERT INTO purchases (user_id, product_id) VALUES (?, ?)').run(req.userId, productId);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Already purchased or error' });
  }
});

app.post('/api/progress', authenticate, (req, res) => {
  const { topic, completed, score } = req.body;
  db.prepare('UPDATE progress SET completed = ?, score = ? WHERE user_id = ? AND topic = ?')
    .run(completed, score, req.userId, topic);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
