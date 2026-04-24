export type Role = 'Студент' | 'Администратор';

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
}

export interface Course extends Product {}
export interface Book extends Product {}

export interface TestTask {
  topic: string;
  title: string;
  level: 'базовый' | 'средний' | 'практика';
  text: string;
  example: string;
  answers?: string[];
  required?: string[];
  hint: string;
  solved: boolean;
}

export interface Progress {
  completed: number;
  total: number;
  score: number;
}

export interface UserProgress {
  [key: string]: Progress;
}
