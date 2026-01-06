// export const Aside = () =>{}

import * as React from "react";

import { cn } from "@/lib/utils";

function AsideSidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="aside"
      className={cn(
        "border-secondary-surface bg-background/50 fixed top-0 left-0 h-full w-64 border-r p-6 shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export { AsideSidebar };
