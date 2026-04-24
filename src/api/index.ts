const API_URL = 'http://localhost:3001/api';

const getHeaders = () => {
  const token = localStorage.getItem('school404Token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  async register(name: string, email: string, pass: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password: pass })
    });
    return res.json();
  },

  async login(email: string, pass: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    return res.json();
  },

  async getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },

  async getUserData() {
    const res = await fetch(`${API_URL}/user/data`, { headers: getHeaders() });
    return res.json();
  },

  async buy(productId: string) {
    const res = await fetch(`${API_URL}/purchase`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ productId })
    });
    return res.json();
  },

  async saveProgress(topic: string, completed: number, score: number) {
    const res = await fetch(`${API_URL}/progress`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ topic, completed, score })
    });
    return res.json();
  }
};
