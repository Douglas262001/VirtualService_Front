import { useEffect, useState } from "react";
import "./index.modules.css";

const Menus = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    setReloadTable(true);
  }, [isAddModalOpen]);

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
        <div className="header-options">
          <p className="text-2xl ...">Menus</p>
        </div>
        <label
          htmlFor="my-modal-student"
          className="btn modal-button btn-secondary buttons-menu-menu"
          onClick={() => setIsAddModalOpen(true)}
        >
          Menu
        </label>
        <label
          htmlFor="my-modal-student"
          className="btn modal-button btn-secondary buttons-menu-menu"
          onClick={() => setIsAddModalOpen(true)}
        >
          Categorias
        </label>
        <label
          htmlFor="my-modal-student"
          className="btn modal-button btn-secondary buttons-menu-menu"
          onClick={() => setIsAddModalOpen(true)}
        >
          Itens
        </label>
        <label
          htmlFor="my-modal-student"
          className="btn modal-button btn-secondary buttons-menu-menu"
          onClick={() => setIsAddModalOpen(true)}
        >
          Etapas
        </label>
    </div>
  );
};

export default Menus;
