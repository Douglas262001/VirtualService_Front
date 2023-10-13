import { ProductFormType } from "@components/products/ProductsWindow";
import { convertBase64 } from "@utils/convert";
import { UploadSimple } from "phosphor-react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

export type GeneralProductPanelType = {
  setBase64Image: React.Dispatch<string>;
  register: UseFormRegister<ProductFormType>;
  imagem: string;
  setImagem: React.Dispatch<React.SetStateAction<string>>;
};

const General = ({
  setBase64Image,
  register,
  imagem,
  setImagem,
}: GeneralProductPanelType) => {
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setImagem(file?.name || "");

    if (!file) return;

    const base64Image = await convertBase64(file);

    setBase64Image(base64Image as string);
  };

  const handleClickAddImage = () => {
    const imageFileInput = document.getElementById(
      "image-file-input"
    ) as HTMLInputElement;

    imageFileInput.click();
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Nome</span>
          <input
            type="text"
            placeholder="Nome do item"
            className="input input-bordered w-full mb-4"
            {...register("nome", {
              shouldUnregister: true,
            })}
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Imagem</span>
          <input
            id="image-file-input"
            onChange={handleUploadImage}
            multiple={false}
            accept="image/png, image/gif, image/jpeg"
            type="file"
            hidden={true}
          />
          <button
            type="button"
            className="btn btn-info"
            onClick={handleClickAddImage}
          >
            Upload
            <UploadSimple size={24} />
          </button>
        </div>
        <div className="w-full flex flex-col">
          <span className="label-text">Nome da imagem</span>
          <input
            className="input input-bordered"
            type="text"
            disabled={true}
            value={imagem}
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <span className="label-text">Descrição</span>
        <textarea
          className="input h-24"
          {...register("descricao", {
            shouldUnregister: true,
          })}
        ></textarea>
      </div>
    </div>
  );
};

export default General;
