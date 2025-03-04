"use client";

import { useState } from "react";

import { ThemeToggle } from "@/features/Toggle-Theme";
import { Button } from "@/shared/ui/button";

export default function Home() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="min-h-screen flex justify-center items-center gap-6">
      <Button onClick={() => setCounter((prev) => prev + 1)}>
        up counter!
      </Button>
      <h1>{counter}</h1>
      <ThemeToggle />
    </div>
  );
}
