import "./index.modules.css";

const Menus = () => {
  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="header-options">
        <p className="text-2xl ...">Menus</p>
      </div>
      <label
        htmlFor="my-modal-student"
        className="btn modal-button btn-secondary buttons-menu-menu"
      >
        Menu
      </label>
      <label
        htmlFor="my-modal-student"
        className="btn modal-button btn-secondary buttons-menu-menu"
      >
        Categorias
      </label>
      <label
        htmlFor="my-modal-student"
        className="btn modal-button btn-secondary buttons-menu-menu"
      >
        Itens
      </label>
      <label
        htmlFor="my-modal-student"
        className="btn modal-button btn-secondary buttons-menu-menu"
      >
        Etapas
      </label>
    </div>
  );
};

export default Menus;
