import SearchField from "@components/base/SearchField";
import { CategoriaForm } from "@components/categories/CategoryWindow";
import { Tab } from "@headlessui/react";
import { SubMenuType } from "types/SubMenu";

type Props = {
  categoria: CategoriaForm;
  handleChangeCategoria: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDescricao: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  subMenu: SubMenuType;
  setSubMenu: React.Dispatch<SubMenuType>;
  subMenus: SubMenuType[];
};

const CategoryGeneralTab = ({
  categoria,
  handleChangeCategoria,
  handleChangeDescricao,
  subMenu,
  setSubMenu,
  subMenus,
}: Props) => {
  return (
    <Tab.Panel>
      <div className="w-full flex flex-col">
        <div className="w-full flex gap-2">
          <div className="w-full flex flex-col">
            <span className="label-text">Nome</span>
            <input
              type="text"
              placeholder="Nome do item"
              className="input input-bordered w-full mb-4"
              name="nome"
              value={categoria.nome}
              onChange={handleChangeCategoria}
            />
          </div>
          <div className="w-full flex flex-col">
            <span className="label-text">Submenu</span>
            <SearchField
              value={subMenu}
              setValue={setSubMenu}
              data={subMenus}
              valueField="id"
              displayValue="nome"
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <span className="label-text">Descrição</span>
          <textarea
            className="input h-24"
            name="descricao"
            value={categoria.descricao}
            onChange={handleChangeDescricao}
          ></textarea>
        </div>
      </div>
    </Tab.Panel>
  );
};

export default CategoryGeneralTab;
