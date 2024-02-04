"use client";
import action from "@/app/scrape/action";
import React, { useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";

type InitState = {
  message: string;
  event: "success" | "error" | "";
};

function ScrapeForm() {
  const initState: InitState = {
    message: "",
    event: "",
  };
  const [state, formAction] = useFormState(action, initState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message !== "" && state.event !== "") {
      toast({
        title: "Message",
        description:
          state.event === "success"
            ? "URL has been scraped"
            : "URL failed to scrape",
        variant: state.event === "success" ? "default" : "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="url">URL</Label>
          <Input id="url" placeholder="URL..." name="url" required />
          {state && state.event === "zoderror" && (
            <span className="font-semibold text-destructive">
              <small>{state.message}</small>
            </span>
          )}
        </div>
        <LoadingButton name="Scrape" />
      </div>
    </form>
  );
}

export default ScrapeForm;
