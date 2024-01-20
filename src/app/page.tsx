"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  function handleClick() {
    document.documentElement.classList.toggle("dark");
  }
  return (
    <main className="flex items-center justify-center">
      <Button onClick={handleClick}>Submit</Button>
    </main>
  );
}
