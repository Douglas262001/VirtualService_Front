import OrderTable from "@components/orders/OrderTable";
import { useState } from "react";

const Orders = () => {
  const [searchText, setSearchText] = useState("");

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex justify-between mb-2">
        <input
          type="text"
          placeholder="Pesquisar Pedidos"
          onInput={searchInputHandler}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <OrderTable searchText={searchText} />
    </div>
  );
};

export default Orders;
