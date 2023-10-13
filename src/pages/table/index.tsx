import React, { useState } from "react";
import TableTable from "@components/table/TableTable";
import TableWindow from "@components/table/TableWindow";

function Tables() {
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
          placeholder="Pesquisar Mesa"
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
        <TableWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <TableTable searchText={searchText} />
    </div>
  );
}

export default Tables;
