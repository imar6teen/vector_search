"use client";
import DarkMode from "@/assets/darkmode.svg";
import Image from "next/image";

function DarkModeButton() {
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
