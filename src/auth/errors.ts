import { AuthError } from "next-auth"

export type ErrorTypeExtended =
    | "InvalidCredentials"
    | "SessionExpired"
    | "EmailAlreadyInUse"
    | "MagicLinkStillAlive"
    | "SendEmail"
    | 'InvalidToken'
    | 'IncompleteAccountSetup'
    | AuthError["type"]

export class LoginError extends AuthError {
    title?: string
    constructor(message: string, title?: string) {
        super("") //I don't want to pass the message to the AuthError constructor.. it will append a authjs help url idk why lol
        // this.name = "LoginError"
        this.title = title
        // So I just override the AuthError's message property by creating my own on this LoginError constructor instead.
        this.message = message
    }
}

export class InvalidCredentialsError extends LoginError {
    static type = "InvalidCredentials"
}
export class SessionExpiredError extends LoginError {
    static type = "SessionExpired"
}
export class EmailAlreadyInUseError extends LoginError {
    static type = "EmailAlreadyInUse"
}
export class MagicLinkStillAliveError extends LoginError {
    static type = "MagicLinkStillAlive"
}
export class SendEmailError extends LoginError {
    static type = "SendEmail"
}
export class InvalidTokenError extends LoginError {
    static type = "InvalidToken"
}
export class IncompleteAccountSetupError extends LoginError {
    static type = "IncompleteAccountSetup"
}
