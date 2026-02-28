import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "ghost" | "fab";
	size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size = "default", ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					"inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
					{
						"bg-primary text-primary-foreground hover:bg-primary/90 shadow-md": variant === "default",
						"border border-gray-300 bg-transparent hover:bg-gray-100": variant === "outline",
						"hover:bg-gray-100 text-primary": variant === "ghost",
						"bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 aspect-square":
							variant === "fab",
						"h-10 px-6 py-2": size === "default",
						"h-8 px-4 text-xs": size === "sm",
						"h-12 px-8 text-base": size === "lg",
						"h-14 w-14": size === "icon", // generally used with fab
					},
					className,
				)}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button };
