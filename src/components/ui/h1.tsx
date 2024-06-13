import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

function H1({ className, children, ...props }: ComponentProps<"h1">) {
    return (
        <h1
            {...props}
            className={cn(
                "text-2xl font-bold tracking-tight lg:text-3xl",
                className,
            )}
        >
            {children}
        </h1>
    );
}

export default H1;
