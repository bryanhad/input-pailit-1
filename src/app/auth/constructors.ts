import { AuthError } from "next-auth"

export class LoginError extends AuthError {
    title: string
    constructor(title: string, message: string) {
        super('') //I don't want to pass the message to the AuthError constructor.. it will append a authjs help url idk why lol
        this.name = "LoginError"
        this.title = title
        // So I just override the AuthError's message property by creating my own on this LoginError constructor instead.
        this.message = message
    }
}

export class InvalidTokenError extends LoginError {
    constructor(title: string, message: string) {
        super(title, message)
    }
}

export class EmptyPasswordError extends LoginError {
    userId:string
    constructor(title: string, message: string, userId:string) {
        super(title, message)
        this.userId = userId
    }
}

export class ExpiredSessionError extends LoginError {
    constructor(title: string, message: string) {
        super(title, message)
    }
}