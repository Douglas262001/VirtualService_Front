import * as React from "react";
import Card from "./Card";
import { ComandasAbertas } from "types/Caixa";
interface CardListProps {
  data?: ComandasAbertas[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 justify-center px-8 ">
      {data?.map((item) => (
        <Card key={item.id} id={item.id}>
          {item.numero}
        </Card>
      ))}
    </div>
  );
};

export default CardList;
