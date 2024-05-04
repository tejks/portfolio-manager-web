import { UseFormRegisterReturn } from "react-hook-form";
import FieldWrapper, { WrapperPassThroughProps } from "./FieldWrapper";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    WrapperPassThroughProps {
  register: UseFormRegisterReturn;
  type?: "text" | "number" | "email" | "password";
  className?: string;
}

function Input({
  type = "text",
  className = "",
  labelValue,
  register,
  error,
  ...rest
}: InputProps) {
  return (
    <FieldWrapper labelValue={labelValue} error={error}>
      <input
        type={type}
        className="radius-2xl border border-neutral-300 focus:border-[#4d3c64] h-12 w-full px-4 py-2 text-sm font-medium text-neutral-800 placeholder-neutral-400 bg-neutral-100 rounded-lg duration-200 ease-in-out transition-colors shadow-input focus:shadow-input-focus/50"
        {...register}
        {...rest}
      />
    </FieldWrapper>
  );
}

export default Input;
