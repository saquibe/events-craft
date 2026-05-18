import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { color, shadow, rounded } from "@/lib/type";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center px-4 md:px-6 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 active:scale-[0.98] outline-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
  {
    variants: {
      color: {
        default:
          "bg-default text-default-foreground hover:bg-default/80 dark:disabled:bg-default-500",

        primary:
          "bg-primary text-primary-foreground border border-transparent shadow-sm hover:bg-primary-dark hover:shadow-md transition-all duration-300 ease-in-out",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 border border-transparent",

        warning:
          "bg-warning text-warning-foreground hover:bg-warning/80 border border-transparent",

        info: "bg-info text-info-foreground hover:bg-info/80 border border-transparent",

        success:
          "bg-success text-success-foreground hover:bg-success/80 border border-transparent",
      },

      variant: {
        default: "",

        outline:
          "border border-default text-default bg-transparent hover:bg-default/10 hover:text-default",

        soft: "text-default bg-default/10 hover:bg-default/20 hover:text-default-foreground",

        ghost:
          "text-default bg-transparent hover:bg-default/10 hover:text-default-foreground",

        shadow: "shadow-md",
      },

      shadow: {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },

      rounded: {
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },

      fullWidth: {
        true: "w-full",
      },

      size: {
        default: "h-11 md:px-6 px-4",
        sm: "h-7 text-xs md:px-4 px-3",
        md: "h-9",
        lg: "h-12 px-8 text-base md:px-10 px-7",
        icon: "h-10 w-10 p-0 md:px-0 flex justify-center items-center",
      },
    },

    compoundVariants: [
      {
        variant: "outline",
        color: "primary",
        className:
          "border-primary text-primary bg-transparent hover:bg-primary-dark/10 hover:text-primary-dark hover:border-primary-dark",
      },

      {
        variant: "outline",
        color: "secondary",
        className:
          "border-secondary text-secondary bg-transparent hover:bg-secondary/10 hover:text-secondary",
      },

      {
        variant: "outline",
        color: "success",
        className:
          "text-success border-success hover:bg-success/10 hover:text-success",
      },

      {
        variant: "outline",
        color: "info",
        className: "text-info border-info hover:bg-info/10 hover:text-info",
      },

      {
        variant: "outline",
        color: "warning",
        className:
          "text-warning border-warning hover:bg-warning/10 hover:text-warning",
      },

      {
        variant: "outline",
        color: "destructive",
        className:
          "text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive",
      },

      {
        variant: "soft",
        color: "primary",
        className:
          "text-primary bg-primary/10 hover:bg-primary-dark/20 hover:text-primary-dark",
      },

      {
        variant: "soft",
        color: "secondary",
        className:
          "bg-secondary/10 hover:bg-secondary/20 hover:text-secondary-foreground",
      },

      {
        variant: "soft",
        color: "success",
        className:
          "text-success bg-success/10 hover:bg-success/20 hover:text-success",
      },

      {
        variant: "soft",
        color: "info",
        className: "text-info bg-info/10 hover:bg-info/20 hover:text-info",
      },

      {
        variant: "soft",
        color: "warning",
        className:
          "text-warning bg-warning/10 hover:bg-warning/20 hover:text-warning",
      },

      {
        variant: "soft",
        color: "destructive",
        className:
          "text-destructive bg-destructive/10 hover:bg-destructive/20 hover:text-destructive",
      },

      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary hover:bg-primary-dark/10 hover:text-primary-dark",
      },

      {
        variant: "ghost",
        color: "secondary",
        className: "text-secondary hover:bg-secondary/10 hover:text-secondary",
      },

      {
        variant: "ghost",
        color: "success",
        className: "text-success hover:bg-success/10 hover:text-success",
      },

      {
        variant: "ghost",
        color: "info",
        className: "text-info hover:bg-info/10 hover:text-info",
      },

      {
        variant: "ghost",
        color: "warning",
        className: "text-warning hover:bg-warning/10 hover:text-warning",
      },

      {
        variant: "ghost",
        color: "destructive",
        className:
          "text-destructive hover:bg-destructive/10 hover:text-destructive",
      },
    ],

    defaultVariants: {
      variant: "default",
      color: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: color;
  shadow?: shadow;
  rounded?: rounded;
  fullWidth?: boolean;
  size?: "default" | "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      fullWidth,
      shadow,
      rounded,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            rounded,
            color,
            shadow,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
