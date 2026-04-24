import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  type: 'course' | 'book';
  isBought: boolean;
  onPreview: (id: string) => void;
  onOpen: (id: string) => void;
  onBuy: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, type, isBought, onPreview, onOpen, onBuy }) => {
  return (
    <div className={`${type}-item card`}>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      {isBought ? (
        <span className="bought-badge">Куплено</span>
      ) : (
        <span className="price-badge">{product.price}</span>
      )}
      <div className="actions" style={{ marginTop: 16 }}>
        <button onClick={() => onPreview(product.id)}>Предпросмотр</button>
        {isBought ? (
          <button className="btn-primary" onClick={() => onOpen(product.id)}>Открыть</button>
        ) : (
          <button className="btn-primary" onClick={() => onBuy(product.id)}>Купить</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
