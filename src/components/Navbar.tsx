import Link from "next/link";
import SSSvg from "@/assets/ss.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import DarkModeButton from "./DarkModeButton";

function Navbar() {
  return (
    <nav className="m-auto flex w-[80%] items-center justify-between">
      <ul className="flex items-center gap-x-10">
        <li>
          <Link href={"/"}>
            <button>
              <Image
                src={SSSvg}
                alt="mainlogo"
                width={64}
                height={64}
                className="dark:fill-neutral-50 dark:invert"
              />
            </button>
          </Link>
        </li>
        <li>
          <Link href={"/scrape"}>Scrape Website</Link>
        </li>
        <li>
          <Link href={"/search"}>Search</Link>
        </li>
      </ul>
      <ul className="flex items-center gap-x-10">
        <li>
          <DarkModeButton />
        </li>
        <li>
          <Button asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
