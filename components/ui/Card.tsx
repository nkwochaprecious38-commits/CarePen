import { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export default function Card({ hover = false, padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl border border-gray-100 card-shadow",
        {
          "card-shadow-hover cursor-pointer": hover,
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
