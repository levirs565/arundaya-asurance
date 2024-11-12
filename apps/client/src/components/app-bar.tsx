import { cn } from "@client/lib/utils";
import { useEffect, useRef, useState } from "react"

export function AppBar({ children }: { children: any }) {
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

    return <div className={cn("flex flex-row items-center p-4 h-16 sticky top-0 bg-white duration-200 transition-shadow", colorClass)}>
        {children}
    </div>
}

export function AppBarTitle({children}: {children: any}) {
   return <h1 className="text-2xl font-semibold flex-grow">{children}</h1>
}