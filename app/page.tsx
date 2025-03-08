"use client";

import { Pagination } from "@/widgets/Pagination";

export default function Home() {
  return (
    <div className="flex justify-center mt-56">
      <Pagination totalItems={101} />
    </div>
  );
}
