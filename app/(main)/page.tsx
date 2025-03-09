"use client";

import {
  DatePicker,
  DateRangePicker,
  Input,
  Pagination,
  RecaptchaForm,
} from "@/shared/ui";

export default function Home() {
  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px]`}
    >
      <Pagination totalItems={101} />
      <RecaptchaForm />
      <Input type="search" />
      <DateRangePicker />
      <DatePicker />
    </div>
  );
}
