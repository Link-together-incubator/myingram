"use client";

import { ReactNode, useEffect } from "react";

import { Alert, AlertType } from "@/widgets/Alert";

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const message = {
    text: "Your settings are saved",
    type: "success" as AlertType,
  }; // useSelector достаю из стейта состояние message

  const closeAlertCallback = () => {
    // dispatch({text: null, type: "classic"})
    console.log("clicked");
  };

  useEffect(() => {
    if (message.text === null) return;

    const timeoutId = setTimeout(closeAlertCallback, 3000);

    return () => {
      // модалка размонтируется только при закрытии прилки
      clearInterval(timeoutId);
    };
  }, [message.text]);

  return (
    <>
      {message.text && (
        <Alert
          cancelCallback={closeAlertCallback}
          text={message.text}
          type={message.type}
        />
      )}
      {children}
    </>
  );
}
