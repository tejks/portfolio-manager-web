import { cn } from "@/common/utils/cn";
import { useNavigate } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    type?: "button" | "submit";
    to?: string;
    className?: string;
}

function Button({ children, onClick, type = "button", className = "", to, ...rest }: ButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            type={type}
            className={cn(
                "duration-400 inline-block transform rounded-lg bg-[#4d3c64] px-7 py-2 font-semibold text-neutral-200 shadow-2xl transition hover:-translate-y-0.5 hover:shadow-sky-300/50",
                className,
            )}
            onClick={to ? () => navigate(to) : onClick}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
