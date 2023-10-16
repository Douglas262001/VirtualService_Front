import React from 'react';

interface CardProps {
  title: string;
  id: number;
  onClick: (id: number) => void;
}

const Comanda: React.FC<CardProps> = ({ title, id, onClick }) => {
  return (
    <div className="cardcomanda" onClick={() => onClick(id)}>
      <h3>{title}</h3>
    </div>
  );
};

export default Comanda;