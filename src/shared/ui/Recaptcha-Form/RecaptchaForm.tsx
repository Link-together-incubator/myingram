"use client";

import cls from "./RecaptchaForm.module.scss";

type RecaptchaFormProps = {
  isShowRequiredMessage?: boolean;
};

export const RecaptchaForm = ({
  isShowRequiredMessage = false,
}: RecaptchaFormProps) => {
  return (
    <div
      className={`${cls.container} ${isShowRequiredMessage ? cls.requiredMessage : ""}`}
    >
      <div
        className="g-recaptcha"
        data-theme="dark"
        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      ></div>
      {isShowRequiredMessage && (
        <p className={cls.text}>Please verify that you are not a robot</p>
      )}
    </div>
  );
};
