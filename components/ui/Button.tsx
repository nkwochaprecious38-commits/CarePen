import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#1769E8] text-white hover:bg-[#1257c8] shadow-sm": variant === "primary",
            "bg-transparent text-[#1769E8] border border-[#1769E8] hover:bg-blue-50": variant === "secondary",
            "bg-transparent text-[#202B3A] hover:bg-[#F4F7FA]": variant === "ghost",
            "bg-transparent text-white border border-white/30 hover:bg-white/10": variant === "outline",
            "text-sm px-4 py-2": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-7 py-3.5": size === "lg",
          },
          className
        )}
        style={{ fontFamily: "var(--font-manrope)" }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
