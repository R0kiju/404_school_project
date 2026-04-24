import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motivation } from '../data/mockData';

const Tests: React.FC = () => {
  const { tasks, solveTask } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'warning' } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const currentTask = tasks[currentIndex];

  const handleCheck = () => {
    if (!answer.trim()) return;

    const val = answer.toLowerCase().trim();
    let ok = false;

    if (currentTask.answers) {
      ok = currentTask.answers.some(a => a.toLowerCase() === val);
    } else if (currentTask.required) {
      ok = currentTask.required.every(r => val.includes(r.toLowerCase()));
    }

    if (ok) {
      setMessage({ text: 'Правильно! Задание пройдено.', type: 'success' });
      solveTask(currentIndex);
    } else {
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
      setMessage({ text: motivation[newAttempts % motivation.length], type: 'warning' });
    }
  };

  const nextTask = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
      setMessage(null);
      setShowHint(false);
      setWrongAttempts(0);
    }
  };

  return (
    <section className="page">
      <div className="section-title"><h2>Система тестирования</h2></div>
      
      <div className="grid-2">
        <div className="task-box card">
          <div className="reader-head">
            <div>
              <h3>{currentTask.title}</h3>
              <p className="badge" style={{ marginTop: 4 }}>Уровень: {currentTask.level}</p>
            </div>
            <span className="badge">{currentIndex + 1} / {tasks.length}</span>
          </div>
          <p style={{ fontSize: 18, marginBottom: 20 }}>{currentTask.text}</p>
          <div className="code-box">{currentTask.example}</div>
          <div className="progress-line">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / tasks.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="editor-box card">
          <h3>Ваш ответ</h3>
          <textarea 
            placeholder="Введите код или текст ответа..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="test-actions">
            <button className="btn-primary" onClick={handleCheck}>Проверить</button>
            <button onClick={() => setShowHint(true)}>Подсказка</button>
            <button onClick={nextTask}>Следующее</button>
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="info-card" style={{ marginTop: 24 }}>
            <p><strong>Подсказка:</strong> {showHint ? currentTask.hint : 'Нажмите кнопку "Подсказка", если возникли трудности.'}</p>
            <p style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              Пройдено: <strong>{tasks.filter(t => t.solved).length}</strong> из {tasks.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tests;
