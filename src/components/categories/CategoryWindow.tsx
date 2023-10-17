import GenericWindow from "@components/base/GenericWindow";
import { CategoryTab } from "./categoriestab";
import * as React from "react";
import api from "@utils/api";
import { toast } from "sonner";
import { ProdutoSearchType } from "types/Produto";
import { CategoriaItemSearchType, CategoriaType } from "types/Categoria";
import { SubMenuType } from "types/SubMenu";
import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  codigoCategoria?: number;
  setCodigoCategoria?: React.Dispatch<number>;
};

export type CategoriaForm = {
  nome: string;
  descricao: string;
};

const CategoryWindow = ({
  isOpen,
  setIsOpen,
  codigoCategoria,
  setCodigoCategoria,
}: Props) => {
  React.useEffect(() => {
    if (!isOpen) return;

    listarProdutosServicos();

    if (codigoCategoria) return;

    buscarSubMenus();
  }, [isOpen]);

  React.useEffect(() => {
    if (!codigoCategoria) return;
    buscarCategoriaPorId();
  }, [codigoCategoria]);

  const [categoriaForm, setCategoriaForm] = React.useState<CategoriaForm>({
    nome: "",
    descricao: "",
  });

  const [base64Image, setBase64Image] = React.useState<string>("");
  const [isImgUploaded, setIsImgUploaded] = React.useState<boolean>(false);
  const [produtos, setProdutos] = React.useState<ProdutoSearchType[]>([]);
  const [produto, setProduto] = React.useState<ProdutoSearchType>({
    id: 0,
    nome: "",
  });
  const [itensSelecionados, setItensSelecionados] = React.useState<
    CategoriaItemSearchType[]
  >([]);
  const [subMenu, setSubMenu] = React.useState<SubMenuType>({
    id: 0,
    nome: "",
  });
  const [subMenus, setSubMenus] = React.useState<SubMenuType[]>([]);

  const buscarCategoriaPorId = async () => {
    try {
      const response = await api.get(
        `SubMenu_Categoria/Buscar/${codigoCategoria}`
      );

      const categoria: CategoriaType = response.data.body;

      setCategoriaForm({
        nome: categoria.nome,
        descricao: categoria.descricao || "",
      });

      setSubMenuPeloCodigo(categoria.codigoSubMenu);

      if (categoria.urlImagem) {
        setBase64Image(categoria.urlImagem);
      }

      if (categoria.items.length) {
        setItensSelecionados(
          categoria.items.map((i) => ({
            id: i.id,
            codigoProduto: i.codigoProdutoServico,
            codigoSubMenuCategoria: i.codigoSubMenuCategoria,
            nome: i.produtoServico ? i.produtoServico.nome : "",
          }))
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const listarProdutosServicos = async () => {
    try {
      const response = await api.get("ProdutoServico/ListarProdutosServicos");

      setProdutos(
        response.data.body.map((p: ProdutoSearchType) => ({
          id: p.id,
          nome: p.nome,
        }))
      );
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const buscarSubMenus = async () => {
    try {
      const response = await api.get("SubMenu/Listar");

      setSubMenus(response.data.body);
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const setSubMenuPeloCodigo = async (codigoSubMenu: number) => {
    try {
      const response = await api.get("SubMenu/Listar");

      setSubMenus(response.data.body);

      const subMenu = response.data.body.find((s: SubMenuType) => {
        return s.id === codigoSubMenu;
      });

      if (!subMenu) return;

      setSubMenu(subMenu);
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const mutationCreate = useMutation(
    (s: CategoriaType) => api.post(`SubMenu_Categoria/Inserir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getCategories"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Categoria cadastrada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutationUpdate = useMutation(
    (s: CategoriaType) => api.put(`SubMenu_Categoria/Alterar`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getCategories"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Categoria alterada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const handleChangeCategoria = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.name;

    setCategoriaForm({
      ...categoriaForm,
      [name]: e.target.value,
    });
  };

  const handleChangeDescricao = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCategoriaForm({
      ...categoriaForm,
      descricao: e.target.value,
    });
  };

  const handleClickCancelar = () => {
    setIsOpen(false);
    limparCampos();
  };

  const limparCampos = () => {
    setCategoriaForm({
      nome: "",
      descricao: "",
    });
    setBase64Image("");
    setItensSelecionados([]);
    setProduto({ id: 0, nome: "" });
    setSubMenu({ id: 0, nome: "" });
    setCodigoCategoria && setCodigoCategoria(0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categoria: CategoriaType = {
      id: codigoCategoria || 0,
      ...categoriaForm,
      base64Imagem: isImgUploaded ? base64Image : "",
      codigoSubMenu: subMenu.id || 0,
      items: itensSelecionados.map((p) => ({
        id: p.id,
        codigoProdutoServico: p.codigoProduto,
        codigoSubMenuCategoria: p.codigoSubMenuCategoria,
        nome: p.nome,
      })),
    };

    if (codigoCategoria) return mutationUpdate.mutate(categoria);

    mutationCreate.mutate(categoria);
  };

  return (
    <GenericWindow title="Categoria" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <CategoryTab.Root>
            <CategoryTab.General
              categoria={categoriaForm}
              handleChangeCategoria={handleChangeCategoria}
              handleChangeDescricao={handleChangeDescricao}
              subMenu={subMenu}
              setSubMenu={setSubMenu}
              subMenus={subMenus}
            />
            <CategoryTab.Items
              produto={produto}
              setProduto={setProduto}
              produtos={produtos}
              itensSelecionados={itensSelecionados}
              setItensSelecionados={setItensSelecionados}
              isTipoProdutoProduto={true}
            />
            <CategoryTab.Image
              base64Image={base64Image}
              setBase64Image={setBase64Image}
              setIsImgUploaded={setIsImgUploaded}
            />
          </CategoryTab.Root>
          <div className="modal-action">
            <ButtonCancel type="button" onClick={handleClickCancelar} />
            <ButtonSave type="submit" />
          </div>
        </div>
      </form>
    </GenericWindow>
  );
};

export default CategoryWindow;
