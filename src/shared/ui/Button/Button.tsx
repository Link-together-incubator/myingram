import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import s from "./Button.module.scss";

type ButtonType = "default" | "secondary" | "outline" | "link";

type ButtonProps = {
  type: ButtonType;
  asChild?: boolean;
  disabled?: boolean;
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({
  type,
  asChild = false,
  children,
  disabled,
  onClick,
  href,
  ...props
}: ButtonProps) => {
  const isLink = type === "link";

  const className = `${type === "link" ? s.link : `${s.button} ${s[type]}`} ${
    disabled ? s.disabled : ""
  }`;

  const Comp = asChild ? Slot : isLink ? "a" : "button";

  return (
    <Comp
      className={className}
      disabled={!isLink && disabled}
      onClick={disabled ? undefined : onClick}
      href={isLink ? href : undefined}
      {...props}
    >
      {children}
    </Comp>
  );
};
