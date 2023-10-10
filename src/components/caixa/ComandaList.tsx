import React from 'react';
import CardList from './CardList';

const IndexCards: React.FC = () => {
  const data = [
    { id: 1, title: 'comanda 1' },
    { id: 2, title: 'comanda 2' },
    { id: 3, title: 'comanda 3' },
    { id: 4, title: 'comanda 4' },
    { id: 5, title: 'comanda 5' },
    { id: 6, title: 'comanda 6' },
    { id: 7, title: 'comanda 7' },
    { id: 8, title: 'comanda 8' },
    { id: 9, title: 'comanda 9' },
    { id: 10, title: 'comanda 10' },
    { id: 11, title: 'comanda 11' },
    { id: 12, title: 'comanda 12' },
  ];

  const handleCardClick = (id: number) => {
    console.log(`${id}`);
    // Implemente o comportamento desejado ao clicar no card.
  };

  return (
    <div className="IndexCards">
      <h1></h1>
      <CardList data={data} onCardClick={handleCardClick} />
    </div>
  );
};

export default IndexCards;