import React from 'react';

interface ReaderProps {
  title: string;
  currentPage: number;
  totalPages: number;
  content: string | React.ReactNode;
  onPageChange: (delta: number) => void;
  isPreview: boolean;
  meta: string;
}

const Reader: React.FC<ReaderProps> = ({ title, currentPage, totalPages, content, onPageChange, isPreview, meta }) => {
  return (
    <div className="reader-box card">
      <div className="reader-head">
        <div>
          <h3>{title}</h3>
          <p className="badge" style={{ marginTop: 4 }}>{meta}</p>
        </div>
        <div className="pager">
          {!isPreview && (
            <>
              <button onClick={() => onPageChange(-1)} disabled={currentPage === 0}>Назад</button>
              <span className="badge">{currentPage + 1} / {totalPages}</span>
              <button onClick={() => onPageChange(1)} disabled={currentPage === totalPages - 1}>Вперед</button>
            </>
          )}
          {isPreview && <span className="badge">Предпросмотр</span>}
        </div>
      </div>
      <div className="reader-content">
        {typeof content === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default Reader;
