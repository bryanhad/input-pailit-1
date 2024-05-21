export class LoginError extends Error {
    title: string
    constructor(title: string, message: string) {
        super(message)
        this.name = "LoginError"
        this.title = title
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

export class ExpiredSessionErrror extends LoginError {
    constructor(title: string, message: string) {
        super(title, message)
    }
}