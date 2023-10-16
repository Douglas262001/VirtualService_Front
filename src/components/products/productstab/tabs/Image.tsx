import { convertBase64 } from "@utils/convert";
import { UploadSimple } from "phosphor-react";
import * as React from "react";

export type ImageProductPanelType = {
  setBase64Image: React.Dispatch<string>;
  base64Image: string;
  isTipoProdutoProduto: boolean;
  setIsImgUploaded: React.Dispatch<boolean>;
  codigoProduto?: number;
};

const ImageTab = ({
  setBase64Image,
  base64Image,
  isTipoProdutoProduto,
  setIsImgUploaded,
  codigoProduto,
}: ImageProductPanelType) => {
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    const base64Image = await convertBase64(file);

    setBase64Image(base64Image as string);

    setIsImgUploaded(true);
  };

  const handleClickAddImage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const imageFileInput = document.getElementById(
      "image-file-input"
    ) as HTMLInputElement;

    imageFileInput.click();
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <input
        id="image-file-input"
        onChange={handleUploadImage}
        multiple={false}
        accept="image/png, image/gif, image/jpeg"
        type="file"
        hidden={true}
      />
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <button
            type="button"
            className="btn btn-info"
            onClick={handleClickAddImage}
            disabled={!isTipoProdutoProduto || !!codigoProduto}
          >
            Upload
            <UploadSimple size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col rounded-md border-2">
        <img className="h-48 w-48 rounded-md" src={base64Image} />
      </div>
    </div>
  );
};

export default ImageTab;
