"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function LoadingScrapeButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant={"default"} type="submit" disabled={pending}>
      Scrape {pending && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export default LoadingScrapeButton;
