import React, { useState } from "react";
import SubmenuTable from "@components/submenus/SubmenuTable";
import SubmenuWindow from "@components/submenus/SubmenuWindow";

function Submenus() {
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
          placeholder="Pesquisar Submenu"
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
        <SubmenuWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <SubmenuTable searchText={searchText} />
    </div>
  );
}

export default Submenus;
