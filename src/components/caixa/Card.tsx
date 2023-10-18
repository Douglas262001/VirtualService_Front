import { useRegister } from "context/register/RegisterContext";
import * as React from "react";
interface CardProps extends React.PropsWithChildren {
  id: number;
}

const Card: React.FC<CardProps> = ({ id , children}) => {
  const {  setCodigoComanda } = useRegister();

  return (
    <div
      className="bg-[#fec80a] border-1 border-[#303030] shadow-[0_4px_6px_rgba(0,0,0,0.1)] cursor-pointer h-16 max-w-[90%] rounded-md transition-transform ease-in-out delay-1000"
      onClick={() => setCodigoComanda(id)}
    >
      <h3 className="text-xl m-0 text-[#303030] font-bold py-5 text-center">
        {children}
      </h3>
    </div>
  );
};

export default Card;
