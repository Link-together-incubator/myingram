"use client";

import { Button } from "@/shared/ui";
import { Pagination } from "@/widgets/Pagination";
import { RecaptchaForm } from "@/widgets/Recaptcha-Form";

export default function Home() {
  return (
    <div
      className={`flex flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px]`}
    >
      <Pagination totalItems={101} />
      <RecaptchaForm />
      <Button type="link">Button</Button>
    </div>
  );
}
