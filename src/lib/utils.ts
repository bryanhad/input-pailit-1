import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { customAlphabet } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: 'IDR' | 'USD') {
    const CURRENCY_FORMATTER = new Intl.NumberFormat(
        currency === 'IDR' ? 'id-ID' : 'en-US',
        {
            currency,
            style: 'currency',
            minimumFractionDigits: 0,
        }
    )
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('id-ID')

export function formatNumber(amount: number) {
    return NUMBER_FORMATTER.format(amount)
}

export function formatDateToLocale(
    date: Date,
    locales: Intl.LocalesArgument = 'id-ID',
    short?: boolean
) {
    return new Date(date).toLocaleDateString(locales, {
        year: 'numeric',
        month: short ? '2-digit' : 'long',
        day: 'numeric',
        weekday: short ? undefined : 'long',
    })
}

export function toSlug(str: string) {
    return str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    // the first regex replace all spaces into -
    // the second regex replaces all - that is more than 1 to be an empty string
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Define a custom alphabet for hexadecimal characters
const hexAlphabet = '0123456789abcdef'
// Create a nanoid generator function for a 64-character token (32 bytes in hex)
const nanoid = customAlphabet(hexAlphabet, 64)

export function generateToken() {
    return nanoid()
}

export function getNameInitial(name: string) {
    const formattedName = name.replace(/\s+/g, ' ').trim()

    const words = formattedName.split(' ')

    if (words.length === 1) {
        return name[0]
    }
    return `${words[0][0]}${words[1][0]}`
}

export class ActionError extends Error {
    title?: string
    constructor(message: string, title?: string) {
        super()
        this.title = title
        this.message = message
    }
}
