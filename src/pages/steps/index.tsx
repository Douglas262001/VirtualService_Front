import StepsTable from "@components/steps/StepTable";
import StepWindow from "@components/steps/StepWindow";
import { useEffect, useState } from "react";

const Steps = () => {
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
          placeholder="Pesquisar Etapa"
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
        <StepWindow
          setIsOpen={setIsAddModalOpen}
          isOpen={isAddModalOpen}
        />
      </div>
      <StepsTable searchText={searchText} reload={reloadTable} />
    </div>
  );
};

export default Steps;
