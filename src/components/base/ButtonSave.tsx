import { CircleNotch, FloppyDisk } from "phosphor-react";
import * as React from "react";

type ButtonSaveProps = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  text?: string;
};

const ButtonSave = ({ isLoading, text, ...props }: ButtonSaveProps) => {
  return (
    <button className="btn btn-success" {...props}>
      {text ?? "Salvar"}
      {isLoading ? (
        <div className={`animate-spin h-[${20}px] w-[${20}px] m-0`}>
          <CircleNotch size={20} />
        </div>
      ) : (
        <FloppyDisk size={20} className="ml-2" />
      )}
    </button>
  );
};

export default ButtonSave;
