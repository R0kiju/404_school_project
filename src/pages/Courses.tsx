import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Reader from '../components/Reader';

const Courses: React.FC = () => {
  const { purchases, buyItem, courses, loading } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  const selectedProduct = courses.find(p => p.id === selectedId);
  const hasAccess = selectedId ? purchases.includes(`course:${selectedId}`) : false;

  const handlePreview = (id: string) => {
    setSelectedId(id);
    setPage(0);
    setIsPreview(true);
  };

  const handleOpen = (id: string) => {
    setSelectedId(id);
    setPage(0);
    setIsPreview(false);
  };

  const generateContent = (title: string, p: number) => (
    <div>
      <h4>{title} — урок {p + 1}</h4>
      <p>Профессиональный контент по программированию. В этом уроке мы разберем ключевые аспекты темы и перейдем к практике.</p>
      {(p + 1) % 3 === 0 && (
        <div className="code-box">
          {`// Пример кода из базы данных\nfunction init() {\n  console.log("Урок загружен");\n}`}
        </div>
      )}
    </div>
  );

  if (loading) return <div className="page">Загрузка курсов...</div>;

  return (
    <section className="page">
      <div className="section-title"><h2>Каталог курсов</h2></div>
      <div className="grid-3">
        {courses.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            type="course"
            isBought={purchases.includes(`course:${p.id}`)}
            onPreview={handlePreview}
            onOpen={handleOpen}
            onBuy={(id) => buyItem('course', id)}
          />
        ))}
      </div>

      {selectedProduct && (
        <Reader
          title={selectedProduct.title}
          currentPage={page}
          totalPages={30}
          isPreview={isPreview}
          meta={isPreview ? 'Ознакомительный режим' : 'Полный доступ'}
          onPageChange={(d) => setPage(prev => prev + d)}
          content={isPreview && !hasAccess ? (
            <div className="locked-box">
              <p>Для доступа к полному курсу необходимо его приобрести.</p>
              <button className="btn-primary" onClick={() => buyItem('course', selectedProduct.id)}>
                Купить за {selectedProduct.price}
              </button>
            </div>
          ) : (
            generateContent(selectedProduct.title, page)
          )}
        />
      )}
    </section>
  );
};

export default Courses;
