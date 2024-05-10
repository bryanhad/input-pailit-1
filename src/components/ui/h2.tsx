import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

function H2({ className, children, ...props }: ComponentProps<"h2">) {
    return (
        <h2
            {...props}
            className={cn(
                "text-xl font-semibold tracking-tight lg:text-2xl",
                className,
            )}
        >
            {children}
        </h2>
    );
}

export default H2;
