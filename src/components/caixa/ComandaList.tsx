import { useRegister } from "context/register/RegisterContext";
import CardList from "./CardList";
import * as React from "react";
import { ComandasAbertas } from "types/Caixa";

const ComandaList: React.FC = () => {
  // const { codigoComanda } = useRegister();

  const [data, setData] = React.useState<ComandasAbertas[] | undefined>();

  return (
    <div>
      <CardList data={data} />
    </div>
  );
};

export default ComandaList;
