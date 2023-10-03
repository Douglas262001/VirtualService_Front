import React, { useEffect, useState } from "react";
import SubjectWindow from "@components/subject/SubjectWindow";
import SubjectTable from "@components/subject/SubjectTable";

function Subject() {
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
          placeholder="Pesquisar Disciplina"
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
        <SubjectWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <SubjectTable searchText={searchText} reload={reloadTable} />
    </div>
  );
}

export default Subject;
