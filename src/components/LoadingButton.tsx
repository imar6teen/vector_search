"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonProps {
  name: string;
}

function LoadingButton({ name, ...props }: LoadingButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      variant={props?.variant || "default"}
      type="submit"
      disabled={pending}
    >
      {name} {pending && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export default LoadingButton;
