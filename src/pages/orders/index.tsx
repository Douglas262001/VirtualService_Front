import OrderTable from "@components/orders/OrderTable";
import { useState } from "react";

const Orders = () => {
  const dataAtual = new Date();

  const [searchText, setSearchText] = useState("");
  const [dataInicial, setDataInicial] = useState(
    `${dataAtual.getFullYear()}-${
      dataAtual.getMonth() + 1
    }-${dataAtual.getDate()}`
  );
  const [dataFinal, setDataFinal] = useState(
    `${dataAtual.getFullYear()}-${
      dataAtual.getMonth() + 1
    }-${dataAtual.getDate()}`
  );
  const [mostrarApenasAtivos, setMostrarApenasAtivos] = useState(false);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex mb-2">
        <input
          type="text"
          placeholder="Pesquisar Pedidos"
          onInput={searchInputHandler}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex items-center gap-2">
          <input
            type="date"
            placeholder="Pesquisar Pedidos"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            className="input input-bordered w-full max-w-xs ml-2"
          />{" "}
          até
          <input
            type="date"
            placeholder="Pesquisar Pedidos"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            className="input input-bordered w-full max-w-xs ml-2"
          />
        </div>
      </div>
      <div className="flex mb-2">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={mostrarApenasAtivos}
          onChange={(e) => setMostrarApenasAtivos(e.target.checked)}
        />
        <label className="ml-2">Mostrar apenas pedidos ativos</label>
      </div>
      <OrderTable
        pedidosAtivos={mostrarApenasAtivos}
        dataInicial={dataInicial}
        dataFinal={dataFinal}
        searchText={searchText}
      />
    </div>
  );
};

export default Orders;
