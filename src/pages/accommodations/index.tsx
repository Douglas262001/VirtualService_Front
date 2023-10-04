import AccommodationTable from "@components/accommodations/AcommodationTable";
import AccommodationWindow from "@components/accommodations/AcommodationWindow";
import { useEffect, useState } from "react";

const Acommodations = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    setReloadTable(true);
  }, [isAddModalOpen]);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex justify-between mb-2">
        <input
          type="text"
          placeholder="Pesquisar Acomodação"
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
        <AccommodationWindow
          setIsOpen={setIsAddModalOpen}
          isOpen={isAddModalOpen}
        />
      </div>
      <AccommodationTable searchText={searchText} reload={reloadTable} />
    </div>
  );
};

export default Acommodations;
