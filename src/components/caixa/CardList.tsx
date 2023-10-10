import React from 'react';
import Card from './Card';

interface CardData {
  id: number;
  title: string;
}

interface CardListProps {
  data: CardData[];
  onCardClick: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ data, onCardClick }) => {
  return (
    <div className="cardcomanda-list">
      {data.map((item) => (
        <Card key={item.id} title={item.title} id={item.id} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardList;