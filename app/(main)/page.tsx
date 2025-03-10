"use client";

import {
  DatePicker,
  DateRangePicker,
  Input,
  Pagination,
  RadioGroup,
  RecaptchaForm,
} from "@/shared/ui";

export default function Home() {
  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px]`}
    >
      <Pagination totalItems={101} />
      <RecaptchaForm />
      <RadioGroup
        options={[
          { label: "RadioGroup", value: "r1" },
          { label: "RadioGroup", value: "r2" },
        ]}
      />
      <Input type="search" />
      <DateRangePicker />
      <DatePicker />
    </div>
  );
}
