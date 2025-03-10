import * as React from "react";

import { cn } from "@/shared/lib/css";

import s from "./TextArea.module.scss";

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
  disabled?: boolean;
};

export const Textarea: React.FC<TextareaProps> = ({
  className,
  label = "Text-area",
  error,
  disabled,
  ...props
}) => {
  const [isActive, setIsActive] = React.useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className={cn(s.wrapper, { [s.disabled]: disabled })}>
      {label && <label className={s.label}>{label}</label>}
      <textarea
        data-slot="textarea"
        className={cn(s.textarea, className, {
          [s.error]: error,
          [s.disabled]: disabled,
          [s.active]: isActive,
        })}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  );
};
