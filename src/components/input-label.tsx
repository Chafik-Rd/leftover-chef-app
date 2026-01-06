import { InputLabelProps } from "@/types/share.type";
import { Input } from "./ui/input";

export const InputLable = ({ label, ...props }: InputLabelProps) => {
  return (
    <label>
      <p>{label}</p>
      <Input type="text" {...props} />
    </label>
  );
};
