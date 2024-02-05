"use client";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";

type SignInButtonProps = {
  session: Session | null;
};

function SignInButton({ session }: SignInButtonProps) {
  if (session) {
    return (
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    );
  }
  return (
    <Button
      onClick={() => {
        signIn();
      }}
    >
      Login
    </Button>
  );
}

export default SignInButton;
