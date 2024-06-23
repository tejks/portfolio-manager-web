import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FieldWrapper, { WrapperPassThroughProps } from "./FieldWrapper";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, WrapperPassThroughProps {
  register: UseFormRegisterReturn;
  options: string[];
  className?: string;
}

function Select({ options, className = "", labelValue, register, error, ...rest }: SelectProps) {
  return (
    <FieldWrapper labelValue={labelValue} error={error}>
      <select
        className="radius-2xl shadow-input focus:shadow-input-focus/50 h-12 w-full rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-800 placeholder-neutral-400 transition-colors duration-200 ease-in-out focus:border-[#4d3c64]"
        {...register}
        {...rest}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export default Select;
