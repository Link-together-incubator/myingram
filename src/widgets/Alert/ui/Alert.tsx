"use client";

import clsx from "clsx";
import { X } from "lucide-react";

import cls from "./Alert.module.scss";

export type AlertType = "error" | "success" | "classic";

type AlertProps = {
  type: AlertType;
  text: string;
  cancelCallback: () => void;
};

export const Alert = ({ type, text, cancelCallback }: AlertProps) => {
  return (
    // Размонтирую с помощью key, чтобы заново сработала анимация
    <div key={text} className={clsx(cls.alert, cls[type])}>
      <span className={cls.alertMessage}>{text}</span>
      <X className={cls.btn} onClick={cancelCallback} />
    </div>
  );
};
