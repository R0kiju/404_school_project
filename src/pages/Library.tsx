import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Reader from '../components/Reader';

const Library: React.FC = () => {
  const { purchases, buyItem, books, loading } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.description.toLowerCase().includes(search.toLowerCase())
  );

  const selectedProduct = books.find(p => p.id === selectedId);
  const hasAccess = selectedId ? purchases.includes(`book:${selectedId}`) : false;

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
      <h4>{title} — глава {p + 1}</h4>
      <p>Материал из библиотеки 404 School. Книга охватывает теоретические основы и практические советы от экспертов.</p>
      <p>Данные загружены из SQLite.</p>
    </div>
  );

  if (loading) return <div className="page">Загрузка библиотеки...</div>;

  return (
    <section className="page">
      <div className="section-title"><h2>Библиотека знаний</h2></div>
      
      <div className="info-card" style={{ marginBottom: 24 }}>
        <h3>Поиск в библиотеке</h3>
        <input 
          placeholder="Начните вводить название книги или тему..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 0, marginTop: 12 }}
        />
      </div>

      <div className="grid-3">
        {filteredBooks.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            type="book"
            isBought={purchases.includes(`book:${p.id}`)}
            onPreview={handlePreview}
            onOpen={handleOpen}
            onBuy={(id) => buyItem('book', id)}
          />
        ))}
      </div>

      {selectedProduct && (
        <Reader
          title={selectedProduct.title}
          currentPage={page}
          totalPages={25}
          isPreview={isPreview}
          meta={isPreview ? 'Предпросмотр' : 'Чтение книги'}
          onPageChange={(d) => setPage(prev => prev + d)}
          content={isPreview && !hasAccess ? (
            <div className="locked-box">
              <p>Эта книга доступна полностью после приобретения.</p>
              <button className="btn-primary" onClick={() => buyItem('book', selectedProduct.id)}>
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

export default Library;
