"use client";

import { Button } from "@/shared/ui";
import { Pagination } from "@/widgets/Pagination";
import { RecaptchaForm } from "@/widgets/Recaptcha-Form";

export default function Home() {
  return (
    <div className={`flex justify-center mt-56 flex-col items-center`}>
      <Pagination totalItems={101} />
      <RecaptchaForm />
      <Button type="link">Button</Button>
    </div>
  );
}
