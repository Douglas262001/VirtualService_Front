import { CircleNotch, X } from "phosphor-react";
import * as React from "react";

type ButtonCancelProps = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  text?: string;
};

const ButtonCancel = ({ isLoading, text, ...props }: ButtonCancelProps) => {
  return (
    <button className="btn btn-error" {...props}>
      {text ?? "Cancelar"}
      {isLoading ? (
        <div className={`animate-spin h-[${20}px] w-[${20}px] m-0`}>
          <CircleNotch size={20} />
        </div>
      ) : (
        <X size={20} className="ml-2" />
      )}
    </button>
  );
};

export default ButtonCancel;
