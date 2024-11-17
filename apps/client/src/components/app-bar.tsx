import { cn } from "@client/lib/utils";
import { useEffect, useRef, useState } from "react"
import { SidebarTrigger } from "./ui/sidebar";

export function AppBar({ children, className }: { children: any, className?: string }) {
    const [colorClass, setColorClass] = useState("");

    useEffect(() => {
        const listener = () => {
            setColorClass(window.scrollY <= 0 ? "" : "shadow-lg");
        };

        window.addEventListener("scroll", listener);

        return () => {
            window.removeEventListener("scroll", listener);
        }
    });

    return <div className={cn("flex flex-row items-center gap-4 p-4 h-16 sticky top-0 bg-white duration-200 transition-shadow", colorClass, className)}>
        {children}
    </div>
}

export function AppBarTitle({children}: {children: any}) {
   return <h1 className="text-2xl font-semibold flex-grow">{children}</h1>
}