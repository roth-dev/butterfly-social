import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Slot } from "expo-router";
import { IconSymbol, IconSymbolProps } from "./IconSymbol";
import { Text, TextProps } from "./text";

const buttonVariants = cva(
  "flex-row inline-flex bg-white dark:bg-neutral-950 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-primary-foreground web:shadow-sm hover:bg-blue-400",
        destructive:
          "bg-destructive text-destructive-foreground web:shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background web:shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-neutral-200 text-secondary-foreground web:shadow-sm hover:bg-secondary/80 dark:border dark:border-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 web:py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : TouchableOpacity;

  return (
    <TouchableOpacity
      // ref={ref}
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    />
  );
};

Button.Text = function (props: React.PropsWithChildren<TextProps>) {
  return <Text {...props} />;
};

Button.Icon = function (props: React.PropsWithChildren<IconSymbolProps>) {
  return <IconSymbol {...props} />;
};

Button.displayName = "Button";

export { Button, buttonVariants };
