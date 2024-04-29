import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: "IDR" | "USD") {
    const CURRENCY_FORMATTER = new Intl.NumberFormat(
        currency === "IDR" ? "id-ID" : "en-US",
        {
            currency,
            style: "currency",
            minimumFractionDigits: 0,
        }
    )
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("id-ID")

export function formatNumber(amount: number) {
    return NUMBER_FORMATTER.format(amount)
}

export function formatToSlug(str: string) {
    return str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    // the first regex replace all spaces into -
    // the second regex replaces all - that is more than 1 to be an empty string
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}