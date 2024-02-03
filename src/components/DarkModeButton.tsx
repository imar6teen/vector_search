"use client";
import DarkMode from "@/assets/darkmode.svg";
import Image from "next/image";
import { useEffect } from "react";

function DarkModeButton() {
  // useEffect for prefer color scheme
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function handleClick() {
    document.documentElement.classList.toggle("dark");
  }
  return (
    <button onClick={handleClick}>
      <Image
        src={DarkMode}
        width={16}
        height={16}
        alt="darkmode"
        className="dark:fill-neutral-50 dark:invert"
      />
    </button>
  );
}

export default DarkModeButton;
