import ProductsTable from "@components/products/ProductsTable";
import ProductsWindow from "@components/products/ProductsWindow";
import { useState } from "react";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex justify-between mb-2">
        <input
          type="text"
          placeholder="Pesquisar Produto"
          onInput={searchInputHandler}
          className="input input-bordered w-full max-w-xs"
        />
        <label
          htmlFor="my-modal-subject"
          onClick={() => setIsAddModalOpen(true)}
          className="btn modal-button btn-secondary"
        >
          Adicionar
        </label>
        <input type="checkbox" id="my-modal-subject" className="modal-toggle" />
        <ProductsWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <ProductsTable searchText={searchText} />
    </div>
  );
};

export default Products;
