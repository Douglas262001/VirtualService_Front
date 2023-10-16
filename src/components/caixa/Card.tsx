import React from 'react';
import './Card.modules.css'

interface CardProps {
  title: string;
  id: number;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ title, id, onClick }) => {
  return (
    <div className="cardcomanda" onClick={() => onClick(id)}>
      <h3>{id}</h3>
    </div>
  );
};

export default Card;