"use client";
import action from "@/app/(protected)/search/action";
import { useFormState } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react";

type InitState = {
  message: string;
  event: "success" | "error" | "";
};

const initState: InitState = {
  message: "",
  event: "",
};

function SearchForm() {
  const [state, formAction] = useFormState(action, initState);
  const [instance, setInstance] = useState<any | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (state.event === "") return;
    setMessage(state.message);
  }, [state]);

  useEffect(() => {
    if (instance === null) return;
    instance.reset();
    instance.delete().type(message).flush();
  }, [instance, message]);

  return (
    <div className="my-36 flex justify-between gap-x-10">
      <form action={formAction} className="w-3/4">
        <Label htmlFor="ask">Ask</Label>
        <Input
          type="text"
          name="ask"
          id="ask"
          placeholder="Type a question"
          className="my-2"
          required
        />
        <LoadingButton name="Ask" variant={"ghost"} />
      </form>
      {/* textarea for answer */}
      <div className="h-32 w-full overflow-y-auto border border-foreground p-4">
        <TypeIt
          as="p"
          options={{
            speed: 15,
            startDelay: 500,
            // loop: true,
          }}
          getAfterInit={(instance) => {
            setInstance(instance);
            return instance;
          }}
        />
      </div>
    </div>
  );
}

export default SearchForm;
