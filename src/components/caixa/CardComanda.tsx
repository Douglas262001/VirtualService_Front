import { useRegister } from "context/register/RegisterContext";
import * as React from "react";
interface CardProps {
  id: number;
  numero: number;
  codigoTag: number;
}

const CardComanda: React.FC<CardProps> = ({ id, numero, codigoTag }) => {
  const {
    setCodigoComanda,
    setNumeroComanda,
    setCodigoTag,
    codigoComanda,
    setClicouComanda,
  } = useRegister();
  const classname =
    codigoComanda === id
      ? "bg-yellow-200 border-1 border-[#303030] shadow-[0_4px_6px_rgba(0,0,0,0.1)] cursor-pointer h-16 max-w-[90%] rounded-md transition-transform ease-in-out delay-1000"
      : "bg-yellow-400 border-1 border-[#303030] shadow-[0_4px_6px_rgba(0,0,0,0.1)] cursor-pointer h-16 max-w-[90%] rounded-md transition-transform ease-in-out delay-1000";

  return (
    <div
      id={`comanda-${id}`}
      className={classname}
      onClick={() => {
        setCodigoComanda(id);
        setNumeroComanda(numero);
        setCodigoTag(codigoTag);
        setClicouComanda(true);
      }}
    >
      <h3 className="text-xl m-0 text-[#303030] font-bold py-5 text-center">
        Nº {numero}
      </h3>
    </div>
  );
};

export default CardComanda;
