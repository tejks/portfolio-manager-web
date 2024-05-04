import { cn } from "@/common/utils/cn";
import { FieldError } from "react-hook-form";

interface WrapperProps {
  children: React.ReactNode;
  labelValue?: string;
  className?: string;
  error?: FieldError | undefined;
}

function FieldWrapper({
  labelValue,
  className,
  error,
  children,
}: WrapperProps) {
  return (
    <div>
      <label
        className={cn(
          "ml-1 text-sm font-medium text-neutral-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
      >
        {labelValue}
      </label>

      {children}

      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="ml-1 absolute mt-1 text-xs font-normal text-red-600"
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

export type WrapperPassThroughProps = Omit<
  WrapperProps,
  "className" | "children"
>;
export default FieldWrapper;
