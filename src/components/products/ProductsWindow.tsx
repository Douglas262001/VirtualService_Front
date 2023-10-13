import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericTable from "@components/base/GenericTable";
import GenericWindow from "@components/base/GenericWindow";
import { TrashSimple } from "phosphor-react";
import React from "react";
import * as yup from "yup";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductsTab } from "./productstab";
import { Tab } from "@headlessui/react";

interface IProductsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  codigoProduto?: number;
  setCodigoProduto?: React.Dispatch<number>;
}

export type ProductFormType = {
  id?: number;
  nome: string;
  descricao?: string;
};

const formSchema = yup.object({
  nome: yup.string().required("Você precisa informar o campo nome"),
});

const ProductsWindow = ({
  isOpen,
  setIsOpen,
  codigoProduto,
  setCodigoProduto,
}: IProductsProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: import.meta.env.DEV
      ? {
          nome: "",
        }
      : {},
  });

  const [base64Image, setBase64Image] = React.useState<string>("");
  const [imagem, setImagem] = React.useState<string>("");

  const onSubmit: SubmitHandler<ProductFormType> = async (data) => {
    if (data.id) {
      //editar
      return;
    }

    //cadastrar
  };

  const handleClickCancelar = () => {
    setIsOpen(false);
  };

  return (
    <GenericWindow isOpen={isOpen} setIsOpen={setIsOpen} title="Produtos">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="w-full h-full flex flex-col">
            <ProductsTab.Root>
              <Tab.Panel>
                <ProductsTab.General
                  register={register}
                  setBase64Image={setBase64Image}
                  imagem={imagem}
                  setImagem={setImagem}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ProductsTab.Steps />
              </Tab.Panel>
            </ProductsTab.Root>
          </div>
          <div className="modal-action">
            <ButtonCancel type="button" onClick={handleClickCancelar} />
            <ButtonSave type="submit" />
          </div>
        </div>
      </form>
    </GenericWindow>
  );
};

export default ProductsWindow;
