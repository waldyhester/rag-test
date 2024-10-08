import Link from "next/link";

import { Menu } from "./Menu";
import { UserButton } from "./UserButton";

export default async function Header() {
  return (
    <header className="py-0 md:py-4">
      <nav className="flex items-center justify-between px-4 py-2">
        <ul className="me-2 flex items-center gap-x-8">
          <li className="flex items-center gap-x-3">
            <div className="xl:hidden">
              <Menu />
            </div>
            <Link href="/dashboard">
              <h3 className="font-bold px-3">PORTAL</h3>
            </Link>
          </li>
        </ul>

        <ul className="flex items-center gap-x-6  [&>li:last-child]:flex [&>li]:hidden [&>li]:xl:flex">
          <li className="items-center gap-x-4">
            <UserButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
