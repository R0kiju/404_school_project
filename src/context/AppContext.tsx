import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProgress, TestTask, Course, Book } from '../types';
import { tasks as initialTasks } from '../data/mockData';
import { api } from '../api';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  purchases: string[];
  buyItem: (type: 'course' | 'book', id: string) => Promise<void>;
  progress: UserProgress;
  tasks: TestTask[];
  solveTask: (index: number) => Promise<void>;
  logout: () => void;
  loading: boolean;
  courses: Course[];
  books: Book[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [purchases, setPurchases] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress>({});
  const [tasks, setTasks] = useState<TestTask[]>(initialTasks);
  const [courses, setCourses] = useState<Course[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const allProducts = await api.getProducts();
      setCourses(allProducts.filter((p: any) => p.type === 'course'));
      setBooks(allProducts.filter((p: any) => p.type === 'book'));

      const token = localStorage.getItem('school404Token');
      const savedUser = localStorage.getItem('school404User');
      
      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
        const userData = await api.getUserData();
        setPurchases(userData.purchases || []);
        setProgress(userData.progress || {});
      }
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const buyItem = async (type: 'course' | 'book', id: string) => {
    if (!user) return;
    const key = `${type}:${id}`;
    if (!purchases.includes(key)) {
      const res = await api.buy(key);
      if (res.success) {
        setPurchases([...purchases, key]);
      }
    }
  };

  const solveTask = async (index: number) => {
    const newTasks = [...tasks];
    if (!newTasks[index].solved) {
      newTasks[index].solved = true;
      setTasks(newTasks);
      
      const topic = newTasks[index].topic;
      const currentProgress = progress[topic] || { completed: 0, total: 33, score: 0 };
      
      const updatedProgress = {
        ...currentProgress,
        completed: currentProgress.completed + 1,
        score: Math.min(100, Math.round(((currentProgress.completed + 1) / currentProgress.total) * 100))
      };

      if (user) {
        await api.saveProgress(topic, updatedProgress.completed, updatedProgress.score);
      }
      
      setProgress({ ...progress, [topic]: updatedProgress });
    }
  };

  const logout = () => {
    setUser(null);
    setPurchases([]);
    setProgress({});
    localStorage.removeItem('school404Token');
    localStorage.removeItem('school404User');
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, purchases, buyItem, progress, tasks, solveTask, logout, loading, courses, books 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
