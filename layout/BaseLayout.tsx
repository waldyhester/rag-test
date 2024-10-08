import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import Header from "./Header";

const BaseLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <Header />
      <main className="container flex flex-1 flex-col border-b">
        <div className={cn("w-full mx-auto flex-1 flex flex-col mt-4 mb-4")}>
          {children}
        </div>
      </main>
    </div>
  );
};

export { BaseLayout };
