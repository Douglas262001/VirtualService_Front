import * as React from "react";
import MenuTable from "@components/menu/MenuTable";
import MenuWindow from "@components/menu/MenuWindow";

function Menus() {
  const [searchText, setSearchText] = React.useState("");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex justify-between mb-2">
        <input
          type="string"
          placeholder="Pesquisar Menu"
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
        <MenuWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <MenuTable searchText={searchText} />
    </div>
  );
}

export default Menus;
