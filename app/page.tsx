"use client";

import { Pagination } from "@/widgets/Pagination";
import { RecaptchaForm } from "@/widgets/Recaptcha-Form";

export default function Home() {
  return (
    <div className={`flex justify-center mt-56`}>
      <Pagination totalItems={101} />
      <RecaptchaForm />
    </div>
  );
}
