import * as React from "react";
import TagTable from "@components/tags/TagTable";
import TagWindow from "@components/tags/TagWindow";

function Tags() {
  const [searchText, setSearchText] = React.useState("");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex justify-between mb-2">
        <input
          type="number"
          placeholder="Pesquisar Comanda"
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
        <TagWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <TagTable searchText={searchText} />
    </div>
  );
}

export default Tags;
