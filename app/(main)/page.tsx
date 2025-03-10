"use client";

import {DatePicker, DateRangePicker, Input, Pagination, RecaptchaForm,} from "@/shared/ui";
import {SelectBox} from "@/shared/ui/SelectBox/SelectBox";

export default function Home() {
  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px]`}
    >
      <Pagination totalItems={101}/>
      <RecaptchaForm/>
      <SelectBox placeholder={"Select-box"} label={"Select-box"}
                 options={[{id: "Select-box1", value: "Select-box1", title: "Select-box1"}]}/>
      <Input type="search"/>
      <DateRangePicker/>
      <DatePicker/>
    </div>
  );
}
