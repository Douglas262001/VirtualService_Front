import { useState, ChangeEvent } from "react";
import CategoryTable from "@components/categories/CategoryTable";
import CategoryWindow from "@components/categories/CategoryWindow";

function Categories() {
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex justify-between mb-2">
        <input
          type="text"
          placeholder="Pesquisar Categoria"
          onInput={searchInputHandler}
          className="input input-bordered w-full max-w-xs"
        />
        <label
          htmlFor="my-modal-table"
          onClick={() => setIsAddModalOpen(true)}
          className="btn modal-button btn-secondary"
        >
          Adicionar
        </label>
        <input type="checkbox" id="my-modal-table" className="modal-toggle" />
        <CategoryWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <CategoryTable searchText={searchText} />
    </div>
  );
}

export default Categories;
